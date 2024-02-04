import { initHome } from "../homeDOM/main.mjs";
import { decode } from "./token.mjs";
import { setHomeStyle, removeHomeStyle } from "./setStyle.mjs";

export const launchHome = (posts, userList) => {
  let userInfo = localStorage.getItem("jwtToken");
  try {
    userInfo = decode(userInfo);
  } catch (error) {
    console.log(`Error decoding token: ${error}`);
    container.innerHTML = "";
    container.innerHTML = `
    <p id="succeedeed">error JWT</p>
    `;
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
