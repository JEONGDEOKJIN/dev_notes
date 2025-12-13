# 참고자료

- 타입 스크립트를 위한 클린코드 [clean-code-typescript](https://738.github.io/clean-code-typescript/) https://738.github.io/clean-code-typescript/

- clean code 원칙을 코드레벨에서 적용할 때 만나게 되는 이슈들을 명확하게 적어본다. 적는 과정에서 문제가 명확해진다. 


# 변수

## 이름과 1개의 기능이 fit 하게  (# 함수의 경우, 단일 행동을 보장하는 네이밍)

- 의미 있는 변수 이름, 명시적인 변수 이름, 동사 + 명사,

# 함수

## 단일 행동을 추상화 한다. (#함수는 한 가지만 한다.)

- 함수가 한 가지 이상을 추상화 한다면, 그 함수는 너무 많은 일을 하게 된다. 재사용성과 쉬운 테스트를 위해 함수를 쪼갠다.

### 매개변수로 플래그를 만들지 않는다. ( #플래그가 매개변수라는 것은, 해당 함수가 한 가지 이상의 일을 한다는 것)

플래그를 사용하는 것은 해당 함수가 한 가지 이상의 일을 한다는 것을 뜻합니다. 함수는 한 가지의 일을 해야합니다. boolean 변수로 인해 다른 코드가 실행된다면 그 함수를 쪼개도록 하세요.

### [이슈] 이벤트 핸들러의 경우, 이름을 `on` 으로 통일❓

- [예시] 엑셀로 변환하는 함수가 onChange 이벤트가 발생되었을 때 실행되는데, 네이밍을 할 때, onChange 를 강조해서 적어야 할지 고민이었음. (#사용될 때의 맥락을 반영해야 하는지 #아니면, 그냥, 해당 기능에만 포커스를 둬야 할지)
    
    ```tsx
      const {handleFileChange} = useExcelUploader<any>();
    
      const registerConfig = {
        ...rules, // [TODO] 기존 코드에서 rules 를 이곳에서 받음
        ...(type === "file" && { onChange: handleFileChange,}),
      };
    ```
    
    ```tsx
    import { useState } from "react";
    import * as XLSX from "xlsx";
    
    interface ExcelUploaderHook<T> {
      items: T[];
      uploadExcel: (item: File) => void;
      resetItems: () => void;
      handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, onFileUpload:(file: File) => void) => void;
    }
    
    export const useExcelUploader = <
      T extends Record<string, any>
    >(): ExcelUploaderHook<T> => {
      const [items, setItems] = useState<T[]>([]);
    
      const uploadExcel = (item: File) => {
        const file = item;
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
    
          // Parse the first sheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData: T[] = XLSX.utils.sheet_to_json(worksheet);
    
          // Append data to the existing items
          setItems((prevItems) => [...prevItems, ...jsonData]);
        };
    
        reader.readAsArrayBuffer(file);
      };
    
      const resetItems = () => {
        setItems([]);
      };
    
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> , onFileUpload:(file: File) => void) => {
        if (onFileUpload) {
          const file = e.target.files?.[0];
          if (file) onFileUpload(file);
        }
      };
    
      return { items, uploadExcel, resetItems , handleFileChange };
    };
    
    ```
    

## 중복된 코드 제거 ( #Don’t Repeat Yourself #DRY)

- 그렇지 않으면 하나를 변경할 때마다 여러 곳을 변경하게 될 것입니다.

## 사이드 이펙트를 피하세요. (#😢 아직 이해가 안 됨)

# 디렉토리 관리

### [궁금한 것] 스타일을 변수로 빼서, 데이터 흐름, 로직만 잘 보이게 한다면, 어디에서 관리?

```bash
지금 Accordian 을 공통 컴포넌트로 관리하고 있는데 
여기에 있는 css 를 변수로 만든다면 

1) 해당 파일 안에서 관리해? 
2) 아니면, 해당 컴포넌트 안에서 관리해? 
3) 아니면, 모든 프로젝트에서 style 이라는 디렉토리를 만들어서 관리해? 
```

```bash
우선, 아코디언에만 적용되는 스타일 
작게 관리 

이 스타일이, 다른 컴포넌트, 에 공통적으로 필요하면, 그때 STYLE 이라는 디렉토리에 넣기 

- 많은 구성 요소(Accordion뿐만 아니라)에서 유사한 스타일을 재사용할 것으로 예상된다면 전역 디렉토리에 스타일을 배치⭐⭐⭐
```

# 공통화(모듈화)

## [hook] `다른 페이지에서도 로직이 반복` 되면 뺀다.

### [예제1] 페이지와 모달에서 삭제 로직이 반복되는 경우

- `모달` 에서 삭제 로직이 등장
    
    ```jsx
    모달은 
    	alert 와 다르게, 
    	page 처럼 별도의 CRUD 를 필요로 하는 컴포넌트
    ```
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/1700e22d-2a3e-4c86-95fe-dcb9ab8c40d4/image.png)
    
- 기존 `페이지` 단위 에서의 삭제 로직
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/2e18738f-5eff-42c0-b866-c4097c5ca00b/image.png)
    
