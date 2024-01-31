package Socket

import (
	db "forum/Database"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)


var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

var savedsocketreader []*SocketReader

func SocketReaderCreate(w http.ResponseWriter, r *http.Request, database db.Db) {
	
	log.Printf("socket request from %s", r.RemoteAddr)
	if savedsocketreader == nil {
		savedsocketreader = make([]*SocketReader, 0)
	}

	defer func() {
		err := recover()
		if err != nil {
			log.Println(err)
		}
		r.Body.Close()

	}()
	con, _ := upgrader.Upgrade(w, r, nil)

	ptrSocketReader := &SocketReader{
		Con: con,
	}

	savedsocketreader = append(savedsocketreader, ptrSocketReader)

	ptrSocketReader.HandleConnection(w, r, database)
}
