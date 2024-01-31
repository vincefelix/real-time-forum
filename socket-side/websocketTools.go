package Socket

import (
	"github.com/gorilla/websocket"
)

func (c *SocketReader) Broadcast(str string) {
	for _, socket := range savedsocketreader {

		if socket == c {
			// no send message to himself
			continue
		}

		if socket.Mode == 1 {
			// no send message to connected user before user write his name
			continue
		}
		socket.SendMessage(str)
	}
}

func (i *SocketReader) SendMessage(str string) {
	i.Con.WriteMessage(websocket.TextMessage, []byte(str))
}
