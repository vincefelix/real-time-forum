package Handle

import (
	authTools "forum/Authentication"
	db "forum/Database"
	Struct "forum/data-structs"
	"log"
	"strings"
)

func HandleCookie(requestPayload map[string]interface{}, database db.Db) (bool, Struct.Errormessage) {
	// check if the cookie is present in database
	cookie := strings.Split(requestPayload["data"].(string), "=")[1]
	ok, Msg := authTools.CheckCookie(cookie, database)
	if !ok {
		log.Println("❌ cookie not found in db")
		return false, Msg
	}
	return true, Msg
}
