// import React, { useState } from "react";
// import styles from "./password.module.css";
// import { FormProvider, useForm } from "react-hook-form";
// import { useHistory } from "react-router-dom";

// import { IonButton, IonLabel, IonContent, IonInput, IonPage, IonText, IonAlert } from "@ionic/react";
// import AuthService from "@/src/services/AuthService";
// import { validateAuthCodePattern, validateEmail, validateName } from "@/src/lib/valid";
// import StatusBar from "@/src/components/StatusBar";
// import TitleSection from "../../../Auth/Register/Agreement/_components/TitleSection";
// import SubTitleSection from "../../../Auth/Register/Agreement/_components/SubTitleSection";
// import useAlert from "@/src/lib/hooks/useAlert";
// import { s } from "vitest/dist/reporters-5f784f42";
// import NameInput from "../_components/NameInput";
// import EmailInput from "../_components/EmailInput";
// import AuthCodeInput from "../_components/AuthCodeInput";
// import FindPasswordForm from "../_components/FindPasswordForm";

// /* FindEmailPage 리팩토링 포인드 
//   1. useAlert 커스텀 훅 사용
//   2. 이메일 input, 비밀번호 input 을 컴포넌트로 분리
//     - 컴포넌트로 분리할 때, 1) 각 어떤 역할을 하는지 2) presentational , container 의 구분 
// */

// type FindPasswordFormData = {
//   findPassword_name: string;
//   findPassword_email: string;
//   findPassword_authCode: string;
// };

// const FindEmailPage: React.FC = () => {
//   const history = useHistory();
//   const {
//     isAlertOpen,
//     alertHeader,
//     alerSubHeader,
//     alertMessage,
//     showAlert,
//     setIsAlertOpen,
//     setAlertHeader,
//     setAlertMessage,
//   } = useAlert();
//   //  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
//   // const [alertHeader, setAlertHeader] = useState<string>("");
//   // const [alerSubHeader, setAlertSubHeader] = useState<string>("");
//   // const [alertMessage, setAlertMessage] = useState<string>("");

//   const form = useForm<FindPasswordFormData>({
//     mode: "onChange",
//     defaultValues: {
//       findPassword_name: "",
//       findPassword_email: "",
//       findPassword_authCode: "",
//     },
//     shouldFocusError: false,
//   });
//   const { formState, register, getValues, setValue } = form;
//   const [isAuthCodeValid, setIsAuthCodeValid] = useState<boolean>();
//   const [authCodeErrorMessage, setAuthCodeErrorMessage] = useState<string>("");

//   // ------ 우선 아래것은 사용 안 됨 -------
//   const [isTouched, setIsTouched] = useState(false);
//   const [isValid, setIsValid] = useState<boolean>();
//   const [isEmailValid, setIsEmailValid] = useState<boolean>();
//   const [isNameValid, setIsNameValid] = useState<boolean>();
//   const [isAuthCodePatternValid, setIsAuthCodePatternValid] = useState<boolean>();
//   const [authCodeButtonOpen, setAuthCodeButtonOpen] = useState<boolean>(false);
//   const [emailCredential, setEmailCredential] = useState<string>("");

//   const handleLogin = () => {
//     history.push("/main");
//   };

//   const onSubmit = async (formData: any) => {
//     try {
//       const response = await AuthService.postUserFindPasswordResult(formData);
//       const { data } = response.data;
//     } catch (e: any) {
//       showAlert("로그인", e.response.data.message);
//       // [차이점] 아래의 3줄을 쓰는 대신, 하나의 함수로
//       // setIsAlertOpen(true); // alert 창 열기
//       // setAlertHeader("로그인");
//       // setAlertMessage(e.response.data.message); // 백엔드에서 보내주는 에러 메시지
//     }
//   };

//   const onError = (error: any) => {
//     const key = Object.keys(error)[0];
//     console.log(error[key].message);
//   };

//   const markTouched = () => {
//     // 현재 사용은 안 하지만, 남겨두기
//     setIsTouched(true);
//   };

