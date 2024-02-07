export const alertError = (props = {}) => {
  console.log("in alert");
  const field = document.getElementsByTagName("form")[0];
  const err = document.createElement("p");
  err.id = `error-form-${props.Location}`;
  err.innerHTML = props.Msg;
  if (!document.getElementById("error-form")) {
    field.appendChild(err);
  }
  setTimeout(() => {
    field.removeChild(err);
  }, 2000);
};
