export class vmSocket {
  constructor() {
    this.vmsocket = null;
  }
  sendData(data) {
    this.mysocket.send(data);
  }
  connectSocket() {
    var socket = new WebSocket("ws://localhost:8080/socket");
    this.mysocket = socket;
  }
}
