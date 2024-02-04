package Socket

import (
	"fmt"
	auth "forum/Authentication"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
	"log"
)

func GetUsers_State(database db.Db) ([]UserConn, bool, Struct.Errormessage) {
	Users, ok := auth.GetAllUSers(database.Doc)
	fmt.Println("------------ fetched users ----------")
	for i := range Users {
		fmt.Println(Users[i])
	}

	if !ok {
		log.Println("❌ error while  getting users from database")
		return nil,
			false,
			Struct.Errormessage{Type: tools.IseType, Msg: tools.InternalServorError, StatusCode: 500}
	}
	var Clients []UserConn
	for _, user := range Users {
		for _, connectedUser := range UserTab {
			if connectedUser.Id == user.Id {
				Clients = append(Clients, UserConn{Username: user.Username, Profil: user.Pp, Online: true})
			} else {
				Clients = append(Clients, UserConn{Username: user.Username, Profil: user.Pp, Online: false})
			}
		}
	}
	Clients = removeDuplicates(Clients)
	fmt.Println("-------- user  list -------")
	for i := range UserTab {
		fmt.Println(UserTab[i])
	}
	fmt.Println("--------------------------")
	fmt.Println("-------- client  list -------")
	for i := range Clients {
		fmt.Println(Clients[i])
	}
	return Clients, true, Struct.Errormessage{}
}

func removeDuplicates(input []UserConn) []UserConn {
	seen := make(map[UserConn]struct{})
	result := []UserConn{}

	for _, num := range input {
		if _, exists := seen[num]; !exists {
			seen[num] = struct{}{}
			result = append(result, num)
		}
	}

	return result
}
