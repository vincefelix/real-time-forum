import { socket } from "../socket/initForum.mjs";

export const handleLogin = () => {
  const emailLogin = document.getElementById("email-login"),
    /*****/ passwordLogin = document.getElementById("password-login"),
    /********/ loginData = {
      type: "login",
      payload: {
        emailLogin: emailLogin.value,
        passwordLogin: passwordLogin.value,
      },
    };
  console.log("stringify login", JSON.stringify(loginData));
  socket.mysocket.send(JSON.stringify(loginData));
};
