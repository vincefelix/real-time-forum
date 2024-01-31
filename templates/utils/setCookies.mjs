export const setCookies = (props = {}) => {
  console.log("value => ", props.Value);
  console.log("expire => ", props.Expire);
  document.cookie = `vmSession=${props.Value}; expires=${new Date(
    props.Expire
  ).toUTCString()}; path: "/"; SameSite=none domain="localhost"`;
  console.log("doc debug", document.cookie);
};
