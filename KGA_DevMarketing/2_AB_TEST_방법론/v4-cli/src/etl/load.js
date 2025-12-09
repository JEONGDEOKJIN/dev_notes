/**
 * LOAD - 변환된 데이터를 저장 및 로드
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 데이터 저장 경로
const DATA_DIR = join(__dirname, '../../data');

/**
 * 데이터 디렉토리 초기화
 */
function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
    console.log(`📁 데이터 디렉토리 생성: ${DATA_DIR}`);
  }
}

/**
 * AB TEST 데이터 저장
 *
 * @param {Object} config - AB TEST 설정
 * @param {string} testId - 테스트 ID (선택, 자동 생성)
 * @returns {string} 저장된 파일 경로
 */
export function saveABTestData(config, testId = null) {
  ensureDataDir();

  const id = testId || `test_${Date.now()}`;
  const filename = `${id}.json`;
  const filepath = join(DATA_DIR, filename);

  const data = {
    id,
    createdAt: new Date().toISOString(),
    config,
    status: 'saved'
  };

  writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`💾 저장 완료: ${filepath}`);

  return filepath;
}

/**
 * AB TEST 데이터 로드
 *
 * @param {string} testId - 테스트 ID
 * @returns {Object} 저장된 데이터
 */
export function loadABTestData(testId) {
  const filepath = join(DATA_DIR, `${testId}.json`);

  if (!existsSync(filepath)) {
    throw new Error(`데이터를 찾을 수 없습니다: ${testId}`);
  }

  const content = readFileSync(filepath, 'utf-8');
  const data = JSON.parse(content);

  console.log(`📂 로드 완료: ${testId}`);
  return data;
}

/**
 * 가장 최근 AB TEST 데이터 로드
 *
 * @returns {Object|null} 최근 데이터 또는 null
 */
export function loadLatestABTestData() {
  ensureDataDir();

  const files = readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.json'))
    .sort()
    .reverse();

  if (files.length === 0) {
    console.log('⚠️ 저장된 데이터가 없습니다.');
    return null;
  }

  const latestFile = files[0];
  const testId = latestFile.replace('.json', '');

  return loadABTestData(testId);
}

/**
 * 모든 저장된 테스트 목록 조회
 *
 * @returns {Object[]} 테스트 목록
 */
export function listAllTests() {
  ensureDataDir();

  const files = readdirSync(DATA_DIR)
    .filter(f => f.endsWith('.json'));

  const tests = files.map(filename => {
    const filepath = join(DATA_DIR, filename);
    const content = readFileSync(filepath, 'utf-8');
    const data = JSON.parse(content);

    return {
      id: data.id,
      testName: data.config?.testName || 'Unknown',
      createdAt: data.createdAt,
      visitorsA: data.config?.visitorsA,
      visitorsB: data.config?.visitorsB
    };
  });

  return tests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * 광고 원본 데이터 저장 (백업용)
 *
 * @param {Object[]} rawData - 원본 광고 데이터
 * @param {string} source - 데이터 소스 (meta, csv 등)
 */
export function saveRawData(rawData, source = 'meta') {
  ensureDataDir();

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `raw_${source}_${timestamp}.json`;
  const filepath = join(DATA_DIR, filename);

  writeFileSync(filepath, JSON.stringify(rawData, null, 2), 'utf-8');
  console.log(`💾 원본 데이터 백업: ${filename}`);

  return filepath;
}

/**
 * 분석 결과 저장
 *
 * @param {string} testId - 테스트 ID
 * @param {Object} result - 분석 결과
 */
export function saveAnalysisResult(testId, result) {
  const filepath = join(DATA_DIR, `${testId}.json`);

  if (!existsSync(filepath)) {
    throw new Error(`테스트를 찾을 수 없습니다: ${testId}`);
  }

  const content = readFileSync(filepath, 'utf-8');
  const data = JSON.parse(content);

  data.result = result;
  data.analyzedAt = new Date().toISOString();
  data.status = 'analyzed';

  writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`💾 분석 결과 저장: ${testId}`);
}

/**
 * 마크다운 리포트 저장
 *
 * @param {string} testId - 테스트 ID
 * @param {string} markdown - 마크다운 내용
 */
export function saveMarkdownReport(testId, markdown) {
  ensureDataDir();

  const filename = `${testId}_report.md`;
  const filepath = join(DATA_DIR, filename);

  writeFileSync(filepath, markdown, 'utf-8');
  console.log(`📄 리포트 저장: ${filename}`);

  return filepath;
}
