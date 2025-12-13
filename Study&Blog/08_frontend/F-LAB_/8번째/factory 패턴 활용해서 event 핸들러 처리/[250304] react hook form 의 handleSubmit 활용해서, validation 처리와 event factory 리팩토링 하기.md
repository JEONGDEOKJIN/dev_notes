
# 테이블에서 ROW 선택하면 값 가져와서 window event 에 던지기 

## [자식창] 1. table TYPE 설정 
```tsx
// [TODO] postMessage 변경하고 나면, 이거는 제거하고 타입에 맞게 다시 조정 
export const CAMPFIELD_REGISTER_SITE_TABLE_NAME =
  "viewModelTableName_campfield_register_site";
```

## [자식창] 2. react hook form 에 TYPE 가져와서 등록하기 
```tsx
  type TCampFieldProductRegister = {
    [key: string]: any; // table 설정을 위한 동적할당
  };

  const methods = useForm<TCampFieldProductRegister>(
      [CAMPFIELD_REGISTER_SITE_TABLE_NAME]: [], // [TODO] viewModel 타입에서 table 이름 가져옴
    },
  });

  const { watch } = methods;
  const selected_tableId = watch(CAMPFIELD_REGISTER_SITE_TABLE_NAME);
```

## 3. [자식창] window 이벤트 사용해서 데이터 넘기기 

### 클릭 버튼 누르면, handleSubmit 통해서 onSave 실행 
```tsx

```

### onSave 함수 실행
- 복수의 값이 선택되어도, 넘어갈 수 있게 설정 
```tsx
  // ING : POSTMESSAGE 방식으로 변경중
  const onSave = (data: any) => {

    if (data?.[CAMPFIELD_REGISTER_SITE_TABLE_NAME].length > 0) {
      const selectedData = items?.filter((el: any) =>
        data[CAMPFIELD_REGISTER_SITE_TABLE_NAME].includes(el.id)
      );

      closeWindow({
        isRegisterSite: true, // registerSite page 에서 발생한건지 여부
        result: selectedData ?? "", // 선택된 데이터
      });
    }
  };
```




## 4. 부모에서 받기 
### 1. RHF 에서 fieldArray 설정 후, append 로 값 추가하기
```tsx
import usePopupMessage, { useParentData } from "@/libs/hooks/usePopupMessage";

// map 돌릴 배열 및 수정 메서드를 RHF useFieldArray 활용해서 미리 만들어두기
  const { control } = methods;
  const {
    fields: fields_selectedIdsBySiteToRegister,
    append: append_selectedIdsBySiteToRegister,
    remove: remove_selectedIdsBySiteToRegister,
  } = useFieldArray({
    control,
    name: "selectedIdsBySiteToRegister", // useForm의 defaultValues에서 관리하는 테이블명
  });

```

### 2. window 에서 message 이벤트가 발생하면 실행하는 콜백함수에서 append 를 받아서 처리 (#⭐⭐⭐)
```tsx
// usePopupMessage 를 통해 값이 들어오면, 1) 실행되는 콜백함수 만들고 2) 그 콜백함수 안에서 append 메서드 사용해서 값 넣기
  // forEach 사용해서 반복 실행되게 하기 
  usePopupMessage((result: any) => {
    if (result.isRegisterSite && Array.isArray(result.result)) {
      result.result.forEach((item: any) => {
        append_selectedIdsBySiteToRegister({
          id: item.id ?? `${Date.now()}`, // 고유한 ID 값
          name: item.name ?? "새로운 사이트", // 기본값 설정 가능
          location: item.location ?? "기본 위치", // 기본 위치값
          size: item.size ?? 0, // 예제: 크기 필드
        });
      });
    }
  });
```




## 5. 가져온 값, 잘 정리정돈해서 바인딩하기 

```
- POST 보낼 때, 정리하는 방식이 있어야 함 
	- 그 다음에, 해당 property 에 맞게 넣을 수 있음. 

```


![Image](https://i.imgur.com/Aw6PrJB.jpeg)

여기에서 기입되어야 하는 react hook form 필드는 10개 
그 중, 가져와서 바로 바인딩 되는게, 3~4개 ㅌ
이건, 이제, react hook form 에서 post 될 때의 로직 안으로 들어가면 됨




# [문제 상황] window popup 과 window popup 사이의 데이터 송수신이 가능한가 
```tsx
💡 1) window popup 간 데이터 전송이 안 되는 이유
✅ window.opener.postMessage()는 부모(메인) 페이지에게만 메시지를 보냄

현재 useParentData에서 window.opener.postMessage(msg, window.location.origin);를 사용하고 있음.
하지만 팝업창 A → 팝업창 B로 직접 데이터를 보낼 수 없음.
window.opener.postMessage()를 호출해도 오직 메인(부모) 페이지만 메시지를 받을 수 있음.
✅ window popup 간 직접적인 postMessage 통신이 기본적으로 불가능함

브라우저 보안 정책상, 두 개의 팝업 창이 직접 데이터를 주고받을 수 없음.
반드시 부모(메인) 페이지를 거쳐야만 데이터 전달이 가능.
✅ 현재 usePopupMessage는 부모(메인) 페이지에서만 메시지를 수신

window.addEventListener('message', handleMessage);가 부모 페이지에서 실행되고 있음.
하지만 다른 팝업 창에서는 실행되지 않음.
```

## 가능 별 문제 없음!!! 

