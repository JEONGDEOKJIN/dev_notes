// import React from 'react';
// import styles from './register.module.css'
// import { FormProvider, useForm } from "react-hook-form";
// import { useHistory } from 'react-router-dom';

// import UserService from '../../../services/UserService';

// import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';

// type RegisterFormData = {
//   register_name: string;
// 	register_email: string;
// 	register_authCode: string;
//   register_phone: string;
//   register_password: string;
//   register_passwordConfirm: string;
//   register_nickname: string;
// };

// const LoginPage: React.FC = () => {
//   const [present] = useIonToast(); // [TODO] ALERT 창으로 변경
//   const history = useHistory();

//   const handleLogin = () => {
//     history.push('/main');
//   };

//   const form = useForm<RegisterFormData>({
// 		mode: "onChange",
// 		defaultValues: {
// 			register_name: "",
// 			register_email: "",
// 			register_authCode: "",
// 			register_phone: "",
// 			register_password: "",
// 			register_passwordConfirm: "",
// 			register_nickname: "",
// 		},
// 		shouldFocusError: false,
// 	});

//   const { formState, register } = form;
//   const onSubmit = async (formData : any) => {
//     try {
//       const response = await UserService.postRegister(formData);
//       const { data } = response.data
      
//     } catch (e: any) {
//       // 토스트로 보여줄 내용들
//       present({
//         message: e.response.data.message,
//         duration: 1000,
//         position: 'bottom',
//       });
//     }
//   }

// 	const onError = (error: any) => {
// 		const key = Object.keys(error)[0];
//     console.log(error[key].message);
// 	};

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Register</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent className="ion-padding">

//       <FormProvider {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit, onError)}>
//         <IonInput  labelPlacement="fixed"  placeholder="이름"  type='text' {...register("register_name", { required: true })} />
//         <IonInput  labelPlacement="fixed"  placeholder="이메일 주소" type="email" {...register("register_email", { required: true })} />
//         <IonInput  labelPlacement="fixed"  placeholder="인증코드 입력" type="text" {...register("register_authCode", { required: true })} />
//         <IonInput  labelPlacement="fixed"  placeholder="휴대폰 번호" type="tel" {...register("register_phone", { required: true })} />
//         <IonInput  labelPlacement="fixed"  placeholder="비밀번호(영문, 숫자, 특수기호)" type="password" {...register("register_password", { required: true })} />
//         <IonInput  labelPlacement="fixed"  placeholder="비밀번호 확인" type="password" {...register("register_passwordConfirm", { required: true })} />
//         <IonInput  labelPlacement="fixed"  placeholder="닉네임" type="text" {...register("register_nickname", { required: true })} />
//         <IonButton expand="block" type='submit' disabled={formState.isSubmitting || !formState.isValid}>회원가입</IonButton>
//         <IonButton expand="block" type='button' onClick={() => history.replace('/login')}>취소</IonButton>
//         </form>
//         </FormProvider>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default LoginPage;