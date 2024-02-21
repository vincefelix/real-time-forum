package Handle

import (
	authTools "forum/Authentication"
	db "forum/Database"
	Struct "forum/data-structs"
	"log"
)

func HandleCookie(requestPayload map[string]interface{}, database db.Db) (bool, string, Struct.Errormessage) {
	// check if the cookie is present in database
	log.Println("In cookie")
	cookie := requestPayload["data"].(string)
	ok, session, Msg := authTools.CheckCookie(cookie, database)
	if !ok {
		log.Println("❌ cookie not found in db")
		return false, "", Msg
	}
	return true, session, Msg
}
