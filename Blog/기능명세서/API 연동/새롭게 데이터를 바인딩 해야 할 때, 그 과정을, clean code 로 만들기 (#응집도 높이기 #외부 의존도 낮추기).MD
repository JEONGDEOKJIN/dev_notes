
# 기존 데이터 흐름 

## 1. 데이터 필드 및 더미 데이터 생성됨 
libs\utils\dummyData\programServiceDummy.ts


## 2. SERVICE.getExchangeHistory 로 가져옴
```tsx
// (더미데이터) 주문관리 > 교환 내역
const getExchangeHistory = (params?: IReqAdminList) => {
  return {
    data: {
      data: dummyExchangeHistory,
      code: 200,
    },
  };
};
```

## 3. useQueries 에서 해당 SERVICE 를 호출

- 리팩토링 할 만한 부분 (#⭐⭐⭐⭐⭐⭐) 
```bash
1. queryFn, queryKey 가 중복되는 것 같음. 
2. 이 부분을 어떤 모듈에서 관리하면 좋을지는 문제 
```

- 현재 소스 코드 
```TSX
import { useQueries } from "@tanstack/react-query";

import { formatDateString } from "@/libs/utils/format/formatDate";
import OrderService from "@/service/OrderService";
import { IReqAdminList } from "@/types/interface/parameter/Admin";
import { UseFormReturn } from "react-hook-form";

interface useFetchOrderDataProps {
  methods: UseFormReturn<any>;
}

const useFetchOrderData = ({ methods }: useFetchOrderDataProps) => {
  const queryBody = methods?.getValues();

  const { keyword, page, size, date } = queryBody;

  const body = {
    searchAdminLoginId: keyword,
    pageSize: size,
    pageOffset: page,
    startAt: formatDateString(date?.start_at as Date),
    endAt: formatDateString(date?.end_at as Date),
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ["orderCancelHistory", body], // ✅ QueryKey 통일
        queryFn: async () => {
          try {
            const {
              data: { data, code },
            } = await OrderService.getOrderCancelHistory(body);

            console.log("✅ 주문 취소 내역:", data);

            if (code === 200) return data;
            throw new Error("Unexpected response code");
          } catch (error) {
            console.error("Error fetching order cancel history:", error);
            throw error;
          }
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
      },
      {
        queryKey: ["exchangeHistory", body], // ✅ QueryKey 통일
        queryFn: async () => {
          try {
            const {
              data: { data, code },
            } = await OrderService.getExchangeHistory(body);

            console.log("✅ 교환 내역:", data);

            if (code === 200) return data;
            throw new Error("Unexpected response code");
          } catch (error) {
            console.error("Error fetching exchange history:", error);
            throw error;
          }
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
      },
    ],
  });

  return {
    orderCancelHistory: queries[0].data ?? [],
    exchangeHistory: queries[1].data ?? [],
    isLoading: queries.some((q) => q.isLoading),
    isError: queries.some((q) => q.isError),
    isFetching: queries.some((q) => q.isFetching),
  };
};

export default useFetchOrderData;

```


## 4. 바인딩 되어야 하는 페이지에서 호출이 됨 
```tsx
  const {
    orderCancelHistory,
    exchangeHistory,  // ⭐⭐⭐ 여기 이렇게 export 됨 
    isLoading,
    isError,
    isFetching,
  } = useFetchOrderData({
    methods,
  });
```


## 5. 해당 페이지에서 바인딩 되어야 하는 데이터의 형태로 변환 
### 리팩토링 될 수 있는 부분 
```bash
1. 이 페이지에서 다양한 형태의 데이터 가공이 있을 것
2. 이런 과정이 필요하게 되는 이유는 프론트에서 데이터를 구조분해할당 해서 쓰게 되면서
```
```tsx
  const { bindingData } = useBindingDataOrderDetail(orderCancelHistory , exchangeHistory);
```

- 프론트에서 구조분해할당을 하면서, 데이터 변환 가공이 필요하게 된 사례 
```
주문/취소 내역
교환내역
반품내역은 
각기 다른 api 에서 온다고 가정하였다.
그래서, 
해당 페이지에서는 하나의 bindingData 지만
세부 컴포넌트에서는 꺼내써야 한다.
```
```tsx
const Tab: React.FC<IDetailInfoProps> = ({ bindingData }) => {
  const {orderCancelHistory, exchangeHistory , returnHistory} = bindingData;  
  const tabList = [
    {
      id: 1,
      label: "주문/취소 내역",
      content: <OrderCancelHistory bindingData={orderCancelHistory} />,
    },
    {
      id: 2,
      label: "교환 내역",
      content: <ExchangeHistory bindingData={exchangeHistory} />,
    },
    {
      id: 3,
      label: "반품 내역",
      content: <ReturnHistory bindingData={returnHistory} />,
    },
  ];
```




# 우선, useBinding 훅은 이렇게 변경함 


```
- 이 변경의 핵심은 
	1) PAGE 마다 고유한 SCHEMA 가 있다는 것 
	2) 해당 SCHEMA 를 DB 설계 할 때 처럼, 먼저 파악하고 들어간다는 것 
	3) 그 스키마가 기준이 되고, 거기에 맞게 API 를 붙인다는 것 
		- 그러면, 필요한 데이터를 조합하는데 있어서 활용성이 높아지지 않을까 하는 생각
	
```

```tsx
import { exchangeHistorySchema, orderCancelHistorySchema } from "@/libs/constants/tableConfig";
import { extractFields } from "@/libs/utils";

/**
 * 특정 데이터(items)와 필드(fields)를 매핑하여 변환하는 함수
 * @description : 페이지마다 요구하는 데이터 구조가 다를 것 -> so, 매핑 절차도 다를 것 
 */
const formatBindingData = (items: any[], fields: Record<string, any>) => {
  return Object.entries(fields).reduce((acc, [key, fieldList]) => {
    acc[key] = {
      total_itemCount: items.length,
      items: extractFields(items, fieldList),
    };
    return acc;
  }, {} as Record<string, any>);
};

/**
 * 주문 취소 내역, 교환 내역, 반품 내역을 하나의 객체로 변환하는 커스텀 훅
 * @외부의존 
 *  1. API fetch 데이터 : orderCancelHistory, exchangeHistory
 *  2. 해당 PAGE 에서 필요한 데이터 구조 : orderCancelHistoryFields, exchangeHistorySchema
 */
const useBindingDataOrderDetail = (
  orderCancelHistory: any,
  exchangeHistory: any,
  uploadedExcelData?: any
) => {
  console.log("✅ orderCancelHistory", orderCancelHistory);
  console.log("✅ exchangeHistory", exchangeHistory);

  const orderCancelHistoryItems = orderCancelHistory?.items || [];
  const exchangeHistoryItems = exchangeHistory?.items || [];

  return {
    bindingData: {
      orderCancelHistory: formatBindingData(orderCancelHistoryItems, orderCancelHistorySchema),
      exchangeHistory: formatBindingData(exchangeHistoryItems, exchangeHistorySchema),
      returnHistory: formatBindingData(exchangeHistoryItems, exchangeHistorySchema), // 현재는 교환 내역과 같은 구조이므로 재사용
    },
  };
};

export default useBindingDataOrderDetail;
```


