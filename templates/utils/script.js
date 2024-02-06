// --------------------Message----------------------

function openMessagePopup() {
    var messagePopup = document.getElementById('messagePopup');
    messagePopup.style.display = 'block';
}

function closeMessagePopup() {
    var messagePopup = document.getElementById('messagePopup');
    messagePopup.style.display = 'none';
}

function sendMessage() {
    var newMessageInput = document.getElementById('newMessageInput');
    var messagePopupBody = document.getElementById('messagePopupBody');

    // Récupérez le contenu du champ de saisie et ajoutez-le à l'historique des messages
    var messageText = newMessageInput.value;
    if (messageText.trim() !== '') {
        var newMessage = document.createElement('div');
        newMessage.className = 'message';
        newMessage.textContent = messageText;
        messagePopupBody.appendChild(newMessage);

        // Effacez le champ de saisie après l'envoi du message
        newMessageInput.value = '';
    }
}


function addComment() {
    // Ajoutez le code nécessaire pour gérer l'ajout d'un commentaire ici
    console.log('Comment added!');
}

function showConnectedMessages(userName) {
    // Masquer toutes les boîtes de dialogue des messages
    document.querySelectorAll('.message-popup').forEach(function (popup) {
        popup.style.display = 'none';
    });

    // Afficher la boîte de dialogue des messages pour l'utilisateur spécifique
    var popupId = 'messagePopup-' + userName;
    var popup = document.getElementById(popupId);
    if (popup) {
        showAllInfoMsg()
        popup.style.display = 'block';
    }
}

function showAllInfoMsg() {
    console.log('dokhna');
    document.querySelectorAll('.allinfo-msg').forEach(function (allinfoMsg) {
        allinfoMsg.style.display = 'block';
    });
}


function toggleComments() {
    const commentsSection = document.getElementById('commentsSection');
    const newCommentForm = document.getElementById('newCommentForm');

    // Toggle the 'active' class to show/hide comments section and new comment form
    commentsSection.classList.toggle('active');
    newCommentForm.classList.toggle('active');
        // Appeler la fonction pour chaque post individuellement
    const feedPosts = document.querySelectorAll('.feedpost');
    feedPosts.forEach(postContainer => {
        handleLikesAndDislikes(postContainer);
    });
}

// --------------------------------categoriesadded---------

function addPost() {
    var selectedCategories = [];
    var categoriesSelect = document.getElementById('postCategories');

    for (var i = 0; i < categoriesSelect.options.length; i++) {
        if (categoriesSelect.options[i].selected) {
            selectedCategories.push(categoriesSelect.options[i].value);
        }
    }
    var postTitleContent =  document.getElementById("title").value;
    var postText = document.getElementById('postText').value;
    var postImage = document.getElementById('postImage').value;

    console.log('Selected Categories:', selectedCategories);
    console.log('Post Title:', postTitleContent);
    console.log('Post Text:', postText);
    console.log('Post Image:', postImage);

}

document.addEventListener('DOMContentLoaded', function () {

    function handleLikesAndDislikes(postContainer) {
        const likeCounter = postContainer.querySelector('.like-counter');
        const dislikeCounter = postContainer.querySelector('.dislike-counter');

        // Initialiser les compteurs
        let likeCount = parseInt(likeCounter.textContent);
        let dislikeCount = parseInt(dislikeCounter.textContent);

        // Fonction pour mettre à jour les compteurs
        const updateCounters = () => {
            likeCounter.textContent = likeCount.toString();
            dislikeCounter.textContent = dislikeCount.toString();
        };

        let count = 0

        postContainer.querySelector('.like-reaction').addEventListener('click', () => {
            count++
            if (count % 2 !== 0) {
                likeCount++;
            } else {
                likeCount--;
            }
            if (discounting > 0 && discounting % 2 !== 0) {
                dislikeCount--;
                discounting--
            }
            updateCounters();
        });
        let discounting = 0
        // Ajouter un gestionnaire de clics à la section de dislike
        postContainer.querySelector('.dislike-reaction').addEventListener('click', () => {
            discounting++
            if (discounting % 2 !== 0) {
                dislikeCount++;
            } else {
                dislikeCount--;
            }
             if (count > 0 && count % 2 !== 0) {
                 likeCount--;
                 count++
             }
            updateCounters();
        });
    }

    // Appeler la fonction pour chaque post individuellement
    const feedPosts = document.querySelectorAll('.feedpost');
    feedPosts.forEach(postContainer => {
        handleLikesAndDislikes(postContainer);
    });

});

//------------------Vider les elements de create post-----------------
export function deletePostValues() {
    const postTitleInput = document.getElementById('postTitleInput');
    const postTextContent = document.getElementById('postText');
    const postCategoriesSelect = document.getElementById('postCategories');

    postTitleInput.value = '';
    postTextContent.value = '';
    postCategoriesSelect.selectedIndex = -1; // Désélectionne toutes les options
}