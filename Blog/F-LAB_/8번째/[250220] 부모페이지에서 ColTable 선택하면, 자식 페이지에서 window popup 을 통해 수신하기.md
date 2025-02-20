


# 1차 시도 


# 부모페이지에서 설정 

```tsx

// 출처 : app\program\onlineEvent-entryWinner\page.tsx
useEffect(() => {
  setupPopupParentHelper(methods);
  return () => {
    delete (window as any).handlePopup;
  };
}, [methods]);
```

# 자식 window popup 에서 설정
```tsx
// 출처 : app\popups\program\online-event\_components\PopupContents.tsx
import { sendRHFSetValueToParent } from "@/libs/utils/setupPopupHelper";
  const handleRHFSetValue = (fieldName: string, value: any, item: any) => {
    // [TODO] item 의 id 를 가져와서 name 과 title 을 한꺼번에 넘길 수 있게 해야 함

    const sendSetValueParams: ISetValueParams[] = [
      {
        name: fieldName as keyof TOnlineEvent_EntryWinner,
        value: item,
      },
    ];

    sendRHFSetValueToParent(sendSetValueParams);
  };
```


# setupPopupHelper
```tsx
import { ISetValueParams } from "@/app/program/onlineEvent-entryWinner/page";

/**
   * [setupHandlePopup] (부모 페이지에서 사용)
   * @requirement 
      - 부모페이지에서 정의된 메서드만 window popup 에서 사용가능 
   * @param methods
      - 사용되는 page 의 methods 를 가져옴 
      - 이 methods 를 window popup 에서 그대로 사용하면 'sync' 가 맞게 되어, window popup 에서 값을 변경하면, parent page 에 바인딩이 가능
   * @description 
      - window popup 을 제어할 수 있는 함수들을 등록 
      - 부모 페이지에서 setupHandlePopup 를 호출 
          useEffect(() => {
            setupHandlePopup(methods);
            return () => {
              delete (window as any).handlePopup;
            };
          }, [methods]);
      - window popup 페이지에서 등록된 메서드 사용 
        const sendMessageToParent = (sendSetValueParams: ISetValueParams[]) => {
          if (window.opener) {
            window.opener?.setupHandlePopup?.RHF?.handleSetValue(sendSetValueParams);
          } else {
            console.error("No parent window found.");
          }
        };
    */
export const setupPopupParentHelper = (methods: any) => {
  (window as any).parentHelper = {
    RHF: {
      handleSetValue: (setValueParams: ISetValueParams[]) => {
        setValueParams?.forEach((item) => {
          methods.setValue(item.name, item.value);
        });
      },
      handleWatch: (setValueParams: ISetValueParams[]) => {
        // [TODO] 추가로 필요한 로직 및 메서드 정의
      },
    },
  };
};
 

/**
 * [sendRHFSetValueToParent] (window popup 페이지에서 사용)
 * @param sendSetValueParams
 * @description : 부모 페이지로 RHF의 setValue 값만 전달하는 기능
 */
export const sendRHFSetValueToParent = (
  sendSetValueParams: ISetValueParams[]
) => {
  // [TODO] 원래는, window popup 페이지에서 정의되어야 하나, 모듈화 시킬 수 있어서 뺌 
  if (window.opener) {
    window.opener?.parentHelper?.RHF?.handleSetValue(sendSetValueParams);
  } else {
    console.error("No parent window found.");
  }
};

```

