package Handle

import (
	db "forum/Database"
	auth "forum/Routes"
	Struct "forum/data-structs"
	tools "forum/tools"
	"log"
)

func HandleLogin(requestPayload map[string]interface{}, database db.Db) ([]string, map[string]interface{}, bool, Struct.Errormessage) {
	user := Struct.Login{
		EmailLogin:    requestPayload["emailLogin"].(string),
		PassWordLogin: requestPayload["passwordLogin"].(string),
	}
	payload, userCookie, ok, err := auth.LoginUser(user, database)
	if !ok {
		log.Println("❌ error while login user", err)
		return nil, nil, false, err
	}

	token, errToken, errMess := tools.GenerateToken(payload)
	if errToken != nil {
		log.Printf("❌ error while generating token %s\n", errToken)
		return nil, nil, false, errMess
	}
	Response := make(map[string]interface{}, 0)
	Response["Type"] = "login"
	Response["Authorization"] = "granted"
	Response["status"] = "200"
	Response["Payload"] = token
	Response["cookie"] = userCookie
	Response["session"] = userCookie.Value

	return []string{
			payload.Id,
			payload.NickName,
			payload.Profil,
		},
		Response,
		true,
		Struct.Errormessage{}
}
