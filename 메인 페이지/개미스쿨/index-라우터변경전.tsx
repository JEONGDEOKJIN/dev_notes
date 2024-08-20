// import React from "react";
// import { Redirect, Route } from "react-router-dom";
// import {
//   IonTabs,
//   IonRouterOutlet,
//   IonTabBar,
//   IonTabButton,
//   IonIcon,
//   IonLabel,
//   IonHeader,
//   IonTitle,
//   IonToolbar,
//   IonContent,
//   IonItem,
//   IonBadge,
//   IonAvatar,
//   IonButton,
// } from "@ionic/react";
// import { IonReactRouter } from "@ionic/react-router";
// import styles from "./main.module.css";
// import {
//   boatSharp,
//   chatbox,
//   home,
//   list,
//   menu,
//   logoApple,
//   settingsSharp,
// } from "ionicons/icons";

// import BoardPage from "../../Board";
// import ChatPage from "../../Chat";
// import AllMenuPage from "../../AllMenu";
// import Quiz from "../_components/Quiz";
// import RecentStocks from "../_components/RecentStocks";
// import RecentBoards from "../_components/RecentBoards";
// import ScrollTest from "../_components/ScrollTest";

// const MainTabs: React.FC = () => (
//   <IonReactRouter>
//     <IonHeader>
//       <IonToolbar>
//         <IonItem>
//           <IonAvatar aria-hidden="true" slot="start">
//             <img alt="로고" src="/favicon.png" />
//           </IonAvatar>

//           <IonLabel>개미스쿨</IonLabel>

//           <div className={styles.alarmWrap}>
//             <IonIcon
//               className={styles.alarmIcon}
//               icon={boatSharp}
//               color="primary"
//             ></IonIcon>
//             {/* <div className={styles.alarmIcon} >아이콘</div> */}
//             <div className={styles.alarm}>1</div>
//           </div>

//           {/* 마이페이지 */}
//           <IonAvatar aria-hidden="true" slot="end">
//             <img
//               alt="프로필이미지"
//               src="https://ionicframework.com/docs/img/demos/avatar.svg"
//             />
//           </IonAvatar>
//         </IonItem>
//       </IonToolbar>
//     </IonHeader>
//     <IonContent>
//       <main className={styles.mainWrap}>
//         <Quiz />
//         {/* <ScrollTest /> */}
//         <RecentBoards/>
//         <RecentStocks/>
//         <RecentBoards/>
//         <RecentBoards/>
//         <RecentBoards/>
//         <RecentBoards/>
//         <article>최근지수</article>
//         <article>캘린더</article>
//       </main>
//     </IonContent>

//     <IonTabs>
//       <IonRouterOutlet>
//         <Route path="/board" component={BoardPage} exact={true} />
//         <Route path="/chat" component={ChatPage} exact={true} />
//         <Route path="/allMenu" render={() => <AllMenuPage />} exact={true} />
//       </IonRouterOutlet>
//       <IonTabBar slot="bottom">
//         <IonTabButton tab="home" href="/main">
//           <IonIcon icon={home} />
//           <IonLabel>Home</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="board" href="/board">
//           <IonIcon icon={boatSharp} />
//           <IonLabel>게시판</IonLabel>
//         </IonTabButton>

//         <IonTabButton tab="chat" href="/chat">
//           <IonIcon icon={chatbox} />
//           <IonLabel>채팅</IonLabel>
//         </IonTabButton>
//         <IonTabButton tab="allMenu" href="/allMenu">
//           <IonIcon icon={menu} />
//           <IonLabel>전체 메뉴</IonLabel>
//         </IonTabButton>
//       </IonTabBar>
//     </IonTabs>
//   </IonReactRouter>
// );

// export default MainTabs;
