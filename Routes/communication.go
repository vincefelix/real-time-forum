package Route

import (
	// "fmt"
	// "net/http"

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