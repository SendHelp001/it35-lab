import {
  IonAvatar,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Profile: React.FC = () => {
  const index = Math.floor(Math.random() * 1000);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-text-center ion-padding">
          <IonAvatar style={{ width: "100px", height: "100px", margin: "auto" }}>
            <img src={"https://picsum.photos/50/50?random=" + index} alt="avatar" />
          </IonAvatar>
          <h2>John Doe</h2>
          <p>johndoe@example.com</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
