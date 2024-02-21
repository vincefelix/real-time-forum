package Route

import (
	Com "forum/Communication"
//	db "forum/Database"
)

var (
	postab      Com.Posts    // posts local storage
	commtab     Com.Comments // comments local storage
	//database    db.Db        //database local storage
	errd        error        // manage errors
)