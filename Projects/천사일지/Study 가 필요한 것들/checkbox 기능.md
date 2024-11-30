

# 기존 컴포넌트 분석 

1. 기존 BO - 체크박스 사용 환경 

```BASH
- 각 TABLE 의 ROW 에 대한 체크박스는 없음 
- 부모 컴포넌트에서 체크 여부를 파악하고, API 를 태우는 방식
- 다만, 이때는 Radio 가 사용됨
- 현재, 기존 프로젝트 중 CheckBox 를 활용한 건 없는것 같음 
```

![Image](https://i.imgur.com/YB83e3X.png)
![Image](https://i.imgur.com/vI9mCw5.png)


# 현재 프로젝트 분석 

```
- 체크가 되었을 때, 
    1) 해당 row 에 대해, 선택삭제, 엑셀 다운, 인쇄 등을 할 수 있어야 함

```

- 상태 다이어그램 
https://www.figma.com/board/tAGhloMocpSryB4Su9t9XH/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8-%E2%AD%90%E2%AD%90?node-id=1-2&t=0n5SWHH9a4OAldPz-4

```
- 상태를 보면, RHF 을 부모에서 관리하는게 바람직 한 것 같긴 한데, 테스트 해보자.
```



