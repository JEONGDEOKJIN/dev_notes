

```jsx

  const handleAttachmentClick = (
    studentId: number,
    isImageEnrollModalOn: boolean
  ) => {
    
    // useState 비동기 이슈
    // setIsImageEnrollModalOn(true); // 이건 작동하는데
    // setIsImageEnrollModalOn(!isImageEnrollModalOn); // 이건 왜 안 되나 -> useState 의 비동기 때문
    
    setIsImageEnrollModalOn((prevState) => !prevState); // 이걸로 대체


    // 이미지 등록하는 곳에 studentId를 넘겨주어야 함
    console.log("이미지 등록 클릭", studentId);

  };


```