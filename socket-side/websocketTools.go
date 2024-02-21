package Socket

import (
	"fmt"
	db "forum/Database"
	"log"
)

func (c *SocketReader) Broadcast(message map[string]interface{}) {
	log.Println("broadcasting to...📡")
	for i := range UserTab {
		fmt.Printf("%d => %v\n", i, UserTab[i])
	}

	for _, socket := range UserTab {
		fmt.Println("user found =>", socket, socket.Connected)
		if !socket.Connected {
			// no send message to offline users
			continue
		}
		socket.SendMessage(message)
	}
}

func (c *SocketReader) NotifyOthers(database db.Db) {
	log.Println("notifying to...📡")
	for i := range UserTab {
		fmt.Println("----- user list ------")
		fmt.Printf("%d => %v\n", i, UserTab[i])
		fmt.Println("----------------------")
	}
	response := make(map[string]interface{}, 0)
	for _, socket := range UserTab {
		fmt.Println("user found =>", socket, socket.Connected)
		if socket.Username == c.Username {
			// no send message to himself
			continue
		}
		if !socket.Connected {
			// no send message to offline users
			continue
		}
		clients, ok, err := GetUsers_State(socket.Username, database)
		if !ok {
			log.Println("❌ Error getting users state in handleOnlineUser")
			socket.Con.WriteJSON(err)
			return
		}
		response["Type"] = "offline"
		response["Payload"] = clients

		socket.SendMessage(response)
	}
}

func sendToUser(username string, response map[string]interface{}, database db.Db) {
	fmt.Println("in sendToUSer ...")
	fmt.Printf("%s must received %v\n", username[1:], response)
	for _, user := range UserTab {
		if user.Username == username[1:] && user.Connected {
			connectedUserList, ok, err := GetUsers_State(username[1:], database)
			if !ok {
				user.Con.WriteJSON(err)
				return
			}
			response["userList"] = connectedUserList
			log.Println("message sent to receiver: ", user.Username)
			user.SendMessage(response) // Send the data to the client
			break
		}
	}
}
func (c *SocketReader) SendMessage(message map[string]interface{}) {
	c.Con.WriteJSON(message)
}
