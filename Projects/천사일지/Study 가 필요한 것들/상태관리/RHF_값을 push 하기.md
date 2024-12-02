


```jsx
1. 메인 페이지에서 

const MainPage = () => {
  
  const [isDatePickerShow, setIsDatePickerShow] = useState(false); // 달력이 뜨는지 여부를 관리하는 state
  const [usageHistoryPopupId, setUsageHistoryPopupId] = useState(Number); // 보건이용기록 팝업에, 클릭된 학생 ID 알려주는 state
  const [isUsageHistoryPopup, setIsUsageHistoryPopup] = useState(false); // 보건이용기록 팝업 여부 state
  const [isPersonnelRegisterModalOn, setIsPersonnelRegisterModalOn] =
    useState(false); // 인원추가 모달 여부 state
  const methods = useForm<FormInput>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      content: "",

      // 학생 검색 박스 > datePicker > 선택된 날짜에 대한 필드 (#TODO: 목록 조회 할 때, 이게 API 에 들어가야 함)
      mainPage_diary_selectedDate: new Date().toISOString().split("T")[0], // 기본값: "yyyy-MM-dd" 형식
      mainPage_memobox_title: "",

      // 인원 등록 리스트 관련
      selectedRowsIdArr: [], // 인원 등록 리스트의 체크박스에서 선택된 ROW 의 ID 를 담는 '배열'
      personnelList_gradeClass: "", // 인원 등록 리스트의 '학년반' 필드
    },
  });
  return (
    <MainPageLayout>
      <FormProvider {...methods}>
        <div className="mainPage flex flex-col gap-[15px]">
          {/* 첫 번째 섹션 */}
          <section className="flex flex-row gap-[10px] mt-[30px]">
            <div>
              <StudentSearchBox
                isDatePickerShow={isDatePickerShow}
                setIsDatePickerShow={setIsDatePickerShow}
                setUsageHistoryPopupId={setUsageHistoryPopupId}
                setIsUsageHistoryPopup={setIsUsageHistoryPopup}
                user="천*방"
              />
            </div>

이렇게 react hook form 기본값을 정의하고 

2. 자식에서 뜨는 모달에서 


interface EditableRowProps {
  newRowData: IRegisterPersonnel;
  selectedRowsIdArr: number[];
  onRowChange: (field: keyof IRegisterPersonnel, value: any) => void;
  // onGradeClassModalToggle: () => void;
  onRowSelection: (studentId: number, checked: boolean) => void;
}

const EditableRow: React.FC<EditableRowProps> = ({
  newRowData,
  onRowChange,
  selectedRowsIdArr,
  // onGradeClassModalToggle,
  onRowSelection,
}) => {
  const { setValue, watch } = useFormContext();

  const [isGradeClassModalOn, setIsGradeClassModalOn] = useState(false);

  return (
    <tr className={`text-center h-[37px] ${personnelTableColumn.lastRow}`}>
      <td
        className={`${personnelTableColumn.firstColumn} ${personnelTableCommon.tableBodyRow} `}
      >
        <CheckBox
          name="mainPage_Personnel_itemCheck"
          checkboxId={newRowData.id}
          labelCSS="mx-auto"
          onChangeProps={(checked) => onRowSelection(newRowData.id, checked)}
          isCheckedProps={selectedRowsIdArr.includes(newRowData.id)}
        />
      </td>
      <td
        className={`${personnelTableColumn.noColumn} ${personnelTableCommon.tableBodyRow} `}
      >
        {newRowData.no}
      </td>
      <td
        onClick={()=>setIsGradeClassModalOn(true)}
        className={`cursor-pointer hover:bg-brand1/5  ${personnelTableColumn.gradeColumn} ${personnelTableCommon.tableBodyRow}`}
      >
        {/* - 학년반 셀을 클릭하면 -> 팝업이 떠서 선택할 수 있는게 나온다. 
              - 이건, 학교별로 데이터가 다를 것이고, 이것도 API 에서 받아와야 한다.
            - 팝업에서 선택하면 -> 결과값이 '어딘가로' 로 저장된다.
              - POST 를 하는게 맞다. 
              - 현재 POST 를 하면, 바로 GET 하는 구조가 없는데 
                - 이걸, 우선, DUMMY 로 라도 될 수 있게 만들어야 할 거 같은데 
                - 그럼, 결국, react query 연결 해야 되는거 아닌가 
              - 임시로 만든다면, 이걸 어디에 저장되게 해야 되는지를 아직 모르겠다. 
            - 저장된 값을 여기에 표시한다. 
            - '저장' 버튼을 누르면 저장한다. 
        */}
        {/* 모달 위치 
            1) 우선, 이 페이지 밑에 하고 
            2) 그 다음, 이 셀로 이동 
        */}

        {/* 클릭시, 수정가능한 Modal popup 들어오게 하기 */}
        {isGradeClassModalOn&& (
          <Modal_GradeClassRegister onSelect={(value) => setValue('personnelList_gradeClass', value)} onClose={()=>setIsGradeClassModalOn(false)} />
          
        )}

이렇게 setValue 를 전달하고 

3. 해당 모달에서 아래와 같이 꽂으면 
import ModalContents from "@/components/Modal/ModalContents";
import React from "react";
import { MODAL_GRADECLASS_DUMMY } from "@/libs/dummy";

interface Modal_GradeClassRegisterProps {
  onClose?: (e?: any) => void;
  onSelect: (value: string) => void; // 학년/반 선택 콜백
}

const Modal_GradeClassRegister: React.FC<Modal_GradeClassRegisterProps> = ({
  onClose,
  onSelect,
}) => {
  // [TODO] 더미 데이터에서 들어오는 데이터 형식을, '학교 - 학급 - 반' depth 로 된 객체로 나누는 과정
  // [TODO] API 에서 넘어온 데이터가 다르면, 이것도 변경되어야 할 수 있음.
  const groupedData = MODAL_GRADECLASS_DUMMY.reduce((acc, item) => {
    const { school, grade, class: className } = item;
    if (!acc[school]) acc[school] = {};
    if (!acc[school][grade]) acc[school][grade] = [];
    acc[school][grade].push(className);
    return acc;
  }, {} as Record<string, Record<string, string[]>>);

  // 렌더링 될 학교 순서 정렬
  const schoolOrder = ["유", "초", "중", "직원", "교원"]; // 렌더링 될 학교 순서
  const compareSchools = (a: string, b: string, order: string[]) => {
    return order.indexOf(a) - order.indexOf(b);
  };
  const sortedSchools = Object.keys(groupedData).sort((a, b) =>
    compareSchools(a, b, schoolOrder)
  );

  /** 
   * [1st] const groupedData: GroupedData = {
        const groupedData = {
          "유": {
            "1": ["1", "2"]
          },
          "초": {
            "1": ["1"],
            "2": ["1", "2", "3", "4", "5"]
          },
          "중": {
            "1": ["2", "3"]
          },
          "직원": {
            "": [""]
          },
          "교원": {
            "": [""]
          }
        };

   * [2nd] Object.keys(groupedData) : ["유", "초", "중", "직원", "교원"] 
   * [3rd] Object.keys(groupedData).sort() 
      -  [] 배열에서 a,b 값을 가져온다. 
      - 비교 함수(compareSchools) 안에 넣는다. 
      - 기준 배열(schoolOrder)의 index 값을 비교한다. -> 주어진 배열 기준대로 오름차순 된다. 
      - 이 결과 나오는 값이, groupedData 의 key 값과 동일한거 아니야? / 그냥, 순서만 바꾸는건가? 중간에 '렌더링 될 객체' 를 만들 때 순서가 변경될 수 있으니  
  * [4th] sortedSchools === ["유", "초", "중", "직원", "교원"]
        - 그러면, 중간과정이 굳이 필요한가? 
        - 중간에 '렌더링 될 객체' 를 만들 때 순서가 변경될 수 있으니 
      */

  return (
    <ModalContents title="학년반 선택" onClose={onClose}>
      <div className="flex w-fit min-w-[300px] h-fit  gap-4 p-4">
        {sortedSchools.map((school) => (
          <div key={school}>
            <div className="flex gap-4">
              {/* 세로 정렬 */}
              {Object.entries(groupedData[school]).map(([grade, classes]) => (
                <div key={grade} className="flex flex-col items-center gap-2">
                  {classes.map((item, index) => (
                    <div
                      key={`${school}-${grade}-${item}-${index}`}
                      className="cursor-pointer leading-[1.3] flex justify-center items-center text-[18px] font-[350] text-black33 hover:bg-[#E7E7E7] rounded-[13.5px] w-[65px] h-[28px]"
                      onSelect={() => onSelect(`${school} ${grade}-${item}`)} // [TODO] 인원 등록시 필요한 타입에 따라서 넘길 인자가 달라질 수 있음
                    >
                      {item ? `${school} ${grade}-${item}` : school}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ModalContents>
  );
};

```
export default Modal_GradeClassRegister;

