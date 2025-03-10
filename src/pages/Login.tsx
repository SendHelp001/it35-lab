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
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { eye, flag } from "ionicons/icons";
import { useState } from "react";

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const doSignup = () => {
    navigation.push("/it35-lab/signup", "forward", "replace");
  };
  const doLogin = () => {
    if (email === "admin@gmail.com " && password === "password") {
      navigation.push("/it35-lab/app", "forward", "replace");
    } else {
    }
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
          <IonCardHeader>
            <IonCardTitle></IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <div>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  fill="outline"
                  errorText="Invalid email"
                />
              </div>
              <div style={{ marginTop: 10 }}>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  placeholder="************"
                  fill="outline"
                  style={{ marginTop: 0 }}
                >
                  <IonInputPasswordToggle slot="end" />
                </IonInput>
              </div>
              <IonButton onClick={() => doLogin()} expand="full" style={{ marginTop: 20 }}>
                Login
              </IonButton>
              <IonButton onClick={() => doSignup()} expand="full" style={{ marginTop: 10 }}>
                Signup
              </IonButton>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
