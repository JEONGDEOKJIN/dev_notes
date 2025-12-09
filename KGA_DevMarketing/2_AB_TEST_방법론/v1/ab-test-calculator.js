/**
 * AB TEST 계산기
 *
 * 기능:
 * 1. 샘플 사이즈 계산
 * 2. 통계 검증 (카이제곱, Z-검정)
 * 3. 결과 해석
 *
 * 사용법:
 * node ab-test-calculator.js
 */

// ============================================
// 1. 샘플 사이즈 계산
// ============================================

/**
 * 필요한 샘플 사이즈 계산
 * @param {number} baselineRate - 현재 전환율 (예: 0.02 = 2%)
 * @param {number} mde - 최소 감지 효과 (예: 0.2 = 20% 개선)
 * @param {number} alpha - 유의수준 (기본: 0.05)
 * @param {number} power - 검정력 (기본: 0.8)
 * @returns {object} 샘플 사이즈 정보
 */
function calculateSampleSize(baselineRate, mde, alpha = 0.05, power = 0.8) {
  // Z-score 값
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
    2 * variance * Math.pow(zAlpha + zBeta, 2) / Math.pow(effect, 2)
  );

  return {
    perGroup: sampleSize,
    total: sampleSize * 2,
    baselineRate: (baselineRate * 100).toFixed(2) + '%',
    expectedRate: (expectedRate * 100).toFixed(2) + '%',
    mde: (mde * 100).toFixed(0) + '%',
    alpha,
    power
  };
}

/**
 * Z-score 근사 계산 (역 정규 분포)
 */
