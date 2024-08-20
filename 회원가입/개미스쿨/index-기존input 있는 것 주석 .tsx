// import React, { useEffect, useState } from "react";
// import styles from "./register.module.css";
// import { FormProvider, useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";

// import UserService from "@/src/services/UserService";

// import {
//   IonButton,
//   IonContent,
//   IonHeader,
//   IonInput,
//   IonPage,
//   IonTitle,
//   IonItem,
//   IonToolbar,
//   useIonToast,
//   IonAlert,
//   IonLabel,
// } from "@ionic/react";
// import {
//   validateAuthCodePattern,
//   validateEmail,
//   validateName,
//   validateNickname,
//   validatePassword,
//   validatePhone,
// } from "@/src/lib/valid";
// import AuthService from "@/src/services/AuthService";

// import StatusBar from "@/src/components/StatusBar";
// import TitleSection from "@/src/pages/Auth/Register/Agreement/_components/TitleSection";
// import SubTitleSection from "@/src/pages/Auth/Register/Agreement/_components/SubTitleSection";
// import InputItem from "@/src/pages/Auth/Register/_components/InputItem";

// type RegisterFormData = {
//   name: string;
//   email: string;
//   credential1: string;
//   phone: string;
//   password: string;
//   passwordConfirm: string;
//   nickname: string;
//   credential2: string;
// };

// const AuthRegisterPage: React.FC = () => {
//   const [isTouched, setIsTouched] = useState(false);
//   const [isValid, setIsValid] = useState<boolean>();
//   const [isEmailValid, setIsEmailValid] = useState<boolean>();
//   const [isNameValid, setIsNameValid] = useState<boolean>();
//   const [isAuthCodeValid, setIsAuthCodeValid] = useState<boolean>();
//   const [isAuthCodePatternValid, setIsAuthCodePatternValid] = useState<boolean>();
//   const [isPhoneValid, setIsPhoneValid] = useState<boolean>();
//   const [isPasswordValid, setIsPasswordValid] = useState<boolean>();
//   const [isPasswordConfirmValid, setIsPasswordConfirmValid] = useState<boolean>();
//   const [isPasswordConfirmPatternValid, setIsPasswordConfirmPatternValid] = useState<boolean>(false);
//   const [isPasswordConfirmMatchValid, setIsPasswordConfirmMatchValid] = useState<boolean>(false);
//   const [isNicknameValid, setIsNicknameValid] = useState<boolean>();
//   const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
//   const [alertHeader, setAlertHeader] = useState<string>("");
//   const [alerSubHeader, setAlertSubHeader] = useState<string>("");
//   const [alertMessage, setAlertMessage] = useState<string>("");
//   const [authCodeButtonOpen, setAuthCodeButtonOpen] = useState<boolean>(false);

//   const [emailCredential, setEmailCredential] = useState<string>("");

//   const [present] = useIonToast(); // [TODO] ALERT 창으로 변경
//   const history = useHistory();
//   const [query, setQuery] = useState(new URLSearchParams(location.search));

//   const handleLogin = () => {
//     history.push("/main");
//   };

//   const form = useForm<RegisterFormData>({
//     mode: "onChange",
//     defaultValues: {
//       name: "",
//       email: "",
//       credential1: "",
//       phone: "",
//       password: "",
//       passwordConfirm: "",
//       nickname: "",
//       credential2: "",
//     },
//     shouldFocusError: false,
//   });

//   const { formState, register, getValues, setValue } = form;
//   const onSubmit = async (formData: any) => {
//     try {
//       const response = await UserService.postRegister(formData);
//       const { data } = response.data;
//     } catch (e: any) {
//       // 토스트로 보여줄 내용들
//       present({
//         message: e.response.data.message,
//         duration: 1000,
//         position: "bottom",
//       });
//     }
//   };

//   const onError = (error: any) => {
//     const key = Object.keys(error)[0];
//     console.log(error[key].message);
//   };

//   const validatePasswordConfirm = (passwordConfirm: string) => {
//     const firstPassword = form.getValues("password"); // 1차 비밀번호 가져오기
//     const isPatternValid = validatePassword(passwordConfirm); // 비밀번호 형식 유효성 검사
//     const isMatchValid = firstPassword === passwordConfirm; // 비밀번호 일치 여부 확인

//     setIsPasswordConfirmPatternValid(isPatternValid);
//     setIsPasswordConfirmMatchValid(isMatchValid);

//     return isPatternValid && isMatchValid;
//   };

//   // 전체 form 필드 유효성 검사
//   const validate = (ev: Event, type: string) => {
//     const value = (ev.target as HTMLInputElement).value;
//     setIsValid(undefined);

//     if (value === "") return;

