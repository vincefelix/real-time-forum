import { socket } from "../socket/initForum.mjs";
import { getUserId, getUser_Nickname } from "../utils/getUserId.mjs";

export function getMessageInput() {
  const messageInput = document.getElementById(`newMessageInput`);
  const messageText = messageInput.value;
  return messageText;
}
export function sendMessage(userName, sender, message, time, idMess) {
  // Récupérer le contenu du champ de saisie
  let usernameHeader = userName.includes("@") ? userName : "@" + userName;
  const messageInput = document.getElementById(`newMessageInput`);

  // Créer un nouvel élément de message
  const messageItem = document.createElement("div");
  messageItem.className = "message-item";
  messageItem.dataset.id = idMess;

  const messUser = getUser_Nickname() == sender ? "moi" : usernameHeader;
  const senderName = document.createElement("span");
  senderName.innerHTML = `${messUser} ` + `<small>${time}</small>`;

  const messageTextElement = document.createElement("pre");
  messageTextElement.className = "textofmsg"
  messageTextElement.textContent = message;

  messageItem.appendChild(senderName);
  messageItem.appendChild(messageTextElement);

  const messageHistoryContainer = document.getElementById("messagePopupBody");
  // Ajouter le nouveau message à l'historique des messages
  const ST = messageHistoryContainer.scrollTop,
    SH = messageHistoryContainer.scrollHeight;
  // console.log("sh bf => ", SH);
  // console.log("st bf=> ", ST);
  if (messUser == "moi") {
    messageItem.classList.add("me-msg");
  } else {
    messageItem.classList.add("other-msg");
  }
  messageHistoryContainer.appendChild(messageItem);
  //?-------deciding wether moving the scrollstate to the bottom or not
  // console.log("sh aft => ", SH);
  // console.log("st aft => ", ST);
  // console.log("res => ", SH - ST);
  if (SH - ST <= 182)
    // console.log("🟢 in new scroll ", SH - ST),
    messageHistoryContainer.scrollTop = messageHistoryContainer.scrollHeight;

  console.log("messUser => ", messUser);
  if (messUser == "moi") {
    if (SH - ST > 182)
      messageHistoryContainer.scrollTop = messageHistoryContainer.scrollHeight;
    messageInput.value = "";
  }
}

export function addMessage(sender, receiver, message, date, idMess) {
  console.log(
    `adding message sender : ${sender}, receiver: ${receiver}, content: "${message}", date: "${date}"`
  );
  const username = getUser_Nickname() == sender ? receiver : "@" + sender;
  const messageHistoryContainer = document.getElementById("messagePopupBody");
  // Créer un nouvel élément de message
  const messageItem = document.createElement("div");
  messageItem.className = "message-item";
  messageItem.dataset.id = idMess;

  const senderName = document.createElement("span");
  senderName.textContent =
    getUser_Nickname() == sender
      ? "moi"
      : username.includes("@")
      ? username
      : "@" + username;
  senderName.innerHTML += ` <small id="date-text">${date}</small>`;

  const messageTextElement = document.createElement("div");
  messageTextElement.textContent = message;
  if (getUser_Nickname() == sender) {
    messageItem.classList.add("me-msg");
  } else {
    messageItem.classList.add("other-msg");
  }
  messageItem.appendChild(senderName);
  messageItem.appendChild(messageTextElement);
  messageHistoryContainer.insertBefore(
    messageItem,
    messageHistoryContainer.firstChild
  );
  console.log("message added successfully");
}

export function isChatBox_opened(chatUsername) {
  chatUsername = chatUsername.includes("@") ? chatUsername : `@${chatUsername}`;
  console.log("is chat box opened with " + chatUsername + " ?");
  const parent = document.getElementById("chatbox"),
    titleChat = parent.querySelector("#title-name").textContent;
  console.log("chat is open with: ", titleChat);
  if (parent.style.display == "none" || titleChat != chatUsername) {
    return false;
  } else if (parent.style.display == "block" && titleChat == chatUsername) {
    return true;
  }
}
export function addComment() {
  console.log("Comment added!");
  let commentvalue = this.previousElementSibling.value;
  // console.log("text written: ", commentvalue);
  let test = this.parentElement;
  let addedcommentid = test.parentElement.parentElement.id;
  // console.log("Added to post id: ", addedcommentid);
  this.previousElementSibling.value = "";
  const comment = {
    Type: "createComment",
    payload: {
      user_id: getUserId(),
      post_id: addedcommentid,
      content: commentvalue,
      data: document.cookie,
    },
  };
  console.log("comment sent => ", comment);
  socket.mysocket.send(JSON.stringify(comment));
}
export function increment_CommentCount(postId) {
  const commentCount = document
    .getElementById(postId)
    .querySelector(".comment-counter");
  commentCount.innerHTML = parseInt(commentCount.innerText) + 1;
  console.log(commentCount);
}
// --------------------------------categoriesadded---------

export function categoryToggle() {
  var categorySelect = document.getElementById("postCategories");
  var isMouseDown = false;

  categorySelect.addEventListener("mousedown", function (event) {
    isMouseDown = true;
    event.target.selected = !event.target.selected;
    event.preventDefault();
  });

  categorySelect.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
      event.target.selected = !event.target.selected;
      event.preventDefault();
    }
  });

  categorySelect.addEventListener("mouseup", function () {
    isMouseDown = false;
  });
}
//!----------------------------------------!
export function GetPostValue() {
  var selectedCategories = [];
  var categoriesSelect = document.getElementById("postCategories");

  for (var i = 0; i < categoriesSelect.options.length; i++) {
    if (categoriesSelect.options[i].selected) {
      selectedCategories.push(categoriesSelect.options[i].value);
    }
  }

  var postText = document.getElementById("postText").value;
  // var postImage = document.getElementById("postImage").value;
  var postTitle = document.getElementById("postTitleInput").value;

  console.log("Selected Categories:", selectedCategories);
  console.log("Post Text:", postText);
  // console.log("Post Image:", postImage);
  console.log("Post Title:", postTitle);

  const post = {
    type: "createPost",
    payload: {
      user_id: getUserId(),
      title: postTitle,
      content: postText,
      image: "/static/./assets/user-connection/profile1.png",
      categories: selectedCategories,
      data: document.cookie,
    },
  };
  console.log("post inf", JSON.stringify(post));
  socket.mysocket.send(JSON.stringify(post));
}
