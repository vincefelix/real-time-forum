package auth

import (
	"database/sql"
	"fmt"
	db "forum/Database"
)

type User struct {
	Id            string
	Username      string
	Name          string
	Email         string
	Age           string
	Gender        string
	Password      string
	Pp            string
	Pc            string
	UnreadMessage int
}

func GetDatafromBA(tab *sql.DB, data, attribute, table string) bool {
	var response bool
	selectSQL := "SELECT " + attribute + " FROM " + table + "  ;"

	rows, err := tab.Query(selectSQL)
	if err != nil {
		fmt.Println(err)
		return false
	}

	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&attribute)
		if err != nil {
			fmt.Println(err)
			return false
		}
		if attribute == data {
			response = true
		}
	}
	return response
}

func GetElementOfOneUser(db *sql.DB, username string) (user User, response bool) {
	rows, err := db.Query("SELECT id_user,name,email,pp,pc FROM users WHERE username='" + username + "';")

	var id_user, name, email, pp, pc string
	if err != nil {
		fmt.Println(err, "1")
		return user, false
	}

	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&id_user, &name, &email, &pp, &pc)
		if err != nil {
			fmt.Println(err, "2")
			return user, false
		}
	}
	user = User{Id: id_user, Username: username, Name: name, Email: email, Pp: pp, Pc: pc}
	return user, true
}

// func GetAllUSers(db *sql.DB) ([]User, bool) {
// 	rows, err := db.Query("SELECT id_user, username, pp FROM users;")
// 	if err != nil {
// 		fmt.Println(err, " 1")
// 		return nil, false
// 	}
// 	defer rows.Close()
// 	var Users []User
// 	for rows.Next() {
// 		var temp User
// 		err = rows.Scan(&temp.Id, &temp.Username, &temp.Pp)
// 		if err != nil {
// 			fmt.Println(err, "2")
// 			return nil, false
// 		}
// 		Users = append(Users, temp)
// 	}
// 	return Users, true

// }
func GetCOnnInf(database db.Db, session string) []string {
	rows, err := database.Doc.Query("SELECT user_id FROM sessions WHERE id_session = '" + session + "';")
	if err != nil {
		fmt.Println(err, " 1")
		return nil
	}
	defer rows.Close()
	Id, err := db.Getelement(rows)
	if err != nil {
		fmt.Println(err, " 2")
		return nil
	}
	rows2, err := database.Doc.Query("SELECT username, pp FROM users WHERE id_user = '" + Id + "';")
	if err != nil {
		fmt.Println(err, " 3")
		return nil
	}
	var username, pp string
	for rows2.Next() {
		err = rows2.Scan(&username, &pp)
		if err != nil {
			fmt.Println(err, " 4")
			return nil
		}
	}
	return []string{Id, username, pp}
}
func HelpersBA(from string, tab db.Db, attribute, condition, compare string) (string, error, bool) {
	result := ""
	response := false
	rows, errorrows := tab.GetData(attribute, from, condition)
	if errorrows != nil {
		// _, _, confirmemail := auth.HelpersBA(tab, "username", "", username)
		return result, errorrows, response
	}

	for rows.Next() {

		// var password string
		err := rows.Scan(&attribute)
		if err != nil {
			// fmt.Println(err)
			return result, err, response
		}
		if attribute == compare {
			response = true
		}
		result = attribute
	}
	return result, nil, response
}

func GetAllUSers(database db.Db, SessionUsername string) ([]User, error) {
	fmt.Println("-----------------------------")
	fmt.Println("🔔 received SessionUsername: ", SessionUsername)
	fmt.Println("-----------------------------")

	query := fmt.Sprintf(
		`
	SELECT DISTINCT id_user,username,pp,
    (
    SELECT count(*) FROM Messages
    where Messages.receiver ='@%v'
    and Messages.sender = u.username
    and Messages.isread = false
    ) as unreadCounter
FROM "users"  u, "Messages"
LEFT JOIN (
    SELECT receiver AS r , sender as s , MAX(timestamp) AS last_message_date
    FROM Messages
    GROUP BY receiver
) AS last_messages
ON concat("@", u.username) = last_messages.r
or last_messages.s = u.username
WHERE (
  ( Messages.receiver = concat("@", '%v') and Messages.sender = u.username )
  OR
  (Messages.receiver = concat("@", u.username) and Messages.sender = '%v')
  )
ORDER by last_messages.last_message_date DESC
	`, SessionUsername, SessionUsername, SessionUsername)
	rows, err := database.Doc.Query(query)
	if err != nil {
		fmt.Println("⚠ GetUserState ERROR ⚠: could not read database file, ", err)
		return nil, err
	}
	defer rows.Close()

	var userList_WithMsg []User
	for rows.Next() {
		var temp User
		err = rows.Scan(&temp.Id, &temp.Username, &temp.Pp, &temp.UnreadMessage)
		if err != nil {
			fmt.Println("❌error while scannning rows in getUser_state  ", err)
			return nil, err
		}
		userList_WithMsg = append(userList_WithMsg, temp)
	}
	fmt.Println("userList_Msg: ")
	for i := range userList_WithMsg {
		fmt.Println("➡ with Msg => ", userList_WithMsg[i])
	}
	query2 := fmt.Sprintf(` 
	SELECT DISTINCT id_user, username, pp
FROM "users" u
WHERE username != '%v'
AND NOT EXISTS (
    SELECT 1
    FROM "Messages" m
    WHERE (m.receiver = CONCAT("@", u.username) AND m.sender = '%v')
    OR (m.sender = u.username AND m.receiver = '@%v')
)
ORDER BY username ASC;
	`, SessionUsername, SessionUsername, SessionUsername)

	rows2, err2 := database.Doc.Query(query2)
	if err2 != nil {
		fmt.Println("❌ error while reading database in second query  of GetUserState: ", err2)
		return nil, err2
	}
	defer rows2.Close()

	var plainUsers []User
	for rows2.Next() {
		var temp User
		err = rows2.Scan(&temp.Id, &temp.Username, &temp.Pp)
		if err != nil {
			fmt.Println("❌error while scannning rows in getUser_state 2nd query  ", err)
			return nil, err
		}
		temp.UnreadMessage = 0
		plainUsers = append(plainUsers, temp)
	}
	fmt.Println("plainUsers: ")
	for i := range plainUsers {
		fmt.Println("➡ plain => ", plainUsers[i])
	}
	result := append(userList_WithMsg, plainUsers...)
	fmt.Println("user states from DB =>  ")
	for i, v := range result {
		fmt.Printf("userState [%v] >=> %v\n", i, v)
	}
	return result, nil
}
