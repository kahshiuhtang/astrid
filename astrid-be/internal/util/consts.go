package util

var tableStructsMap = map[string][]PGColumn{
	"file_metadata": []PGColumn{
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

	"file_tags": []PGColumn{
		{"id", "SERIAL PRIMARY KEY"},
		{"file_id", "INT REFERENCES file_metadata(id) ON DELETE CASCADE"},
		{"tag", "VARCHAR(255) NOT NULL"},
	},

	"file_access_log": []PGColumn{
		{"id", "SERIAL PRIMARY KEY"},
		{"file_id", "INT REFERENCES file_metadata(id) ON DELETE CASCADE"},
		{"accessed_by", "UUID"},
		{"action_type", "VARCHAR(50)"},
		{"accessed_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
	},

	"storage_nodes": []PGColumn{
		{"id", "SERIAL PRIMARY KEY"},
		{"node_name", "VARCHAR(255) NOT NULL"},
		{"node_ip", "VARCHAR(255) NOT NULL"},
		{"region", "VARCHAR(255)"},
		{"storage_capacity", "BIGINT"},
		{"current_usage", "BIGINT"},
		{"last_checked", "TIMESTAMP"},
	},

	"file_versions": []PGColumn{
		{"id", "SERIAL PRIMARY KEY"},
		{"file_id", "INT REFERENCES file_metadata(id) ON DELETE CASCADE"},
		{"version_number", "INT"},
		{"created_at", "TIMESTAMP DEFAULT CURRENT_TIMESTAMP"},
		{"checksum", "VARCHAR(64)"},
		{"storage_path", "VARCHAR(512)"},
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

	"storage_nodes": `
	CREATE TABLE IF NOT EXISTS storage_nodes (
		id SERIAL PRIMARY KEY,
		node_name VARCHAR(255) NOT NULL,
		node_ip VARCHAR(255) NOT NULL,
		region VARCHAR(255),
		storage_capacity BIGINT,
		current_usage BIGINT,
		last_checked TIMESTAMP
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
}