//     if (type === "name") {
//       validateName(value) === true ? setIsNameValid(true) : setIsNameValid(false);
//     }
//     if (type === "email") {
//       validateEmail(value) === true ? setIsEmailValid(true) : setIsEmailValid(false);
//     }
//     if (type === "credential1") {
//       validateAuthCodePattern(value) === true ? setIsAuthCodePatternValid(true) : setIsAuthCodePatternValid(false);
//     }
//     if (type === "phone") {
//       validatePhone(value) === true ? setIsPhoneValid(true) : setIsPhoneValid(false);
//     }
//     if (type === "password") {
//       validatePassword(value) === true ? setIsPasswordValid(true) : setIsPasswordValid(false);
//     }
//     if (type === "passwordConfirm") {
//       validatePasswordConfirm(value) === true ? setIsPasswordConfirmValid(true) : setIsPasswordConfirmValid(false);
//     }
//     if (type === "nickname") {
//       validateNickname(value) === true ? setIsNicknameValid(true) : setIsNicknameValid(false);
//     }
//   };

//   // 인증코드 보내기
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

//   // 인증코드 확인
//   const checkAuthCode = async (authCode: any) => {
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
//         setValue("credential2", credential2);

//         setIsAlertOpen(true); // alert창 띄우기
//         setAlertHeader("인증메일");
//         setAlertMessage("메일 인증이 완료되었습니다.");
//         setIsAuthCodeValid(true);
//       }
//     } catch (e: any) {
//       setIsAlertOpen(true); // alert창 띄우기
//       setAlertHeader("인증메일");
//       setAlertMessage(e.response.data.message); // 백엔드에서 보내주는 에러 메시지
//     }
//   };

//   const markTouched = () => {
//     setIsTouched(true);
//   };

//   // 약관 동의가 안 되어 있으면 돌려보내기 ex) 약관동의 안 통하고, url 로 /register 쳐서 들어온 경우
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const notAgreed = params.get("agreement") !== "y"; // 약관 통해서 오면 'agreement=y' 가 되게 설정함. 이 이외의 경우는 약관 동의를 거치게 함

//     if (notAgreed) {
//       setIsAlertOpen(true); // alert창 띄우기
//       setAlertHeader("약관");
//       setAlertMessage("정보동의가 필요합니다.");
//       history.replace("/register/agreement");
//     }
//   }, [window.location.search]);

//   return (
//     <IonPage>
//       <StatusBar />
//       <TitleSection title="회원가입" />
//       <SubTitleSection fontWeight="400" title="회원가입 페이지 입니다." />

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
//               {/* --------- 이름 --------- */}
//               <article className={`${styles.inputWrapDefault} ${isNameValid === false && styles.inputWrapDisabled}  `}>
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   이름
//                 </IonLabel>
//                 <IonInput
//                   class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                   className={` 
//                   ${isNameValid && `${styles.ionInputValid}`} 
//                   ${isNameValid === false && "ion-invalid"} 
//                   ${isTouched && "ion-touched"}
//                 `}
//                   placeholder="이름을 입력해주세요."
//                   // helperText={isNameValid ? "valid name" : "Enter a valid NAME"} // [설명] 밑줄 밑에 나오는 설명
//                   type="text"
//                   errorText={`${isNameValid == false && "이름은 15글자 미만📛📛"}`} // 에러 메시지
//                   onIonInput={(event) => validate(event, "name")}
//                   onIonBlur={() => markTouched()}
//                   {...register("name", { required: true })}
//                 />
//               </article>

//               {/* --------- 이메일 : 📛 형식에 맞지 않아서, '인증코드' 것을 가져와야 함--------- */}
//               <article className={`${styles.inputWrapDefault} ${isNameValid === false && styles.inputWrapDisabled}  `}>
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
//                   }}
//                 >
//                   이메일주소
//                 </IonLabel>

//                 <div style={{
//                     width: "100%",
//                     height: "100px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                 }}>
//                   <IonInput
//                     class={`${styles.ionInputDefault}`}
//                     className={`${isEmailValid && `${styles.ionInputValid}`} 
//                   ${isEmailValid === false && "ion-invalid"} ${isTouched && "ion-touched"}`} // [✅TODO] 디자인 수정 필요 | ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//                     placeholder="이메일 주소"
//                     type="email"
//                     errorText="이메일 형식을 맞춰주세요👍👍" // 에러 메시지
//                     onIonInput={(event) => validate(event, "email")}
//                     onIonBlur={() => markTouched()}
//                     {...register("email", { required: true })}
//                   />

