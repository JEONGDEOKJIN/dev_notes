



# 부모 컴포넌트에서 global 에 등록된 함수 사용 

```jsx
// 자식 컴포넌트에서 등록된 handlePostMessage 함수 사용 
  const sendMessageToParent = (message:string) => {
    if (window.opener) {
      (window.opener as any)?.handlePostMessage(message);
    } else {
      console.error("No parent window found.");
    }
  };
```

```jsx 
// 부모 컴포넌트에서 handlePostMessage 함수 등록
  (window as any).handlePostMessage = (params: string) => {
    setPostMessage(params); // Update parent state
    console.log("Message received from child:", params);
  };
```


# 부모 컴포넌트에서 특정 객체에 함수 등록해서 쓰기 
