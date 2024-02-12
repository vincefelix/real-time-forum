export class vmSocket {
  constructor() {
    this.vmsocket = null;
    // this.vMsgContainer = document.getElementById("msgcontainer");
    // this.vMsgIpt = document.getElementById("ipt");
  }

  //   showMessage(text, myself) {
  //     var div = document.createElement("div");
  //     div.innerHTML = text;
  //     var cself = myself ? "self" : "";
  //     div.className = "msg " + cself;
  //     this.vMsgContainer.appendChild(div);
  //   }

  sendData(data) {
    // var txt = this.vMsgIpt.value;
    // this.showMessage("<b>Me</b> " + txt, true);

    this.mysocket.send(data);
    // this.vMsgIpt.value = "";
  }

  connectSocket() {
    var socket = new WebSocket("ws://11.11.90.25:8080/socket"); //make sure the port matches with your golang code
    this.mysocket = socket;
  }
}
