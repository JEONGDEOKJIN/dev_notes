

```css
.transparent-outline-none-important{
  width: 100%;
  background-color: transparent!important;
  outline: none !important;
  border : none !important;
  /* border-width: 0 0 0.1px !important; */ /* 이걸 넣으니, 밑에 부분이 너무 두껍게 나옴 그래서 주석 처리 */
  border-radius: 0 !important; /* 이걸 없애야, input 에서 옆으로 타고 올라가는 부분이 없음*/
  border-color: #cccccc !important;
  box-shadow: 0 1px 0 0 #cccccc !important; /* 하단에 얇은 경계선 */

}

```

```jsx
<div className="flex flex-row justify-between gap-[6px] text-black33 w-full">
        <label className="font-[400] text-[20px] w-full" htmlFor="userSchool"> 소속 주소 </label>
        <div className="w-[546px]  flex shrink-0 justify-between gap-[6px]">
          <Input
            name="userSchool"
            sizeW="M_339"
            sizeH="XXS"
            type="text"
            placeholder="소속 학교명 입력"
            color="whiteF9"
            className="transparent-outline-none-important"
          />
          <Button
            label="주소 검색"
            variant="secondPrimaryFill"
            size="lg_140"
            className="text-20-important"
          />
          {/* [✅TODO] 이 부분은 사업자 번호 쪽과 비슷 */}
        </div>
      </div>
```

- 자잘하게 남은 아래와 같은 부분을 없애려면, `border-radius: 0 !important;` 필요함 

![Image](https://i.imgur.com/9wAeAmn.png)
