package Route

import (
	"net/http"
	"time"

	// auth "forum/Authentication"
	db "forum/Database"
)

func LogOutHandler(w http.ResponseWriter, r *http.Request, tab db.Db) {
	if r.Method != "POST" {
		// auth.Snippets(w, http.StatusMethodNotAllowed)
		return
	}
	_, err := r.Cookie("session_token")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			http.Redirect(w, r, "/", http.StatusSeeOther)
			//	auth.Snippets(w, http.StatusUnauthorized)
			return
		}
		// For any other type of error, return an internal server error
		// auth.Snippets(w, http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:    "session_token",
		Value:   "",
		Expires: time.Now(),
	})

	http.Redirect(w, r, "/", http.StatusSeeOther)

}

// func Connection0auth(tab db.Db, email string, name string, familyName string, w http.ResponseWriter, r *http.Request, id string) {
// 	auth.CheckCookie(w, r, tab)
// 	if r.Method != "GET" {
// 		auth.Snippets(w, http.StatusMethodNotAllowed)
// 		return
// 	}
// 	if r.URL.Path != "/auth/github/callback" && r.URL.Path != "/auth/google/callback" {
// 		auth.Snippets(w, http.StatusUnauthorized)
// 		return
// 	}
// 	// verifier si le user existe deja sinon lui creer un compte dans les deux cas redirections vers /home
// 	// iduser, _, foundId := auth.HelpersBA("users", tab, "id_user", "WHERE id_user='"+id+"'", "")
// 	foundId := auth.GetDatafromBA(tab.Doc, id, "id_user", db.User)
// 	fmt.Println(foundId, "iduser")

// 	//si l'id de l'utilisateur existe on le renvoie a ca page home
// 	if foundId {
// 		auth.CreateSession(w, id, tab)
// 		http.Redirect(w, r, "/home", http.StatusSeeOther)
// 	} else {
// 		foundEmail := auth.GetDatafromBA(tab.Doc, email, "email", db.User)
// 		//s'il n'existe pas on le crée mais seulement apres avoir verifier que le mail fournis ne se trouve pas deja dans la ba
// 		if foundEmail {

// 			// data := fmt.Sprintf("surname=%s&name=%s&username=%s&email=%s&password=%s&confirmpwd=%s",
// 			// name,familyName, name, "example@gmail.com", "exemple", "confirm exemple")
// 			formcreate := Create{Surname: name, Name: familyName, Username: name, Email: email, Password: "", Confirmpwd: ""}
// 			r.URL.Path = "/create"
// 			messageE := "email/username already used"
// 			message := Message{Errormessage: messageE, CreateForm: formcreate}
// 			auth.DisplayFilewithexecute(w, "templates/createacount.html", message, http.StatusBadRequest)
// 			fmt.Println("⚠ ERROR ⚠:❌  email ", email, "ou username existant", name)
// 			// fmt.Fprint(w, `<script>window.history.pushState({}, '', '/create');</script>`)
// 			return

// 		} else {
// 			// password hash
// 			hashpassword, errorhash := auth.HashPassword(id)
// 			if errorhash != nil {
// 				fmt.Println("error hash")
// 				auth.Snippets(w, http.StatusInternalServerError)
// 				return
// 			}
// 			//creation pseudo
// 			username := auth.GenerateUsername(name, tab)

// 			values := "('" + id + "','" + email + "','" + familyName + "','" + username + "','" + name + "','" + hashpassword + "','../static/front-tools/images/profil.jpeg','../static/front-tools/images/mur.png')"
// 			attributes := "(id_user,email,name,username,surname, password,pp,pc)"
// 			error := tab.INSERT(db.User, attributes, values)
// 			if error != nil {
// 				fmt.Println("something wrong")
// 				fmt.Println("error", error)
// 				auth.Snippets(w, http.StatusInternalServerError)
// 				return

// 			}
// 			valuesession := "('" + id + "')"
// 			attributessession := "(user_id)"
// 			errorsession := tab.INSERT("sessions", attributessession, valuesession)
// 			if errorsession != nil {
// 				fmt.Println("something wrong with insert session", errorsession)
// 				fmt.Println("error", error)
// 				auth.Snippets(w, http.StatusInternalServerError)
// 				return

// 			}
// 			auth.CreateSession(w, id, tab)
// 			http.Redirect(w, r, "/home", http.StatusSeeOther)
// 		}
// 		return
// 	}

// }
