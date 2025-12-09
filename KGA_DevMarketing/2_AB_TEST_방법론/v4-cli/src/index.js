#!/usr/bin/env node

/**
 * AB TEST CLI with ETL Pipeline
 *
 * 사용법:
 *   node src/index.js                    # 수동 데이터로 전체 분석
 *   node src/index.js --sample           # 샘플 사이즈만
 *   node src/index.js --analyze          # AB TEST 분석만
 *
 *   node src/index.js --etl              # ETL 파이프라인 실행 (Mock 데이터)
 *   node src/index.js --etl --api        # Meta API에서 데이터 추출
 *   node src/index.js --etl --csv path   # CSV 파일에서 데이터 추출
 *
 *   node src/index.js --load             # 저장된 최근 데이터로 분석
 *   node src/index.js --list             # 저장된 테스트 목록
 */

import { calculateSampleSize, analyzeABTest, calculateBusinessImpact } from './calculator.js';
import { printHeader, printSection, printItem, printBox, printTable, printFooter } from './printer.js';
import { runETLPipeline, quickAnalyze, showTestList } from './etl/pipeline.js';
import { loadLatestABTestData, saveAnalysisResult } from './etl/load.js';

// ============================================
// 👇 수동 입력 데이터 (--etl 없이 실행 시 사용)
// ============================================

const CONFIG = {
  // 테스트 정보
  testName: '메타 광고 소재 테스트',
  hypothesis: '후기 영상 소재(B)가 이미지 소재(A)보다 전환율이 높을 것',
  startDate: '2024-12-01',
  endDate: '2024-12-07',

  // A안 (Control) 데이터
  visitorsA: 10000,
  conversionsA: 200,

  // B안 (Variant) 데이터
  visitorsB: 10000,
  conversionsB: 250,

  // 비즈니스 영향 계산용 (선택)
  monthlyConversions: 5000,  // 월간 전환 수
  avgOrderValue: 50000,      // 평균 주문 가치 (원)
};

// 샘플 사이즈 계산용
const SAMPLE_SIZE_CONFIG = {
  baselineRate: 0.02,  // 현재 전환율 2%
  mde: 0.2,            // 20% 개선 기대
  alpha: 0.05,         // 유의수준 5%
  power: 0.8           // 검정력 80%
};

// ETL 설정
const ETL_CONFIG = {
  dateStart: '2024-12-01',
  dateEnd: '2024-12-07',
  adIdA: null,  // null이면 자동 선택 (2위 vs 1위)
  adIdB: null,
  conversionType: 'purchase'  // purchase, lead, add_to_cart 등
};

// ============================================
// 실행 로직
// ============================================

const args = process.argv.slice(2);
const mode = args[0] || '--all';

function runSampleSize() {
  printHeader('📐 샘플 사이즈 계산');

  const result = calculateSampleSize(SAMPLE_SIZE_CONFIG);

  printSection('입력 값');
  printItem('현재 전환율', result.baselineRate);
  printItem('기대 전환율', result.expectedRate);
  printItem('MDE', result.mde);

  printSection('결과');
  printItem('그룹당 필요 샘플', result.perGroup.toLocaleString() + '명', { highlight: true });
  printItem('총 필요 샘플', result.total.toLocaleString() + '명', { highlight: true });

  // 참고표
  printSection('샘플 사이즈 참고표');
  const headers = ['Baseline', 'MDE 10%', 'MDE 15%', 'MDE 20%'];
  const rows = [
    ['1%', ...([0.1, 0.15, 0.2].map(mde => calculateSampleSize({ baselineRate: 0.01, mde }).perGroup.toLocaleString()))],
    ['2%', ...([0.1, 0.15, 0.2].map(mde => calculateSampleSize({ baselineRate: 0.02, mde }).perGroup.toLocaleString()))],
    ['5%', ...([0.1, 0.15, 0.2].map(mde => calculateSampleSize({ baselineRate: 0.05, mde }).perGroup.toLocaleString()))],
    ['10%', ...([0.1, 0.15, 0.2].map(mde => calculateSampleSize({ baselineRate: 0.1, mde }).perGroup.toLocaleString()))]
  ];
  printTable(headers, rows);
}

