/**
 * ETL 파이프라인 - Extract → Transform → Load 통합 실행
 */

import { extractFromMeta, extractMockData, extractFromCSV } from './extract.js';
import { transformMetaData, transformCSVData, mapToABTest, createComparisonTable } from './transform.js';
import { saveABTestData, saveRawData, loadLatestABTestData, listAllTests } from './load.js';

/**
 * 전체 ETL 파이프라인 실행
 *
 * @param {Object} options - 파이프라인 옵션
 * @param {string} options.source - 데이터 소스 (api, mock, csv)
 * @param {string} options.dateStart - 시작일
 * @param {string} options.dateEnd - 종료일
 * @param {string} options.adIdA - A안 광고 ID/이름
 * @param {string} options.adIdB - B안 광고 ID/이름
 * @param {string} options.csvPath - CSV 파일 경로 (source가 csv일 때)
 * @param {string} options.conversionType - 전환 타입
 * @returns {Promise<Object>} AB TEST 설정 데이터
 */
export async function runETLPipeline(options) {
  const {
    source = 'mock',
    dateStart,
    dateEnd,
    adIdA,
    adIdB,
    csvPath,
    conversionType = 'purchase'
  } = options;

  console.log('\n🚀 ETL 파이프라인 시작...\n');

  // ================================
  // 1. EXTRACT (추출)
  // ================================
  console.log('📥 [1/3] EXTRACT - 데이터 추출');

  let rawData;

  switch (source) {
    case 'api':
      rawData = await extractFromMeta({ dateStart, dateEnd });
      break;

    case 'csv':
      if (!csvPath) throw new Error('CSV 경로가 필요합니다.');
      const csvRaw = await extractFromCSV(csvPath);
      rawData = transformCSVData(csvRaw);
      break;

    case 'mock':
    default:
      rawData = extractMockData();
      break;
  }

  // 원본 데이터 백업
  saveRawData(rawData, source);

  // ================================
  // 2. TRANSFORM (변환)
  // ================================
  console.log('\n🔄 [2/3] TRANSFORM - 데이터 변환');

  const transformedData = transformMetaData(rawData, { conversionType });

  // 비교 테이블 생성
  const comparison = createComparisonTable(transformedData);
  console.log(`   - 총 ${comparison.summary.totalAds}개 광고`);
  console.log(`   - 최고 성과: ${comparison.bestPerformer.name} (${(comparison.bestPerformer.conversionRate * 100).toFixed(2)}%)`);

  // AB TEST 매핑
  let abTestConfig;
  if (adIdA && adIdB) {
    abTestConfig = mapToABTest(transformedData, adIdA, adIdB);
  } else {
    // 기본: 1위 vs 2위 비교
    const sorted = comparison.ranking;
    if (sorted.length >= 2) {
      abTestConfig = mapToABTest(
        transformedData,
        comparison.ranking[1].name,  // 2위 = A안 (Control)
        comparison.ranking[0].name   // 1위 = B안 (Variant)
      );
      console.log(`   - 자동 선택: "${comparison.ranking[1].name}" vs "${comparison.ranking[0].name}"`);
    } else {
      throw new Error('비교할 광고가 2개 이상 필요합니다.');
    }
  }

  // ================================
  // 3. LOAD (저장)
  // ================================
  console.log('\n💾 [3/3] LOAD - 데이터 저장');

  const testId = `abtest_${Date.now()}`;
  const filepath = saveABTestData({
    ...abTestConfig,
    _comparison: comparison,
    _transformedData: transformedData
  }, testId);

  console.log('\n✅ ETL 파이프라인 완료!\n');

  return {
    testId,
    filepath,
    config: abTestConfig,
    comparison,
    transformedData
  };
}

/**
 * 저장된 데이터로 빠른 분석
 */
export function quickAnalyze() {
  const data = loadLatestABTestData();

  if (!data) {
    console.log('저장된 데이터가 없습니다. ETL 파이프라인을 먼저 실행하세요.');
    return null;
  }

  return data.config;
}

/**
 * 저장된 테스트 목록 출력
 */
export function showTestList() {
  const tests = listAllTests();

  if (tests.length === 0) {
    console.log('저장된 테스트가 없습니다.');
    return;
  }

  console.log('\n📋 저장된 테스트 목록:\n');
  tests.forEach((test, idx) => {
    console.log(`  ${idx + 1}. [${test.id}]`);
    console.log(`     ${test.testName}`);
    console.log(`     생성: ${test.createdAt}`);
    console.log('');
  });
}
