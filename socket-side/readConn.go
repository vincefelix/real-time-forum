package Socket

import (
	"fmt"
	authTools "forum/Authentication"
	db "forum/Database"
	auth "forum/Routes"
	Struct "forum/data-structs"
	"log"
	"net/http"
	"strings"

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
	serverResponse := make(map[string]interface{}, 0)
	switch requestType {
	case "register":
		user := Struct.Register{
			FirstName:            requestPayload["firstName"].(string),
			LastName:             requestPayload["lastName"].(string),
			NickName:             requestPayload["nickName"].(string),
			Age:                  requestPayload["age"].(string),
			Gender:               requestPayload["gender"].(string),
			EmailRegister:        requestPayload["emailRegister"].(string),
			PasswordRegister:     requestPayload["passwordRegister"].(string),
			ConfPasswordRegister: requestPayload["confPasswordRegister"].(string),
		}
		fmt.Printf("✨ user wants to register with %s\n", user)
		ok, err := auth.RegisterUser(user, database)
		if !ok {
			log.Printf("❌ error while registering user %s\n", c.Con.LocalAddr())
			c.Con.WriteJSON(err)
			return
		}
		serverResponse["Type"] = "register"
		serverResponse["Authorization"] = "granted"
		serverResponse["status"] = "200"
		c.Con.WriteJSON(serverResponse)
	case "login":
		fmt.Println("in login")
		user := Struct.Login{
			EmailLogin:    requestPayload["emailLogin"].(string),
			PassWordLogin: requestPayload["passwordLogin"].(string),
		}
		payload, userCookie, ok, err := auth.LoginUser(w, user, database)
		if !ok {
			log.Println("❌ error while login user", err)
			c.Con.WriteJSON(err)
			return
		}
		token, errToken, errMess := GenerateToken(payload)
		if errToken != nil {
			log.Printf("❌ error while generating token %s\n", errToken)
			c.Con.WriteJSON(errMess)
			return
		}
		serverResponse["Type"] = "login"
		serverResponse["Authorization"] = "granted"
		serverResponse["status"] = "200"
		serverResponse["Payload"] = token
		serverResponse["cookie"] = userCookie
		c.Con.WriteJSON(serverResponse)
	case "checkCookie":
		// check if the cookie is present in database
		cookie := strings.Split(requestPayload["data"].(string), "=")[1]
		ok, Msg := authTools.CheckCookie(w, cookie, database)
		if !ok {
			log.Println("❌ cookie not found in db")
			c.Con.WriteJSON(Msg)
			return
		}
		c.Con.WriteJSON(Msg)
	}

	log.Println("done reading!!!")
}
