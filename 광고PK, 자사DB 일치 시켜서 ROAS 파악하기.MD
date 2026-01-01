# 문제 상황

현재, 최종전환(확정자신고) 이 일어났을 때, 어떤 매체가 영향을 미쳤는지를 파악할 수 있는 흐름이 없다.
각 광고 매체가 관리하는 고유pk 값과, 우리 product 에서 회원 고유 pk 값과 연동되는게 없기 때문이라고 생각한다.
부원장님이 원하는 것은, 결국, 'ROAS' 다.

구글, 메타, 당근, 네이버 에서 실시한 광고가 최종전환에 어느 정도로 기여했는지를 보려면 어떻게 해야 할까?

---

# 기여도 측정의 문제

- 1주일 이내에, 네이버, 인스타, 구글 광고를 모두 클릭하고 전환을 했다면, 어떤 매체에 기여도를 높게 평가해야 할까?
- 구글, 네이버, 메타 모두 자신의 성과라고 주장한다.
- 객관적으로 판단하려면? GA 를 중심으로 판단해야 한다고? 이걸 어떻게 하면 좋을까?
- 이것을 분석해주는 것이 'GA4 > 광고 > 기여분석' 에서 확인할 수 있음.

## 왜 매체별 리포트를 믿으면 안 되는가?

```
1일차: 네이버 광고 클릭
3일차: 인스타 광고 클릭
5일차: 구글 광고 클릭
7일차: 전환 발생

→ 네이버, 메타, 구글 모두 "내 전환이야!" 주장
→ 실제 전환 1건인데 3건으로 집계됨 (180% 뻥튀기)
```

## GA4 기여 모델

| 모델        | 기여 인정                    |
| ----------- | ---------------------------- |
| Last Click  | 마지막 클릭 매체에 100%      |
| First Click | 최초 유입 매체에 100%        |
| Linear      | 모든 터치포인트 균등 배분    |
| Data-driven | GA4가 머신러닝으로 자동 배분 |

**GA4 > 광고 > 기여 분석** 에서 확인 가능

---

# '최종전환' 은 '오프라인' 에서 일어난다

이것을 어떻게 구글 애즈랑, 메타에게 알려서, 광고 최적화를 할 수 있을까?

## 목표

1. ROAS 계산
2. 구글/메타에 오프라인 전환 데이터 전송 → 광고 알고리즘 학습 → 최적화

## 매체별 매칭 키 (PK)

| 매체   | 매칭 키                         | 설명                           |
| ------ | ------------------------------- | ------------------------------ |
| 구글   | `gclid`                         | 광고 클릭 시 URL에 자동 생성   |
| 메타   | `fbclid` 또는 `전화번호/이메일` | fbclid 없으면 개인정보로 매칭  |
| 네이버 | `전화번호`                      | 클릭ID 없음, 전화번호로만 매칭 |
| 당근   | `전화번호`                      | 클릭ID 없음, 전화번호로만 매칭 |

---

# 해결 방안: 스프레드시트 기반 오프라인 전환 추적

기존 DB 스키마 변경 없이, 별도 스프레드시트로 관리

## 전체 흐름

```
광고 클릭 → 웹사이트 방문 → 상담신청 → Google Sheets 저장
                                              ↓
                                  어드민 확정자 데이터 붙여넣기
                                              ↓
                                    VLOOKUP으로 매칭
                                              ↓
                      ┌───────────────────────┴───────────────────────┐
                      ↓                                               ↓
              구글 업로드 CSV                                  메타 업로드 CSV
                      ↓                                               ↓
                구글 애즈 학습                                   메타 알고리즘 학습
```

---

# 구현 방법

## Step 1: 웹사이트에서 클릭ID 저장 (쿠키)

```javascript
// 방문 시 쿠키에 저장
(function () {
  const params = new URLSearchParams(window.location.search);

  ["gclid", "fbclid", "utm_source", "utm_medium", "utm_campaign"].forEach(
    (key) => {
      const value = params.get(key);
      if (value) {
        document.cookie = `${key}=${value};max-age=7776000;path=/`; // 90일
      }
    }
  );
})();
```

---

## Step 2: Google Sheets로 데이터 전송

### 방법 1: Apps Script (간단, 추천)

#### Google Sheets에서 Apps Script 설정

```javascript
// Google Sheets > 확장 프로그램 > Apps Script

function doPost(e) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("상담신청");
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.gclid || "",
    data.fbclid || "",
    data.utm_source || "",
  ]);

  return ContentService.createTextOutput("OK");
}
```

→ **배포 > 웹앱 배포 > 액세스: 누구나** → URL 복사

#### 클라이언트에서 호출

