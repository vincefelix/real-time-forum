package Socket

import (
	db "forum/Database"
	"log"
)

func HandleOnlineUser(database db.Db) {
	for {
		select {
		case user := <-Isconnected:
			log.Printf("🟢 user: %v is connected\n", user.Username)
			UserTab = UpdateConn(user, UserTab)
			serverResponse := make(map[string]interface{})
			serverResponse["Type"] = "online"
			// serverResponse["Payload"] = UserConn{
			// 	Username: user.Username,
			// 	Profil:   user.Profil,
			// 	Online:   true,
			// }
			clients, ok, err := GetUsers_State(database)
			if !ok {
				log.Println("❌ Error getting users state in habldeOnlineUser")
				user.Con.WriteJSON(err)
			}
			serverResponse["Payload"] = clients
			user.NotifyOthers(serverResponse)

		case disconnect := <-IsDisconnected:
			log.Printf("user: %v is disconnected\n", disconnect.Username)

			//!removing disconnected user from user Tab
			for i, user := range UserTab {
				if user == disconnect {
					switch len(UserTab)-1 != i {
					case true:
						UserTab = append(UserTab[:i], UserTab[i+1:]...)
					case false:
						UserTab = UserTab[:len(UserTab)-1]
					}
					break
				}
			}

			serverResponse := make(map[string]interface{})
			serverResponse["Type"] = "offline"
			clients, ok, err := GetUsers_State(database)
			if !ok {
				log.Println("❌ Error getting users state in habldeOnlineUser")
				disconnect.Con.WriteJSON(err)
			}
			serverResponse["Payload"] = clients
			disconnect.NotifyOthers(serverResponse)
		}
	}
}

func UpdateConn(user *SocketReader, tab []*SocketReader) []*SocketReader {
	var (
		found   bool
		Initial = user.Con
	)
	for i := range tab {
		if tab[i].Username == user.Username {
			tab[i].Con = user.Con
			found = true
			log.Printf("connection '%v' updated to '%v'", Initial.LocalAddr(), tab[i].Con.LocalAddr())
			break
		}
	}
	if !found {
		tab = append(tab, user)
	}
	return tab
}
