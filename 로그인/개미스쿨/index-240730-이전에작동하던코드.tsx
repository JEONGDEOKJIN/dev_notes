// import React, { useEffect, useState } from "react";
// import styles from "./login.module.css";
// import { FormProvider, useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";
// import Jwt from "../../../lib/jwt";
// import AuthService from "../../../services/AuthService";
// import { IonButton, IonContent, IonInput, IonPage, IonAlert, IonLabel, IonItem } from "@ionic/react";
// import { validateEmail, validatePassword } from "@/src/lib/valid";
// import { IReqAuthLogin } from "@/src/types/interface/parameter/Auth";
// import StatusBar from "@/src/components/StatusBar";
// // import { wrap } from "cypress/types/lodash"; // [240726] eslint 오류 메시지로 인해 주석처리 했습니다.

// const AuthLoginPage: React.FC = () => {
//   // const [present] = useIonToast(); // [TODO] ALERT 창으로 변경
//   const history = useHistory();
//   const [isTouched, setIsTouched] = useState(false);
//   const [, setIsValid] = useState<boolean>();
//   const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>();
//   const [isPasswordValid, setIsPasswordValid] = useState<boolean | undefined>();
//   const [isFormValid, setIsFormValid] = useState<boolean>(false);

//   const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
//   const [alertHeader, setAlertHeader] = useState<string>("");
//   const [alerSubHeader] = useState<string>("");
//   const [alertMessage, setAlertMessage] = useState<string>("");

//   const form = useForm<IReqAuthLogin>({
//     mode: "onChange", // 변경될 때 유효성 검사
//     defaultValues: {
//       login_email: "",
//       login_password: "",
//     },
//     shouldFocusError: false,
//   });

//   const { formState, register } = form;
//   const onSubmit = async (formData: IReqAuthLogin) => {
//     try {
//       const response = await AuthService.postUserLogin(formData);
//       const { data } = response.data;

//       Jwt.saveAccessToken(data.jwt_token);

//       history.replace("/main");
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

//   const validate = (ev: Event, type: string) => {
//     const value = (ev.target as HTMLInputElement).value;
//     setIsValid(undefined);

//     if (value === "") return;

//     if (type === "login_email") {
//       validateEmail(value) === true ? setIsEmailValid(true) : setIsEmailValid(false);
//     }
//     if (type === "login_password") {
//       validatePassword(value) === true ? setIsPasswordValid(true) : setIsPasswordValid(false);
//     }
//   };

//   const markTouched = () => {
//     setIsTouched(true);
//   };

//   useEffect(() => {
//     if (isEmailValid !== undefined && isPasswordValid !== undefined) {
//       setIsFormValid(isEmailValid && isPasswordValid);
//     }
//   }, [isEmailValid, isPasswordValid]);


//   return (
//     <IonPage>
//       {/* alert 경고창 */}
//       <IonAlert
//         isOpen={isAlertOpen}
//         header={alertHeader}
//         subHeader={alerSubHeader}
//         message={alertMessage}
//         buttons={["확인"]}
//         onDidDismiss={() => setIsAlertOpen(false)}
//       ></IonAlert>
//       <IonContent className={styles.ionContentWrap}>
//         <StatusBar />
//         <section
//           style={{
//             // height: "30%",
//             height: "146px",
//             width: "100%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             // backgroundColor: "blue",
//           }}
//         >
//           <h1>개미스쿨</h1>
//         </section>
//         <FormProvider {...form}>
//           <form
//             style={{
//               // backgroundColor: "red",
//               // height: "fit-content",
//               display: "flex",
//               flexDirection: "column",
//               gap: "38px",
//             }}
//             onSubmit={form.handleSubmit(onSubmit, onError)}
//           >
//             {/* ✅ IonItem 추가 할 수 있음. */}
//             {/* 로그인 창 */}
//             <IonItem lines="none">
//               <article
//                 style={{
//                   width: "100%",
//                   height: "100px",
//                   display: "flex",
//                   flexDirection: "column",
//                 }}
//               >
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                   }}
//                 >
//                   이메일
//                 </IonLabel>

