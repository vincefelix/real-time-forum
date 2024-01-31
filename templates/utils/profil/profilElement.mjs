/*
    @properties {
    imgLink
    imgAlt
    imgId
    userNameValue
    fullNameValue
    ageValue
    genderValue
    emailValue
    }
    */
export class profil {
  constructor(props = {}) {
    //------------- info values
    for (const [key, value] of Object.entries(props)) {
      console.log(`${key}: ${value}`);
      this[key] = value;
    }
    //----------  containers
    this.profilBox = document.createElement("div");
    this.topContainer = document.createElement("div");
    this.nameContainer = document.createElement("div");
    this.infoContainer = document.createElement("div");
    this.infoList = document.createElement("ul");
    //---------  childs
    this.userImg = document.createElement("img");
    this.userName = document.createElement("p");
    this.userFullName = document.createElement("p");
    //--------- setting attributes
    this.profilBox.id = "profil-content";
    this.topContainer.id = "profil-top-container";
    this.nameContainer.id = "name-container";
    this.infoContainer.id = "info-container";
    this.userName.id = "pp-username";
    this.userFullName.id = "pp-fullname";
    this.userImg.id = this.imageId;
    this.userImg.src = this.imageLink;
    this.userImg.alt = this.imageAlt;
    //------------------ setting values
    this.userName.textContent = this.userNameValue;
    this.userFullName.textContent = this.fullNameValue;
    //----------------- adding DOM
    this.topContainer.appendChild(this.userImg);
    this.nameContainer.appendChild(this.userName);
    this.nameContainer.appendChild(this.userFullName);
    this.generateInfoList("Age", "years-pp", this.ageValue);
    this.generateInfoList("Gender", "gender-pp", this.genderValue);
    this.generateInfoList("Email", "mail-pp", this.emailValue);
    this.infoContainer.appendChild(this.infoList);
    //-------------------------------------------
    this.profilBox.appendChild(this.topContainer);
    this.profilBox.appendChild(this.nameContainer);
    this.profilBox.appendChild(this.infoContainer);
  }
  generateInfoList(infoType, id, value) {
    this[`${infoType.toLowerCase}List`] = document.createElement("li");
    this[`${infoType.toLowerCase}List`].innerHTML = this.formatInfoList(
      infoType,
      id,
      value
    );
    this.infoList.appendChild(this[`${infoType.toLowerCase}List`]);
  }

  formatInfoList(info, id, value) {
    return `${info}: <i id="${id}">${value}</i>`;
  }
  init() {
    const main = document.getElementsByTagName("main")[0],
      mainContent = document.getElementsByClassName("main-content")[0];
    main.insertBefore(this.profilBox, mainContent);
    mainContent.style.visibility = "hidden";
  }
}