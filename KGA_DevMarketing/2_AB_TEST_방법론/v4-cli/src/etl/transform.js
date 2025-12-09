/**
 * TRANSFORM - 추출된 데이터를 AB TEST 형식으로 변환
 */

/**
 * Meta API 응답을 AB TEST 형식으로 변환
 *
 * @param {Object[]} rawData - Meta API 원본 데이터
 * @param {Object} options - 변환 옵션
 * @param {string} options.conversionType - 전환 타입 (purchase, lead, add_to_cart 등)
 * @param {string} options.visitorMetric - 방문자 지표 (impressions, clicks)
 * @returns {Object[]} 변환된 데이터
 */
export function transformMetaData(rawData, options = {}) {
  const {
    conversionType = 'purchase',
    visitorMetric = 'clicks'
  } = options;

  const transformed = rawData.map(ad => {
    // 전환 수 추출 (actions 배열에서)
    const conversions = extractConversions(ad.actions, conversionType);

    // 방문자 수 (클릭 또는 노출)
    const visitors = parseInt(ad[visitorMetric]) || 0;

    // 전환율 계산
    const conversionRate = visitors > 0 ? (conversions / visitors) : 0;

    return {
      id: ad.ad_id,
      name: ad.ad_name,
      campaign: ad.campaign_name,

      // 핵심 지표
      impressions: parseInt(ad.impressions) || 0,
      clicks: parseInt(ad.clicks) || 0,
      conversions: conversions,
      spend: parseFloat(ad.spend) || 0,

      // 계산된 지표
      ctr: parseFloat(ad.ctr) || 0,
      cpc: parseFloat(ad.cpc) || 0,
      conversionRate: conversionRate,
      costPerConversion: conversions > 0 ? (parseFloat(ad.spend) / conversions) : 0,

      // AB TEST용
      visitors: visitors,

      // 원본 데이터 보존
      _raw: ad
    };
  });

  console.log(`🔄 Transform: ${transformed.length}개 광고 데이터 변환 완료`);

  return transformed;
}

/**
 * actions 배열에서 특정 전환 타입의 값 추출
 */
function extractConversions(actions, conversionType) {
  if (!actions || !Array.isArray(actions)) return 0;

  const action = actions.find(a => a.action_type === conversionType);
  return action ? parseInt(action.value) : 0;
}

/**
 * 두 광고를 AB TEST 형식으로 매핑
 *
 * @param {Object[]} transformedData - 변환된 광고 데이터
 * @param {string} adIdA - A안 광고 ID 또는 이름
 * @param {string} adIdB - B안 광고 ID 또는 이름
 * @returns {Object} AB TEST CONFIG 형식
 */
export function mapToABTest(transformedData, adIdA, adIdB) {
  const adA = transformedData.find(ad =>
    ad.id === adIdA || ad.name.includes(adIdA)
  );
  const adB = transformedData.find(ad =>
    ad.id === adIdB || ad.name.includes(adIdB)
  );

  if (!adA || !adB) {
    throw new Error(`광고를 찾을 수 없습니다. A: ${adIdA}, B: ${adIdB}`);
  }

  return {
    testName: `${adA.name} vs ${adB.name}`,
    hypothesis: `${adB.name}이 ${adA.name}보다 전환율이 높을 것`,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],

    // A안 (Control)
    visitorsA: adA.visitors,
    conversionsA: adA.conversions,

    // B안 (Variant)
    visitorsB: adB.visitors,
    conversionsB: adB.conversions,

    // 비용 데이터
    spendA: adA.spend,
    spendB: adB.spend,

    // 메타데이터
    _adA: adA,
    _adB: adB
  };
}

/**
 * 여러 광고를 한 번에 비교 테이블로 변환
 *
 * @param {Object[]} transformedData - 변환된 광고 데이터
 * @returns {Object} 비교 테이블 데이터
 */
export function createComparisonTable(transformedData) {
  // 전환율 기준 정렬
  const sorted = [...transformedData].sort((a, b) => b.conversionRate - a.conversionRate);

  return {
    summary: {
      totalAds: sorted.length,
      totalSpend: sorted.reduce((sum, ad) => sum + ad.spend, 0),
      totalConversions: sorted.reduce((sum, ad) => sum + ad.conversions, 0),
      avgConversionRate: sorted.reduce((sum, ad) => sum + ad.conversionRate, 0) / sorted.length
    },
    ranking: sorted.map((ad, idx) => ({
      rank: idx + 1,
      name: ad.name,
      visitors: ad.visitors,
      conversions: ad.conversions,
      conversionRate: (ad.conversionRate * 100).toFixed(2) + '%',
      spend: ad.spend,
      costPerConversion: ad.costPerConversion.toFixed(0) + '원'
    })),
    bestPerformer: sorted[0],
    worstPerformer: sorted[sorted.length - 1]
  };
}

/**
 * CSV 헤더 매핑 (Meta 광고 관리자 내보내기 파일용)
 */
export const CSV_HEADER_MAP = {
  // 한국어 헤더 → 영어 키
  '광고 이름': 'ad_name',
  '광고 ID': 'ad_id',
  '캠페인 이름': 'campaign_name',
  '노출': 'impressions',
  '클릭(전체)': 'clicks',
  '지출 금액 (KRW)': 'spend',
  '결과': 'conversions',
  'CTR(전체)': 'ctr',
  'CPC(전체)': 'cpc',

  // 영어 헤더 (기본)
  'Ad name': 'ad_name',
  'Ad ID': 'ad_id',
  'Campaign name': 'campaign_name',
  'Impressions': 'impressions',
  'Clicks (all)': 'clicks',
  'Amount spent (KRW)': 'spend',
  'Results': 'conversions',
  'CTR (all)': 'ctr',
  'CPC (all)': 'cpc'
};

/**
 * CSV 데이터를 표준 형식으로 변환
 */
export function transformCSVData(csvData) {
  return csvData.map(row => {
    const normalized = {};

    for (const [key, value] of Object.entries(row)) {
      const mappedKey = CSV_HEADER_MAP[key] || key;
      normalized[mappedKey] = value;
    }

    return {
      ad_id: normalized.ad_id || '',
      ad_name: normalized.ad_name || '',
      campaign_name: normalized.campaign_name || '',
      impressions: normalized.impressions || '0',
      clicks: normalized.clicks || '0',
      spend: normalized.spend?.replace(/,/g, '') || '0',
      actions: [
        { action_type: 'purchase', value: normalized.conversions || '0' }
      ],
      ctr: normalized.ctr?.replace('%', '') || '0',
      cpc: normalized.cpc?.replace(/,/g, '') || '0'
    };
  });
}
