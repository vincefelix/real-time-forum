package Handle

import (
	"fmt"
	db "forum/Database"
	auth "forum/Routes"
	Struct "forum/data-structs"
	"log"
)

func HandleRegister(requestPayload map[string]interface{}, database db.Db) (map[string]interface{}, bool, Struct.Errormessage) {
	user := Struct.Register{
		FirstName:            requestPayload["firstName"].(string),
		LastName:             requestPayload["lastName"].(string),
		NickName:             requestPayload["nickName"].(string),
		Age:                  requestPayload["age"].(string),
		Gender:               requestPayload["gender"].(string),
		EmailRegister:        requestPayload["emailRegister"].(string),
		PasswordRegister:     requestPayload["passwordRegister"].(string),
		ConfPasswordRegister: requestPayload["confPasswordRegister"].(string),
	}
	fmt.Printf("✨ user wants to register with %s\n", user)
	ok, err := auth.RegisterUser(user, database)
	if !ok {
		log.Printf("❌ error while registering user\n")
		return nil, false, err
	}
	Response := make(map[string]interface{}, 0)
	Response["Type"] = "register"
	Response["Authorization"] = "granted"
	Response["status"] = "200"
	return Response, true, Struct.Errormessage{}
}
