// // pages/FindEmailPage.tsx
// import React from "react";
// import { IonPage, IonContent } from "@ionic/react";
// import StatusBar from "@/src/components/StatusBar";
// import TitleSection from "@/src/pages/Auth/Register/Agreement/_components/TitleSection";
// import SubTitleSection from "@/src/pages/Auth/Register/Agreement/_components/SubTitleSection";
// import FindPasswordForm from "@/src/pages/Find/Password/_components/FindPasswordForm";
// import styles from "./password.module.css";
// import { useHistory } from "react-router";

// /* 1. FindEmailPage 역할 
//       1.1 layout : IonPage, status bar, title, subTitle, IonContent 는 layout 을 구성
//       1.2 Rendering : FindPasswordForm 컴포넌트를 렌더링

//   2. FindPasswordForm 역할 
//       2.1 Form Management 
//         1) react-hook-form 을 사용
//         2) form state 초기화,   
//         3) API CALL : form 제출시 api 호출

//   3. 자식 컴포넌트 역할
//       3.1 개별적인 유효성 검사
//       3.2 UI LOGIC : '상태변수' 에 따른 UI 처리를 담당 
//         - 기본 상태 : 작성전 상태 
//         - 작성 중 상태 : 컨트롤 하지 않음 
//         - 작성 ERROR 상태 : 에러 색상 
//         - 작성 SUCCESS 상태 : 검은색으로 다룸 (📛다만, 기본 상태랑 구분이 잘 안 됨)

//   4. 이렇게 정리된 역할에 따라서, 다른 컴포넌트 제작

// */


// const FindEmailPage: React.FC = () => {
//   const history = useHistory();

//   return (
//     <IonPage>

//       <StatusBar />
//       <TitleSection title="비밀번호 찾기">
//         <div onClick={() => history.goBack()} className={styles.chevronBack} />
//       </TitleSection>
//       <SubTitleSection fontWeight="400" title="비밀번호 찾기 페이지 입니다." />
      
//       <IonContent className="ion-padding">
//         <FindPasswordForm />
//       </IonContent>

//     </IonPage>
//   );
// };

// export default FindEmailPage;
