import * as com from "./communication.mjs";

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
  createComment(username, userImageSrc, commentText) {
    // Créez un élément de commentaire
    const commentContainer = document.createElement("div");
    commentContainer.className = "comment";

    // Créez la section de l'utilisateur
    const userSection = document.createElement("div");
    userSection.className = "user-section";

    const userImage = document.createElement("img");
    userImage.src = userImageSrc;
    userImage.alt = "";

    const usernameElement = document.createElement("span");
    usernameElement.textContent = username;

    userSection.appendChild(userImage);
    userSection.appendChild(usernameElement);

    // Créez la section de texte du commentaire
    const commentTextSection = document.createElement("div");
    commentTextSection.className = "comment-text";
    commentTextSection.textContent = commentText;

    // Ajoutez les sections au conteneur de commentaire
    commentContainer.appendChild(userSection);
    commentContainer.appendChild(commentTextSection);

    return commentContainer;
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
    postTitleInput='title of post',
    idofpost,
    profileImageSrc,
    publisherName,
    postImageSrc,
    postText,
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
    postTitleContent.className="postTitle-Content"
    // postTitleContent.textContent = "title of post";

    const aPost = document.createElement("div");
    aPost.className = "a-post";


    // Ajoutez une section pour le texte du post avant l'image
    const postTextSection = document.createElement("div");
    postTextSection.className = "post-text";

    aPost
    .appendChild(postTitleContent)

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
    commentReaction.onclick = com.toggleComments;

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

    // Create comments-section section
    const commentsSection = document.createElement("div");
    commentsSection.className = "comments-section";
    commentsSection.id = "commentsSection";

    // Create new-comment-form section
    const newCommentForm = document.createElement("div");
    newCommentForm.className = "new-comment-form";
    newCommentForm.id = "newCommentForm";

    const commentTextarea = document.createElement("textarea");
    commentTextarea.required = true
    commentTextarea.maxLength = 250
    commentTextarea.minLength = 2
    commentTextarea.required = true
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

    // Append sections to postContainer
    postContainer.appendChild(userPublish);
    postContainer.appendChild(aPost);
    postContainer.appendChild(reactionTable);
    postContainer.appendChild(commentsSection);
    postContainer.appendChild(newCommentForm);

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
    postTitleInput.minLength = 2
    postTitleInput.id = "postTitleInput";
    postTitleInput.placeholder = "Enter post title...";

    const addPostForm = document.createElement("form");
    addPostForm.id = "addPostForm";

    // Create textarea for post text
    const postTextArea = document.createElement("textarea");
    postTextArea.maxLength = 250
    postTextArea.minLength = 2
    postTextArea.required = true
    postTextArea.id = "postText";
    postTextArea.placeholder = "Saisissez votre message";

    // Create select for post categories
    const postCategoriesSelect = document.createElement("select");
    postCategoriesSelect.id = "postCategories";
    postCategoriesSelect.multiple = true;
    postCategoriesSelect.className = "collapsible-select";

    // Add options to the select
    const categories = ["Sport", "Art", "Cinéma", "Musique", "Informatique"];
    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.toLowerCase();
      option.textContent = category;
      postCategoriesSelect.appendChild(option);
    });

    // Create input for post image
    const postImageInput = document.createElement("input");
    postImageInput.type = "file";
    postImageInput.id = "postImage";
    postImageInput.placeholder = "Parcourir";
    postImageInput.accept = "image/*"; //!
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
    addPostForm.appendChild(postTitleInput)
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

// document.addEventListener('DOMContentLoaded', function () {
//     const newPost = MainContentSection.createPost(
//         './assets/user-connection/profile4.png',
//         'Nouvel Utilisateur',
//         './assets/newpostimage.jpg',
//         'Contenu du nouveau post...',
//         0,
//         0,
//         0
//     );

//     const postContainerDiv = document.getElementById('postContainer');
//     postContainerDiv.appendChild(newPost);
// });
