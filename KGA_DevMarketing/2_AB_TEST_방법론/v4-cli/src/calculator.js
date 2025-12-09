/**
 * AB TEST 계산 함수
 */

import { getZScore, normalCDF, getSignificanceLevel } from './statistics.js';

/**
 * 샘플 사이즈 계산
 */
export function calculateSampleSize({ baselineRate, mde, alpha = 0.05, power = 0.8 }) {
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
    mde: `${(mde * 100).toFixed(0)}%`
  };
}

/**
 * AB TEST 분석
 */
export function analyzeABTest({ visitorsA, conversionsA, visitorsB, conversionsB }) {
  const rateA = conversionsA / visitorsA;
  const rateB = conversionsB / visitorsB;

  // Z-검정
  const pooledRate = (conversionsA + conversionsB) / (visitorsA + visitorsB);
  const standardError = Math.sqrt(
    pooledRate * (1 - pooledRate) * (1 / visitorsA + 1 / visitorsB)
  );
  const zScore = (rateB - rateA) / standardError;
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));

  // 효과 크기
  const difference = rateB - rateA;
  const relativeImprovement = ((rateB - rateA) / rateA) * 100;

  // 신뢰구간
  const marginOfError = 1.96 * Math.sqrt(
    (rateA * (1 - rateA) / visitorsA) + (rateB * (1 - rateB) / visitorsB)
  );

  // 결론
  const isSignificant = pValue < 0.05;
  const isBetter = difference > 0;
  let conclusion;
  if (isSignificant && isBetter) {
    conclusion = `✅ B안 승리! ${relativeImprovement.toFixed(1)}% 개선 (유의미)`;
  } else if (isSignificant && !isBetter) {
    conclusion = `❌ B안 패배. ${Math.abs(relativeImprovement).toFixed(1)}% 하락 (유의미)`;
  } else {
    conclusion = `⚠️ 유의미한 차이 없음 (p=${pValue.toFixed(4)})`;
  }

  return {
    groupA: { visitors: visitorsA, conversions: conversionsA, rate: rateA, ratePercent: `${(rateA * 100).toFixed(2)}%` },
    groupB: { visitors: visitorsB, conversions: conversionsB, rate: rateB, ratePercent: `${(rateB * 100).toFixed(2)}%` },
    statistics: {
      zScore: zScore.toFixed(4),
      pValue: pValue.toFixed(4),
      isSignificant,
      significanceLevel: getSignificanceLevel(pValue)
    },
    effect: {
      absoluteDifference: `${(difference * 100).toFixed(2)}%p`,
      relativeImprovement: `${relativeImprovement.toFixed(2)}%`,
      confidenceInterval: {
        lower: `${((difference - marginOfError) * 100).toFixed(2)}%p`,
        upper: `${((difference + marginOfError) * 100).toFixed(2)}%p`
      }
    },
    conclusion
  };
}

/**
 * 비즈니스 영향 계산
 */
export function calculateBusinessImpact(improvement, monthlyConversions, avgOrderValue) {
  const additionalConversions = Math.round(monthlyConversions * improvement);
  const additionalRevenue = additionalConversions * avgOrderValue;
  return { additionalConversions, additionalRevenue };
}
