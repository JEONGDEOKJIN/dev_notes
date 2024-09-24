
# sprite image 에 대해서 

- 로컬 경로
```
C:\Users\nextinnovation\Desktop\NextInnonavtion\projects\wstore\pc\shopby-skin-pc.css
```

1. 이미지 가져오기 
```css
/* 이미지 전체를 가져옴 */
.sprite-image {
  background-image: url("/assets/images/sprite.png");
  background-repeat: no-repeat;
}
```

![Image](https://i.imgur.com/pDf0xDN.png)


2. 해당 이미지에 대해서 구획을 나눔 
```css 
.ico--x-black-24 {
  background-size: 364px 335px;
  background-position: -166px -307px;
  width: 24px;
  height: 24px;
}
```

3. 그래서, class 로만 아이콘을 지정 
```html
  <button class="title-modal__close-btn" shopby-on:click="CLOSE_TITLE_MODAL">
      <span class="ico ico--x-black-24"></span>
  </button>
```







