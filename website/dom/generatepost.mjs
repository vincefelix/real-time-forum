export class FeedPostGenerator {
    constructor(feedContainer) {
        this.feedContainer = feedContainer;
    }

    generateFeedPost(userImage, publisherName, postImage, likeCounter, dislikeCounter, commentCounter, comments) {
        const feedPost = document.createElement('div');
        feedPost.className = 'feedpost';

        this.createUserPublishSection(feedPost, userImage, publisherName);
        this.createAPostSection(feedPost, postImage);
        this.createReactionTableSection(feedPost, likeCounter, dislikeCounter, commentCounter);
        this.createCommentsSection(feedPost, comments);
        this.createNewCommentForm(feedPost);

        this.feedContainer.appendChild(feedPost);
    }

    createUserPublishSection(feedPost, userImage, publisherName) {
        const userPublish = document.createElement('div');
        userPublish.className = 'user-publish';

        const userImageElement = document.createElement('img');
        userImageElement.src = userImage;
        userImageElement.alt = '';

        const publisherNameElement = document.createElement('span');
        publisherNameElement.className = 'publisher-name';
        publisherNameElement.textContent = publisherName;

        userPublish.appendChild(userImageElement);
        userPublish.appendChild(publisherNameElement);

        feedPost.appendChild(userPublish);
    }

    createAPostSection(feedPost, postImage) {
        const aPost = document.createElement('div');
        aPost.className = 'a-post';

        const postImageElement = document.createElement('img');
        postImageElement.src = postImage;
        postImageElement.alt = '';

        aPost.appendChild(postImageElement);

        feedPost.appendChild(aPost);
    }

    createReactionTableSection(feedPost, likeCounter, dislikeCounter, commentCounter) {
        const reactionTable = document.createElement('div');
        reactionTable.className = 'reaction-table';

        // ... (Create likeReaction, dislikeReaction, and commentReaction as before)

        reactionTable.appendChild(userImgFeed);
        reactionTable.appendChild(likeReaction);
        reactionTable.appendChild(dislikeReaction);
        reactionTable.appendChild(commentReaction);

        feedPost.appendChild(reactionTable);
    }

    createCommentsSection(feedPost, comments) {
        const commentsSection = document.createElement('div');
        commentsSection.className = 'comments-section';
        commentsSection.id = 'commentsSection';

        comments.forEach(comment => {
            // ... (Create and append individual comments as before)
        });

        feedPost.appendChild(commentsSection);
    }

    createNewCommentForm(feedPost) {
        const newCommentForm = document.createElement('div');
        newCommentForm.className = 'new-comment-form';
        newCommentForm.id = 'newCommentForm';

        // ... (Create textarea and button as before)

        newCommentForm.appendChild(commentTextarea);
        newCommentForm.appendChild(postCommentButton);

        feedPost.appendChild(newCommentForm);
    }
}


