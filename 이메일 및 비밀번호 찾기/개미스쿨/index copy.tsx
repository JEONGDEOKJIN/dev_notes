// import React, { useState } from "react";
// import styles from "./password.module.css";
// import { FormProvider, useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";

// type FindPasswordFormData = {
//   findPassword_name: string;
//   findPassword_email: string;
//   findPassword_authCode: string;
// };

// import { IonButton, IonLabel, IonContent, IonInput, IonPage, IonText, IonAlert } from "@ionic/react";
// import AuthService from "@/src/services/AuthService";
// import { validateAuthCodePattern, validateEmail, validateName } from "@/src/lib/valid";
// import StatusBar from "@/src/components/StatusBar";
// import TitleSection from "../../../Auth/Register/Agreement/_components/TitleSection";
// import SubTitleSection from "../../../Auth/Register/Agreement/_components/SubTitleSection";

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
//   const [authCodeButtonOpen, setAuthCodeButtonOpen] = useState<boolean>(false);

//   const [emailCredential, setEmailCredential] = useState<string>("");
//   const [authCodeErrorMessage, setAuthCodeErrorMessage] = useState<string>("");

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

//   const { formState, register, getValues, setValue } = form;

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

//   // 인증코드 보내기 (✅✅ 이게 반복됨 | refactor 커스텀 훅으로 만드나? )
//   const sendAuthCode = async (email: any) => {
//     if (!email) {
//       setIsAlertOpen(true); // alert창 띄우기
//       setAlertHeader("인증");
//       setAlertMessage("이메일을 입력해주세요");
//     }

//     if (!validateEmail(email)) {
//       setIsAlertOpen(true); // alert창 띄우기
//       setAlertHeader("인증 메일");
//       setAlertMessage("올바르지 않는 메일주소 입니다.");
//     }

//     try {
//       const response = await AuthService.postUserRegisterEmail({ email });
//       console.log("sendAuthCode response👉", response);
//       const { credential } = response.data.data;

//       if (credential) {
//         setEmailCredential(credential); // [✅TODO] credential값을 백엔드로 부터 받음. 암호화된 값인가?
//         console.log("인증메일 보내기 버튼 클릭 시, credential 값 : ", credential);
//         setAuthCodeButtonOpen(true); // 인증번호 확인 버튼 활성화
//         setIsAlertOpen(true); // alert창 띄우기
//         setAlertHeader("인증메일");
//         setAlertMessage("인증코드를 메일로 보냈습니다.");
//       }
//     } catch (e: any) {
//       setIsAlertOpen(true); // alert창 띄우기
//       setAlertHeader("인증메일");
//       setAlertMessage(e.response.data.message); // 백엔드에서 보내주는 에러 메시지
//     }
//   };

//   // 인증코드 확인 (✅✅ 이게 반복됨 | refactor 커스텀 훅으로 만드나? )
//   const checkAuthCode = async (authCode: any) => {
//     alert("임시로 검증 true 처리")
//     setIsAuthCodeValid(true);

//     // 사용자가 기재한 인증번호 가져오기
//     console.log("인증번호 확인 버튼 클릭 시, 사용자가 기재한 인증번호 : ", authCode);
//     try {
//       const response = await AuthService.postUserRegisterEmailResult({
//         auth_code: authCode,
//         credential: emailCredential, // 이메일 인증 요청할 때, credential 값을 받음
//       });

//       console.log("checkAuthCode response👉", response);

//       if (response.data.code === 200) {
//         // credential2 값 받고 -> 상태 변수 저장 -> 이걸, 회원가입 때 보내기
//         const { credential2 } = response.data.data;
//         setValue("findPassword_authCode", credential2);
//         setIsAlertOpen(true); // alert창 띄우기
//         setAlertHeader("인증메일");
//         setAlertMessage("메일 인증이 완료되었습니다.");
//         setIsAuthCodeValid(true);
//       }
//     } catch (e: any) {
//       setAuthCodeErrorMessage(e.response.data.message);
//     }
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
//       <StatusBar />
//       <TitleSection title="비밀번호 찾기">
//         <div onClick={() => history.goBack()} className={styles.chevronBack} />
//       </TitleSection>
//       <SubTitleSection fontWeight="400" title="비밀번호 찾기 페이지 입니다." />
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
//             <section className={styles.layout}>
//               {/* 1. 이름 */}
//               <article className={`${styles.inputWrapDefault}`}>
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   이름
//                 </IonLabel>
//                 <div>
//                   <IonInput
//                     class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                     className={` 
//                   ${isNameValid && `ion-valid`} 
//                   ${isNameValid === false && "ion-invalid"} 
//                 `}
//                     placeholder="이름을 입력해주세요."
//                     type="text"
//                     // errorText={`${isNameValid == false && "이름은 15글자 미만📛📛"}`} // 에러 메시지 제거. 별도로 생성
//                     onIonInput={(event) => validate(event, "findPassword_name")}
//                     onIonBlur={() => markTouched()}
//                     {...register("findPassword_name", { required: true })}
//                   />
//                   {isNameValid == false && (
//                     <IonText className={styles.warning}>이름은 15글자 미만으로 작성해주세요.</IonText>
//                   )}
//                 </div>

