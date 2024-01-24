export class CommentsSection {
    createCommentsSection(sampleComments) {
        const commentsSection = document.createElement('div');
        commentsSection.className = 'comments-section';
        commentsSection.id = 'commentsSection';

        // Individual comments go here
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

        // Add a new comment form
        const newCommentForm = document.createElement('div');
        newCommentForm.className = 'new-comment-form';
        newCommentForm.id = 'newCommentForm';

        const commentTextarea = document.createElement('textarea');
        commentTextarea.placeholder = 'Add a comment';

        const postCommentButton = document.createElement('button');
        postCommentButton.textContent = 'Post';
        postCommentButton.onclick = addComment; // Assuming addComment is defined

        newCommentForm.appendChild(commentTextarea);
        newCommentForm.appendChild(postCommentButton);

        // Append comments and new comment form to comments section
        commentsSection.appendChild(newCommentForm);

        return commentsSection;
    }
}
