import { socket } from "../socket/initForum.mjs";
import { getUserId } from "../utils/getUserId.mjs";
import { mainContent } from "./main.mjs";
// --------------------Message----------------------

export function openMessagePopup() {
  var messagePopup = document.getElementById("messagePopup");
  messagePopup.style.display = "block";
}

export function closeMessagePopup() {
  var messagePopup = document.getElementById("messagePopup");
  messagePopup.style.display = "none";
}

export function sendMessage(userName) {
  // Récupérer le contenu du champ de saisie
  const messageInput = document.getElementById(`newMessageInput-${userName}`);
  const messageText = messageInput.value;

  // Créer un nouvel élément de message
  const messageItem = document.createElement("div");
  messageItem.className = "message-item";

  const senderName = document.createElement("span");
  senderName.textContent = "Moi"; // Vous pouvez utiliser le nom de l'utilisateur actuel

  const messageTextElement = document.createElement("div");
  messageTextElement.textContent = messageText;

  messageItem.appendChild(senderName);
  messageItem.appendChild(messageTextElement);

  // Ajouter le nouveau message à l'historique des messages
  const messageHistoryContainer = document.getElementById(
    `messagePopupBody-${userName}`
  );
  messageHistoryContainer.appendChild(messageItem);

  // Effacer le champ de saisie après l'envoi
  messageInput.value = "";
}

export function addComment() {
  console.log("Comment added!");
  let commentvalue = this.previousElementSibling.value;
  console.log("text written: ", commentvalue);
  let test = this.parentElement;
  let addedcommentid = test.parentElement.parentElement.id;
  console.log("Added to post id: ", addedcommentid);
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
  //mainContent.createComment(addedcommentid, "test", "", "", commentvalue);
}

export function showConnectedMessages(userName) {
  // Masquer toutes les boîtes de dialogue des messages
  document.querySelectorAll(".message-popup").forEach(function (popup) {
    popup.style.display = "none";
  });

  // Afficher la boîte de dialogue des messages pour l'utilisateur spécifique
  var popupId = "messagePopup-" + userName;
  var popup = document.getElementById(popupId);
  if (popup) {
    showAllInfoMsg();
    popup.style.display = "block";
  }
}

export function showAllInfoMsg() {
  console.log("dokhna");
  document.querySelectorAll(".allinfo-msg").forEach(function (allinfoMsg) {
    allinfoMsg.style.display = "block";
  });
}

// export function toggleComments() {
//   const commentsSection = document.getElementById("commentsSection");
//   const newCommentForm = document.getElementById("newCommentForm");

//   // Toggle the 'active' class to show/hide comments section and new comment form
//   commentsSection.classList.toggle("active");
//   newCommentForm.classList.toggle("active");
//   // Appeler la fonction pour chaque post individuellement
//   //const feedPosts = document.querySelectorAll('.feedpost');
//   //feedPosts.forEach(postContainer => {
//   //   handleLikesAndDislikes(postContainer);
//   // });
// }

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
