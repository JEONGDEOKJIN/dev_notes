import { IonCheckbox } from "@ionic/react";
import { PropsWithChildren } from "react";
import { Controller, Path, PathValue, RegisterOptions, useFormContext } from "react-hook-form";
import get from "lodash/get";
import { FieldValues } from "react-hook-form/dist/types";

type CheckBoxProps<T extends FieldValues> = {
  name: Path<T>;
  // 이 Path 타입을 어떻게 잡으셨을까?
  // 1) react-hook-form 의 FieldValues 타입을 우선 가져옴
  // 2) 그 다음 '제네릭 타입' 을 사용하심
  // 😢😢😢 이 부분을 잘 모르겠음.

  registerOptions?: RegisterOptions<T>;
  classNames?: {
    valid: string;
    invalid: string;
  };
  /* [learned] '유효성 여부' 에 따라서, 다른 class 명을 주는 로직을 이렇게 짤 수 있구나 ⭐⭐⭐⭐⭐ 
      1) 이렇게 짜인 이유는 
        1-1) checkBox 안에서 '유효성 데이터(formContext)' 를, 성공 여부를 조회할 수 있는 상황 
        1-2) 그러면, '부모가 내려주지 않아도!' checkBox 안에서 컨트롤이 가능해! ⭐⭐⭐ 
        1-3) 그러면, checkBox 는, 부모 컴포넌트에서 props 로 주입하지 않아도, 데이터 접근 가능 
          -> 그러면, props 주입을 안 해도 되고 
          -> 자식 컴포넌트를 어디에 붙여넣건 자기 역할을 하게 됨 ⭐⭐⭐⭐⭐⭐ 
          -> 어디에 붙여넣건, 부모 컴포넌트에서 props 를 따로 주게 되는, 번거로운 작업이 없어짐 ⭐⭐⭐⭐⭐ 
      2) 궁금한 건 
        2-1) style 을 어디에서 주입 받는게, 더 효율적일까? ❓❓❓❓❓ 
          -> 만약, 공통 컴포넌트에서 주입이 되면, 모든 checkBox 에 공통 스타일이 들어가고 
          -> 만약, page 레벨에서 들어가면, 페이지별로 다른게 나오거나, 페이지별로 동일한 걸 넣어야 한다? 
  */

  onChange?: (checked: boolean) => void;
};

function CheckBox<T extends FieldValues>({
  children,
  classNames = { valid: "", invalid: "" },
  name,
  registerOptions = {},
  onChange,
}: PropsWithChildren<CheckBoxProps<T>>) {
  const { formState, setValue, control, trigger, clearErrors } = useFormContext<T>();
  /*  - useFormContext 에서 <T> 를 써야, 값을 가져올 수 있는건가? 
      - 1) T 에 뭔가를 기재해야만 값을 가져올 수 있는 거면, CheckBox 는 부모 컴포넌트에서 T 를 props 로 받나? 
      - 2) T 에 뭔가 기재하지 않아도 값을 가져올 수 있으면, CheckBoxes 컴포넌트에서의 useFormContext<AgreementFormType> 이거랑, 뭐가 다른거지. 
      -> 이건 모르겠다 ㅠㅠ 
  */


  const isInvalid = !!get(formState.errors, name);
  /* loaDash 의 get 
    - loaDash 는 utility 라이브러리 임. 다양한 함수가 존재. 
    - get
      - formState.errors 이 객체에서, name 을 key 이름으로 있는 것, 과 바인딩된 value 를 가져온다.
      - 뭐라도 값이 있으면 -> 해당 값을 반환
      - 암것도 없으면 -> undefined 반환

    - !! 
      - 이중부정 연산자
        - 첫 번째 느낌표
          - 요약 : 'falsy-like 여부' 를 판단하고' -> 해당 결과값을 '뒤집어' 서 return 되게 한다.  
            - true 가 될 것 같은 것(true-like 값, 0이 아닌 값,) 을 -> false 로 변환.
            - false 가 될 것 같은 것(false-like 값, 숫자 0, 빈 문자열 " " , undefined, null, Nan, ) 을 -> true 로 변환.
          
        - 두 번째 느낌표 
          - true vs false 간 불명확한 상태를 만들지 않기 위함 🔵  
          - 명시적으로 boolean 을 만드는 역할 
            - 이건 납득이 잘 안 됨. 왜냐면, "중간에 판단이 애매한 경우' 가 문제가 될 텐데, 이 판단을 첫 번째 느낌표가 다 하지 않나❓❓❓ 
      
      - 알아두면 좋은 것
        - loaDash 를 활용해서, 값이 있는지 없는지 등을 판단할 수 있다. 
        - 값이 있는지 여부를 판단하려 할 때, loaDash 를 잘 활용하자.
  */

  if (formState.isLoading || registerOptions?.disabled) {
    return (
      <IonCheckbox name={name} justify="start" labelPlacement="end" className={classNames?.valid} disabled>
        {children}
      </IonCheckbox>
    );
  }

  return (
    /* CF. 사전지식 
      - 제어 컴포넌트 : React 가, 입력 요소의 상태를 관리, 한다. ex) value, onChange 를 통해 관리된다. 
      - 비제어(Uncontrolled) 컴포넌트: 입력 요소의 상태를 React가 아닌, DOM 자체, 가 관리한다. ex) ref 를 통해 관리될 수 있다.
      - 네이티브(native) 입력
        - HTML 표준 입력 요소 (input, select, textarea)
        - React Hook Form 은 네이티브 입력 요소를 '비제어방식' 으로 사용할 수 있게 권장한다. 
          - React Hook Form 은 '비제어방식'을 통해, 성능을 최적화 한다.
      - React-select, AntD, 등은 '제어 컴포넌트' 임. 
        - 따라서, '비제어 방식' 으로 동작하는 React Hook Form 에 맞춰야 한다. 
        - 이걸 맞출 때, Controller 를 사용한다.
        - 구체적으로, 무엇을 맞추는지는 Controller 의 내부 구현임 
        
    */

    /* Controller 가 뭔데? 
      1. Controller 가 필요한 이유
        - react hook form 은 HTML 표준 입력 요소(input, select, textarea) 에 최적화 되어 있음 
        - 따라서, UI 라이브러리를 사용할 때는, Controller 를 사용해서, 연결해줘야 함
    */

    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <IonCheckbox
            justify="start"
            labelPlacement="end"
            ref={field.ref}
            name={field.name}
            checked={field.value}
            onIonChange={(e) => {
              if (onChange) {
                onChange(e.detail.checked);
              }
              setValue(name, e.detail.checked as PathValue<T, Path<T>>);
              trigger(); // ⭐⭐ 아, 여기에서 trigger!!!
            }}
            disabled={registerOptions.disabled}
            className={isInvalid ? classNames?.invalid : classNames?.valid}
          >
            {children}
          </IonCheckbox>
        );
      }}
    />
  );
}

export default CheckBox;
