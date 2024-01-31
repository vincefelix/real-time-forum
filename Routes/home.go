package Route

import (
	"html/template"
	"net/http"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	file, err := template.ParseFiles("templates/test.html")
	file.Execute(w, nil)
	if err != nil {
		http.Error(w, "index file missing", 500)
		return
	}

}
