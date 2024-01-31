import { profil } from "./profilElement.mjs";
const profilProps = {
  /**/ imageLink: "/assets/profil-img.png",
  /***/ imageAlt: "boy pp",
  /****/ imageId: "pp",
  /*****/ userNameValue: "@ranos",
  /******/ fullNameValue: "Ranos ROUND",
  /*******/ ageValue: "15 years",
  /********/ genderValue: "male",
  /*********/ emailValue: "ranos@vm.com",
};

const handleProfilGen = () => {
  const profilElement = new profil(profilProps);
  profilElement.init();
  profilLink.removeEventListener("click", handleProfilGen);
};

const profilLink = document.getElementById("profil-link");
profilLink.addEventListener("click", handleProfilGen);
