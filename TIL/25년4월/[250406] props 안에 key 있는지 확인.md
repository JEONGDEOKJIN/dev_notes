```tsx
    // 프로그램과 옵션에 따라 다르므로 LABEL 과 VALUE 공통화 (#❓❓❓❓❓ LABEL 과 VALUE 는 뭘 의미? )
    const LABEL = 
        // 1. 모바일 전용 검사명이 있는 경우 표기 
        "moblApntExmnNm" in props 
        ? props.moblApntExmnNm 
        : // 2. 모바일 전용 검사명이 없는 경우 그냥 코드명 표기 
        props.exmnCdNm;

    // 검사설명
    const DESCRIPTION = "moblApntExmnInftCtnt" in props ? props.moblApntExmnInftCtnt : "";

```