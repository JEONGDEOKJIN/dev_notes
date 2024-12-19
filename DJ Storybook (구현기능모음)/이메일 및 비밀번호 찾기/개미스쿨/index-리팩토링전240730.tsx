import React, { useState } from "react";
import styles from "./email.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

type FindEmailFormData = {
  findEmail_name: string;
  findEmail_phone: string;
};

import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonAlert } from "@ionic/react";
import AuthService from "@/src/services/AuthService";

const FindEmailPage: React.FC = () => {
  const history = useHistory();

  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [alertHeader, setAlertHeader] = useState<string>("");
  const [alerSubHeader, setAlertSubHeader] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const form = useForm<FindEmailFormData>({
    mode: "onChange",
    defaultValues: {
      findEmail_name: "",
      findEmail_phone: "",
    },
    shouldFocusError: false,
  });

  const handleLogin = () => {
    history.push("/main");
  };

  const { formState, register, getValues } = form;

  const onSubmit = async (formData: any) => {
    try {
      const response = await AuthService.postUserFindPasswordResult(formData);
      const { data } = response.data;
    } catch (e: any) {
      setIsAlertOpen(true); // alert 창 열기
      setAlertHeader("로그인");
      setAlertMessage(e.response.data.message); // 백엔드에서 보내주는 에러 메시지

      // // 토스트로 보여줄 내용들
      // present({
      //   message: e.response.data.message,
      //   duration: 1000,
      //   position: "bottom",
      // });
    }
  };

  const onError = (error: any) => {
    const key = Object.keys(error)[0];
    console.log(error[key].message);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>아이디(이메일)찾기 (기존 개미스쿨에는 없음) </IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* alert 경고창 */}
      <IonAlert
        isOpen={isAlertOpen}
        header={alertHeader}
        subHeader={alerSubHeader}
        message={alertMessage}
        buttons={["확인"]}
        onDidDismiss={() => setIsAlertOpen(false)}
      ></IonAlert>
      <IonContent className="ion-padding">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)}>
            <IonInput placeholder="Username" />
            <IonInput placeholder="Password" type="password" />
            <IonButton expand="block" onClick={handleLogin}>
              이메일(아이디) 찾기👍
            </IonButton>
          </form>
        </FormProvider>
      </IonContent>
    </IonPage>
  );
};

export default FindEmailPage;
