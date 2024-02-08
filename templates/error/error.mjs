import { socket } from "../socket/initForum.mjs";

export class error {
  constructor(status, message, location) {
    this.location = location;
    this.errContainer = document.createElement("div");
    this.status = document.createElement("span");
    this.errMsg = document.createElement("p");
    this.goBack = document.createElement("a");
    //setting attributes
    this.errContainer.id = "err-container";
    this.status.id = "status";
    this.errMsg.id = "error-message";
    this.goBack.id = "goBack";
    // setting values
    this.status.innerHTML = status;
    this.errMsg.innerHTML = message;
    this.goBack.innerHTML = "Go Back to forum";
    // appending elements
    this.errContainer.appendChild(this.status);
    this.errContainer.appendChild(this.errMsg);
    this.errContainer.appendChild(this.goBack);
  }
  display() {
    switch (this.location) {
      case "form":
        const container = document.getElementById("container");
        container.innerHTML = "";
        //container.style.visibility = "hidden";
        container.appendChild(this.errContainer);
      case "home":
        document.body.innerHTML = "";
        this.errMsg.style.marginTop = "5%";
        this.errMsg.style.marginBottom = "5%";
        this.errMsg.style.textAlign = "center";
        this.errMsg.style.padding = "8% 10% 0% 10%";

        document.body.appendChild(this.errContainer);
    }
  }

  redirect() {
    this.goBack.addEventListener("click", () => {
      socket.mysocket.send(
        JSON.stringify({
          type: "checkCookie",
          payload: { data: document.cookie },
        })
      );
    });
  }
}
