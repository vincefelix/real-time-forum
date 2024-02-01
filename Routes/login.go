package Route

import (
	"database/sql"
	"fmt"
	auth "forum/Authentication"
	db "forum/Database"
	Struct "forum/data-structs"
	"log"
	"net/http"
)

func LoginUser(w http.ResponseWriter, user Struct.Login, tab db.Db) (Struct.UserInfo, Struct.Cookie, bool, Struct.Errormessage) {
	// check if the user is not already logged in to be able to access this page
	//auth.CheckCookie(w, r, tab)
	// method verification
	fmt.Println("🔵 In login process...")
	// retrieving query data
	username := user.EmailLogin
	password := user.PassWordLogin
	creds := Struct.Credentials{}
	cookie := Struct.Cookie{}
	userCreds := Struct.UserInfo{}
	//checks that the fields in the query are not null
	if username != "" && password != "" {
		//change
		if auth.NotAllow(username) {
			fmt.Println("character not allowed in username")
			return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "bad request", Msg: "character not allowed", StatusCode: 404}
		}
		if auth.NotAllow(password) {
			fmt.Println("character not allowed in password")
			return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "bad request", Msg: "character not allowed", StatusCode: 404}
		}
		//give the user the possibility to enter an email or a nickname
		giveUsername := auth.GetDatafromBA(tab.Doc, username, "username", db.User)
		giveEmail := auth.GetDatafromBA(tab.Doc, username, "email", db.User)
		if giveEmail {
			values := "WHERE email =" + "'" + username + "'"
			replaceEmailbyusername, err, _ := auth.HelpersBA("users", tab, "username", values, "")
			if err != nil {
				if err == sql.ErrNoRows {
					fmt.Println("erreur sql dans login page")
					return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "Internal Servor Error", Msg: "oops ! server didn't react as expected", StatusCode: 500}
				}
				fmt.Println("erreur interne dans login page")
				return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "Internal Servor Error", Msg: "oops ! server didn't react as expected", StatusCode: 500}
			}
			creds = Struct.Credentials{Username: replaceEmailbyusername, Password: password}
		} else if giveUsername {
			creds = Struct.Credentials{Username: username, Password: password}
		}
		if !giveEmail && !giveUsername {
			fmt.Println("❌ Invalid credentials")
			fmt.Println("usercreds, pass", username, password)
			// auth.Snippets(w, http.StatusUnauthorized)
			return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "Bad request", Msg: "Invalid credentials", StatusCode: 400}
		}
		values := "WHERE username =" + "'" + creds.Username + "'"
		samePassword, errpassword, _ := auth.HelpersBA("users", tab, "password", values, "")
		// fmt.Println("same", samePassword)
		if errpassword != nil {
			if errpassword == sql.ErrNoRows {
				fmt.Println("pas de rows dans login page")
				return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "Bad request", Msg: "Invalid credentials", StatusCode: 400}
			}
			fmt.Println("autre erreur interne login page")
			return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "Internal servor Error", Msg: "Oops ! server didn't react as expected", StatusCode: 500}
		}
		store := Struct.Credentials{Username: creds.Username, Password: samePassword}
		if !auth.CheckPasswordHash(password, store.Password) {
			fmt.Println("probleme hashage")
			return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "Bad request", Msg: "Invalid credentials", StatusCode: 400}
		}
		iduser, _, _ := auth.HelpersBA("users", tab, "id_user", "WHERE username='"+creds.Username+"'", "")
		UserSession, errMsg, err := auth.CreateSession(w, iduser, tab)
		if err != nil {
			log.Println("❌ error while creating session")
			return Struct.UserInfo{}, cookie, false, errMsg
		}
		cookie = UserSession
		fmt.Println("in attributes")
		attributes := fmt.Sprintf("%s, %s, %s, %s, %s, %s, %s,%s, %s", db.Id_user, db.Surname, db.Name, db.Username, db.Age, db.Gender, db.Email, db.Pp, db.Pc)
		condition := fmt.Sprintf("WHERE id_user = '%s'", iduser)
		log.Println("💥 ", condition)
		fmt.Println("in rows")
		rows, err := tab.GetData(attributes, db.User, condition)
		if err != nil {
			fmt.Println("❌ error while getting user data in login")
			return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "Internal Servor Error", Msg: "Oops! server didn't react as expected", StatusCode: 500}
		}
		fmt.Println("before creds")
		for rows.Next() {
			errscan := rows.Scan(&userCreds.Id, &userCreds.FirstName, &userCreds.LastName, &userCreds.NickName, &userCreds.Age, &userCreds.Gender, &userCreds.Email, &userCreds.Profil, &userCreds.Cover)
			if errscan != nil {
				fmt.Println("❌ error while scanning user data in login")
				return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "Internal Servor Error", Msg: "Oops! server didn't react as expected", StatusCode: 500}
			}
		}
		//http.Redirect(w, r, "/home", http.StatusSeeOther)
		fmt.Println("log succcessfully")
	} else {
		fmt.Println("credentials vides")
		return Struct.UserInfo{}, cookie, false, Struct.Errormessage{Type: "Bad request", Msg: "Empty credentials", StatusCode: 400}
	}
	//type de methode
	fmt.Printf("user info to send => %s\n", userCreds)
	return userCreds, cookie, true, Struct.Errormessage{}
}