- 세부적이 삭제 로직은 다르겠지만 `큰 범주에서의 삭제` 는 동일할 것. → 다른 PAGE 에서 삭제가 이루어지고 있고, 분명 계속 나올 것 이기에 HOOK 으로 만든다.
- [클린코드 기준체크] 저장위치? NAMIMG? 기존 코드와의 조화, 그 밖의 요건들 검토
    
    
    - (#✅✅✅ openModalByStrategy 이 함수 자체를 props 로 가져와서, 사용 폭이 굉장히 넓어짐
    
    ```tsx
    import { useCallback } from "react";
    
    const useDeleteLogicByStrategy = (
      openModalByStrategy: (strategyKey: string) => void
    ) => {
      const handleDelete = useCallback(
        (strategyKey: string, validationData?: any) => {
          // [TODO] API 추가될 때, 일반적인 삭제 로직 추가
    
          // 모달 기반의 삭제 로직이 필요한 경우
          openModalByStrategy("deleteItem");
    
          // validation 로직이 필요한 경우
          if (validationData) {
            console.log("Validation data:", validationData);
          }
        },
        [openModalByStrategy]
      );
    
      return {
        handleDelete,
      };
    };
    
    export default useDeleteLogicByStrategy;
    
    ```
    
- [관련 이슈] 최적화 (#✅ 이건 추후 리팩토링)
    - `복수의 페이지` 에서 호출되기 때문에, `최적화` 를 신경쓰기 위해 `useCallBack` 을 사용
    
    - gpt 설명
        
        예, 당신 말이 맞아요! 여기서 useCallback 후크는 주로 성능 최적화를 위해 사용됩니다. 특히 이 사용자 정의 후크(useDeleteLogicByStrategy)가 여러 페이지에서 활용될 수 있기 때문입니다. 이것을 분석해보자:
        
        useCallback을 사용하는 이유는 무엇입니까?
        
        1. 여러 페이지에서 재사용 가능
        이 후크는 재사용이 가능하도록 설계되었으므로 'handleDelete' 함수는 여러 페이지의 구성요소에 prop로 전달될 수 있습니다.
        useCallback이 없으면 상위 구성 요소(또는 이 후크를 사용하는 구성 요소)가 다시 렌더링될 때마다 handleDelete에 대한 새 함수 참조가 생성됩니다.
        이로 인해 하위 구성요소가 불필요하게 다시 렌더링될 수 있습니다. 특히 해당 구성요소가 React.memo와 같은 메모 기술을 사용하는 경우 더욱 그렇습니다.
        2. 성능 최적화
        useCallback에 handleDelete를 래핑하면 React는 함수 참조를 메모합니다. 이를 통해 다음이 보장됩니다.
        종속성(openModalByStrategy)이 변경되지 않는 한 동일한 함수 참조가 사용됩니다.
        이렇게 하면 각 렌더링 중에 새 함수 인스턴스를 생성하는 데 따른 계산 오버헤드가 줄어듭니다.
        3. 안정적인 함수 참조
        handleDelete가 다른 후크(예: useEffect, useMemo 또는 다른 useCallback)에서 종속성으로 사용되는 경우 useCallback은 종속성이 필요하지 않은 이상 불필요하게 재실행을 트리거하지 않도록 합니다.
        useCallback이 없으면 React는 모든 렌더링에서 handleDelete를 새 함수로 처리하여 잠재적으로 부작용이나 성능 문제를 일으킬 수 있습니다.
        이것이 사용 사례에 중요한 이유는 무엇입니까?
        여러 페이지에 사용되는 후크:
        
        이 후크(useDeleteLogicByStrategy)는 여러 페이지에서 사용하기 위한 것이므로 재사용성과 성능이 중요합니다.
        페이지는 불필요한 재렌더링이 성능 병목 현상을 일으킬 수 있는 깊게 중첩된 구성 요소(예: 버튼 또는 모달)에 handleDelete와 같은 기능을 전달하는 경우가 많습니다.
        하위 구성요소의 Prop 안정성:
        
        하위 구성 요소(예: handleDelete를 사용하는 버튼)가 React.memo로 래핑된 경우 소품이 변경된 경우에만 다시 렌더링됩니다.
        useCallback이 없으면 handleDelete 함수가 렌더링할 때마다 변경되는 것처럼 나타나 하위 항목이 불필요하게 다시 렌더링됩니다.
        클린 코드 원칙과의 일관성:
        
        useCallback을 사용하면 handleDelete가 안정적인 참조를 가지며 재사용에 최적화되어 있음을 명시적으로 만들 수 있습니다.
        이는 의도하지 않은 재렌더링을 방지하고 예측 가능한 동작을 보장함으로써 깨끗한 코드 원칙을 준수합니다.
        useCallback이 없으면 어떻게 되나요?
        useCallback이 사용되지 않는 경우:
        
        후크를 사용하여 구성 요소를 렌더링할 때마다 새로운 handleDelete 함수가 생성됩니다.
        handleDelete가 깊게 중첩된 구성 요소에 전달되거나 종속성 배열에 사용되는 경우 성능 문제가 발생할 수 있습니다.
        특히 React.memo로 최적화된 구성 요소에서는 의도하지 않은 다시 렌더링이 발생할 수 있습니다.
        결론
        여기서 useCallback이 사용된 이유는 다음과 같습니다.
        
        후크는 여러 페이지에 걸쳐 재사용할 수 있도록 설계되었습니다.
        안정적인 함수 참조를 보장하고 상위 및 하위 구성 요소에서 불필요한 재렌더링을 방지하려면 최적화가 필요합니다.
        이는 특히 후크 및 재사용 가능한 논리에 대한 React의 모범 사례입니다. useCallback을 사용하면 구현이 깔끔하고 효율적이며 예측 가능합니다.
        
- `dependency injection` 방법 (#의존성 주입의 방식)
    - 의존성 주입을 어떻게 할 것 인가!? 에 대한 문제
- [관련 이슈] 전략패턴과 hook 사용을 어떻게 조율?

## [hook]  `복잡한 로직` 이면 뺀다.

## [blocks] 1) 다른 페이지에서도 사용되고 2) 각 element 를 사용해서 조립하면, 뺀다. 3) 저장 위치는 각 element 근처로 한다.

### [예시] `Table` , `TableInfo` 컴포넌트를 활용한 경우, → Table 하위에 있는 Block 에 넣으면 될까? ( #우선, 컴포넌트화는 할 건데,  # 혹시, 다른 테이블에서 활용할 수도 있으니? #근데, 아직 다른 곳에서 사용한 적이 없잖아. 그러면, 해당 page 의 컴포넌트에 넣자 )

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/26d78fba-2bdd-4df2-80f8-b06235aa6a35/image.png)

- 소스 코드
    
    ```tsx
    <section className="col-span-4 pt-6  relative">
                {/* [TODO : 향후, 하드코딩 한 것 변경해야 함] <TableInfo totCnt={data?.total_items} /> */}
                <TableInfo
                  totText="총"
                  isTotCntShow={false}
                  isTextShow={false}
                  totCnt={fetchedData_displayProducts?.total_itemCount}
                  contentLeft={
                    <>
                      <Modal_Subtitle wrapCSS="!justify-start !pb-0 ">
                        <header
                          className={classNames(
                            modal_table_header,
                            "relative flex items-center"
                          )}
                        >
                          상품 전시
                        </header>
                      </Modal_Subtitle>
                    </>
                  }
                  content={
                    <RightContentBtnBox
                      isCustomBtnOn={true}
                      isPageSizeBtnOn={false}
                      isExcelDownloadOn={false}
                      customElement={
                        <>
                          <Button
                            size="md"
                            label="추가"
                            type="button"
                            variant="defaultOutlineLight"
                            className="!w-[80px] !px-2"
                            onClick={handleAddNewExhibition}
                          />
                        </>
                      }
                    />
                  }
                />
    
                {/* 타이틀 및 노출타입 */}
                <div className="grid grid-cols-[120px_1fr_120px_1fr] min-w-[700px]  pb-1">
                  {/* 타이틀 */}
                  <div className={classNames(headCellStyle, modal_table_itemLabel)}>
                    <label>타이틀</label>
                  </div>
                  <div className={dataCellStyle}>
                    <div className="w-full items-center pt-[1px]">
                      <Input type="text" name="campaignId" sizeH="S" sizeW="FULL" />
                    </div>
                  </div>
    
                  {/* 기획전 코드 */}
                  <div className={classNames(headCellStyle, modal_table_itemLabel)}>
                    <label>기획전 코드</label>
                  </div>
                  <div
                    className={classNames(
                      dataCellStyle,
                      "flex gap-2 justify-between"
                    )}
                  >
                    <Radio name="campaign_category" items={radio_disPlayType} />
                    <Button
                      size="md"
                      label="삭제"
                      type="button"
                      variant="defaultOutlineLight"
                      className="!w-[80px] !px-2 "
                      onClick={handleDeleteExhibition}
                    />
                  </div>
                </div>
    
                <ColTable
                  name={fetchedData_displayProducts ? "displayProduct_table" : ""} // [TODO] name props 에 설정한 이름을 page 레벨의 RHF 의 필드로 등록해야 함. 이건 체크박스 데이터를 들고 있기 때문에 discountUser_table[] 타입으로 설정
                  checkboxId="productDisplay_id" // [TODO] 백엔드 각 item 에서, newsletter_id 필드가 있고, 그 값이 고유해야, 체크박스 각각이 RHF 과 연동되어 체크가 됨
                  isCheckBox={true}
                  tableKey="display"
                  isNumber={false}
                  baseNumber={
                    (fetchedData_displayProducts?.total_itemCount ?? 0) -
                    methods.getValues("size") * methods.getValues("page") +
                    methods.getValues("size")
                  }
                  columns={[
                    {
                      header: "순번",
                      name: ["displayProduct_order"], // [TODO] 서버 응답 key 로 변경해야 함
                      // editor: (item: string) => ctmCellModalRegisterReview(item),
                    },
                    {
                      header: "전시상품 코드",
                      name: ["displayProduct_code"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "전시상품명",
                      name: ["displayProduct_name"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "상품유형",
                      name: ["displayProduct_type"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "판매상태",
                      name: ["displayProduct_SellStatus"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "전시여부",
                      name: ["displayProduct_display"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "대분류",
                      name: ["displayProduct_SortTypeA"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "중분류",
                      name: ["displayProduct_SortTypeB"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "소분류",
                      name: ["displayProduct_SortTypeC"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "판매가",
                      name: ["displayProduct_SellingPrice"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "정책가",
                      name: ["displayProduct_PolicyPrice"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                    {
                      header: "할인가",
                      name: ["displayProduct_DiscountPrice"], // [TODO] 서버 응답 key 로 변경해야 함
                    },
                  ]}
                  items={fetchedData_displayProducts?.items || []}
                  emptyMessage={"조회된 결과가 없습니다."}
                  isLoading={isLoading || isError} // [TODO] isLoading, isError 를 management 파일 에 추가
                />
              </section>
    
    ```
    

## [스타일] ⭐⭐⭐ 변수와 시키니까, 너무 좋다 ⭐⭐⭐ | 로직만 볼 수 있고, 읽는게 훨씬 편해진다. | 반복하고 싶은 욕구가 든다. 네이밍을 잘 하고 싶어 진다

### [이슈] tailwind 를 직접 작성하는 것 말고, 변수화 했을 때, 적용이 안 되는 부분이 있음

- 아래 코드에서 `pr-2` 이게 적용이 안 되다가, 1) classNames 를 사용해서, inline 에 추가 하니까 되었다. 2) 그리고 다시 제거하니까,

