



![Image](https://i.imgur.com/KTjxJ0Z.jpeg)

```jsx
<div className="min-w-[1280px] overflow-x-auto">
  <FormProvider {...methods}>
    <SearchFilter
      optionContent={
        <div className="flex gap-x-[30px] gap-y-[18px] flex-wrap">
          {/* 첫 번째 row */}
          <section className="flex w-full justify-start gap-x-[30px] gap-y-[18px]">
            <div className="flex gap-5">
              <FilterOption
                title="카테고리"
                content={
                  <FormSelect
                    name="erp_category_L0"
                    items={[
                      { label: "전체", value: "" },
                      { label: "ERP_카테고리_대_A", value: "A" },
                      { label: "ERP_카테고리_대_B", value: "B" },
                      { label: "ERP_카테고리_대_C", value: "C" },
                    ]}
                    sizeW="S"
                    sizeH="S"
                  />
                }
              />
              {/* 다른 FilterOption */}
            </div>
            {/* 나머지 FilterOption */}
          </section>
          {/* 두 번째, 세 번째 row */}
        </div>
      }
      onReset={onReset}
      onSearch={methods.handleSubmit(onSearch)}
    />
  </FormProvider>
</div>

```