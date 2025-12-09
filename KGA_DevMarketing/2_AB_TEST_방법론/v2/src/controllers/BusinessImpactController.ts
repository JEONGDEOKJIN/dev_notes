/**
 * 비즈니스 영향 계산 컨트롤러
 * MVC Pattern - Controller
 */

import type { BusinessImpact } from '../models';

/**
 * 비즈니스 영향 컨트롤러
 */
export class BusinessImpactController {
  /**
   * 비즈니스 영향 계산
   * @param improvement - 전환율 개선 (절대적 차이)
   * @param monthlyConversions - 월간 전환 수
   * @param avgOrderValue - 평균 주문 가치
   * @returns 비즈니스 영향 결과
   */
  calculate(
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

  /**
   * 연간 영향 계산
   * @param monthlyImpact - 월간 비즈니스 영향
   * @returns 연간 비즈니스 영향
   */
  calculateYearly(monthlyImpact: BusinessImpact): BusinessImpact {
    return {
      additionalConversions: monthlyImpact.additionalConversions * 12,
      additionalRevenue: monthlyImpact.additionalRevenue * 12
    };
  }

  /**
   * ROI 계산
   * @param additionalRevenue - 추가 매출
   * @param testCost - 테스트 비용
   * @returns ROI 퍼센트
   */
  calculateROI(additionalRevenue: number, testCost: number): number {
    if (testCost === 0) return 0;
    return ((additionalRevenue - testCost) / testCost) * 100;
  }
}

// 싱글톤 인스턴스 내보내기
export const businessImpactController = new BusinessImpactController();
