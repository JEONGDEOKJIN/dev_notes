// import React, { useState } from "react";
// import styles from "./password.module.css";
// import { FormProvider, useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";

// type FindPasswordFormData = {
//   findPassword_name: string;
//   findPassword_email: string;
//   findPassword_authCode: string;
// };

// import {
//   IonButton,
//   IonContent,
//   IonHeader,
//   IonInput,
//   IonPage,
//   IonTitle,
//   IonToolbar,
//   IonItem,
//   IonAlert,
// } from "@ionic/react";
// import AuthService from "@/src/services/AuthService";
// import { validateAuthCodePattern, validateEmail, validateName } from "@/src/lib/valid";

// const FindEmailPage: React.FC = () => {
//   const history = useHistory();

//   const [isTouched, setIsTouched] = useState(false);
//   const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
//   const [alertHeader, setAlertHeader] = useState<string>("");
//   const [alerSubHeader, setAlertSubHeader] = useState<string>("");
//   const [alertMessage, setAlertMessage] = useState<string>("");

//   const [isValid, setIsValid] = useState<boolean>();
//   const [isEmailValid, setIsEmailValid] = useState<boolean>();
//   const [isNameValid, setIsNameValid] = useState<boolean>();
//   const [isAuthCodeValid, setIsAuthCodeValid] = useState<boolean>();
//   const [isAuthCodePatternValid, setIsAuthCodePatternValid] = useState<boolean>();

//   const form = useForm<FindPasswordFormData>({
//     mode: "onChange",
//     defaultValues: {
//       findPassword_name: "",
//       findPassword_email: "",
//       findPassword_authCode: "",
//     },
//     shouldFocusError: false,
//   });

//   const handleLogin = () => {
//     history.push("/main");
//   };

//   const { formState, register, getValues } = form;

//   const onSubmit = async (formData: any) => {
//     try {
//       const response = await AuthService.postUserFindPasswordResult(formData);
//       const { data } = response.data;
//     } catch (e: any) {
//       setIsAlertOpen(true); // alert 창 열기
//       setAlertHeader("로그인");
//       setAlertMessage(e.response.data.message); // 백엔드에서 보내주는 에러 메시지
//     }
//   };

//   const onError = (error: any) => {
//     const key = Object.keys(error)[0];
//     console.log(error[key].message);
//   };

//   const markTouched = () => {
//     setIsTouched(true);
//   };

//   // 전체 form 필드 유효성 검사
//   const validate = (ev: Event, type: string) => {
//     const value = (ev.target as HTMLInputElement).value;
//     setIsValid(undefined);

//     if (value === "") return;

//     if (type === "findPassword_name") {
//       validateName(value) === true ? setIsNameValid(true) : setIsNameValid(false);
//     }
//     if (type === "findPassword_email") {
//       validateEmail(value) === true ? setIsEmailValid(true) : setIsEmailValid(false);
//     }
//     if (type === "findPassword_authCode") {
//       validateAuthCodePattern(value) === true ? setIsAuthCodePatternValid(true) : setIsAuthCodePatternValid(false);
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>비밀번호 찾기</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       {/* alert 경고창 */}
//       <IonAlert
//         isOpen={isAlertOpen}
//         header={alertHeader}
//         subHeader={alerSubHeader}
//         message={alertMessage}
//         buttons={["확인"]}
//         onDidDismiss={() => setIsAlertOpen(false)}
//       ></IonAlert>
//       <IonContent className="ion-padding">
//         <FormProvider {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit, onError)}>
//             <IonInput
//               className={`${isNameValid && "ion-valid"} ${
//                 isNameValid === false && "ion-invalid"
//               } ${isTouched && "ion-touched"}`} // [✅TODO] 디자인 수정 필요 | ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//               // label="Outline input" // [✅TODO] 디자인 수정 필요
//               // labelPlacement="floating" // [✅TODO] 디자인 수정 필요
//               // fill="solid" // [✅TODO] 디자인 수정 필요
//               placeholder="이름"
//               helperText={isNameValid ? "valid name" : "Enter a valid NAME"} // [설명] 밑줄 밑에 나오는 설명
//               type="text"
//               errorText="이름은 15글자 미만📛📛" // 에러 메시지
//               onIonInput={(event) => validate(event, "register_name")}
//               onIonBlur={() => markTouched()}
//               {...register("findPassword_name", { required: true })}
//             />

//             <article className={styles.article_wrap}>
//               <IonInput
//                 className={`${isEmailValid && "ion-valid"} ${
//                   isEmailValid === false && "ion-invalid"
//                 } ${isTouched && "ion-touched"}`} // [✅TODO] 디자인 수정 필요 | ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//                 // label="Outline input" // [✅TODO] 디자인 수정 필요
//                 // labelPlacement="floating" // [✅TODO] 디자인 수정 필요
//                 // fill="solid" // [✅TODO] 디자인 수정 필요
//                 placeholder="이메일 주소"
//                 helperText={isEmailValid ? "valid email" : "Enter a valid EMAIL"} // [설명] 밑줄 밑에 나오는 설명
//                 type="email"
//                 errorText="이메일 형식을 맞춰주세요 📛📛" // 에러 메시지
//                 onIonInput={(event) => validate(event, "register_email")}
//                 onIonBlur={() => markTouched()}
//                 {...register("findPassword_email", { required: true })}
//               />

//               <IonButton
//                 type="button"
//                 // disabled 조건 체크
//                 // disabled={!authCodeButtonOpen || isAuthCodeValid} // [✅TODO] 인증번호 확인 켜지는 순간이 인증메일 보내고 받았을 때!
//                 // onClick={() => checkAuthCode(getValues("register_authCode"))}
//               >
//                 {isAuthCodeValid ? "인증 완료" : "인증번호 보내기"}
//               </IonButton>
//             </article>

//             <IonInput
//               className={`${isAuthCodePatternValid && "ion-valid"} ${
//                 isAuthCodePatternValid === false && "ion-invalid"
//               } ${isTouched && "ion-touched"}`} // [✅TODO] 디자인 수정 필요 | ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//               // label="Outline input" // [✅TODO] 디자인 수정 필요
//               // labelPlacement="floating" // [✅TODO] 디자인 수정 필요
//               // fill="solid" // [✅TODO] 디자인 수정 필요
//               placeholder="인증코드 입력"
//               helperText={isAuthCodePatternValid ? "valid 인증번호(작성성공)🔵" : "(작성중) Enter a valid 인증번호"} // [설명] 밑줄 밑에 나오는 설명
//               type="text"
//               errorText="인증번호 형식을 맞춰주세요 📛📛" // 에러 메시지
//               onIonInput={(event) => validate(event, "register_authCode")}
//               onIonBlur={() => markTouched()}
//               {...register("findPassword_authCode", { required: true })}
//             />

//             <IonButton expand="block" onClick={() => history.goBack()}>
//               취소
//             </IonButton>
//             <IonButton expand="block" onClick={handleLogin}>
//               비밀번호 찾기🙌
//             </IonButton>
//           </form>
//         </FormProvider>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default FindEmailPage;
