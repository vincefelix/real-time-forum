package Route

import (
	"fmt"
	com "forum/Communication"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
	"strings"
)

// func ProcessData(w http.ResponseWriter, r *http.Request, redirect string) int {
// 	//--removing the welcoming post
// 	//?------------ client sent a request -----------------
// 	if r.Method == "POST" {
// 		//--------retrieving form values ----------
// 		fmt.Println("--------------------------------------------")
// 		fmt.Println("             " + redirect + "Form values" + "                  ")
// 		fmt.Println("--------------------------------------------")

// 		//--ID
// 		Id_post := r.FormValue("postid")
// 		fmt.Println("[INFO] ID post: ", Id_post) //debug

// 		Id_postR := r.FormValue("Rpostid")
// 		fmt.Println("[INFO] ID postREc: ", Id_postR) //debug

// 		Id_comment := r.FormValue("comId")
// 		fmt.Println("[INFO] ID comment: ", Id_comment) //debug

// 		Id_commentR := r.FormValue("Rcomid")
// 		fmt.Println("[INFO] ID commentR: ", Id_commentR) //debug

// 		//-----title
// 		Title := r.FormValue("title")
// 		fmt.Println("[INFO] Post title: ", Title) //debug

// 		//---text content
// 		content := r.FormValue("post_content")
// 		fmt.Println("[INFO] content: ", content) //debug

// 		newcomment := r.FormValue("newcomment")
// 		fmt.Println("[INFO] comment: ", newcomment) //debug

// 		replycomm := r.FormValue("replycomm")
// 		fmt.Println("[INFO] reply comment: ", replycomm) //debug

// 		//-------------------------image's link----------------------------
// 		Image, errimage := Upload_mngmnt(w, r, 20, "image")
// 		fmt.Println("[INFO] Post image link: ", Image) //debug
// 		//---------------------------------------------------------------

// 		//----Reactions
// 		React := r.FormValue("react")
// 		fmt.Println("[INFO] react: ", React) //debug

// 		Reactcomm := r.FormValue("reactcomm")
// 		fmt.Println("[INFO] reactcomm: ", Reactcomm) //debug

// 		//-----submit buttons
// 		Subpost := r.FormValue("subpost")
// 		fmt.Println("[INFO] subpost: ", Subpost) //debug

// 		Subcomm := r.FormValue("subcomm")
// 		fmt.Println("[INFO] subcomm: ", Subcomm) //debug

// 		subreply := r.FormValue("subreply")
// 		fmt.Println("[INFO] subreply: ", subreply) //debug

// 		//------categories
// 		education := r.FormValue("education")
// 		sport := r.FormValue("sport")
// 		art_culture := r.FormValue("art_culture")
// 		cinema := r.FormValue("cinema")
// 		health := r.FormValue("health")
// 		others := r.FormValue("others")

// 		categorie := []string{education, sport, art_culture, cinema, health, others}
// 		var tempc []string
// 		for _, v := range categorie {
// 			if v != "" {
// 				tempc = append(tempc, v)
// 			}
// 		}
// 		categorie = tempc
// 		fmt.Println("[INFO] categorie: ", categorie) //debug

// 		fmt.Println("--------------------------------------------")
// 		//-----------end of retrieving form value----------

// 		switch {

// 		// create comment case:
// 		case Id_user != "" && Subcomm != "" && Id_post != "":
// 			//!--checking Id_user and Id_post validity
// 			if tools.IsnotExist_user(Id_user, database) || tools.IsnotExist_Post(Id_post, database) {
// 				return 400
// 			}

// 			//!--checking if the comment is empty
// 			if newcomment == "" {
// 				fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment from user %s due to empty content ❌\n", Id_user)
// 				return 400
// 			}

// 			//!--checking the comment validity
// 			if tools.IsInvalid(newcomment) { //found only spaces or newlines in the input
// 				fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment in post %s from user %s due to invalid input ❌\n", Id_post, Id_user)
// 				return 400
// 			}

// 			if r.Method != "POST" {
// 				fmt.Printf("⚠ ERROR ⚠ : cannot access to that page by with mode other than POST ❌")
// 				return 405
// 			}
// 			CreateC_mngmnt(w, r, Id_post, newcomment)
// 			http.Redirect(w, r, redirect+"#"+Id_post, http.StatusSeeOther)

