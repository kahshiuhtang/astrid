package data

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var postgresConn *sql.DB = nil

func ConnectToPostgres() bool {
	connStr := "postgres://astrid:corteza@astrid:5432/astrid?sslmode=disable"
	dbConn, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	postgresConn = dbConn
	return false
}
func GetConnection() *sql.DB {
	return postgresConn
}
