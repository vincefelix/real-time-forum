import * as com from "./communication.mjs";
import { deletePostValues } from "../utils/script.js";

export class MainContentSection {
  constructor() {}

  addCommentsToPost(postContainer, comments) {
    const commentsSection = postContainer.querySelector(".comments-section");
    if (commentsSection) {
      comments.forEach((comment) => {
        const commentElement = this.createComment(
          comment.username,
          comment.userImageSrc,
          comment.commentText
        );
        commentsSection.appendChild(commentElement);
      });
    }
  }

  init() {
    const mainContentSection = document.createElement("section");
    mainContentSection.className = "main-content";

    // Create Create Post
    const createPost = this.createPostSection();

    // Create Feed
    const feed = document.createElement("div");
    feed.className = "feed";

    // Generate posts
    // this.generatePosts(feed, 3);

    // Append create post and feed to main-content section
    mainContentSection.appendChild(createPost);
    mainContentSection.appendChild(feed);

    // Append main-content section to body
    document.body.appendChild(mainContentSection);
  }
  createPostSection() {
    const createPost = document.createElement("div");
    createPost.className = "create-post";

    const addPostContainer = document.createElement("div");
    addPostContainer.className = "add-post-container";

    const postTitle = document.createElement("h2");
    postTitle.textContent = "Post";
    addPostContainer.appendChild(postTitle);

    const addPostForm = document.createElement("form");
    addPostForm.id = "addPostForm";

    addPostContainer.appendChild(addPostForm);
    createPost.appendChild(addPostContainer);

    return createPost;
  }
  // addCommentsToPost(postContainer, comments) {
  //     const commentsSection = postContainer.querySelector('.comments-section');
  //     if (commentsSection) {
  //         comments.forEach(comment => {
  //             const commentElement = this.createComment(comment.username, comment.userImageSrc, comment.commentText);
  //             commentsSection.appendChild(commentElement);
  //         });
  //     }
  // }
  createComment(postId, username, thetime, userImageSrc, commentText) {
    // Créez un élément de commentaire
    const commentContainer = document.createElement("div");
    commentContainer.className = "comment";

    const userSection = document.createElement("div");
    userSection.className = "user-section";

    const userImage = document.createElement("img");
    userImage.src = userImageSrc;
    userImage.alt = "";

    const usernameElement = document.createElement("span");
    usernameElement.textContent = username;

    const publicationtime = document.createElement("span");
    publicationtime.className = "time-comment";
    publicationtime.textContent = thetime;

    userSection.appendChild(userImage);
    userSection.appendChild(usernameElement);
    userSection.appendChild(publicationtime);

    // Créez la section de texte du commentaire
    const commentTextSection = document.createElement("div");
    commentTextSection.className = "comment-text";
    commentTextSection.textContent = commentText;

    // Ajoutez les sections au conteneur de commentaire
    commentContainer.appendChild(userSection);
    commentContainer.appendChild(commentTextSection);

    // Trouvez le post correspondant à l'ID
    const post = document.getElementById(postId);
    if (post) {
      // Trouvez la section des commentaires du post
      const commentsSection = post.querySelector(".comments-section");
      if (commentsSection) {
        commentsSection.appendChild(commentContainer);
      }
    }
  }

  generatePosts(feedContainer, numberOfPosts) {
    for (let i = 0; i < numberOfPosts; i++) {
      const post = this.createPost();
      feedContainer.appendChild(post);
    }
  }
  //postid, profil src, author, img src, content, likecount, dislikecount, comment count
  createAndAddPost(postDetails, option = false) {
    console.log("in post create");
    const feed = document.querySelector(".feed"); // Sélectionnez la section de feed

    const post = this.createPost(...postDetails); // Utilisez votre méthode createPost pour créer un post

    // Ajoutez le post à la section de feed
    if (!option) {
      feed.appendChild(post);
    } else {
      feed.insertBefore(post, feed.children[0]);
    }
  }

