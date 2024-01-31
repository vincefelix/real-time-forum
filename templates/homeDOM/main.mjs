import { LeftsideSection } from './left.mjs';
import { RightSidebarSection } from './right.mjs';
import { Navigation } from './nav.mjs';
import { MainContentSection } from './createpost.mjs';
import { ProfileToggleSection } from "./profiletoogler.mjs";

const navigation = new Navigation();

const leftsection = new LeftsideSection()

const mainContent = new MainContentSection();

const rightSidebar = new RightSidebarSection();



const profileToggle = new ProfileToggleSection();


mainContent.createAndAddPost([
    'thetest',
    '/static/./assets/user-connection/profile1.png',
    'Zone',
    '/static/./assets/feedtrying.jpg',
    ' vslkv vdmvs dvmsdv smdv sdvosdv qdmvoq dvoq^dv qdovnq dvoqdv qdo^vq dvqodv qdvoqdv ',
    5,
    6,
    9
]);

document.addEventListener('DOMContentLoaded', () => {

    // Utilisateurs connectés
    rightSidebar.createUser(
        rightSidebar.connectedUsers,
        'john_doe',
        '/static/./assets/user-connection/profile1.png',
        'messagePopup-john_doe',
        true
    );

    // Utilisateurs déconnectés
    rightSidebar.createUser(
        rightSidebar.disconnectedUsers,
        'jane_doe',
        '/static/./assets/user-connection/profile3.png',
        'messagePopup-jane_doe',
        false
    );

});



// Créez un post et ajoutez-le à la section principale
const postDetails = [
    'thetest',
    '/static/./assets/user-connection/profile1.png',
    'John Doe',
    '/static/./assets/feedtrying.jpg',
    'Description du post',
    5,
    6,
    9
];

const postDetailes = [
    'thetest',
    '/static/./assets/user-connection/profile1.png',
    'Johkzhvn Dozece',
    '/static/./assets/feedtrying.jpg',
    'Description du post',
    5,
    6,
    9
];

mainContent.createAndAddPost(postDetails);
mainContent.createAndAddPost(postDetailes);

// Obtenez la section des commentaires du post créé
const commentsSection = document.querySelector('.comments-section'); // Assurez-vous d'ajuster le sélecteur en fonction de votre structure HTML

// Ajoutez des commentaires au post
const comment1 = mainContent.createComment('Mass', '/static/./path/to/image1.png', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');
const comment2 = mainContent.createComment('Vince', '/static/./path/to/image2.png', 'text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book');

commentsSection.appendChild(comment1);
commentsSection.appendChild(comment2);

// Utilisation de la nouvelle fonction pour ajouter des commentaires à un post
const postofDetail = [
    'thetest',
    '/static/./assets/user-connection/profile1.png',
    'Johnathan Doe',
    '/static/./assets/feedtrying.jpg',
    'Description du post',
    5,
    6,
    9
];

const postContainer = mainContent.createAndAddPost(postofDetail);

const comments = [
    { username: 'Massljf', userImageSrc: '/static/./path/to/image1.png', commentText: 'Lorem Ipsum is simply dummy text...' },
    { username: 'Vincenteece', userImageSrc: '/static/./path/to/image2.png', commentText: 'text ever since the 1500s...' }
];

// mainContent.addCommentsToPost(postContainer, comments);
