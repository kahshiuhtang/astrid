package data

import (
	"context"
	"fmt"
	"time"

	"github.com/kahshiuhtang/astrid-fs/internal/util"
)

type FileMetadata struct {
	ID          int64     `json:"id"`
	FileName    string    `json:"file_name"`
	FileSize    int64     `json:"file_size"`
	MimeType    string    `json:"mime_type"`
	StoragePath string    `json:"storage_path"`
	Checksum    string    `json:"checksum"`
	CreatedAt   time.Time `json:"created_at"`
	OwnerID     string    `json:"owner_id"`
	Metadata    string    `json:"metadata"` // Can also use map[string]interface{} for JSONB
}

func StoreFileMetadata(fileMetadata FileMetadata) error {
	conn := util.ConnectPostgres()
	query := `INSERT INTO file_metadata 
	(file_name, file_size, mime_type, storage_path, checksum, owner_id, metadata) 
	VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`

	var insertedID int64
	err := conn.QueryRow(context.Background(), query,
		fileMetadata.FileName,
		fileMetadata.FileSize,
		fileMetadata.MimeType,
		fileMetadata.StoragePath,
		fileMetadata.Checksum,
		fileMetadata.OwnerID,
		fileMetadata.Metadata,
	).Scan(&insertedID)

	if err != nil {
		return fmt.Errorf("error inserting file metadata: %w", err)
	}
	return nil
}