// 			//*reply comment case:
// 		case Id_user != "" && Id_post != "" && Id_comment != "" && subreply != "":
// 			//!--checking Id_user, Id_post and Id_comment validity
// 			if tools.IsnotExist_user(Id_user, database) || tools.IsnotExist_Post(Id_post, database) || tools.IsnotExist_Comment(Id_comment, database) {
// 				return 400
// 			}

// 			//!--checking if the comment is empty
// 			if replycomm == "" {
// 				fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment reply from user %s due to empty content ❌\n", Id_user)
// 				return 400
// 			}

// 			//!--checking the comment validity
// 			if tools.IsInvalid(replycomm) { //found only spaces or newlines in the input
// 				fmt.Printf("⚠ ERROR ⚠ : Couldn't create comment in post %s from user %s due to invalid input ❌\n", Id_post, Id_user)
// 				return 400
// 			}

// 			if r.Method != "POST" {
// 				fmt.Printf("⚠ ERROR ⚠ : cannot access to that page by with mode other than POST ❌")
// 				return 405
// 			}
// 			ReplyC_mngmnt(w, r, Id_post, Id_comment, Id_user, replycomm)
// 			http.Redirect(w, r, redirect+"#"+Id_post, http.StatusSeeOther)

// 			//* reactpost case:
// 		case Id_user != "" && Id_postR != "" && React != "":
// 			//!--checking id_user and id_post validity
// 			if tools.IsnotExist_user(Id_user, database) || tools.IsnotExist_Post(Id_postR, database) {
// 				return 400
// 			}

// 			if r.Method != "POST" {
// 				fmt.Printf("⚠ ERROR ⚠ : cannot access to that page by with mode other than POST ❌")
// 				return 405
// 			}
// 			Reactpost_mngmnt(w, r, Id_postR, React)
// 			http.Redirect(w, r, redirect+"#"+Id_postR, http.StatusSeeOther) //refreshing the page after data processing

// 			//*reactcomment case
// 		case Id_user != "" && Id_commentR != "" && Reactcomm != "":
// 			//!--checking id_user and id_post validity
// 			if tools.IsnotExist_user(Id_user, database) || tools.IsnotExist_Comment(Id_commentR, database) {
// 				return 400
// 			}

// 			if r.Method != "POST" {
// 				fmt.Printf("⚠ ERROR ⚠ : cannot access to that page by with mode other than POST ❌")
// 				return 405
// 			}
// 			Reactcmnt_mngmnt(w, r, Id_commentR, Reactcomm)
// 			http.Redirect(w, r, redirect+"#"+Id_commentR, http.StatusSeeOther) //refreshing the page after data processing

// 			//default: just display datas

// 		} // end switch case

// 	} //?------------ end of request treatment-----------------
// 	return 200
// }

func InserPost(user string, data Struct.DataPost, database db.Db) (com.Post, Struct.Errormessage) {

	//checking Id_user validity
	if tools.IsnotExist_user(user, database) {
		return com.Post{}, Struct.Errormessage{}
	}
	//checking Title's validity
	if data.Title == "" {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s due to empty title ❌\n", Id_user)
		return com.Post{},
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to empty title",
				StatusCode: tools.BdStatus,
			}
	}
	//checking content's validity
	if strings.TrimSpace(data.Content) == "" && data.Image == "" {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s due to empty content ❌\n", Id_user)
		return com.Post{},
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to empty content",
				StatusCode: tools.BdStatus,
			}
	}
	//checking categore's validity
	if len(data.Categorie) < 1 { //user did not select a categorie
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s due to missing category❌\n", Id_user)
		return com.Post{},
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to missing category",
				StatusCode: tools.BdStatus,
			}
	}

	if len(data.Content) > 1500 || tools.IsInvalid(data.Title) || len(data.Title) > 25 { //found only spaces,newlines in the input or chars number limit exceeded
		fmt.Printf("⚠ ERROR ⚠ : Couldn't create post from user %s due to invalid input ❌\n", Id_user)
		return com.Post{},
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to empty content",
				StatusCode: tools.BdStatus,
			}
	}
	//!---------- alert modif --------!
	CreateP_mngmnt(user, data.Categorie, data.Content, data.Title, data.Image)
	return com.Post{},
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Couldn't create post due to empty content",
				StatusCode: tools.BdStatus,
			}
}
