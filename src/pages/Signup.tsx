import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useState } from "react";

const Signup: React.FC = () => {
  const navigation = useIonRouter();
  const doLogin = () => {
    navigation.push("/it35-lab/app", "forward", "replace");
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="">
        <IonCard>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonInput label="Name" placeholder="Enter name"></IonInput>
              </IonItem>
              <IonItem>
                <IonInput label="Email" placeholder="Enter email"></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Password"
                  placeholder="Enter company name"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Confirm Password"
                  placeholder="Enter password"
                ></IonInput>
              </IonItem>

              <IonButton onClick={() => doLogin()} expand="full">
                Login
              </IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