  createPost(
    postTitleInput,
    idofpost,
    profileImageSrc,
    publisherName,
    postImageSrc,
    postText,
    Categories,
    likeCount,
    dislikeCount,
    commentCount
  ) {
    // Create postContainer
    const postContainer = document.createElement("div");
    postContainer.className = "feedpost";
    postContainer.id = idofpost;
    // Create user-publish section
    const userPublish = document.createElement("div");
    userPublish.className = "user-publish";

    const userImage = document.createElement("img");
    userImage.src = profileImageSrc;
    userImage.alt = "";

    const publisherNameElement = document.createElement("span");
    publisherNameElement.className = "publisher-name";
    publisherNameElement.textContent = publisherName;

    userPublish.appendChild(userImage);
    userPublish.appendChild(publisherNameElement);

    // Create a-post section
    const postTitleContent = document.createElement("pre");
    postTitleContent.className = "postTitle-Content";
    postTitleContent.textContent = postTitleInput;

    const aPost = document.createElement("div");
    aPost.className = "a-post";

    // Ajoutez une section pour le texte du post avant l'image
    const postTextSection = document.createElement("div");
    postTextSection.className = "post-text";

    // Ajouter les catégories
    const categoriesSection = document.createElement("div");
    categoriesSection.className = "post-categories";

    Categories.forEach((category) => {
      const categoryParagraph = document.createElement("p");
      categoryParagraph.textContent = category;
      categoriesSection.appendChild(categoryParagraph);
    });

    postTextSection.appendChild(categoriesSection);
    aPost.appendChild(postTitleContent);

    // Créez un élément <pre> pour afficher le texte du post
    const postTextContent = document.createElement("pre");
    postTextContent.textContent = postText;

    postTextSection.appendChild(postTextContent);

    // Ajoutez la section de texte du post juste avant l'image
    aPost.appendChild(postTextSection);

    // Ajoutez la section pour l'image du post
    const postImageElement = document.createElement("img");
    postImageElement.src = postImageSrc;
    postImageElement.alt = "";

    aPost.appendChild(postImageElement);

    //Ajouter les cathegories

    // Create reaction-table section
    const reactionTable = document.createElement("div");
    reactionTable.className = "reaction-table";

    // Create user-img-feed section
    const userImgFeed = document.createElement("div");
    userImgFeed.className = "user-img-feed";

    const userImgFeedImage = document.createElement("img");
    userImgFeedImage.src = profileImageSrc;
    userImgFeedImage.alt = "";

    userImgFeed.appendChild(userImgFeedImage);

    // Create like-reaction section
    const likeReaction = document.createElement("div");
    likeReaction.className = "like-reaction";

    const likeImg = document.createElement("img");
    likeImg.src = "/static/./assets/like.png";
    likeImg.alt = "";

    const likeText = document.createElement("span");
    likeText.className = "reaction-text";
    likeText.textContent = "like";

    const likeCounter = document.createElement("span");
    likeCounter.className = "like-counter";
    likeCounter.textContent = likeCount;

    likeReaction.appendChild(likeImg);
    likeReaction.appendChild(likeText);
    likeReaction.appendChild(likeCounter);

    // Create dislike-reaction section
    const dislikeReaction = document.createElement("div");
    dislikeReaction.className = "dislike-reaction";

    const dislikeImg = document.createElement("img");
    dislikeImg.src = "/static/./assets/dislike.png";
    dislikeImg.alt = "";

    const dislikeText = document.createElement("span");
    dislikeText.className = "reaction-text";
    dislikeText.textContent = "Dislike";

    const dislikeCounter = document.createElement("span");
    dislikeCounter.className = "dislike-counter";
    dislikeCounter.textContent = dislikeCount;

    dislikeReaction.appendChild(dislikeImg);
    dislikeReaction.appendChild(dislikeText);
    dislikeReaction.appendChild(dislikeCounter);

    // Create about-comment section
    const aboutComment = document.createElement("div");
    aboutComment.className = "about-comment";

    // Create comment-reaction section
    const commentReaction = document.createElement("div");
    commentReaction.className = "comment-reaction";
    // commentReaction.onclick = com.toggleComments;
    commentReaction.addEventListener("click", function () {
      const allAboutComment = postContainer.querySelector(".allaboutcomment");
      if (
        allAboutComment.style.display === "none" ||
        !allAboutComment.style.display
      ) {
        allAboutComment.style.display = "block";
      } else {
        allAboutComment.style.display = "none";
      }
    });

    const commentImg = document.createElement("img");
    commentImg.src = "/static/./assets/comment.png";
    commentImg.alt = "";

    const commentText = document.createElement("span");
    commentText.className = "reaction-text";
    commentText.textContent = "Comment";

    const commentCounter = document.createElement("span");
    commentCounter.className = "comment-counter";
    commentCounter.textContent = commentCount;

    commentReaction.appendChild(commentImg);
    commentReaction.appendChild(commentText);
    commentReaction.appendChild(commentCounter);

    aboutComment.appendChild(commentReaction);

    // Add commentcontainertoogle
    const tooglecomment = document.createElement("div");
    tooglecomment.className = "allaboutcomment";

    // Create comments-section section
    const commentsSection = document.createElement("div");
    commentsSection.className = "comments-section";
    commentsSection.id = "commentsSection";

    // Create new-comment-form section
    const newCommentForm = document.createElement("div");
    newCommentForm.className = "new-comment-form";
    newCommentForm.id = "newCommentForm";

    const commentTextarea = document.createElement("textarea");
    commentTextarea.className = "Toaddacomment";
    commentTextarea.required = true;
    commentTextarea.maxLength = 250;
    commentTextarea.minLength = 2;
    commentTextarea.placeholder = "Add a comment";

    const postButton = document.createElement("button");
    postButton.textContent = "Post";
    postButton.onclick = com.addComment;

    newCommentForm.appendChild(commentTextarea);
    newCommentForm.appendChild(postButton);

    // Append sections to reactionTable
    reactionTable.appendChild(userImgFeed);
    reactionTable.appendChild(likeReaction);
    reactionTable.appendChild(dislikeReaction);
    reactionTable.appendChild(aboutComment);

    tooglecomment.appendChild(commentsSection);
    tooglecomment.appendChild(newCommentForm);

    // Append sections to postContainer
    postContainer.appendChild(userPublish);
    postContainer.appendChild(aPost);
    postContainer.appendChild(reactionTable);
    postContainer.appendChild(tooglecomment);
    // postContainer.appendChild(newCommentForm);

    deletePostValues();
    return postContainer;
  }

