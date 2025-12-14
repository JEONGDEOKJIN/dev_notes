
# intro 
```
- 출처 : Daily\24년9월_개미스쿨&코오롱\240926\240925(240924 누적).md
- 프로젝트 : 코오롱, 샵바이 
- 스택 : handlebarJS, JS, 샵바이 오로라 스킨 
```


## `버튼` 으로 작동하는 것을, `체크박스 + 등록` 으로 변경하여 동작하게 하기
```
- 기존에 '선택 버튼' 에 있던 action을 -> 취소, 등록에 붙임 
```

![Image](https://i.imgur.com/dKQpLPN.png)

### 계획
```
1. 기존 `등록` & `취소` 버튼 가져오기 
2. 기존 등록에 달려있는 action 이 뭔지 확인 
3. review 페이지에 있는 버튼에 어떤 action 이 달려있는지 확인
4. review 페이지에 있는 action 을 `등록` 에 달기 
```

<br>

### 진행 

1. 현재, 작동하는 기능 확인 
```
현재, 선택하면 -> 해당 아이템이 잘 등록됨
```
![Image](https://i.imgur.com/olxGPqt.png)
![Image](https://i.imgur.com/y9sGnEz.png)


2. 뭐가 등록이 가능하게 하는지 확인 


1) 'shopby-action='SELECT_PRODUCT'' 속성이 달린 버튼을 클릭하면, 리뷰 상품이 등록된다. 왜? 

```html
  {{!-- 🔵 기능작동 --}}
  <button type='button' class='btn btn--line-gray btn--xs' shopby-action='SELECT_PRODUCT'>
      선택
  </button>
```

2. `shopby-action='SELECT_PRODUCT` 속성은, '특정 JS 이벤트 핸들러' 를 호출 -> `select-order-product.js` 에 정의되어 있음.

```js
(() => {
  const { pageHelper } = ShopbySkin;

  const selectOrderProductLayerModalHelper = pageHelper.selectOrderProductLayerModalHelper();
  selectOrderProductLayerModalHelper.initialize({
    platform: 'PC',
    layerModalHelperKey: 'select-order-product',
  });

  const moduleActionHelper = {
    SELECT_PRODUCT: (helper, orderNo) => {
      helper.submit({
        orderNo,
      });
    },
  };

  document.querySelector('select-order-product-list')?.addEventListener('click', ({ target }) => {
    const action = target.closest('[shopby-action]')?.getAttribute('shopby-action');
    console.log("action" , action)
    const orderNo = target.closest('[shopby-order-no]')?.getAttribute('shopby-order-no');

    moduleActionHelper[action]?.(selectOrderProductLayerModalHelper, orderNo);
  });
})()

  /* [click 이벤트 트리거 설정]
    <button type='button' /> 으로 설정된 버튼에서 '클릭' 이 발생하면 -> 'click' 이벤트 로 들어감 
    왜냐면, button 컴포넌트는 기본적으로 type 이 submit 인데, type 이 button 이면, click 이벤트로 들어가게 할 수 있음

    [target element 에서 필요한 정보 가져오기]
    1. 어떤 shopby action 을 하고자 하는지 
      -> target.closest 사용 : target element 에서, 부모로 올라가면서, 'shopby-action' 속성을 가진 element 중, 가장 가까운 element 반환
      -> getAttribute 메서드로 'shopby-action' 속성에 담긴 값 확인 -> SELECT_PRODUCT 이 action 에 담김 
    
    2. orderNo 객체에 order number 가 담김 

    3. helper 객체의 SELECT_PRODUCT 메서드에, 1) 초기화된 객체 2) orderNo 를 넘김
      -> [코드] moduleActionHelper[action]?.(selectOrderProductLayerModalHelper, orderNo); 
    
    4. 이 코드에 의해, 해당 helper 메서드(selectOrderProductLayerModalHelper) 에 orderNo 가 submit 됨 
      SELECT_PRODUCT: (helper, orderNo) => {
        helper.submit({
          orderNo,
        });
      },

      -> 다만, 네트워크 탭을 확인해보면, 실제로 POST 요청이 가지는 않음!! 
      -> 그러면, 어디로? ❓❓❓  

    4. moduleActionHelper.SELECT_PRODUCT 내부 로직 (추측)
      4-1) shopby-product-no 속성이 있는 곳으로 간다.(querySelect 를 해서) 
        4-1-1) 혹은 slot = 'productNo' 을 찾아서 간다.

      4-2) productNo 값을 채움 
    
    5. {{#if productNo}} handlebar.js 로 분기 처리 
      5-1)  ❓❓❓ 근데, 이 img, imageUrl, 100 같은 건 어디에서 오는거지
  */
```

<br />

### `{{#if productNo}}` 여기에서 `productNo` 이건 어디에서 오는거지?

```
5. {{#if productNo}} handlebar.js 로 분기 처리 
      5-1)  ❓❓❓ 근데, 이 img, imageUrl, 100 같은 건 어디에서 오는거지
```

1. `{{#if productNo}}`은 `product-review-form` 모듈(컴포넌트)에 속해 있고, 해당 모듈(컴포넌트)은 `modals > product-review-form.html` 에 위치해 있음 
```html
  <product-review-form>
      <script type="text/x-handlebars-template">
          <div class='board-form__container'>
              <div class='thumb-item board-form__product-item-witch-button' shopby-product-no='{{productNo}}' slot='productNo'>
                  {{#if productNo}}
                      <div class='board-form__product-item'>
                          <div class='product-item__image'>
                              {{img imageUrl 100 100 productName}}
                          </div>
```


2. [어떤 page에 위치?] `product-review-form.html 모달`은 `pages > my > product-review-list.html` 에 위치함. 
```html
        <layer-modal-area type="title" name="product-review-form" src="@modals/product-review-form.html"></layer-modal-area>
```

3. 해당 page 에서 `사용하는 모듈` 및 `해당 모듈에 연동된 api` 을 봐보자 
```bash
1. 이 설정을 보면, `product-review-list` 에 연동된 `api` 를 사용할 때 어떻게 해야 하는지 나옴. 

2. 그러면, 성공하면 데이터가 어디로 오는가? 라고 했을 때 -> 'https://nhn-commerce-fe.github.io/shopby-ui-docs/module/my/ProductReviewList.html?menu=open&category=my&module=product-review-list' 이곳을 참고하면 -> '⭐사용 가능 변수⭐' 에 'API 조회 성공시 사용가능한 변수' 가 나와 있음 -> 여기에서 'items' 가 나옴 -> items 안에 뭐가 있는지는, API 명세서(https://docs.shopby.co.kr/?url.primaryName=display/#/Review/get-profile-product-reviews)를 봐야함 

3. 결국, 성공하면, slot 을 통해 데이터가 들어옴 

4. 그러면, 부모-자식 관계로써, children 으로 들어가 있는 것들은 모두 꺼내쓸 수 있음 (#맞나❓❓❓)

5. 다만, 자식이 아닌데, 어떻게 items key 에 담긴값을 쓸 수 있는거지? (#❓❓❓❓❓)
  -> 

```

```html
<!-- 
  - 해당 모듈을 쓰면서, query 를 설정한 모습 
  - 이렇게 설정하면, 이것 처럼 api 가 간다. 
  - 성공적으로 return 되면, slot 에 데이터가 박히는 것 같음 (#따로 처리해주는건 없는 것 같음❓❓❓) 
-->
<product-review-list
  pair-key="REVIEWED_PRODUCT_MORE_VIEW_BUTTON"
  search-type:query="searchType"
  keyword:query="keyword"
  uses-more-button
> 
  <script type="text/x-handlebars-template">
      <div slot='items'>
          <!-- 
            items 키값안에 있는 데이터를 꺼내서 쓸 수 있음
           
           -->
      </div>
  </script>
</product-review-list>

  <layer-modal-area type="title" name="product-review-form" src="@modals/product-review-form.html"></layer-modal-area>

```


### `<product-detail>` 컴포넌트에서 허용된 데이터 이외에 추가 필드를 가져오고 싶은 경우 

1. 참고자료 

- [참고 자료 1] 
```bash
`FW: RE: [넥스트이노베이션] 코오롱 티슈진 스킨 작업중 개발 이슈사항 관련건` 메일 확인 
```

- [참고 자료 2] `<product-detail> 에 없는 stock 필드값을 가져오는 기능을 추가해서 <custom-product-detail> 컴포넌트 만들기

1) custom product detail 클래스 만들기
```js
// module 확장
class CustomProductDetail extends ShopbySkin.modules.ProductDetail {
  // ShopbySkin.modules.ProductDetail 는 '기존' 컴포넌트

  setup() {
    super.setup();
    this.store.attach("shippingInfo", (state) =>
      this.updateSlot(state, "shippingInfo"),
    );
    this.store.attach("stock", (state) => this.updateSlot(state, "stock")); // 'stock' 을 붙이기

    this.eventManager.on("QUERY_PRODUCT_DETAIL", ({ shippingInfo, stock }) => {
      this.store.setState((prev) => ({
        ...prev,
        shippingInfo,
        stock, // 'stock' 을 붙이기
      }));
    });
  }
}
customElements.define("custom-product-detail", CustomProductDetail);
```

2) 사용하기 
```html
<custom-product-detail>
  <script type="text/x-handlebars-template">
    <div slot="stock">
        {{stock.stockCnt}}
    </div>
  </script>
</custom-product-detail>
```


2. 흐름 

[2-1] <product-detail> 컴포넌트 살피기
```bash
1) https://nhn-commerce-fe.github.io/shopby-ui-docs/module/product/ProductDetail.html?menu=open&category=product&module=product-detail 여기를 가면, 'product-detail' 모듈이 있음 

2) 해당 모듈의 '사용 가능한 변수' 에 'stock' 은 없음
```

[2-2] `<product-detail> 와 연결된 api` 들어가보기 
```bash
`<product-detail> 와 연결된 api` 찾는 법 
1) 네트워크탭 확인
2) (https://nhn-commerce-fe.github.io/shopby-ui-docs/module/product/ProductDetail.html?menu=open&category=product&module=product-detail) 여기 페이지 확인해서 관련 API 중 잘 고르기 
```

[2-3] `<product-detail> 와 연결된 api` 에서 `stock` 찾기 
```BASH
- api 정보를 조회하면, 해당하는 key 값이 나옴
```

[2-4] custom 클래스 생성 
```js
// module 확장
class CustomProductDetail extends ShopbySkin.modules.ProductDetail {
  setup() {
    super.setup();
    this.store.attach("shippingInfo", (state) =>
      this.updateSlot(state, "shippingInfo"),
    );
    this.store.attach("stock", (state) => this.updateSlot(state, "stock"));

    this.eventManager.on("QUERY_PRODUCT_DETAIL", ({ shippingInfo, stock }) => {
      this.store.setState((prev) => ({
        ...prev,
        shippingInfo,
        stock,
      }));
    });
  }
}
customElements.define("custom-product-detail", CustomProductDetail);
```

[2-5] custom 클래스 사용 
```js
<custom-product-detail>
  <script type="text/x-handlebars-template">
    <div slot="stock">
      {{stock.stockCnt}}
    </div>
  </script>
</custom-product-detail>
```


[2-6] 해당 방식의 한계 
```bash
- 모듈과 연결된 api 가 아니면, slot 추가가 되지 않음 
  ex) <product-detail> 모듈은, '상품상세 조회 API' 와 연결되어 있음 => 따라서 '목록 조회 API' 의 값을 CLASS 를 통해 확장하는 것은 안 됨 

