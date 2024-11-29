
### 고민 
```
"- React Hook Form 에서, name 을 다르게 관리하고 
외부인일 경우, 기본값을 전달하게 하면 되고 
필수값, 옵션값 선택에 따른 부분을 잘 컨트롤 해야 할듯 (#✅ R&D 필요) 

- '추가 등록' 후 API 에 태우는 시점에 대한 고민 -> '자동 저장 로직' 에 대한 고민 
1) 추가 등록 클릭하면, -> 목록에 올라가면 -> '새로고침, 페이지 이동' 해도 유지되어야 할 듯 

2) '새로고침, 페이지 이동 해도 유지' 되게 하려면? 
- 로컬 스토리지, 세션, 
- 캐싱(클라이언트, 서버) 
- 꺼도 유지가 되어야 함. 
ex) 대충 적고 브라우저를 껐음 -> 1) 세션 : 날아감 2) 로컬 스토리지 : 유지 3) 다른 곳? 리액트 쿼리? recoil? 
- 어디에 저장되게 해서 운영하는게 효율적일까? (#✅ R&D 필요) 


에러메시지, 상태값 표시에 대한 핸들링도 하면 좋을거 같은데, 이건 후순위 

인원추가로도 등록할 수 있고, 밑에 테이블로도 등록할 수 있는거지? "
```


# 기본 React Hook Form flow 


- 참고 : C:\Users\nextinnovation\Desktop\DJ-DEV\dev_notes\Hard skills\HTML&CSS\HTML&CSS 모음\datePicker_cloneElement 사용해서 UI 와 이벤트 로직 분리하기.md

`### 달력에서 날짜를 선택하면(onChange이벤트가 발생하면) -> 날짜 형식을 수정해서 -> 공통컴포넌트인 Input 이 받게 하기`



### 1. 필드에 등록함 
```jsx
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
```


### 2. provider 의 영향 범위 내에 있는지 확인 


### 3. 사용 원하는 컴포넌트에서 
```jsx
const SingleDatePicker: React.FC<ISingleDatePicker> = ({ name }) => {
  const { setValue, getValues } = useFormContext<FieldValues>();
  const date = getValues(name);


3-1) pull 가져오려면 
// 2. 값을 pull 할 때, ... 으로 넣어줘야 value 에 RHF 내부에서 들어갈 수 있음
  <input
    ...
    {...(register && register(name, rules))}
  >
  </input>

이렇게 되어 있어야 하고 

3-2) pull 메서드는 getValues 

3-3) push 메서드는           setValue(`${name}.period`, '직접선택');
사용

```



# 궁금한 것 

```jsx
    <FormProvider {...methods}>

이걸 왜 해야 하는거지? 
모달에서 이걸 넣었을 때, 문제가 되지는 않나? 
좀 꼬이지는 않나? 
```