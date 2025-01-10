

# 문제 상황 

![Image](https://i.imgur.com/COR5MXw.jpeg)

# 상황 이해 

```bash
page
	|-- Modal
				|-- Modal 

현재, page 에서 Modal 이 호출 되는 구조 


[기존] 

[page]
	- useModalWithStrategy HOOK 을 import 하고 call(호출) 해서, methods, fetchData 를 넣음 
	- 그렇게 return 된 openModalByStrategy 함수를 사용 

[1depth modal]
	- page 와 동일한 로직으로 사용하면, 설정된 전략을 사용할 수 있을 줄 알았음 
	- useModalWithStrategy HOOK 을 import 하고 call(호출) 해서, methods, fetchData 를 넣고 -> return 된 openModalByStrategy 함수를 사용 
	- 이 방식의 문제점 
		: Modal 이 호출되는 것은 '조건부' 임. ex) 클릭여부에 따라서 렌더링 됨 
		: 이 '조건부 렌더링' 은 '컴포넌트가 렌더링 될 때, HOOK 이 렌더링 되는 순서는 동일' 해야 한다는 '컴포넌트 렌더링 규칙을 위반' 함
		: 따라서, Modal 에서 HOOK 을 import 하고 call 하는 것은 에러를 일으킴
		
	- 해결방안 
		: 따라서, Modal 에서 Hook 의 로직을 사용하려면, 부모 page 에서 props 로 내려주는 것을 사용해야 함

	- 시사점 
		: 이 과정을 통해 Modal 은 '어떤 로직을 실행할까?' 는 'PROPS' 로 받기 때문에, '부모 component 에 의존적' 이게 된다. (#MODAL  의 관심은 UI 에 있게 됨)
		: 즉, Modal 은, hook 을 가져와서 가공하는 로직을 신경쓰지 않아도 된다. 
		: 이렇게 'LOGIC 을 다루지 않기 떄문에' 나아가 useState 를 가져와서 만들지 않아도 됨
		: 그래서 'STATELESS' 한 상태가 됨 

[궁금한 것] 
	- 이게 맞나? 
	- MODAL 에서 HOOK 을 못 불러오면, 음..... 너무 제한적인거 아닌가? 이게 맞나? 
```

# 예시 코드 


1. 부모에서 hook 넘기기
```jsx
const handleRegisterExhibition = () => {
    console.log("onRegister", () => openModalByStrategy("registerExhibition")); // 값 확인

    openModal({
      content: (
        <Modal_Register_Exhibition
          executeStrategy={() => openModalByStrategy("addProduct")}
          memberId={123123}
        />
      ),
      title: "기획전 등록관리",
      modalWrapCSS: "!min-w-[1100px] ",
    });
  };

```

2. 2depth modal 에서 executeStrategy props 를 가져다 쓰기 
```jsx
  const handleAddProduct = () => {
    // [TODO] '제품전시관리 > 공통 >  전시 상품검색' 모달 띄우기
    console.log("상품 추가 버튼 클릭");
    executeStrategy()
  };

```