

- 참고 : https://www.figma.com/board/LmwbrNXAVUOogSBWXLhthN/%EC%8A%A4%EB%85%B8%EC%9A%B0%ED%94%BC%ED%81%AC-DDD%2C-DAG%2C-%EC%8B%9C%ED%80%80%EC%8A%A4-%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8?node-id=111-832&t=6XbhMpZF6tjijE1t-4


```jsx

/**
  - 숨겨진 input 을 만든다. 
  - 이걸 ref 를 통해 control 한다. 
    - 업로드 버튼이 클릭되면 -> 숨겨진 input 태그가 click 된 것 처럼 작동(handleUploadButtonClick) 
    - 그리고 파일이 업로드 되면 -> input 태그의 onChange 이벤트가 발동되어 handleFileChange 핸들러가 실행
      -> 해당 핸들러로 업로드된 파일이 들어오고, upLoadFile Hook 내부 메서드에 던진다. 
*/



  const fileInputRef = useRef<HTMLInputElement | null>(null);  // 파일이 들어갈 input
  
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 숨겨진 파일 입력 클릭 트리거
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadExcel(file); // 파일 업로드 로직 실행
    }
    event.target.value = ""; // 동일 파일 업로드 시에도 이벤트 트리거를 위해 초기화
  };
  
  
          {/* 숨겨진 파일 입력 필드 */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls" // 엑셀 파일 확장자
          onChange={handleFileChange}
          style={{ display: "none" }} // 화면에 표시되지 않음
        />
        <Button
          size="md"
          label="엑셀 업로드"
          type="file"
          variant="defaultOutlineLight"
          className="!w-[90px] !px-2 "
          onClick={handleUploadButtonClick}
        />
        <Button
          size="md"
          label="상품검색"
          type="button"
          variant="defaultOutlineLight"
          className="!w-[80px] !px-2"
          onClick={handleAddNewExhibition}
        />

```