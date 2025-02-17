


  

# [250217] handlerKey 값을 입력할 수 있게 만들기 (#이때, '유지보수' 가 가능하게, 접두사를 사용 #⭐⭐⭐)

![Image](https://i.imgur.com/AA06nRt.jpeg)


### 아이디어 
```
1. UI 데이터 타입, API 데이터 타입 을 명확히 구분 

2. UI 데이터 타입에 viewModel 을 붙여서 명확히 함 

3. handler 를 지정할 때, 실제 key 이름을 넣어서 명확히 들어가게 함 
    - 이때, 타입 이름 지정이 아니라, 'handler 만의 규칙을 갖고 있는 네이밍' 을 지정 
    - 그래서 1) 유지보수가 쉽고 2) 확장성이 용이 하게 설정 

4. 기본적으로는 어제 만든 흐름대로 구현 
```


### 구현 코드 (#250217 까지 구현한)

```tsx
  const { bindingDataFactory } = getPageBindData("viewModel_orderDetail", {
    orderCancelHistory,
    exchangeHistory,
    returnRefundHistory,
  });
```

```tsx
import { Factory } from "../factory";

export const getPageBindData = async (pageSchema: string, fetchedData: object) => {
  try {
    return Factory(pageSchema, fetchedData); // Factory로 데이터 변환
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return null;
  }
};
```

```tsx
import { getHandler } from "./handlerRegistry";

export const Factory = (handlerKey: string, fetchedData: any) => {
  const handler = getHandler(handlerKey);

  return handler(fetchedData);
};

```

```tsx
import { IOrderDetailViewModel } from "@/types/pages/order/orderDetail";
import { mapToOrderDefaultInfoViewModel } from "./mapToViewModel";
import { sortByDate } from "../utils";

// ✅ HandlerFunction 타입 정의 (데이터 변환, 정렬 등 다양한 핸들러를 받을 수 있도록 설정)
type HandlerFunction = (data: any) => any;

const handlers: Record<string, HandlerFunction> = {
  // 해당 페이지에서 기본 viewModel 보여주기
  viewModel_orderDetail: (data) => mapToOrderDefaultInfoViewModel(data as IOrderDetailViewModel),
  // 다중 기능 핸들러: 정렬 후 ViewModel 적용 (체이닝 가능)
  combined_sortedOrderDetail: (data) => mapToOrderDefaultInfoViewModel(sortByDate(data)), // ✅ 정렬 유틸 함수 재사용

  // 다중 기능 사용위한 모듈
  sort_byDate: sortByDate,
};

// ✅ getHandler 함수: handlerKey를 받아서 해당하는 handler를 반환
export const getHandler = (handlerKey: string): HandlerFunction => {
  return handlers[handlerKey] || ((data) => data); // 없는 경우 기본적으로 그대로 반환
};


```


