package main

import (
	"fmt"
	db "forum/Database"
	Hdle "forum/Routes"
	Skt "forum/socket-side"
	"log"
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

	log.Println("http://localhost:8080")
	http.ListenAndServe(":8080", myhttp)
}
