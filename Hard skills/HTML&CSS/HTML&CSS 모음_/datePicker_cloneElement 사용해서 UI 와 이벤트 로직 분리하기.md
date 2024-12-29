# single date 로 수정 하기

### 기존 : start date 랑 end date 가 함께 나옴

![Image](https://i.imgur.com/S8KgiQg.png)

## 구성 요소

### Calendar 에 해당 props에 값을 바인딩

```jsx
<Calendar
  name={`${name}.start_at`}
  disabled={disabled}
  startDate={date?.start_at}
  endDate={date?.end_at}
  maxDate={date?.end_at}
/>
```

### 클릭하면 왜 나오는 거지

```jsx
// 클릭하면 -> onClick 이벤트가 발생하고 -> 매개변수로 들어온 onClick 함수가 실행됨. 이 onClick에 바인딩된 함수가 어떤 동작을 하는지는, date picker 라이브러리에서 정의한 바에 따른다. -> 그럼 라이브러리 안에서 절차적으로 어떻게 진행되는 건가?

// 우선, 이 CustomInput 이 DatePicker 의 props 로 넘어간다.
  const CustomInput = forwardRef(({ value, onClick }: ICustomInput, ref: Ref<HTMLButtonElement>) => (
    <button
      className={classNames(...  )}
      onClick={onClick}
      ref={ref as Ref<HTMLButtonElement>}
    >
      <div></div>
      {value}
    </button>
  ));

    // DatePicker 컴포넌트의 props 로 넘어간다.
      <DatePicker
      disabled={disabled}
      selected={selectedDate}
        ...
      customInput={<CustomInput />}
        ...
        />

    // DatePicker 컴포먼트가 받을 수 있는 props 를 보면, customInput props 는 react element 를 받을 수 있게 되어 있음
    export type DatePickerProps = ...
    customInput?: Parameters<typeof cloneElement>[0];

    // 그리고 react element 로 받아진 것은 React cloneElement 함수 안으로 들어간다.
        // 이때, DatePicker 에서 정의한 props 들이 들어가고
        // onclick 에 바인딩 된 함수가 들어간다.
    const inputElement = cloneElement(customInput, {
    ...inputProps, // Injects props such as onClick and value
    });

    // 그 결과, onClick 되면, toggleCalendar 함수가 실행된다. (#이건 gpt 의 추론에 의한 것 #이 순간을 구체적인 코드로 생각하기가 아직은 힘들다. #이걸 할 수 있어야 하는데 #⭐⭐⭐⭐⭐)
    toggleCalendar = () => {
    this.setOpen(!this.state.open);
    };

```

### 핵심은 cloneElement 를 사용해서 1) UI 와 2) 이벤트 로직의 분리를 한다는 점 인거 같은데

```
- 즉, 사용자는 UI 를 던졌어.
- 그러면, 내부에서 UI 를 받아서 -> cloneElement 를 하는데, 이때, 이벤트 핸들러 들을 모두 만들고, 다시 return 한다는 거지.

- 그러면, 사용자는, UI 를 만들고, customInput 에 꽂는 것 처럼, 꽂기만 하면 되는거 아니냐는 거지
```

### 그러면, 프로젝트에서, 내가 원하는대로 달력이 나오게 하려면

1. 지금 기존에 정의된 customInput 이 아니라, input 태그를 넣어줘야 할 거 같음
   ![Image](https://i.imgur.com/VGbEarK.png)

2. 그러면, children 으로 들어갈 수 있게 하면 되려나?

## 특정 날짜를 선택했을 때, button 에 어떻게 binding 되어서 보이는거지 (#⭐⭐⭐⭐⭐ 여기가 좀 어려움)

![Image](https://i.imgur.com/uHNgz5y.png)

1. '오늘' 을 클릭하면 -> handleTime 이벤트 핸들러 함수가 실행

```jsx
<Button
  label={"오늘"}
  size="md"
  variant="defaultOutlineLight"
  onClick={() => handleTime("오늘")}
  isSelected={date?.period === "오늘"}
/>
```

2. '오늘' 의 경우, 해당 property 를 setValue 로 설정

```jsx
  const handleTime = (period: string) => {
    switch (period) {
      case '오늘':
        setValue(name, {
          start_at: today,
          end_at: today,
          period: '오늘',
        });
        return;
    ...
    }}
```

3. setValue 를 하면, 어디로 가는거지?

```jsx
// 이제 react hook form 로직을 타게 된다.
// https://react-hook-form.com/docs/useform/setvalue 여기를 참고하면

// setValue: (name: string, value: unknown, config?: Object) => void 이렇게 구성되어 있으므로

setValue(name, {
  start_at: today,
  end_at: today,
  period: "오늘",
});
/*
    이 구문은 
      - name 변수에 들어온 field 에 들어가 있는 '객체' 를 수정할 건데
      - 해당 객체에는 
          - start_at, end_at, period 가 있는거고 
          - 각각의 value 를 수정하는 것! 
  */
```

### 갑자기 되네?

- 여기 날짜가 보여야 하는게 갑자기 보이네? 왜 그런거지?
  ![Image](https://i.imgur.com/Ii4fOAU.png)

- 왜 되는거지? -> RHF 과 연결해서 가능해짐

```jsx
// RHF provider 로 감싸서 가능해짐

// 1. main page 에서 사용하는 RHF 필드를 정의함. 이때, datePicker 에서 사용하는 필드를 정의
 const methods = useForm<FormInput>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",

      // 자동 입력 박스에서 사용하는 datePicker
      datePicker: {
        start_at: new Date(), // 기본값: 오늘 날짜
        end_at: new Date(),   // 기본값: 오늘 날짜
        period: "",           // 기본값: 빈 문자열
      },

    },
  });

// 2. FormProvider 로 감싸서, 해당 필드를 받을 수 있게 함
      <FormProvider {...methods}>
      ...
    </FormProvider>


// 3. mainPage > 자동 검색 > dateSelector 가 있으므로, 자식인 dateSelector 는 필드의 name 만 알면 접근 가능
   <Input
          name={name} // 이걸 임의의 값으로 바꾸면, input 에 바인딩이 안 됨
          sizeW="FULL"
          sizeH="FULL"
          type="text"
          placeholder="2024-07-16"
          color="whiteF9"
          inputPadding="0px 0px 0px 5px"
          className="!rounded-[0px] w-[170px] h-[27px] pl-[0px] cursor-pointer"
          //   onFocus={() => setIsDatePickerShow(true)} // 이건 어차피 필요 없지 않나
        //   onFocus={() => handleTime("오늘")} // 여기에서, handleTime('오늘') 를 바인딩하는
          autoComplete={true} // 이게 있으면, 말풍선 처럼 뜨는 자동완성 안 뜸
        />


// 4. 왜냐면, Input 내부에 이미, 이렇게 셋팅이 되어 있기 때문에 -> 공통 Input 에 name 을 전달해주면 -> value 에 바인인 하는 건, RHF 이 알아서 함 
  <input
    id={name}
    max={max}
    min={min}
    disabled={disabled}
    ...
    {...(register && register(name, rules))}
  >
  </input>


// 5. 그래서, 현재 Sat Nov 02 2024 00:00:00 GMT+0900 (한국 표준시) 이게 INPUT 에 바인딩 됨
// -> 바인딩되는 값이 'Sat Nov 02 2024 00:00:00 GMT+0900 (한국 표준시)' 이게 아니라 '2024-11-27' 이런 형식이 되려면? 

```


## 바인딩되는 값이 'Sat Nov 02 2024 00:00:00 GMT+0900 (한국 표준시)' 이게 아니라 '2024-11-27' 이런 형식이 되려면? 

### 달력에서 날짜를 선택하면(onChange이벤트가 발생하면) -> 날짜 형식을 수정해서 -> 공통컴포넌트인 Input 이 받게 하기  

1. 날짜 형식을 수정하는 함수 
```jsx
  const handleDateChange = (date: Date) => {
    const formattedDate = formatDateUser(date); // 날짜를 "yyyy-MM-dd" 형식으로 변환
    setValue(name, formattedDate); // 해당 필드의 React Hook Form 상태 업데이트
  };
```

2. handleDateChange 를 어디에서 넣어주는가. (#⭐⭐⭐⭐⭐ 이건 관심사 분리의 문제)

```
- main page 에서 넣을 수도 있고, 
  |-- 그 하위에서 
    |-- 또는 그 하위에서 넣을 수도 있음. 
```

```jsx
// 현재는 SingleDatePicker 에서 넣어줌 
  return (
    <Calendar
      onChange={handleDateChange}  // [TODO] handleChange 를 SingleDatePickerContainer 컴포넌트 레벨에서 전달하는게 맞는건지 모르겠음. 이건 컴포넌트 구조와 관련됨. 즉 관심사 분리가 되었는가의 문제
      disabled={false}
      startDate={date?.start_at || new Date()} // 기본값: 오늘 날짜 [TODO] 여기에서, 안 쓰는 기능은 지우기
      endDate={date?.end_at || new Date()} // 기본값: 오늘 날짜
      maxDate={date?.end_at || new Date()} // 기본값: 오늘 날짜
      name={name} // [TODO] 어떤 name 으로 해야할지는 RHF 할 때 한번에
    >
...
  )
```


3. 그러면, Calendar 컴포넌트 내부에 있는, DatePicker 내부에서, 변경이 있을 때, 전달한 이벤트 핸들러 함수를 실행시킴 -> 3-1) onChange 가 일어나면 -> date 를 handleDateChange 함수로 전달하고 -> 날짜를 변경하고 -> setValue 로 해당 name 필드의 값을 변경함 
```jsx
    <DatePicker
      disabled={disabled}
      selected={selectedDate}
      // 빌드 에러 고칠 때 수정
      onChange={(date: Date | null) => {
        if (date) {
          setValue(`${name}.period`, '직접선택');
          setValue(name, date);
          onClick && onClick(date);
          onChange && onChange(date);  // onChange 가 일어나면 -> date 를 handleDateChange 함수로 전달하고 -> 날짜를 변경하고 -> setValue 로 해당 name 필드의 값을 변경함 
        }
      }}
```


4. `setValue 로 해당 name 필드의 값을 변경` 이 되려면, `제대로 subscribe` 가 되어야 함. (#⭐⭐ 이렇게만 되면, 초기값을 설정하지 않아도, 내가 입력한 값에 대해서 subscribe 하고 반응할 수 있음)

- 제대로 subscribe 되려면 (#⭐⭐⭐⭐⭐⭐⭐ #이걸 굉장히 자연스럽게 떠올릴 수 있어야 함 )
```jsx
// 초기 설정 
  // 1) 이 순간, 'mainPage_diary.selectedDate' 필드 설정
    <SingleDatePicker
      name="mainPage_diary.selectedDate"
    />

// 1. 값을 push 할 때 
    setValue(name, formattedDate); // 해당 필드의 React Hook Form 상태 업데이트

// 2. 값을 pull 할 때, ... 으로 넣어줘야 value 에 RHF 내부에서 들어갈 수 있음
  <input
    ...
    {...(register && register(name, rules))}
  >
  </input>

```



5. 초기값 설정해서 input 에 보여주기 

```jsx
type FormInput = {
  title: string;
  content: string;
  mainPage_diary_selectedDate: string;
};

const MainPage = () => {
  const [isDatePickerShow, setIsDatePickerShow] = useState(false); // 달력이 뜨는지 여부를 관리하는 state
  const [usageHistoryPopupId, setUsageHistoryPopupId] = useState(Number); // 보건이용기록 팝업에, 클릭된 학생 ID 알려주는 state
  const [isUsageHistoryPopup, setIsUsageHistoryPopup] = useState(false); // 보건이용기록 팝업 여부 state

  const methods = useForm<FormInput>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",

      // 학생 검색 박스 > datePicker > 선택된 날짜에 대한 필드
      mainPage_diary_selectedDate: new Date().toISOString().split("T")[0], // 기본값: "yyyy-MM-dd" 형식

    ...
      
    },
  });
```

![Image](https://i.imgur.com/rqWyAiy.png)



# date picker 사이즈 한번에 수정하기 
### 현재 사이즈

![Image](https://i.imgur.com/NtDlMP3.png)
