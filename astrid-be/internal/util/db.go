package util

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	dbUserENV     = "DB_USER"
	dbPasswordENV = "DB_PASSWORD"
	dbNameENV     = "DB_NAME"
	dbHostENV     = "DB_HOST"
	dbPortENV     = "DB_PORT"
	mongoURIENV   = "DB_MONGO_URI"
)

var openedENV = false
var (
	host     = ""
	port     = 0
	user     = ""
	password = ""
	dbname   = ""
	mongoURI = ""
)

func RetrieveENVFile() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	user = os.Getenv(dbUserENV)
	password = os.Getenv(dbPasswordENV)
	dbname = os.Getenv(dbNameENV)
	host = os.Getenv(dbHostENV)
	port = ConvertStringToInt(os.Getenv(dbPortENV))
	mongoURI = os.Getenv(mongoURIENV)
	openedENV = true
}
func ConvertStringToInt(str string) int {
	num, err := strconv.Atoi(str)
	if err != nil {
		fmt.Println("Error converting string to int:", err)
		num = 0
	}
	return num
}
func ConnectPostgres() *sql.DB {
	if !openedENV {
		RetrieveENVFile()
	}
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal("Could not connect to Postgres:", err)
	}
	return db
}

func ConnectMongoDB() *mongo.Client {
	if !openedENV {
		RetrieveENVFile()
	}
	clientOptions := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal("Could not connect to MongoDB:", err)
	}
	return client
}
