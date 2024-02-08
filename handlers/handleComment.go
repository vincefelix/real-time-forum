package Handle

import (
	"fmt"
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
	fmt.Println("in hdle comment ", elements)

	comment, ok, err := Com.CreateC_mngmnt(elements.User, elements.IdPost, elements.Content, database)
	if !ok {
		return nil, false, err
	}
	fmt.Println("comment created very well")
	Response := make(map[string]interface{}, 0)
	Response["Type"] = "addComment"
	Response["status"] = "200"
	Response["Payload"] = comment
	Response["cookieValidity"] = "true"
	return Response, true, Struct.Errormessage{}

}