//   // 인증코드 보내기 (✅✅ 이게 반복됨 | refactor 커스텀 훅으로 만드나? )
//   const sendAuthCode = async (email: any) => {
//     if (!email) {
//       showAlert("인증", "이메일을 입력해주세요");
//       return;
//     }

//     if (!validateEmail(email)) {
//       showAlert("인증 메일", "올바르지 않는 메일주소 입니다.");
//     }

//     try {
//       const response = await AuthService.postUserRegisterEmail({ email });
//       console.log("sendAuthCode response👉", response);
//       const { credential } = response.data.data;

//       if (credential) {
//         setEmailCredential(credential); // [✅TODO] credential값을 백엔드로 부터 받음. 암호화된 값인가?
//         setAuthCodeButtonOpen(true); // 인증번호 확인 버튼 활성화
//         showAlert("인증메일", "인증코드를 메일로 보냈습니다.");
//       }
//     } catch (e: any) {
//       showAlert("인증메일", e.response.data.message);
//     }
//   };

//   // 인증코드 확인 (✅✅ 이게 반복됨 | refactor 커스텀 훅으로 만드나? )
//   const checkAuthCode = async (authCode: any) => {
//     alert("임시로 검증 true 처리");
//     setIsAuthCodeValid(true);

//     // 사용자가 기재한 인증번호 가져오기
//     console.log("인증번호 확인 버튼 클릭 시, 사용자가 기재한 인증번호 : ", authCode);
//     try {
//       const response = await AuthService.postUserRegisterEmailResult({
//         auth_code: authCode,
//         credential: emailCredential, // 이메일 인증 요청할 때, credential 값을 받음
//       });

//       if (response.data.code === 200) {
//         // credential2 값 받고 -> 상태 변수 저장 -> 이걸, 회원가입 때 보내기
//         const { credential2 } = response.data.data;
//         setValue("findPassword_authCode", credential2);
//         showAlert("인증메일", "메일 인증이 완료되었습니다.");
//         setIsAuthCodeValid(true);
//       }
//     } catch (e: any) {
//       setAuthCodeErrorMessage(e.response.data.message);
//     }
//   };

//   // 전체 form 필드 유효성 검사 (이게 어디로 간거지❓❓❓❓❓)
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
//       <StatusBar /> {/* ❓❓ 리팩토링에서는 이게 없는데, 그럼 어디로 간거지? | 우선, 레이아웃은 필요하다고 생각은 함 */}
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
//               {/* 1. 이름 | ⭐⭐ 이 부분이 이제, component 로 바뀜 */}
//               <NameInput />
//               {/* 이것만 있는데, 왜 동작하는거지?
//                     1) input 에 이름을 넣음 -> NameInput 안에 있는 validate 함수가 동작함 -> useValidation 훅으로 감
//                     2) name 필드에 맞는 검증을 거침 -> isEmailValid 을 업데이트 함
//                     3) NameInput 컴포넌트는 상태변수가 변경되었으므로 -> re-render 한다.
//                     4) react-hook-form 의 useFormContext 안에 있는 register 에 의해서 'IonInput' 필드의 값 중 'findPassword_name' 키에 대응하는 값이 업데이트 된다. 
//                       - 이때, 해당 키에 바인딩 되는 값은, IonInput 의 value 값이 되도록, 자동으로 설정되어 있음.
//                       - 포인트는 input 컴포넌트를 NameInput 컴포넌트가 들고 있는데, react-hook-form 을 통해, 페이지를 넘나들게 된다는 것. ⭐⭐⭐ 
//                       - 한번 더 생각하면, useFormContext 를 전역 상태 관리라고 생각하면, 페이지가 분리되었어도, 해당 key 값이 업데이트 될 수 있다고 여겨짐.
//               */}

