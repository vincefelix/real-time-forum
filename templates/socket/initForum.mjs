//import { forumForm } from "../form/formScript.mjs";
import { setJWT } from "../utils/token.mjs";
import { launchHome } from "../utils/launchHome.mjs";
import { deleteCookie, setCookies } from "../utils/setCookies.mjs";
import { vmSocket } from "./vmsocket.mjs";
import { form } from "../form/formElement.mjs";
import { error } from "../error/error.mjs";
import { alertError } from "../error/alert.mjs";
import { mainContent, rightSidebar } from "../homeDOM/main.mjs";
import { sort } from "../utils/sort.mjs";
import { getUserId, getUser_Nickname } from "../utils/getUserId.mjs";
import * as com from "../homeDOM/communication.mjs";

const Form = {};
export const socket = new vmSocket();
socket.connectSocket(); //connecting to socket one tab is opened
/*****************************************************************
 *******************************************************************/
socket.mysocket.onopen = () => {
  console.log("socket opened");
  let checkCookie = document.cookie;
  if (checkCookie == "") {
    // no cookie, go to login page
    console.log("no cookie");
    document.getElementById("container").innerHTML = "";
    localStorage.removeItem("jwtToken");
    let forumForm = new form();
    Form["value"] = forumForm;
    forumForm.loginForm("newconn");
    forumForm.redirect.addEventListener("click", forumForm.updateFormContent);
  } else {
    // there is a cookie, check validity
    console.log(
      "cookie to send => ",
      JSON.stringify({ type: "checkCookie", payload: document.cookie })
    );
    socket.mysocket.send(
      JSON.stringify({
        type: "checkCookie",
        payload: { data: document.cookie },
      })
    );
    console.log("there is cookie must check");
  }
};

/*****************************************************************
 *******************************************************************/

