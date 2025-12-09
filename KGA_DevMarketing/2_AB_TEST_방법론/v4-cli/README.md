# AB TEST CLI v4

> Meta 광고 데이터 ETL 파이프라인 + AB TEST 통계 분석 도구

## 개요

광고 데이터를 **추출(Extract) → 변환(Transform) → 저장(Load)** 한 후,
저장된 데이터를 기반으로 AB TEST 통계 분석을 수행하는 CLI 도구입니다.

## 주요 기능

| 기능 | 설명 |
|------|------|
| **ETL 파이프라인** | Meta API / CSV에서 광고 데이터 추출 및 변환 |
| **샘플 사이즈 계산** | 테스트 전 필요한 샘플 수 산정 |
| **AB TEST 분석** | Z-검정 기반 통계적 유의성 검증 |
| **데이터 저장** | JSON 형식으로 테스트 히스토리 관리 |
| **비즈니스 영향** | 월간 추가 전환/매출 예측 |

## 설치 및 실행

```bash
cd KGA_DevMarketing/2_AB_TEST_방법론/v4-cli
node src/index.js --help
```

## 사용법

### 기본 분석 (수동 데이터)

```bash
# 전체 분석 (샘플 사이즈 + AB TEST)
node src/index.js

# 샘플 사이즈만
node src/index.js --sample

# AB TEST 분석만
node src/index.js --analyze
```

### ETL 파이프라인

```bash
# Mock 데이터로 테스트
node src/index.js --etl

# CSV 파일에서 추출 (Meta 광고 관리자 내보내기)
node src/index.js --etl --csv ./data/meta_export.csv

# Meta API에서 직접 추출
node src/index.js --etl --api
```

### 저장된 데이터 활용

```bash
# 최근 저장된 데이터로 분석
node src/index.js --load

# 저장된 테스트 목록 조회
node src/index.js --list
```

## 프로젝트 구조

```
v4-cli/
├── README.md
├── package.json
├── data/                    # 저장된 테스트 데이터 (자동 생성)
│   ├── abtest_xxx.json      # AB TEST 설정 및 결과
│   └── raw_meta_xxx.json    # 원본 데이터 백업
└── src/
    ├── index.js             # 메인 CLI
    ├── calculator.js        # AB TEST 계산 로직
    ├── statistics.js        # 통계 함수 (Z-score, CDF 등)
    ├── printer.js           # 콘솔 출력 (컬러)
    └── etl/
        ├── index.js         # ETL 모듈 export
        ├── extract.js       # EXTRACT - 데이터 추출
        ├── transform.js     # TRANSFORM - 데이터 변환
        ├── load.js          # LOAD - 저장/로드
        └── pipeline.js      # ETL 파이프라인 통합
```

## ETL 파이프라인 흐름

```
┌─────────────────────────────────────────────────────────────┐
│                      ETL PIPELINE                           │
├─────────────┬─────────────────┬─────────────────────────────┤
│   EXTRACT   │    TRANSFORM    │            LOAD             │
├─────────────┼─────────────────┼─────────────────────────────┤
│ • Meta API  │ • 데이터 표준화 │ • JSON 저장                 │
│ • CSV 파일  │ • AB TEST 매핑  │ • 원본 백업                 │
│ • Mock 데이터│ • 비교표 생성   │ • 히스토리 관리             │
└─────────────┴─────────────────┴─────────────────────────────┘
                        │
                        ▼
              ┌─────────────────┐
              │  AB TEST 분석   │
              │  • Z-검정       │
              │  • p-value      │
              │  • 신뢰구간     │
              └─────────────────┘
```

## 데이터 입력 방법

### 1. 수동 입력 (index.js 직접 수정)

```javascript
// src/index.js 28-46번째 줄
const CONFIG = {
  testName: '메타 광고 소재 테스트',
  hypothesis: '영상 소재(B)가 이미지(A)보다 전환율이 높을 것',

  visitorsA: 10000,      // A안 클릭 수
  conversionsA: 200,     // A안 전환 수

  visitorsB: 10000,      // B안 클릭 수
  conversionsB: 250,     // B안 전환 수

  monthlyConversions: 5000,
  avgOrderValue: 50000,
};
```

### 2. CSV 파일 (Meta 광고 관리자 내보내기)

1. Meta 광고 관리자 → 광고 탭 → 내보내기
2. CSV 파일 저장
3. 실행: `node src/index.js --etl --csv ./파일경로.csv`

### 3. Meta API 연동

```bash
# 환경변수 설정
export META_ACCESS_TOKEN="your_token"
export META_AD_ACCOUNT_ID="act_xxxxx"

# 실행
node src/index.js --etl --api
```

## 출력 예시

```
════════════════════════════════════════════════════════════
 📊 AB TEST 분석
════════════════════════════════════════════════════════════

▶ 데이터
────────────────────────────────────────
┌────────────────┬──────────┬────────┬─────────┐
│그룹            │방문자    │전환    │전환율   │
├────────────────┼──────────┼────────┼─────────┤
│A안 (Control)   │10,000    │200     │2.00%    │
│B안 (Variant)   │10,000    │250     │2.50%    │
└────────────────┴──────────┴────────┴─────────┘

▶ 통계 검증
────────────────────────────────────────
  Z-score             2.5198
  p-value             0.0117
  유의수준            * (p < 0.05)

  ✅ B안 승리! 25.0% 개선 (유의미)

▶ 💰 비즈니스 영향 (월간 예상)
────────────────────────────────────────
  추가 전환           25건
  추가 매출           1,250,000원

════════════════════════════════════════════════════════════
```

## 버전 히스토리

| 버전 | 날짜 | 변경 내용 |
|------|------|----------|
| v1 | 2024-12-09 | JavaScript 단일 파일 계산기 |
| v2 | 2024-12-09 | TypeScript + MVC 패턴 모듈화 |
| v3 | 2024-12-09 | React 웹 애플리케이션 |
| **v4** | **2024-12-09** | **Node.js CLI + ETL 파이프라인** |

## 관련 문서

- [AB TEST 방법론](../251209.md) - 이론 및 개념 설명
- [v3-react](../v3-react/) - React 웹 버전
