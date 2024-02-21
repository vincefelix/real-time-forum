import { initHome } from "../homeDOM/main.mjs";
import { decode } from "./token.mjs";
import { setHomeStyle, removeHomeStyle } from "./setStyle.mjs";
import { error } from "../error/error.mjs";

export const launchHome = (posts, userList) => {
  let userInfo = localStorage.getItem("jwtToken");
  try {
    userInfo = decode(userInfo);
  } catch (err) {
    const hdleError = new error(400, "Oops JWT is missing...!", "home");
    hdleError.display();
    hdleError.redirect("cookie=empty");
    console.log(`Error decoding token: ${err}`);
    // container.innerHTML = "";
    // container.innerHTML = `
    // <p id="succeedeed">error JWT</p>
    // `;
    return;
  }
  console.log("after decoding jwt =>", userInfo);
  document.body.innerHTML = "";
  setTimeout(() => {
    removeHomeStyle();
    setHomeStyle();
    initHome(userInfo, posts, userList);
  }, 500);
};
