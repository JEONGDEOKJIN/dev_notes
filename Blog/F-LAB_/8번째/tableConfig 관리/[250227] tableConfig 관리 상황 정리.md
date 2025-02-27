

# [250227] 현재 결론 

## 출처 
```tsx
// types\pages\reservations\campField\notices\list\CampFieldNoticesListTypes.ts
export const CAMPFIELD_PRODUCT_TABLE_NAME: keyof IReservationsCampFieldProductsViewModel =
  "reservation_campField_product_table";
```


## 이 테이블 설정이 사용되는 곳 
### 1. ColTable의 name 필드
```tsx
<ColTable
  name={CAMPFIELD_NOTICE_TABLE_NAME} // [TODO] viewModel 에서 테이블 타입을 설정
  checkboxId={"id"}
  isCheckBox={true}
  checkBoxThCustomCSS="px-[10px]"
  isNumber={true}
  baseNumber={
    (total_itemCount ?? 0) -
    methods.getValues("size") * methods.getValues("page") +
    methods.getValues("size")
  }
  columns={COLUMNS}
  items={items || []} // [TODO] 엑셀 업로드 데이터로 변경
  emptyMessage={"조회된 결과가 없습니다."}
  isLoading={isLoading || isError} // [TODO] isLoading, isError 를 management 파일 에 추가
/>
```


### 2. page의 react hook form 훅 : Coltable 에서 설정한 name 을 react hook form 이 컨트롤 하기 위해서 필요함
```tsx
export type TOnlineEvent_EntryWinner = {
  [key: string]: any; // table 설정을 위한 동적할당
};

export const useCampFieldNoticesRHForm = (queryBody: any) => {
  const methods = useForm<TOnlineEvent_EntryWinner>({     
      [CAMPFIELD_NOTICE_TABLE_NAME]: [], // [TODO] viewModel 타입에서 table 이름 가져옴
    },
  });
  return methods;
};
```


### 3. data 가공시 return 데이터에 ViewModel 타입을 부여해서, viewModel 은 viewModel 만의 타입을 넣을 수 있도록 강제

```tsx
import useFetchReservationCampFieldsProducts from "@/libs/hooks/fetch/useFetchReservationCampFieldsProducts";
import { getPageBindData } from "@/libs/factory/controller/pageController";
import useFetchReservationCampFieldsNotices from "@/libs/hooks/fetch/useFetchReservationCampFieldsNotices";
import {
  ICampFieldNoticesList_table,
  ICampFieldNoticesListResponse,
  ICampFieldNoticesListViewModel,
} from "@/types/pages/reservations/campField/notices/list/CampFieldnoticesListTypes";

export const useCampFieldNoticesData = (
  methods: any
): {
  fetchedData: any;
  bindData: ICampFieldNoticesList_table;
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    reservationCampFieldsNotices, // [✅TODO] API DATA RESPONSE PROPERTY 이름 연결
    isLoading,
    isError,
  } = useFetchReservationCampFieldsNotices({ methods });

  const bindData = getPageBindData("viewModel_reservationsCampFieldsNotice", {
    reservationCampFieldsNotices,
  });

  const { viewModelTableName_campfield_notice } = bindData || {}; // [✅TODO] mapTo 함수에서의 property(table config 에서의 테이블 이름) 에 맞춰서 구조분해할당 해야 함

  return {
    fetchedData: reservationCampFieldsNotices || {},
    bindData: viewModelTableName_campfield_notice || {},
    isLoading,
    isError,
  };
};


```


### 4. api 에서 데이터 꺼낼 때, 해당 타입으로 꺼내도록 강제 (#api reponse 에 대한 타입을 설정함 #⭐⭐⭐)
```tsx
import {
  ICampFieldNoticesListResponse,
  ICampFieldNoticesListViewModel,
} from "@/types/pages/reservations/campField/notices/list/CampFieldnoticesListTypes";
import {
  IReservationsCampFieldProductsResponse,
  IReservationsCampFieldProductsViewModel,
} from "@/types/pages/reservations/campField/products/list/productsTypes";

/** [mapTo_ 함수의 역할]
 * @역할 
    0. 단위 : 주문 상세 '페이지'
    1. 'fetched 된 api 원본 데이터(IOrderDetailResponse)'를 'ViewModel(IreservationCampFieldsProductsViewModel)'로 변환 
    2. UI 에서 읽기 쉬운 형태로 데이터 가공 
 */
export const mapToCampFieldNoticesViewModel = (
  apiData: ICampFieldNoticesListResponse
) => {
  const { reservationCampFieldsNotices } = apiData || {}; // [check] API DATA RESPONSE PROPERTY 에서 꺼내올 수 밖에 없음
  const { total_itemCount = 0, items = [] } =
    reservationCampFieldsNotices || {};
  console.log("🎈apiData", apiData);

  const viewModel: ICampFieldNoticesListViewModel = {
    viewModelTableName_campfield_notice: {
      total_itemCount: `${total_itemCount}`,
      items: Array.isArray(items)
        ? items.map((item) => ({
            id: `${item.id ?? ""}`,
            category: `${item.category ?? ""}`,
            title: `${item.title ?? ""}`,
            isDisplayed: item.isDisplayed === true ? "노출함" : "노출 안함",
            writer: `${item.writer ?? ""}`,
            createdDate: `${item.createdDate ?? ""}`,
            viewCount: `${item.viewCount ?? "0"}`,
          }))
        : [],
    },
  };

  return viewModel;
};


```


### 5. tableConfig 관련된 코드 

- 현재 가장 최신화된 코드는 COLUMNS 만 사용하고 있음. 
```tsx
  const { COLUMNS } = RESERVATIONS_CAMPFIELDS_NOTICES(
    handleOpenWindowPopup,
    TableNames.RESERVATIONS_CAMPFIELDS_NOTICES
  );
```

- 나머지, COLUMN_NAMES 등은 필요한 페이지도 있고 아닌 페이지도 있음.
```
  return {
    COLUMNS,
    COLUMN_NAMES,
    EXCEL_UPLOAD_SAMPLE_FIELDS,
    EXCEL_DOWNLOAD_HEADERS,
    tableConfig,
  };
```

- 근데 문제는, 페이지에서 해당 코드를 수정할 때, 불필요한 다른 코드들 까지 들어감 
	EX) 엑셀 관련된 걸 컨트롤 할 일이 없는데, 엑셀 까지 고려해서 COLUMN 을 수정하고 있다는 거 


👉 리팩토링
```
/**
 * 리팩토링 
    1) COLUMNS 은 별도로 , 공통된 파일에서 관리 
    2) COLUMNS 을 활용한 엑셀은 공통 로직으로 만들어서 관리
    이걸 어떤 패턴을 사용하면 좋을까. 
 */
```

