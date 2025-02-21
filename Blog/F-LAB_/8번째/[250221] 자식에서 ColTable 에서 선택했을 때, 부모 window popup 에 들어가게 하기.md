
# [2차] 사용 예시 

## 1. window 전역 객체를 통해 데이터 주고받는 셋팅 
### 부모 페이지 
```tsx

// [셋팅하고 싶은 RHF 필드 셋팅] 이번에는 selectedIdsBySite 

	// 1. [필수] 기본 타입 셋팅 (#✅ 이것대로 전달해야 함)
	type TCampFieldProductRegister = {
	  selectedIdsBySiteToRegister: string[];
	};
	
  const methods = useForm<TCampFieldProductRegister>({
    defaultValues: {
      selectedIdsBySiteToRegister: [],
    },
  });
  
  // 2. [필수] 현재 페이지의 RHF의 methods 를 사용할 수 있게 window 객체에 등록 
  useRegisterRHFToWindow(methods); // windowPopup 사용시 부모에서 등록

  // 3. [ID를 받아오고 난 후 처리 로직] (#뒤에 목차 2에서 설명)
	const selectedIdsBySite = methods.watch("selectedIdsBySiteToRegister");

```

### 자식 페이지 
```tsx	
	// [RHF] 1. 테이블에서 클릭되면, 해당 row 의 id 가져오는 셋팅
  type TCampFieldProductRegister = {
    selectedItems : string[]
  }
  
  const methods = useForm<TCampFieldProductRegister>({
    defaultValues: {
      selectedItems: [],
    },
  });

  const { watch } = methods;
  const selectedItems = watch("selectedItems"); // ColTable에서 선택된 체크박스 값 가져오기

	
	// 2. 클릭된 값을 window 전역 객체를 통해 넘기기
  useEffect(() => {
    const selectedItemsOBJ:ISelectedItemsByIds = {
      RHFname: "selectedIdsBySiteToRegister",
      value: selectedItems, // ex) ["1", "2"]
    };

    setRHFValueOfParent(selectedItemsOBJ);
  }, [selectedItems]); 
  
```



## 2. 전달받은 ID 값으로 filter 해서, map 그리는 로직 (#부모 페이지) 

```tsx

// 1. 선택된 ID 받아오기 
	  const selectedIdsBySiteToRegister = methods.watch("selectedIdsBySiteToRegister");

// 2. 받아온 거 기준으로 include -> filter -> map 돌리기 
  const tabItems = [
    {
      label: "사이트",
      content: (
        <div>
          {siteInformationList?.filter(IsIdsInclude)
            .map((item: ISiteInformation, index: number) => {
              return (
                <TabContent_Site
                  deleteBoxOnClickHandler={remove_tabContents_site}
                  siteTab={item}
                  key={`${index}_siteInfoList`}
                />
              );
            })}
        </div>
      ),
    },
			

```