//                 {/* [이전 이름 INPUT] */}
//                 {/* <IonInput
//                     className={`${isNameValid && "ion-valid"} ${
//                       isNameValid === false && "ion-invalid"
//                     } ${isTouched && "ion-touched"}`} // [✅TODO] 디자인 수정 필요 | ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//                     // label="Outline input" // [✅TODO] 디자인 수정 필요
//                     // labelPlacement="floating" // [✅TODO] 디자인 수정 필요
//                     // fill="solid" // [✅TODO] 디자인 수정 필요
//                     placeholder="이름"
//                     helperText={isNameValid ? "valid name" : "Enter a valid NAME"} // [설명] 밑줄 밑에 나오는 설명
//                     type="text"
//                     errorText="이름은 15글자 미만📛📛" // 에러 메시지
//                     onIonInput={(event) => validate(event, "register_name")}
//                     onIonBlur={() => markTouched()}
//                     {...register("findPassword_name", { required: true })}
//                   /> */}
//               </article>

//               {/* 2. 이메일 */}
//               <article className={`${styles.inputWrapDefault}`}>
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
//                     marginBottom: "3px",
//                   }}
//                 >
//                   이메일주소
//                 </IonLabel>
//                 <div
//                   style={{
//                     width: "100%",
//                     // height: "100px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: "6px",
//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "100%",
//                     }}
//                   >
//                     <IonInput
//                       class={`${styles.ionInputDefault}`}
//                       className={`${isEmailValid && `ion-valid`} 
//                       ${isEmailValid === false && "ion-invalid"} 
//                       `}
//                       placeholder="이메일 주소"
//                       type="email"
//                       // errorText="이메일 형식을 맞춰주세요" // 에러 메시지
//                       onIonInput={(event) => validate(event, "findPassword_email")}
//                       onIonBlur={() => markTouched()}
//                       {...register("findPassword_email", { required: true })}
//                     />
//                     {isEmailValid == false && <IonText className={styles.warning}>이메일 형식을 맞춰주세요.</IonText>}
//                   </div>

//                   <IonButton
//                     type="button"
//                     className={isEmailValid ? styles.ionInputValid : styles.ionInputNotValid}
//                     disabled={!isEmailValid}
//                     onClick={() => sendAuthCode(getValues("findPassword_email"))}
//                   >
//                     인증메일 전송
//                   </IonButton>
//                 </div>
//               </article>

//               {/* 3. 인증 코드 */}
//               <article
//                 className={`${styles.inputWrapDefault} ${isAuthCodePatternValid === false && styles.inputWrapDisabled}  `}
//               >
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
//                     marginBottom: "3px",
//                   }}
//                 >
//                   인증코드
//                 </IonLabel>
//                 <div
//                   style={{
//                     width: "100%",
//                     // height: "100px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: "6px",

//                   }}
//                 >
//                   <div
//                     style={{
//                       width: "100%",
//                     }}
//                   >
//                     <IonInput
//                       class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                       className={`
//                       ${isAuthCodePatternValid && "ion-valid"} 
//                       ${isAuthCodePatternValid === false && "ion-invalid"}                      `}
//                       placeholder="인증코드 입력"
//                       type="text"
//                       // errorText="인증번호 형식을 맞춰주세요 📛📛" // 에러 메시지
//                       onIonInput={(event) => validate(event, "findPassword_authCode")}
//                       onIonBlur={() => markTouched()}
//                       {...register("findPassword_authCode", { required: true })}
//                     />
//                     <IonText className={styles.warning}>
//                       {/* [1단계] API 검증 보내기 전 */}
//                       {authCodeErrorMessage.length === 0 &&
//                         isAuthCodePatternValid == false &&
//                         "인증번호 형식을 맞춰주세요."}
//                       {/* [2단계] API 검증 보내고, 에러 메시지가 발생한 경우 */}
//                       {authCodeErrorMessage.length > 0 && authCodeErrorMessage}
//                     </IonText>
//                   </div>
//                   <IonButton
//                     type="button"
//                     className={isAuthCodePatternValid ? styles.ionInputValid : styles.ionInputNotValid}
//                     disabled={!isAuthCodePatternValid}
//                     onClick={() => checkAuthCode(getValues("findPassword_authCode"))}
//                   >
//                     {isAuthCodeValid ? "인증 완료" : "인증코드 확인"}
//                   </IonButton>
//                 </div>

//               </article>
//             </section>

//             <section
//               style={{
//                 width: "100%",
//               }}
//             >
//               <IonButton
//                 className={isAuthCodeValid ? `${styles.ionFindValid}` : `${styles.ionFindNotValid}`}
//                 disabled={!isAuthCodeValid}
//                 // className={formState.isValid ? `${styles.ionFindValid}` : `${styles.ionFindNotValid}`}
//                 // disabled={formState.isSubmitting || !formState.isValid} // 이전 검증
//                 expand="block"
//                 onClick={handleLogin}
//               >
//                 확인
//               </IonButton>
//             </section>
//           </form>
//         </FormProvider>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default FindEmailPage;
