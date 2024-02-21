import { error } from "../error/error.mjs";
import { decode } from "./token.mjs";

export const getUserId = () => {
  let userInfo = localStorage.getItem("jwtToken");
  try {
    userInfo = decode(userInfo);
  } catch (e) {
    console.log(`Error decoding token: ${e}`);
    const hdleError = new error("400", "invalid JWT", "home");
    hdleError.display();
    hdleError.redirect();
    return;
  }
  return userInfo.payload.Id;
};

export const getUser_Nickname = () => {
  let userInfo = localStorage.getItem("jwtToken");
  try {
    userInfo = decode(userInfo);
  } catch (e) {
    console.log(`Error decoding token: ${e}`);
    const hdleError = new error("400", "invalid JWT", "home");
    hdleError.display();
    hdleError.redirect();
    return;
  }
  return userInfo.payload.NickName;
};