function runAnalyze(config = CONFIG) {
  printHeader('📊 AB TEST 분석');

  const result = analyzeABTest(config);

  printSection('테스트 정보');
  printItem('테스트명', config.testName);
  printItem('가설', config.hypothesis);
  printItem('기간', `${config.startDate} ~ ${config.endDate}`);

  printSection('데이터');
  const dataHeaders = ['그룹', '방문자', '전환', '전환율'];
  const dataRows = [
    ['A안 (Control)', config.visitorsA.toLocaleString(), config.conversionsA.toLocaleString(), result.groupA.ratePercent],
    ['B안 (Variant)', config.visitorsB.toLocaleString(), config.conversionsB.toLocaleString(), result.groupB.ratePercent]
  ];
  printTable(dataHeaders, dataRows);

  printSection('통계 검증');
  printItem('Z-score', result.statistics.zScore);
  printItem('p-value', result.statistics.pValue, { highlight: true });
  printItem('유의수준', result.statistics.significanceLevel);

  printSection('효과 크기');
  printItem('절대적 차이', result.effect.absoluteDifference);
  printItem('상대적 개선', result.effect.relativeImprovement, {
    success: result.statistics.isSignificant && result.groupB.rate > result.groupA.rate,
    danger: result.statistics.isSignificant && result.groupB.rate < result.groupA.rate
  });
  printItem('95% 신뢰구간', `[${result.effect.confidenceInterval.lower}, ${result.effect.confidenceInterval.upper}]`);

  // 결론
  const boxType = result.statistics.isSignificant
    ? (result.groupB.rate > result.groupA.rate ? 'success' : 'danger')
    : 'warning';
  printBox(result.conclusion, boxType);

  // 비즈니스 영향
  if (config.monthlyConversions && config.avgOrderValue) {
    const rateA = config.conversionsA / config.visitorsA;
    const rateB = config.conversionsB / config.visitorsB;
    const improvement = rateB - rateA;

    const impact = calculateBusinessImpact(improvement, config.monthlyConversions, config.avgOrderValue);

    printSection('💰 비즈니스 영향 (월간 예상)');
    printItem('추가 전환', impact.additionalConversions.toLocaleString() + '건', { highlight: true });
    printItem('추가 매출', impact.additionalRevenue.toLocaleString() + '원', { highlight: true });
  }

  return result;
}

async function runETL() {
  printHeader('🔄 ETL 파이프라인');

  // 소스 결정
  let source = 'mock';
  let csvPath = null;

  if (args.includes('--api')) {
    source = 'api';
  } else if (args.includes('--csv')) {
    source = 'csv';
    const csvIndex = args.indexOf('--csv');
    csvPath = args[csvIndex + 1];
  }

  printItem('데이터 소스', source.toUpperCase());

  try {
    const etlResult = await runETLPipeline({
      source,
      csvPath,
      ...ETL_CONFIG
    });

    // 비교 테이블 출력
    printSection('📊 광고 성과 비교');
    const rankHeaders = ['순위', '광고명', '방문자', '전환', '전환율', 'CPA'];
    const rankRows = etlResult.comparison.ranking.map(ad => [
      ad.rank,
      ad.name,
      ad.visitors.toLocaleString(),
      ad.conversions.toLocaleString(),
      ad.conversionRate,
      ad.costPerConversion
    ]);
    printTable(rankHeaders, rankRows);

    // AB TEST 분석
    printSection('🎯 AB TEST 분석');
    const result = runAnalyze(etlResult.config);

    // 결과 저장
    saveAnalysisResult(etlResult.testId, result);

    printItem('테스트 ID', etlResult.testId, { highlight: true });

  } catch (error) {
    console.error('❌ ETL 실패:', error.message);
  }
}

function runFromSaved() {
  printHeader('📂 저장된 데이터로 분석');

  const data = loadLatestABTestData();

  if (!data) {
    console.log('\n⚠️ 저장된 데이터가 없습니다.');
    console.log('   먼저 ETL 파이프라인을 실행하세요: node src/index.js --etl\n');
    return;
  }

  printItem('테스트 ID', data.id);
  printItem('생성일', data.createdAt);

  // 저장된 설정으로 분석
  runAnalyze(data.config);
}

// ============================================
// 실행
// ============================================

console.clear();

switch (mode) {
  case '--sample':
    runSampleSize();
    break;

  case '--analyze':
    runAnalyze();
    break;

  case '--etl':
    runETL();
    break;

  case '--load':
    runFromSaved();
    break;

  case '--list':
    showTestList();
    break;

  case '--help':
    printHeader('📖 사용법');
    console.log(`
  node src/index.js                  수동 데이터로 전체 분석
  node src/index.js --sample         샘플 사이즈 계산만
  node src/index.js --analyze        AB TEST 분석만

  node src/index.js --etl            ETL 실행 (Mock 데이터)
  node src/index.js --etl --api      Meta API에서 추출
  node src/index.js --etl --csv path CSV 파일에서 추출

  node src/index.js --load           저장된 최근 데이터로 분석
  node src/index.js --list           저장된 테스트 목록

  node src/index.js --help           도움말
`);
    break;

  case '--all':
  default:
    runSampleSize();
    runAnalyze();
    break;
}

printFooter();
