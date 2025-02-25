

# 우선, page 의 handlerHOOK 에 넣음


![Image](https://i.imgur.com/CLXzQ5J.jpeg)

## 변경 포인트 
```tsx
- 최대한 위 구조와 동일하게 가도록

- 삭제 로직에는 
		1) '선택 되었는지 여부' , '특정 필드 값이 true 인지 여부' 의 validation 을 거치고, 실행, 하는 구조 
		2) large handler 로 만들어야 할지, small handler 로 '작게 쪼개서' 구분해서 진행해야 할지 문제
		3) 다른 곳에도 재활용 할 수 있는 small handler로 쪼개서 진행
		4) 이렇게 되면, 각 핸들러가 execute 하는게 독립적으로 변함


- 실행 순서는 아래와 같이 '객체 + 배열' 의 형태로 확보
	  const handlerKeySequence = {
    sequence: [
      { type: "validate", key: "validateSelection" },
      { type: "validate", key: "validateDisplayed" },
      { type: "execute", key: "deleteItem" },
    ],
  };


- handlerKey 를 '객체' 로 나눈 이유 
	1. 각 handler 별 데이터를 공유하기 위해 -> 그런데, 이 전역변수를 관리해야 하는 문제 발생 -> 데이터 공유는 react hook form 을 통해 할 예정
	2. 향후 관리하는데 필요할 수도 있을 것 같아서, 유연하게 구분		
		
- 기본값을 가지고 있되, 사용하는 쪽에서 주입할 수 있게 설정 ex) alerMessage, 버튼 라벨 등 
	(#이것은 마치, props 사용하는 느낌) 

```


## [예시 코드] 삭제로직
```TSX
  // -------------- [아이템 삭제 로직] -----------------
  const handlerParams: IHandlerParams = {
    RHFMethods: methods,
    tableName: `${CAMPFIELD_PRODUCT_TABLE_NAME}`,
    checkBoxId: "id",
    alert,
    config: {
      validateSelection : {
        alertMessage: "삭제할 전시상품을 선택해주세요.",
      },
      validateDisplayed: {
        alertMessage: "현재 전시된 상품은 삭제할 수 없습니다.",
        targetField: "isDisplay_show",
      },
    },
  };

  const handlerKeySequence = {
    sequence: [
      { type: "validate", key: "validateSelection" },
      { type: "validate", key: "validateDisplayed" },
      { type: "execute", key: "deleteItem" },
    ],
  };

  const handleDeleteByFactory = () => {
    const testEventData = getEventProcessedData_TEST(
      handlerKeySequence,
      fetchedData,
      handlerParams
    );
    console.log("testEventData", testEventData);
  };
  // -------------- [아이템 삭제 로직] ----------------
```

