//import { forumForm } from "../form/formScript.mjs";
import { setJWT } from "../utils/token.mjs";
import { launchHome } from "../utils/launchHome.mjs";
import { deleteCookie, setCookies } from "../utils/setCookies.mjs";
import { vmSocket } from "./vmsocket.mjs";
import { form } from "../form/formElement.mjs";
import { error } from "../error/error.mjs";
import { alertError } from "../error/alert.mjs";
import { mainContent, rightSidebar } from "../homeDOM/main.mjs";

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
      console.log("in  the open with session");
      console.log("received user list =>", dataObject.userList);
      launchHome(dataObject.posts, dataObject.userList);
      break;
    //--------------------------------------------------
    //! invalid session from cookies or session expired
    case "socket-open-invalid-session":
      localStorage.removeItem("jwtToken");
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
      Form.value.loginForm("valid sess");
      break;

    //--------------------------------------------------
    //! log out case
    case "disconnection":
      console.log("disconnecting...");
      localStorage.removeItem("jwtToken");
      document.body.innerHTML = "";
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
      break;

    //-------------------------------------
    //! online request
    case "offline":
      console.log("is offline => ", dataObject.Payload.Username);
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
        dataObject.Payload.Username,
        "",
        dataObject.Payload.Content,
        dataObject.Payload.Categorie,
        8,
        9,
        11,
      ];
      mainContent.createAndAddPost(postDetails, true);
      break;
    case "addComment":
      console.log("adding comm");
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
