package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	api "github.com/kahshiuhtang/astrid-fs/internal/api"
	"github.com/kahshiuhtang/astrid-fs/internal/util"
)

// Middleware to log each request
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Received request: %s %s", r.Method, r.RequestURI)
		next.ServeHTTP(w, r)
	})
}

// Set up routes and middleware
func main() {
	router := mux.NewRouter()

	// Add logging middleware
	router.Use(loggingMiddleware)
	api.SetupDataDigestRoutes(router)

	util.ConnectPostgres()
	util.VerifyTablesStructure()
	// Start the server
	port := ":6789"
	fmt.Printf("Server is running on port %s\n", port)
	log.Fatal(http.ListenAndServe(port, router))
}
