
document.addEventListener('DOMContentLoaded', function () {
    var userNavImg = document.querySelector('.tooglerleftimg');
    var leftSidebar = document.querySelector('.leftside');
    var mainspace = document.querySelector('.main-content');
    var sidebarVisible = true;

    if (userNavImg && leftSidebar) {
        userNavImg.addEventListener('click', function () {
            if (sidebarVisible) {
                leftSidebar.style.display = 'block';
                mainspace.style.cssText = "width: 52%; left: 21%";
            } else {
                leftSidebar.style.display = 'none';
                mainspace.style.cssText = "width: 75%; left: 0";
            }
            sidebarVisible = !sidebarVisible;
        });
    } else {
        console.error("Élément non trouvé.");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var profilemenutoogler = document.querySelector('.options-menu-img');
    var menutotoogle = document.querySelector('.profile-toogle');

    profilemenutoogler.addEventListener('mouseenter', function () {
        menutotoogle.style.display = 'block';
    });

    profilemenutoogler.addEventListener('mouseleave', function () {
        setTimeout(function () {
            if (!menutotoogle.matches(':hover')) {
                menutotoogle.style.display = 'none';
            }
        }, 100);
    });

    menutotoogle.addEventListener('mouseleave', function () {
        menutotoogle.style.display = 'none';
    });
});


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


// document.addEventListener('DOMContentLoaded', function () {
//     // Sélectionnez tous les boutons de fermeture
//     var closeButtonList = document.querySelectorAll('.close-button');

//     // Ajoutez un écouteur d'événement à chaque bouton
//     closeButtonList.forEach(function (closeButton) {
//         closeButton.addEventListener('click', function () {
//             // Trouvez l'élément parent avec la classe 'allinfo-msg'
//             var parentAllinfoMsg = closeButton.closest('.allinfo-msg');

//             // Masquez l'élément parent
//             if (parentAllinfoMsg) {
//                 parentAllinfoMsg.style.display = 'none';
//             }
//         });
//     });
// });


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

// function showDisconnectedMessages(userName) {
//     // Masquer toutes les boîtes de dialogue des messages
//     // document.querySelectorAll('.message-popup').forEach(function (popup) {
//     //     popup.style.display = 'none';
//     // });

//     var popupId = 'messagePopup-' + userName;
//     var popup = document.getElementById(popupId);
//     if (popup) {
//         popup.style.display = 'block';
//     }
// }


// document.querySelectorAll('.connection-info').forEach(function (connectionInfo) {
//     connectionInfo.addEventListener('click', function () {
//         var userName = connectionInfo.querySelector('.connected-name').textContent;
//         console.log(userName);
//         showConnectedMessages(userName);
//         let test= `messagePopup-${userName}`
//     });
// });


// Associer la fonction showDisconnectedMessages à chaque utilisateur déconnecté
// document.querySelectorAll('.isnotconnected-info').forEach(function (disconnectedInfo) {
//     disconnectedInfo.addEventListener('click', function () {
//         var userName = disconnectedInfo.querySelector('.isnotconnected-name').textContent;
//         showDisconnectedMessages(userName);
//     });
// });



// function showConnectedMessages(userName) {
//     // Masquer toutes les boîtes de dialogue des messages
//     // document.querySelectorAll('.message-popup').forEach(function (popup) {
//     //     popup.style.display = 'none';
//     // });

//     // Afficher la boîte de dialogue des messages pour l'utilisateur spécifique
//     var popupId = 'messagePopup-' + userName;
//     var popup = document.getElementById(popupId);
//     if (popup) {
//         popup.style.display = 'block';
//     }
// }

// ----------------------------------------------
function previewImage() {
    var previewContainer = document.getElementById('imagePreview');
    var postImage = document.getElementById('postImage').files[0];
    var previewImage = document.createElement('img');


    previewContainer.innerHTML = '';

    if (postImage) {
        var imageURL = URL.createObjectURL(postImage);
        previewImage.src = imageURL;

        previewContainer.appendChild(previewImage);
    }
}

// function addPost() {
//     var postText = document.getElementById('postText').value;
//     var postImage = document.getElementById('postImage').files[0];

//     // Vérifiez si le texte du post ou l'image est vide
//     if (postText.trim() === '' && !postImage) {
//         alert('Veuillez saisir du texte ou ajouter une image pour le post.');
//         return;
//     }

//     // Créez un nouvel élément de post
//     var newPost = document.createElement('div');
//     newPost.className = 'post';

//     // Ajoutez le texte du post s'il existe
//     if (postText.trim() !== '') {
//         var postTextElement = document.createElement('p');
//         postTextElement.textContent = postText;
//         newPost.appendChild(postTextElement);
//     }

//     // Ajoutez l'image du post s'il existe
//     if (postImage) {
//         var postImageElement = document.createElement('img');
//         postImageElement.src = URL.createObjectURL(postImage);
//         postImageElement.alt = 'Post Image';
//         newPost.appendChild(postImageElement);
//     }

//     // Ajoutez le nouvel élément de post à la liste des posts (à personnaliser selon votre structure)
//     var postsContainer = document.getElementById('postsContainer');
//     postsContainer.appendChild(newPost);

//     // Effacez le texte du post et réinitialisez l'input de l'image et la zone de prévisualisation
//     document.getElementById('postText').value = '';
//     document.getElementById('postImage').value = '';
//     document.getElementById('imagePreview').innerHTML = '';
// }


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

document.addEventListener('DOMContentLoaded', function () {
    var categorySelect = document.getElementById('postCategories');
    var isMouseDown = false;

    categorySelect.addEventListener('mousedown', function (event) {
        isMouseDown = true;
        event.target.selected = !event.target.selected;
        event.preventDefault();
    });

    categorySelect.addEventListener('mousemove', function (event) {
        if (isMouseDown) {
            event.target.selected = !event.target.selected;
            event
            
            .preventDefault();
        }
    });

    categorySelect.addEventListener('mouseup', function () {
        isMouseDown = false;
    });
});

function addPost() {
    var selectedCategories = [];
    var categoriesSelect = document.getElementById('postCategories');

    for (var i = 0; i < categoriesSelect.options.length; i++) {
        if (categoriesSelect.options[i].selected) {
            selectedCategories.push(categoriesSelect.options[i].value);
        }
    }

    var postText = document.getElementById('postText').value;
    var postImage = document.getElementById('postImage').value;

    console.log('Selected Categories:', selectedCategories);
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

