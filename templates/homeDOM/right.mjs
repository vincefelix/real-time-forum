import * as com from "./communication.mjs";

export class RightSidebarSection {
  constructor() {
    this.connectedUsers = document.createElement("div");
    this.disconnectedUsers = document.createElement("div");
    //---------------------------------------------------------
    this.connectedUsers.id = "connected-container";
    this.disconnectedUsers.id = "disconnected-container";
    //this.createRightSidebar();
  }

  init() {
    const rightSidebarSection = document.createElement("section");
    rightSidebarSection.className = "right-sidebar";

    // Online users section
    const onlineUsersSection = document.createElement("div");
    onlineUsersSection.className = "online-users";

    const onlineUsersHeader = document.createElement("h3");
    onlineUsersHeader.className = "on-or-offline";
    onlineUsersHeader.textContent = "Online users";

    onlineUsersSection.appendChild(onlineUsersHeader);
    onlineUsersSection.appendChild(this.connectedUsers);

    // Offline users section
    const offlineUsersSection = document.createElement("div");
    offlineUsersSection.className = "offline-users";

    const offlineUsersHeader = document.createElement("h3");
    offlineUsersHeader.className = "on-or-offline";
    offlineUsersHeader.textContent = "Offline users";

    offlineUsersSection.appendChild(offlineUsersHeader);
    offlineUsersSection.appendChild(this.disconnectedUsers);

    // Append online and offline sections to the right-sidebar
    rightSidebarSection.appendChild(onlineUsersSection);
    rightSidebarSection.appendChild(offlineUsersSection);

    // Append right-sidebar section to body
    document.body.appendChild(rightSidebarSection);
  }

  createConnectedUser(
    parentElement,
    userName,
    profileImageSrc,
    messagePopupId
  ) {
    this.createUser(
      parentElement,
      userName,
      profileImageSrc,
      messagePopupId,
      true
    );
  }

  createDisconnectedUser(
    parentElement,
    userName,
    profileImageSrc,
    messagePopupId
  ) {
    this.createUser(
      parentElement,
      userName,
      profileImageSrc,
      messagePopupId,
      false
    );
  }

  generateUsers(parentElement, usersData) {
    usersData.forEach((userData) => {
      this.createUser(
        parentElement,
        userData.userName,
        userData.profileImageSrc,
        userData.messagePopupId,
        userData.isConnected
      );
    });
  }

  createUser(
    parentElement,
    userName,
    profileImageSrc,
    messagePopupId,
    isConnected
  ) {
    const userContainer = document.createElement("div");

    userContainer.className = isConnected
      ? "user-connected"
      : "user-disconnected";

    const isConnectedSpan = document.createElement("span");
    isConnectedSpan.className = isConnected
      ? "is-connected"
      : "is-notconnected";

    const connectionInfo = document.createElement("div");
    connectionInfo.className = isConnected
      ? "connection-info"
      : "isnotconnected-info";

    const profileImage = document.createElement("img");
    profileImage.src = profileImageSrc;
    profileImage.alt = userName;

    const connectedName = document.createElement("span");
    connectedName.className = isConnected
      ? "connected-name"
      : "isnotconnected-name";
    connectedName.textContent = userName;

    const connectionIndicator = document.createElement("span");
    connectionIndicator.className = "connection-indicator";

    // Message popup
    const messagePopupContainer = document.createElement("div");
    messagePopupContainer.className = "allinfo-msg";

    const messagePopup = document.createElement("div");
    messagePopup.className = "message-popup";
    messagePopup.id = messagePopupId;

    // Message popup content
    const messagePopupContent = document.createElement("div");
    messagePopupContent.className = "message-popup-content";

    const messagePopupHeader = document.createElement("div");
    messagePopupHeader.className = "message-popup-header";

    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = function () {
      messagePopup.style.display = "none";
    };

    const popupTitle = document.createElement("h3");
    popupTitle.textContent = userName;

    const messagePopupBody = document.createElement("div");
    messagePopupBody.className = "message-popup-body";
    messagePopupBody.id = `messagePopupBody-${userName}`;

    // ... (Ajoutez ici le code pour générer l'historique des messages précédents)

    const messagePopupFooter = document.createElement("div");
    messagePopupFooter.className = "message-popup-footer";

    const messageInput = document.createElement("textarea");
    messageInput.id = `newMessageInput-${userName}`;
    messageInput.placeholder = "Saisissez votre message";

    const sendButton = document.createElement("button");
    sendButton.textContent = "Envoyer";
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

    // ... (Ajoutez ici le code pour générer le contenu de la fenêtre contextuelle des messages)

    connectionInfo.appendChild(isConnectedSpan);
    connectionInfo.appendChild(profileImage);
    connectionInfo.appendChild(connectedName);
    connectionInfo.appendChild(connectionIndicator);
    connectionInfo.appendChild(messagePopupContainer);

    userContainer.appendChild(connectionInfo);

    let modified = document.createElement("div");
    modified.className = isConnected ? "connected-users" : "disconnected-users";
    modified.appendChild(userContainer);
    // Append user container to the specified parent element
    parentElement.appendChild(modified);
  }
}
