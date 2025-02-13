
# 문제의 원인
즉, useForm의 defaultValues에서 해당 필드가 존재하면, defaultLabel이 무시될 가능성이 높음.

증정내용의 FormSelect 에 1번째 값이 들어가게 하고 싶은데, 이게 컨트롤이 안 되고 있음. 


![Image](https://i.imgur.com/3dvqToX.jpeg)



# FormSelect 의 name 에 'string' 으로 값을 주기 
## name 에 string 으로 'formSelectRHFName' 을 입력하는 경우, 원하는 defaultLabel 이 반영됨
```tsx
        <FormSelect
          name="formSelectRHFName"
          defaultLabel={giveAwayOptions[1].label} // ✅ [TODO] 현재 이 라벨이 반영되지 않음
          items={giveAwayOptions}
          sizeW="S"
          sizeH="XS"
        />
```

## 문제는 'label' 은 보이지만, '어딘가 값이 반영이 안 됨' -> 그래서, 토글을 눌렀을 때, 안 떨어짐 
```
1. 아래 처럼, 클릭을 해도, 안 떨어짐 
2. 한번 비로소 증정품 클릭을 해줘야, 떨어짐
```

- 문제 원인 
```tsx
-> 문제 원인은 값이 있고, 없고를 컨트롤 하는게 react hook form 이기 때문임 
-> 따라서, react hook form 에서, 기본값을 설정해야 -> 비로고 해당 컴포넌트에서 기본값이 보이게 됨
```

![Image](https://i.imgur.com/Vn59Bcl.jpeg)
(label은 변경되었으나, ‘내부 값’이 변경되지 않아서, 클릭을 해도 움직이지 않는 경우 
이건, 아코디언 로직이 ‘내부 값’ 과 연결되어 있는 상태라, label 만 변경한다고 해서, 되지 않는 상태 )


![Image](https://i.imgur.com/jb9fvZV.jpeg)
(react hook form 에서 기본값을 별도로 설정해준 경우)



# React Hook Form defaultValues 및 Mapping 로직 사용하기 

## react hook form 의 초기값을 설정하기 

- 여기에서 `FormSelect` 컴포넌트에 바인딩되는 CONSTANT 값을 넣는다. 

```tsx
 const methods = useForm<Modal_FieldCampaign>({
    defaultValues: {
      onlineEvent_giveAway_type: "freebie", // [TODO] 여기에서 기본값을 선택하면, formSelect에서 해당 value 가 선택되어 보임 // [TODO] 네이밍 규칙에 맞게 다시 변경
      onlineEvent_exhibition_type: "freebie", // [TODO] 여기에서 기본값을 선택하면, formSelect에서 해당 value 가 선택되어 보임  [TODO] 네이밍 규칙에 맞게 다시 변경
    },
  });
```

- CONSTANT 값 설정 
```tsx
// select 옵션의 value property 에 맞는 값을 react hook form 의 초기값에 넣어준다.
export const giveAwayOptions = [
  { label: "선택", value: "" },
  { label: "증정품", value: "freebie" },
  { label: "포인트", value: "point" },
];
```
  
## 이렇게 초기값을 설정하면 어떻게 되는거지? 

### 1. watch 로 해당 필드에 있는 값을 가져오기 
```tsx
const watchRHFName = methods.watch("onlineEvent_giveAway_type");
const watchRHFNameExhibition = methods.watch("onlineEvent_exhibition_type")
```

### 2. GridFields_onlineEvent 컴포넌트에 넣어주기
```tsx
<GridFields_onlineEvent
    handleSearchFieldEvent={handleSearchFieldEvent}
    mainEventVariable={mainEventVariable}
    handleRegisterMainEventVariable={handleRegisterMainEventVariable}
    watchRHFName={watchRHFName}
    watchRHFNameExhibition={watchRHFNameExhibition}
    methods={methods}
    fetchedData={fetchedData}
  />
```
  
  
### 3. Accordion 컴포넌트의 content 속성에서 contentMap 컴포넌트 중 'watch 에 의해 내뱉어진 값' 으로 선택이 됨 
```tsx
 <Accordion
    header={
      <Header_OnlineEvent
        formSelectRHFName="onlineEvent_exhibition_type"
        labelContent={<Accordion_Label />}
        isHeaderDescriptionShow={false}
      />
    }
    content={contentMap[watchRHFNameExhibition] || ""}
  />
```

```tsx
export const contentMap: { [key: string]: React.ReactNode } = {
  point: <Accordion_Contents_Point />,
  freebie: <Accordion_Contents_Freebie />,
  "": <></>,
};
```


# 조금 더 발전시켜보기 

## 생각해보면 FormSelect 의 name 에 react hook form 에서 관리하는 필드명을 넣는 순간
```tsx
1. 해당 필드에 대한 통제는 React Hook Form 로직을 따르게 된다. 

2. 그래서, '기본값을 넣는 것' 도 
	1) FormSelect 의 defaultVlaue props 에 넣는게 아니라 
	2) React Hook Form 의 defaultValues 속성에 넣어줘야 한다.

3. 그 밖에 API 연결을 할 때, 관리해야 하는 방식이 달라질 수 있다. 
	- 이 부분을 반드시 재활용 가능한 로직으로 만들어야 시간 내에 끝낼 수 있다. 

4. 그래서 하드코딩을 최대한 줄이고, 상수를 가져와서 기본값을 넣었다. (#⭐⭐⭐⭐⭐⭐)
  const methods = useForm<Modal_FieldCampaign>({
  defaultValues : {
		onlineEvent_giveAway_type: `${giveAwayOptions[1].value}`, // [TODO] 여기에서 기본값을 선택하면, formSelect에서 해당 value 가 선택되어 보임 // [TODO] 네이밍 규칙에 맞게 다시 변경
	  onlineEvent_exhibition_type: `${giveAwayOptions[1].value}`, // [TODO] 여기에서 기본값을 선택하면, formSelect에서 해당 value 가 선택되어 보임  [TODO] 네이밍 규칙에 맞게 다시 변경
	}}
```

![Image](https://i.imgur.com/NVHeZqs.jpeg)