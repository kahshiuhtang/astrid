package main

import (
	"log"

	"github.com/kahshiuhtang/astrid/internal/modules/data"
)

func main() {
	res := data.ConnectToPostgres()
	if res {
		log.Fatal("Unable to setup")
	}
}