//                   <IonButton
//                     type="button"
//                     // disabled 조건 체크
//                     disabled={!isEmailValid}
//                     onClick={() => sendAuthCode(getValues("email"))}
//                   >
//                     인증메일 보내기
//                   </IonButton>
//                 </div>

//                 {/* ---------------  */}

//                 {/* <IonInput
//                   type="email"
//                   errorText={!isEmailValid ? "이메일 형식에 맞춰주세요." : ""} // 에러 메시지
//                   onIonInput={(event) => validate(event, "email")}
//                   onIonBlur={() => markTouched()}
//                   {...register("email", { required: true })}
//                 /> */}

//                 {/* <IonInput
//                   class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                   className={`${isEmailValid && `${styles.ionInputValid}`} 
//                   ${isEmailValid === false && "ion-invalid"} 
//                   ${isTouched && `${styles.ionInputTouched}`}
//                   `}
//                   placeholder="이메일을 입력해주세요."
//                   // helperText={isEmailValid ? "valid email" : "Enter a valid EMAIL"} // [설명] 밑줄 밑에 나오는 설명
//                   type="email"
//                   errorText={!isEmailValid ? "이메일 형식에 맞춰주세요." : ""} // 에러 메시지
//                   onIonInput={(event) => validate(event, "email")}
//                   onIonBlur={() => markTouched()}
//                   {...register("email", { required: true })}
//                 /> */}
//                 {/* <IonButton
//                   // className={`${styles.ionDefaultButton}`}
//                   type="button"
//                   // disabled 조건 체크
//                   disabled={!isEmailValid}
//                   onClick={() => sendAuthCode(getValues("email"))}
//                 >
//                   인증메일 전송
//                 </IonButton> */}
//               </article>

//               {/* ------- 인증코드 ------- */}
//               <article className={`${styles.inputWrapDefault} ${isNameValid === false && styles.inputWrapDisabled}  `}>
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
                    
//                   }}
//                 >
//                   인증코드
//                 </IonLabel>
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "100px",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   <IonInput
//                     class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                     className={`${isAuthCodePatternValid && "ion-valid"} ${
//                       isAuthCodePatternValid === false && "ion-invalid"
//                     } ${isTouched && "ion-touched"}`} // [✅TODO] 디자인 수정 필요 | ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//                     // label="Outline input" // [✅TODO] 디자인 수정 필요
//                     // labelPlacement="floating" // [✅TODO] 디자인 수정 필요
//                     // fill="solid" // [✅TODO] 디자인 수정 필요
//                     placeholder="인증코드 입력"
//                     // helperText={isAuthCodePatternValid ? "valid 인증번호(작성성공)🔵" : "(작성중) Enter a valid 인증번호"} // [설명] 밑줄 밑에 나오는 설명
//                     type="text"
//                     errorText="인증번호 형식을 맞춰주세요 📛📛" // 에러 메시지
//                     onIonInput={(event) => validate(event, "credential1")}
//                     onIonBlur={() => markTouched()}
//                     {...register("credential1", { required: true })}
//                   />
//                   <IonButton
//                     type="button"
//                     // disabled 조건 체크
//                     disabled={!authCodeButtonOpen || isAuthCodeValid} // [✅TODO] 인증번호 확인 켜지는 순간이 인증메일 보내고 받았을 때!
//                     onClick={() => checkAuthCode(getValues("credential1"))}
//                   >
//                     {isAuthCodeValid ? "인증 완료" : "인증코드 확인"}
//                   </IonButton>
//                 </div>
//               </article>

//               {/* ------ 휴대폰 번호 ------ */}
//               <article className={`${styles.inputWrapDefault} ${isNameValid === false && styles.inputWrapDisabled}  `}>
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   휴대폰번호
//                 </IonLabel>

//                 <IonInput
//                   class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                   className={`${isPhoneValid && `${styles.ionInputValid}`} ${
//                     isPhoneValid === false && "ion-invalid"
//                   } ${isTouched && "ion-touched"}`}
//                   placeholder="'-' 없이 입력해주세요."
//                   // helperText={isPhoneValid ? "valid 휴대폰번호(인증성공)🔵" : "(작성중) Enter a valid 휴대폰번호"} // [설명] 밑줄 밑에 나오는 설명
//                   type="tel"
//                   errorText="휴대폰 형식에 맞춰 기입해주세요." // 에러 메시지 | 백엔드에서 요구하는 형식에 따라 변경 필요함
//                   onIonInput={(event) => validate(event, "phone")}
//                   onIonBlur={() => markTouched()}
//                   {...register("phone", { required: true })}
//                 />
//               </article>

