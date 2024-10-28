

# 생명 주기가 필요한 이유는? 



# `webComponent.html` 예제에서, '탄생' 하는 순간은, ShadowDOM 이 붙게 될 때? 



# 생명 주기로 뭘, 어떤 것을 할 수 있는데? 


<br>


# 포인트 
``` BASH
1. 생명주기에서 실행대상은 'custom element' 가 되는거 같은데? 
```


# 궁금한거 

### 생명주기를 알아서 뭘 어쩌겠다는 거지? 
``` bash 
오캐이. 이렇게 '생명주기' 가 있는걸 알았어. 
그러면, '무엇에 대한 생명 주기' 인거지? 
4개의 api 메서드를 보니까, 'custom element' 임 
즉, customElements.define 여기에 등록한 'my-web-component' 에 대한 것 임. 

그럼, 이걸 알아서 뭐 어쩌겠다는 거지. 


1) 현재의 프로그래밍은 CBD 임 
    - 즉, '컴포넌트' based 개발임. (https://yozm.wishket.com/magazine/detail/2217/)  
    - 따라서, '컴포넌트의 생명주기' 를 다루는 것은 중요함 

2) 사용자 화면과 비교해서 보면 
    - 화면이 보이는건 '컴포넌트가 mount 된거' 
    - 컴포넌트의 특정 값이 변화한 건 'observe' 되었다가 변한것 
    - 삭제 는 다른 페이지로 완전히 이동한거
    - iframe 으로 변환된거는, 또 해당 이벤트에 대해서 콜백함수가 있다. 

3) 낯설게, 느껴지는 이유는 
    - 컴포넌트, 중심으로, 생각해본 경험이, 많이, 없기 때문에


```

 <br>


 ### react 컴포넌트와 뭐가 같고, 다를까? 그래서, web component 를 어떻게 사용해야 할까? react 프로젝트에서는 차용할 부분이 뭐가 있을까?

 ```bash
- 이건 react 의 본질을 꿰뚫고 있을 때, 좀 더 적절한 답변이 나올 것 같다...
 ```




# connectedCallback : '커스텀 엘리먼트' 가 REAL-DOM 에 마운트되면, 실행되는 콜백함수

### '마운트 된다.' 라는 건? 
```BASH
1. 'Real dom 에 추가' 되고 '실제로 하면에 보이고 난 이후'를 의미. 
```

<br>

### 그러면 실행순서는? 
```bash
1) 브라우저가 <my-web-component> 태그를 만난다. 
2) 브라우저는 '아, 이건 customElements.define 에 의해 등록된거니까, 같이 Mapping 되어 있는 클래스를 실행시키면 돼' 라고 생각한다.
3) 그러면, MyWebComponent 클래스가 실행되고, ShadowDOM 이 생성된다. 
4) ShadowDOM 은 '특정 과정' 을 거쳐서 RealDOM 에 붙는다. -> 붙으면, visibility, display 의 CSS 속성에 영향이 없으면, 화면에 보인다. 
5) 그러면, connectedCallback() 이게 실행된다. 
```

<br>




<br>




# disconnectedCallback : custom-element 가 REAM-DOM 에서 제거되는 경우(화면에서 사라지게 되는 경우)





<br>

# attributeChangedCallback : 1) 커스텀 엘리먼트 안에서 2) 특정 변수값이 바뀌면 실행되는 콜백 

1. (전제) 커스텀 엘리먼트에는 다양한 속성값을 넣을 수 있음
- `data-value` 라는 속성값을 넣어본 경우 
- 그리고, `data-value` 라는 key 안에는 1) "✅초기값" 이 처음에 들어가고 2) 해당 key 에 바인딩 된 값을 변경할 수 있음. 
```html
    <my-web-component data-value="✅초기값" >
        <span>✅This is slotted content</span>
    </my-web-component>
```

<br>

2. `data-value` 속성값이 변경되나, 안 되나, 감시하게 함. 
```js
        // specify which attributes to observe
            static get observedAttributes() {
            return ['data-value']  // 'data-value' attribute 가 변화하는 것을 지켜보겠다.
        }
```

<br>

3. `changeValueButton` 을 클릭하면 -> 새로운 문자열을 'data-value'에 넣을 수 있게 설정
```js
    document.getElementById('changeValueButton').addEventListener('click', () => {
        const component = document.querySelector('my-web-component');

        const newValue = prompt('Enter a new value');  // 외부에서 값을 입력받음 

        component.setAttribute('data-value', newValue) 
        // 이 순간, observedAttributes 여기에 설정된 data-value 의 값이 변함 
        // 그래서, attributeChangedCallback 실행됨
        
    });


```

<br>


4. 그래서 실행되는 것 : `attributeChangedCallback` 함수 
```js
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`${name} changed from ${oldValue} to ${newValue}`);
    }
```

5. 예제 코드 
```
webComponent-LifeCycle.html 에 있음
```


<br>


# adoptedCallback : 1) 커스텀 엘리먼트가 2) iframe 같은 new document 로 이동하는 경우 

1. `iframe` 태그가 존재함
```html
    <div>adoptedCallback 테스트</div>
    <iframe id="myIframe" style="width: 100%; height: 200px;"></iframe>
    <button id="moveButton">Move Component to Iframe</button>
```

<br>

2. `moveButton` 버튼을 클릭하면, `iframe` 에 `myWebComponent` 를 붙인다.  
```js
    document.getElementById('moveButton').addEventListener('click', () => {
        const iframe = document.getElementById('myIframe').contentDocument;
        const myWebComponent = document.querySelector('my-web-component');
        iframe.body.appendChild(myWebComponent) 
            // 이게 실행되면, myWebComponent 이 iframe 으로 이동하고 -> 그로 인해 adoptedCallback() 이 실행된다.
    });
```

<br>


3. 현재 페이지에서 커스텀 엘리먼트는 `myWebComponent` 이고, 커스텀 엘리먼트가 iframe 으로 이동했으므로 `adoptedCallback` 가 실행된다. 
```js
       adoptedCallback() {
            console.log('MyWebComponent moved to a new document(이번의 경우에는 iframe 으로 이동함)');
        }
```