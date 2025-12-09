/**
 * AB TEST 분석 컨트롤러
 * MVC Pattern - Controller
 */

import type {
  ABTestInput,
  ABTestResult,
  GroupStats,
  StatisticsResult,
  EffectSize,
  ChiSquareResult
} from '../models';
import { normalCDF, chiSquareCDF, getSignificanceLevel } from '../utils';
import { toPercent, toPercentPoint, toFixed } from '../utils';

/**
 * AB TEST 컨트롤러
 */
export class ABTestController {
  /**
   * AB TEST 결과 분석 (Z-검정)
   * @param input - AB TEST 입력 데이터
   * @returns AB TEST 분석 결과
   */
  analyze(input: ABTestInput): ABTestResult {
    const { visitorsA, conversionsA, visitorsB, conversionsB } = input;

    // 그룹별 통계
    const groupA = this.calculateGroupStats(visitorsA, conversionsA);
    const groupB = this.calculateGroupStats(visitorsB, conversionsB);

    // 통계 검증
    const statistics = this.calculateStatistics(input);

    // 효과 크기
    const effect = this.calculateEffect(groupA, groupB, visitorsA, visitorsB);

    // 결론 생성
    const pValue = parseFloat(statistics.pValue);
    const relativeImprovement = parseFloat(effect.relativeImprovement);
    const conclusion = this.generateConclusion(pValue, effect.absoluteDifference, relativeImprovement);

    return {
      groupA,
      groupB,
      statistics,
      effect,
      conclusion
    };
  }

  /**
   * 카이제곱 검정
   * @param input - AB TEST 입력 데이터
   * @returns 카이제곱 검정 결과
   */
  chiSquareTest(input: ABTestInput): ChiSquareResult {
    const { visitorsA, conversionsA, visitorsB, conversionsB } = input;

    const nonConversionsA = visitorsA - conversionsA;
    const nonConversionsB = visitorsB - conversionsB;

    const total = visitorsA + visitorsB;
    const totalConversions = conversionsA + conversionsB;
    const totalNonConversions = nonConversionsA + nonConversionsB;

    // 기대값 계산
    const expectedA_conv = (visitorsA * totalConversions) / total;
    const expectedA_nonconv = (visitorsA * totalNonConversions) / total;
    const expectedB_conv = (visitorsB * totalConversions) / total;
    const expectedB_nonconv = (visitorsB * totalNonConversions) / total;

    // 카이제곱 통계량
    const chiSquare =
      Math.pow(conversionsA - expectedA_conv, 2) / expectedA_conv +
      Math.pow(nonConversionsA - expectedA_nonconv, 2) / expectedA_nonconv +
      Math.pow(conversionsB - expectedB_conv, 2) / expectedB_conv +
      Math.pow(nonConversionsB - expectedB_nonconv, 2) / expectedB_nonconv;

    // p-value (자유도 1)
    const pValue = 1 - chiSquareCDF(chiSquare, 1);

    return {
      chiSquare: toFixed(chiSquare),
      pValue: toFixed(pValue),
      isSignificant: pValue < 0.05
    };
  }

  /**
   * 그룹 통계 계산
   */
  private calculateGroupStats(visitors: number, conversions: number): GroupStats {
    const rate = conversions / visitors;
    return {
      visitors,
      conversions,
      rate,
      ratePercent: toPercent(rate)
    };
  }

  /**
   * 통계 검증 (Z-검정)
   */
  private calculateStatistics(input: ABTestInput): StatisticsResult {
    const { visitorsA, conversionsA, visitorsB, conversionsB } = input;

    const rateA = conversionsA / visitorsA;
    const rateB = conversionsB / visitorsB;

    // 합동 전환율
    const pooledRate = (conversionsA + conversionsB) / (visitorsA + visitorsB);

    // 표준오차
    const standardError = Math.sqrt(
      pooledRate * (1 - pooledRate) * (1 / visitorsA + 1 / visitorsB)
    );

    // Z-score
    const zScore = (rateB - rateA) / standardError;

    // p-value (양측검정)
    const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));

    return {
      zScore: toFixed(zScore),
      pValue: toFixed(pValue),
      isSignificant: pValue < 0.05,
      significanceLevel: getSignificanceLevel(pValue)
    };
  }

  /**
   * 효과 크기 계산
   */
  private calculateEffect(
    groupA: GroupStats,
    groupB: GroupStats,
    visitorsA: number,
    visitorsB: number
  ): EffectSize {
    const difference = groupB.rate - groupA.rate;
    const relativeImprovement = ((groupB.rate - groupA.rate) / groupA.rate) * 100;

    // 95% 신뢰구간
    const marginOfError = 1.96 * Math.sqrt(
      (groupA.rate * (1 - groupA.rate) / visitorsA) +
      (groupB.rate * (1 - groupB.rate) / visitorsB)
    );

    return {
      absoluteDifference: difference,
      absoluteDifferencePercent: toPercentPoint(difference),
      relativeImprovement: `${relativeImprovement.toFixed(2)}%`,
      confidenceInterval: {
        lower: toPercentPoint(difference - marginOfError),
        upper: toPercentPoint(difference + marginOfError)
      }
    };
  }

  /**
   * 결론 생성
   */
  private generateConclusion(
    pValue: number,
    difference: number,
    relativeImprovement: number
  ): string {
    const isSignificant = pValue < 0.05;
    const isBetter = difference > 0;

    if (isSignificant && isBetter) {
      return `✅ B안이 A안보다 ${relativeImprovement.toFixed(1)}% 더 좋습니다. (통계적으로 유의미)`;
    } else if (isSignificant && !isBetter) {
      return `❌ B안이 A안보다 ${Math.abs(relativeImprovement).toFixed(1)}% 나쁩니다. (통계적으로 유의미)`;
    } else {
      return `⚠️ 통계적으로 유의미한 차이가 없습니다. (p = ${pValue.toFixed(4)})\n   → 샘플을 더 모으거나, 다른 변수를 테스트하세요.`;
    }
  }
}

// 싱글톤 인스턴스 내보내기
export const abTestController = new ABTestController();