제대로 personnelList_gradeClass 필드에 값이 push 되는게 맞는거지? 


# [케이스1] 모달에서 '학년/반' 을 눌렀을 때, 인원등록 테이블에 들어가게 하기  

```

1) add row 버튼을 누르면 -> rowEmptyObj 가 newRowData 에 추가 됨 (#⭐⭐ 이때의 추가된 row 의 id 를 잘 기억해야 해. 왜냐면, 뒤에 여기에 바인딩 할거거든)
2) EditableRow 컴포넌트의 props 로 들어감 
3) EditableRow 에서 사용자가         onClick={()=>setIsGradeClassModalOn(true)} 클릭을 해서  setIsGradeClassModalOn 이 실행되고 모달이 열림 

4) 해당 모달에서 원하는 학교/학년/반을 클릭함 - onSelect 에 바인딩된 
onSelect={(value) => setValue('personnelList_gradeClass', value) 로 들어감 

5) 그 다음 내가 원하는건, 'personnelList_gradeClass' 이 필드에 들어간 값이, 다시, 'PersonnelListBox > rowEmptyObj' 에서 생성된 a) 객체 id 를 정확하게 찾아서, b) grade, name 에 들어가서, c) EditableRow 컴포넌트에 보였으면 좋겠음 

    - 이 부분이 문제인데, 보여야 하는 건, EditableRow 의 특정 5 번째가 맞음 
    - 되어야 하는 건, 한번 더 row 를 클릭했을 대, 6번째가 잘 누적되어야 한다는 거 (#✅✅ 이게 아직 안 돼 #✅ 우선, 5번째에 잘 들어가는 것 부터 먼저)

```

- 해야 하는 것
```
PersonnelListBox에서 personnelList_gradeClass 필드 값 추적: react-hook-form의 watch 메서드를 사용하여 personnelList_gradeClass 필드 값을 실시간으로 추적합니다.

적절한 행 식별: newRowData의 id와 같은 고유 식별자를 사용하여 값이 정확한 행에 업데이트되도록 보장합니다.

newRowData 객체 업데이트: 모달에서 값을 선택한 후, 해당 값을 newRowData의 필드(grade 및 필요한 경우 name)에 업데이트합니다.

EditableRow로 업데이트 데이터 전달: EditableRow가 newRowData를 props로 전달받아 UI에 변경 사항이 반영되도록 합니다.
```


### onRowSelection

```jsx
onRowSelection={(studentId, checked) => {
    handleRowSelection(studentId, checked, watch, setValue);
}}
```