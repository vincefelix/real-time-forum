package Handle

import (
	db "forum/Database"
	Com "forum/Routes"
	Struct "forum/data-structs"
)

func HandlePost(requestPayload map[string]interface{}, database db.Db) (map[string]interface{}, bool, Struct.Errormessage) {
	elements := Struct.DataPost{
		User:       requestPayload["user_id"].(string),
		Title:      requestPayload["title"].(string),
		Content:    requestPayload["content"].(string),
		Image:      requestPayload["image"].(string),
		Categories: requestPayload["categories"].([]string),
	}

	post, ok, err := Com.CreateP_mngmnt(elements.User, elements.Categories, elements.Title, elements.Content, elements.Image)
	if !ok {
		return nil, false, err
	}
	Response := make(map[string]interface{}, 0)
	Response["Type"] = "addPost"
	Response["status"] = "200"
	Response["Payload"] = post
	Response["cookieValidity"] = "true"
	return Response, true, Struct.Errormessage{}

}
