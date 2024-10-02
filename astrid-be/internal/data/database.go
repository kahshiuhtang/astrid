package data

import (
	"context"
	"fmt"

	"github.com/kahshiuhtang/astrid-fs/internal/util"
)

func StoreFileMetadataDB(fileMetadata util.FileMetadata) error {
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
