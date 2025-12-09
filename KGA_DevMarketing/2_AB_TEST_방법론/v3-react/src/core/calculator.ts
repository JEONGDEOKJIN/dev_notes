/**
 * AB TEST 계산 함수들
 */

import type {
  SampleSizeInput,
  SampleSizeResult,
  ABTestInput,
  ABTestResult,
  GroupStats,
  StatisticsResult,
  EffectSize,
  ChiSquareResult,
  BusinessImpact
} from './types';
import { getZScore, normalCDF, chiSquareCDF, getSignificanceLevel } from './statistics';

/**
 * 샘플 사이즈 계산
 */
export function calculateSampleSize(input: SampleSizeInput): SampleSizeResult {
  const {
    baselineRate,
    mde,
    alpha = 0.05,
    power = 0.8
  } = input;

  const zAlpha = getZScore(1 - alpha / 2);
  const zBeta = getZScore(power);
  const expectedRate = baselineRate * (1 + mde);
  const pooledRate = (baselineRate + expectedRate) / 2;
  const effect = Math.abs(expectedRate - baselineRate);
  const variance = pooledRate * (1 - pooledRate);

  const sampleSize = Math.ceil(
    (2 * variance * Math.pow(zAlpha + zBeta, 2)) / Math.pow(effect, 2)
  );

  return {
    perGroup: sampleSize,
    total: sampleSize * 2,
    baselineRate: `${(baselineRate * 100).toFixed(2)}%`,
    expectedRate: `${(expectedRate * 100).toFixed(2)}%`,
    mde: `${(mde * 100).toFixed(0)}%`,
    alpha,
    power
  };
}

/**
 * AB TEST 분석
 */
export function analyzeABTest(input: ABTestInput): ABTestResult {
  const { visitorsA, conversionsA, visitorsB, conversionsB } = input;

  const groupA = calculateGroupStats(visitorsA, conversionsA);
  const groupB = calculateGroupStats(visitorsB, conversionsB);
  const statistics = calculateStatistics(input);
  const effect = calculateEffect(groupA, groupB, visitorsA, visitorsB);

  const pValue = parseFloat(statistics.pValue);
  const relativeImprovement = parseFloat(effect.relativeImprovement);
  const conclusion = generateConclusion(pValue, effect.absoluteDifference, relativeImprovement);

  return {
    groupA,
    groupB,
    statistics,
    effect,
    conclusion
  };
}

function calculateGroupStats(visitors: number, conversions: number): GroupStats {
  const rate = conversions / visitors;
  return {
    visitors,
    conversions,
    rate,
    ratePercent: `${(rate * 100).toFixed(2)}%`
  };
}

function calculateStatistics(input: ABTestInput): StatisticsResult {
  const { visitorsA, conversionsA, visitorsB, conversionsB } = input;

  const rateA = conversionsA / visitorsA;
  const rateB = conversionsB / visitorsB;
  const pooledRate = (conversionsA + conversionsB) / (visitorsA + visitorsB);

  const standardError = Math.sqrt(
    pooledRate * (1 - pooledRate) * (1 / visitorsA + 1 / visitorsB)
  );

  const zScore = (rateB - rateA) / standardError;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));

  return {
    zScore: zScore.toFixed(4),
    pValue: pValue.toFixed(4),
    isSignificant: pValue < 0.05,
    significanceLevel: getSignificanceLevel(pValue)
  };
}

function calculateEffect(
  groupA: GroupStats,
  groupB: GroupStats,
  visitorsA: number,
  visitorsB: number
): EffectSize {
  const difference = groupB.rate - groupA.rate;
  const relativeImprovement = ((groupB.rate - groupA.rate) / groupA.rate) * 100;

  const marginOfError = 1.96 * Math.sqrt(
    (groupA.rate * (1 - groupA.rate) / visitorsA) +
    (groupB.rate * (1 - groupB.rate) / visitorsB)
  );

  return {
    absoluteDifference: difference,
    absoluteDifferencePercent: `${(difference * 100).toFixed(2)}%p`,
    relativeImprovement: `${relativeImprovement.toFixed(2)}%`,
    confidenceInterval: {
      lower: `${((difference - marginOfError) * 100).toFixed(2)}%p`,
      upper: `${((difference + marginOfError) * 100).toFixed(2)}%p`
    }
  };
}

function generateConclusion(
  pValue: number,
  difference: number,
  relativeImprovement: number
): string {
  const isSignificant = pValue < 0.05;
  const isBetter = difference > 0;

  if (isSignificant && isBetter) {
    return `B안이 A안보다 ${relativeImprovement.toFixed(1)}% 더 좋습니다. (통계적으로 유의미)`;
  } else if (isSignificant && !isBetter) {
    return `B안이 A안보다 ${Math.abs(relativeImprovement).toFixed(1)}% 나쁩니다. (통계적으로 유의미)`;
  } else {
    return `통계적으로 유의미한 차이가 없습니다. (p = ${pValue.toFixed(4)}) 샘플을 더 모으거나, 다른 변수를 테스트하세요.`;
  }
}

/**
 * 카이제곱 검정
 */
export function chiSquareTest(input: ABTestInput): ChiSquareResult {
  const { visitorsA, conversionsA, visitorsB, conversionsB } = input;

  const nonConversionsA = visitorsA - conversionsA;
  const nonConversionsB = visitorsB - conversionsB;

  const total = visitorsA + visitorsB;
  const totalConversions = conversionsA + conversionsB;
  const totalNonConversions = nonConversionsA + nonConversionsB;

  const expectedA_conv = (visitorsA * totalConversions) / total;
  const expectedA_nonconv = (visitorsA * totalNonConversions) / total;
  const expectedB_conv = (visitorsB * totalConversions) / total;
  const expectedB_nonconv = (visitorsB * totalNonConversions) / total;

  const chiSquare =
    Math.pow(conversionsA - expectedA_conv, 2) / expectedA_conv +
    Math.pow(nonConversionsA - expectedA_nonconv, 2) / expectedA_nonconv +
    Math.pow(conversionsB - expectedB_conv, 2) / expectedB_conv +
    Math.pow(nonConversionsB - expectedB_nonconv, 2) / expectedB_nonconv;

  const pValue = 1 - chiSquareCDF(chiSquare, 1);

  return {
    chiSquare: chiSquare.toFixed(4),
    pValue: pValue.toFixed(4),
    isSignificant: pValue < 0.05
  };
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
