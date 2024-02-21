export const setCookies = (props = {}) => {
  console.log("value => ", props.Value);
  console.log("expire => ", props.Expire);
  document.cookie = `vmSession=${props.Value}; expires=${new Date(
    props.Expire
  ).toUTCString()}; path: "/"; SameSite=none domain="localhost"`;
  console.log("doc debug", document.cookie);
};

export const deleteCookie = (cookie) => {
  console.log("deleting cookie");
  console.log("before => ", document.cookie);
  document.cookie =
    cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  console.log("after => ", document.cookie);
};
