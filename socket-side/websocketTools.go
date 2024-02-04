package Socket

import "log"

func (c *SocketReader) Broadcast(message map[string]interface{}) {
	log.Println("broadcasting...📡")
	for _, socket := range UserTab {

		if socket == c {
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
