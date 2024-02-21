export const alertError = (props = {}) => {
  console.log("in alert");
  const err = document.createElement("p");
  if (props.Location != "homeComment") {
    const field = document.getElementsByTagName("form")[0];
    err.id = `error-form-${props.Location}`;
    err.innerHTML = props.Msg;
    if (!document.getElementById(`error-form-${props.Location}`)) {
      field.appendChild(err);
    }
    setTimeout(() => {
      field.removeChild(err);
    }, 2000);
  } else {
    console.log("alert comment");
    const post = document.getElementById(props.Post),
      commentZone = post.querySelector(`.allaboutcomment`),
      commentForm = commentZone.querySelector(".new-comment-form");
    const submitButton = commentForm.querySelector("button");
    err.id = "error-comment";
    err.innerHTML = props.Msg;
    commentForm.insertBefore(err, submitButton);
    setTimeout(() => {
      commentForm.removeChild(err);
    }, 2000);
  }
};
