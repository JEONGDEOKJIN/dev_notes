# 하고자 하는 것

```bash
1) mainPage 컴포넌트 에서 react hook form 필드를 관리한다.

2) PersonnelListBox 컴포넌트에서 add row 버튼이 클릭되면 handleAddRow 이 실행되어, 실제로 행이 추가가 된다.

3) PersonnelListBox 컴포넌트에서 newRow로 추가된 row 에 기재되는 값은 react hook form 에 의해 관리 되어야만 한다.

4) 그래서, EditableRow 컴포넌트의 각 modal 에서 onClick 이벤트로 수정이 일어나면,             onSelect={(value) => setValue('grade_class', value)}  이렇게 react hook form 해당 필드에 값 update 가 일어나야 한다.

5) 값 update 가 일어나면, newRow로 추가된 곳에서 보여야 한다.


- 제한 조건
    - 위 사항이 이제, RHF 와 연동 되어야만 한다 ⭐⭐⭐⭐⭐
```

# 왜 되는건지 파악하기

### [RHF 기본 셋팅] mainPage 에서 addPersonnelArr 로 배열 초기 등록

```jsx
// 해당 배열로 추가된 인원의 값이 들어올 것 이고
// 들어온 것이 POST 로 날아갈 것 임
const methods =
  useForm <
  FormInput >
  {
    mode: "onBlur",
    defaultValues: {
      addPersonnelArr: [], // 인원등록 배열 초기화, 사전에 어떤 배열이 등록될지 알 수 없는 상황. (#⭐⭐⭐⭐⭐미리 정해두는게 아님 #이게 동적 관리 된다는 느낌 ⭐⭐⭐⭐⭐⭐⭐⭐)
    },
  };

// 해당 작업을 mainPage 에서 진행한 이유는 RHF 을 페이지 단위로 중앙 집중 관리하기 위해서 (#⭐⭐)
```

### [RHF 기본 셋팅] 자식 page 에서 사용하기 (#useFieldArray 로 필드 동적 관리 -> 동적 렌더링 하기)

```jsx
// 위에서 등록한 addPersonnelArr 필드를 동적으로 제어할 수 있는 fields, append 가져오기
const { fields, append } = useFieldArray({
  control,
  name: "addPersonnelArr", // 기본 등록한 form 과 연결하기
});

// [예시] addPersonnelArr 필드와 연결된 append 에 매개변수로써 객체를 전달하면, addPersonnelArr 필드에 추가된다.
const handleAddStudent = () => {
  append({ name: "" }); // "name" 필드가 비어 있는 새 학생 추가
};

// addPersonnelArr필드와 연결된 fields 배열에서, 방금 업데이트 된 값을 rendering 한다.
<div>
  {fields.map((field, index) => (
    <input
      key={field.id} // 고유 ID 필요
      {...methods.register(`students.${index}.name`)} // 각 학생의 이름 필드 연결
    />
  ))}
</div>;
```

### [useFieldArray] 등록할 때 addPersonnelArr.${index}.name 이어야 하는 이유 (#addPersonnelArr.${index}.name, addPersonnelArr.${index}.grade 이렇게 구분되어서 name 에 바인딩 되어야 함 #⭐⭐⭐⭐⭐)

```jsx
/*
addPersonnelArr는 배열이기 때문에 배열의 각 요소는 고유한 "주소"를 가져야 폼 상태에서 정확히 추적될 수 있습니다.
addPersonnelArr.${index}.name은 현재 인덱스를 기반으로 키를 동적으로 생성합니다.

예를 들어:
첫 번째 행은 addPersonnelArr.0.name이 됩니다.
두 번째 행은 addPersonnelArr.1.name이 됩니다.

따라서,
  - 첫 번째 행 === '옹리' 학생
    - addPersonnelArr.0 이라는 객체가 되는건가?
    - 옹리 학생의 grade 는 addPersonnelArr.0.grade 여야, 해당 필드로 들어간다는 의미 인가?

  - 두 번째 행 === '귤리' 학생
*/

// 예를 들어, 아래와 같이 등록하게 되면
<div>
  {fields.map((field, index) => (
    <input
      {...methods.register(`addPersonnelArr.${index}.name`)} // addPersonnelArr에 연결해서 -> 0번째 row 를 만들고 -> 그 중 name 필드를 만든 것 (#⭐⭐⭐⭐⭐⭐⭐⭐⭐)
    />
    <input
      {...methods.register(`addPersonnelArr.${index}.grade`)}  // addPersonnelArr에 연결해서 -> 0번째 row 를 만들고 -> 그 중 grade 필드를 만든 것 (#⭐⭐⭐⭐⭐⭐⭐⭐⭐)
    />
  ))}
</div>

// 그러면 내부적으로 addPersonnelArr 필드에는 아래와 같이 값을 넣을 수 있는 공간이 생기는 것 임
{
  "addPersonnelArr": [
    {
      "name": " ",
      "grade": " "
    },
    {
      "name": " ",
      "grade": " "
    }
  ]
}

```

