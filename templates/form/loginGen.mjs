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
