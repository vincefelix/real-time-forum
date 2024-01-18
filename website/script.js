document.querySelector('.comment-reaction').addEventListener('click', function() {
    var commentContent = document.querySelector('.comment-content');
    commentContent.style.display = (commentContent.style.display === 'none') ? 'block' : 'none';
});