```tsx
// [1차] 
export const colTableStyles = {
  // 부연설명할 때 사용하는 스타일 
  // 이것만 넣으니까, 안 됨 
  description_blue: "text-blue1e flex flex-shrink-0 !font-[500] pr-2",
};

// [2차] inline 에 기재하기 이렇게 하니까 됨 
<span className={classNames(colTableStyles?.description_blue, "pr-2")}>
  *본 내용은 행사 종료 후 지급 되는 행사입니다.
</span>

// [3차] 해당 스타일 변수 사용하기 
// 위에 pr-2 넣고 -> 적용 시키고 -> 제거 하니까, 다시 작동을 함 
<span className={classNames(colTableStyles?.description_blue)}>
  *본 내용은 행사 종료 후 지급 되는 행사입니다.
</span>

// 이게 tailwind 자체의 이슈 인가? 
```

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/0cae17fc-ff5c-424e-96d6-f2bfc4d7beb4/17c0dbd4-8a3c-4df6-96f4-c12e2e501bb2/image.png)

### [이슈] ‘기존 CSS 를 확장’ 하고자 할 때, 1) `classNames` 를 쓰나? 2) `getDynamicStyles` 함수를 쓰나?

- [니즈] 여기에서, `FormSelect` 에 `full` 을 주고, `부모 컴포넌트에서 width 를 100px 을 줘서 컨트롤 하고 싶음`

