package Handle

import (
	"fmt"
	db "forum/Database"
	Com "forum/Routes"
	Struct "forum/data-structs"
	tools "forum/tools"
)

func HandleComment(requestPayload map[string]interface{}, database db.Db) (map[string]interface{}, bool, Struct.Errormessage) {
	elements := Struct.DataComment{
		User:    requestPayload["user_id"].(string),
		Content: requestPayload["content"].(string),
		IdPost:  requestPayload["post_id"].(string),
	}
	fmt.Println("in hdle comment ", elements)
	if tools.IsnotExist_user(elements.User, database) || tools.IsnotExist_Post(elements.IdPost, database) {
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "inexistant id",
				StatusCode: tools.BdStatus,
				Post:       elements.IdPost,
				Location:   "homeComment",
				Display:    false,
			}
	}
	//!--checking if the comment is empty
	if elements.Content == "" {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment from user %s due to empty content ❌\n", elements.User)
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "empty content, please fill the  field.",
				StatusCode: tools.BdStatus,
				Post:       elements.IdPost,
				Location:   "homeComment",
				Display:    false,
			}
	}
	//!--checking the comment validity
	if tools.IsInvalid(elements.Content) { //found only spaces or newlines in the input
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment in post %s from user %s due to invalid input ❌\n", elements.IdPost, elements.User)
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "invalid input, try again",
				StatusCode: tools.BdStatus,
				Post:       elements.IdPost,
				Location:   "homeComment",
				Display:    false,
			}
	}
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
