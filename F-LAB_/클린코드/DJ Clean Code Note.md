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
    
        
- `dependency injection` 방법 (#의존성 주입의 방식)
    - 의존성 주입을 어떻게 할 것 인가!? 에 대한 문제

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
    

# 그 밖의 기준

- 기존 코드와의 조화?
    - 내가 전체 공통 컴포넌트를 뜯어고칠게 아니라면, 기존 코드 패턴을 존중하면서 짜는게 필요 하다고 생각함.