/**
 * 샘플 사이즈 계산 컨트롤러
 * MVC Pattern - Controller
 */

import type { SampleSizeInput, SampleSizeResult, SampleSizeTableRow } from '../models';
import { getZScore } from '../utils';
import { toPercent } from '../utils';

/**
 * 샘플 사이즈 컨트롤러
 */
export class SampleSizeController {
  /**
   * 필요한 샘플 사이즈 계산
   * @param input - 샘플 사이즈 입력 데이터
   * @returns 샘플 사이즈 결과
   */
  calculate(input: SampleSizeInput): SampleSizeResult {
    const {
      baselineRate,
      mde,
      alpha = 0.05,
      power = 0.8
    } = input;

    // Z-score 계산
    const zAlpha = getZScore(1 - alpha / 2); // 양측검정
    const zBeta = getZScore(power);

    // 기대 전환율
    const expectedRate = baselineRate * (1 + mde);

    // 합동 전환율
    const pooledRate = (baselineRate + expectedRate) / 2;

    // 샘플 사이즈 공식
    const effect = Math.abs(expectedRate - baselineRate);
    const variance = pooledRate * (1 - pooledRate);

    const sampleSize = Math.ceil(
      (2 * variance * Math.pow(zAlpha + zBeta, 2)) / Math.pow(effect, 2)
    );

    return {
      perGroup: sampleSize,
      total: sampleSize * 2,
      baselineRate: toPercent(baselineRate),
      expectedRate: toPercent(expectedRate),
      mde: `${(mde * 100).toFixed(0)}%`,
      alpha,
      power
    };
  }

  /**
   * 샘플 사이즈 참고표 생성
   * @returns 샘플 사이즈 테이블 데이터
   */
  generateTable(): SampleSizeTableRow[] {
    const baselineRates = [0.01, 0.02, 0.05, 0.1];
    const table: SampleSizeTableRow[] = [];

    for (const baseline of baselineRates) {
      const mde10 = this.calculate({ baselineRate: baseline, mde: 0.1 }).perGroup;
      const mde15 = this.calculate({ baselineRate: baseline, mde: 0.15 }).perGroup;
      const mde20 = this.calculate({ baselineRate: baseline, mde: 0.2 }).perGroup;

      table.push({
        baseline: `${(baseline * 100).toFixed(0)}%`,
        mde10,
        mde15,
        mde20
      });
    }

    return table;
  }
}

// 싱글톤 인스턴스 내보내기
export const sampleSizeController = new SampleSizeController();