```javascript
fetch("https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec", {
  method: "POST",
  body: JSON.stringify({
    name: "홍길동",
    phone: "01012345678",
    gclid: getCookie("gclid"),
    fbclid: getCookie("fbclid"),
    utm_source: getCookie("utm_source"),
  }),
});

function getCookie(name) {
  const value = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
  return value ? value.pop() : "";
}
```

---

### 방법 2: Next.js API Route (코드 통합 관리)

#### API Route

```javascript
// app/api/save-click/route.js

import { google } from "googleapis";

export async function POST(request) {
  const data = await request.json();

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "상담신청!A:F",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          data.name,
          data.phone,
          data.gclid || "",
          data.fbclid || "",
          data.utm_source || "",
        ],
      ],
    },
  });

  return Response.json({ success: true });
}
```

#### 클라이언트에서 호출

```javascript
fetch("/api/save-click", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "홍길동",
    phone: "01012345678",
    gclid: getCookie("gclid"),
    fbclid: getCookie("fbclid"),
    utm_source: getCookie("utm_source"),
  }),
});
```

---

### 방법 비교

| 방식              | 장점                | 단점                | 추천 상황        |
| ----------------- | ------------------- | ------------------- | ---------------- |
| Apps Script       | 설정 간단, 빠름     | Next.js 밖에서 관리 | 빠르게 시작할 때 |
| Next.js API Route | 코드 한 곳에서 관리 | 초기 설정 복잡      | 장기 운영 시     |

---

## Step 3: 스프레드시트 구조

### 시트1: 상담신청

| 신청일시    | 이름   | 전화번호    | gclid  | fbclid | utm_source |
| ----------- | ------ | ----------- | ------ | ------ | ---------- |
| 12/20 14:30 | 홍길동 | 01012345678 | abc123 |        | google     |
| 12/20 15:00 | 김철수 | 01087654321 |        | xyz789 | meta       |

### 시트2: 확정자 (어드민에서 복붙)

| 확정일 | 이름   | 전화번호    |
| ------ | ------ | ----------- |
| 12/25  | 홍길동 | 01012345678 |

### 시트3: 구글 업로드용 (VLOOKUP 수식)

```
=VLOOKUP(확정자!C2, 상담신청!C:D, 2, FALSE)
```

| gclid  | 확정일 | 전환가치 |
| ------ | ------ | -------- |
| abc123 | 12/25  | 500000   |

### 시트4: 메타 업로드용

| phone       | event_time | value  |
| ----------- | ---------- | ------ |
| 01012345678 | 1703480400 | 500000 |

---

## Step 4: 구글/메타 업로드

### 구글 애즈 업로드

**파일 형식 (CSV):**

```csv
Parameters:TimeZone=Asia/Seoul
Google Click ID,Conversion Name,Conversion Time,Conversion Value,Conversion Currency
abc123,확정자신고,2024-12-20 14:30:00,500000,KRW
```

**업로드 경로:**

1. 구글 애즈 로그인
2. 도구 및 설정 > 측정 > 전환
3. 왼쪽 메뉴 "업로드"
4. CSV 파일 업로드

### 메타 업로드

**파일 형식 (CSV):**

```csv
event_name,event_time,phone,value,currency
Purchase,1703054400,01012345678,500000,KRW
```

**업로드 경로:**

1. 메타 비즈니스 관리자
2. 이벤트 관리자 > 픽셀 선택
3. 오프라인 이벤트 > 이벤트 업로드
4. CSV 파일 업로드

---

## Step 5: 주간 업로드 루틴

```
매주 월요일:
1. 어드민에서 확정자 목록 → 시트2에 붙여넣기
2. 시트3 (구글용) CSV 다운로드 → 구글 애즈 업로드
3. 시트4 (메타용) CSV 다운로드 → 메타 이벤트 관리자 업로드
```

---

# 작업 체크리스트

| 순서 | 작업                                      | 담당        | 상태 |
| ---- | ----------------------------------------- | ----------- | ---- |
| 1    | 광고 URL에 UTM 파라미터 추가              | 마케터      | [ ]  |
| 2    | 웹사이트에 쿠키 저장 스크립트 추가        | 개발        | [ ]  |
| 3    | Apps Script 또는 API Route 구현           | 개발        | [ ]  |
| 4    | 스프레드시트 템플릿 생성                  | 마케터      | [ ]  |
| 5    | 구글 애즈에 전환 액션 생성                | 마케터      | [ ]  |
| 6    | 테스트 (광고 클릭 → 상담신청 → 시트 확인) | 개발/마케터 | [ ]  |
| 7    | 주간 업로드 프로세스 시작                 | 마케터      | [ ]  |
