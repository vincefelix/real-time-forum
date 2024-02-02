package Socket

import (
	db "forum/Database"
	"log"
	"net/http"
)

func (c *SocketReader) HandleConnection(w http.ResponseWriter, r *http.Request, database db.Db) {
	// _, err = r.Cookie("fref")
	// if err != nil {
	// 	i.SendMessage("admin", "no cookie found")

	// } else {
	// 	i.SendMessage("System", "Please write your name")
	c.Mode = 1 //mode 1 get user name

	go func() {
		defer func() {
			err := recover()
			if err != nil {
				log.Println("last recover => ", err)
			}
			log.Println("thread socketreader finish")
		}()

		for {
			c.Read(w, database)
		}

	}()
	//}
}