```



### 흐름을 이해했으니, 이제, 그러면, `확인`, `취소` 버튼 붙여보기

1. 기존 `확인 취소 버튼 로직` 확인
[1-1] UI 구성 
```bash
[포인트]
  1. click 이벤트 설정할 수 있게, type = 'button' 설정
  2. 고유한 shopby-action 설정
```
```html 
  <board-form-button-group>
      <script type="text/x-handlebars-template">
          <div>
              <div class='l-btn-group l-btn-group__gap fixed-btn-group' slot='formBtnGroups'>
                  <button type='button'  class="btn btn--lg board-form__btn" shopby-action='CANCEL'>
                      취소
                  </button>
                  {{#if isModify}}
                      <button type='button' class='btn btn--lg board-form__btn' shopby-action='MODIFY'>
                          수정
                      </button>
                  {{else}}
                      <button type='button' class='btn btn--lg board-form__btn' shopby-action='SUBMIT'>
                          등록
                      </button>
                  {{/if}}
              </div>
          </div>
      </script>
  </board-form-button-group>
```

[1-2] product-review-form 컴포넌트 안에서, `클릭` 이벤트가 발생하면 -> shopby-action 속성값 가져와서 action 에 넣기 -> 예를 들어, moduleActionHandler['SUBMIT'] 실행
```js
  document.querySelector('product-review-form')?.addEventListener('click', ({ target }) => {
    const action = target.getAttribute('shopby-action');
    console.log("action", action) // SUBMIT

    moduleActionHandler[action]?.(productReviewLayerModalHelper); // moduleActionHandler의 SUBMIT 메서드 실행하고 매개변수로 productReviewLayerModalHelper 초기화 시킨 것 넘기기
  });
```

2. 그러면 어떻게 바꾸냐면 
- 예상 로직 
```bash
1. '등록' 을 클릭 -> 'select-order-product.js' 안에서 select-order-product-list 클래스에 대해 querySelector 작동 

2. 클릭한 곳에서 가장 가까운 action 이름 & orderNo 수집

3. 'moduleActionHelper[SELECT_PRODUCT]' 메서드 실행
  moduleActionHelper[SELECT_PRODUCT]?.(selectOrderProductLayerModalHelper, 202409241324340064) 예를 들어 이렇게 되어야 함

4. 문제는 라디오버튼클릭! 했을 때, 특정 product 를 어떻게 가져오냐!

```

3. 우선 이게 동작한다는 건 
```
"click이벤트가 실행되고 -> 헬퍼함수[SELECT_PRODUCT] 가 실행되는 것!" 까지 체크 
```
[3-1] ui
```HTML
  <board-form-button-group>
      <script type="text/x-handlebars-template">
          <div>
              <div class='l-btn-group l-btn-group__gap fixed-btn-group' slot='formBtnGroups'>
                  <button type='button'  class="btn btn--lg board-form__btn" shopby-action='CANCEL'>
                      취소
                  </button>
                  {{#if isModify}}
                      <button type='button' class='btn btn--lg board-form__btn' shopby-action='MODIFY'>
                          수정
                      </button>
                  {{else}}
                      <button type='button' class='btn btn--lg board-form__btn' shopby-action='SELECT_PRODUCT'>
                          등록
                      </button>
                  {{/if}}
              </div>
          </div>
      </script>
  </board-form-button-group>

```

[3-2] 이벤트 처리 

```js
  // 예시 코드에서는 그냥 'product-review-form' 로 잡았는데, 그건, '커스텀 태그' 를 바로 잡아서 그런 거 였음! 
  // 이번에는 데이터도 가져와야 해서 'select-order-product 클래스명' 으로 잡았음! 
 document.querySelector('.select-order-product')?.addEventListener('click', ({ target }) => {
    console.log("querySelector")
 })
```

### [결과] 우선, '등록' 클릭시, action 메서드는 전달함. 이제, '라디오 버튼 체크' 해서 product no 를 가져와서, moduleActionHelper[SELECT_PRODUCT] 의 인자로 넘기기 -> 그러려면, 우선, '라디오 체크 버튼' 이 어떻게 값을 가져오는지 파악하기

![Image](https://i.imgur.com/JQ9a3TC.png)


### '라디오 체크 버튼' 이 어떻게 값을 가져오는지 파악하기

1. [궁금증] 체크 박스에는 action 이 없음. 그러면, 체크 박스는 등록 버튼이 실행될 때, 자신의 정보를 어떻게 알려주지?

```html 
  <!-- input 클릭시 -> 'CHECK_SECRET_MY_INQUIRY 이벤트 핸들러' 실행 -->
    <input
      type="checkbox"
      shopby-on:change="CHECK_SECRET_MY_INQUIRY"
      checked
    />

  <!-- CHECK_SECRET_MY_INQUIRY 내부 구현 : 현재 공개되어 있지 않음 -> 따라서 추측해서 써야 함 -->
    <!-- 
      1) CHECK_SECRET_MY_INQUIRY 가 실행되면
      2) const { inquiryNo, type, title, content, secreted } = productInquiryForm; 이걸 통해 값을 가져올 수 있을 것 임? / 근데, 체크박스에 해당하는 id 값을 가져오는게 하나도 없는데
    -- >



```

[1-1] `productInquiryForm` 열어보면, `secreted` 변수가 있음 

- secreted 변수값은 어디에서 온거지? 









### [어떤 모달인가? 를 아는 법] 

- `상품 후기 등록` -> 클래스 이름 을 확인 

![Image](https://i.imgur.com/06OwvBk.png)

```js
    SELECT_ORDER_PRODUCT: () => {
      EventManager.fire('OPEN_LAYER_MODAL', {
        name: 'select-order-product', // 이게 컴포넌트 이름 ⭐⭐⭐⭐⭐
        classModifier: 'select-order-product-modal',
        data: {
          pageSize: 20,
        },
        title: '상품 후기 등록',
      });
    },
```



![Image](https://i.imgur.com/m9tlS7J.png)




### [현재 문제📛] js 파일에서는, 클릭이벤트가 2번 이상 발생하게 되면, 이전에 값을 기억하지 못 한다. (#⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐굉장히 중요 ) ( #내가 생각하는 원인이 틀렸을 수 있지만, 우선, 이전 값을 기억 못 함 ) 
```js

  // [1차 시도] 
    let selectedOrderNo = null;

  document.querySelector('.select-order-product')?.addEventListener('click', ({ target }) => {
    console.log("querySelector")
    
    const orderNo = target.closest('[shopby-order-no]')?.getAttribute('shopby-order-no');
    // [기존코드] const orderNo = target.closest('[shopby-order-no]')?.getAttribute('shopby-order-no');
    console.log("orderNo" , orderNo) // 202409241324340064 // 해당 아이템 하나의 orderNo 가 들어옴 

    selectedOrderNo = orderNo; // 체크된 체크박스의 orderNo 저장
    console.log("selectedOrderNo", selectedOrderNo)
  });
  
  document.querySelector('.select-order-product')?.addEventListener('click', ({ target }) => {
    console.log("querySelector")
    
    const action = target.closest('[shopby-action]')?.getAttribute('shopby-action');
    console.log("action" , action) // SELECT_PRODUCT 🔵 들어옴
    console.log("selectedOrderNo", selectedOrderNo)
    
    moduleActionHelper[action]?.(selectOrderProductLayerModalHelper, selectedOrderNo); // helper 객체의 SELECT_PRODUCT 메서드에, 1) 초기화된 객체 2) orderNo 를 넘김
    // moduleActionHelper[SELECT_PRODUCT]?.(selectOrderProductLayerModalHelper, 202409241324340064) 예를 들어 이렇게 되어야 함
    debugger
  });
```

<br/>

### [우선 1차 동작] `체크박스 선택값을 button` 이 기억하게 함. -> 우선 동작함 
```js
  
  document.querySelector('.select-order-product')?.addEventListener('click', ({ target }) => {    

    // 체크박스 당 하나씩 order number 를 들고 있는 상황. 클릭되면, 해당 number 가 나옴
      // 왜냐면 
        // 1. input 중 checkbox 가 선택되면 -> click 이벤트가 발생하고 -> target 에 의해 딱 그놈의 데이터만 나옴
    const orderNo = target.closest('[shopby-order-no]')?.getAttribute('shopby-order-no');

    // ⭐⭐⭐ 여기에서 '등록 버튼' 이 '기억' 하게 함 
    if (orderNo) {
      const registerButton = document.querySelector('.board-form__btn[shopby-action="SELECT_PRODUCT"]');
      registerButton.setAttribute('review-order-no', orderNo); // 등록 button 에 저장 
  }
  });
  
  // '등록' 버튼 클릭하면, 1) action 값인 'SELECT_PRODUCT' 가 들어옴 2) 그 결과, orderNo 값이 이미 있다고 가정하고 진행할 수 있음.
  document.querySelector('.select-order-product')?.addEventListener('click', ({ target }) => {
    const orderNo = target.getAttribute('review-order-no'); // 등록 버튼에 저장된 orderNo 가져오기
    const action = target.closest('[shopby-action]')?.getAttribute('shopby-action');
    
    moduleActionHelper[action]?.(selectOrderProductLayerModalHelper, orderNo); 
  });
```



### [예외처리] 체크박스를 '하나만' 선택되게 하기. -> 라디오 버튼으로 처리 -> 문의 남김 ✅

![Image](https://i.imgur.com/iydIQnw.png)



### [예외처리] `취소` 누르면, 뒤로, 넘어가게 하기 (#모달창 간 이동! 을 하게 해야 함) + [알게된 것] `추가하고 싶은 기능` 이 있다. -> 이때, `CANCEL` 프로퍼티만 추가! 했다 -> 그러니까, 다른 곳들과 동일한, 비슷한, 기능이 작동했다.   (#⭐⭐⭐⭐⭐ #이거 진짜 되게 좋은거다 ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐ )

```js
(() => {
  const { pageHelper } = ShopbySkin;

  const selectOrderProductLayerModalHelper = pageHelper.selectOrderProductLayerModalHelper();
  selectOrderProductLayerModalHelper.initialize({
    platform: 'PC',
    layerModalHelperKey: 'select-order-product',
  });

  const moduleActionHelper = {
    SELECT_PRODUCT: (helper, orderNo) => {
      helper.submit({
        orderNo,
      });
    },

    // 와, cancel 을 넣으면 되는거야? 이렇게? ⭐⭐⭐⭐⭐
    // CANCEL 이거 하나만 넣었고,
    // 심지어, action에 따라서, 다른 메서드가 실행되게 하는 건 없다. 
    CANCEL: (helper) => {
      const { productReviewForm = {} } = helper.getState();
      const { isChangedContent } = productReviewForm;

      if (isChangedContent) {
        EventManager.fire('MODAL_CONFIRM_OPEN', {
          noticeType: 'WARNING',
          message: '<em>변경된 정보를 저장하지 않고 이동하시겠습니까?</em>',
          confirmLabel: '확인',
          onConfirm: () => {
            helper.closeLayerModal();
          },
        });
      } else {
        helper.closeLayerModal();
      }
    },
  };

  document.querySelector('.select-order-product')?.addEventListener('click', ({ target }) => {    
    const orderNo = target.closest('[shopby-order-no]')?.getAttribute('shopby-order-no');

    if (orderNo) {
      const registerButton = document.querySelector('.board-form__btn[shopby-action="SELECT_PRODUCT"]');
      registerButton.setAttribute('review-order-no', orderNo); // 등록 button 에 저장 
    }
  });
  
  document.querySelector('.select-order-product')?.addEventListener('click', ({ target }) => {
    const orderNo = target.getAttribute('review-order-no'); // 등록 버튼에 저장된 orderNo 가져오기
    const action = target.closest('[shopby-action]')?.getAttribute('shopby-action');
    
    moduleActionHelper[action]?.(selectOrderProductLayerModalHelper, orderNo); 
  });

})();
```


### [궁금한 것] closeLayerModal 이게 내부적으로 어떻게 구현이 되어 있을지 
```js
    // 와, cancel 을 넣으면 되는거야? 이렇게? ⭐⭐⭐⭐⭐
    // CANCEL 이거 하나만 넣었고,
    // 심지어, action에 따라서, 다른 메서드가 실행되게 하는 건 없다. 
    CANCEL: (helper) => {
      const { productReviewForm = {} } = helper.getState();
      const { isChangedContent } = productReviewForm;

      if (isChangedContent) {
        EventManager.fire('MODAL_CONFIRM_OPEN', {
          noticeType: 'WARNING',
          message: '<em>변경된 정보를 저장하지 않고 이동하시겠습니까?</em>',
          confirmLabel: '확인',
          onConfirm: () => {
            helper.closeLayerModal();
          },
        });
      } else {
        helper.closeLayerModal();
      }
    },
  };
```


### [예외처리] `등록` 버튼 누르면, 어떻게 예외 처리 하게 되지 






### [예외처리] 만약, 리뷰 등록을 했으면, 다시 안 나타나게 되나? 





### [⭐⭐⭐궁금한 것] `board-form-button-group` 이거는 그냥 컴포넌트 이름이라고 보면 되나

### [⭐⭐⭐궁금한 것] 5. 다만, 자식이 아닌데, 어떻게 items key 에 담긴값을 쓸 수 있는거지? (#❓❓❓❓❓)



### [✅] 여기에서 작업한 내용을 -> 체크리스트로 만드는게 나을수도? 
이렇게 하니까, 적기도 하면서, 
메모하고, 쓸 수 있으니까, 좋음 




---



