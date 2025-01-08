# 문제 상황 

```
- 페이지 마다, handler 함수가 '비슷' 하면서도 '살짝' 다른 부분이 있었음 
- 이를 공통화 해서 관리하지 않으면 코드가 너무 길어짐 
- 재사용성을 높이는 방법이 필요
```

![Image](https://i.imgur.com/viCncHy.jpeg)



# 접근 : 전략패턴 사용

```bash
- 전략패턴이란? 

- 왜 전략패턴을? 

- 적용할 때의 포인트 

- 적용시 risk 
```



# 진행
### 디렉토리 구조 
```

```

###  Strategy Map (모든, 선택가능한 옵션, 을 모아두는 곳)
```jsx

export type ModalStrategy = {
  content:  JSX.Element | string; 
  title: string; 
  modalWrapCSS?: string; 
  validation?: () => boolean; 
};


import { ModalStrategy } from "./types";
import Modal_View_FieldEvent from "@/components/Modal/Contents/Modal_View_FieldEvent";

export const ModalStrategies: Record<string, ModalStrategy> = {
  fieldEvent: {
    content: <Modal_View_FieldEvent memberId={123123} />, // JSX 요소로 변환
    title: "Field Event Query",
    modalWrapCSS: "!max-w-[1200px]", // 선택적 CSS 클래스
  },
};


/**
 * [ModalStrategies]
  1. ModalStrategies의 key 값의 역할
    - useModalWithStrategy HOOK 에서, 매개변수로 들어가게 된다. 
    - 이때, 'keyof typeof' 문법으로, key 값들 중 '하나만!' 들어가게 된다.

  */

```


### hook 
```jsx
import { ModalStrategies } from "@/strategies/modals/ModalStrategies";
import { useModal } from "./useModal";

export const useModalWithStrategy = () => {
  const { openModal } = useModal();

  const openModalByStrategy = (type: keyof typeof ModalStrategies) => {
    const strategy = ModalStrategies[type]; // ModalStrategies에서 선택할 수 있는 것 중 하나를 선택

    // 예외 처리
    if (!strategy) {
      console.error(`No modal strategy found for type: ${type}`);
      return;
    }

    // [TODO] validation 로직이 있으면 추가
    if (strategy.validation && !strategy.validation()) {
    //   alert("Validation failed"); // Example alert logic
      return;
    }

    // 예외 처리 및 validation 로직이 통과되면, 모달을 열어줌
    openModal({
      content: strategy.content,
      title: strategy.title,
      modalWrapCSS: strategy.modalWrapCSS,
    });
  };

  return { openModalByStrategy };
};

/**
 * [openModalByStrategy] 
    1. 매개변수 : type: keyof typeof ModalStrategies
        - ModalStrategies 의 key 값 중 하나가 type 이라는 매개변수가 된다.

    2. validation 로직 
        - validation 함수가 있고, falsy 값이면, alert 띄움 

    3. 예외 처리 
        - Strategies 객체에, 선택한 전략type이 없으면 예외처리 
        - 해결책은, Strategies 객체에, 선택하고 싶은 전략type 을 넣어주면 됨

    4. 실행 흐름 
        - 예외처리 및 validation 이 통과되면, modal 을 열어줌 

    5. 반환값
        -   return { openModalByStrategy }; 이때, 왜 객체로 반환하는지는 아직 모르겠음

*/

```


### page에서 사용하기 

```jsx
  const { openModalByStrategy } = useModalWithStrategy();

  const handleOnclickFieldEventSearchIcon = () => {
    openModalByStrategy("fieldEvent");
  };
```