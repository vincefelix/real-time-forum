package Handle

import (
	db "forum/Database"
	Com "forum/Routes"
	Struct "forum/data-structs"
)

func HandleComment(requestPayload map[string]interface{}, database db.Db) (map[string]interface{}, bool, Struct.Errormessage) {
	elements := Struct.DataComment{
		User:    requestPayload["user_id"].(string),
		Content: requestPayload["content"].(string),
		IdPost:  requestPayload["post_id"].(string),
	}

	comment, ok, err := Com.CreateC_mngmnt(elements.User, elements.IdPost, elements.Content)
	if !ok {
		return nil, false, err
	}
	Response := make(map[string]interface{}, 0)
	Response["Type"] = "addComment"
	Response["status"] = "200"
	Response["Payload"] = comment
	Response["cookieValidity"] = "true"
	return Response, true, Struct.Errormessage{}

}
