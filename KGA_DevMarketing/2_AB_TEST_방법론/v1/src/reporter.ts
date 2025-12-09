/**
 * AB TEST 리포트 생성 모듈
 */

import type { ABTestConfig, ABTestResult, BusinessImpact } from './types';
import { analyzeABTest } from './ab-test';

/**
 * AB TEST 전체 분석 리포트 실행
 */
export function runABTestAnalysis(config: ABTestConfig): ABTestResult {
  printHeader();
  printTestInfo(config);
  printData(config);

  // 분석 실행
  const result = analyzeABTest({
    visitorsA: config.visitorsA,
    conversionsA: config.conversionsA,
    visitorsB: config.visitorsB,
    conversionsB: config.conversionsB
  });

  printResults(result);
  printConclusion(result);

  // 비즈니스 영향 (옵션)
  if (config.monthlyConversions && config.avgOrderValue) {
    const impact = calculateBusinessImpact(
      result.effect.absoluteDifference,
      config.monthlyConversions,
      config.avgOrderValue
    );
    printBusinessImpact(impact);
  }

  printFooter();

  return result;
}

/**
 * 비즈니스 영향 계산
 */
export function calculateBusinessImpact(
  improvement: number,
  monthlyConversions: number,
  avgOrderValue: number
): BusinessImpact {
  const additionalConversions = Math.round(monthlyConversions * improvement);
  const additionalRevenue = additionalConversions * avgOrderValue;

  return {
    additionalConversions,
    additionalRevenue
  };
}

// ============================================
// 출력 함수들
// ============================================

function printHeader(): void {
  console.log('\n' + '='.repeat(60));
  console.log('📊 AB TEST 분석 리포트');
  console.log('='.repeat(60));
}

function printFooter(): void {
  console.log('\n' + '='.repeat(60));
}

function printTestInfo(config: ABTestConfig): void {
  console.log('\n📋 테스트 정보');
  console.log('-'.repeat(40));
  console.log(`테스트명: ${config.testName}`);
  console.log(`가설: ${config.hypothesis}`);
  console.log(`테스트 기간: ${config.startDate} ~ ${config.endDate}`);
}

function printData(config: ABTestConfig): void {
  console.log('\n📈 데이터');
  console.log('-'.repeat(40));
  console.log(`A안 (Control): ${config.visitorsA.toLocaleString()}명 방문, ${config.conversionsA.toLocaleString()}명 전환`);
  console.log(`B안 (Variant): ${config.visitorsB.toLocaleString()}명 방문, ${config.conversionsB.toLocaleString()}명 전환`);
}

function printResults(result: ABTestResult): void {
  console.log('\n📊 전환율 비교');
  console.log('-'.repeat(40));
  console.log(`A안: ${result.groupA.ratePercent}`);
  console.log(`B안: ${result.groupB.ratePercent}`);
  console.log(`차이: ${result.effect.absoluteDifferencePercent} (${result.effect.relativeImprovement})`);

  console.log('\n🔬 통계 검증');
  console.log('-'.repeat(40));
  console.log(`Z-score: ${result.statistics.zScore}`);
  console.log(`p-value: ${result.statistics.pValue}`);
  console.log(`유의수준: ${result.statistics.significanceLevel}`);
  console.log(`95% 신뢰구간: [${result.effect.confidenceInterval.lower}, ${result.effect.confidenceInterval.upper}]`);
}

function printConclusion(result: ABTestResult): void {
  console.log('\n✅ 결론');
  console.log('-'.repeat(40));
  console.log(result.conclusion);
}

function printBusinessImpact(impact: BusinessImpact): void {
  console.log('\n💰 비즈니스 영향 (예상)');
  console.log('-'.repeat(40));
  console.log(`월간 추가 전환: ${impact.additionalConversions.toLocaleString()}건`);
  console.log(`월간 추가 매출: ${impact.additionalRevenue.toLocaleString()}원`);
}

/**
 * 결과를 JSON으로 내보내기
 */
export function exportToJSON(result: ABTestResult, config: ABTestConfig): string {
  return JSON.stringify({
    config: {
      testName: config.testName,
      hypothesis: config.hypothesis,
      startDate: config.startDate,
      endDate: config.endDate
    },
    result
  }, null, 2);
}

/**
 * 결과를 마크다운으로 내보내기
 */
export function exportToMarkdown(result: ABTestResult, config: ABTestConfig): string {
  return `# AB TEST 결과: ${config.testName}

## 테스트 정보
- **가설**: ${config.hypothesis}
- **기간**: ${config.startDate} ~ ${config.endDate}

## 데이터

| 그룹 | 방문자 | 전환 | 전환율 |
|------|--------|------|--------|
| A안 (Control) | ${config.visitorsA.toLocaleString()} | ${config.conversionsA.toLocaleString()} | ${result.groupA.ratePercent} |
| B안 (Variant) | ${config.visitorsB.toLocaleString()} | ${config.conversionsB.toLocaleString()} | ${result.groupB.ratePercent} |

## 통계 검증

| 지표 | 값 |
|------|-----|
| Z-score | ${result.statistics.zScore} |
| p-value | ${result.statistics.pValue} |
| 유의수준 | ${result.statistics.significanceLevel} |
| 95% 신뢰구간 | [${result.effect.confidenceInterval.lower}, ${result.effect.confidenceInterval.upper}] |

## 효과

- **절대적 차이**: ${result.effect.absoluteDifferencePercent}
- **상대적 개선**: ${result.effect.relativeImprovement}

## 결론

${result.conclusion}
`;
}