//               {/* 2. 이메일 */}
//               <EmailInput sendAuthCode={sendAuthCode} />
//                 {/* [📛 왜 sendAuthCode 를 보내게 되는거지. 왜 위에꺼랑 다른거지]
//                     - sendAuthCode 기능 : 사용자가 입력한 email 을 받아서 -> api 태운다 -> 그러면, 해당 email 로 인증코드가 간다. 
//                     - 그러면, sendAuthCode 함수는 왜 EmailInput 이 컴포넌트에서 호출을 안 하고, props 로 내려준거지? ⭐⭐⭐⭐⭐ 
//                       1) import 하는 것도 가능은 한가? 아마 가능은 할 것 임
//                       2) 그러면, 왜 이렇게 하는거지?
//                         - 단일 책임 원칙의 관점 
//                           - EmailInput 의 역할은 1) react-hook-form 을 통한 input 값 관리 2) 유효성 검사 
//                           - sendAuthCode 역할은 'api call'
//                         - centralizes the logic for API interactions 관점 
//                           - api 통신 관련 로직을 부모 컴포넌트에 모아둔다. -> 그러면, 변경이 생겼을 때, 쉽게 관리할 수 있다.
//                           - 그러면, EmailInput 컴포넌트는 presentational 기능에 충실할 수 있음 (presentational component focused on UI logic 할 수 있음.) (📛📛📛📛📛📛) 
//                 */}

//                   {/* [이전 코드] */}
//                   {/* <article className={`${styles.inputWrapDefault}`}>
//                       <IonLabel
//                         style={{
//                           fontWeight: "600",
//                           fontSize: "15px",
//                           marginBottom: "3px",
//                         }}
//                       >
//                         이메일주소
//                       </IonLabel>
//                       <div
//                         style={{
//                           width: "100%",
//                           // height: "100px",
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                           gap: "6px",
//                         }}
//                       >
//                         <div
//                           style={{
//                             width: "100%",
//                           }}
//                         >
//                           <IonInput
//                             class={`${styles.ionInputDefault}`}
//                             className={`${isEmailValid && `ion-valid`} 
//                             ${isEmailValid === false && "ion-invalid"} 
//                             `}
//                             placeholder="이메일 주소"
//                             type="email"
//                             // errorText="이메일 형식을 맞춰주세요" // 에러 메시지
//                             onIonInput={(event) => validate(event, "findPassword_email")}
//                             onIonBlur={() => markTouched()}
//                             {...register("findPassword_email", { required: true })}
//                           />
//                           {isEmailValid == false && <IonText className={styles.warning}>이메일 형식을 맞춰주세요.</IonText>}
//                         </div>

//                         <IonButton
//                           type="button"
//                           className={isEmailValid ? styles.ionInputValid : styles.ionInputNotValid}
//                           disabled={!isEmailValid}
//                           onClick={() => sendAuthCode(getValues("findPassword_email"))}
//                         >
//                           인증메일 전송
//                         </IonButton>
//                       </div>
//                     </article> */}

//               {/* 3. 인증 코드 */}
//               <AuthCodeInput checkAuthCode={checkAuthCode} authCodeErrorMessage={authCodeErrorMessage} />
//                   {/* 
//                     [authCodeErrorMessage 를 props 로 넘기게 된 이유]
//                       - API 통신은 부모 컴포넌트에서 관리하는 중
//                       - authCodeErrorMessage 에러메시지가 API 통신 과정(부모 컴포넌트) 에서 잡힘 
//                       - 이걸 그려주는(container) 역할을 하는AuthCodeInput 은 해당 데이터를 받을 수 밖에 없음 ⭐⭐⭐⭐⭐
//                   */}
//                       {/* [이전 코드] */}
//                         {/* <article
//                           className={`${styles.inputWrapDefault} ${isAuthCodePatternValid === false && styles.inputWrapDisabled}  `}
//                         >
//                           <IonLabel
//                             style={{
//                               fontWeight: "600",
//                               fontSize: "15px",
//                               marginBottom: "3px",
//                             }}
//                           >
//                             인증코드
//                           </IonLabel>
//                           <div
//                             style={{
//                               width: "100%",
//                               // height: "100px",
//                               display: "flex",
//                               justifyContent: "center",
//                               alignItems: "center",
//                               gap: "6px",
//                             }}
//                           >
//                             <div
//                               style={{
//                                 width: "100%",
//                               }}
//                             >
//                               <IonInput
//                                 class={`${styles.ionInputDefault}`} // 기본 default CSS 는 class | 상태 변경에 따른 동적 CSS 는 className
//                                 className={`
//                                 ${isAuthCodePatternValid && "ion-valid"} 
//                                 ${isAuthCodePatternValid === false && "ion-invalid"}                      `}
//                                 placeholder="인증코드 입력"
//                                 type="text"
//                                 onIonInput={(event) => validate(event, "findPassword_authCode")}
//                                 onIonBlur={() => markTouched()}
//                                 {...register("findPassword_authCode", { required: true })}
//                               />
//                               <IonText className={styles.warning}>
//                                 {authCodeErrorMessage.length === 0 &&
//                                   isAuthCodePatternValid == false &&
//                                   "인증번호 형식을 맞춰주세요."}
//                                 {authCodeErrorMessage.length > 0 && authCodeErrorMessage}
//                               </IonText>
//                             </div>
//                             <IonButton
//                               type="button"
//                               className={isAuthCodePatternValid ? styles.ionInputValid : styles.ionInputNotValid}
//                               disabled={!isAuthCodePatternValid}
//                               onClick={() => checkAuthCode(getValues("findPassword_authCode"))}
//                             >
//                               {isAuthCodeValid ? "인증 완료" : "인증코드 확인"}
//                             </IonButton>
//                           </div>
//                         </article> */}
              
