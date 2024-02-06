import { RightSidebarSection } from "./right.mjs";
import { Navigation } from "./nav.mjs";
import { MainContentSection } from "./createpost.mjs";
import { ProfileToggleSection } from "./profiletoogler.mjs";
import { sort } from "../utils/sort.mjs";

export const navigation = new Navigation();
export const mainContent = new MainContentSection();
export const rightSidebar = new RightSidebarSection();
export const profileToggle = new ProfileToggleSection();

export const initHome = (props = {}, posts, userList) => {
  console.log("posts to display ", posts);
  console.log("users in database => ", userList);
  console.log("typeof posts to display ", typeof posts);
  navigation.init(props.payload.NickName);
  profileToggle.init();
  mainContent.init();
  rightSidebar.init();

  if (posts != null) {
    for (const post of posts) {
      console.log("catego ", post.Categorie);
      let likeCount = post.Like == null ? 0 : post.Like.length,
        dislikeCount = post.Dislike == null ? 0 : post.Dislike.length,
        commentCount = post.Comment_tab == null ? 0 : post.Comment_tab.length;
      mainContent.createAndAddPost([
        post.Title,
        post.PostId,
        post.Profil,
        post.Username,
        "",
        post.Content,
        post.Categorie,
        likeCount,
        dislikeCount,
        commentCount,
      ]);
    }
  }
  userList = sort(userList);
  if (userList != null) {
    for (const user of userList) {
      let side =
        user.Online == true
          ? rightSidebar.connectedUsers
          : rightSidebar.disconnectedUsers;
      let state = user.Online == true ? true : false;
      //------------------------------
      rightSidebar.createUser(
        side,
        user.Username,
        user.Profil,
        "messagePopup-john_doe",
        state
      );
    }
  }
};
