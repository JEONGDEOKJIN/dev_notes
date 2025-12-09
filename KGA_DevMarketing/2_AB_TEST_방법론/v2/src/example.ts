/**
 * AB TEST 사용 예제
 * MVC Pattern
 *
 * 실행: npx ts-node src/example.ts
 */

import {
  sampleSizeController,
  abTestController,
  businessImpactController,
  consoleView,
  exportView
} from './index';

import type { ABTestConfig } from './models';

// ============================================
// 예제 1: 샘플 사이즈 계산
// ============================================

console.log('\n');
consoleView.printHeader('📊 예제 1: 샘플 사이즈 계산');

const sampleSizeResult = sampleSizeController.calculate({
  baselineRate: 0.02,  // 현재 전환율 2%
  mde: 0.2,            // 20% 개선 기대
  alpha: 0.05,         // 유의수준 5%
  power: 0.8           // 검정력 80%
});

consoleView.printSampleSizeResult(sampleSizeResult);

// 샘플 사이즈 참고표
const sampleSizeTable = sampleSizeController.generateTable();
consoleView.printSampleSizeTable(sampleSizeTable);

// ============================================
// 예제 2: AB TEST 결과 분석 (기본)
// ============================================

consoleView.printHeader('📊 예제 2: AB TEST 결과 분석 (기본)');

const testResult = abTestController.analyze({
  visitorsA: 10000,
  conversionsA: 200,
  visitorsB: 10000,
  conversionsB: 250
});

consoleView.printSectionTitle('분석 결과');
console.log(`A안 전환율: ${testResult.groupA.ratePercent}`);
console.log(`B안 전환율: ${testResult.groupB.ratePercent}`);
console.log(`Z-score: ${testResult.statistics.zScore}`);
console.log(`p-value: ${testResult.statistics.pValue}`);
console.log(`유의미: ${testResult.statistics.isSignificant ? '예' : '아니오'}`);
console.log(`\n결론: ${testResult.conclusion}`);

// ============================================
// 예제 3: 카이제곱 검정
// ============================================

consoleView.printHeader('📊 예제 3: 카이제곱 검정');

const chiResult = abTestController.chiSquareTest({
  visitorsA: 10000,
  conversionsA: 200,
  visitorsB: 10000,
  conversionsB: 250
});

consoleView.printChiSquareResult(chiResult);

// ============================================
// 예제 4: 전체 리포트 생성
// ============================================

consoleView.printHeader('📊 예제 4: 전체 리포트 생성');

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

const fullResult = abTestController.analyze(testConfig);

// 비즈니스 영향 계산
const businessImpact = businessImpactController.calculate(
  fullResult.effect.absoluteDifference,
  testConfig.monthlyConversions!,
  testConfig.avgOrderValue!
);

// 전체 리포트 출력
consoleView.printFullReport(testConfig, fullResult, businessImpact);

// ============================================
// 예제 5: 내보내기 형식들
// ============================================

consoleView.printHeader('📊 예제 5: 다양한 내보내기 형식');

// JSON
consoleView.printSectionTitle('JSON 형식');
const jsonOutput = exportView.toJSON(testConfig, fullResult, businessImpact);
console.log(jsonOutput.substring(0, 300) + '...\n');

// Markdown
consoleView.printSectionTitle('Markdown 형식');
const markdownOutput = exportView.toMarkdown(testConfig, fullResult, businessImpact);
console.log(markdownOutput.substring(0, 300) + '...\n');

// CSV
consoleView.printSectionTitle('CSV 형식');
const csvOutput = exportView.toCSV(testConfig, fullResult);
console.log(csvOutput + '\n');

// ============================================
// 예제 6: 유의미하지 않은 결과
// ============================================

consoleView.printHeader('📊 예제 6: 유의미하지 않은 결과 예시');

const insignificantResult = abTestController.analyze({
  visitorsA: 1000,
  conversionsA: 20,
  visitorsB: 1000,
  conversionsB: 22
});

consoleView.printSectionTitle('작은 샘플에서의 결과');
console.log(`A안 전환율: ${insignificantResult.groupA.ratePercent}`);
console.log(`B안 전환율: ${insignificantResult.groupB.ratePercent}`);
console.log(`p-value: ${insignificantResult.statistics.pValue}`);
console.log(`\n결론: ${insignificantResult.conclusion}`);

// ============================================
// 완료
// ============================================

consoleView.printHeader('✅ 모든 예제 완료');
console.log('\nMVC 패턴 구조:');
console.log('- Models: 타입 정의 (types.ts)');
console.log('- Views: 출력 담당 (ConsoleView, ExportView)');
console.log('- Controllers: 비즈니스 로직 (SampleSize, ABTest, BusinessImpact)');
console.log('- Utils: 공통 유틸리티 (statistics, formatters)');
consoleView.printFooter();
