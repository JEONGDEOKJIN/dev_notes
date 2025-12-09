/**
 * AB TEST 사용 예제
 *
 * 실행: npx ts-node example.ts
 */

import {
  calculateSampleSize,
  printSampleSizeTable,
  analyzeABTest,
  chiSquareTest,
  runABTestAnalysis,
  exportToMarkdown
} from './index';

import type { ABTestConfig } from './types';

// ============================================
// 예제 1: 샘플 사이즈 계산
// ============================================

console.log('\n' + '='.repeat(60));
console.log('📊 예제 1: 샘플 사이즈 계산');
console.log('='.repeat(60));

const sampleSizeResult = calculateSampleSize({
  baselineRate: 0.02,  // 현재 전환율 2%
  mde: 0.2,            // 20% 개선 기대
  alpha: 0.05,         // 유의수준 5%
  power: 0.8           // 검정력 80%
});

console.log('\n샘플 사이즈 계산 결과:');
console.log(`- 현재 전환율: ${sampleSizeResult.baselineRate}`);
console.log(`- 기대 전환율: ${sampleSizeResult.expectedRate}`);
console.log(`- 최소 감지 효과(MDE): ${sampleSizeResult.mde}`);
console.log(`- 그룹당 필요 샘플: ${sampleSizeResult.perGroup.toLocaleString()}명`);
console.log(`- 총 필요 샘플: ${sampleSizeResult.total.toLocaleString()}명`);

// 샘플 사이즈 참고표
printSampleSizeTable();

// ============================================
// 예제 2: AB TEST 결과 분석 (기본)
// ============================================

console.log('\n' + '='.repeat(60));
console.log('📊 예제 2: AB TEST 결과 분석 (기본)');
console.log('='.repeat(60));

const testResult = analyzeABTest({
  visitorsA: 10000,
  conversionsA: 200,
  visitorsB: 10000,
  conversionsB: 250
});

console.log('\nAB TEST 분석 결과:');
console.log(`- A안 전환율: ${testResult.groupA.ratePercent}`);
console.log(`- B안 전환율: ${testResult.groupB.ratePercent}`);
console.log(`- Z-score: ${testResult.statistics.zScore}`);
console.log(`- p-value: ${testResult.statistics.pValue}`);
console.log(`- 유의미: ${testResult.statistics.isSignificant ? '예' : '아니오'}`);
console.log(`\n결론: ${testResult.conclusion}`);

// ============================================
// 예제 3: 카이제곱 검정
// ============================================

console.log('\n' + '='.repeat(60));
console.log('📊 예제 3: 카이제곱 검정');
console.log('='.repeat(60));

const chiResult = chiSquareTest({
  visitorsA: 10000,
  conversionsA: 200,
  visitorsB: 10000,
  conversionsB: 250
});

console.log('\n카이제곱 검정 결과:');
console.log(`- 카이제곱 통계량: ${chiResult.chiSquare}`);
console.log(`- p-value: ${chiResult.pValue}`);
console.log(`- 유의미: ${chiResult.isSignificant ? '예' : '아니오'}`);

// ============================================
// 예제 4: 전체 리포트 생성
// ============================================

console.log('\n' + '='.repeat(60));
console.log('📊 예제 4: 전체 리포트 생성');
console.log('='.repeat(60));

const testConfig: ABTestConfig = {
  testName: 'CTA 버튼 색상 테스트',
  hypothesis: 'CTA 버튼을 빨간색에서 초록색으로 변경하면 전환율이 20% 증가할 것이다',
  startDate: '2024-12-01',
  endDate: '2024-12-07',
  visitorsA: 15000,
  conversionsA: 300,
  visitorsB: 15000,
  conversionsB: 375,
  monthlyConversions: 10000,
  avgOrderValue: 50000
};

const fullResult = runABTestAnalysis(testConfig);

// ============================================
// 예제 5: 마크다운 내보내기
// ============================================

console.log('\n' + '='.repeat(60));
console.log('📊 예제 5: 마크다운 형식 출력');
console.log('='.repeat(60));

const markdown = exportToMarkdown(fullResult, testConfig);
console.log('\n--- 마크다운 미리보기 (처음 500자) ---');
console.log(markdown.substring(0, 500) + '...');

// ============================================
// 예제 6: 유의미하지 않은 결과
// ============================================

console.log('\n' + '='.repeat(60));
console.log('📊 예제 6: 유의미하지 않은 결과 예시');
console.log('='.repeat(60));

const insignificantResult = analyzeABTest({
  visitorsA: 1000,
  conversionsA: 20,
  visitorsB: 1000,
  conversionsB: 22
});

console.log('\n작은 샘플에서의 결과:');
console.log(`- A안 전환율: ${insignificantResult.groupA.ratePercent}`);
console.log(`- B안 전환율: ${insignificantResult.groupB.ratePercent}`);
console.log(`- p-value: ${insignificantResult.statistics.pValue}`);
console.log(`\n결론: ${insignificantResult.conclusion}`);

console.log('\n' + '='.repeat(60));
console.log('✅ 모든 예제 완료');
console.log('='.repeat(60) + '\n');
