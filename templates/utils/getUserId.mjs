import { decode } from "./token.mjs";

export const getUserId = () => {
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
  return userInfo.payload.Id;
};
