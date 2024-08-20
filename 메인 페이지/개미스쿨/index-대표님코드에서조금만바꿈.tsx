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
// } from "@ionic/react";
// import { IonReactRouter } from "@ionic/react-router";
// import { boatSharp, chatbox, home, list, menu } from "ionicons/icons";

// import BoardPage from "../../Board";
// import ChatPage from "../../Chat";
// import AllMenuPage from "../../AllMenu";
// import ExploreContainer from "../../../components/ExploreContainer";

// const MainTabs: React.FC = () => (
//   <IonReactRouter>



//     <IonTabs>
//       <IonRouterOutlet>
//         <Redirect exact path="/" to="/main/" />
//         <Route path="/main" render={() => <MainTabs />} exact={true} />
//         <Route path="/board" render={() => <BoardPage />} exact={true} />
//         <Route path="/chat" render={() => <ChatPage />} exact={true} />
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
