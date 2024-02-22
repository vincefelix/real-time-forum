package Socket

import (
	"fmt"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
)

func UpdateMess(payload map[string]interface{}, database db.Db) (bool, Struct.Errormessage) {
	receiver, sender := payload["receiver"].(string), payload["sender"].(string)
	condition := fmt.Sprintf("WHERE receiver ='%s' AND sender='%s'", receiver, sender)
	errup := database.UPDATE("Messages", "isread=true", condition)
	if errup != nil {
		return false,
			Struct.Errormessage{Type: tools.IseType, Msg: tools.InternalServorError, StatusCode: 500}
	}
	return true, Struct.Errormessage{}
}