![Image](https://i.imgur.com/bsPkUlS.png)

# 최종 정리

## 1. 메인 페이지에 addPersonnelArr 를 등록한다.

```jsx
const methods =
  useForm <
  FormInput >
  {
    mode: "onBlur",
    defaultValues: {
      addPersonnelArr: [], // 인원등록 배열 초기화, 사전에 어떤 배열이 등록될지 알 수 없는 상황. (#⭐⭐⭐⭐⭐미리 정해두는게 아님 #이게 동적 관리 된다는 느낌 ⭐⭐⭐⭐⭐⭐⭐⭐)
    },
  };
```

## 2. add row 를 클릭하면, newRow객체가, RHF 이 관리하는 addPersonnelArr 으로 들어간다. 해당 필드들은 newRow 객체가 갖고 있는 초기값으로 설정되어 있다. -> watch 로 값을 가져와서 -> map 돌린다.

```jsx
// add row 를 클릭하면
<button onClick={handleAddRow}>Add Row</button>;

// newRow객체가, RHF 이 관리하는 addPersonnelArr 으로 들어간다 (#⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 여기가 핵심 ) (#⭐⭐⭐⭐⭐ 이때 구체적인 KEY 가 등록된다. 이후 이 key 값에 맞게 setValue 하고 watch 를 해야 한다. )
const { fields, append } = useFieldArray({
  control,
  name: "addPersonnelArr",
});

const handleAddRow = () => {
  // [주의] 여기에서의 초기값 설정이랑, setValue 시 필드값을 지정하는 것과 동일해야 함
  const newRow: IRegisterPersonnel = {
    id: Date.now(),
    no: RegisterPersonnelData.length + 1, // 여기 key 값 대로 setValue 하고, watch 해야 동적 연동이 된다 (#⭐⭐⭐⭐⭐⭐)
    grade_class: "",
    name: "",
    yo: false,
    special: false,
    gender: "남",
    history: false,
    symptoms: [],
    treatment: [],
    registration: false,
    entryTime: "",
    exitTime: "",
    attachment: false,
    handler: "",
  };
  append(newRow); // [TODO] append 가 뭐지
};

// RHF 에 들어간 값을 WATCH 로 갖고 와서 MAP 돌린다.
const personnelRows = watch("addPersonnelArr");
{
  personnelRows.map((row: IRegisterPersonnel, index: number) => (
    <EditableRow
      key={row.id}
      newRowData={row}
      rowIndex={index}
      selectedRowsIdArr={selectedRowsIdArr}
      onCheckBoxSelect={handleRowSelection}
      onGradeClassChange={(field, value) => {
        setValue(`addPersonnelArr.${index}.${field}`, value);
      }}
    />
  ));
}
```

## 3. 사용자가 학년/반 셀을 클릭하면

```
3.1 Modal_GradeClassRegister 이 on 된다.
3.2 onClick 했을 때, school, grade, item 을 setValue 안에 넣는다.
3.3 이때, addPersonnelArr.${rowIndex}.grade_class 네이밍이 중요한데,

- addPersonnelArr.${rowIndex} 이건, addPersonnelArr. 안에서 몇 번째 요소 인지를 결정하고
- grade_class 이건, 해당 row 에서 '필드' 를 의미한다.

이렇게 되면 setValue 메서드를 활용해서 값을 push 할 수 있다.
```

```jsx
/* 3.1 modal 이 ON 되는 것
  3.3 이때, addPersonnelArr.${rowIndex}.grade_class 네이밍이 중요한데,
  
  - addPersonnelArr.${rowIndex} 이건, addPersonnelArr. 안에서 몇 번째 요소 인지를 결정하고
  - grade_class 이건, 해당 row 에서 '필드' 를 의미한다.
  
  이렇게 되면 setValue 메서드를 활용해서 값을 push 할 수 있다. 

  (#⭐⭐⭐⭐⭐⭐⭐ 여기에서 setValue 이름 정해주는게 핵심)
*/
<td
  onClick={() => setIsGradeClassModalOn(true)}
  className={`cursor-pointer hover:bg-brand1/5  ${personnelTableColumn.gradeColumn} ${personnelTableCommon.tableBodyRow}`}
>
  {gradeClassValue ? gradeClassValue : " "}
  {/* 클릭시, 수정가능한 Modal popup 들어오게 하기 */}
  {isGradeClassModalOn && (
    <Modal_GradeClassRegister
      onSelect={(value) =>
        setValue(`addPersonnelArr.${rowIndex}.grade_class`, value)
      } // 기존
      onClose={() => setIsGradeClassModalOn(false)}
    />
  )}
</td>;

/*
3.2 onClick 했을 때, school, grade, item 을 setValue 안에 넣는다. -> 그러면, PROPS 로 넣어준 setValue 에 들어가게 된다. 
*/

{
  Object.entries(groupedData[school]).map(([grade, classes]) => (
    <div key={grade} className="flex flex-col items-center gap-2">
      {classes.map((item, index) => (
        <div
          key={`${school}-${grade}-${item}-${index}`}
          className="cursor-pointer leading-[1.3] flex justify-center items-center text-[18px] font-[350] text-black33 hover:bg-[#E7E7E7] rounded-[13.5px] w-[65px] h-[28px]"
          onClick={() => onSelect(`${school} ${grade}-${item}`)} 
        >
          {item ? `${school} ${grade}-${item}` : school}
        </div>
      ))}
    </div>
  ));
}
```

## 4. pull 하기

```jsx
- 원하는 곳에서   const gradeClassValue = watch(`addPersonnelArr.${rowIndex}.grade_class`); 를 사용하면 해당 필드 값을 가져올 수 있다.

- 다시 한번 강조하지만, 빈 셀을 생성할 때, 이때, 필드값을 생성하게 되는데, 이때 key 값과 setValue 에 적는 필드값, 그리고, watch 에 적는 필드값이 동일해야, 값을 push 하고 pull 할 수 있다.

```
