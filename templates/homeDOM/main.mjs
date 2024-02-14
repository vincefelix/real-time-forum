import { RightSidebarSection } from "./right.mjs";
import { Navigation } from "./nav.mjs";
import { MainContentSection } from "./createpost.mjs";
import { ProfileToggleSection } from "./profiletoogler.mjs";
import { sort } from "../utils/sort.mjs";
import { getUserId } from "../utils/getUserId.mjs";

export const navigation = new Navigation();
export const mainContent = new MainContentSection();
export const rightSidebar = new RightSidebarSection();
export const profileToggle = new ProfileToggleSection();

export const initHome = (props = {}, posts, userList) => {
  // console.log("posts to display ", posts);
  // console.log("users in database => ", userList);
  // console.log("typeof posts to display ", typeof posts);
  console.log("nav ", props);
  navigation.init("@"+props.payload.NickName, props.payload.Profil);
  profileToggle.init();
  mainContent.init();
  rightSidebar.init();

  if (posts != null) {
    for (const post of posts) {
      let commentCount = post.Comment_tab == null ? 0 : post.Comment_tab.length;
      mainContent.createAndAddPost([
        post.Title,
        post.PostId,
        post.Profil,
        "@" + post.Username,
        "",
        post.Content,
        post.Categorie,
        0,
        0,
        commentCount,
      ]);
      if (post.Comment_tab != null) {
        for (const comment of post.Comment_tab) {
          const commentDetails = [
            comment.PostId,
            "@" + comment.Username,
            "",
            comment.Profil,
            comment.Content,
          ];
          mainContent.createComment(...commentDetails);
        }
      }
    }
  }
  userList = sort(userList);
  if (userList != null) {
    const sessionId = getUserId();
    console.log("actual conn => ", sessionId);
    for (const user of userList) {
      if (user.Id == sessionId) continue; //! not displaying the session owner
      console.log("er ", user);
      let side =
        user.Online == true
          ? rightSidebar.connectedUsers
          : rightSidebar.disconnectedUsers;
      let state = user.Online == true ? true : false;
      //------------------------------
      rightSidebar.createUser(
        side,
        "@" + user.Username,
        user.Profil,
        `messagePopup-${user.Username}`,
        state
      );
    }
  }
};
