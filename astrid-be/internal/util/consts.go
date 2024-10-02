package util

// TODO: Some columns have unique constraint... need to add it somehow
var tableStructsMap = map[string][]PGColumn{
	"file_metadata": {
		{"id", "SERIAL PRIMARY KEY"},
		{"file_name", "VARCHAR(255) NOT NULL"},
		{"file_size", "BIGINT"},
		{"mime_type", "VARCHAR(255)"},
		{"storage_path", "VARCHAR(512)"},
		{"checksum", "VARCHAR(64)"},
		{"created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
		{"owner_id", "UUID NOT NULL"},
		{"metadata", "JSONB"},
	},

	"file_tags": {
		{"id", "SERIAL PRIMARY KEY"},
		{"file_id", "INT REFERENCES file_metadata(id) ON DELETE CASCADE"},
		{"tag", "VARCHAR(255) NOT NULL"},
	},

	"file_access_log": {
		{"id", "SERIAL PRIMARY KEY"},
		{"file_id", "INT REFERENCES file_metadata(id) ON DELETE CASCADE"},
		{"accessed_by", "UUID"},
		{"action_type", "VARCHAR(50)"},
		{"accessed_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
	},

	"file_versions": {
		{"id", "SERIAL PRIMARY KEY"},
		{"file_id", "INT REFERENCES file_metadata(id) ON DELETE CASCADE"},
		{"version_number", "INT"},
		{"created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
		{"checksum", "VARCHAR(64)"},
		{"storage_path", "VARCHAR(512)"},
	},

	"users": {
		{"id", "SERIAL PRIMARY KEY"},
		{"username", "VARCHAR(50) UNIQUE NOT NULL"},
		{"email", "VARCHAR(100) UNIQUE NOT NULL"},
		{"password_hash", "VARCHAR(255) NOT NULL"},
		{"created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
		{"updated_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
	},
	"teams": {
		{"id", "SERIAL PRIMARY KEY"},
		{"name", "VARCHAR(100) NOT NULL"},
		{"created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
		{"updated_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
	},
	"team_members": {
		{"id", "SERIAL PRIMARY KEY"},
		{"team_id", "INT REFERENCES teams(id) ON DELETE CASCADE"},
		{"user_id", "INT REFERENCES users(id) ON DELETE CASCADE"},
		{"role", "VARCHAR(50)"},
		{"joined_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
	},
	"folders": {
		{"id", "SERIAL PRIMARY KEY"},
		{"folder_name", "VARCHAR(255) NOT NULL"},
		{"parent_folder_id", "INT REFERENCES folders(id) ON DELETE CASCADE"},
		{"team_id", "INT REFERENCES teams(id) ON DELETE CASCADE"},
		{"created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
		{"owner_id", "UUID NOT NULL"},
		{"metadata", "JSONB"},
	},
	"file_folder_association": {
		{"id", "SERIAL PRIMARY KEY"},
		{"folder_id", "INT REFERENCES folders(id) ON DELETE CASCADE"},
		{"file_id", "INT REFERENCES file_metadata(id) ON DELETE CASCADE"},
		{"created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
	},
}
var createTableStatements = map[string]string{
	"file_metadata": `
	CREATE TABLE IF NOT EXISTS file_metadata (
		id SERIAL PRIMARY KEY,
		file_name VARCHAR(255) NOT NULL,
		file_size BIGINT,
		mime_type VARCHAR(255),
		storage_path VARCHAR(512),
		checksum VARCHAR(64),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		owner_id UUID NOT NULL,
		metadata JSONB
	);`,
	"file_tags": `
	CREATE TABLE IF NOT EXISTS file_tags (
		id SERIAL PRIMARY KEY,
		file_id INT REFERENCES file_metadata(id) ON DELETE CASCADE,
		tag VARCHAR(255) NOT NULL
	);`,

	"file_access_log": `
	CREATE TABLE IF NOT EXISTS file_access_log (
		id SERIAL PRIMARY KEY,
		file_id INT REFERENCES file_metadata(id) ON DELETE CASCADE,
		accessed_by UUID,
		action_type VARCHAR(50),
		accessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`,
	"file_versions": `
	CREATE TABLE IF NOT EXISTS file_versions (
		id SERIAL PRIMARY KEY,
		file_id INT REFERENCES file_metadata(id) ON DELETE CASCADE,
		version_number INT,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		checksum VARCHAR(64),
		storage_path VARCHAR(512)
	);`,
	"users": `
	CREATE TABLE IF NOT EXISTS users (
		id SERIAL PRIMARY KEY,
		username VARCHAR(50) UNIQUE NOT NULL,
		email VARCHAR(100) UNIQUE NOT NULL,
		password_hash VARCHAR(255) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);
	`,
	"teams": `
	CREATE TABLE IF NOT EXISTS teams (
		id SERIAL PRIMARY KEY,
		name VARCHAR(100) NOT NULL,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`,
	"team_members": `
	CREATE TABLE IF NOT EXISTS team_members (
		id SERIAL PRIMARY KEY,
		team_id INT REFERENCES teams(id) ON DELETE CASCADE,
		user_id INT REFERENCES users(id) ON DELETE CASCADE,
		role VARCHAR(50),
		joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		UNIQUE(team_id, user_id)
	);
	`,
	"folders": `
	CREATE TABLE IF NOT EXISTS folders (
		id SERIAL PRIMARY KEY,
		folder_name VARCHAR(255) NOT NULL,
		parent_folder_id INT REFERENCES folders(id) ON DELETE CASCADE,
		team_id INT REFERENCES teams(id) ON DELETE CASCADE,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		owner_id UUID NOT NULL, -- Who created/owns the folder
		metadata JSONB
	);
	`,
	"file_folder_association": `
	CREATE TABLE IF NOT EXISTS file_folder_association (
		id SERIAL PRIMARY KEY,
		folder_id INT REFERENCES folders(id) ON DELETE CASCADE, 
		file_id INT REFERENCES file_metadata(id) ON DELETE CASCADE, 
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		UNIQUE(folder_id, file_id)
	);
	`,
}
