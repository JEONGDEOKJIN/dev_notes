/**
 * AB TEST 타입 정의
 * MVC Pattern - Models
 */

// ============================================
// 입력 타입 (Input DTOs)
// ============================================

/** 샘플 사이즈 계산 입력 */
export interface SampleSizeInput {
  baselineRate: number;  // 현재 전환율 (0.02 = 2%)
  mde: number;           // 최소 감지 효과 (0.2 = 20% 개선)
  alpha?: number;        // 유의수준 (기본: 0.05)
  power?: number;        // 검정력 (기본: 0.8)
}

/** AB TEST 데이터 입력 */
export interface ABTestInput {
  visitorsA: number;
  conversionsA: number;
  visitorsB: number;
  conversionsB: number;
}

/** AB TEST 전체 설정 */
export interface ABTestConfig extends ABTestInput {
  testName: string;
  hypothesis: string;
  startDate: string;
  endDate: string;
  monthlyConversions?: number;
  avgOrderValue?: number;
}

// ============================================
// 출력 타입 (Output DTOs)
// ============================================

/** 샘플 사이즈 계산 결과 */
export interface SampleSizeResult {
  perGroup: number;
  total: number;
  baselineRate: string;
  expectedRate: string;
  mde: string;
  alpha: number;
  power: number;
}

/** 그룹 통계 */
export interface GroupStats {
  visitors: number;
  conversions: number;
  rate: number;
  ratePercent: string;
}

/** 신뢰구간 */
export interface ConfidenceInterval {
  lower: string;
  upper: string;
}

/** 통계 검증 결과 */
export interface StatisticsResult {
  zScore: string;
  pValue: string;
  isSignificant: boolean;
  significanceLevel: string;
}

/** 효과 크기 */
export interface EffectSize {
  absoluteDifference: number;
  absoluteDifferencePercent: string;
  relativeImprovement: string;
  confidenceInterval: ConfidenceInterval;
}

/** AB TEST 분석 결과 */
export interface ABTestResult {
  groupA: GroupStats;
  groupB: GroupStats;
  statistics: StatisticsResult;
  effect: EffectSize;
  conclusion: string;
}

/** 카이제곱 검정 결과 */
export interface ChiSquareResult {
  chiSquare: string;
  pValue: string;
  isSignificant: boolean;
}

/** 비즈니스 영향 */
export interface BusinessImpact {
  additionalConversions: number;
  additionalRevenue: number;
}

// ============================================
// 뷰 모델 (View Models)
// ============================================

/** 리포트 출력용 뷰 모델 */
export interface ReportViewModel {
  config: ABTestConfig;
  result: ABTestResult;
  businessImpact?: BusinessImpact;
}

/** 샘플 사이즈 테이블 행 */
export interface SampleSizeTableRow {
  baseline: string;
  mde10: number;
  mde15: number;
  mde20: number;
}
