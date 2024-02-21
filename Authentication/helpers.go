package auth

import (
	"fmt"
	"log"
	"regexp"
	"text/template"

	// auth "forum/Authentication"
	db "forum/Database"
	Structs "forum/data-structs"
	"forum/tools"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/gofrs/uuid"
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// CreateSession allows you to create a session for the current user
func CreateSession(iduser string, tab db.Db) (Structs.Cookie, Structs.Errormessage, error) {
	token, err := uuid.NewV4()
	if err != nil {
		fmt.Println("❌ error in uuid while creating session")
		return Structs.Cookie{},
			Structs.Errormessage{Type: tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
			},
			err
	}
	sessionToken := token.String()
	expiresAt := time.Now().Add(1800 * time.Second)
	fmt.Println("expire a", expiresAt.String())
	//update session dans la base de données
	errorUp := tab.UPDATE("sessions", "id_session='"+sessionToken+"',expireat='"+expiresAt.String()+"'", "WHERE user_id="+"'"+iduser+"'")
	if errorUp != nil {
		return Structs.Cookie{},
			Structs.Errormessage{Type: tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
			},
			err
	}
	log.Println("✔ cookie sent")
	return Structs.Cookie{Name: "session",
			Value:  sessionToken,
			Expire: expiresAt,
		},
		Structs.Errormessage{},
		err
}

// validation email user
func ValidMailAddress(address string) (string, bool) {

	regex := "^[A-Za-z0-9._%+-]{2,}@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"

	// Test de la chaîne "peach" avec la regex
	match, err := regexp.MatchString(regex, address)
	// Vérification des erreurs
	if err != nil {
		fmt.Println("Erreur lors de la correspondance de la regex:", err)
	}

	// Affichage du résultat
	fmt.Println(match, "de l'email", address)
	return address, match
}

func CheckCookie(value string, tab db.Db) (bool, string, Structs.Errormessage) {
	value = strings.TrimSpace(value)
	if value == "" {
		return false, "",
			Structs.Errormessage{Type: "socket-open-invalid-session",
				Msg:        "Invalid cookie",
				StatusCode: 400,
			}
	}
	value = strings.Split(value, "=")[1]
	idviasession, err, _ := HelpersBA("sessions", tab, "user_id", "WHERE id_session='"+value+"'", "")
	if err != nil {
		log.Println("❌ error while checking cookie in database", err)
		return false, "",
			Structs.Errormessage{Type: tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
			}
	}
	if idviasession == "" {
		log.Println("❌ cookie is not valid", idviasession)
		return false, "",
			Structs.Errormessage{Type: "socket-open-invalid-session",
				Msg:        "Invalid cookie",
				StatusCode: 400,
			}
	}
	log.Println("✔ cookie is valid", idviasession)
	return true, value,
		Structs.Errormessage{Type: "socket-open-with-session",
			Msg:        "valid cookie",
			StatusCode: 200,
		}
}

// Snippets is a function which allows you to return an error page,
//
//	it receives an http.ResponseWriter as an argument from the handler function
//	and the the status of the error to be specified.
func Snippets(w http.ResponseWriter, statusCode int) {
	w.WriteHeader(statusCode)
	error_file := template.Must(template.ParseFiles("templates/error.html"))
	error_file.Execute(w, strconv.Itoa(statusCode))
	fmt.Println("⚠ ERROR ⚠: ", statusCode, "❌ ")
}

func FieldsLimited(field string, min, max int) bool {
	return len(field) >= min && len(field) < max
}

func NotAllow(s string) bool {
	return strings.Contains(s, "'") || strings.Contains(s, "\"")
}
func GenerateUsername(name string, tab db.Db) string {
	username := name + strconv.Itoa(rand.Intn(101))
	_, _, confirmusername := HelpersBA("users", tab, "username", " WHERE username='"+username+"'", username)
	if confirmusername {
		return GenerateUsername(name, tab)
	}
	return username
}
func Familyname(name string) (string, string) {
	name = strings.Trim(name, " ")
	arrayname := strings.Split(name, " ")
	limit := len(arrayname)
	if limit == 1 {
		return name, name
	}
	lastfamilyname := arrayname[limit-1]
	familynames := arrayname[0 : limit-1]
	firstfamilyname := strings.Join(familynames, " ")
	return firstfamilyname, lastfamilyname
}
