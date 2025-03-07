import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const index = Math.floor(Math.random() * 1000);
  const doLogin = () => {
    navigation.push("/it35-lab/app", "forward", "replace");
  };
  return (
    //HEADER
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
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
              >
                <IonAvatar>
                  <img src={"https://picsum.photos/80/80?random=" + index} alt="avatar" />
                </IonAvatar>
              </div>
              <IonItem>
                <IonInput label="USERNAME" placeholder="Enter username..."></IonInput>
              </IonItem>
              <IonItem>
                <IonInput type="password" label="PASSWORD" value="NeverGonnaGiveYouUp">
                  <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                </IonInput>
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

export default Login;
