

# WINDOW POPUP 사용하기 

## [사전 작업 - 의존성1] 이동하고자 하는 경로 및 window popup 의 고유 이름을 CONSTANT 에 저장하기 
```bash
[libs > constants 에 관리하는 이유] 
- 동일한 URL 을 다양하게 적을 것 같은데, '관리 포인트를 한군데' 로 만들어서, URL 변경시 빠르게 대처 가능
```
```tsx
export const POPUP_PARAMS = {
  member: {
    memberEdit: {
      url: "/popups/member/memberEdit",
      windowName: "회원정보수정",
    },
    mailSend: {
      url: "/popups/member/mailSend",
      windowName: "회원메일발송",
    },
등등
}
```

## [사전작업 - 의존성2] useWindowPopup HOOK 에서 handleOpenWindowPopup 핸들러 가져오기 (#이때, useModal 에 대한 의존성이 있어서, 추가로 openWindowPopup 를 불러줘야 하는 불편함이 있음)  
```tsx
  const { openWindowPopup, closeModal } = useModal();
  const { handleOpenWindowPopup } = useWindowPopup(openWindowPopup);
```


## 상품 추가 버튼 누르면 handleOpenWindowPopup 에 이동하고자 하는 정보를 POPUP_PARAMS 중 일부 property 를 넘겨서 전달
```tsx
<Button
    size="md"
    label="상품추가"
    type="button"
    variant="defaultOutlineLight"
    className="!w-[80px] !px-2"
    onClick={() =>
      handleOpenWindowPopup(
        POPUP_PARAMS?.product.productDisplaySearch
      )
    }
  />
</>
```

