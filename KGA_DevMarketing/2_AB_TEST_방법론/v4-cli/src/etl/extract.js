/**
 * EXTRACT - Meta Marketing API에서 광고 데이터 추출
 *
 * Meta API 문서: https://developers.facebook.com/docs/marketing-api
 */

/**
 * Meta API 설정
 * .env 파일 또는 환경변수에서 가져오기
 */
const META_CONFIG = {
  accessToken: process.env.META_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN',
  adAccountId: process.env.META_AD_ACCOUNT_ID || 'act_XXXXXXXXX',
  apiVersion: 'v18.0'
};

/**
 * Meta API에서 광고 인사이트 데이터 추출
 *
 * @param {Object} options - 추출 옵션
 * @param {string} options.dateStart - 시작일 (YYYY-MM-DD)
 * @param {string} options.dateEnd - 종료일 (YYYY-MM-DD)
 * @param {string} options.level - 데이터 레벨 (campaign, adset, ad)
 * @param {string[]} options.adIds - 비교할 광고 ID 배열 (선택)
 * @returns {Promise<Object[]>} 광고 데이터 배열
 */
export async function extractFromMeta(options) {
  const {
    dateStart,
    dateEnd,
    level = 'ad',
    adIds = null
  } = options;

  const baseUrl = `https://graph.facebook.com/${META_CONFIG.apiVersion}`;

  // 요청할 필드
  const fields = [
    'ad_id',
    'ad_name',
    'adset_id',
    'adset_name',
    'campaign_id',
    'campaign_name',
    'impressions',
    'clicks',
    'spend',
    'actions',           // 전환 데이터
    'cost_per_action_type',
    'ctr',
    'cpc',
    'cpm'
  ].join(',');

  // 필터링 (특정 광고만)
  let filtering = '';
  if (adIds && adIds.length > 0) {
    filtering = `&filtering=[{"field":"ad.id","operator":"IN","value":${JSON.stringify(adIds)}}]`;
  }

  const url = `${baseUrl}/${META_CONFIG.adAccountId}/insights?` +
    `level=${level}` +
    `&fields=${fields}` +
    `&time_range={"since":"${dateStart}","until":"${dateEnd}"}` +
    `&time_increment=all_days` +
    filtering +
    `&access_token=${META_CONFIG.accessToken}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Meta API Error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    console.log(`✅ Meta API: ${data.data?.length || 0}개 광고 데이터 추출 완료`);

    return data.data || [];

  } catch (error) {
    console.error('❌ Meta API 추출 실패:', error.message);
    throw error;
  }
}

/**
 * Mock 데이터 (API 없이 테스트용)
 */
export function extractMockData() {
  console.log('📦 Mock 데이터 사용 (테스트 모드)');

  return [
    {
      ad_id: '123456789001',
      ad_name: '이미지_소재_A',
      campaign_name: '12월_프로모션',
      impressions: '50000',
      clicks: '2500',
      spend: '500000',
      actions: [
        { action_type: 'purchase', value: '75' },
        { action_type: 'lead', value: '120' }
      ],
      ctr: '5.0',
      cpc: '200'
    },
    {
      ad_id: '123456789002',
      ad_name: '영상_소재_B',
      campaign_name: '12월_프로모션',
      impressions: '48000',
      clicks: '2880',
      spend: '480000',
      actions: [
        { action_type: 'purchase', value: '108' },
        { action_type: 'lead', value: '150' }
      ],
      ctr: '6.0',
      cpc: '166.67'
    },
    {
      ad_id: '123456789003',
      ad_name: '카루셀_소재_C',
      campaign_name: '12월_프로모션',
      impressions: '45000',
      clicks: '2250',
      spend: '450000',
      actions: [
        { action_type: 'purchase', value: '68' },
        { action_type: 'lead', value: '95' }
      ],
      ctr: '5.0',
      cpc: '200'
    }
  ];
}

/**
 * CSV 파일에서 데이터 추출 (Meta 광고 관리자 내보내기 파일)
 *
 * @param {string} filePath - CSV 파일 경로
 * @returns {Promise<Object[]>} 파싱된 데이터
 */
export async function extractFromCSV(filePath) {
  const fs = await import('fs');
  const path = await import('path');

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx];
    });
    data.push(row);
  }

  console.log(`✅ CSV: ${data.length}개 행 추출 완료`);
  return data;
}
