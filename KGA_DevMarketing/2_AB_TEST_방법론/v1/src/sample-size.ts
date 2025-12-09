/**
 * 샘플 사이즈 계산 모듈
 */

import type { SampleSizeInput, SampleSizeResult } from './types';
import { getZScore } from './statistics';

/**
 * 필요한 샘플 사이즈 계산
 *
 * @example
 * const result = calculateSampleSize({
 *   baselineRate: 0.02,  // 현재 전환율 2%
 *   mde: 0.2             // 20% 개선 기대
 * });
 * console.log(result.perGroup); // 그룹당 필요 샘플
 */
export function calculateSampleSize(input: SampleSizeInput): SampleSizeResult {
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
    baselineRate: `${(baselineRate * 100).toFixed(2)}%`,
    expectedRate: `${(expectedRate * 100).toFixed(2)}%`,
    mde: `${(mde * 100).toFixed(0)}%`,
    alpha,
    power
  };
}

/**
 * 샘플 사이즈 참고표 생성
 */
export function generateSampleSizeTable(): Map<string, Map<string, number>> {
  const baselineRates = [0.01, 0.02, 0.05, 0.1];
  const mdes = [0.1, 0.15, 0.2];

  const table = new Map<string, Map<string, number>>();

  for (const baseline of baselineRates) {
    const row = new Map<string, number>();
    for (const mde of mdes) {
      const result = calculateSampleSize({ baselineRate: baseline, mde });
      row.set(`MDE ${mde * 100}%`, result.perGroup);
    }
    table.set(`${baseline * 100}%`, row);
  }

  return table;
}

/**
 * 샘플 사이즈 참고표 출력
 */
export function printSampleSizeTable(): void {
  console.log('\n📊 샘플 사이즈 참고표 (α=0.05, power=0.8)');
  console.log('='.repeat(55));
  console.log('Baseline\t| MDE 10%\t| MDE 15%\t| MDE 20%');
  console.log('-'.repeat(55));

  const baselineRates = [0.01, 0.02, 0.05, 0.1];
  const mdes = [0.1, 0.15, 0.2];

  for (const baseline of baselineRates) {
    const row = [`${(baseline * 100).toFixed(0)}%`];
    for (const mde of mdes) {
      const result = calculateSampleSize({ baselineRate: baseline, mde });
      row.push(result.perGroup.toLocaleString());
    }
    console.log(row.join('\t\t| '));
  }
}
