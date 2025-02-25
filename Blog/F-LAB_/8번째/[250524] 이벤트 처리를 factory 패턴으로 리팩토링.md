# 트러블슈팅

## [1차 고민] '기능 구성 요소' 를 고려했을 때, 'LARGE HANDLER' VS 'SMALL HANDLER 의 조합' (#⭐⭐⭐)

```BASH
1. 현재 deleteHandler 자체에 1) validate 2개 2) execute 1개의 로직이 포함된 LARGE HANDLER 임
2. 이 LARGE HANDLER 를 유지할지
3. SMALL HANDLER 로 쪼개서, FACTORY 에서 조립할지
4. 상위호환 (앞으로 발생할 기능 요구에 대응) 및 클린코드 관점에서 어떻게 접근하면 좋을지
```

## [2차고민] PAGE 에서 HANDLER KEY 를 어떻게 넘길 수 있을까?

```tsx
// 1. '배열' 의 형태로 넘길 수 있고, '객체' 로 넘길 수도 있음.

/**
 * 2. '배열' 로 넘길 경우 
	- 실행 순서를 강제할 수 있음. 
 */
const eventData = eventFactory(
  ["validateSelection", "validateDisplayed", "executeDelete"], // ⬅️ Small Handler 조립!
  fetchedData,
  eventFactoryParams
);

/**
 * 3. '객체' 로 넘길 경우 
	- handler 간 validate 결과를 넘길 수 있음. 
	- 실행 순서를 강제할 때 고민이 필요.
 */
const eventData = getEventData(
  {
    validate: ["validateSelection", "validateDisplayed"],
    execute: "deleteItem",
  },
  fetchedData,
  eventFactoryParams
);

/*
    4. sequence 배열 안에 '객체 handler'를 넣어서, '순서' 를 확보
*/

const eventData = getEventData(
  {
    sequence: [
      { type: "validate", key: "validateSelection" },
      { type: "validate", key: "validateDisplayed" },
      { type: "execute", key: "deleteItem" },
    ],
  },
  fetchedData,
  eventFactoryParams
);
```

# 'SMALL HANDLER'와 '객체 + 배열' 조합의 handlerKey 전달로 변경해보기

## 변경의도 요약

```
- SMALL HANDLER 를 선택한 이유
	: '아이템 삭제' 의 하위에는 2개의 validate, 1개의 execute 가 존재
	: 이를 large handler 로 구성할지, small handler 로 구성할지 고민
	: 재활용성을 위해 small handler 로 쪼개어 구성

- page 에서 handler 를 넘길 때, '배열 + 객체' 조합을 선택한 이유
	: '객체' 를 선택하면, validate 가 끝난 결과를 execute 에 넘길 수 있음. (#handler 간 데이터를 주고받을 수 있음)
	: '객체 handler' 를 '배열' 안에 넣어서, '실행 순서' 를 보장


- 이렇게 되었을 때, 각 validate handler 는 execute property 만 가져도 됨
	: 즉, validation property 를 별도로 갖지 않아도 됨! (#✅ 이 점이 굉장히 신기)
```

## react hook form 과의 통합

1. watch로 값을 가져와야 함
2. 그러려면, Coltable 의 name 에 들어간 필드로 값을 조회해야 함
3. 'Coltable 의 name 에 들어간 필드' 는 어디에서 어떻게 정해지냐면
   - getColTableName(tableConfig?.tableName) 로 들어가고
   - 이게 viewModel, response Type 과 어떻게 맞춰야 하지
     -> viewModel 타입과 맞춘다면, 'reservation_campField_product_table' 이게 들어가도 괜찮나

```

```

## viewModel 에서 타입 설정

```tsx
// 해당 PAGE UI에서 사용할 데이터 (ViewModel)
export interface IReservationsCampFieldProductsViewModel {
  reservation_campField_product_table: IReservationsCampFieldsProductsTableViewModel;
}

export const CAMPFIELD_PRODUCT_TABLE_NAME: keyof IReservationsCampFieldProductsViewModel =
  "reservation_campField_product_table";
```

## viewModel 을 기준으로 '변수'로 타입을 가져와서 '동적'으로 react hook form 필드값 설정 (#⭐⭐⭐)

```tsx
export type TOnlineEvent_EntryWinner = {
  [key: string]: any; // table 설정을 위한 동적할당
};

export const useCampFieldProductsRHForm = (queryBody: any) => {
  const methods = useForm<TOnlineEvent_EntryWinner>({
    mode: "onBlur",
    defaultValues: {
      [CAMPFIELD_PRODUCT_TABLE_NAME]: [], // [TODO] viewModel 타입에서 table 이름 가져옴
    },
  });

  return methods;
};
```

## 그러면, PAGE 에서 아래와 같이 값을 가져와서 사용할 수 있음.

```tsx
const watch = methods.watch;
const reservation_campField_product_table = watch(
  `${CAMPFIELD_PRODUCT_TABLE_NAME}`
); // 체크박스 데이터
console.log(
  "1️⃣@PAGE reservation_campField_product_table",
  reservation_campField_product_table
);
```

## handler에게 필요한 값을 아래와 같이 넘김

```tsx
const handlerParams = {
  RHFMethods: methods,
  tableName: { CAMPFIELD_PRODUCT_TABLE_NAME },
  checkBoxId: "id",
};

const eventData = getEventData("deleteItem", fetchedData, handlerParams);
```

## 각 handler 에서 아래와 같이 사용

```tsx
export const validateSelection = {
  execute: (apiData: any, params: any, sharedData: any) => {
    const { RHFMethods, tableName } = params || {};
    const selectedItems = RHFMethods?.watch(`${tableName}`);
    console.log("🟢 params", params);

    console.log("🟢 @DELETE HANDLER  selectedItems", selectedItems);

    if (!selectedItems?.length) {
      // alert 띄우기
      return { success: false, message: "선택된 항목이 없습니다." };
    }

    sharedData.selectedItems = selectedItems; // ✅ 선택된 항목 저장

    return { success: true };
  },
  onFailure: (error: any) => console.error("❌ 선택 검증 실패:", error.message),
};
```




# 공통 모듈 alert 띄우기

## PAGE 레벨에서 alert 자체를 주입하기

```
- page 에서 주입하는 이유는, 사용하는 쪽에서, alert 메시지를 수정하거나 하는 등의 요구 사항이 있을 때 대응하기 위해서
- 마치 props 를 사용하는 느낌으로!
```

```tsx

// alert 는 'useCampFieldProductsHandlers' 에서 가져오기
const {
    alert...
} = useCampFieldProductsHandlers(methods, queryBody);

// alert 가 들어있는 걸 params 로 넘기기
  const handlerParams = {
    RHFMethods: methods,
    tableName: `${CAMPFIELD_PRODUCT_TABLE_NAME}`,
    checkBoxId: "id",
    alert,
    alertConfig: {} // [TODO] alert 설정을 변경해야 하면 추가
  };
  const eventData = getEventData("deleteItem", fetchedData, handlerParams);

  const handlerKeySequence = {
    sequence: [
      { type: "validate", key: "validateSelection" },
      { type: "validate", key: "validateDisplayed" },
      { type: "execute", key: "deleteItem" },
    ],
  };

```



