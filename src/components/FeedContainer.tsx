import { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonLabel,
  IonModal,
  IonFooter,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonAlert,
  IonText,
  IonAvatar,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
  IonPopover,
  IonTextarea,
} from "@ionic/react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";
import { pencil, trash } from "ionicons/icons";
import styles from "./FeedContainer.module.css";

interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{
    open: boolean;
    event: Event | null;
    postId: string | null;
  }>({ open: false, event: null, postId: null });
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]); // <<< Added this

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith("@nbsc.edu.ph")) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from("users")
          .select("user_id, username, user_avatar_url")
          .eq("user_email", authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("post_created_at", { ascending: false });
      if (!error) setPosts(data as Post[]);
    };
    fetchUser();
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!postContent || !user || !username) return;

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("user_avatar_url")
      .eq("user_id", user.id)
      .single();

    if (userError) {
      console.error("Error fetching user avatar:", userError);
      return;
    }

    const avatarUrl =
      userData?.user_avatar_url || "https://ionicframework.com/docs/img/demos/avatar.svg";

    const { data, error } = await supabase
      .from("posts")
      .insert([{ post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }])
      .select("*");

    if (!error && data) {
      setPosts([data[0] as Post, ...posts]);
    }

    setPostContent("");
  };

  const deletePost = async (post_id: string) => {
    await supabase.from("posts").delete().match({ post_id });
    setPosts(posts.filter((post) => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data, error } = await supabase
      .from("posts")
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select("*");
    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map((post) => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent("");
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  const handleTextareaChange = (e: any) => {
    const newContent = e.detail.value!;
    setPostContent(newContent);

    const textarea = e.target as HTMLIonTextareaElement;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const toggleExpand = (postId: string) => {
    if (expandedPosts.includes(postId)) {
      setExpandedPosts(expandedPosts.filter((id) => id !== postId));
    } else {
      setExpandedPosts([...expandedPosts, postId]);
    }
  };

  return (
    <IonPage style={{ "--ion-background-color": "var(--ion-color-dark)" }}>
      <IonHeader>
        <IonToolbar
          style={{ "--background": "var(--ion-color-dark)", "--color": "var(--ion-color-primary)" }}
        >
          <IonTitle className={styles.feedTitle}>Community Feed</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {user ? (
          <>
            <IonCard className={styles.shareCard}>
              <IonCardHeader className={styles.shareCardHeader}>
                <IonCardTitle className={styles.shareTitle}>Share Your Thoughts</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonTextarea
                  value={postContent}
                  onIonChange={handleTextareaChange}
                  placeholder="What's on your mind?"
                  className="custom-textarea"
                  style={{
                    color: "var(--ion-color-light)",
                    background: "var(--ion-color-dark)",
                    fontFamily: '"Manrope", sans-serif',
                    width: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                    overflowY: "hidden",
                    maxHeight: "200px",
                  }}
                ></IonTextarea>
                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "10px" }}>
                  <IonButton onClick={createPost} color="primary" className={styles.postButton}>
                    Post
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>

            {posts.map((post) => {
              const isExpanded = expandedPosts.includes(post.post_id);
              const previewLength = 150;
              const shouldShowSeeMore = post.post_content.length > previewLength;
              const displayedContent = isExpanded
                ? post.post_content
                : post.post_content.substring(0, previewLength) + (shouldShowSeeMore ? "..." : "");

              return (
                <IonCard key={post.post_id} className={styles.postCard}>
                  <IonCardHeader className={styles.postCardHeader}>
                    <IonRow className="ion-align-items-center">
                      <IonCol size="auto">
                        <IonAvatar style={{ width: "60px", height: "60px" }}>
                          <img alt={post.username} src={post.avatar_url} />
                        </IonAvatar>
                      </IonCol>
                      <IonCol>
                        <IonCardTitle className={styles.username}>{post.username}</IonCardTitle>
                        <IonCardSubtitle className={styles.timestamp}>
                          {new Date(post.post_created_at).toLocaleString(undefined, {
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </IonCardSubtitle>
                      </IonCol>
                      <IonCol size="auto">
                        <IonButton
                          fill="clear"
                          onClick={(e) =>
                            setPopoverState({
                              open: true,
                              event: e.nativeEvent,
                              postId: post.post_id,
                            })
                          }
                        >
                          <IonIcon color="light" icon={pencil} />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonCardHeader>

                  <IonCardContent>
                    <IonText className={styles.postContent}>{displayedContent}</IonText>
                    {shouldShowSeeMore && (
                      <IonButton
                        fill="clear"
                        size="small"
                        onClick={() => toggleExpand(post.post_id)}
                        className={styles.seeMoreButton}
                      >
                        {isExpanded ? "See less" : "See more"}
                      </IonButton>
                    )}
                  </IonCardContent>

                  {/* Popover */}
                  <IonPopover
                    isOpen={popoverState.open && popoverState.postId === post.post_id}
                    event={popoverState.event}
                    onDidDismiss={() => setPopoverState({ open: false, event: null, postId: null })}
                  >
                    <IonButton
                      expand="full"
                      fill="clear"
                      className={styles.popoverButton}
                      onClick={() => {
                        startEditingPost(post);
                        setPopoverState({ open: false, event: null, postId: null });
                      }}
                    >
                      Edit Post
                    </IonButton>
                    <IonButton
                      expand="full"
                      fill="clear"
                      color="danger"
                      className={styles.deleteButton}
                      onClick={() => {
                        deletePost(post.post_id);
                        setPopoverState({ open: false, event: null, postId: null });
                      }}
                    >
                      Delete Post
                    </IonButton>
                  </IonPopover>
                </IonCard>
              );
            })}
          </>
        ) : (
          <IonLabel className={styles.loadingLabel}>Fetching posts...</IonLabel>
        )}
      </IonContent>

      {/* Modal for editing */}
      <IonModal
        isOpen={isModalOpen}
        onDidDismiss={() => setIsModalOpen(false)}
        className={styles.editModal}
      >
        <IonHeader>
          <IonToolbar className={styles.editModalHeader}>
            <IonTitle className={styles.feedTitle}>Edit Your Post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className={`ion-padding ${styles.editModalContent}`}>
          <IonInput
            value={postContent}
            onIonChange={(e) => setPostContent(e.detail.value!)}
            placeholder="Edit your post..."
            className={styles.editInput}
            autoFocus
          />
        </IonContent>
        <IonFooter className={styles.editModalFooter}>
          <IonToolbar className={styles.editModalFooter}>
            <IonButton
              slot="end"
              onClick={savePost}
              strong
              color="primary"
              className={styles.saveButton}
            >
              Save
            </IonButton>
            <IonButton
              slot="start"
              color="light"
              onClick={() => setIsModalOpen(false)}
              className={styles.cancelButton}
            >
              Cancel
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonModal>

      {/* Alert */}
      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setIsAlertOpen(false)}
        header="Success!"
        message="Your post has been updated."
        buttons={[{ text: "OK", role: "cancel", cssClass: styles.alertButtonFont }]}
        cssClass={styles.alertFont}
      />
    </IonPage>
  );
};

export default FeedContainer;
