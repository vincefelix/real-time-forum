package Socket

import (
	"fmt"
	auth "forum/Authentication"
	db "forum/Database"
	com "forum/Routes"
	Struct "forum/data-structs"
	hdle "forum/handlers"
	"forum/tools"
	"log"

	"github.com/gorilla/websocket"
)

// the credentials structure stores the data of the logged in user
func (c *SocketReader) Read(database db.Db) {
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
		connInf, serverResponse, ok, err := hdle.HandleLogin(requestPayload, database)
		if !ok {
			c.Con.WriteJSON(err)
			return
		}
		c.Connected = true
		c.Id = connInf[0]
		c.Username = connInf[1]
		c.Profil = connInf[2]
		Isconnected <- c
		posTab, ok, err := com.GetAll_fromDB(serverResponse["session"].(string))
		fmt.Println("postab to send => ", posTab)
		if !ok {
			c.Con.WriteJSON(err)
			return
		}
		connectedUserList, ok, err := GetUsers_State(database)
		if !ok {
			c.Con.WriteJSON(err)
			return
		}

		serverResponse["posts"] = posTab
		serverResponse["userList"] = connectedUserList
		c.Con.WriteJSON(serverResponse)

	case "checkCookie":
		ok, session, Msg := hdle.HandleCookie(requestPayload, database)
		if !ok {
			c.Con.WriteJSON(Msg)
			IsDisconnected <- c
			return
		}
		connInf := auth.GetCOnnInf(database, session)
		if len(connInf) == 0 {
			c.Con.WriteJSON(
				Struct.Errormessage{Type: tools.IseType,
					Msg:        tools.InternalServorError,
					StatusCode: tools.IseStatus,
				})
		}
		c.Id = connInf[0]
		c.Username = connInf[1]
		c.Profil = connInf[2]
		c.Connected = true
		Isconnected <- c
		posTab, ok, err := com.GetAll_fromDB(session)
		if !ok {
			c.Con.WriteJSON(err)
			return
		}
		connectedUserList, ok, err := GetUsers_State(database)
		if !ok {
			c.Con.WriteJSON(err)
			return
		}
		serverResponse := make(map[string]interface{}, 0)
		serverResponse["Type"] = Msg.Type
		serverResponse["Msg"] = "valid cookie"
		serverResponse["Status"] = "200"
		serverResponse["posts"] = posTab
		serverResponse["userList"] = connectedUserList
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
			c.Broadcast(serverResponse)
		} else {
			c.Con.WriteJSON(Msg)
		}

	case "CreateComment":
		ok, _, Msg := hdle.HandleCookie(requestPayload, database)
		if ok {
			serverResponse, check, err := hdle.HandleComment(requestPayload, database)
			if !check {
				c.Con.WriteJSON(err)
				return
			}
			c.Broadcast(serverResponse)
		} else {
			c.Con.WriteJSON(Msg)
		}
	}

	log.Println("done reading!!!")
}
