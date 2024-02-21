package Socket

import (
	db "forum/Database"
	"log"
	"net/http"
)

func SocketReaderCreate(w http.ResponseWriter, r *http.Request, database db.Db) {

	log.Printf("socket request from %s", r.RemoteAddr)
	if UserTab == nil {
		UserTab = make([]*SocketReader, 0)
	}

	defer func() {
		err := recover()
		if err != nil {
			log.Println(err)
		}
		r.Body.Close()

	}()
	con, _ := upgrader.Upgrade(w, r, nil)

	Client := &SocketReader{
		Con: con,
	}

	//UserTab = append(UserTab, Client)

	Client.HandleConnection(database)
}
