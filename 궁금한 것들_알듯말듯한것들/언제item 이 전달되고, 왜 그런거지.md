
- C:\Users\nextinnovation\Desktop\NextInnonavtion\projects\antschool\antschool-web-admin\app\user\page.tsx


## 언제 onclick 했을 때,  item 이 전달되고, 언제 item 이 전달이 안 되는 거지? (#📛📛 알듯말듯한 것들)
- [ ] item 클릭했을 때, 해당 id 가 handleOpenModal 함수로 전달되어야 함
      -> 이때, '(item: any) => handleOpenModal(item)' 이렇게 하면, item 의 id 가 주입된다는 걸, 내가 잘 모르고 있었음. -> 그래서 시간이 많이 걸림

(id를 item 으로 전달)
```jsx
Entries={{
            changeEntries: {
              quited: changeUser,
            },
            functionEntries: {
              user_email: {
                fun: (item: any) => handleOpenModal(item), // ✅ 이 매개변수를 누가 넣어주는거지? 언제 이게 동작하는거지? Table 컴포넌트 안에 이미 내장되어 있나 
                underline: true,
              },
            },
          }}
```

(원래 코드)
```jsx
          Entries={{
            changeEntries: {
              quited: changeUser,
            },
            functionEntries: {
              user_email: {
                fun: handleOpenModal, // ⭐⭐ 여기에 매개변수 없이 그냥 이렇게 
                underline: true,
              },
            },
          }}
```


---


### 여기도 마찬가지 | 클릭했을 때, 수정하기 메소드에 item 이 들어감 
(C:\Users\nextinnovation\Desktop\NextInnonavtion\projects\antschool\antschool-web-admin\app\user\_components\UpdateUserInfo.tsx) 

```jsx
 return (
    <FormProvider {...methods}>
      {/* [TODO✅] updateForm 기반으로 만들어졌기 때문에 create form 은 수정 필요 */}
      <UpdateForm />
      <BtnsBox
        link={{
          url: "/user",
          label: "목록으로",
          func: () => modal.closeModal(),
          // [기존코드] func: () => methods.reset(), // form 작성에 필요할 수도 있음.
        }}
        active={{
          label: "수정하기",
          func: methods.handleSubmit(onEdit),
          variant: "primaryFill",
        }}
      />
    </FormProvider>
  );
```