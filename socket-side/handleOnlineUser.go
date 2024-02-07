package Socket

import "log"

func HandleOnlineUser() {
	for {
		select {
		case user := <-Isconnected:
			log.Printf("🟢 user: %v is connected\n", user.Username)
			UserTab = UpdateConn(user, UserTab)
			serverResponse := make(map[string]interface{})
			serverResponse["Type"] = "online"
			serverResponse["Payload"] = UserConn{
				Username: user.Username,
				Profil:   user.Profil,
				Online:   true,
			}
			user.NotifyOthers(serverResponse)

		case disconnect := <-IsDisconnected:
			log.Printf("user: %v is disconnected\n", disconnect.Username)
			serverResponse := make(map[string]interface{})
			serverResponse["Type"] = "offline"
			serverResponse["Payload"] = UserConn{
				Username: disconnect.Username,
				Profil:   disconnect.Profil,
				Online:   false,
			}
			disconnect.NotifyOthers(serverResponse)
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
			// case Update := <-UpdateUserConn:
			// 	UserTab = UpdateConn(Update, UserTab)
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
			log.Printf("connection '%v' updated to '%v'", Initial, tab[i].Con)
			break
		}
	}
	if !found {
		tab = append(tab, user)
	}
	return tab
}
