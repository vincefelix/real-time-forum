import { socket } from "../socket/initForum.mjs";
export const handleRegister = () => {
  console.log("clicked in register handler");
  const name = document.getElementById("name"),
    /**/ lastName = document.getElementById("lastName"),
    /****/ nickName = document.getElementById("nickName"),
    /******/ age = document.getElementById("age"),
    /*******/ gender = document.getElementById("gender"),
    /********/ emailRegister = document.getElementById("email-register"),
    /*********/ passwordRegister = document.getElementById("password-register"),
    /**********/ confPasswordRegister = document.getElementById(
      "confPassword-register"
    ),
    /*************/ registerData = {
      type: "register",
      payload: {
        firstName: name.value,
        lastName: lastName.value,
        nickName: nickName.value,
        age: age.value,
        gender: gender.value,
        emailRegister: emailRegister.value,
        passwordRegister: passwordRegister.value,
        confPasswordRegister: confPasswordRegister.value,
      },
    };
  console.log("stringified data", JSON.stringify(registerData));
  socket.sendData(JSON.stringify(registerData));
};
