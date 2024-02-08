import * as com from "./communication.mjs";

export class RightSidebarSection {
    constructor() {
        this.connectedUsers = document.createElement('div');
        this.disconnectedUsers = document.createElement('div');
        //this.createRightSidebar();
    }

    init() {
        const rightSidebarSection = document.createElement('section');
        rightSidebarSection.className = 'right-sidebar';

        // Online users section
        const onlineUsersSection = document.createElement('div');
        onlineUsersSection.className = 'online-users';

        const onlineUsersHeader = document.createElement('h3');
        onlineUsersHeader.className = 'on-or-offline';
        onlineUsersHeader.textContent = 'Online users';

        onlineUsersSection.appendChild(onlineUsersHeader);
        onlineUsersSection.appendChild(this.connectedUsers);

        // Offline users section
        const offlineUsersSection = document.createElement('div');
        offlineUsersSection.className = 'offline-users';

        const offlineUsersHeader = document.createElement('h3');
        offlineUsersHeader.className = 'on-or-offline';
        offlineUsersHeader.textContent = 'Offline users';

        offlineUsersSection.appendChild(offlineUsersHeader);
        offlineUsersSection.appendChild(this.disconnectedUsers);

        // Append online and offline sections to the right-sidebar
        rightSidebarSection.appendChild(onlineUsersSection);
        rightSidebarSection.appendChild(offlineUsersSection);

        // Append right-sidebar section to body
        document.body.appendChild(rightSidebarSection);

        const sidebarElements = document.querySelectorAll('.user-connected, .user-disconnected');
        sidebarElements.forEach(element => {
            element.addEventListener('click', () => {
                const popup = element.querySelector('.message-popup');
                if (popup) {
                    popup.style.display = 'block';
                }
            });
        });
    }

    

    createConnectedUser(parentElement, userName, profileImageSrc, messagePopupId) {
        this.createUser(parentElement, userName, profileImageSrc, messagePopupId, true);
    }

    createDisconnectedUser(parentElement, userName, profileImageSrc, messagePopupId) {
        this.createUser(parentElement, userName, profileImageSrc, messagePopupId, false);
    }

    generateUsers(parentElement, usersData) {
        usersData.forEach(userData => {
            this.createUser(parentElement, userData.userName, userData.profileImageSrc, userData.messagePopupId, userData.isConnected);
        });
    }


    createUser(parentElement, userName, profileImageSrc, messagePopupId, isConnected) {
        const userContainer = document.createElement('div');
        userContainer.className = isConnected ? 'user-connected' : 'user-disconnected';
    
        const isConnectedSpan = document.createElement('span');
        isConnectedSpan.className = isConnected ? 'is-connected' : 'is-notconnected';
    
        const connectionInfo = document.createElement('div');
        connectionInfo.className = isConnected ? 'connection-info' : 'isnotconnected-info';

//--------------------------------------------------------------------------------------------
        
        connectionInfo.onclick = function () {
            const userNameSpan = connectionInfo.querySelector('.connected-name, .isnotconnected-name');
            if (userNameSpan) {
                const userName = userNameSpan.textContent;
                const messagePopup = document.getElementById(`messagePopup-${userName}`);
                if (messagePopup) {
                    // Masquer tous les autres messagePopups
                    const allMessagePopups = document.querySelectorAll('[id^="messagePopup-"]');
                    allMessagePopups.forEach(popup => {
                        popup.style.display = 'none';
                    });

                    // Afficher le messagePopup correspondant au nom cliqué
                    messagePopup.style.display = 'block';
                }
            }
        };

    
        const profileImage = document.createElement('img');
        profileImage.src = profileImageSrc;
        profileImage.alt = userName;
    
        const connectedName = document.createElement('span');
        connectedName.className = isConnected ? 'connected-name' : 'isnotconnected-name';
        connectedName.textContent = userName;
    
        const connectionIndicator = document.createElement('span');
        connectionIndicator.className = 'connection-indicator';
    
        // Message popup
        const messagePopupContainer = document.createElement('div');
        messagePopupContainer.className = 'message-popup-container'; // Ajout d'une classe pour le conteneur du popup
    
        const messagePopup = document.createElement('div');
        messagePopup.className = 'message-popup';
        messagePopup.id = messagePopupId;
        messagePopup.style.display= "none"
    
        // Message popup content
        const messagePopupContent = document.createElement('div');
        messagePopupContent.className = 'message-popup-content';
    
        const messagePopupHeader = document.createElement('div');
        messagePopupHeader.className = 'message-popup-header';
    
        const closeButton = document.createElement('span');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener("click", function () {
        const allMessagePopups = document.querySelectorAll('[id^="messagePopup-"]');
            allMessagePopups.forEach(popup => {
                console.log('ferme');
                popup.style.display ="none"
                // popup.style.visibility ="hidden"
                console.log(popup.style.display);
            });
        })

        // commentReaction.addEventListener("click", function() {
        //     const allAboutComment = postContainer.querySelector(".allaboutcomment");
        //     if (allAboutComment.style.display === "none" || !allAboutComment.style.display) {
        //         allAboutComment.style.display = "block";
        //     } else {
        //         allAboutComment.style.display = "none";
        //     }
        // });
    
        const popupTitle = document.createElement('h3');
        popupTitle.textContent = userName;
    
        const messagePopupBody = document.createElement('div');
        messagePopupBody.className = 'message-popup-body';
        messagePopupBody.id = `messagePopupBody-${userName}`;
    
        // ... (Ajoutez ici le code pour générer l'historique des messages précédents)
    
        const messagePopupFooter = document.createElement('div');
        messagePopupFooter.className = 'message-popup-footer';
    
        const messageInput = document.createElement('textarea');
        messageInput.id = `newMessageInput-${userName}`;
        messageInput.placeholder = 'Saisissez votre message';
    
        const sendButton = document.createElement('button');
        sendButton.textContent = 'Envoyer';
        sendButton.onclick = function () {
            com.sendMessage(userName);
        };
    
        messagePopupHeader.appendChild(closeButton);
        messagePopupHeader.appendChild(popupTitle);
    
        messagePopupFooter.appendChild(messageInput);
        messagePopupFooter.appendChild(sendButton);
    
        messagePopupContent.appendChild(messagePopupHeader);
        messagePopupContent.appendChild(messagePopupBody);
        messagePopupContent.appendChild(messagePopupFooter);
    
        messagePopup.appendChild(messagePopupContent);
        messagePopupContainer.appendChild(messagePopup);
    
        connectionInfo.appendChild(isConnectedSpan);
        connectionInfo.appendChild(profileImage);
        connectionInfo.appendChild(connectedName);
        connectionInfo.appendChild(connectionIndicator);
    
        // Ajoutez le conteneur du popup de message à la connexion info
        connectionInfo.appendChild(messagePopupContainer);
    
        userContainer.appendChild(connectionInfo);
    
        // Ajoutez le conteneur de l'utilisateur au parent
        parentElement.appendChild(userContainer);
    }
}