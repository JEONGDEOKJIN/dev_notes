



## 하단부분에 버튼 넣고, main 영역이 남은 빈 공간을 채우게 하는 법 

### 1. height 에서 버튼 영역을 calc로 빼주기 : 일일이 calc 를 계산해주고 맞춰야 하는 번거로움이 있음 
```jsx
const StudentRegisterTab = () => {
  return (
    <>
      <div className="relative  w-full h-full  ">
        <div className="bg-brand1 flex flex-col items-center justify-center gap-[16px] h-[calc(100%-60px)]">
          <div className="flex justify-between w-full bg- px-1">
            <Input
              name="mainPage_PersonnelRegister_grade"
              sizeW="FULL"
              sizeH="FULL"
              type="text"
              placeholder="학년입력"
              color="whiteF9"
              inputPadding="0px 0px 0px 10px"
              className="!rounded-[15px] !w-[105px] !h-[30px] placeholder:text-center placeholder:pr-[10px]"
              autoComplete={true} // 이게 있으면, 말풍선 처럼 뜨는 자동완성 안 뜸
            />
            <Input
              name="mainPage_PersonnelRegister_class"
              sizeW="FULL"
              sizeH="FULL"
              type="text"
              placeholder="반입력"
              color="whiteF9"
              inputPadding="0px 0px 0px 10px"
              className="!rounded-[15px] !w-[117px] !h-[30px]  placeholder:text-center placeholder:pr-[10px]"
              autoComplete={true} // 이게 있으면, 말풍선 처럼 뜨는 자동완성 안 뜸
            />
            <Input
              name="mainPage_PersonnelRegister_number"
              sizeW="FULL"
              sizeH="FULL"
              type="text"
              placeholder="번호입력"
              color="whiteF9"
              inputPadding="0px 0px 0px 10px"
              className="!rounded-[15px] !w-[117px] !h-[30px] placeholder:text-center placeholder:pr-[10px]"
              autoComplete={true} // 이게 있으면, 말풍선 처럼 뜨는 자동완성 안 뜸
            />

            <Radio
              name="mainPage_PersonnelRegister_number"
              defaultValue="individual"
              items={[
                {
                  label: "남",
                  value: "male",
                },
                {
                  label: "여",
                  value: "female",
                },
              ]}
            />
          </div>

          <div className="flex justify-between w-full px-1 gap-[8px] ">
            <LabelInput
              label="이름"
              InputName="mainPage_PersonnelRegister_name"
              placeholder="이름입력"
              inputClassName="w-[196px] h-[30px]"
            />
            <LabelInput
              label="학년"
              InputName="mainPage_PersonnelRegister_grade"
              placeholder=" "
              inputClassName="w-[80px] h-[30px]"
            />
            <LabelInput
              label="반"
              InputName="mainPage_PersonnelRegister_grade"
              placeholder=" "
              inputClassName="w-[80px] h-[30px]"
            />
          </div>
        </div>

        <div className="absolute bottom-0 flex justify-center items-center w-full">
          <FooterButton
            title="추가등록"
            bgColor="#E16D93"
            textColor="#fff"
            buttonWidth="150px"
            buttonHeight="30px"
            borderRadius="3px"
          />
        </div>
      </div>
    </>
  );
};

export default StudentRegisterTab;

```

