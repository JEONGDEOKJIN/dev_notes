/**
 * AB TEST 타입 정의
 */

// 입력 타입
export interface SampleSizeInput {
  baselineRate: number;
  mde: number;
  alpha?: number;
  power?: number;
}

export interface ABTestInput {
  visitorsA: number;
  conversionsA: number;
  visitorsB: number;
  conversionsB: number;
}

export interface ABTestConfig extends ABTestInput {
  testName: string;
  hypothesis: string;
  startDate: string;
  endDate: string;
  monthlyConversions?: number;
  avgOrderValue?: number;
}

// 출력 타입
export interface SampleSizeResult {
  perGroup: number;
  total: number;
  baselineRate: string;
  expectedRate: string;
  mde: string;
  alpha: number;
  power: number;
}

export interface GroupStats {
  visitors: number;
  conversions: number;
  rate: number;
  ratePercent: string;
}

export interface ConfidenceInterval {
  lower: string;
  upper: string;
}

export interface StatisticsResult {
  zScore: string;
  pValue: string;
  isSignificant: boolean;
  significanceLevel: string;
}

export interface EffectSize {
  absoluteDifference: number;
  absoluteDifferencePercent: string;
  relativeImprovement: string;
  confidenceInterval: ConfidenceInterval;
}

export interface ABTestResult {
  groupA: GroupStats;
  groupB: GroupStats;
  statistics: StatisticsResult;
  effect: EffectSize;
  conclusion: string;
}

export interface ChiSquareResult {
  chiSquare: string;
  pValue: string;
  isSignificant: boolean;
}

export interface BusinessImpact {
  additionalConversions: number;
  additionalRevenue: number;
}
