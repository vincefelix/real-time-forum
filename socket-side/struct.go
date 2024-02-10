package Socket

import "github.com/gorilla/websocket"

// socketReader struct
type SocketReader struct {
	Con       *websocket.Conn
	Connected bool
	Username  string
	Profil    string
	Id        string
}

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
	}
	Isconnected    = make(chan *SocketReader)
	IsDisconnected = make(chan *SocketReader)
	UpdateUserConn = make(chan *SocketReader)
	UserTab        []*SocketReader
)

type UserConn struct {
	Username string
	Profil   string
	Id string
	Online   bool
}
