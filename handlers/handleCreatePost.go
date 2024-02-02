package Handle

import (
	"fmt"
	db "forum/Database"
	Com "forum/Routes"
	Struct "forum/data-structs"
	"log"
)

func HandlePost(requestPayload map[string]interface{}, database db.Db) (map[string]interface{}, bool, Struct.Errormessage) {
	log.Println("in hdlePost")
	fmt.Println("1 ", requestPayload["user_id"].(string))
	fmt.Println("2 ", requestPayload["title"].(string))
	fmt.Println("3 ", requestPayload["content"].(string))
	fmt.Println("4 ", requestPayload["image"].(string))
	fmt.Println("5 ", requestPayload["categories"])
	var rangedCategories []string
	for _, item := range requestPayload["categories"].([]interface{}) {
		rangedCategories = append(rangedCategories, item.(string))
	}
	fmt.Println("ranged ", rangedCategories)
	elements := Struct.DataPost{
		User:       requestPayload["user_id"].(string),
		Title:      requestPayload["title"].(string),
		Content:    requestPayload["content"].(string),
		Image:      requestPayload["image"].(string),
		Categories: rangedCategories,
	}
	fmt.Println("els ", elements)

	post, ok, err := Com.InserPost(elements.User, elements, database)
	if !ok {
		return nil, false, err
	}
	log.Println("post to send ", post)
	Response := make(map[string]interface{}, 0)
	Response["Type"] = "addPost"
	Response["status"] = "200"
	Response["Payload"] = post
	Response["cookieValidity"] = "true"
	return Response, true, Struct.Errormessage{}

}
