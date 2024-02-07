package Route

import (
	"fmt"
	auth "forum/Authentication"
	db "forum/Database"
	Struct "forum/data-structs"
	"strconv"
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
			return false, Struct.Errormessage{Type: "bad request", Msg: "Character \"'\" not allowed", StatusCode: 400, Location: "form", Display: false}
		}

		if gender == "" {
			fmt.Println("❌ gender is null")
			return false, Struct.Errormessage{Type: "bad request", Msg: "choose a gender", StatusCode: 400, Location: "form", Display: false}
		}

		if nbr, err := strconv.Atoi(age); nbr < 12 || nbr > 99 || err != nil {
			fmt.Println("❌ Age is invalid")
			return false, Struct.Errormessage{Type: "bad request", Msg: "age must be between 12 and 99", StatusCode: 400, Location: "form", Display: false}

		}
		//check that the email and username have not already been used
		validemail, right := auth.ValidMailAddress(email)
		if !right {
			fmt.Println("mauvais format d'email: ", validemail)
			return false, Struct.Errormessage{Type: "bad request", Msg: "mail format is not valid", StatusCode: 400, Location: "form", Display: false}
		}

		email = validemail
		_, _, confirmemail := auth.HelpersBA("users", tab, "email", " WHERE email='"+email+"'", email)
		_, _, confirmusername := auth.HelpersBA("users", tab, "username", " WHERE username='"+username+"'", username)

		if confirmemail || confirmusername {
			return false, Struct.Errormessage{Type: "bad request", Msg: "email/username already used", StatusCode: 400, Location: "form", Display: false}
		}

		if password != confirmpwd {
			fmt.Println("password not matching ❌")
			return false, Struct.Errormessage{Type: "bad request", Msg: "Incorrect password confirmation", StatusCode: 400, Location: "form", Display: false}
		}

		// password hash
		hashpassword, errorhash := auth.HashPassword(password)
		if errorhash != nil {
			fmt.Println("❌ error while hashing password")
			return false, Struct.Errormessage{Type: "Internal servor error", Msg: "oops servor didn't reacted as expected", StatusCode: 500, Location: "form", Display: true}
		}

		// store current user information
		newid, err := uuid.NewV4()
		if err != nil {
			fmt.Println("erreur avec le uuid niveau create account")
			fmt.Println("❌ error while generating uuid")
			return false, Struct.Errormessage{Type: "Internal servor error", Msg: "oops servor didn't reacted as expected", StatusCode: 500, Location: "form", Display: true}
		}
		pp := "/static/./assets/boy.gif"
		if gender == "female" {
			pp = "/static/./assets/boy.gif"
		}
		creds := &Struct.Credentials{Name: name, Username: username, Age: age, Gender: gender, Email: email, Password: hashpassword, Id: newid.String(), Surname: surname}
		//save user in database
		// fmt.Println("creds", creds)
		values := "('" + creds.Id + "','" + creds.Email + "','" + creds.Name + "','" + creds.Username + "','" + creds.Age + "','" + creds.Gender + "','" + creds.Surname + "','" + creds.Password + "','" + pp + "','/static/./assets//mur.gif')"
		attributes := "(id_user,email,name,username,age,gender,surname, password,pp,pc)"
		fmt.Println("values register ", values)
		errorIns := tab.INSERT(db.User, attributes, values)
		if errorIns != nil { //!
			fmt.Printf("❌ error while inserting into r database %s\n", errorIns)
			return false, Struct.Errormessage{Type: "Internal servor error", Msg: "oops servor didn't reacted as expected", StatusCode: 500, Location: "form", Display: true}
		}

		attributes2 := fmt.Sprintf("(%s, %s, %s)", db.User_id, "id_session", "expireat")
		values2 := fmt.Sprintf("('%s','%s', '%s')", creds.Id, "none", "none")
		//errorUp := tab.INSERT("sessions", "id_session='"+sessionToken+"',expireat='"+expiresAt.String()+"'", "WHERE user_id="+"'"+iduser+"'")
		errorInSess := tab.INSERT("sessions", attributes2, values2)
		if errorInSess != nil {
			fmt.Println("in session")
			return false, Struct.Errormessage{Type: "Internal servor error", Msg: "oops servor didn't reacted as expected", StatusCode: 500, Location: "form", Display: true}
		}

	} else {

		if !auth.FieldsLimited(name, 2, 15) || !auth.FieldsLimited(surname, 2, 15) || !auth.FieldsLimited(username, 2, 15) {
			fmt.Println("❌ name, surname, username limitation not respected")
			return false, Struct.Errormessage{Type: "Bad request", Msg: "the name, surname and username must be between 2 to 15 characters", StatusCode: 400, Location: "form", Display: false}
		} else if !auth.FieldsLimited(email, 10, 133) {
			fmt.Println("❌ email limitation not respected")
			return false, Struct.Errormessage{Type: "Bad request", Msg: "the Email must be between 10 to 132 characters", StatusCode: 400, Location: "form", Display: false}
		} else {
			fmt.Println("❌ password limitation not respected")
			return false, Struct.Errormessage{Type: "Bad request", Msg: "the password and confirmpassword must be between 8 to 15 characters", StatusCode: 400}
		}
		// return

	}
	return true, Struct.Errormessage{}
}