```tsx
import { headerOnlineEventStyles } from "@/components/Accordion/Styles";
import FormSelect from "@/components/Form/Select/Select";
import { giveAwayOptions } from "@/libs/constants/selectOption";
import React from "react";

const Accordion_Label = () => {
  return (
    <>
      <div
        data-accordion-nonMovable
        className={headerOnlineEventStyles.formSelectWrapper}
      >
        <FormSelect
          name="max_apply_count"
          defaultLabel={"선택"}
          items={giveAwayOptions}
          sizeW="FULL"
          sizeH="XS"
        />
      </div>
    </>
  );
};

export default Accordion_Label;

```

- [방법1] ClassNames 사용 (#제일 간단)

```tsx
      {/* ROW */}
      <div className={classNames(rowCommon, '!justify-start') }>
        <div className="relative items-center pt-[1px]">
          <Input
            type="text"
            name="campaignId"
            sizeH="S"
            sizeW="S"
            className=""
          />
        </div>
```

- [방법 2] formSelectWrapperCustomCSS property 추가하기
    - 문제점 : 만약, custom 하는게 늘어나면, 저 property 들이 늘어날텐데

```tsx
export const headerOnlineEventStyles = {
  grid: "w-full justify-center items-center grid justify-items-center grid-cols-[50px_150px_180px_1fr]",
  checkboxWrapper: "",
  label: "",
  formSelectWrapper: "font-[500] justify-self-start",
  description:"justify-self-end",
};
```

- [방법 2] dynamic 함수 만들어서?
    - 만약 길어지면, 이 함수를 또 밖으로 빼서 관리할 수도?

```tsx
const getDynamicStyles = (baseStyle: string, customStyle?: string) => {
  return `${baseStyle} ${customStyle || ""}`;
};

// 어떤 css 속성이건, 가져와서 추가할 수 있을 것 같음 
// 음... 이게 자율성이 좀 더 높지 않을까. 
// 만약, 길어지면? 
```

```tsx
import React from "react";
import { accordionStyles_onlineEvent } from "./_style";

const Accordion_Contents_Point: React.FC<AccordionContentsProps> = ({
  watchRHFName = "",
}) => { 
  const { rowItemsArr, handleAddRowItem } = useRowManagement(initialRowItem);

	// 여기에서 가져와서 넣기? ❓❓❓
  const custom_rowCommon = getDynamicStyles(rowCommon, "!justify-start");

  return (
    <section className="font-normal grid grid-cols-[200px_auto]">

      {/* 여기에서 custom_rowCommon 넣기⭐⭐⭐⭐⭐⭐*/}
      <div className={custom_rowCommon}>
        <div className="relative items-center pt-[1px]">
          <Input
            type="text"
            name="campaignId"
            sizeH="S"
            sizeW="S"
            className=""
          />
        </div>
        <span className={priceLabel}>원 이상</span>
        <div className="h-[46px]">
          <FormSelect
            name="max_apply_count"
            defaultLabel={"선택"}
            items={giveAwayOptions}
            sizeW="S"
            sizeH="S"
          />
        </div>
      </div>

  );};

export default Accordion_Contents_Point;

```

- [방법 3] factory 패턴? 맵핑?

# 그 밖의 기준

- 기존 코드와의 조화?
    - 내가 전체 공통 컴포넌트를 뜯어고칠게 아니라면, 기존 코드 패턴을 존중하면서 짜는게 필요 하다고 생각함.