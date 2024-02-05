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
  let formDiv = document.getElementById("form"),
    header = document.getElementById("top"),
    footer = document.getElementById("bottom"),
    submitDiv = document.getElementById("submit-btn"),
    logInfo = document.getElementById("log-info"),
    textInfo = document.getElementById("text-info");
  formDiv.style.opacity = "0";
  header.style.opacity = "0";
  logInfo.style.opacity = "0";
  formDiv.innerHTML = "";
  //  This.formDiv.style.opacity = "0";
  //  This.sideMessageHeader.style.opacity = "0";
  //  This.logInfo.style.opacity = "0";
  //  This.formDiv.innerHTML = "";
  setTimeout(() => {
    // waiting for 400ms to generate login content
    submitDiv.innerHTML = "";
    //This.submitDiv.innerHTML = "";
    formDiv.innerHTML = "";
    //This.formDiv.innerHTML = "";
    This.loginForm();
    formDiv.style.opacity = "1";
    //This.formDiv.style.opacity = "1";
    header.style.opacity = "1";
    //This.sideMessageHeader.style.opacity = "1";
    logInfo.style.opacity = "1";
    //This.logInfo.style.opacity = "1";
    // //*password display
    //*link redirection element
    This.redirect = document.getElementsByClassName("redirectLink")[0];
    This.redirect.addEventListener("click", updateFormContent);
    This.formDiv.style.opacity = "1";
    This.sideMessageHeader.style.opacity = "1";
    This.logInfo.style.opacity = "1";
  }, 400);
  //*adding switch animation
  textInfo.style.animation = "switchTextInfoBack 800ms ease-in-out";
  //This.textInfo.style.animation = "switchTextInfoBack 800ms ease-in-out";
  textInfo.style.transform = "translateX(0%)";
  //This.textInfo.style.transform = "translateX(0%)";
  formDiv.style.animation = "switchFormDivBack 800ms ease-in-out)";
  //This.formDiv.style.animation = "switchFormDivBack 800ms ease-in-out)";
  formDiv.style.transform = "translateX(0%)";
  //This.formDiv.style.transform = "translateX(0%)";
};
