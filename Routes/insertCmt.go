package Route

import (
	"fmt"
	com "forum/Communication"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
)

func InsertComment(user string, data Struct.DataComment, database db.Db) (com.Comment, bool, Struct.Errormessage) {
	// create comment case:
	//!--checking Id_user and Id_post validity
	if tools.IsnotExist_user(user, database) || tools.IsnotExist_Post(data.IdPost, database) {
		return com.Comment{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't  create comment",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    false,
			}
	}

	//!--checking if the comment is empty
	if data.Content == "" {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment from user %s due to empty content ❌\n", user)
		return com.Comment{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't  create comment with empty value",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    false,
			}

	}

	//!--checking the comment validity
	if tools.IsInvalid(data.Content) { //found only spaces or newlines in the input
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment in post %s from user %s due to invalid input ❌\n", data.IdPost, user)
		return com.Comment{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't  create comment with invalid input",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    false,
			}
	}

	comment, ok, errMess := CreateC_mngmnt(user, data.IdPost, data.Content, database)
	if !ok {
		return comment, false, errMess
	}
	return comment, true, Struct.Errormessage{}
}
