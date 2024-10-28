



## 갑자기 처음 보는 컴포넌트가 등장했다. `image-slider`. 이건 뭐지. 
![Image](https://i.imgur.com/TKpZrzK.png)

<br>

## 이건 `오로라 모듈` 로 찾아가보면, 그 사용방법이 나오긴 한다. 
(https://nhn-commerce-fe.github.io/shopby-ui-docs/module/product/ProductDetail.html?menu=open&category=product&module=product-detail) 
![Image](https://i.imgur.com/KR4Yj0T.png)

<BR>

## 문제는 이런 문법을 처음 본다는 것. 이게 어떻게 작동되는지 모르겠다는 것. 
```html

<!-- 이런 태그를 '커스텀 태그' 라고 부른다. -->
    <image-slider>
            <div>
              <div slot="images">
                <div
                  class="swiper product-image-slider"
                  shopby-slider-id="product-main-image-slider"
                >
        ...
```

<br>

## 나는 지정한 적 없는데 누가? = shopby 가 -> 그러면, 이게, 소스코드에서는 '어디에서' 내려오는거지? 

```bash
shopby 에서 만들고, 
shopby 의 어떠한 link 를 통해 내려온다는 건 알겠으나, 
구체적으로, 어떤 걸 받아서 되는 건지를 모르겠음. 

-> 아, 공식문서에서, link 가 나와있네
```


![Image](https://i.imgur.com/Tt7XKXT.png)





