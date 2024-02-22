import { socket } from "../socket/initForum.mjs";
import { getUserId, getUser_Nickname } from "../utils/getUserId.mjs";
import { throttle } from "../utils/throttle.mjs";
import * as com from "./communication.mjs";
import { rightSidebar } from "./main.mjs";

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
    this.mainContainer = rightSidebarSection;
    this.chatbox();
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

  chatbox() {
    // Message popup
    const messagePopupContainer = document.createElement("div");
    messagePopupContainer.className = "allinfo-msg";
    messagePopupContainer.id = "chatbox";

    const messagePopup = document.createElement("div");
    messagePopup.className = "message-popup";
    messagePopup.id = "messagePopup";
    const popupTitle = document.createElement("h3");
    popupTitle.textContent = "discussion";
    popupTitle.id = "title-name";
    this.popupTitle = popupTitle;

    //close popup
    const closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.innerHTML = "&times;";
    closeButton.onclick = function () {
      console.log("on close");
      const nickname = this.nextSibling.textContent;
      console.log("nickname retrieved ", nickname);
      document.getElementById(`messagePopupBody`).innerHTML = "";
      console.log("pop up body cleaned");
      document.getElementById("newMessageInput").value = "";
      console.log("textarea cleaned");
      let tek = this.parentElement.parentElement.parentElement.parentElement;
      0;
      console.log("retrieved ", tek);
      //messagePopupContainer.style.display = "none";
      //  console.log(document.getElementById(tek).style.display);
      document.getElementById("chatbox").style.display = "none";
      popupTitle.textContent = "discussion";
    };
    //body
    // Message popup content
    const messagePopupContent = document.createElement("div");
    messagePopupContent.className = "message-popup-content";

    const messagePopupHeader = document.createElement("div");
    messagePopupHeader.className = "message-popup-header";

    const messagePopupBody = document.createElement("div");
    messagePopupBody.className = "message-popup-body";
    this.messagePopupBody = messagePopupBody;
    //?------ throttling load more msg -----
    messagePopupBody.id = `messagePopupBody`;
    const throttledRequest = throttle(() => {
      const time = messagePopupBody.firstElementChild.dataset.id;
      console.log("last message in box sent at : ", time);
      socket.mysocket.send(
        JSON.stringify({
          Type: "load_10Msg",
          Payload: {
            IdMess: time,
            Sender: getUser_Nickname(),
            Receiver: popupTitle.textContent,
            data: document.cookie,
          },
        })
      );
      console.log("load 10 more request sent!");
    }, 2000);
    //?------ end of throttling load more msg -----
    messagePopupBody.addEventListener("scroll", () => {
      //console.log("scrolltop ", messagePopupBody.scrollTop);
      console.log("scrollheight ", messagePopupBody.scrollHeight);
      console.log(messagePopupBody.children.length);
      if (
        messagePopupBody.scrollTop == 0 &&
        messagePopupBody.children.length > 0
      ) {
        console.log("catched");
        throttledRequest();
      }
    });

    // ... (Ajoutez ici le code pour générer l'historique des messages précédents)

    const messagePopupFooter = document.createElement("div");
    messagePopupFooter.className = "message-popup-footer";

    const messageInput = document.createElement("textarea");
    messageInput.id = `newMessageInput`;
    messageInput.placeholder = "Write your message";

    const sendButton = document.createElement("button");
    sendButton.textContent = "Send";
    sendButton.onclick = function () {
      const messageRetrieved = messageInput.value.replace("\n", " ").trim();
      if (messageRetrieved != "") {
        //?------sending new message request to back
        const receiver = document.getElementById("title-name").textContent,
          sender = getUser_Nickname(),
          message = com.getMessageInput();
        socket.mysocket.send(
          JSON.stringify({
            Type: "newMsg",
            Payload: {
              receiver: receiver,
              sender: sender,
              message: message,
              data: document.cookie,
            },
          })
        );
      } else {
        console.log("empty msg");
      }
      //?------end of new message request to back
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
    this.mainContainer.appendChild(messagePopupContainer);
  }
  openChat(username) {
    const chatBox = document.getElementById("chatbox");
    if ((chatBox.style.display = "block")) {
      this.messagePopupBody.innerHTML = "";
      this.popupTitle.textContent = username;
    } else {
      chatBox.style.display = "block";
      this.popupTitle.textContent = username;
    }
  }
  createUser(
    parentElement,
    userName,
    profileImageSrc,
    messagePopupId,
    isConnected,
    Unread
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

    connectionInfo.onclick = function () {
      console.log("clicked");
      if (connectionInfo.classList.contains("unread"))
        connectionInfo.classList.remove("unread");
      //?----sending "loadMsg" request
      if (document.getElementById("title-name").textContent != userName) {
        const receiver = userName,
          sender = getUser_Nickname();
        socket.mysocket.send(
          JSON.stringify({
            Type: "loadMsg",
            Payload: {
              Receiver: receiver,
              Sender: sender,
              data: document.cookie,
            },
          })
        );
        document.getElementById("newMessageInput").value = "";
        rightSidebar.openChat(userName);
        const nameElement = connectionInfo.querySelector(".connected-name")
          ? connectionInfo.querySelector(".connected-name")
          : connectionInfo.querySelector(".isnotconnected-name");
        console.log("el => ", nameElement);
        const name = nameElement.textContent;
        nameElement.innerHTML = name.split(" ")[0];
      }

      //?----end of "get last 10 messages" request
    };

    const profileImage = document.createElement("img");
    profileImage.src = profileImageSrc;
    profileImage.alt = userName;
    //container state before generating
    const containerState = document.getElementById("chatbox").style.display;
    //----------------
    const connectedName = document.createElement("span");
    connectedName.className = isConnected
      ? "connected-name"
      : "isnotconnected-name";
    const chatBoxName = document
      .getElementById("chatbox")
      .querySelector("#title-name").textContent;
    console.log("chatBox name for unread: ", chatBoxName);

    connectedName.innerHTML =
      Unread > 0
        ? containerState != "block" || userName != chatBoxName
          ? `${userName} <small class ="unreadCount">📩</small>`
          : userName
        : userName;

    const connectionIndicator = document.createElement("span");
    connectionIndicator.className = "connection-indicator";

    // ... (Ajoutez ici le code pour générer le contenu de la fenêtre contextuelle des messages)

    connectionInfo.appendChild(isConnectedSpan);
    connectionInfo.appendChild(profileImage);
    connectionInfo.appendChild(connectedName);
    connectionInfo.appendChild(connectionIndicator);
    console.log("state container => ", containerState);
    if (Unread > 0) connectionInfo.classList.add("unread");
    if (
      containerState == "block" &&
      chatBoxName == userName &&
      connectionInfo.classList.contains("unread")
    )
      connectionInfo.classList.remove("unread");
    userContainer.appendChild(connectionInfo);

    let modified = document.createElement("div");
    modified.className = isConnected ? "connected-users" : "disconnected-users";
    modified.appendChild(userContainer);
    // Append user container to the specified parent element
    parentElement.appendChild(modified);
  }
}
