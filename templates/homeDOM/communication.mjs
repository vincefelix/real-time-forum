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
  console.log("received username ", userName);
  console.log("chat header ", usernameHeader);
  const messageInput = document.getElementById(`newMessageInput`);
  console.log("message input => ", messageInput);

  // Créer un nouvel élément de message
  const messageItem = document.createElement("div");
  messageItem.className = "message-item";
  messageItem.dataset.id = idMess;

  const messUser = getUser_Nickname() == sender ? "moi" : usernameHeader;
  const senderName = document.createElement("span");
  senderName.innerHTML = `${messUser} ` + `<small>${time}</small>`;

  const messageTextElement = document.createElement("div");
  messageTextElement.textContent = message;

  messageItem.appendChild(senderName);
  messageItem.appendChild(messageTextElement);

  // Ajouter le nouveau message à l'historique des messages

  const messageHistoryContainer = document.getElementById("messagePopupBody");
  messageHistoryContainer.appendChild(messageItem);
  console.log("messUser => ", messUser);
  if (messUser == "moi") {
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

  messageItem.appendChild(senderName);
  messageItem.appendChild(messageTextElement);
  messageHistoryContainer.insertBefore(
    messageItem,
    messageHistoryContainer.firstChild
  );
  console.log("message added successfully");
}

export function isChatBox_opened(chatUsername) {
  console.log("is chat box opened with " + chatUsername + " ?");
  const parent = document.getElementById("chatbox");
  console.log("in chatbox check\n parent => ", parent);
  if (parent.style.display == "none") {
    return false;
  } else if (parent.style.display == "block") {
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

document.addEventListener("DOMContentLoaded", function () {
  function handleLikesAndDislikes(postContainer) {
    const likeCounter = postContainer.querySelector(".like-counter");
    const dislikeCounter = postContainer.querySelector(".dislike-counter");

    // Initialiser les compteurs
    let likeCount = parseInt(likeCounter.textContent);
    let dislikeCount = parseInt(dislikeCounter.textContent);

    // Fonction pour mettre à jour les compteurs
    const updateCounters = () => {
      likeCounter.textContent = likeCount.toString();
      dislikeCounter.textContent = dislikeCount.toString();
    };

    let count = 0;

    postContainer
      .querySelector(".like-reaction")
      .addEventListener("click", () => {
        count++;
        if (count % 2 !== 0) {
          likeCount++;
        } else {
          likeCount--;
        }
        if (discounting > 0 && discounting % 2 !== 0) {
          dislikeCount--;
          discounting--;
        }
        updateCounters();
      });
    let discounting = 0;
    // Ajouter un gestionnaire de clics à la section de dislike
    postContainer
      .querySelector(".dislike-reaction")
      .addEventListener("click", () => {
        discounting++;
        if (discounting % 2 !== 0) {
          dislikeCount++;
        } else {
          dislikeCount--;
        }
        if (count > 0 && count % 2 !== 0) {
          likeCount--;
          count++;
        }
        updateCounters();
      });
  }

  // Appeler la fonction pour chaque post individuellement
  const feedPosts = document.querySelectorAll(".feedpost");
  feedPosts.forEach((postContainer) => {
    handleLikesAndDislikes(postContainer);
  });
});