socket.mysocket.onmessage = (e) => {
  console.log("💥 in onmessage", e.data);
  const dataObject = JSON.parse(e.data);
  switch (dataObject.Type) {
    case "socket-open-with-session":
      if (window.location.pathname != "/") {
        const hdleError = new error(404, "Sorry...<br>page not found", "home");
        hdleError.display();
        hdleError.redirect("home");
        console.log(`${window.location.pathname} page not found`);
      } else {
        console.log("in  the open with session");
        console.log("received user list =>", dataObject.userList);
        launchHome(dataObject.posts, dataObject.userList);
      }
      break;
    //--------------------------------------------------
    //! invalid session from cookies or session expired
    case "socket-open-invalid-session":
      localStorage.removeItem("jwtToken");
      if (document.cookie) deleteCookie("vmSession");
      if (document.getElementById("container")) {
        document.getElementById("container").innerHTML = "";
      } else {
        if (document.getElementById("err-container")) {
          document.body.removeChild(document.getElementById("err-container"));
        }
        let container = document.createElement("div");
        container.id = "container";
        document.body.appendChild(container);
      }
      let forumForm = new form();
      Form["value"] = forumForm;
      Form.value.loginForm("invalid sess");
      break;

    //--------------------------------------------------
    //! log out case
    case "disconnection":
      console.log("disconnecting...");
      localStorage.removeItem("jwtToken");
      document.body.innerHTML = "";
      rightSidebar.connectedUsers.innerHTML = "";
      rightSidebar.disconnectedUsers.innerHTML = "";
      document.head.removeChild(document.head.children[0]);
      let container = document.createElement("div");
      container.id = "container";
      document.body.appendChild(container);
      let forum_Form = new form();
      Form["value"] = forum_Form;
      Form.value.loginForm("after disconnect");
      Form.value.redirect.addEventListener(
        "click",
        Form.value.updateFormContent
      );

      deleteCookie("vmSession");
      break;
    //---------------------------------------
    //! regsiter request response from server
    case "register":
      if (dataObject.Authorization == "granted" && dataObject.status == "200") {
        Form.value.moveToLogin();
        console.log("user is registered");
      }
      break;

    //-------------------------------------
    //! online request
    case "online":
      console.log("is online => ", dataObject.Payload);
      let userSideOnline = document.getElementById("connected-container");
      let userSideOffline = document.getElementById("disconnected-container");
      userSideOffline.innerHTML = "";
      userSideOnline.innerHTML = "";
      let userList = dataObject.Payload;
      if (userList != null) {
        const sessionId = getUserId();
        for (const user of userList) {
          if (user.Id == sessionId) continue; //! not displaying the session owner
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
            state,
            user.Unread
          );
        }
      }
      break;

    //-------------------------------------
    //! offline request
    case "offline":
      console.log("is offline => ", dataObject.Payload);
      let userSideOnlineOff = document.getElementById("connected-container");
      let userSideOfflineOff = document.getElementById(
        "disconnected-container"
      );
      userSideOfflineOff.innerHTML = "";
      userSideOnlineOff.innerHTML = "";
      let userListoff = dataObject.Payload;
      if (userListoff != null) {
        const sessionId = getUserId();
        for (const user of userListoff) {
          if (user.Id == sessionId) continue; //! not displaying the session owner
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
            state,
            user.Unread
          );
        }
      }
      break;

    //-------------------------------------
    //! login request response from server
    case "login":
      if (dataObject.Authorization == "granted" && dataObject.status == "200") {
        setCookies(dataObject.cookie);
        setJWT(dataObject.Payload);
        launchHome(dataObject.posts, dataObject.userList);
        console.log("user is logged");
        console.log("retrieved: ", dataObject.Payload);
      }
      break;
    //------------------
    case "addPost":
      console.log("in addpost");
      console.log("received => ", dataObject.Payload);
      // console.log("like =>", dataObject.payload.Like);
      const postDetails = [
        dataObject.Payload.Title,
        dataObject.Payload.PostId,
        dataObject.Payload.Profil,
        "@" + dataObject.Payload.Username,
        "",
        dataObject.Payload.Content,
        dataObject.Payload.Categorie,
        0,
        0,
        0,
      ];
      mainContent.createAndAddPost(postDetails, true);
      break;
    case "addComment":
      console.log("adding comm");
      const commentDetails = [
        dataObject.Payload.PostId,
        "@" + dataObject.Payload.Username,
        "",
        dataObject.Payload.Profil,
        dataObject.Payload.Content,
      ];
      mainContent.createComment(...commentDetails);
      break;
    case "loadMsg":
      console.log("in loadMsg...");
      const msg = dataObject.Payload;
      console.log("loaded msg => ", msg);
      if (msg != null) {
        const popupBody = document.getElementById("messagePopupBody"),
          prevSH = popupBody.scrollHeight;
        let count = 0;
        while (count < msg.length) {
          const sms = msg[count];
          setTimeout(() => {
            com.addMessage(
              sms.Sender,
              sms.Receiver,
              sms.MessageText,
              sms.Date,
              sms.Id
            );
            const currentSH = popupBody.scrollHeight;
            popupBody.scrollTop = currentSH - prevSH;
          }, 250 * count);
          count++;
        }
      }
      break;
    case "load_10Msg":
      console.log("in load_10Msg...");
      const moreMsg = dataObject.Payload;
      console.log("loaded msg => ", moreMsg);
      if (moreMsg != null) {
        const popupBody = document.getElementById("messagePopupBody"),
          prevSH = popupBody.scrollHeight;
        setTimeout(() => {
          moreMsg.map((sms) => {
            com.addMessage(
              sms.Sender,
              sms.Receiver,
              sms.MessageText,
              sms.Date,
              sms.Id
            );
          });
          const currentSH = popupBody.scrollHeight;
          popupBody.scrollTop = currentSH - prevSH;
        }, 500);
      } else {
        console.log("no more messages to load...");
      }
      break;
    case "newMsg":
      //?---- changing list order
      let userSideOnlineN = document.getElementById("connected-container");
      let userSideOfflineN = document.getElementById("disconnected-container");
      userSideOfflineN.innerHTML = "";
      userSideOnlineN.innerHTML = "";
      console.log("changing order in newMsg...");
      let userListN = dataObject.userList;
      if (userListN != null) {
        userListN.forEach((user) => {
          console.log(
            "to add : ",
            user.Username,
            "sess => ",
            user.Id == getUserId()
          );
        });
        const sessionId = getUserId();
        for (const user of userListN) {
          if (user.Id == sessionId) continue; //! not displaying the session owner
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
            state,
            user.Unread
          );
        }
      }
      //?
      console.log("in addMessage...");
      const receiver = dataObject.Payload.Receiver;
      const sender = dataObject.Payload.Sender;
      const message = dataObject.Payload.MessageText;
      const date = dataObject.Payload.Date;
      const idMess = dataObject.Payload.Id;
      console.log("session user => ", getUser_Nickname());
      console.log("receiver user => ", receiver);
      console.log("sender user => ", sender);
      const chatUsername =
        getUser_Nickname() == receiver.replace("@", "") ? sender : receiver;
      if (com.isChatBox_opened(chatUsername)) {
        console.log("chatbox opened");
        com.sendMessage(chatUsername, sender, message, date, idMess);
      } else {
        console.log("chatbox closed");
        //! message notifications
      }
      break;
    //! an error occured
    default:
      if (
        dataObject.Status == "404" ||
        dataObject.Status == "500" ||
        dataObject.Display == true
      ) {
        const hdleError = new error(
          dataObject.StatusCode,
          dataObject.Msg,
          dataObject.Location
        );
        hdleError.display();
        hdleError.redirect();
      } else {
        alertError(dataObject);
      }
    // alert(dataObject.Msg);
  }
};
/*****************************************************************
 *******************************************************************/
window.addEventListener("beforeunload", () => {
  console.log("socket closed");
  socket.mysocket.close(1000, "window refreshed");
});
