package util

import "time"

type Folder struct {
	ID             int                    `json:"id" db:"id"`
	FolderName     string                 `json:"folder_name" db:"folder_name"`
	ParentFolderID *int                   `json:"parent_folder_id" db:"parent_folder_id"` // Nullable for top-level folders
	TeamID         int                    `json:"team_id" db:"team_id"`
	CreatedAt      time.Time              `json:"created_at" db:"created_at"`
	OwnerID        string                 `json:"owner_id" db:"owner_id"` // UUID of the folder's owner
	Metadata       map[string]interface{} `json:"metadata" db:"metadata"` // JSONB metadata
}

type FileFolderAssociation struct {
	ID        int       `json:"id" db:"id"`
	FolderID  int       `json:"folder_id" db:"folder_id"`
	FileID    int       `json:"file_id" db:"file_id"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
}

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

type Team struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type TeamMember struct {
	ID       int       `json:"id"`
	TeamID   int       `json:"team_id"`
	UserID   int       `json:"user_id"`
	Role     string    `json:"role"`
	JoinedAt time.Time `json:"joined_at"`
}
