
# 디렉토리 구조

## 요약 
```bash
# ver1
components
|-- blocks 
|-- elements
|-- pages

# ver2
components/
├── SearchFilter/
│   ├── __tests__/        # 테스트 코드 
│   ├── stories/          # 스토리북 관련 파일
│   │   ├── SearchFilter.stories.tsx
│   │   ├── FilterOption.stories.tsx
│   ├── FilterOption.tsx
│   ├── SearchFilter.tsx
│   ├── index.ts          # 컴포넌트 export 모음
│   ├── styles.ts         # Tailwind 스타일

```

## components

### 요약 
```
[TODO]
- 각 디렉토리가 어떤 역할을 하는가! 에 대해서 반드시 파악하기 
- 핵심 키워드를 활용해서 이해해보기 
    EX) atomic and highly reusable components
```

<br/>

### changelog
```
- 필요한 이유 : '최신화된 코드' 및 '복잡한 기능' 을 다루기 위해서
1) FormSelect' 를 리팩토링 했어 -> 가장 최신화된 사용 방법을 어딘가에 적어둬야, 나중에 쓸 때 안 잊어먹기 때문에 
2) 새롭게 기능 구현을 해야 하는 경우 -> '내가 예전에 만들어둔 게 있나?' 라고 찾아봄 -> 이때, 1) 시간이 걸림.  2)그리고 막상 찾았다고 해도, 원하는 기능이 안 담겨 있을 수도 있음 3) 더욱 슬픈건, 어딘가에 분명 존재하고 있다는 것 ㅠㅠㅠ -> 그러면, '가장 복잡도가 높고, 최신화된 컴포넌트' 를 한눈에 볼 수 있는 곳을 만들면, 시간을 줄일 수 있을 것 이라고 생각 
-> 그래서, STORYBOOK 및 CHANGELOG 를 운영해보기로 생각함. 

```

### elements
```bash
[특징] 
- singular responsibility
- 가장 작은 단위 
- atomic design layer
- blocks 과 다른 element의 구성요소 가 됨 
```



# Naming 

```bash
- RULE 
    - '이름' 에서 '단일 기능' 을 '쉽게' 파악 할 수 있어야 함. 

- TODO
    - '단일 기능' 과 해당 파일 간의 관계에 주의해서 분석하기
```



# 주석 관리 
```bash
- TODO를 사용해서, 추후에 내가 뭘 해야 하는지 파악하기
    ex) // 이런 점이 부족해서 리팩토링 하기 (#TODO)

- 함수, hook 의 경우 사용 설명을 달기 
    ex) 
        /** 
            useExcel
            @description
            @params
            @return
        */
```