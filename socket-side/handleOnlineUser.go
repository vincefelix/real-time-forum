package Socket

import "log"

func HandleOnlineUser() {
	for {
		select {
		case user := <-Isconnected:
			log.Printf("🟢 user: %v is connected\n", user)
			UserTab = append(UserTab, user)
			serverResponse := make(map[string]interface{})
			serverResponse["Type"] = "online"
			serverResponse["Payload"] = UserConn{
				Username: user.Username,
				Profil:   user.Profil,
				Online:   true,
			}
			user.Broadcast(serverResponse)

		case disconnect := <-IsDisconnected:
			log.Printf("user: %v is disconnected\n", disconnect)
			serverResponse := make(map[string]interface{})
			serverResponse["Type"] = "offline"
			serverResponse["Payload"] = UserConn{
				Username: disconnect.Username,
				Profil:   disconnect.Profil,
				Online:   false,
			}
			disconnect.Broadcast(serverResponse)
			//!removing disconnected user from user Tab
			for i, user := range UserTab {
				if user == disconnect {
					switch len(UserTab)-1 != i {
					case true:
						UserTab = append(UserTab[:i], UserTab[i+1:]...)
					case false:
						UserTab = UserTab[:len(UserTab)-1]
					}
				}
			}

		}
	}
}