//               {/* ------ 비밀번호 ------ */}
//               <article className={`${styles.inputWrapDefault} ${isNameValid === false && styles.inputWrapDisabled}  `}>
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   비밀번호
//                 </IonLabel>
//                 <IonInput
//                   class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                   className={`${isPasswordValid && `${styles.ionInputValid}`} ${
//                     isPasswordValid === false && "ion-invalid"
//                   } ${isTouched && "ion-touched"}`}
//                   placeholder="비밀번호"
//                   // helperText={isPasswordValid ? "valid 비밀번호(인증성공)🔵" : "(작성중) Enter a valid 비밀번호"} // [설명] 밑줄 밑에 나오는 설명
//                   type="password"
//                   errorText="영문자, 숫자, 특수문자를 포함한 8~20자의 비밀번호를 입력해주세요" // 에러 메시지
//                   onIonInput={(event) => validate(event, "password")}
//                   onIonBlur={() => markTouched()}
//                   {...register("password", { required: true })}
//                 />
//               </article>

//               {/* ------ 비밀번호 확인 ------ */}
//               <article className={`${styles.inputWrapDefault} ${isNameValid === false && styles.inputWrapDisabled}  `}>
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   비밀번호 확인
//                 </IonLabel>
//                 <IonInput
//                   class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                   className={`${isPasswordConfirmValid && `${styles.ionInputValid}`} 
//                 ${isPasswordConfirmValid === false && "ion-invalid"} 
//                 ${isTouched && "ion-touched"}`} // [✅TODO] 디자인 수정 필요 | ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//                   placeholder="비밀번호 확인"
//                   // helperText={
//                   //   isPasswordConfirmPatternValid && isPasswordConfirmMatchValid
//                   //     ? "valid 비밀번호 확인(인증성공)🔵"
//                   //     : "(작성중) Enter a valid 비밀번호 확인"
//                   // } // [설명] 밑줄 밑에 나오는 설명
//                   type="password"
//                   errorText={
//                     !isPasswordConfirmPatternValid
//                       ? "영문자, 숫자, 특수문자를 포함한 8~20자의 비밀번호를 입력해주세요 📛📛"
//                       : !isPasswordConfirmMatchValid
//                         ? "비밀번호가 일치하지 않습니다 📛📛"
//                         : ""
//                   } // 에러 메시지
//                   onIonInput={(event) => validate(event, "passwordConfirm")}
//                   onIonBlur={() => markTouched()}
//                   {...register("passwordConfirm", { required: true })}
//                 />
//               </article>

//               {/* ------ 닉네임 ------ */}
//               <article className={`${styles.inputWrapDefault} ${isNameValid === false && styles.inputWrapDisabled}  `}>
//                 <IonLabel
//                   style={{
//                     fontWeight: "600",
//                     fontSize: "15px",
//                     marginBottom: "8px",
//                   }}
//                 >
//                   닉네임
//                 </IonLabel>
//                 <IonInput
//                   class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                   className={`${isNicknameValid && `${styles.ionInputValid}`} ${
//                     isNicknameValid === false && "ion-invalid"
//                   } ${isTouched && "ion-touched"}`} // [✅TODO] 디자인 수정 필요 | ❓ 이거 ion-touched 이거에 대한 CSS 정의는 어딨지?
//                   // label="Outline input" // [✅TODO] 디자인 수정 필요
//                   // labelPlacement="floating" // [✅TODO] 디자인 수정 필요
//                   // fill="solid" // [✅TODO] 디자인 수정 필요
//                   placeholder="닉네임"
//                   // helperText={isNicknameValid ? "valid 닉네임(인증성공)🔵" : "(작성중) Enter a valid 닉네임"}
//                   type="text"
//                   errorText={"닉네임 형식에 맞지 않습니다."} // 에러 메시지
//                   onIonInput={(event) => validate(event, "nickname")}
//                   onIonBlur={() => markTouched()}
//                   {...register("nickname", { required: true })}
//                 />
//               </article>

//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "center",
//                 }}
//               >
//                 <IonButton
//                   className={`${styles.ionBottomButton}   ${styles.ionBottomCancelBtn}`}
//                   expand="block"
//                   type="button"
//                   onClick={() => history.replace("/login")}
//                 >
//                   취소
//                 </IonButton>
//                 <IonButton
//                   className={`${styles.ionBottomButton} ${styles.ionBottomRegisterBtn}`}
//                   expand="block"
//                   type="submit"
//                   disabled={formState.isSubmitting || !formState.isValid}
//                   // type이 'submit'인 button 이 모든 FORM 필드를 제어 | '모든 FORM 필드'상태를 formState로 확인 | '모든 FORM 필드' 가 OK 되어야 변경됨
//                 >
//                   회원가입
//                 </IonButton>
//               </div>
//             </section>
//           </form>
//         </FormProvider>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default AuthRegisterPage;
