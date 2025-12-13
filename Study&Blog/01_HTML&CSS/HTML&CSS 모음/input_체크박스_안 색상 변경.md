

### 1. css 로 변경하기 

```css
/* Custom-Checkbox */
.custom-brand1-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
.custom-brand1-checkbox:checked {
  border-color: #12a087;
  background-color: #12a087;
}
.custom-brand1-checkbox:checked::before {
  content: "";
  display: block;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-left: 4px;
  margin-top: 1px;
}
```

```jsx
<input
  className="w-[18px] h-[18px]   custom-brand1-checkbox"
  type="checkbox"
  id="autoLogin"
></input>
```


![Image](https://i.imgur.com/3dgmW52.png)




### 2. image 를 넣어서 변경하기 

```jsx
<button onClick={handleCheckboxChange} className="relative inline-block">
    {/* 체크박스 - 기본 체크 스타일 숨기기 */}
    <input
        type="checkbox"
        className="appearance-none w-[16px] h-[16px] border border-[#ccc] rounded-sm checked:bg-transparent"
        checked={isChecked}
    />
    {/* 체크 상태에 따른 이미지 표시 */}
    {isChecked && (
        <Image
            src="/icons/icon_pink_checked.svg"
            width={14}
            height={14}
            alt="체크"
            className="absolute top-[3px] left-[1px]"
        />
    )}
</button>
```


### 3. image 넣어서 변경하기 - v2

- svg 사이즈를 변경하면, 클릭했을 때 나오는 이미지 자체가 작아짐
![Image](https://i.imgur.com/4bf8Du8.png)

- 그 다음 공통 컴포넌트 Radio 의 config 값을 변경 
```jsx
import { useFormContext } from "react-hook-form";

import classNames from "classnames";

import { CommonItems } from "@/types/interface/common";
import { useEffect } from "react";

export interface IFormRadio {
  name: string;
  items: CommonItems[];
  rules?: any;
  disabled?: boolean;
  defaultValue?: string; // 기본값 추가
}

const Radio = ({ name, rules, items, disabled, defaultValue }: IFormRadio) => {
  const {
    register,
    formState: { errors },
    setValue, // 기본값 설정용
    getValues, // 현재 값 가져오기
  } = useFormContext();

  // defaultValue가 있을 때 한 번만 실행
  useEffect(() => {
    if (defaultValue && getValues(name) !== defaultValue) {
      setValue(name, defaultValue, { shouldValidate: true });
    }
  }, [defaultValue, name, setValue, getValues]);

  const errorMessages = errors[name] ? errors[name]?.message : "";
  const hasError = !!(errors && errorMessages);

  return (
    <>
      <div className="flex flex-row flex-wrap gap-[10px]">
        {items?.map(({ label, value }: CommonItems) => (
          <div
            key={value}
            className={classNames(
              ContainerCommonConfig,
              !disabled && "cursor-pointer",
            )}
          >
            <input
              id={label}
              type="radio"
              value={value}
              disabled={disabled}
              {...register(name, rules)}
              defaultChecked={value === defaultValue} // 기본값 설정
              className={classNames(
                HiddenInputConfig,
                !disabled && "cursor-pointer",
              )}
            />

            <label
              htmlFor={label}
              className={classNames(
                SizeCommonConfig,
                TriggerCommonConfig,
                !disabled &&
                  "cursor-pointer  hover:bg-[url('/icons/icon_radio-checked.svg')]",
              )}
            ></label>
            <label
              htmlFor={label}
              className={classNames(
                !disabled && "cursor-pointer text-[17px] font-[350]",
              )}
            >
              {label}
            </label>
          </div>
        ))}
      </div>
      {hasError && (
        <span className="text-warning">- {errorMessages as string}</span>
      )}
    </>
  );
};

export default Radio;

const ContainerCommonConfig = "flex items-center gap-[5px]";

const HiddenInputConfig =
  "hidden [&:checked+label]:bg-[url('/icons/icon_radio-checked.svg')]";

const SizeCommonConfig = "w-[17px] h-[17px]";

const TriggerCommonConfig = " bg-[url('/icons/icon_radio-unchecked.svg')]";
```