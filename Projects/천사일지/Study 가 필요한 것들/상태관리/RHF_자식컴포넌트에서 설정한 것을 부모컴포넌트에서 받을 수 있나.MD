

# 테스트 해보려 했던 것 
```bash
mainPage 
    |-- StudentListBox
            |-- 여기에서 react hook form 의 selectedRowsIdArr 를 설정함
    |-- ButtonBox
            |-- 여기에서 StudentListBox 에서 설정한 것을 가져와보려 했음. 그런데 안 됨
```

- 이렇게 테스트 해봤는데, 안 되는 듯
![Image](https://i.imgur.com/UcSHvYf.png)



### 그럼 어떻게? 우선, 현재 RHF 상태인데, 이게 맞나


```bash
mainPage
    |--   const methods = useForm<FormInput>({ }) 로 설정이 되어 있는 상태 임 
    |-- StudentListBox
            |-- 여기에서 react hook form 의 selectedRowsIdArr 를 설정함
            const { setValue, watch } = useForm<FieldValues>({
                defaultValues: {
                selectedRowsIdArr: [], // 선택된 ROW 의 ID 를 담는 '배열' 
                },
            });
    |-- ButtonBox
            |-- 여기에서 StudentListBox 에서 설정한 것을 가져와보려 했음. 그런데 안 됨
```


# 정리해야 할 키워드  

```
#form 초기화 
#form provider 와 자식 요소 
#부모에서 설정한 값을 자식에게 보내기 
#형제간 보내기 
#자식이 설정한 값을 부모에게 보내기
#필드 설정하는 곳, 업데이트 하는 곳, pull 하는 곳이 산재되어 있음. 어떻게 해야 관리가 편한가.
```



### mainPage 에서 form 을 초기화 하고, 자식 컴포넌트에서 새로운 form 필드를 정의해서 사용하는 경우 -> 부모 page 는, 자식이 어떤 걸 정의했는지 모르게 됨. 왜냐면, useForm 을 기준으로 새로운 form context 가 생성되기 때문 -> 따라서 form context 가 단절됨 -> 따라서 '부모 페이지 최상단' 에 form context 를 생성하고 꺼내쓰는게 관리에 있어 효율적임 (#⭐⭐⭐⭐⭐⭐⭐)
```
It means the child component is creating its own independent form context, which is completely separate from the form context initialized in the parent (mainPage). The parent has no knowledge of the fields or state managed by the useForm instance in the child.
```

```jsx
// mainPage 에서의 useForm 과 formProvider
  const methods = useForm<FormInput>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",

      // 학생 검색 박스 > datePicker > 선택된 날짜에 대한 필드 (#TODO: 목록 조회 할 때, 이게 API 에 들어가야 함)
      mainPage_diary_selectedDate: new Date().toISOString().split("T")[0], // 기본값: "yyyy-MM-dd" 형식
      mainPage_memobox_title: "",
    },
  });

 <FormProvider {...methods}>
        <div className="mainPage flex flex-col gap-[15px]">
          {/* 첫 번째 섹션 */}
          ...
</FormProvider>
```

```jsx
// mainPage 의 자식인 StudentListBox 에서 사용된 useForm 
// formProvider 를 사용 안 했다고 해도, useForm 을 새로 꺼낸 것 만으로, 새로운 form context 가 생기는 것 임!  
  const { setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      selectedRowsIdArr: [], // 선택된 ROW 의 ID 를 담는 '배열' 
    },
  });

```


# 그러면, 자식 컴포넌트인 StudentListBox 에서 사용한 useForm 을 걷어내고, 부모인 mainPage 로 올리는 리팩토링 하기 (#필드 초기화, 자식 컴포넌트에서 import 하는 구문, 자식 컴포넌트에서 데이터 pull, 자식 컴포넌트에서 데이터 update 중심으로)

- 요약 
```bash
- 'form context' 는 'useForm' 을 기준으로 존재한다. 

- 해당 form context 는 provider 의 children 이 모두 공유한다.
    - 다만, 자식이 별도의 useForm 을 만들면, 연결이 끊어진다.

- 상태관리에 있어, RHF 과 useState 간의 역할 구분
    - (https://chatgpt.com/c/674a7eba-2fe8-8009-9c7b-3d9191c1f1cc) 참고

```


- 이렇게 하는 이유
```
- Single Source of Truth 
    - RHF 은 PAGE 최상단에서 관리되게 하면 된다.

- RHF 와 컴포넌트별 useState 의 차이는 (#⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐)
    - RHF 은 API에 싣는 PAYLOAD 과 직결?
      : RHF 안에서 onSubmit 이벤트를 처리할 수 있기 때문에, 자연스럽게 그렇게 되는 것 같음. 
    - useState 는 UI 상태 표시에 집중?
      : 체크 박스의 경우 그러했음

```

### MainPage에서 필드 설정하고, provider 로 child 에게 
form context 제공하고, 자식 컴포넌트에서 pull, 및 update 해서 사용하기 (#중요한 건, useForm 을 기준으로 form context 가 제공된다는 것)

```jsx
// 초기화에 필드 추가하기 
  const methods = useForm<FormInput>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",

      // 학생 검색 박스 > datePicker > 선택된 날짜에 대한 필드 (#TODO: 목록 조회 할 때, 이게 API 에 들어가야 함)
      mainPage_diary_selectedDate: new Date().toISOString().split("T")[0], // 기본값: "yyyy-MM-dd" 형식
      mainPage_memobox_title: "",
    },
  });

// FormProvider 로 자식에게 context 를 제공
   <MainPageLayout>
      <FormProvider {...methods}>
      ...
      </FormProvider>
   </MainPageLayout>


// 자식 컴포넌트에서 PULL, UPDATE, 하는 경우 
  // watch 사용해서 PULL 하기 
  const { watch, setValue } = useFormContext(); // Access parent form context
  const selectedRowsIdArr = watch("selectedRowsIdArr", []); // Watch shared field

  // setValue 사용해서 UPDATE 하기
  setValue("selectedRowsIdArr", updatedSelection); // Update shared state



```



# 궁금한 것

### RHF 와 useState 간 역할 구분 (#⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐)


- 체크 박스의 경우를 보면, 단건 체크박스는 RHF을 통해 관리되고, useState 는 'UI 렌더링' 상태가 필요한 경우에만 쓰이는거 같은데 -> '상태 관리' 측면에서 RHF과 useState 간 차이가 있는거 아닌가? ?