//             </section>

//             <section
//               style={{
//                 width: "100%",
//               }}
//             >

//               {/* ------ 4. 확인 버튼 ------ */}
//               <FindPasswordForm />
//                 {/* 
//                     FindEmailPage 역할 : layout, 렌더링
//                     FindPasswordForm 역할 : form management and API logic.

//                     그러면, 'form management' 와 'API logic' 을 떼어냈다는 건데, 남아있는 부분이 있잖아? 
//                     특히, 윗 부분을 보면 
//                       1) onSubmit : 전체 form 제출 역할 
//                       2) sendAuthCode : 인증 번호 받기 위해 보내기
//                       3) checkAuthCode : 인증 번호 검증
//                       이것들이 아직 남아있어. 
//                       그러면, API 로직은, 다 떼어진게 아니라, 부모 컴포넌트에 남아있는거 아니야?
//                       그러면, FindPasswordForm 은 form 관련된 걸 다 가져가고, 부모 컴포넌트는 api 로직만 가져간건가?

//                       아니, 근데, 예제 코드는, 완전히, 다, 컴포넌트로 들고 갔네!? 
//                       그래도 돌아가나?

//                       예상이 반절만 맞았다. 
//                       모든 것을 FindPasswordForm 에 응축해 놓기에는, 레이아웃이 틀어진다.

//                       IonPage ,IonContent 모두 각각의 기능이 있다. 
//                       FindEmailPage 에서는 IonPage, Header 섹션, Content 섹션의 레이아웃이 정해진다. 
//                       이 순간, 해당 페이지의 레이아웃이 잡힌다고 보면 된다. (#layout)
//                       그러면, 
//                         1) api call, form 관리, 등은 한 곳에서 
//                         2) 그것의 결과를 보여주는 것은 UI 로직 컴포넌트가 맞게 된다. 
//                         3) 이모든 것을 container-presenter 패턴으로 정의하기는 어려울 것. 
//                           하지만, api call, form management 를 관리하는 부분 -> 그 결과를 '보여주는 ui 로직' 부분 으로 구분할 수는 있을 것.
//               */}

//                   {/* [이전코드] */}
//                   {/* <IonButton
//                     className={isAuthCodeValid ? `${styles.ionFindValid}` : `${styles.ionFindNotValid}`}
//                     disabled={!isAuthCodeValid}
//                     // className={formState.isValid ? `${styles.ionFindValid}` : `${styles.ionFindNotValid}`}
//                     // disabled={formState.isSubmitting || !formState.isValid} // 이전 검증
//                     expand="block"
//                     onClick={handleLogin}
//                   >
//                     확인
//                   </IonButton> */}



//             </section>
//           </form>
//         </FormProvider>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default FindEmailPage;
