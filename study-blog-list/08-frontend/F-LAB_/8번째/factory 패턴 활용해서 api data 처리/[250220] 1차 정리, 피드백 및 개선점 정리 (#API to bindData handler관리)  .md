

# 피드백 사항

```bash
Factory 는 '복수의 data handler' 가 '동시에' 필요할 때, 
handler 는 가져오고, 조합해 주는 역할을 하게 됨 
현재 코드에는 이 역할이 없어 보임. 
```

# 추가 개선하면 좋을 점 
```
1. 복수의 handler 가 '동시에' 필요하게 될 경우의 Factory 기능 
2. test 코드 및 성능 최적화 
3. react hook form 필드와 어떻게 연동시킬 수 있을 것 인가.  
```


---

# [250220] 현재까지 작성된 버전 

![Image](https://i.imgur.com/yDfqeyJ.jpeg)


## 요약 
```
1. API RESPONSE 타입 : API 에서 가져오는 데이터 타입 설정 

2. PAGE VIEWMODEL 타입 
	- 페이지 UI 에서 필요한 VIEW MODEL 설정 
	- 이때, PICK, OMIT 을 사용해서, 필수값, 옵션값 설정은 '생략' 
	
3. 하위 구성요소 타입들 
	- 각 상위 타입을 구성하는 하위요소 타입들 
```

## 타입 설정 코드 
```tsx
// API 에서 가져온 원본 데이터 타입 (#예시 #API 붙이고 리팩토링 필요)
export interface IReservationsCampFieldProductsResponse {
  reservationCampFieldsProducts: {
    total_itemCount: number;
    items: IReservationsCampFieldProductsTableItem[];
  };
}

export interface IReservationsCampFieldProductsTableItem {
  id: string;
  orderNumber: string;
  displayProduct_code: string;
  displayProduct_name: string;
  isDisplay_show: boolean;
  roomPrice: string;
  roomType: string;
  isRoom_active: boolean;
  sitesCount: number;
  additionalOptions: number;
}

// 해당 PAGE UI에서 사용할 데이터 (ViewModel)
export interface IReservationsCampFieldProductsViewModel {
  reservation_campField_product_table: IReservationsCampFieldsProductsTableViewModel;
}

// 주문 기본 정보 (UI 바인딩용)
export interface IReservationsCampFieldsProductsTableViewModel {
  total_itemCount: string;
  items: IReservationsCampFieldsProductsTableItem[];
}

export interface IReservationsCampFieldsProductsTableItem {
  id: string;
  orderNumber: string;
  displayProduct_code: string;
  displayProduct_name: string;
  isDisplay_show: string;
  roomPrice: string;
  roomType: string;
  isRoom_active: string;
  sitesCount: number;
  additionalOptions: number;
}

/**
 * 필수 및 선택값에 설정이 필요할 경우 활성화
 */
// // 필수 값 정의 (orderDefaultInfo만 필수로 지정)
// type RequiredCampFieldsProducts = Pick<
//   IReservationsCampFieldProductsViewModel,
//   "reservation_campField_product_table"
// >;

// // 선택 값 정의 (orderDefaultInfo를 제외한 나머지 속성은 선택 사항으로 변경)
// type OptionalCampFieldsProducts = Omit<
//   IReservationsCampFieldProductsViewModel,
//   "reservation_campField_product_table"
// >;

// // [최종 페이지 타입 체크] 필수 값 + 선택 값 조합하여 `_WithRequired` 타입 생성 (#이 타입으로 mapTo_ 함수에서 반환되는 값을 체크)
// export interface IReservationsCampFieldProductsViewModelWithRequired
//   extends RequiredCampFieldsProducts,
//     Partial<OptionalCampFieldsProducts> {}
```


## Page 에서 handlerKey 를 매개변수로 던지면, 해당 handler 에 대응하는 mapping 함수 실행


### 1. page 에서 controller 내에 위치한 getPageBindData 호출 하여 컴포넌트에 바인딩

```tsx
  
import { getPageBindData } from "@/libs/factory/controller/pageController";

  const bindDataTest = getPageBindData(
    "viewModel_reservationsCampFieldsProducts",
    {
      reservationCampFieldsProducts,
    }
  );
  
  const { reservation_campField_product_table } = bindDataTest || {};
  const { total_itemCount, items } = reservation_campField_product_table || {};
```

### 2. controller 는 1) Factory 를 실행하고 2) 결과값을 반환
```tsx
import { cookies } from "next/headers";
import { Factory } from "../factory";

export const getPageBindData = (handlerKey: string, fetchedData: object) => {
  try {
    const bindData = Factory(handlerKey, fetchedData); // Factory로 데이터 변환

    return bindData;
  } catch (error) {
    console.error("@pageController 데이터 변환 실패:", error);
    return null;
  }
};
```

### 3. Factory 는 1) getHandler를 실행하고 2) handler 함수를 리턴
```tsx
import { getHandler } from "./handlerRegistry";

export const Factory =  (handlerKey: string, apiData: any) => {
  const handler =  getHandler(handlerKey);

  const result = handler(apiData);
  return result;
};
```

### 4. getHandler 함수는 1) handlerRegistry 에서 handlerKey 에 맞는 함수를 가져온다. 2) 이때, reservationsCampFieldsProducts 페이지에 대한 viewModel 이므로,  mapToCampFieldProductsViewModel 함수와 맵핑한다. 

```tsx
import {
  IOrderDetailResponse,
  IOrderDetailViewModel,
} from "@/types/pages/order/orderDetail";
import { mapToOrderDefaultInfoViewModel } from "./mapToViewModel/order/orderDetail";
import { sortByDate } from "../utils";
import { IReservationsCampFieldProductsResponse } from "@/types/pages/reservations/campField/products";
import { mapToCampFieldProductsViewModel } from "./mapToViewModel/reservations/campFieldProducts";

type HandlerFunction = (data: any) => any;

/**
 * [handlerKey 네이밍 규칙] 
  - 필요성 : 해당 규칙에 따라 적으면 1) 유지보수가 쉽고 2) 확장성이 용이하다고 생각하여 작성

  - viewModel_	: API 데이터를 ViewModel로 변환하는 핸들러
  - sort_	데이터를 정렬하는 핸들러
  - combined_	여러 기능을 조합한 핸들러
  - transform_	데이터 변환 핸들러 (가공, 필터링)
 */

const handlerRegistry: Record<string, HandlerFunction> = {
  // 해당 페이지에서 기본 viewModel 보여주기
  viewModel_orderDetail: (apiData) =>
    mapToOrderDefaultInfoViewModel(apiData as IOrderDetailResponse),
  // 다중 기능 핸들러: 정렬 후 ViewModel 적용 (체이닝 가능)
  // combined_sortedOrderDetail: (data) => mapToOrderDefaultInfoViewModel(sortByDate(data)), // ✅ 정렬 유틸 함수 재사용

  viewModel_reservationsCampFieldsProducts : (apiData) => mapToCampFieldProductsViewModel(apiData as IReservationsCampFieldProductsResponse),

  sort_byDate: sortByDate,
};

// getHandler 함수: handlerKey를 받아서 해당하는 handler를 반환
export const getHandler = (handlerKey: string): HandlerFunction => {
  const result = handlerRegistry[handlerKey];

  return result || ((data) => data); // 없는 경우 기본적으로 그대로 반환
};
```

### 5. mapToCampFieldProductsViewModel 1) api data 를 받고 2) viewModel 에 맞는 값을 return 한다. 
```tsx
import {
  IReservationsCampFieldProductsResponse,
  IReservationsCampFieldProductsViewModel,
} from "@/types/pages/reservations/campField/products";

/** [mapTo_ 함수의 역할]
 * @역할 
    0. 단위 : 주문 상세 '페이지'
    1. 'fetched 된 api 원본 데이터(IOrderDetailResponse)'를 'ViewModel(IreservationCampFieldsProductsViewModel)'로 변환 
    2. UI 에서 읽기 쉬운 형태로 데이터 가공 
 */
export const mapToCampFieldProductsViewModel = (
  apiData: IReservationsCampFieldProductsResponse
): IReservationsCampFieldProductsViewModel => {
  console.log("@mapToCampFieldProductsViewModel apiData ", apiData);

  const { reservationCampFieldsProducts } = apiData;
  const { total_itemCount, items } = reservationCampFieldsProducts;

  const viewModel = {
    reservation_campField_product_table: {
      total_itemCount: `${total_itemCount}`,
      items: items.map(item => ({
        id: `${item.id ?? ""}`,
        orderNumber: `${item.orderNumber ?? ""}`,
        displayProduct_code: `${item.displayProduct_code ?? ""}`,
        displayProduct_name: `${item.displayProduct_name ?? ""}`,
        isDisplay_show: item.isDisplay_show === true ? "노출함" : "노출 안함",
        roomPrice: `${item.roomPrice ?? ""}`,
        roomType: `${item.roomType ?? ""}`,
        isRoom_active: item.isRoom_active === true ? "Y" : "N",
        sitesCount: item.sitesCount ?? 0,
        additionalOptions: item.additionalOptions ?? 0,
      })),
    },
  };

  return viewModel;
};

```