/**
 * AB TEST 분석 라이브러리
 *
 * @description
 * 마케팅 AB TEST를 위한 통계 분석 도구
 * - 샘플 사이즈 계산
 * - AB TEST 결과 분석 (Z-검정, 카이제곱 검정)
 * - 리포트 생성 및 내보내기
 *
 * @example
 * import { analyzeABTest, calculateSampleSize, runABTestAnalysis } from './index';
 *
 * // 샘플 사이즈 계산
 * const sampleSize = calculateSampleSize({
 *   baselineRate: 0.02,
 *   mde: 0.2
 * });
 *
 * // AB TEST 분석
 * const result = analyzeABTest({
 *   visitorsA: 10000,
 *   conversionsA: 200,
 *   visitorsB: 10000,
 *   conversionsB: 250
 * });
 */

// 타입 내보내기
export type {
  SampleSizeInput,
  SampleSizeResult,
  ABTestInput,
  ABTestConfig,
  ABTestResult,
  GroupStats,
  StatisticsResult,
  EffectSize,
  ConfidenceInterval,
  ChiSquareResult,
  BusinessImpact
} from './types';

// 통계 함수 내보내기
export {
  getZScore,
  normalCDF,
  logGamma,
  gammaCDF,
  chiSquareCDF,
  getSignificanceLevel
} from './statistics';

// 샘플 사이즈 계산 내보내기
export {
  calculateSampleSize,
  generateSampleSizeTable,
  printSampleSizeTable
} from './sample-size';

// AB TEST 분석 내보내기
export {
  analyzeABTest,
  chiSquareTest
} from './ab-test';

// 리포트 생성 내보내기
export {
  runABTestAnalysis,
  calculateBusinessImpact,
  exportToJSON,
  exportToMarkdown
} from './reporter';
