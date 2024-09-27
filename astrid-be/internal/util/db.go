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

type PGColumn struct {
	name    string
	varType string
}

func verifyTable(conn *pgx.Conn, tableName string, columns []PGColumn) error {
	ensureTableSQL := fmt.Sprintf(`
	CREATE TABLE IF NOT EXISTS %s (
		id SERIAL PRIMARY KEY,
		file_name VARCHAR(255) NOT NULL,
		file_size BIGINT,
		mime_type VARCHAR(255),
		storage_path VARCHAR(512),
		checksum VARCHAR(64),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		owner_id UUID,
		metadata JSONB
	);
	`, tableName)
	_, err := conn.Exec(context.Background(), ensureTableSQL)
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
	columns := []PGColumn{
		{"file_name", "VARCHAR(255)"},
		{"file_size", "BIGINT"},
		{"mime_type", "VARCHAR(255)"},
		{"storage_path", "VARCHAR(512)"},
		{"checksum", "VARCHAR(64)"},
		{"created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
		{"owner_id", "VARCHAR(64)"}, // or VARCHAR if you prefer string
		{"metadata", "JSONB"},       // store additional metadata in JSON format
	}
	conn := ConnectPostgres()
	verifyTable(conn, "file_metadata", columns)
}
func ConnectPostgres() *pgx.Conn {
	if !openedENV {
		RetrieveENVFile()
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