//                 <IonInput
//                   class={`${styles.ionInputDefault}`}
//                   className={`${isEmailValid && `ion-valid`} 
//                   ${isEmailValid === false && `ion-invalid`} 
//                   `}
//                   placeholder="이메일을 입력해주세요"
//                   helperText={isEmailValid ? "" : ""} // [설명] 밑줄 밑에 나오는 설명
//                   type="email"
//                   errorText="이메일 형식을 맞춰주세요." // 에러 메시지
//                   onIonInput={(event) => validate(event, "login_email")}
//                   onIonBlur={() => markTouched()}
//                   {...register("login_email", { required: true })}
//                   // [이전] className={`${isEmailValid && `ion-valid ${styles.loginBox}`} ${
//                   //   isEmailValid === false && `ion-invalid ${styles.loginBox}`
//                   // } ${isTouched && `ion-touched ${styles.inputCustom}`}`} //  ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//                   // label="E-mail"
//                   // labelPlacement="stacked"
//                   // fill="outline"
//                 />
                
//               </article>
//             </IonItem>

//             {/* 비밀번호 창 */}
//             <IonItem lines="none">
//               <article
//                 style={{
//                   width: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   height: "100px",
//                 }}
//               >
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                   }}
//                 >
//                   비밀번호
//                 </IonLabel>

//                 <IonInput
//                   className={`${isPasswordValid && `ion-valid ${styles.loginBox}`} ${
//                     isPasswordValid === false && `ion-invalid ${styles.loginBox}`
//                   } ${isTouched && `ion-touched ${styles.loginBox}`}`} //  ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//                   // label="E-mail"
//                   // labelPlacement="stacked"
//                   // fill="outline"
//                   placeholder="비밀번호를 입력해주세요"
//                   helperText={isPasswordValid ? "" : ""} // [설명] 밑줄 밑에 나오는 설명
//                   type="password"
//                   errorText="비밀번호 형식을 맞춰주세요." // 에러 메시지
//                   onIonInput={(event) => validate(event, "login_password")}
//                   onIonBlur={() => markTouched()}
//                   {...register("login_password", { required: true })}
//                 />
//               </article>
//             </IonItem>

//             <section
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 width: "100%",
//                 padding: "18px 0",
//               }}
//             >
//               {/* 로그인 버튼 */}
//               <IonItem
//                 style={{
//                   width: "100%",
//                 }}
//                 lines="none"
//               >
//                 <div
//                   style={{
//                     width: "100%",
//                   }}
//                 >
//                   <IonButton
//                     className={isFormValid ? `${styles.loginButtonEnabled}` : `${styles.loginButtonDisabled}`}
//                     expand="block"
//                     type="submit"
//                     disabled={formState.isSubmitting || !isFormValid}
//                   >
//                     로그인
//                   </IonButton>
//                 </div>
//               </IonItem>
//             </section>
//           </form>
//         </FormProvider>

//         <section className={styles.sectionButtons}>
//           <IonButton className={styles.IonButton} size="small" fill="clear" onClick={() => history.push("/find/email")}>
//             아이디(이메일) 찾기
//           </IonButton>
//           <div className={styles.Division} />

//           <IonButton
//             className={styles.IonButton}
//             size="small"
//             fill="clear"
//             onClick={() => history.push("/find/password")}
//           >
//             비밀번호 찾기
//           </IonButton>
//           <div className={styles.Division} />
//           <IonButton
//             className={styles.IonButton}
//             size="small"
//             fill="clear"
//             onClick={() => history.push("/register/agreement")}
//           >
//             회원가입
//           </IonButton>
//           <div />
//         </section>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default AuthLoginPage;
