package Route

import (
	"fmt"
	"net/http"

	//auth "forum/Authentication"
	Com "forum/Communication"
	db "forum/Database"
	//tools "forum/tools"
)

type Res struct {
	CurrentN     string
	CurrentSN    string
	CurrentUN    string
	CurrentPP    string
	CurrentCover string
	Postab       Com.Posts
	Empty        bool
}

var (
	postab      Com.Posts    // posts local storage
	commtab     Com.Comments // comments local storage
	reactab     Com.Reacts   //posts reactions local storage
	reactab_com Com.ReactC   // comments reactions local storage
	database    db.Db        //database local storage
	errd        error        // manage errors
)

var Id_user string

/*
Communications handles user's posts, comments and reactions
it can only be reached by using method POST or GET
*/
func Communication(w http.ResponseWriter, r *http.Request, Id string, redirect string) {
	Id_user = Id

	GetAll_fromDB(w) //display all values in the forum database
	fmt.Println("postab size ->> ", len(postab))
	// StatusCode := ProcessData(w, r, redirect) //Process datas received fromn client request
	// if StatusCode != 200 {
	// 	auth.Snippets(w, StatusCode)
	// 	return
	// }

	// code
	//current_pp, _, errpp := auth.HelpersBA("users", database, "pp", " WHERE id_user='"+Id_user+"'", "")
	//current_cover, _, errcover := auth.HelpersBA("users", database, "pc", " WHERE id_user='"+Id_user+"'", "")
	// handle error
	// if errpp || errcover {
	// 	fmt.Println("error pp,", errpp, " error cover", errcover)
	// 	auth.Snippets(w, http.StatusInternalServerError)
	// }
	
	fmt.Println("--------------- 🟢🌐 home data sent -----------------------") //debug

}
