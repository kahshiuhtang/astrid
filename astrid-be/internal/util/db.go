package util

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/jackc/pgx/v5"
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

func RetrieveEnvFile() {
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

type PGColumn struct {
	name    string
	varType string
}

func verifyTable(conn *pgx.Conn, tableName string, createString string, columns []PGColumn) error {
	_, err := conn.Exec(context.Background(), createString)
	if err != nil {
		return fmt.Errorf("error ensuring table: %w", err)
	}
	for _, col := range columns {
		err = verifyTableColumns(conn, tableName, col)
		if err != nil {
			return err
		}
	}
	return nil
}
func verifyTableColumns(conn *pgx.Conn, tableName string, column PGColumn) error {
	ensureColumnSQL := `
	DO
	$$
	BEGIN
	   IF NOT EXISTS (
	      SELECT 1 FROM information_schema.columns 
	      WHERE table_name = $1 AND column_name = $2
	   ) THEN
	      ALTER TABLE $1 ADD COLUMN $2 $3;
	   END IF;
	END
	$$;
	`
	_, err := conn.Exec(context.Background(), ensureColumnSQL, tableName, column.name, column.varType)
	if err != nil {
		return fmt.Errorf("error ensuring column: %w", err)
	}
	return nil
}
func VerifyTablesStructure() {
	conn := ConnectPostgres()
	for tableName, createStmt := range createTableStatements {
		verifyTable(conn, tableName, createStmt, tableStructsMap[tableName])
	}
}
func ConnectPostgres() *pgx.Conn {
	if !openedENV {
		RetrieveEnvFile()
	}
	connStr := fmt.Sprintf("postgres://%s:%s@%s:%d/%s", user, password, host, port, dbname)
	conn, err := pgx.Connect(context.Background(), connStr)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v", err)
	}

	return conn
}

func ConnectMongoDB() *mongo.Client {
	if !openedENV {
		RetrieveEnvFile()
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
