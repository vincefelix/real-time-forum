//import { updateFormContent } from "./formScript.mjs";
export const generateLoginForm = (This) => {
  This.innerHTML = `
    <form method="post">
    <fieldset id="credentials">
        <label for="email-login">Email/nickname
            <div id="email-holder">
                <img src="/static/./assets/a.svg" alt="@ icon" class="email icon">
                <input type="email"  name="email" id="email-login" class="log" placeholder="Ex: user@forum.sn or vm480" required>
            </div>
        </label>
        <label for="password-login">Password
            <div class="Password">
                <img src="/static/./assets/bloquer.svg" alt="lock" class="lock icon">
          <input type="password"  name="password" id="password-login" class="log" minLength="8" maxLength="15" placeholder="Enter your password" required>
          <img src="/static/./assets/dormir.gif" alt="hidePAssword" id="passwordIcon" class="hideP icon">
        </div>
        </label>
    </fieldset>
    </form>
    `;
};

export const moveToLogin = (This) => {
  This.formDiv.style.opacity = "0";
  This.sideMessageHeader.style.opacity = "0";
  This.logInfo.style.opacity = "0";
  This.formDiv.innerHTML = "";
  setTimeout(() => {
    //waiting 400ms to generate login content
    This.submitDiv.innerHTML = "";
    This.formDiv.innerHTML = "";
    This.loginForm();
    This.redirect = document.getElementsByClassName("redirectLink")[0];
    This.redirect.addEventListener("click", updateFormContent);
    This.formDiv.style.opacity = "1";
    This.sideMessageHeader.style.opacity = "1";
    This.logInfo.style.opacity = "1";
  }, 400);
  //*adding switch animation
  This.textInfo.style.animation = "switchTextInfoBack 800ms ease-in-out";
  This.textInfo.style.transform = "translateX(0%)";
  This.formDiv.style.animation = "switchFormDivBack 800ms ease-in-out)";
  This.formDiv.style.transform = "translateX(0%)";
};
