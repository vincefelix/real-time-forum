package main

import (
	"fmt"
	db "forum/Database"
	Hdle "forum/Routes"
	Skt "forum/socket-side"
	"net/http"
)

func main() {
	tab, err := db.Init_db()
	if err != nil {
		fmt.Println(err)
		return
	}

	myhttp := http.NewServeMux()
	fs := http.FileServer(http.Dir("./templates/"))
	myhttp.Handle("/static/", http.StripPrefix("/static/", fs))
	myhttp.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case "/socket":
			Skt.SocketReaderCreate(w, r, tab)
		default:
			Hdle.HomeHandler(w, r)
		}
	}))

	// Launchinh server
	fmt.Println("📡----------------------------------------------------📡")
	fmt.Println("|                                                      |")
	fmt.Println("| 🌐 Server has started at \033[32mhttp://localhost:8080\033[0m 🟢    |")
	fmt.Println("|                                                      |")
	fmt.Println("📡----------------------------------------------------📡")
	errServ := http.ListenAndServe(":8080", nil)
	if errServ != nil {
		fmt.Printf("Erreur de serveur HTTP : %s\n", errServ)
	}
}
