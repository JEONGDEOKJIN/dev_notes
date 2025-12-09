/**
 * 포맷팅 유틸리티 함수
 * MVC Pattern - Utils
 */

/**
 * 숫자를 퍼센트 문자열로 변환
 * @param value - 소수점 값 (0.02 = 2%)
 * @param decimals - 소수점 자릿수
 * @returns 퍼센트 문자열
 */
export function toPercent(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * 숫자를 퍼센트 포인트 문자열로 변환
 * @param value - 소수점 값
 * @param decimals - 소수점 자릿수
 * @returns 퍼센트 포인트 문자열
 */
export function toPercentPoint(value: number, decimals: number = 2): string {
  return `${(value * 100).toFixed(decimals)}%p`;
}

/**
 * 숫자를 로케일 문자열로 변환
 * @param value - 숫자
 * @returns 로케일 포맷 문자열
 */
export function toLocaleNumber(value: number): string {
  return value.toLocaleString();
}

/**
 * 숫자를 통화 문자열로 변환
 * @param value - 숫자
 * @param currency - 통화 단위
 * @returns 통화 포맷 문자열
 */
export function toCurrency(value: number, currency: string = '원'): string {
  return `${value.toLocaleString()}${currency}`;
}

/**
 * 소수점 고정 포맷
 * @param value - 숫자
 * @param decimals - 소수점 자릿수
 * @returns 고정 소수점 문자열
 */
export function toFixed(value: number, decimals: number = 4): string {
  return value.toFixed(decimals);
}

/**
 * 구분선 생성
 * @param char - 구분 문자
 * @param length - 길이
 * @returns 구분선 문자열
 */
export function createSeparator(char: string = '-', length: number = 40): string {
  return char.repeat(length);
}