### 2. flex-grow (#⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ 이 방식이 더 자유로움)  
![Image](https://i.imgur.com/BUrHeF7.png)
```jsx
const StudentRegisterTab = () => {
  return (
    <>
      <div className="relative flex flex-col w-full h-full  ">
        <div className="bg-brand1 flex-grow flex flex-col items-center justify-center gap-[16px] ">
          <div className="flex justify-between w-full bg- px-1">
            <Input
              name="mainPage_PersonnelRegister_grade"
              sizeW="FULL"
              sizeH="FULL"
              type="text"
              placeholder="학년입력"
              color="whiteF9"
              inputPadding="0px 0px 0px 10px"
              className="!rounded-[15px] !w-[105px] !h-[30px] placeholder:text-center placeholder:pr-[10px]"
              autoComplete={true} // 이게 있으면, 말풍선 처럼 뜨는 자동완성 안 뜸
            />
            <Input
              name="mainPage_PersonnelRegister_class"
              sizeW="FULL"
              sizeH="FULL"
              type="text"
              placeholder="반입력"
              color="whiteF9"
              inputPadding="0px 0px 0px 10px"
              className="!rounded-[15px] !w-[117px] !h-[30px]  placeholder:text-center placeholder:pr-[10px]"
              autoComplete={true} // 이게 있으면, 말풍선 처럼 뜨는 자동완성 안 뜸
            />
            <Input
              name="mainPage_PersonnelRegister_number"
              sizeW="FULL"
              sizeH="FULL"
              type="text"
              placeholder="번호입력"
              color="whiteF9"
              inputPadding="0px 0px 0px 10px"
              className="!rounded-[15px] !w-[117px] !h-[30px] placeholder:text-center placeholder:pr-[10px]"
              autoComplete={true} // 이게 있으면, 말풍선 처럼 뜨는 자동완성 안 뜸
            />

            <Radio
              name="mainPage_PersonnelRegister_number"
              defaultValue="individual"
              items={[
                {
                  label: "남",
                  value: "male",
                },
                {
                  label: "여",
                  value: "female",
                },
              ]}
            />
          </div>

          <div className="flex justify-between w-full px-1 gap-[8px] ">
            <LabelInput
              label="이름"
              InputName="mainPage_PersonnelRegister_name"
              placeholder="이름입력"
              inputClassName="w-[196px] h-[30px]"
            />
            <LabelInput
              label="학년"
              InputName="mainPage_PersonnelRegister_grade"
              placeholder=" "
              inputClassName="w-[80px] h-[30px]"
            />
            <LabelInput
              label="반"
              InputName="mainPage_PersonnelRegister_grade"
              placeholder=" "
              inputClassName="w-[80px] h-[30px]"
            />
          </div>
        </div>

        <div className=" flex justify-center items-center w-full ">
          <FooterButton
            title="추가등록"
            bgColor="#E16D93"
            textColor="#fff"
            buttonWidth="150px"
            buttonHeight="30px"
            borderRadius="3px"
          />
        </div>
      </div>
    </>
```



# [배운 점] 컴포넌트 합성 방식 (#⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐)

### 1) 공통적인 것을 Layout 컴포넌트로 만들고, 2) 해당 layout 에서 props 로 data, fields 등을 받는다. 

- Layout 컴포넌트 사용
```jsx
import React from "react";
import FormSelect from "@/components/Select/Select";
import Input from "@/components/Input/Input";
import Radio from "@/components/Form/Radio/Radio";
import LabelInput from "./LabelInput";
import FooterButton from "../basic-info/_component/FooterButton";
import RegisterTabLayout from "./RegisterTabLayout";

const EMPLOYEE_SELECT_MOCK = [
  {
    value: "teacher",
    label: "교원",
  },
  {
    value: "employee",
    label: "직원",
  },
];

interface EmployeeRegisterTabProps {
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const EmployeeRegisterTab: React.FC<EmployeeRegisterTabProps> = ({
  onClose,
}) => {
  const fields = (
    <>
      {/* 교원, 소속, 성별 */}
      <div className="flex  justify-between w-full gap-[8px]  px-1">
        <FormSelect
          className="w-[216px] h-[30px]"
          name="personnelRegister_employeeSelect"
          items={EMPLOYEE_SELECT_MOCK}
          defaultLabel={EMPLOYEE_SELECT_MOCK[0].label}
        />

        <Input
          name="mainPage_PersonnelRegister_grade"
          sizeW="FULL"
          sizeH="FULL"
          type="text"
          placeholder="부서 및 소속"
          color="whiteF9"
          inputPadding="0px 0px 0px 10px"
          className="!rounded-[15px]  !h-[30px] placeholder:text-center placeholder:pr-[10px]"
          autoComplete={true} // 이게 있으면, 말풍선 처럼 뜨는 자동완성 안 뜸
        />
        <Radio
          containerCSS="flex-shrink-0"
          name="mainPage_PersonnelRegister_number"
          defaultValue="individual"
          items={[
            {
              label: "남",
              value: "male",
            },
            {
              label: "여",
              value: "female",
            },
          ]}
        />
      </div>

      {/* 이름, 학년, 반 */}
      <div className="flex justify-between w-full px-1 gap-[8px] ">
        <LabelInput
          label="이름"
          InputName="mainPage_PersonnelRegister_name"
          placeholder="이름입력"
          inputClassName="w-[196px] h-[30px]"
        />
        <LabelInput
          label="학년"
          InputName="mainPage_PersonnelRegister_grade"
          placeholder=" "
          inputClassName="w-[80px] h-[30px]"
        />
        <LabelInput
          label="반"
          InputName="mainPage_PersonnelRegister_grade"
          placeholder=" "
          inputClassName="w-[80px] h-[30px]"
        />
      </div>

      {/* 건강상태 및 주의사항 */}
      <div className="flex justify-between w-full px-1 gap-[8px] ">
        <LabelInput
          label="건강상태"
          InputName="mainPage_PersonnelRegister_name"
          placeholder="건강상태 입력"
          inputClassName="w-[196px] h-[30px]"
        />
        <LabelInput
          label="주의사항"
          InputName="mainPage_PersonnelRegister_studentNumber"
          placeholder="주의사항"
          inputClassName="w-[80px] h-[30px]"
        />
      </div>
    </>
  );

  return (
    <>
      <RegisterTabLayout fields={fields} onClose={onClose} />
    </>
  );
};

export default EmployeeRegisterTab;

```

- Layout 컴포넌트 정의 
```jsx
import React from "react";
import FooterButton from "../basic-info/_component/FooterButton";
import Input from "@/components/Input/Input";
import Radio from "@/components/Form/Radio/Radio";
import LabelInput from "./LabelInput";
import FormSelect from "@/components/Select/Select";
import { IPersonnelRegisterModal } from "./PersonnelRegisterModal";

interface RegisterTabLayoutProps {
  fields: React.ReactNode; // 각 탭별 필드
  buttons?: React.ReactNode; // 하단 버튼
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const RegisterTabLayout: React.FC<RegisterTabLayoutProps> = ({
  fields,
  buttons,
  onClose,
}) => {
  return (
    <div className="relative flex flex-col w-full h-full">
      {/* 콘텐츠 */}
      <div className="flex-grow flex flex-col items-center justify-start pt-[20px] pb-[40px] gap-[16px]">
        {fields}
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-center items-center w-full gap-[10px]">
        {buttons || (
          <>
            <FooterButton
              title="추가등록"
              bgColor="#E16D93"
              textColor="#fff"
              buttonWidth="150px"
              buttonHeight="30px"
              borderRadius="3px"
            />
            <FooterButton
              onClick={onClose}
              title="취소"
              bgColor="#888"
              textColor="#fff"
              buttonWidth="150px"
              buttonHeight="30px"
              borderRadius="3px"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterTabLayout;

```