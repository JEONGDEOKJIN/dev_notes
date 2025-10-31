
# 개발 노트 출처 
- https://www.figma.com/board/LmwbrNXAVUOogSBWXLhthN/%EC%8A%A4%EB%85%B8%EC%9A%B0%ED%94%BC%ED%81%AC-DDD%2C-DAG%2C-%EC%8B%9C%ED%80%80%EC%8A%A4-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8?node-id=186-1388&t=YCyp8NmiOfDjFV9k-4

# 리팩토링 필요 
- 테이블에서 item 의 id 를 넣어서 값이 한꺼번에 갈 수 있게 


# 기본 default 값 보이게 하기 
```jsx 
export type MemberFormType = {
  onlineEvent_id : string;
  onlineEvent_name : string;
};
  
const methods = useForm<MemberFormType>({
  mode: "onBlur",
  defaultValues: {
    onlineEvent_id: "✅기본값테스트",
 // ✅ input컴포넌트의 name 속성에 바인딩 될 이름과 일치
    onlineEvent_name: "✅기본값테스트",
 // ✅ input컴포넌트의 name 속성에 바인딩 될 이름과 일치
  },
});

return(
  <SearchBox
    firstInputName="onlineEvent_id"
 // ✅ input컴포넌트의 name 속성에 바인딩 될 이름과 일치
    secondInputName="onlineEvent_name" // ✅ input컴포넌트의 name 속성에 바인딩 될 이름과 일치
    labelTitle="온라인 이벤트"
    onClickHandler={handleSearchFieldEvent}
  />
)
```
```jsx
// SearchBox 컴포넌트 내에서 Input 컴포넌트의 name 에 바인딩 
interface ISearchBox {
  firstInputName?: string;
  secondInputName?: string;
  labelTitle?: string;
  onClickHandler?: () => void;
}

const SearchBox: React.FC<ISearchBox> = ({
  firstInputName = "",
  secondInputName = "",
  labelTitle = "라벨 타이틀",
  onClickHandler,
}) => {
  return (
    <>
      <section className="flex ml-auto pb-3 w-fit gap-5 ">
        <label className="flex-shrink-0 items-center flex">{labelTitle}</label>
        <div className="flex gap-2">
          <div>
            <Input
              type="text"
              name={firstInputName}
              sizeH="S"
              sizeW="S"
              className=""
            />
          </div>
          <Input
            type="text"
            name={secondInputName}
            sizeH="S"
            sizeW="FULL"
            className=""
            iconOnClickHandler={onClickHandler}
            searchIconOn={true}
            deleteIconCSS="right-[45px]"
          />
        </div>
      </section>
    </>
  );
};

export default SearchBox;

```

![Image](https://i.imgur.com/q9CXSbl.jpeg)


# 값 update

![Image](https://i.imgur.com/71ZXs7S.jpeg)

```jsx
  const handleSetValue = () => {
    methods.setValue("onlineEvent_id", "🔵setValue 테스트");
// ✅ 해당 필드를 setValue 하면, 값 설정 가능
    methods.setValue("onlineEvent_name", "🔵setValue 테스트");
  }

  return (
    <>
      <FormProvider {...methods}>
        <div>
          <SearchBox
            firstInputName="onlineEvent_id"
            secondInputName="onlineEvent_name"
            labelTitle="온라인 이벤트"
            onClickHandler={handleSearchFieldEvent}
          />
        </div>

        
        <button onClick={handleSetValue}  >setValue test</button>
```
![Image](https://i.imgur.com/L1athMb.jpeg)

 
# window popup 설정했을 때, 자식 컴포넌트가 1) 해당 페이지의 React Hook Form methods 를 가져올 수 있게 하기


1. 사용자 클릭 (@window popup Coltable)
```jsx
  {
              header: "이벤트 제목",
              name: ["onlineEvent_title"], // [TODO] 서버 응답 key 로 변경해야 함
              editor: (item: string, value: string ) => {
                // [TODO] 클릭시 해당 값이, 검색 필드에 꽂히게 해야 함
                return (
                  <span
                    onClick={(value) =>
                      handleRHFSetValue("onlineEvent_title", value, item)
                    }
                    className="cursor-pointer underline"
                  >
                    {item}
                  </span>
                );
              },
            },
```


2. helper 함수로 전달
```jsx
  const handleRHFSetValue = (fieldName: string, value: any, item: any) => {
    // [TODO] item 의 id 를 가져와서 name 과 title 을 한꺼번에 넘길 수 있게 해야 함
 
    const sendSetValueParams: ISetValueParams[] = [
      {
        name: fieldName as keyof TOnlineEvent_EntryWinner,
        value: item,
      },
    ];

    sendRHFSetValueToParent(sendSetValueParams);
  };
```


3. helper 함수에서, 부모 컴포넌트를 호출하여, 전체 메서드 중 특정 메서드만 호출
```jsx
/**
 * [sendRHFSetValueToParent] (window popup 페이지에서 사용)
 * @param sendSetValueParams
 * @description : 부모 페이지로 RHF의 setValue 값만 전달하는 기능
 */
export const sendRHFSetValueToParent = (
  sendSetValueParams: ISetValueParams[]
) => {
  // [TODO] 원래는, window popup 페이지에서 정의되어야 하나, 모듈화 시킬 수 있어서 뺌 
  if (window.opener) {
    window.opener?.parentHelper?.RHF?.handleSetValue(sendSetValueParams);
  } else {
    console.error("No parent window found.");
  }
};
```

4. 부모창으로 가서, window.opener?.parentHelper? 가 있는치를 찾음
```jsx
  useEffect(() => {
    setupPopupParentHelper(methods);
    return () => {
      delete (window as any).handlePopup;
    };
  }, [methods]);
```

5. setupPopupParentHelper 안에서 window popup 에서 호출한 함수를 실행함
```jsx
export const setupPopupParentHelper = (methods: any) => {
  (window as any).parentHelper = {
    RHF: {
      handleSetValue: (setValueParams: ISetValueParams[]) => {
        setValueParams?.forEach((item) => {
          methods.setValue(item.name, item.value);
        });
      },
      handleWatch: (setValueParams: ISetValueParams[]) => {
        // [TODO] 추가로 필요한 로직 및 메서드 정의
      },
    },
  };
};
```