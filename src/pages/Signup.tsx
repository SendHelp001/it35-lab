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
import { useIonToast } from "@ionic/react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [present] = useIonToast();
  const navigation = useIonRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      color: "danger",
      message: "Error, Invalid password or email!",
      duration: 1500,
      position: position,
    });
  };

  const doSignup = () => {
    navigation.push("/it35-lab/signup", "forward", "replace");
  };
  const doLogin = () => {
    if (email === "admin@gmail.com" && password === "password") {
      navigation.push("/it35-lab/app", "forward", "replace");
    } else {
      presentToast("top");
      setError(true);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="">
        <IonCard style={{ height: "90%" }}>
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
              <div style={{ marginTop: 10 }}>
                <IonLabel position="stacked">Confirm Password</IonLabel>
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
              <IonButton onClick={() => doLogin()} expand="block" style={{ marginTop: 20 }}>
                Signup  
              </IonButton>
              <div style={{ textAlign: "center", marginTop: "60%" }}>
                <span>Already have an account? </span>
                <Link to="/it35-lab/">Login</Link>
              </div>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signup;
