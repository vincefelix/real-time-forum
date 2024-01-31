package Route

import (
	"fmt"
	auth "forum/Authentication"
	db "forum/Database"
	Struct "forum/data-structs"
	"strings"

	"github.com/gofrs/uuid"
)

// CreateAccountPage manages the account creation and once successful redirects
//
//	the user to their home page, otherwise it displays an error page
func RegisterUser(data Struct.Register, tab db.Db) (bool, Struct.Errormessage) {

	// retrieving query data
	surname := strings.TrimSpace(data.FirstName)
	name := strings.TrimSpace(data.LastName)
	age := strings.TrimSpace(data.Age)
	gender := strings.TrimSpace(data.Gender)
	username := strings.TrimSpace(data.NickName)
	email := strings.TrimSpace(data.EmailRegister)
	password := strings.TrimSpace(data.PasswordRegister)
	confirmpwd := strings.TrimSpace(data.ConfPasswordRegister)
	//check that the fields are not empty
	if auth.FieldsLimited(name, 2, 15) && auth.FieldsLimited(surname, 2, 15) && auth.FieldsLimited(username, 2, 15) && auth.FieldsLimited(email, 10, 133) && auth.FieldsLimited(password, 8, 15) && auth.FieldsLimited(confirmpwd, 8, 15) {

		if auth.NotAllow(name) || auth.NotAllow(username) || auth.NotAllow(surname) || auth.NotAllow(email) || auth.NotAllow(password) {
			fmt.Println("single code in credentials")
			return false, Struct.Errormessage{Type: "bad request", Msg: "Character \"'\" not allowed", StatusCode: 404}
		}
		//check that the email and username have not already been used
		validemail, right := auth.ValidMailAddress(email)
		if !right {
			fmt.Println("mauvais format d'email: ", validemail)
			return false, Struct.Errormessage{Type: "bad request", Msg: "mail format is not valid", StatusCode: 404}
		}

		email = validemail
		_, _, confirmemail := auth.HelpersBA("users", tab, "email", " WHERE email='"+email+"'", email)
		_, _, confirmusername := auth.HelpersBA("users", tab, "username", " WHERE username='"+username+"'", username)

		if confirmemail || confirmusername {
			return false, Struct.Errormessage{Type: "bad request", Msg: "email/username already used", StatusCode: 404}
		}

		if password != confirmpwd {
			fmt.Println("password not matching ❌")
			return false, Struct.Errormessage{Type: "bad request", Msg: "Incorrect password confirmation", StatusCode: 404}
		}

		// password hash
		hashpassword, errorhash := auth.HashPassword(password)
		if errorhash != nil {
			fmt.Println("❌ error while hashing password")
			return false, Struct.Errormessage{Type: "Internal servor error", Msg: "oops servor didn't reacted as expected", StatusCode: 500}
		}

		// store current user information
		newid, err := uuid.NewV4()
		if err != nil {
			fmt.Println("erreur avec le uuid niveau create account")
			fmt.Println("❌ error while generating uuid")
			return false, Struct.Errormessage{Type: "Internal servor error", Msg: "oops servor didn't reacted as expected", StatusCode: 500}
		}

		creds := &Struct.Credentials{Name: name, Username: username, Age: age, Gender: gender, Email: email, Password: hashpassword, Id: newid.String(), Surname: surname}
		//save user in database
		// fmt.Println("creds", creds)
		values := "('" + creds.Id + "','" + creds.Email + "','" + creds.Name + "','" + creds.Username + "','" + creds.Age + "','" + creds.Gender + "','" + creds.Surname + "','" + creds.Password + "','../static/front-tools/images/profil.jpeg','../static/front-tools/images/mur.png')"
		attributes := "(id_user,email,name,username,age,gender,surname, password,pp,pc)"
		errorIns := tab.INSERT(db.User, attributes, values)
		if errorIns != nil { //!
			fmt.Printf("❌ error while inserting into database %s\n", errorIns)
			return false, Struct.Errormessage{Type: "Internal servor error", Msg: "oops servor didn't reacted as expected", StatusCode: 500}
		}

	} else {

		if !auth.FieldsLimited(name, 2, 15) || !auth.FieldsLimited(surname, 2, 15) || !auth.FieldsLimited(username, 2, 15) {
			fmt.Println("❌ name, surname, username limitation not respected")
			return false, Struct.Errormessage{Type: "Bad request", Msg: "the name, surname and username must be between 2 to 15 characters", StatusCode: 400}
		} else if !auth.FieldsLimited(email, 10, 133) {
			fmt.Println("❌ email limitation not respected")
			return false, Struct.Errormessage{Type: "Bad request", Msg: "the Email must be between 10 to 132 characters", StatusCode: 400}
		} else {
			fmt.Println("❌ password limitation not respected")
			return false, Struct.Errormessage{Type: "Bad request", Msg: "the password and confirmpassword must be between 8 to 15 characters", StatusCode: 400}
		}
		// return

	}
	return true, Struct.Errormessage{}
}
