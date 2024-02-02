package Route

import (
	"fmt"
	"html/template"
	"net/http"

	auth "forum/Authentication"
	Com "forum/Communication"
	db "forum/Database"
	//tools "forum/tools"
)

func Filter(user string, w http.ResponseWriter, r *http.Request, database db.Db) {
	//code ajouté
	c, errc := r.Cookie("session_token")
	if errc != nil {
		fmt.Println("pas de cookie session")
		http.Redirect(w, r, "/", http.StatusSeeOther)

	} else {
		s, err, _ := auth.HelpersBA("sessions", database, "user_id", "WHERE id_session='"+c.Value+"'", "")
		// fmt.Println("here", s, "error", err)
		if err != nil {
			fmt.Println("erreur du serveur", err)
		}
		if s == "" {
			fmt.Println("cookie invalide,affichage de /", s, "verif vide")
			http.Redirect(w, r, "/", http.StatusSeeOther)
			return
		}
	}
	//fin code

	//-------------- retrieving datas ---------------/
	GetAll_fromDB(user)

	//--------retrieving form values ----------
	fmt.Println("--------------------------------------------")
	fmt.Println("             Filter form values             ")
	fmt.Println("--------------------------------------------")

	categorie := r.URL.Query().Get("filter")
	if categorie == "art" {
		categorie = "art & culture"
	}
	if categorie != "art & culture" && categorie != "education" && categorie != "sport" && categorie != "cinema" && categorie != "health" && categorie != "others" {
		fmt.Printf("⚠ ERROR ⚠ filtering --> bad request ❌\n")
		w.WriteHeader(http.StatusNotFound)
		error_file := template.Must(template.ParseFiles("templates/error.html"))
		error_file.Execute(w, "400")
		return
	}
	fmt.Println("[INFO] categorie choice: ", categorie) //debug
	var newtab Com.Posts

	for _, v := range postab {
		for _, j := range v.Categorie {
			if j == categorie {
				newtab = append(newtab, v)
				break
			}
		}
	}
	fmt.Println("--------------- 🟢🌐 filter data sent -----------------------") //debug

}
