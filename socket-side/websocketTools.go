package Socket

import (
	"fmt"
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

func (c *SocketReader) NotifyOthers(message map[string]interface{}) {
	log.Println("notifying to...📡")
	for i := range UserTab {
		fmt.Println("----- user list ------")
		fmt.Printf("%d => %v\n", i, UserTab[i])
		fmt.Println("----------------------")
	}

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
		socket.SendMessage(message)
	}
}

func (c *SocketReader) SendMessage(message map[string]interface{}) {
	c.Con.WriteJSON(message)
}
