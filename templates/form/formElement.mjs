import { generateRegisterForm } from "./registerGen.mjs";
import { generateLoginForm } from "./loginGen.mjs";
import { setFormStyle } from "../utils/setStyle.mjs";
import { handleLogin } from "../handlers/loginHandler.mjs";
import { handleRegister } from "../handlers/registerHandler.mjs";
import * as pass from "../utils/password.mjs";

const sideMessageObject = {
  login: {
    header: "Welcome back ! <br>Amazing activities are waiting for you 🤗",
    footer:
      'New here? <br><span id="createAccountLink" class="redirectLink" data-redirect="register">Create an  account</span>',
    buttonType: "login",
    iconSrc: "/static/./assets/entrer.svg",
    iconAlt: "login icon",
    iconClass: "/static/login icon",
    animate: {
      from: "translateX(0%);",
      to: "translateX(135%);",
    },
  },

  register: {
    header: "hello user ! <br>Welcome to VM forum feel free to register",
    footer:
      'Already have an account? <br><span id="loginLink" class="redirectLink" data-redirect="login">login in here</span>',
    buttonType: "register",
    iconSrc: "/static/./assets/register.svg",
    iconAlt: "register icon",
    iconClass: "register icon",
    animate: {
      from: "translateX(0%);",
      to: "translateX(-75%);",
    },
  },
};

