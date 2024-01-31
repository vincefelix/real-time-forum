export const generateRegisterForm = (This) => {
  This.innerHTML = `
<form method="post">
<fieldset id="personal-info">
        <label for="name" id="nameLabel">Name :
            <div id="name-holder" class="holder">
                <img src="/static/./assets/utilisateur.svg" alt="user icon" class="user icon">
                <input type="text" id="name" name="name" minLength="2" maxLength="20" placeholder="Enter your name" required>
            </div>
        </label>
        <label for="lastName" id="lastNameLabel"> Last name :
              <div id="lastName-holder" class="holder">
                 <img src="/static/./assets/utilisateur.svg" alt="user icon" class="user icon">
                 <input type="text" id="lastName" name="lastName" minLength="2" maxLength="15" placeholder="Enter your last name" required>
              </div>
        </label>
        <label for="nickName" id="nickNameLabel" > Nickname :
            <div id="nickName-holder" class="holder">
                <img src="/static/./assets/utilisateur.svg" alt="user icon" class="user icon">
                <input type="text" id="nickName" name="nickName" minLength="2" maxLength="10" placeholder="Enter your nickname" required>
            </div>
        </label>
        <label for="age" id="ageLabel">Age :
            <div id="age-holder">
                <img src="/static/./assets/age.svg" alt="cal icon" class="age icon">
                <input type="number" name="age" id="age" inputmode="numeric"  min="12" max="99" value="12" maxLength="2" required>
            </div>
        </label>
        <label for="gender" id="genderLabel">Gender :
            <select name="gender" id="gender" required>
                <option value="">-------------</option>
                <option value="male">♂️ Male</option>
                <option value="female">♀️ Female</option>
            </select>
        </label>
</fieldset>
<hr id="separator">
<fieldset id="credentials">
    <label for="email-register">Email
        <div id="email-holder">
            <img src="/static/./assets/a.svg" alt="@ icon" class="email icon">
            <input type="email"  name="email" id="email-register" maxLength="126" placeholder="user@forum.sn" required>
        </div>
    </label>
    <label for="password-register">Password
        <div class="Password">
      <input type="password"  name="password" id="password-register" minLength="8" maxLength="15"placeholder="Enter your password" required>
      <img src="/static/./assets/dormir.gif" alt="hidePAssword" id="passwordIcon" class="hideP icon">
    </div>
    </label>
    <label for="confPassword-register">Confirm password
        <div class="Password">
      <input type="password" name="password" id="confPassword-register" minLength="8" maxLength="15" placeholder="Confirm your password" required>
      <img src="/static/./assets/dormir.gif" class="hidePConf icon" id="confPasswordIcon" alt="hidePAssword">
    </div>
    </label>
</fieldset>
</form>
</div>
`;
};
