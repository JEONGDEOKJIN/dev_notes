# JSX 로 작성했을 때, 렌더링 되는 과정 이해하기

### 요약

```JS
// 1. 개발자가 JSX 코드로 작성
    <h1>Hello World</h1> // 개발자가 JSX 로 작성

// 2. 개발자가 pnpm build 를 함
    // JSX 파일이 변환됨
    // <h1>Hello World</h1> ->  'h1', null, 'Hello World' 로 변환

// 3. 해당 빌드 파일을 서버에 올림

// 4. 브라우저가 서버에게 파일 요청을 함
    // 1) 서버는 ssr 를 할게 있으면 진행

// 5. 브라우저는 (빌드된) 파일을 받음
    // 1) 브라우저는 브라우저 렌더링 실시
    // 2) HTML 읽다가 -> JS 읽음
    // 3) createElement 함수 실행 : '빌드 결과물' 을 '객체(elementOBJ)' 로 변환함
    // 4) root 엘리먼트를 가져오고, root 엘리먼트를 render 메서드에 바인딩 하고, render 메서드를 반환
    // 5) render 메서드 실행
        // 5-1 Root HTML Element 초기화
        // 5-2 '객체(elementOBJ)' 를 createElement 사용해서 dom 으로 만듦
        // 5-3 방금 생성한 dom을 Root 태그에 붙임

```

### 예시

```html
<!DOCTYPE html>
<html>
  <head>
    <title>createRoot 실습</title>
  </head>
  <body>
    <div id="root"></div>

    <script>
      // === 여기에 createRoot, createElement, createDOM 함수 붙여넣기 ===

      function createRoot(container) {
        return {
          render: function (element) {
            container.innerHTML = "";
            const dom = createDOM(element);
            container.appendChild(dom);
          },
        };
      }

      function createElement(type, props, ...children) {
        return { type, props: props || {}, children };
      }

      function createDOM(element) {
        if (typeof element === "string" || typeof element === "number") {
          return document.createTextNode(element);
        }

        const dom = document.createElement(element.type);

        Object.keys(element.props).forEach((key) => {
          if (key === "className") {
            dom.setAttribute("class", element.props[key]);
          } else if (key.startsWith("on")) {
            const eventName = key.slice(2).toLowerCase();
            dom.addEventListener(eventName, element.props[key]);
          } else {
            dom.setAttribute(key, element.props[key]);
          }
        });

        element.children.forEach((child) => {
          dom.appendChild(createDOM(child));
        });

        return dom;
      }

      // === 실습 코드 ===

      /**
                1. <h1>Hello World</h1> // 개발자가 JSX 로 작성
                2. 빌드 도구 (Babel/SWC)가 '<h1>Hello World</h1>' 를 'h1', null, 'Hello World' 로 변환 -> 빌드된 결과가 서버로 저장 
                3. 브라우저에서 해당 파일 요청 -> 파일 받음 
                4. 브라우저에서  createElement 함수 실행  
                    -> { type: 'h1', props: {}, children: ['Hello World'] } 객체 반환 
                    -> element 변수가 담김 
             */
      // '빌드 결과물' 이 '객체' 로 변환됨
      const elementOBJ = createElement("h1", null, "Hello World");

      // root 엘리먼트를 가져오고, root 엘리먼트를 render 메서드에 바인딩 하고, render 메서드를 반환 (#⭐⭐⭐)
      const root = createRoot(document.getElementById("root"));

      // render 메서드가 안에 있는지 몰랐는데, 어떻게 알아서, render 메서드를 사용
      /** render 메서드의 기능
       * 1) 바인딩된 Root HTMLElement 초기화
       * 2) createDOM : elementOBJ 를 document.createElement을 사용해서 dom 으로 만듦
       * 3) 방금 생성한 new DOM 을 ROOT 태그에 붙임
       */
      root.render(elementOBJ);
    </script>
  </body>
</html>
```

**결과:**

```html
<div id="root">
  <h1>Hello World</h1>
</div>
```
