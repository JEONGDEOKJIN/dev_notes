/**
 * AB TEST 분석 라이브러리
 * MVC Pattern - Main Entry Point
 *
 * @description
 * 마케팅 AB TEST를 위한 통계 분석 도구
 * - 샘플 사이즈 계산
 * - AB TEST 결과 분석 (Z-검정, 카이제곱 검정)
 * - 비즈니스 영향 분석
 * - 리포트 생성 및 내보내기 (JSON, Markdown, CSV, HTML)
 *
 * @example
 * import {
 *   sampleSizeController,
 *   abTestController,
 *   consoleView
 * } from './index';
 *
 * // 샘플 사이즈 계산
 * const sampleSize = sampleSizeController.calculate({
 *   baselineRate: 0.02,
 *   mde: 0.2
 * });
 *
 * // AB TEST 분석
 * const result = abTestController.analyze({
 *   visitorsA: 10000,
 *   conversionsA: 200,
 *   visitorsB: 10000,
 *   conversionsB: 250
 * });
 *
 * // 리포트 출력
 * consoleView.printFullReport(config, result);
 */

// ============================================
// Models (타입)
// ============================================
export type {
  // 입력 타입
  SampleSizeInput,
  ABTestInput,
  ABTestConfig,
  // 출력 타입
  SampleSizeResult,
  GroupStats,
  ConfidenceInterval,
  StatisticsResult,
  EffectSize,
  ABTestResult,
  ChiSquareResult,
  BusinessImpact,
  // 뷰 모델
  ReportViewModel,
  SampleSizeTableRow
} from './models';

// ============================================
// Utils (유틸리티 함수)
// ============================================
export {
  // 통계 함수
  getZScore,
  normalCDF,
  logGamma,
  gammaCDF,
  chiSquareCDF,
  getSignificanceLevel,
  // 포맷터
  toPercent,
  toPercentPoint,
  toLocaleNumber,
  toCurrency,
  toFixed,
  createSeparator
} from './utils';

// ============================================
// Controllers (비즈니스 로직)
// ============================================
export {
  SampleSizeController,
  sampleSizeController,
  ABTestController,
  abTestController,
  BusinessImpactController,
  businessImpactController
} from './controllers';

// ============================================
// Views (출력)
// ============================================
export {
  ConsoleView,
  consoleView,
  ExportView,
  exportView
} from './views';
