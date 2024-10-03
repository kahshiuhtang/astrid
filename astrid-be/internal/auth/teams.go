package auth

import (
	"context"
	"time"

	"github.com/kahshiuhtang/astrid-fs/internal/util"
)

func CreateTeamDB(name string) (int, error) {
	conn := util.ConnectPostgres()
	query := `
	INSERT INTO teams (name, created_at, updated_at)
	VALUES ($1, $2, $3)
	RETURNING id;
`
	var id int
	createdAt := time.Now()
	updatedAt := createdAt

	err := conn.QueryRow(context.Background(), query, name, createdAt, updatedAt).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}
func CreateTeamUser(teamId, userId int, role string) (int, error) {
	conn := util.ConnectPostgres()
	query := `
        INSERT INTO team_members (team_id, user_id, role, joined_at)
        VALUES ($1, $2, $3, $4)
        RETURNING id;
    `
	var id int
	joinedAt := time.Now()

	err := conn.QueryRow(context.Background(), query, teamId, userId, role, joinedAt).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}
func PullTeamFolderDB(teamId int, folderId int) ([]util.FileMetadata, error) {
	conn := util.ConnectPostgres()
	query := `
	SELECT fm.id, fm.file_name, fm.file_size, fm.mime_type, fm.storage_path, fm.checksum, fm.created_at, fm.owner_id, fm.metadata
	FROM file_metadata fm
	JOIN file_folder_association ffa ON fm.id = ffa.file_id
	JOIN folders f ON ffa.folder_id = f.id
	WHERE f.team_id = $1 AND f.id = $2;
`
	rows, err := conn.Query(context.Background(), query, teamId, folderId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var files []util.FileMetadata
	for rows.Next() {
		var file util.FileMetadata

		err := rows.Scan(
			&file.ID,
			&file.FileName,
			&file.FileSize,
			&file.MimeType,
			&file.StoragePath,
			&file.Checksum,
			&file.CreatedAt,
			&file.OwnerID,
			&file.Metadata, // Metadata is stored as a string
		)
		if err != nil {
			return nil, err
		}
		files = append(files, file)
	}

	if rows.Err() != nil {
		return nil, rows.Err()
	}

	return files, nil
}
func CreateFolderInTeamDB(folderName string, parentFolderID *int, teamId int, ownerId string, metadata string) (int, error) {
	conn := util.ConnectPostgres()
	query := `
        INSERT INTO folders (folder_name, parent_folder_id, team_id, owner_id, metadata, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
    `
	var folderID int
	createdAt := time.Now()

	err := conn.QueryRow(context.Background(), query, folderName, parentFolderID, teamId, ownerId, metadata, createdAt).Scan(&folderID)
	if err != nil {
		return 0, err
	}

	return folderID, nil
}
