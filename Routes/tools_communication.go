package Route

import (
	"fmt"
	Err "forum/Authentication"
	com "forum/Communication"
	//db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
	"net/http"
	"strings"
)

// CreateP_mngmnt handles user's post activity
func CreateP_mngmnt(user string, categorie []string, title string, content string, image string) (com.Post, Struct.Errormessage) {

	idPost_toReplace, errpost := postab.Create_post(database, user, categorie, title, content, image)
	if errpost != nil {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s ❌\n", Id_user)
		return com.Post{},
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Unknown user",
				StatusCode: tools.BdStatus,
			}
	}
	fmt.Println("post created with content ", content)

	//*Getting the id post according to the content for html relative link
	//---formatting content to escape special chars
	if content == "" {
		content = idPost_toReplace
	} else {
		content = strings.ReplaceAll(content, "'", "2@c86cb3")
		content = strings.ReplaceAll(content, "`", "2#c86cb3")
	}

	//---fetching id post in database
	//condition := fmt.Sprintf("WHERE %s = '%s'", db.Description, content)
	// Idpost, err1 := database.GetData(db.Id_post, db.Post, condition)
	// Idpost_got, err2 := db.Getelement(Idpost)
//!--------- alert update -----------!
	return com.Post{},
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to empty content",
				StatusCode: tools.BdStatus,
			}
}

// CreateC_mngmnt handles user's comment activity
func CreateC_mngmnt(w http.ResponseWriter, r *http.Request, Id_post string, newcomment string) {
	errcomm := commtab.Create_comment(database, Id_user, Id_post, newcomment)
	if errcomm != nil {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment in post %s from user %s ❌\n", Id_post, Id_user)
		Err.Snippets(w, 500)
		return
	}
}
