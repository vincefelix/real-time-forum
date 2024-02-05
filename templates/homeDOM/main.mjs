
import { RightSidebarSection } from "./right.mjs";
import { Navigation } from "./nav.mjs";
import { MainContentSection } from "./createpost.mjs";
import { ProfileToggleSection } from "./profiletoogler.mjs";

export const navigation = new Navigation();
export const mainContent = new MainContentSection();
export const rightSidebar = new RightSidebarSection();
export const profileToggle = new ProfileToggleSection();

export const initHome = (props = {}, posts) => {
  console.log("posts to display ", posts);
  console.log("typeof posts to display ", typeof posts);
  console.log("index posts to display ", posts[0]);
  navigation.init(props.payload.NickName);
  profileToggle.init();
  // leftsection.init();
  mainContent.init();
  rightSidebar.init();
  for (const post of posts) {
    let likeCount = post.Like == null ? 0 : post.Like.length,
      dislikeCount = post.Dislike == null ? 0 : post.Dislike.length,
      commentCount = post.Comment_tab == null ? 0 : post.Comment_tab.length;
    console.log("likes: ", likeCount);
    console.log("dislikes: ", dislikeCount);
    console.log("comment: ", commentCount);
    mainContent.createAndAddPost([
      post.postTitleInput,
      post.PostId,
      post.Profil,
      post.Username,
      post.ImageLink,
      post.Content,
      post.Categories,
      likeCount,
      dislikeCount,
      commentCount,
    ]);
  }
  // Utilisateurs connectés
  rightSidebar.createUser(
    rightSidebar.connectedUsers,
    "john_doe",
    "/static/./assets/user-connection/profile1.png",
    "messagePopup-john_doe",
    true
  );

  // Utilisateurs déconnectés
  rightSidebar.createUser(
    rightSidebar.disconnectedUsers,
    "jane_doe",
    "/static/./assets/user-connection/profile3.png",
    "messagePopup-jane_doe",
    false
  );

  // // Créez un post et ajoutez-le à la section principale
  // const postDetails = [
  //   //? post test
  //   "thetest",
  //   "/static/./assets/user-connection/profile1.png",
  //   "John Doe",
  //   "/static/./assets/feedtrying.jpg",
  //   "Description du post",
  //   5,
  //   6,
  //   9,
  // ];

  // const postDetailes = [
  //   //? post test
  //   "thetest",
  //   "/static/./assets/user-connection/profile1.png",
  //   "Johkzhvn Dozece",
  //   "/static/./assets/feedtrying.jpg",
  //   "Description du post",
  //   5,
  //   6,
  //   9,
  // ];

  // mainContent.createAndAddPost(postDetails);
  // mainContent.createAndAddPost(postDetailes);

  // // Obtenez la section des commentaires du post créé
  // const commentsSection = document.querySelector(".comments-section"); // Assurez-vous d'ajuster le sélecteur en fonction de votre structure HTML

  // // Ajoutez des commentaires au post
  // const comment1 = mainContent.createComment(
  //   "Mass",
  //   "/static/./assets/user-connection/profile1.png",
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry"
  // );
  // const comment2 = mainContent.createComment(
  //   "Vince",
  //   "/static/./assets/user-connection/profile1.png",
  //   "text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
  // );

  // commentsSection.appendChild(comment1);
  // commentsSection.appendChild(comment2);

  // Utilisation de la nouvelle fonction pour ajouter des commentaires à un post
  // const postofDetail = [
  //   "thetest",
  //   "/static/./assets/user-connection/profile1.png",
  //   "Johnathan Doe",
  //   "/static/./assets/feedtrying.jpg",
  //   "Description du post",
  //   5,
  //   6,
  //   9,
  // ];

  // const postContainer = mainContent.createAndAddPost(postofDetail);

  // const comments = [
  //   {
  //     username: "Massljf",
  //     userImageSrc: "/static/./path/to/image1.png",
  //     commentText: "Lorem Ipsum is simply dummy text...",
  //   },
  //   {
  //     username: "Vincenteece",
  //     userImageSrc: "/static/./path/to/image2.png",
  //     commentText: "text ever since the 1500s...",
  //   },
  // ];
};
// mainContent.addCommentsToPost(postContainer, comments);


