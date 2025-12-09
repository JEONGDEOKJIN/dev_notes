/**
 * 통계 유틸리티 함수
 *
 * Z-score, 정규분포 CDF, 카이제곱 분포 등
 * Abramowitz and Stegun 근사 알고리즘 사용
 */

/**
 * Z-score 계산 (역 정규 분포)
 * @param p - 확률값 (0 < p < 1)
 * @returns Z-score
 */
export function getZScore(p: number): number {
  if (p <= 0 || p >= 1) return 0;

  // Abramowitz and Stegun 계수
  const a1 = -3.969683028665376e+01;
  const a2 = 2.209460984245205e+02;
  const a3 = -2.759285104469687e+02;
  const a4 = 1.383577518672690e+02;
  const a5 = -3.066479806614716e+01;
  const a6 = 2.506628277459239e+00;

  const b1 = -5.447609879822406e+01;
  const b2 = 1.615858368580409e+02;
  const b3 = -1.556989798598866e+02;
  const b4 = 6.680131188771972e+01;
  const b5 = -1.328068155288572e+01;

  const c1 = -7.784894002430293e-03;
  const c2 = -3.223964580411365e-01;
  const c3 = -2.400758277161838e+00;
  const c4 = -2.549732539343734e+00;
  const c5 = 4.374664141464968e+00;
  const c6 = 2.938163982698783e+00;

  const d1 = 7.784695709041462e-03;
  const d2 = 3.224671290700398e-01;
  const d3 = 2.445134137142996e+00;
  const d4 = 3.754408661907416e+00;

  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  let q: number;
  let r: number;

  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
           ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
           (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
}

/**
 * 정규 분포 CDF (누적 분포 함수)
 * @param x - 입력값
 * @returns 누적 확률
 */
export function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

  return 0.5 * (1.0 + sign * y);
}

/**
 * 로그 감마 함수
 */
export function logGamma(x: number): number {
  const coefficients = [
    76.18009172947146,
    -86.50532032941677,
    24.01409824083091,
    -1.231739572450155,
    0.1208650973866179e-2,
    -0.5395239384953e-5
  ];

  let y = x;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;

  for (let j = 0; j < 6; j++) {
    ser += coefficients[j] / ++y;
  }

  return -tmp + Math.log(2.5066282746310005 * ser / x);
}

/**
 * 감마 분포 CDF (불완전 감마 함수)
 */
export function gammaCDF(x: number, a: number): number {
  if (x <= 0 || a <= 0) return 0;

  let sum = 0;
  let term = 1 / a;
  sum = term;

  for (let n = 1; n < 100; n++) {
    term *= x / (a + n);
    sum += term;
    if (Math.abs(term) < 1e-10) break;
  }

  return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
}

/**
 * 카이제곱 분포 CDF
 * @param x - 카이제곱 통계량
 * @param df - 자유도
 */
export function chiSquareCDF(x: number, df: number): number {
  if (x <= 0) return 0;
  return gammaCDF(x / 2, df / 2);
}

/**
 * 유의수준 판정
 * @param pValue - p-value
 * @returns 유의수준 설명
 */
export function getSignificanceLevel(pValue: number): string {
  if (pValue < 0.001) return '*** (p < 0.001, 매우 강한 증거)';
  if (pValue < 0.01) return '** (p < 0.01, 강한 증거)';
  if (pValue < 0.05) return '* (p < 0.05, 유의미)';
  if (pValue < 0.1) return '. (p < 0.1, 약한 증거)';
  return '유의미하지 않음 (p >= 0.1)';
}
