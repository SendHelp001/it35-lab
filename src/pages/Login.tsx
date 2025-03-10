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
import { flag } from "ionicons/icons";
import { useState } from "react";

const Login: React.FC = () => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    setIsValid(undefined);

    if (value === "") return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };
  const navigation = useIonRouter();
  const doSignup = () => {
    navigation.push("/it35-lab/signup", "forward", "replace");
  };
  const doLogin = () => {
    if (email === "admin@gmail.com " && password === "password") {
      navigation.push("/it35-lab/app", "forward", "replace");
    } else {
      setIsValid(false);
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              ></div>
              <IonItem>
                <IonInput
                  className={`${isValid && "ion-valid"} ${
                    isValid === false && "ion-invalid"
                  } ${isTouched && "ion-touched"}`}
                  type="email"
                  fill="solid"
                  label="Email"
                  labelPlacement="floating"
                  errorText="Invalid email"
                  onIonInput={(event) => validate(event)}
                  onIonBlur={() => markTouched()}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  value={email}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  className={`${isValid && "ion-valid"} ${
                    isValid === false && "ion-invalid"
                  } ${isTouched && "ion-touched"}`}
                  type="password"
                  label="PASSWORD"
                  fill="solid"
                  labelPlacement="floating"
                  errorText="Invalid password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                >
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
              </IonItem>
              <IonButton onClick={() => doLogin()} expand="full">
                Login
              </IonButton>
              <IonButton onClick={() => doSignup()} expand="full">
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
