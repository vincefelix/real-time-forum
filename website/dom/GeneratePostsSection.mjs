// GeneratePostsSection.mjs
export class GeneratePostsSection {
    generatePosts(feedContainer, numberOfPosts) {
        for (let i = 0; i < numberOfPosts; i++) {
            const post = this.createPost();
            feedContainer.appendChild(post);
        }
    }

    createPost() {
        const postContainer = document.createElement('div');
        postContainer.className = 'feedpost';

        // Create user-publish section
        const userPublish = document.createElement('div');
        userPublish.className = 'user-publish';

        // Create user image
        const userImageElement = document.createElement('img');
        userImageElement.src = './assets/user-connection/profile4.png';
        userImageElement.alt = '';

        // Create publisher name
        const publisherNameElement = document.createElement('span');
        publisherNameElement.className = 'publisher-name';
        publisherNameElement.textContent = 'Mthiaw'; // Adjust the publisher name as needed

        // Append user image and publisher name to user-publish
        userPublish.appendChild(userImageElement);
        userPublish.appendChild(publisherNameElement);

        // Create a-post section
        const aPost = document.createElement('div');
        aPost.className = 'a-post';

        // Create post image
        const postImageElement = document.createElement('img');
        postImageElement.src = './assets/feedtrying.jpg'; // Adjust the post image source as needed
        postImageElement.alt = '';

        // Append post image to a-post
        aPost.appendChild(postImageElement);

        // Create reaction-table section
        const reactionTable = document.createElement('div');
        reactionTable.className = 'reaction-table';

        // Create user-img-feed section
        const userImgFeed = document.createElement('div');
        userImgFeed.className = 'user-img-feed';

        // Create user image in feed
        const userImageFeed = document.createElement('img');
        userImageFeed.src = './assets/profil-img.png';
        userImageFeed.alt = '';

        // Append user image in feed to user-img-feed
        userImgFeed.appendChild(userImageFeed);

        // Create like-reaction section
        const likeReaction = document.createElement('div');
        likeReaction.className = 'like-reaction';

        // Create like image
        const likeImage = document.createElement('img');
        likeImage.src = './assets/like.png';
        likeImage.alt = '';

        // Create like text
        const likeText = document.createElement('span');
        likeText.className = 'reaction-text';
        likeText.textContent = 'like';

        // Create like counter
        const likeCounterElement = document.createElement('span');
        likeCounterElement.className = 'like-counter';
        likeCounterElement.textContent = '5'; // Adjust the like counter as needed

        // Append like image, text, and counter to like-reaction
        likeReaction.appendChild(likeImage);
        likeReaction.appendChild(likeText);
        likeReaction.appendChild(likeCounterElement);

        // Create dislike-reaction section
        const dislikeReaction = document.createElement('div');
        dislikeReaction.className = 'dislike-reaction';

        // Create dislike image
        const dislikeImage = document.createElement('img');
        dislikeImage.src = './assets/dislike.png';
        dislikeImage.alt = '';

        // Create dislike text
        const dislikeText = document.createElement('span');
        dislikeText.className = 'reaction-text';
        dislikeText.textContent = 'Dislike';

        // Create dislike counter
        const dislikeCounterElement = document.createElement('span');
        dislikeCounterElement.className = 'dislike-counter';
        dislikeCounterElement.textContent = '6'; // Adjust the dislike counter as needed

        // Append dislike image, text, and counter to dislike-reaction
        dislikeReaction.appendChild(dislikeImage);
        dislikeReaction.appendChild(dislikeText);
        dislikeReaction.appendChild(dislikeCounterElement);

        // Create about-comment section
        const aboutComment = document.createElement('div');
        aboutComment.className = 'about-comment';

        // Create comment-reaction section
        const commentReaction = document.createElement('div');
        commentReaction.className = 'comment-reaction';
        commentReaction.onclick = toggleComments; // Assuming toggleComments is defined

        // Create comment image
        const commentImage = document.createElement('img');
        commentImage.src = './assets/comment.png';
        commentImage.alt = '';

        // Create comment text
        const commentText = document.createElement('span');
        commentText.className = 'reaction-text';
        commentText.textContent = 'Comment';

        // Create comment counter
        const commentCounterElement = document.createElement('span');
        commentCounterElement.className = 'comment-counter';
        commentCounterElement.textContent = '9'; // Adjust the comment counter as needed

        // Append comment image, text, and counter to comment-reaction
        commentReaction.appendChild(commentImage);
        commentReaction.appendChild(commentText);
        commentReaction.appendChild(commentCounterElement);

        // Append user image feed, like reaction, dislike reaction, and comment reaction to reaction-table
        reactionTable.appendChild(userImgFeed);
        reactionTable.appendChild(likeReaction);
        reactionTable.appendChild(dislikeReaction);
        reactionTable.appendChild(commentReaction);

        // Create comments-section
        const commentsSection = document.createElement('div');
        commentsSection.className = 'comments-section';
        commentsSection.id = 'commentsSection';

        // Add individual comments
        const sampleComments = [
            { userImage: './assets/profil-img.png', author: 'John Doe', text: 'This is a comment.' },
            // Add more comments as needed
        ];

        sampleComments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';

            // Create comment user image
            const commentUserImage = document.createElement('img');
            commentUserImage.src = comment.userImage;
            commentUserImage.alt = '';

                        // Create comment content section
                        const commentContent = document.createElement('div');
                        commentContent.className = 'comment-content';
            
                        // Create comment author
                        const commentAuthor = document.createElement('span');
                        commentAuthor.className = 'comment-author';
                        commentAuthor.textContent = comment.author;
            
                        // Create comment text
                        const commentText = document.createElement('p');
                        commentText.textContent = comment.text;
            
                        // Append comment user image, author, and text to comment content
                        commentContent.appendChild(commentUserImage);
                        commentContent.appendChild(commentAuthor);
                        commentContent.appendChild(commentText);
            
                        // Append comment content to comment div
                        commentDiv.appendChild(commentContent);
            
                        // Append comment div to comments section
                        commentsSection.appendChild(commentDiv);
                    });
            
                    // Create new-comment-form section
                    const newCommentForm = document.createElement('div');
                    newCommentForm.className = 'new-comment-form';
                    newCommentForm.id = 'newCommentForm';
            
                    // Create textarea for new comment
                    const commentTextarea = document.createElement('textarea');
                    commentTextarea.placeholder = 'Add a comment';
            
                    // Create button to post a new comment
                    const postCommentButton = document.createElement('button');
                    postCommentButton.textContent = 'Post';
                    postCommentButton.onclick = addComment; // Assuming addComment is defined
            
                    // Append textarea and button to new-comment-form
                    newCommentForm.appendChild(commentTextarea);
                    newCommentForm.appendChild(postCommentButton);
            
                    // Append user-publish, a-post, reaction-table, comments-section, and new-comment-form to feedpost
                    postContainer.appendChild(userPublish);
                    postContainer.appendChild(aPost);
                    postContainer.appendChild(reactionTable);
                    postContainer.appendChild(commentsSection);
                    postContainer.appendChild(newCommentForm);
            
                    // Return the generated post container
                    return postContainer;
                }
            }
            