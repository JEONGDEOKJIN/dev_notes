


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