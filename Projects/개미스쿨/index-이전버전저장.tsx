// import React from 'react';
// import { Redirect, Route } from 'react-router-dom';
// import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
// import { IonReactRouter } from '@ionic/react-router';
// import { home, list } from 'ionicons/icons';
// import HomePage from '../Home';
// import BoardPage from '../../Board';
// import ChatPage from '../../Chat';

// const MainTabs: React.FC = () => (
//   <IonReactRouter>
//     <IonTabs>
//       <IonRouterOutlet>
//         <Route path="/main/home" component={HomePage} exact={true} />
//         <Route path="/board" render={() => <BoardPage />} exact={true} />
//         <Route path="/chat" component={ChatPage} exact={true} />
//         <Route path="/main" render={() => <Redirect to="/main/home" />} exact={true} />
//       </IonRouterOutlet>

//       <IonTabBar slot="bottom">
//         <IonTabButton tab="home" href="/main/home">
//           <IonIcon icon={home} />
//           <IonLabel>Home</IonLabel>
//         </IonTabButton>
//         <IonTabButton tab="board" href="/board">
//           <IonIcon icon={list} />
//           <IonLabel>게시판</IonLabel>
//         </IonTabButton>
//         <IonTabButton tab="list" href="/chat">
//           <IonIcon icon={list} />
//           <IonLabel>채팅</IonLabel>
//         </IonTabButton>
//       </IonTabBar>
//     </IonTabs>
//   </IonReactRouter>
// );

// export default MainTabs;