export class RightSidebarSection {
    constructor() {
        this.createRightSidebar();
    }

    createRightSidebar() {
        const rightSidebarSection = document.createElement('section');
        rightSidebarSection.className = 'right-sidebar';

        // Online users section
        const onlineUsersSection = document.createElement('div');
        onlineUsersSection.className = 'online-users';

        const onlineUsersHeader = document.createElement('h3');
        onlineUsersHeader.className = 'on-or-offline';
        onlineUsersHeader.textContent = 'Online users';

        // Connected users
        const connectedUsers = document.createElement('div');
        connectedUsers.className = 'connected-users';

        // Connected user 1
        const user1 = this.createUser('userze4', './assets/user-connection/profile1.png', 'messagePopup-userze4');
        connectedUsers.appendChild(user1);

        // Connected user 2
        const user2 = this.createUser('user2', './assets/user-connection/profile4.png', 'messagePopup-user2');
        connectedUsers.appendChild(user2);

        // Add more connected users as needed

        onlineUsersSection.appendChild(onlineUsersHeader);
        onlineUsersSection.appendChild(connectedUsers);

        // Offline users section
        const offlineUsersSection = document.createElement('div');
        offlineUsersSection.className = 'offline-users';

        const offlineUsersHeader = document.createElement('h3');
        offlineUsersHeader.className = 'on-or-offline';
        offlineUsersHeader.textContent = 'Offline users';

        // Disconnected users
        const disconnectedUsers = document.createElement('div');
        disconnectedUsers.className = 'disconnected-users';

        // Disconnected user 1
        const user5 = this.createUser('user5', './assets/user-connection/profile6.png', 'messagePopup-user5');
        disconnectedUsers.appendChild(user5);

        // Disconnected user 2
        const user6 = this.createUser('user6', './assets/user-connection/profile5.png', 'messagePopup-user6');
        disconnectedUsers.appendChild(user6);

        // Add more disconnected users as needed

        offlineUsersSection.appendChild(offlineUsersHeader);
        offlineUsersSection.appendChild(disconnectedUsers);

        // Append online and offline sections to the right-sidebar
        rightSidebarSection.appendChild(onlineUsersSection);
        rightSidebarSection.appendChild(offlineUsersSection);

        // Append right-sidebar section to body
        document.body.appendChild(rightSidebarSection);
    }

    createUser(userName, profileImageSrc, messagePopupId) {
        const userContainer = document.createElement('div');
        userContainer.className = 'user-connected';

        const isConnectedSpan = document.createElement('span');
        isConnectedSpan.className = 'is-connected';

        const connectionInfo = document.createElement('div');
        connectionInfo.className = 'connection-info';

        const profileImage = document.createElement('img');
        profileImage.src = profileImageSrc;
        profileImage.alt = userName;

        const connectedName = document.createElement('span');
        connectedName.className = 'connected-name';
        connectedName.textContent = userName;

        const connectionIndicator = document.createElement('span');
        connectionIndicator.className = 'connection-indicator';

        

        // Message popup
        const messagePopupContainer = document.createElement('div');
        messagePopupContainer.className = 'allinfo-msg';

        const messagePopup = document.createElement('div');
        messagePopup.className = 'message-popup';
        messagePopup.id = messagePopupId;
        
        // Message popup content
const messagePopupContent = document.createElement('div');
messagePopupContent.className = 'message-popup-content';

const messagePopupHeader = document.createElement('div');
messagePopupHeader.className = 'message-popup-header';

const closeButton = document.createElement('span');
closeButton.className = 'close-button';
closeButton.innerHTML = '&times;';
closeButton.onclick = function() {
    messagePopup.style.display = 'none';
};

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
sendButton.onclick = function() {
    sendMessage(userName);
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

        // ... (Add your message popup content creation here)

        messagePopupContainer.appendChild(messagePopup);

        connectionInfo.appendChild(isConnectedSpan);
        connectionInfo.appendChild(profileImage);
        connectionInfo.appendChild(connectedName);
        connectionInfo.appendChild(connectionIndicator);
        connectionInfo.appendChild(messagePopupContainer);

        userContainer.appendChild(connectionInfo);

        return userContainer;
    }
}