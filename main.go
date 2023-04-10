package main

import (
	"embed"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net/http"
	"regexp"
	"strings"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/cors"
)

var (
	flagHost string
)

//go:embed all:build
var websiteStatic embed.FS

func init() {
	flag.StringVar(&flagHost, "host", ":8080", "Set the host what the service listening on")
	flag.Parse()
}

func main() {
	router := chi.NewRouter()

	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	router.Use(cors.Handler)
	router.Use(middleware.Compress(5))

	clientDirectory, err := fs.Sub(websiteStatic, "build")
	if err != nil {
		log.Print("fs.Sub: ", err.Error())
	}

	siteHandler := fileServerExtension(http.FileServer(http.FS(clientDirectory)))
	router.Get("/*", serveDir(http.StripPrefix("/", siteHandler)))
	router.Head("/*", serveDir(http.StripPrefix("/", siteHandler)))

	fmt.Println("Server listening on port ", flagHost)
	if err := http.ListenAndServe(flagHost, router); err != nil {
		panic(err)
	}
}

func serveDir(handler http.Handler) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		handler.ServeHTTP(w, r)
	})
}

func fileServerExtension(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Add Cache-Control to the response
		rc, _ := regexp.Compile("(.svg|.png|.jpg|.jpeg|.js|.css|.woff|.woff2|.ico|.txt)")
		if !rc.MatchString(r.URL.Path) && !strings.HasSuffix(r.URL.Path, "/") {
			r.URL.Path = r.URL.Path + "/"
		}

		h.ServeHTTP(w, r)
	}
}
