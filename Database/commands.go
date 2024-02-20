package db

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"time"
)

/*
	Insertext injects datas of type TEXT(string) in the data base

- table represents the entity

- Attributes represents the tables attributes.
It must be written in this format : (username, email, etc...)

- Values represents the properties (data to store in the table's attribute)
It must be written in this format : ('Mike', 'miko@test.com', etc...)
*/
func (database *Db) INSERT(table string, Attributes string, Values string) error {
	query := fmt.Sprintf("INSERT INTO %s %s VALUES %s;", table, Attributes, Values)
	_, err := database.Doc.Exec(query)
	if err != nil {
		return err
	}
	return err
}

func (database *Db) LoadMessage(sender string, receiver string, IdMess string, from time.Time, request string) (*sql.Rows, error) {
	query := ""
	if from == (time.Time{}) {
		from = time.Now()
	}
	// 	if from == (time.Time{}) {
	// 		query = fmt.Sprintf(`SELECT sender, receiver, message, timestamp, isread
	// FROM Messages
	// WHERE ((sender = '%s' AND receiver = '%s') OR (sender = '%s' AND receiver = '%s'))
	// AND timestamp < (SELECT timestamp FROM Messages WHERE
	// LIMIT 10;`, sender, receiver, sender, receiver, sender, receiver, sender, receiver)
	// 	} else {
	_, err := database.Doc.Exec("UPDATE Messages SET isread = TRUE WHERE sender = ? AND receiver = ? AND isread = FALSE", receiver[1:], "@"+sender)
	if err != nil {
		fmt.Println("❌ cannot update messages in database")
		return &sql.Rows{}, err
	}
	fmt.Printf("debug => sender: '%s', receiver: '%s' || receiver: '%s', sender: '%s'\n", sender, receiver, receiver[1:], "@"+sender)
	fmt.Printf("debug => sender: Idmess: '%s'", IdMess)
	switch request {
	case "load":
		query = fmt.Sprintf(`SELECT id, sender, receiver, message, timestamp, date, isread
		FROM Messages
		WHERE ((sender ='%s' AND receiver ='%s') OR (sender ='%s' AND receiver ='%s'))
		AND timestamp <'%s'
		ORDER BY timestamp DESC
		LIMIT 10
		;`, sender, receiver, receiver[1:], "@"+sender, from)
	case "moreMsg":
		fmt.Println("user wants to load more messages...")
		query = fmt.Sprintf(`SELECT id, sender, receiver, message, timestamp, date, isread
	FROM Messages
	WHERE ((sender = '%s' AND receiver = '%s') OR (sender = '%s' AND receiver = '%s'))
	AND timestamp < (SELECT timestamp FROM Messages WHERE id ='%s')
	ORDER BY timestamp DESC
	LIMIT 10
	;`, sender, receiver, receiver[1:], "@"+sender, IdMess)
	}

	rows, err := database.Doc.Query(query)
	if err != nil {
		fmt.Println("⚠ LoadMessage ERROR ⚠: could not read database file, ", err)
		return rows, err

	}
	log.Println("✔ LoadMessage from db OK")
	return rows, err
}

func (database *Db) GetData(Attributes string, From string, condition string) (*sql.Rows, error) {
	query := fmt.Sprintf("SELECT %v FROM %v %v;", Attributes, From, condition)
	switch {
	case Attributes == "":
		fmt.Printf("⚠ ERROR: cannot get data from database, missing attribute\n")
	case From == "":
		fmt.Printf("⚠ ERROR: cannot get data from database, missing entity (table)\n")
	}

	rows, err := database.Doc.Query(query)
	if err != nil {
		fmt.Println("⚠ GetData ERROR ⚠: could not read database file, ", err)
		return rows, err

	}
	return rows, err
}

/*
Update updates an existing value of attributes for entities

  - table represents the entity

  - toset represents the attributes we have to modify.

It must be written in this format : name = aniasse , username = aniasse@gmail.com, etc...
  - condition  represents the other instruction that specifies which datas to fecth

Ex: WHERE age > 12, ORDER by, etc....
*/
func (database *Db) UPDATE(table string, Toset string, condition string) error {
	query := fmt.Sprintf("UPDATE %s SET %s %s;", table, Toset, condition)
	_, err := database.Doc.Exec(query)
	if err != nil {
		fmt.Printf("⚠ ERROR: %s update failed", err)
		return err
	} else {
		fmt.Printf("%s has been updated  successfully\n", table)

	}
	return err

}

func (database *Db) DELETE(table string, condition string) error {
	query := fmt.Sprintf("DELETE FROM %v %s;", table, condition)
	if table == "" {
		fmt.Println("⚠ ERROR: cannot delete data from database, missing entity (table)")
		return errors.New("missing table")
	}

	_, err := database.Doc.Exec(query)
	if err != nil {
		fmt.Println("⚠ ERROR: could not delete from database : ", err)
		return err
	} else {
		fmt.Printf("%s 's element has been updated  successfully\n", table)
	}

	return err
}

/*
Getelement is used for getting elements from the database.
It takes the sql value and converts it into string.

"element" represents the variable where the conversion result will be stored
if an error occurs it returns an error
*/
func Getelement(rows *sql.Rows) (string, error) {
	var element string
	for rows.Next() {

		err := rows.Scan(&element)
		if err != nil {
			fmt.Printf("⚠ ERROR: could not get %v ⚠ : %v\n ", element, err)
			return "", err
		} else {
			fmt.Printf("✅ %v retrieved successfully\n", element)
		}
	}

	return element, nil
}

func (database *Db) Exist(Attribute string, From string, condition string) (bool, error) {
	check, errdata := database.GetData(Attribute, From, condition)
	if errdata != nil {
		fmt.Println("⚠ ERROR ⚠ : Couldn't get data from database in 'Exist' function ❌")
		return false, errdata
	}

	checkvalue, errCheckVal := Getelement(check)
	if errCheckVal != nil {
		fmt.Println("⚠ ERROR ⚠ : Couldn't get value in 'Exist' function ❌")
		return false, errCheckVal
	}
	// if there is no such post => return empty string in checkvalue variable
	if checkvalue == "" {
		return false, nil
	} else {
		return true, nil
	}
}
