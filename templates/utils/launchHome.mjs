import { initHome } from "../homeDOM/main.mjs";
import { decode } from "./JWT.mjs";
import { setHomeStyle, removeHomeStyle } from "./setStyle.mjs";

export const launchHome = () => {
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
    // container.innerHTML = `
    // <p id="succeedeed">HOME REACHED</p>
    // <p id="succeedeed">${userInfo.payload.Id}</p>
    // <p id="succeedeed">${userInfo.payload.FirstName}</p>
    // <p id="succeedeed">${userInfo.payload.LastName}</p>
    // <p id="succeedeed">${userInfo.payload.Age}</p>
    // <p id="succeedeed">${userInfo.payload.Gender}</p>
    // <p id="succeedeed">${userInfo.payload.Email}</p>
    // `;
    removeHomeStyle();
    setHomeStyle();
    initHome(userInfo);
  }, 500);
};
