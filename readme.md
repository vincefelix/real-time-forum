# **Real-Time Forum**

## **Description**

This project presents a functional web forum with real-time features, implemented using a combination of front-end and back-end technologies.

## **Features**

* **User Registration and Login:**
    * Registration form with: name, age, gender, email, and password.
    * Login by username or email.
    * Secure password hashing with bcrypt.
    * Session management and logout.
* **Post Creation and Display:**
    * Post categorization.
    * Display posts in a feed.
    * View details and comments for a post.
* **Comment System:**
    * Add, edit, and delete comments.
    * Display comments under each post.
* **Real-Time Private Messaging:**
    * List of online/offline users.
    * Send messages to online users.
    * Load and display past messages.
    * Timestamp and username for each message.
* **Single-Page Application (SPA) Architecture:**
    * Dynamic page transitions without full reload.
    * DOM manipulation and event handling.

## **Technologies**

* **Backend:** Go (Golang)
* **Database:** SQLite
* **WebSockets:** Gorilla Websocket (Go), JavaScript WebSockets (client-side)
* **Authentication:** bcrypt, UUID
* **Front-End:** HTML, CSS

## **Front-End and Back-End Communication**

The front-end and back-end of this real-time forum communicate primarily via WebSockets. Here are the key points of this communication:

### **Connection Establishment:**

* The front-end uses JavaScript to establish a WebSocket connection with the Go server.
* The Go server uses the `gorilla/websocket` library to manage connections and messages.

### **Sending Messages:**

* The front-end sends JSON messages to the server to trigger actions, such as creating a post, sending a private message, or retrieving data.
* The Go server sends JSON messages to the front-end to update the user interface in real time, such as notifying new messages or status changes.

### **Message Protocols:**

* JSON message protocols define the structure and content of messages exchanged between the front-end and back-end.
* These protocols ensure clear and consistent communication between the two parties.

### **Events and Handlers:**

* The front-end uses JavaScript events to listen for incoming messages from the server.
* The back-end uses goroutines and channels to handle incoming messages from the front-end asynchronously.

### **Libraries and Frameworks:**

* The front-end uses standard JavaScript libraries for DOM manipulation and WebSocket communication.
* The back-end uses the `gorilla/websocket` library to manage WebSocket connections and the `json` library for encoding and decoding JSON messages.

### **Key Points to Remember:**

* Communication between the front-end and back-end is bidirectional and real-time.
* WebSockets enable efficient and performant communication.
* Message protocols ensure consistent and reliable communication.
* Events and handlers allow for asynchronous message processing.

## **Notes**

* This project is a complete implementation of the real-time forum.
* It does not use any external frontend libraries or frameworks.
* This is a great project to learn web technologies and programming concepts such as WebSockets, Go routines, and channels.

## **Running the Project**

1. Clone the Gitea repository: (https://learn.zone01dakar.sn/git/vindour/real-time-forum)
2. Install Go dependencies: `go mod tidy`
3. Start the Go server: `go run main.go`
4. Open the browser and navigate to http://localhost:8080

## **Resources**

* WebSockets Tutorials:
    * [https://www.websocket.org/](https://www.websocket.org/)
    * [https://developer.mozilla.org/en-US/docs/Web/API/WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
* WebSockets Libraries:
    * [https://github.com/gorilla/websocket](https://github.com/gorilla/websocket)
    * [https://developer.mozilla.org/en-US/docs/Web/API/WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