  createPostSection() {
    const createPost = document.createElement("div");
    createPost.className = "create-post";

    const addPostContainer = document.createElement("div");
    addPostContainer.className = "add-post-container";

    const postTitle = document.createElement("h2");
    postTitle.textContent = "Post";

    const postTitleInput = document.createElement("input");
    postTitleInput.type = "text";
    postTitleInput.minLength = 2;
    postTitleInput.id = "postTitleInput";
    postTitleInput.placeholder = "Enter post title...";

    const addPostForm = document.createElement("form");
    addPostForm.id = "addPostForm";

    // Create textarea for post text
    const postTextArea = document.createElement("textarea");
    postTextArea.maxLength = 250;
    postTextArea.minLength = 2;
    postTextArea.required = true;
    postTextArea.id = "postText";
    postTextArea.placeholder = "Saisissez votre message";

    function enableCtrlClickSelection(selectElement) {
      selectElement.addEventListener("mousedown", function (event) {
        event.preventDefault();
        const isCtrlPressed = event.metaKey || event.ctrlKey; // Vérifier si la touche Ctrl est déjà enfoncée

        if (!isCtrlPressed) {
          // Si Ctrl n'est pas enfoncé, ajouter la classe pour simuler le comportement Ctrl
          const selectedOption = event.target;
          selectedOption.classList.toggle("ctrl-selected");
        }
      });
    }

    function enableCtrlClickSelection(selectElement) {
      selectElement.addEventListener("mousedown", function (event) {
        const isCtrlPressed = event.metaKey || event.ctrlKey; // Vérifier si la touche Ctrl est déjà enfoncée

        if (!isCtrlPressed) {
          event.preventDefault();

          const selectedOption = event.target;
          const isSelected = selectedOption.selected;

          // Inverser la sélection de l'option sans modifier la sélection d'autres options
          selectedOption.selected = !isSelected;
        }
      });
    }

    // Utilisation de la fonction avec votre élément select
    const postCategoriesSelect = document.createElement("select");
    postCategoriesSelect.id = "postCategories";
    postCategoriesSelect.multiple = true;
    postCategoriesSelect.className = "collapsible-select";

    const categories = ["Sport", "Art", "Cinéma", "Musique", "Informatique"];
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.toLowerCase();
      option.textContent = category;
      postCategoriesSelect.appendChild(option);
    });

    // Appel de la fonction pour activer le comportement Ctrl lors du clic sur les options
    enableCtrlClickSelection(postCategoriesSelect);

    // Create input for post image
    const postImageInput = document.createElement("input");
    postImageInput.type = "file";
    postImageInput.id = "postImage";
    postImageInput.placeholder = "Parcourir";
    postImageInput.accept = "image/*";
    postImageInput.style.display = "none";

    //!
    //postImageInput.addEventListener('change', previewImage);

    // // Create div for image preview
    // const imagePreviewDiv = document.createElement('div');
    // imagePreviewDiv.id = 'imagePreview';

    // Create button for posting
    const postButton = document.createElement("button");
    postButton.type = "button";
    postButton.textContent = "Post";
    postButton.addEventListener("click", com.GetPostValue);

    // Create div for the validation post section
    const validationPostDiv = document.createElement("div");
    validationPostDiv.className = "validation-post";

    // Append elements to the form
    addPostContainer.appendChild(postTitle);
    addPostForm.appendChild(postTitleInput);
    addPostForm.appendChild(postTextArea);
    addPostForm.appendChild(postCategoriesSelect);
    addPostForm.appendChild(postImageInput);
    // addPostForm.appendChild(imagePreviewDiv);
    validationPostDiv.appendChild(postButton);
    addPostForm.appendChild(validationPostDiv);

    // Append elements to the add post container
    addPostContainer.appendChild(postTitle);
    addPostContainer.appendChild(addPostForm);

    // Append add post container to create post
    createPost.appendChild(addPostContainer);

    return createPost;
  }
}