export class form {
  constructor() {
    this.container = document.getElementById("container");
    this.sideMessageHeader = document.createElement("p");
    this.logInfo = document.createElement("div");
    this.sideMessageFooter = document.createElement("p");
    this.textInfo = document.createElement("div");
    this.formDiv = document.createElement("div");
    this.submitDiv = document.createElement("div");
    //-------------------
    this.sideMessageHeader.id = "top";
    this.sideMessageFooter.id = "bottom";
    this.textInfo.id = "text-info";
    this.logInfo.id = "log-info";
    this.submitDiv.id = "submit-btn";
    this.formDiv.id = "form";
    //--------------------
    this.textInfo.appendChild(this.sideMessageHeader);
    this.textInfo.appendChild(document.createElement("hr"));
    this.logInfo.appendChild(this.submitDiv);
    this.logInfo.appendChild(this.sideMessageFooter);
    this.textInfo.appendChild(this.logInfo);
    this.container.appendChild(this.textInfo);
    this.container.appendChild(this.formDiv);
  }
  //?***********************************************************?
  sideMessage(formType) {
    this.sideMessageHeader.innerHTML = sideMessageObject[formType].header;
    this.sideMessageFooter.innerHTML = sideMessageObject[formType].footer;
    const logIcon = document.createElement("img"),
      button = document.createElement("button");
    logIcon.src = sideMessageObject[formType].iconSrc;
    logIcon.alt = sideMessageObject[formType].iconAlt;
    logIcon.className = sideMessageObject[formType].iconClass;
    button.textContent = sideMessageObject[formType].buttonType;
    this.submitDiv.appendChild(logIcon);
    this.submitDiv.appendChild(button);
    this.logInfo.appendChild(this.sideMessageFooter);
    this.redirect = document.getElementsByClassName("redirectLink")[0];
  }
  //?***********************************************************?
  loginForm(inf) {
    console.log("in login of ", inf);
    this.submitDiv.setAttribute("data-type", "login");
    setFormStyle("login");
    this.sideMessage("login");
    generateLoginForm(this.formDiv);
    this.registerLink = document.getElementById("createAccountLink");
    const passwordIcon = document.getElementsByClassName("hideP")[0];
    console.log(passwordIcon);
    passwordIcon.addEventListener("click", () => {
      if (passwordIcon.src.split("/assets/")[1] == "dormir.gif") {
        pass.showPassword("password-login", "passwordIcon");
      } else {
        pass.hidePassword("password-login", "passwordIcon");
      }
    });
    this.submitDiv.removeEventListener("click", handleRegister);
    this.submitDiv.addEventListener("click", handleLogin);
  }
  //?***********************************************************?
  registerForm() {
    this.submitDiv.setAttribute("data-type", "register");
    setFormStyle("register");
    this.sideMessage("register");
    generateRegisterForm(this.formDiv);
    this.loginLink = document.getElementById("loginLink");
    this.submitDiv.removeEventListener("click", handleLogin);
    this.submitDiv.addEventListener("click", handleRegister);
    //*password display
    const passwordIcon = document.getElementsByClassName("hideP")[0];
    passwordIcon.addEventListener("click", () => {
      console.log(passwordIcon.src);
      if (passwordIcon.src.split("/assets/")[1] == "dormir.gif") {
        pass.showPassword("password-register", "passwordIcon");
      } else {
        pass.hidePassword("password-register", "passwordIcon");
      }
    });
    //-------------------------------------------------------------------
    const confPasswordIcon = document.getElementsByClassName("hidePConf")[0];
    confPasswordIcon.addEventListener("click", () => {
      if (confPasswordIcon.src.split("/assets/")[1] == "dormir.gif") {
        pass.showPassword("confPassword-register", "confPasswordIcon");
      } else {
        pass.hidePassword("confPassword-register", "confPasswordIcon");
      }
    });
  }
  //?************************************************************?
  updateFormContent = () => {
    // refreshing page content according to clicked redirection link
    const link = this.redirect.dataset.redirect; // retrieving dataset from link
    switch (link) {
      case "login": //!switching to login
        this.formDiv.style.opacity = "0";
        this.sideMessageHeader.style.opacity = "0";
        this.logInfo.style.opacity = "0";
        this.formDiv.innerHTML = "";
        setTimeout(() => {
          // waiting for 400ms to generate login content
          this.submitDiv.innerHTML = "";
          this.formDiv.innerHTML = "";
          this.loginForm("update");
          this.formDiv.style.opacity = "1";
          this.sideMessageHeader.style.opacity = "1";
          this.logInfo.style.opacity = "1";
          // //*password display
          // const passwordIcon = document.getElementsByClassName("hideP")[0];
          // console.log(passwordIcon);
          // passwordIcon.addEventListener("click", () => {
          //   if (passwordIcon.src.split("/assets/")[1] == "dormir.gif") {
          //     pass.showPassword("password-login", "passwordIcon");
          //   } else {
          //     pass.hidePassword("password-login", "passwordIcon");
          //   }
          // });
          //*link redirection element
          this.redirect = document.getElementsByClassName("redirectLink")[0];
          this.redirect.addEventListener("click", this.updateFormContent);
        }, 400);
        //*adding switch animation
        this.textInfo.style.animation = "switchTextInfoBack 800ms ease-in-out";
        this.textInfo.style.transform = "translateX(0%)";
        this.formDiv.style.animation = "switchFormDivBack 800ms ease-in-out)";
        this.formDiv.style.transform = "translateX(0%)";
        break;

      case "register": //!switching to register content
        this.formDiv.style.opacity = "0";
        this.sideMessageHeader.style.opacity = "0";
        this.logInfo.style.opacity = "0";
        //*********************************************
        setTimeout(() => {
          //waiting 400ms to generate login content
          this.submitDiv.innerHTML = "";
          this.formDiv.innerHTML = "";
          this.registerForm();
          this.formDiv.style.opacity = "1";
          this.sideMessageHeader.style.opacity = "1";
          this.logInfo.style.opacity = "1";
          //*link redirection element
          this.redirect = document.getElementsByClassName("redirectLink")[0];
          this.redirect.addEventListener("click", this.updateFormContent);
        }, 400);
        //*addding switch animation
        this.textInfo.style.animation = "switchTextInfo 800ms ease-out";
        this.textInfo.style.transform = "translateX(135%)";
        this.formDiv.style.animation = "switchFormDiv 800ms ease-in-out)";
        this.formDiv.style.transform = "translateX(-75%)";
        setTimeout(() => {
          this.textInfo.style.opacity = 1;
          this.formDiv.style.opacity = 1;
        }, 100);
        break;
    }
  };
  moveToLogin = () => {
    this.formDiv.style.opacity = "0";
    this.sideMessageHeader.style.opacity = "0";
    this.logInfo.style.opacity = "0";
    this.formDiv.innerHTML = "";
    console.log(this.formDiv, this.submitDiv, this.sideMessageHeader);
    // //*adding switch animation
    this.textInfo.style.animation = "switchTextInfoBack 800ms ease-in-out";
    this.textInfo.style.transform = "translateX(0%)";
    this.formDiv.style.animation = "switchFormDivBack 800ms ease-in-out)";
    this.formDiv.style.transform = "translateX(0%)";
      this.submitDiv.innerHTML = "";
      this.formDiv.innerHTML = "";
      this.loginForm("move to");
      this.formDiv.style.opacity = "1";
      this.sideMessageHeader.style.opacity = "1";
      this.logInfo.style.opacity = "1";
      //*link redirection element
      this.redirect = document.getElementsByClassName("redirectLink")[0];
      this.redirect.addEventListener("click", this.updateFormContent);
  };
}
