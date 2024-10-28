
# `template` 태그, `커스텀 속성` 자체, `shopby-partials` 속성의 역할에 대해 이해하기 
(출처 : mobile\pages\product\product-list.html)
```html

    <!-- 메타정보 -->
    <template
      shopby-partials="@partials/common-meta.html"
      shopby-partials-js="@partials/common-meta.js"  
    ></template>
      <!-- [해석]
        - shopby-partials 이 속성은, '시스템(pc)에게', @partials/common-meta.html' 위치로 이동하여, 해당 HTML 파일을, 이 위치에 로드하라고 지시 
          -> 그럼, 이게 없으면, 'common-meta.html' 을 안 가져오는거야? 
            -> 응. 그래서, 1) 'common-meta.html 을 가져오고 2) 'DOM 에 LOAD' 시킴 
          -> 가져오는 위치는 template 태그, 그 자체, 인 거고?  
            -> yes. common-meta.html 는 template 에 들어감
          - @partials/common-meta.html 이 파일에 들어가니, <template shopby-meta></template> 이놈만 있음 
            -> 이건, 'common-meta.js' 에서 shopby-meta 속성으로 querySelector 하고, 그 다음 로직이 들어가게 될 것 임. 

        - 그 다음, shopby-partials-js="@partials/common-meta.js" 속성으로 이동해 
          -> '시스템' 한테, '@partials/common-meta.js' 이쪽으로 가서, 'common-meta.js' 이 파일 실행하라고 지시 
          -> 그러면, '@partials/common-meta.js' 를 실행함

        - shopby-partials 은 template 태그 이기 때문에 가능? 아니면, 다른 태그 ex) input, div 등도 가능? 
          - yes. input 태그, div 태그에도, custom attribute 를 추가할 수 있음. 
          - 다만, input 태그에 type 속성을 넣는 것 처럼, '고유한 기능' 은 없음
          - 다만, '커스텀 속성' 을 추가한 경우, 대부분의 경우에는, 'javascript' 또는 '프레임워크' 에서 '특정 동작을 트리거' 하기 위해 사용되는 경우가 많음.

        - 그러면, js 로직을 위해서 쓰는거라면, input 태그에 shopby-partials 를 붙일 수 있었을 거 같은데 왜 template 태그에 쓴거야? 
        - 그리고, 지금 파일에서 'getAttribute('shopby-partials');' 이렇게 쓰이는 부분은 없거든. 그러면, 'shopby-partials' 이 속성에 대해서 로직을 부여하는 건, 누가, 어디에서 하는거야? 
          -> 1) template 태그는 '⭐not rendered immediately by the browser⭐' -> 그래서, 자바스크립트 파일이 실행될 때, 로직을 넣기 편해 ⭐⭐⭐⭐⭐ 
          -> 2) 만약, div 태그에 동일한 기능을 넣으면 -> div 가 브라우저에 의해 그려지고 -> 그 다음 js 파일이 로드되어, 로직이 실행되게 될 것 임.
          -> 현재, 'getAttribute('shopby-partials');' 이렇게 가져와서 쓰는 코드는 없고, shop-by 프레임워크 자체에 추상화 되어 있음.
      -->


    <!-- A2HS -->
    <link rel="manifest" shopby-manifest-placeholder href="/manifest.json" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <!-- [해석] 
      - shopby-manifest-placeholder 이러한 커스텀 속성이 붙어있음. 
      - shopby-manifest-placeholder 관련 로직을 이곳에서 실행하게 됨. 
      - "shopby-manifest-placeholder 이 붙어있을 때 무엇을 해라!" 라는 건, 어디에 정의되어 있는지 모름 
    -->

```