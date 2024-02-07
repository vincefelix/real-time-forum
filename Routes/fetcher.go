package Route

import (
	"database/sql"
	"fmt"
	auth "forum/Authentication"
	Com "forum/Communication"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
)

/*
?GetAll_fromDB connects to database, retrieves from it informations
?and returns an array of posts
*/
func GetAll_fromDB(session string) (Com.Posts, bool, Struct.Errormessage) {
	database, err := db.Init_db()
	if err != nil {
		fmt.Println(err)
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location: "home",
				Display: false,
			}
	}
	user, err, _ := auth.HelpersBA("sessions", database, "user_id", "WHERE id_session='"+session+"'", "")
	// fmt.Println("here", s, "error", err)
	if err != nil {
		fmt.Println("erreur du serveur", err)
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location:   "home",
				Display:    true,
			}
	}
	if user == "" {
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "Invalid cookie",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    true,
			}
	}
	// connecting to database.
	var (
		postab  Com.Posts
		commtab Com.Comments
	)

	database.Doc, errd = sql.Open("sqlite3", "forum.db")
	if errd != nil {
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location:   "home",
				Display:    true,
			}
	}
	//-------------- retrieving datas ---------------//
	//--1
	errGetPost := postab.GetPost_data(database)
	if errGetPost != nil {
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location:   "home",
				Display:    true,
			}
	}
	//--2
	errGetComm := commtab.GetComment_data(database)
	if errGetComm != nil {
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location:   "home",
				Display:    true,
			}
	}
	//--3
	errectabcomm := reactab_com.GetReact_comdata(database)
	if errectabcomm != nil {
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location:   "home",
				Display:    true,
			}
	}
	//--4
	categos, err := Com.GetPost_categories(database)
	if err != nil {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't get categories data from database\n")
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location:   "home",
				Display:    true,
			}
	}
	//--5
	errectab := reactab.Get_reacPosts_data(database)
	if errectab != nil {
		fmt.Printf("⚠ ERROR ⚠ : Couldn't get reaction for display a from database\n")
		return nil,
			false,
			Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location:   "home",
				Display:    true,
			}
	}
	//--------------------------------------------------------------------//
	// storing the session's id
	for i := range postab {
		postab[i].SessionId = user
	}
	for i := range commtab {
		commtab[i].SessionId = user
	}

	//storing user's name and profil image in structures
	for i := range postab {
		username, name, surname, errGN := tools.GetName_byID(database, postab[i].UserId)
		Profil, errprof := tools.GetPic_byID(database, postab[i].UserId)

		if errprof != nil || errGN != nil {
			//sending metadata about the error to the servor
			return nil,
				false,
				Struct.Errormessage{
					Type:       tools.IseType,
					Msg:        tools.InternalServorError,
					StatusCode: tools.IseStatus,
					Location:   "home",
					Display:    true,
				}
		}
		postab[i].Profil = Profil
		postab[i].Username = username
		postab[i].Name = name
		postab[i].Surname = surname
	}

	for i := range commtab {
		username, name, surname, errGN := tools.GetName_byID(database, commtab[i].UserId)
		Profil, errprof := tools.GetPic_byID(database, commtab[i].UserId)

		if errprof != nil || errGN != nil {
			//sending metadata about the error to the servor
			return nil,
				false,
				Struct.Errormessage{
					Type:       tools.IseType,
					Msg:        tools.InternalServorError,
					StatusCode: tools.IseStatus,
					Location:   "home",
					Display:    true,
				}
		}
		commtab[i].Profil = Profil
		commtab[i].Username = username
		commtab[i].Name = name
		commtab[i].Surname = surname
	}

	//storing the reactions in corresponding comments
	for i := range commtab {
		for j := range reactab_com {
			if commtab[i].CommentId == reactab_com[j].CommentId {
				switch reactab_com[j].Reaction {
				case true:
					commtab[i].Likecomm = append(commtab[i].Likecomm, "true")
					if commtab[i].SessionId == reactab_com[j].UserId {
						commtab[i].SessionReact = "true"
					}

				case false:
					commtab[i].Dislikecomm = append(commtab[i].Dislikecomm, "false")
					if commtab[i].SessionId == reactab_com[j].UserId {
						commtab[i].SessionReact = "false"
					}
				}
			}
		}
	}

	//storing the comments in corresponding posts
	for i := range postab {
		for j := range commtab {
			if postab[i].PostId == commtab[j].PostId {
				postab[i].Comment_tab = append(postab[i].Comment_tab, commtab[j])
			}
		}
	}

	//storing the categories in corresponding posts
	for i := range postab {
		for j := range categos {
			if postab[i].PostId == categos[j].PostId {
				postab[i].Categorie = append(postab[i].Categorie, categos[j].Category)
			}
		}
	}

	//storing the reactions in corresponding posts
	for i := range postab {
		for j := range reactab {
			if postab[i].PostId == reactab[j].PostId {
				switch reactab[j].Reaction {
				case true:
					postab[i].Like = append(postab[i].Like, "true")
					if postab[i].SessionId == reactab[j].UserId {
						postab[i].SessionReact = "true"
					}

				case false:
					postab[i].Dislike = append(postab[i].Dislike, "false")
					if postab[i].SessionId == reactab[j].UserId {
						postab[i].SessionReact = "false"
					}
				}
			}
		}
	}
	return postab,
		true,
		Struct.Errormessage{}
}