function getZScore(p) {
  // Abramowitz and Stegun 근사
  if (p <= 0 || p >= 1) return 0;

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

  let q, r;

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


// ============================================
// 2. 통계 검증
// ============================================

/**
 * AB TEST 결과 검증 (Z-검정)
 * @param {number} visitorsA - A안 방문자 수
 * @param {number} conversionsA - A안 전환 수
 * @param {number} visitorsB - B안 방문자 수
 * @param {number} conversionsB - B안 전환 수
 * @returns {object} 검증 결과
 */
function analyzeABTest(visitorsA, conversionsA, visitorsB, conversionsB) {
  // 전환율 계산
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

  // 신뢰구간 (95%)
  const marginOfError = 1.96 * Math.sqrt(
    (rateA * (1 - rateA) / visitorsA) + (rateB * (1 - rateB) / visitorsB)
  );
  const difference = rateB - rateA;
  const confidenceInterval = {
    lower: difference - marginOfError,
    upper: difference + marginOfError
  };

  // 상대적 개선율
  const relativeImprovement = ((rateB - rateA) / rateA) * 100;

  return {
    // 기본 데이터
    groupA: {
      visitors: visitorsA,
      conversions: conversionsA,
      rate: rateA,
      ratePercent: (rateA * 100).toFixed(2) + '%'
    },
    groupB: {
      visitors: visitorsB,
      conversions: conversionsB,
      rate: rateB,
      ratePercent: (rateB * 100).toFixed(2) + '%'
    },

    // 통계 결과
    statistics: {
      zScore: zScore.toFixed(4),
      pValue: pValue.toFixed(4),
      isSignificant: pValue < 0.05,
      significanceLevel: getSignificanceLevel(pValue)
    },

    // 효과 크기
    effect: {
      absoluteDifference: difference,
      absoluteDifferencePercent: (difference * 100).toFixed(2) + '%p',
      relativeImprovement: relativeImprovement.toFixed(2) + '%',
      confidenceInterval: {
        lower: (confidenceInterval.lower * 100).toFixed(2) + '%p',
        upper: (confidenceInterval.upper * 100).toFixed(2) + '%p'
      }
    },

    // 결론
    conclusion: generateConclusion(pValue, difference, relativeImprovement)
  };
}

/**
 * 정규 분포 CDF (누적 분포 함수)
 */
function normalCDF(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

/**
 * 유의수준 판정
 */
function getSignificanceLevel(pValue) {
  if (pValue < 0.001) return '*** (p < 0.001, 매우 강한 증거)';
  if (pValue < 0.01) return '** (p < 0.01, 강한 증거)';
  if (pValue < 0.05) return '* (p < 0.05, 유의미)';
  if (pValue < 0.1) return '. (p < 0.1, 약한 증거)';
  return '유의미하지 않음 (p >= 0.1)';
}

/**
 * 결론 생성
 */
function generateConclusion(pValue, difference, relativeImprovement) {
  const isSignificant = pValue < 0.05;
  const isBetter = difference > 0;

  if (isSignificant && isBetter) {
    return `✅ B안이 A안보다 ${relativeImprovement.toFixed(1)}% 더 좋습니다. (통계적으로 유의미)`;
  } else if (isSignificant && !isBetter) {
    return `❌ B안이 A안보다 ${Math.abs(relativeImprovement).toFixed(1)}% 나쁩니다. (통계적으로 유의미)`;
  } else {
    return `⚠️ 통계적으로 유의미한 차이가 없습니다. (p = ${pValue.toFixed(4)})
   → 샘플을 더 모으거나, 다른 변수를 테스트하세요.`;
  }
}


// ============================================
// 3. 카이제곱 검정
// ============================================

/**
 * 카이제곱 검정
 */
function chiSquareTest(visitorsA, conversionsA, visitorsB, conversionsB) {
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

  // p-value (자유도 1인 카이제곱 분포)
  const pValue = 1 - chiSquareCDF(chiSquare, 1);

  return {
    chiSquare: chiSquare.toFixed(4),
    pValue: pValue.toFixed(4),
    isSignificant: pValue < 0.05
  };
}

/**
 * 카이제곱 분포 CDF (근사)
 */
function chiSquareCDF(x, df) {
  if (x <= 0) return 0;
  return gammaCDF(x / 2, df / 2);
}

function gammaCDF(x, a) {
  if (x <= 0) return 0;
  if (a <= 0) return 0;

  // 하위 불완전 감마 함수 근사
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

function logGamma(x) {
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


// ============================================
// 4. 테스트 실행 템플릿
// ============================================

/**
 * AB TEST 전체 프로세스 실행
 */
function runABTestAnalysis(config) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 AB TEST 분석 리포트');
  console.log('='.repeat(60));

  // 테스트 정보
  console.log('\n📋 테스트 정보');
  console.log('-'.repeat(40));
  console.log(`테스트명: ${config.testName}`);
  console.log(`가설: ${config.hypothesis}`);
  console.log(`테스트 기간: ${config.startDate} ~ ${config.endDate}`);

  // 데이터
  console.log('\n📈 데이터');
  console.log('-'.repeat(40));
  console.log(`A안 (Control): ${config.visitorsA.toLocaleString()}명 방문, ${config.conversionsA.toLocaleString()}명 전환`);
  console.log(`B안 (Variant): ${config.visitorsB.toLocaleString()}명 방문, ${config.conversionsB.toLocaleString()}명 전환`);

  // 분석 실행
  const result = analyzeABTest(
    config.visitorsA,
    config.conversionsA,
    config.visitorsB,
    config.conversionsB
  );

  // 결과 출력
  console.log('\n📊 전환율 비교');
  console.log('-'.repeat(40));
  console.log(`A안: ${result.groupA.ratePercent}`);
  console.log(`B안: ${result.groupB.ratePercent}`);
  console.log(`차이: ${result.effect.absoluteDifferencePercent} (${result.effect.relativeImprovement})`);

  console.log('\n🔬 통계 검증');
  console.log('-'.repeat(40));
  console.log(`Z-score: ${result.statistics.zScore}`);
  console.log(`p-value: ${result.statistics.pValue}`);
  console.log(`유의수준: ${result.statistics.significanceLevel}`);
  console.log(`95% 신뢰구간: [${result.effect.confidenceInterval.lower}, ${result.effect.confidenceInterval.upper}]`);

  console.log('\n✅ 결론');
  console.log('-'.repeat(40));
  console.log(result.conclusion);

  // 비즈니스 영향 (옵션)
  if (config.monthlyConversions && config.avgOrderValue) {
    console.log('\n💰 비즈니스 영향 (예상)');
    console.log('-'.repeat(40));
    const improvement = result.effect.absoluteDifference;
    const additionalConversions = Math.round(config.monthlyConversions * improvement);
    const additionalRevenue = additionalConversions * config.avgOrderValue;
    console.log(`월간 추가 전환: ${additionalConversions.toLocaleString()}건`);
    console.log(`월간 추가 매출: ${additionalRevenue.toLocaleString()}원`);
  }

  console.log('\n' + '='.repeat(60));

  return result;
}


// ============================================
// 5. 예시 실행
// ============================================

// 예시 1: 샘플 사이즈 계산
console.log('\n📐 샘플 사이즈 계산 예시');
console.log('-'.repeat(40));
const sampleSize = calculateSampleSize(0.02, 0.2); // 2% 전환율, 20% 개선 기대
console.log('현재 전환율:', sampleSize.baselineRate);
console.log('기대 전환율:', sampleSize.expectedRate);
console.log('최소 감지 효과 (MDE):', sampleSize.mde);
console.log('그룹당 필요 샘플:', sampleSize.perGroup.toLocaleString(), '명');
console.log('총 필요 샘플:', sampleSize.total.toLocaleString(), '명');


// 예시 2: AB TEST 분석
const testConfig = {
  testName: '메타 광고 소재 테스트',
  hypothesis: '후기 영상 소재(B)가 이미지 소재(A)보다 CTR이 높을 것',
  startDate: '2024-12-01',
  endDate: '2024-12-07',

  // A안 (Control)
  visitorsA: 10000,
  conversionsA: 200,

  // B안 (Variant)
  visitorsB: 10000,
  conversionsB: 250,

  // 비즈니스 영향 계산용 (옵션)
  monthlyConversions: 1000,
  avgOrderValue: 1000000
};

runABTestAnalysis(testConfig);


// 예시 3: 유의미하지 않은 결과
const testConfig2 = {
  testName: '랜딩페이지 버튼 색상 테스트',
  hypothesis: '녹색 버튼(B)이 파란색 버튼(A)보다 전환율이 높을 것',
  startDate: '2024-12-01',
  endDate: '2024-12-07',

  visitorsA: 5000,
  conversionsA: 150,

  visitorsB: 5000,
  conversionsB: 155,
};

runABTestAnalysis(testConfig2);


// ============================================
// 모듈 내보내기 (Node.js 환경)
// ============================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateSampleSize,
    analyzeABTest,
    chiSquareTest,
    runABTestAnalysis
  };
}
