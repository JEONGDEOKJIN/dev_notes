// import React, { useState } from 'react';
// import styles from './login.module.css'
// import { FormProvider, useForm } from "react-hook-form";
// import { useHistory } from 'react-router-dom';

// import Jwt from "../../../../lib/jwt";
// import AuthService from '../../../../services/AuthService';

// import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';

// type LoginFormData = {
// 	login_email: string;
// 	login_password: string;
// };


// const LoginPage: React.FC = () => {
//   const [present] = useIonToast();
//   const history = useHistory();

// 	const form = useForm<LoginFormData>({
// 		mode: "onChange",  // 변경될 때 유효성 검사
// 		defaultValues: {
// 			login_email: "",
// 			login_password: "",
// 		},
// 		shouldFocusError: false,
// 	});

// 	const { formState, register } = form;
//   const onSubmit = async (formData: any) => {    
// 		try {
// 			const response = await AuthService.userLogin(formData);
//       const {data} = response.data;
      
//       Jwt.saveAccessToken(data.jwt_token); 
//         // 로컬스토리지에 저장. 
//         // 이건 interceptor 이용은 안 하는 건가? 

//       history.replace('/main');      
// 		} catch (e: any) {

//       // 토스트로 보여줄 내용들
//       present({
//         message: e.response.data.message,
//         duration: 1000,
//         position: 'bottom',
//       });
// 		}
//   };

// 	const onError = (error: any) => {
// 		const key = Object.keys(error)[0];
//     console.log(error[key].message);
// 	};

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Login</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent className="ion-padding">
//         <FormProvider {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit, onError)}>
//             <IonInput placeholder="Username" {...register("login_email", { required: true })} />
//             {/*  ...register("login_email") : 이 입력 필드 이름을 'login_email' 로 설정 
//                 { required: true } : 해당 입력필드를 '필수값' 으로 설정
//                 ... 스프레드 연산자 : 반환된 객체의 속성이 IonInput 컴포넌트에 전달됨. | 이게 만약 없다면? ❓❓❓ 
//                 이렇게 되면, form 객체 안으로 들어가게 되고 -> form 객체 내부의 메서드를 활용해서 상태 검사, 유효성 검사, 에 연결될 수 있음. 

//                 이렇게 아래 처럼 된다. 
//                 <IonInput 
//                   placeholder="Username" 
//                   onChange={registration.onChange} 
//                   onBlur={registration.onBlur} 
//                   name={registration.name} 
//                   ref={registration.ref}
//                 />
//             */}
//             <IonInput placeholder="Password" {...register("login_password", { required: true })} type="password" />
//             <IonButton expand="block" type='submit' disabled={formState.isSubmitting || !formState.isValid}>login</IonButton>
//           </form>
//         </FormProvider>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default LoginPage;