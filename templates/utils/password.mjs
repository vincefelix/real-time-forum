export const showPassword = (type, icon) => {
  const input = document.getElementById(type),
    showIcon = document.getElementById(icon);
  console.log(`type of show => ${type} and dom ${input}`);
  showIcon.setAttribute("src", "/static/./assets/voir.gif");
  input.type = "text";
};

export const hidePassword = (type, icon) => {
  const input = document.getElementById(type),
  hideIcon = document.getElementById(icon);
  console.log(`type of hide => ${type} and dom ${input}`);
  hideIcon.setAttribute("src", "/static/./assets/dormir.gif");
  input.type = "password";
};
