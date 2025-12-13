


# 과장님 코드 


### 알아야 하는 것 

```
1. 나의 생산성이 아직 안 좋다. 더 나은 코드를 작성할 수 있게, 노력해야 한다. 

2. 일말의 자신감이 아니라, 계속 겸손하고, 집중해야 한다. 목표를 높게 잡아야 한다. 지금 나의 수준에 만족하면 안 된다. (#반드시 그래야 한다. 지금에만 안주해서는 안 된다.)

```


### RegAdminInfoModal
```tsx
type FormValues = {
  adminId: string
  adminName: string
  adminNumber: string
  department?: string
  job?: string
  email?: string
  mobilePhoneNumber?: string
  phoneNumber?: string
}

const RegAdminInfoModal = () => {

  const alert = useAlert();

  let {item, closeWindow} = useParentData();

  const methods = useForm<FormValues>({
    mode: "onBlur"
  })

  useEffect(() => {
    if (item) methods.reset({
      adminId: item ? item.adminId : "",
      adminName: item ? item.adminName : "",
      adminNumber: item ? item.adminNumber : "",
      department: item ? item.department : "",
      job: item ? item.job : "",
      email: item ? item.email : "",
      mobilePhoneNumber: item ? item.mobilePhoneNumber : "",
      phoneNumber: item ? item.phoneNumber : "",
    });
  }, [item])


  const onSave = (data: any) => {
    alert.openAlert({
      btnLabel: "확인",
      isCancel: true,
      content: "입력하신 관리자 정보를\n저장 하시겠습니까?",
      callback: () => {
        let msg:any = data;
        if (item) msg.id = item.id;
        closeWindow(msg);
        alert.closeAlert();
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <section>
        <div className={gridBaseCol4}>
          <div className={classNames(headCellStyle, requiredCellStyle)}>
            <span>아이디</span>
          </div>
          <div className={dataCellStyle}>
            <Input
              name="adminId"
              type="text"
              sizeH="XS" sizeW="L"
              className="w-full"
            />
          </div>
          <div className={classNames(headCellStyle, requiredCellStyle)}>
            <span>이름</span>
          </div>
          <div className={dataCellStyle}>
            <Input
              name="adminName"
              type="text"
              sizeH="XS" sizeW="L"
              className="w-full"
            />
          </div>
          <div className={classNames(headCellStyle, requiredCellStyle)}>
            <span>비밀번호</span>
          </div>
          <div className={dataCellStyle}>
            <Input
              name="adminPw"
              type="password"
              sizeH="XS" sizeW="L"
              className="w-full"
            />
          </div>
          <div className={classNames(headCellStyle, requiredCellStyle)}>
            <span>부서명</span>
          </div>
          <div className={dataCellStyle}>
            <Input
              name="department"
              type="text"
              sizeH="XS" sizeW="L"
              className="w-full"
            />
          </div>
          <div className={classNames(headCellStyle, requiredCellStyle)}>
            <span>사번</span>
          </div>
          <div className={dataCellStyle}>
            <Input
              name="adminNumber"
              type="text"
              sizeH="XS" sizeW="L"
              className="w-full"
            />
          </div>
          <div className={classNames(headCellStyle, requiredCellStyle)}>
            <span>직무</span>
          </div>
          <div className={dataCellStyle}>
            <FormSelect
              name="job"
              defaultLabel={"선택"}
              items={[
                { label: "직무 A", value: "직무 A" },
                { label: "직무 B", value: "직무 B" },
                { label: "직무 C", value: "직무 C" },
              ]}
              sizeW="M"
              sizeH="XS"
              className="!max-w-[300px]"
            />
          </div>
          <div className={classNames(headCellStyle, requiredCellStyle)}>
            <span>휴대폰번호</span>
          </div>
          <div className={dataCellStyle}>
            <Input
              name="mobilePhoneNumber"
              type="text"
              sizeH="XS" sizeW="L"
              className="w-full"
            />
          </div>
          <div className={classNames(headCellStyle)}>
            <span>전화번호</span>
          </div>
          <div className={dataCellStyle}>
            <Input
              name="phoneNumber"
              type="text"
              sizeH="XS" sizeW="L"
              className="w-full"
            />
          </div>
          <div className={classNames(headCellStyle, requiredCellStyle)}>
            <span>이메일</span>
          </div>
          <div className={classNames(dataCellStyle, "!justify-start col-span-3 gap-2")}>
            <Input
              name="email"
              type="text"
              sizeH="XS" sizeW="L"
              className="w-full !max-w-[500px]"
            />
            <span>@</span>
            <Input
              name="emailDomain"
              type="text"
              disabled
              sizeH="XS" sizeW="S"
              className="!w-[200px]"
            />
            <FormSelect
              name="emailDomainSelect"
              items={[
                { label: "선택", value: "" },
                { label: "snowpeak.com", value: "snowpeak.com" },
                { label: "naver.com", value: "naver.com" },
                { label: "gmail.com", value: "gmail.com" },
              ]}
              sizeW="S"
              sizeH="XS"
            />
          </div>
        </div>


      </section>
    </FormProvider>
  )
}

export default RegAdminInfoModal;

```


### 쓰이는 곳
```tsx
"use client"

import React from "react";
import RegAdminInfoModal from "@/app/admin/admin-info/_components/RegAdminInfoModal";
import {PopupTitle} from "@/app/popups/_common-components";


export default function Page() {
  return (
    <>
      <PopupTitle title={"관리자 정보 관리"}/>
      <RegAdminInfoModal/>
    </>
  );
};
```