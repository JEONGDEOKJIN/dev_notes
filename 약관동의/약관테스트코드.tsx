import React, { useState, useEffect } from "react";
import { IonCheckbox, IonItem, IonList } from "@ionic/react";

const AgreementPage: React.FC = () => {
  // 전체 동의 상태와 개별 약관 동의 상태를 관리하는 state 선언
  const [allChecked, setAllChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState({
    terms: false, // 이용약관 동의 상태
    privacy: false, // 개인정보 수집 및 이용 동의 상태
    marketing: false, // 광고성 정보 수신 동의 상태
    email: false, // 이메일 수신 동의 상태
    sms: false, // SMS 수신 동의 상태
  });

  // 모든 약관이 동의되었는지 확인하는 useEffect
  useEffect(() => {
    // 모든 필수 약관과 선택 약관(이메일, SMS)이 동의되었는지 확인
    const allAgreed =
      termsChecked.terms &&
      termsChecked.privacy &&
      termsChecked.marketing === (termsChecked.email && termsChecked.sms);

    // 전체 동의 상태 업데이트
    setAllChecked(allAgreed);
  }, [termsChecked]);

  // 전체 동의 체크박스 클릭 시 호출되는 함수
  const handleAllChecked = (checked: boolean) => {
    // 모든 약관 상태를 전체 동의 상태와 동일하게 설정
    setTermsChecked({
      terms: checked,
      privacy: checked,
      marketing: checked,
      email: checked,
      sms: checked,
    });
    // 전체 동의 상태 업데이트
    setAllChecked(checked);
  };

  // 개별 약관 체크박스 클릭 시 호출되는 함수
  const handleCheckboxChange = (name: string, checked: boolean) => {
    // 해당 약관 상태 업데이트
    setTermsChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));

    // 광고성 정보 수신 동의가 해제되면 이메일과 SMS 상태도 해제
    if (name === "marketing" && !checked) {
      setTermsChecked((prev) => ({
        ...prev,
        email: false,
        sms: false,
      }));
    }

    // 이메일 또는 SMS 상태가 변경되면 광고성 정보 수신 동의 상태 업데이트
    if (name === "email" || name === "sms") {
      if (checked) {
        // 이메일 또는 SMS가 선택되면 광고성 정보 수신 동의 상태를 true로 설정
        setTermsChecked((prev) => ({
          ...prev,
          marketing: true,
        }));
      } else if (!termsChecked.email && !termsChecked.sms) {
        // 이메일과 SMS가 모두 해제되면 광고성 정보 수신 동의 상태를 false로 설정
        setTermsChecked((prev) => ({
          ...prev,
          marketing: false,
        }));
      }
    }
  }

  return (
    <>
     {/* todo
        1. '약관 전체 동의' 관련 
          1) 약관 전체 동의 누르면 -> 전체 항목이 체크 됨 
          2) 약관 전체 동의 해제하면 -> 전체 항목이 해제 됨
          3) 세부 항목이 다 on 되면 -> 약관 전체 동의 on

        2. [선택] 광고성 정보 수신 동의 관련
          1) '선택' 광고성 정보 수신 동의 누르면 -> E-mail, SMS 체크박스 됨
          2) '선택' 광고성 정보 수신 동의 해제하면 -> 약관 전체 동의 해제 되어야 함 
        
        3. 모두 체크가 완료되면 -> '다음' 버튼 활성화 


      */}
      <h1>약관</h1>
      <IonList>
        <IonItem>
          <IonCheckbox
            justify="start"
            labelPlacement="end"
            checked={allChecked}
            onIonChange={(e) => handleAllChecked(e.detail.checked)}
          >
            약관 전체동의
          </IonCheckbox>
        </IonItem>

        <IonItem>
          <IonCheckbox
            justify="start"
            labelPlacement="end"
            checked={termsChecked.terms}
            onIonChange={(e) => handleCheckboxChange("terms", e.detail.checked)}
          >
            [필수] 이용약관 동의
          </IonCheckbox>
        </IonItem>

        <IonItem>
          <IonCheckbox
            justify="start"
            labelPlacement="end"
            checked={termsChecked.privacy}
            onIonChange={(e) =>
              handleCheckboxChange("privacy", e.detail.checked)
            }
          >
            [필수] 개인정보 수집 및 이용 동의
          </IonCheckbox>
        </IonItem>

        <IonItem>
          <IonCheckbox
            justify="start"
            labelPlacement="end"
            checked={termsChecked.marketing}
            onIonChange={(e) =>
              handleCheckboxChange("marketing", e.detail.checked)
            }
          >
            [선택] 광고성 정보 수신 동의
          </IonCheckbox>
        </IonItem>

        <IonItem>
          <p>광고성 정보 수신 팝업</p>
          <IonCheckbox
            justify="start"
            labelPlacement="end"
            checked={termsChecked.email}
            onIonChange={(e) => handleCheckboxChange("email", e.detail.checked)}
          >
            E-mail
          </IonCheckbox>
          <IonCheckbox
            justify="start"
            labelPlacement="end"
            checked={termsChecked.sms}
            onIonChange={(e) => handleCheckboxChange("sms", e.detail.checked)}
          >
            SMS
          </IonCheckbox>
        </IonItem>
      </IonList>
    </>
  );
};

export default AgreementPage;
