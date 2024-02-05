package Route

import (
	"fmt"
	auth "forum/Authentication"
	com "forum/Communication"
	db "forum/Database"
	"log"

	//db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
	"strings"
)

// CreateP_mngmnt handles user's post activity
func CreateP_mngmnt(user string, categorie []string, title string, content string, image string, database db.Db) (com.Post, bool, Struct.Errormessage) {
	log.Println("In createP M")
	post := com.Post{}
	idPost_toReplace, errpost := postab.Create_post(database, user, categorie, title, content, image)
	if errpost != nil {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s ❌\n", user)
		return com.Post{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Error while creating post",
				StatusCode: tools.BdStatus,
			}
	}
	fmt.Println("post created with content ", content)

	//*Getting the id post according to the content for html relative link
	//---formatting content to escape special chars
	// if content == "" {
	// 	content = idPost_toReplace
	// } else {
	// 	content = strings.ReplaceAll(content, "'", "2@c86cb3")
	// 	content = strings.ReplaceAll(content, "`", "2#c86cb3")
	// }
	request := fmt.Sprintf("%s, %s, %s, %s, %s, %s, %s", db.Id_post, db.User_id, db.Title, db.Description, db.Image, db.Time, db.Date)
	condition := fmt.Sprintf("WHERE %s = '%s'", db.Id_post, idPost_toReplace)
	rows_value, errow := database.GetData(request, db.Post, condition) //retrieving datas
	if errow != nil {
		return com.Post{},
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
			}
	}
	defer rows_value.Close()
	fmt.Println("✔ posts to send to front fetched from database")

	//storing retrieved datas in local structure
	for rows_value.Next() {
		errscan := rows_value.Scan(&post.PostId, &post.UserId, &post.Title, &post.Content, &post.ImageLink, &post.Time, &post.Date)
		if errscan != nil {
			fmt.Println("⚠ GetPost_data scan err in createPost mngmnt ⚠ :", errscan)
			return com.Post{},
				false,
				Struct.Errormessage{
					Type:       tools.IseType,
					Msg:        tools.InternalServorError,
					StatusCode: tools.IseStatus,
				}
		}
		//--formatting content's special chars
		post.Content = strings.ReplaceAll(post.Content, "2@c86cb3", "'")
		post.Content = strings.ReplaceAll(post.Content, "2#c86cb3", "`")

		//--formatting title's special chars
		post.Title = strings.ReplaceAll(post.Title, "2@c86cb3", "'")
		post.Title = strings.ReplaceAll(post.Title, "2#c86cb3", "`")

		//--formatting image link special chars
		post.ImageLink = strings.ReplaceAll(post.ImageLink, "2@c86cb3", "'")
		post.ImageLink = strings.ReplaceAll(post.ImageLink, "2#c86cb3", "`")
	}
	current_pp, _, errpp := auth.HelpersBA("users", database, "pp", " WHERE id_user='"+user+"'", "")
	if errpp {
		return com.Post{},
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
			}
	}
	Username, _, _, err := tools.GetName_byID(database, user)
	if err != nil {
		log.Println("error while getting nickname while creating posts")
		return com.Post{},
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
			}
	}
	post.Categorie = categorie
	post.Username = Username
	post.Profil = current_pp
	fmt.Println("after fetch ", post)
	//---fetching post in database
	// Idpost_got, err2 := db.Getelement(Idpost)\\
	return post,
		true,
		Struct.Errormessage{}
}

// CreateC_mngmnt handles user's comment activity
func CreateC_mngmnt(user string, Id_post string, newcomment string) (com.Comment, bool, Struct.Errormessage) {
	errcomm := commtab.Create_comment(database, user, Id_post, newcomment)
	if errcomm != nil {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment in post %s from user %s ❌\n", Id_post, user)
		return com.Comment{},
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Error while creating comment",
				StatusCode: tools.BdStatus,
			}
	}
	newcomment = strings.ReplaceAll(newcomment, "'", "2@c86cb3")
	newcomment = strings.ReplaceAll(newcomment, "`", "2#c86cb3")

	request := fmt.Sprintf("%s, %s, %s, %s, %s, %s", db.Post_id, db.User_id, db.Id_comment, db.Content, db.Time, db.Date)
	condition := fmt.Sprintf("WHERE %s = '%s'", db.Content, newcomment)
	rows_value, errow := database.GetData(request, db.Comment, condition) //retrieving datas
	if errow != nil {
		fmt.Println("⚠ ERROR ⚠ : Couldn't get comment values from database ❌")
		fmt.Printf("⚠ : %v\n", errow)
		return com.Comment{},
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
			}
	}
	fmt.Println("✔ comments fetched from database")

	var cmt com.Comment
	//storing retrieved datas in local structure
	for rows_value.Next() {
		errscan := rows_value.Scan(&cmt.PostId, &cmt.UserId, &cmt.CommentId, &cmt.Content, &cmt.Time, &cmt.Date)
		if errscan != nil {
			fmt.Println("⚠ ERROR ⚠ : Couldn't scan comments values ❌")
			fmt.Printf("⚠ : %v\n", errscan)
			return com.Comment{},
				false,
				Struct.Errormessage{
					Type:       tools.IseType,
					Msg:        tools.InternalServorError,
					StatusCode: tools.IseStatus,
				}
		}
		cmt.Content = strings.ReplaceAll(cmt.Content, "2@c86cb3", "'")
		cmt.Content = strings.ReplaceAll(cmt.Content, "2#c86cb3", "`")
	}
	return cmt,
		true,
		Struct.Errormessage{}
}
