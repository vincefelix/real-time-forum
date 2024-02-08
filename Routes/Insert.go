package Route

import (
	"fmt"
	com "forum/Communication"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
	"strings"
)

func InserPost(user string, data Struct.DataPost, database db.Db) (com.Post, bool, Struct.Errormessage) {
	//checking Id_user validity
	if tools.IsnotExist_user(user, database) {
		return com.Post{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "user doesn't exist",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    true,
			}
	}

	//checking Title's validity
	if data.Title == "" {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s due to empty title ❌\n", user)
		return com.Post{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to empty title",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    false,
			}
	}
	//checking content's validity
	if strings.TrimSpace(data.Content) == "" && data.Image == "" {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s due to empty content ❌\n", user)
		return com.Post{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to empty content",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    false,
			}
	}
	//checking categore's validity
	if len(data.Categories) < 1 { //user did not select a categorie
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s due to missing category❌\n", user)
		return com.Post{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to missing category",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    false,
			}
	}

	if len(data.Content) > 1500 || tools.IsInvalid(data.Title) || len(data.Title) > 25 { //found only spaces,newlines in the input or chars number limit exceeded
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s due to invalid input ❌\n", user)
		return com.Post{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to invalid input",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    false,
			}
	}
	post, ok, errMess := CreateP_mngmnt(user, data.Categories, data.Content, data.Title, data.Image, database)
	if !ok {
		return post, false, errMess
	}
	return post, true, Struct.Errormessage{}
}

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
