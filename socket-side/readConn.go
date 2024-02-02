package Socket

import (
	"fmt"
	db "forum/Database"
	com "forum/Routes"
	Struct "forum/data-structs"
	hdle "forum/handlers"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

// socketReader struct
type SocketReader struct {
	Con       *websocket.Conn
	Mode      int
	Connected bool
	Name      string
	Id        string
}

// the credentials structure stores the data of the logged in user
func (c *SocketReader) Read(w http.ResponseWriter, database db.Db) {
	log.Println("reading...")
	var request Struct.Request
	er := c.Con.ReadJSON(&request)
	log.Println("req", request)
	if er != nil {
		if closeMsg, ok := er.(*websocket.CloseError); ok {
			log.Printf("connexion closed with status %v due to %s", closeMsg.Code, closeMsg.Text)
			panic(er)
		}
		log.Println("read json error: ", er)
		return

	}
	requestType := request.Type
	requestPayload := request.Payload

	log.Println("payload is here", requestPayload)
	switch requestType {
	case "register":
		log.Println("In register")
		serverResponse, ok, err := hdle.HandleRegister(requestPayload, database)
		if !ok {
			c.Con.WriteJSON(err)
			return
		}
		c.Con.WriteJSON(serverResponse)

	case "login":
		fmt.Println("in login")
		serverResponse, ok, err := hdle.HandleLogin(requestPayload, database)
		if !ok {
			c.Con.WriteJSON(err)
			return
		}
		posTab, ok, err := com.GetAll_fromDB(serverResponse["session"].(string))
		if !ok {
			c.Con.WriteJSON(err)
			return
		}
		serverResponse["posts"] = posTab
		c.Con.WriteJSON(serverResponse)

	case "checkCookie":
		ok, session, Msg := hdle.HandleCookie(requestPayload, database)
		if !ok {
			c.Con.WriteJSON(Msg)
			return
		}
		posTab, ok, err := com.GetAll_fromDB(session)
		if !ok {
			c.Con.WriteJSON(err)
			return
		}
		serverResponse := make(map[string]interface{}, 0)
		serverResponse["Type"] = Msg.Type
		serverResponse["Msg"] = "valid cookie"
		serverResponse["Status"] = "200"
		serverResponse["posts"] = posTab
		c.Con.WriteJSON(serverResponse)

	case "createPost":
		log.Println("In createPost")
		ok, _, Msg := hdle.HandleCookie(requestPayload, database)
		if ok {
			serverResponse, check, err := hdle.HandlePost(requestPayload, database)
			if !check {
				c.Con.WriteJSON(err)
				return
			}
			c.Con.WriteJSON(serverResponse)
		} else {
			c.Con.WriteJSON(Msg)
		}

	case "addComment":
		ok, _, Msg := hdle.HandleCookie(requestPayload, database)
		if ok {
			serverResponse, check, err := hdle.HandleComment(requestPayload, database)
			if !check {
				c.Con.WriteJSON(err)
				return
			}
			c.Con.WriteJSON(serverResponse)
		} else {
			c.Con.WriteJSON(Msg)
		}
	}

	log.Println("done reading!!!")
}
