package main

import (
	"cmp"
	"fmt"
	"net/http"
	"os"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Hello, World!")
}

func main() {
	http.HandleFunc("/", helloHandler)
	fmt.Println("Server is listening on port 3000...")
	err := http.ListenAndServe(":"+cmp.Or(os.Getenv("PORT"), "3000"), nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}
