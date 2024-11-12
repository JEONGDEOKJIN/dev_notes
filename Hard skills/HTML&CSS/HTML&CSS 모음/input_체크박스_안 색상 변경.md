

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