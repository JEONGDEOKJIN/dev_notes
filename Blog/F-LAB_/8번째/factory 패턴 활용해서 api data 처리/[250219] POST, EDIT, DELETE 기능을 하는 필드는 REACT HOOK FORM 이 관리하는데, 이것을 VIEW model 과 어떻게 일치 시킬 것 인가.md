

# 문제상황 
```
Input 에 바인딩을 해야 함 
그러면, 기존 viewModel Type 이외에, 추가적인 필드관리가 필요해짐 

왜냐면, react hook form 은 따로, 별도의 필드를 필요로 하기 때문.
```


# 예를 들어 아래의 필드들이 필요로 함 
```
1. 다만, 모든 페이지에서 '동일하게 요구' 되는 필드도 있고 
2. '특정 페이지' 에서만 요구되는 것도 있음
```
```tsx
  type TCampFieldProductRegister = {
    name: string;
    birthday: string;
  
    // 공통 type
    keyword: string;
    date: {
      start_at: Date;
      end_at: Date;
      period: string;
    };
    pageSize: number;
    size: number;
    page: number;
    location: string;
    age: string;
    email: string;
    gender: string;
  
    mail_table: any[];
    displayProduct_name_kr: string;
  };

  const methods = useForm<TCampFieldProductRegister>({
    mode: "onBlur",
    defaultValues: {
      keyword: queryBody.keyword ? (queryBody.keyword as string) : "",
      date: {
        start_at: queryBody.start_at
          ? new Date(queryBody.start_at as string)
          : past1Week,
        end_at: queryBody.end_at ? new Date(queryBody.end_at as string) : today,
        period: queryBody.period ? (queryBody.period as string) : "7일",
      },
      pageSize: 10,
      size: 10,
      page: 1,
      location: "",
      gender: "",
      age: "",
      email: "",
      mail_table: [], // [TODO] 체크박스 설정과 관련. 추후에 관련 설정 mapping 이 헤매지 않게 주석 처리
    
      displayProduct_name_kr: "주바코",
    },
  });
 
```

# 현재 viewModel 타입에 따라서 데이터 바인딩이 이루어짐 
```tsx
// 해당 PAGE UI에서 사용할 데이터 (ViewModel)
export interface IReservationsCampFieldProductsRegisterViewModel {
  room_basicInfo: IRoomBasicInfo;
  display_basicInfo: IDisplayBasicInfo;
  tabContents: ITabContents;
}
```

# 고민 
```
1. page 데이터에 바인딩 될 데이터라는 점에서 viewModel 과 상응하지만

2. React Hook Form 에 의해 CRUD 에 모두 관여한다는 점에서, viewModel 에 들어간 필드보다, 기능이 많을 수도

3. React Hook Form 의 경우에는 
	- 타입을 동적으로 관리하는 경우가 있음. 
	- 이 경우에 대해서는 어떻게 관리할지에 대해서도 대책이 필요함.

```


## 예시 
```tsx
  <GridRow
    headCellLabel="판매 단위"
    dataCellContent={
      <div className="w-full">
        {/* selling_unit 은 POST 를 하게 되는 필드, 이걸 VIEW MODEL 에서 GET 으로 잡아버림. 이런걸 어떻게 유연하게 관리할까 */}
        <Input
          // label="ID"
          type="text"
          name="selling_unit"
          sizeH="S"
          sizeW="FULL"
          // labelCustom="!min-w-[10px]"
          className=""
        />
      </div>
    }
    dataCellCustomCSS="flex gap-2"
  />
```



## 예시 - 2 
```
이렇게 
Input 필드인 경우 

react hook form 이 관리해야 하는데 
이걸 view Model과 어떻게 조화롭게 운영할지가 고민 
```

![Image](https://i.imgur.com/Y5pkUgW.jpeg)



```
TIL: viewModel 타입과 react hook form 의 필드를 어떻게 통일시켜서 관리할 수 있을까

- 어제까지 짠 코드는 viewModel 이고 해당 필드들은 'get' 만 한다. 
- 그런데, 특정 필드는 post, edit, delete 기능이 들어간다. 
- 그랬을 때, 해당 필드를 관리하는 역할을 viewModel 에 추가해야 할지, react hook form 까지 추가해서 어떻게 관리할지 모르겠다. 
- 이 부분은 좀 더 고민이 필요하다. 
```