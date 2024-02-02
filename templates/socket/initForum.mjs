//import { forumForm } from "../form/formScript.mjs";
import { moveToLogin } from "../form/loginGen.mjs";
import { setJWT } from "../utils/JWT.mjs";
import { launchHome } from "../utils/launchHome.mjs";
import { setCookies } from "../utils/setCookies.mjs";
import { vmSocket } from "./vmsocket.mjs";
import { form } from "../form/formElement.mjs";
import { error } from "../error/error.mjs";
import { alertError } from "../error/alert.mjs";
import { mainContent } from "../homeDOM/main.mjs";

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
    forumForm.loginForm();
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
      launchHome(dataObject.posts);
      break;
    //--------------------------------------------------
    //! invalid session from cookies or session expired
    case "socket-open-invalid-session":
      localStorage.removeItem("jwtToken");
      let forumForm = new form();
      forumForm.loginForm();
      break;
    //---------------------------------------
    //! regsiter request response from server
    case "register":
      if (dataObject.Authorization == "granted" && dataObject.status == "200") {
        moveToLogin(forumForm);
        console.log("user is registered");
      }
      break;
    //-------------------------------------
    //! login request response from server
    case "login":
      if (dataObject.Authorization == "granted" && dataObject.status == "200") {
        setCookies(dataObject.cookie);
        setJWT(dataObject.Payload);
        launchHome();
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
        dataObject.Payload.PostId,
        dataObject.Payload.Profil,
        dataObject.Payload.Username,
        dataObject.Payload.ImageLink,
        dataObject.Payload.Content,
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
      if (dataObject.Status == "404" || dataObject.Status == "500") {
        const hdleError = new error(dataObject.StatusCode, dataObject.Msg);
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
