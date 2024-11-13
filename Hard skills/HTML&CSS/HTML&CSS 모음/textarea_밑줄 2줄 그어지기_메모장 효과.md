

### [2차] CSS 에서 height 랑, background-position 를 조정해서, 밑줄 간격을 조정하면 됨 

```jsx
<div className="input-container w-full relative">
  <textarea
    className="custom-textarea" // global css 에 2줄 처리 css 작성
    rows={2}
    placeholder="주소를 입력하세요"
  ></textarea>

  <button className="absolute right-0 top-[4px] bg-brand2 text-white border-none w-[90px] h-[30px] rounded cursor-pointer">
    주소 검색
  </button>

</div>
```

```css
.custom-textarea {
  width: 100%;
  height: 64px; /* 줄 길이에 맞게 높이 조정 [여기에서 알맞게 조정하면 됨] */
  border: none;
  outline: none;
  resize: none;
  padding: 8px 0;
  font-size: 16px;
  line-height: 29px;
  background-image: 
    linear-gradient(to right, #ccc, #ccc), 
    linear-gradient(to right, #ccc, #ccc);
  background-size: 78% 1px, 100% 1px;
  background-position: 0 33px, 0 63px; /* 각 줄 간격 조정 [여기에서 알맞게 조정하면 됨] */
  background-repeat: no-repeat;
  overflow: hidden ;
}

.custom-textarea:focus {
  background-image: 
    linear-gradient(to right, #757575, #757575), 
    linear-gradient(to right, #757575, #757575);
}
```
![Image](https://i.imgur.com/38YOloG.png)


### 1차 
```css
.textArea-underLine {
  width: 398px !important;
  height: 75px;
  font-size: 16px;
  border: none;
  outline: none;
  resize: none;  
  background-attachment: local;
  background-image:
    linear-gradient(to right, white 10px, transparent 10px),
    linear-gradient(to left, white 10px, transparent 10px),
    /*
      처음 = 파란색
      처음 ~ 30px 까지 = 파란 + 녹색 
      30px ~ 31px 까지 = 회색
      31px ~ 끝까지 하얀색
      ccc 30px, #ccc 31px 여기가 1px 로 그려지는 구간이고 
      repeating-linear-gradient(rgb(25, 18, 221), rgb(14, 251, 192) 30px, #ccc 30px, #ccc 31px, white 31px); 
    */
    repeating-linear-gradient(transparent, transparent 30px, #ccc 30px, #ccc 31px, transparent 31px); /* 밑줄 두께 조정 */
  line-height: 2.0em;
  background-size: 100% 2.3em; 
  padding: 3px 10px;
}
```

![Image](https://i.imgur.com/8caUjsj.png)