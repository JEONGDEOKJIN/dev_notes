

# 고민되는 부분 

```
react hook form 의 배열을 useFieldArray 로 관리할지, setValue 로 관리할지 
```


# 비교
## setValue 
```
- (사용 편의성) 값 가져오고, 업데이트 하고, 제거하는 코드를 모두 내가 작성해야 함 
- (성능) watch 로 감시하면 불필요한 렌더링 발생
- (유효성 검사) trigger 같은 추가 작업 발생

- 예를 들어서 
	setValue로 관리하면, watch로 가져온 후 filter로 삭제하고 다시 setValue.
```



## useFieldArray 관리 
```
- (사용 편의성) 값 가져오고, 업데이트 하고, 제거하는 코드를 append, remove 같은 함수로 관리할 수 있음 / handleSubmit과 자연스럽게 연동
- (성능) append, remove 같은 함수는 최적화 되어 있어, 불필요한 렌더링 없음
- (유효성 검사) trigger 같은 추가 작업 발생


```


# useFieldArray 사용 

```
- value 필드에는 어떤 값을 넣어야 하는거지? 

```


---


# 사용법 정리 (250226)


# 요구 기능 
```
0. window popup 환경에서
1. 자식 창에서 클릭하면 
2. 부모 페이지에서 1) 컴포넌트 추가되고 2) 해당 값 대로 바인딩 되게 하기
```


## 부모 페이지
### react hook form 필드에 배열 정의하고 useFieldArray 로 관리
```tsx
 const methods = useForm<RHF_TCampFieldProductRegister>({
    mode: "onBlur",
    defaultValues: {
      selectedIdsBySiteToRegister: [],
    },
  });

const { control } = methods;
const {
  fields: fields_selectedIdsBySiteToRegister,
  append: append_selectedIdsBySiteToRegister,
  remove: remove_selectedIdsBySiteToRegister,
} = useFieldArray({
  control,
  name: "selectedIdsBySiteToRegister", // useForm의 defaultValues에서 관리하는 테이블명
});
```


### window 전역 객체를 호출해서 사용하는 useRegisterRHFToWindow 에 매개변수
- 여기에서는 해당 page 에서 나온 useFieldArray 함수를 주입함
```tsx
  const useFieldArrayMethods = {
    fields: fields_selectedIdsBySiteToRegister,
    append: append_selectedIdsBySiteToRegister,
    remove: remove_selectedIdsBySiteToRegister,
  };

  useRegisterRHFToWindow(methods, useFieldArrayMethods); // windowPopup 사용시 부모에서 등록해야 쓸 수 있음
```


### window > RHF > useFieldArray > append 메서드에 매개변수 전달할 수 있게 셋팅
```tsx
export const useRegisterRHFToWindow = (methods: UseFormReturn<any> , useFieldArrayMethods?:any) => {
  useEffect(() => {
    (window as any).RHF = {
      setValue: (item:ISelectedItemsByIds) => methods.setValue(item.RHFname, item.value),
      useFieldArray: {
        append: (value:any)=>useFieldArrayMethods.append(value),
      }
    };

    return () => {
      delete (window as any).RHF;
    };
  }, [methods]);
};
```


### 여기까지 셋팅이고, 그 다음, 값이 들어오면, 컴포넌트에 들어가는 흐름을 만들면 됨
```
값이 변경되었다고 가정한다면 
	1) fields_selectedIdsBySiteToRegister 필드로 값 가져오고 
	2) remove_selectedIdsBySiteToRegister 메서드로 index 전달해서 삭제 하면 됨
```

```tsx
 {fields_selectedIdsBySiteToRegister?.map(
            (item: ISiteInformation, index: number) => {
              return (
                <TabContent_Site
                  deleteBoxOnClickHandler={() => remove_selectedIdsBySiteToRegister(index)}
                  siteTab={item}
                  key={`${index}_siteInfoList`}
                />
              );
            }
          )}
```




## 자식 페이지

### 1. [클릭시 작동하는 이벤트 핸들러] setFieldArrayAppendRHFOfParent에 매개변수 전달
```tsx

  const handleOnclick = () => {
    const fieldArrayOBJ = {
      value : `${Date.now}`, // ex) ["1", "2"]
    }
    setFieldArrayAppendRHFOfParent(fieldArrayOBJ);
  };
```

### 2. window > RHF > useFieldArray 에 매개변수 실제로 전달 (#그러면, window 객체를 통해 부모 컴포넌트에 등록된 메서드에 값이 전달됨)
```tsx
export const setFieldArrayAppendRHFOfParent = (params: any) => {
  console.log("🙏🙏🙏setFieldArrayAppendRHFOfParent들어옴")
  if (window?.opener) {
    window?.opener?.RHF?.useFieldArray?.append(params);
  } else {
    console.error("No parent window found.");
  }
};
```



