package data

import (
	"bytes"
	"context"
	"crypto/md5"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"time"

	"github.com/kahshiuhtang/astrid-fs/internal/util"
)

type AssignResponse struct {
	Fid       string `json:"fid"`
	Url       string `json:"url"`
	PublicUrl string `json:"publicUrl"`
	Count     int    `json:"count"`
}

type UploadResponse struct {
	Name     string `json:"name"`
	Size     int64  `json:"size"`
	ETag     string `json:"eTag"`
	Location string `json:"location"`
}

func GetFileAssignment() (AssignResponse, error) {
	var assignResp AssignResponse
	resp, err := http.Get("http://localhost:9333/dir/assign") // Replace with your master URL
	if err != nil {
		return assignResp, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return assignResp, fmt.Errorf("error: failed to get file assignment, status code: %v", resp.StatusCode)
	}

	err = json.NewDecoder(resp.Body).Decode(&assignResp)
	if err != nil {
		return assignResp, fmt.Errorf("error decoding response: %v", err)
	}
	return assignResp, nil
}

func fileToBytes(file multipart.File) ([]byte, error) {
	var buf bytes.Buffer
	_, err := io.Copy(&buf, file)
	if err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

func UploadToObjectStoreSW(file multipart.File, fileHeader *multipart.FileHeader, assignResp AssignResponse) (UploadResponse, error) {
	var upResp UploadResponse
	targetURL := "http://127.0.0.1:8080/" + assignResp.Fid
	fileData, err := fileToBytes(file)
	if err != nil {
		fmt.Println("Error turning file into bytes array:", err)
		return upResp, nil
	}
	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile("file", "myphoto.jpg")
	if err != nil {
		fmt.Println("Error creating form file:", err)
		return upResp, nil
	}
	_, err = part.Write(fileData)
	if err != nil {
		fmt.Println("Error writing file data:", err)
		return upResp, nil
	}
	err = writer.Close()
	if err != nil {
		fmt.Println("Error closing writer:", err)
		return upResp, nil
	}
	req, err := http.NewRequest("POST", targetURL, body)
	if err != nil {
		fmt.Println("Error creating request:", err)
		return upResp, nil
	}
	req.Header.Set("Content-Type", writer.FormDataContentType())
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return upResp, nil
	}
	defer resp.Body.Close()
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response:", err)
		return upResp, nil
	}
	err = json.Unmarshal(respBody, &upResp)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return upResp, nil
	}
	upResp.Location = assignResp.Fid
	StoreFileMetadataDB(util.FileMetadata{
		FileName:    fileHeader.Filename,
		FileSize:    upResp.Size,
		StoragePath: "/" + fileHeader.Filename,
		CreatedAt:   time.Now(),
		MimeType:    getFileMimeType(file),
		OwnerID:     util.GenerateUUID(),
		Checksum:    getFileChecksum(file, "sha256"),
		Metadata:    "{}",
	})
	fmt.Println(upResp)
	return upResp, nil
}

func CreateFolderDB(folderName string, parentFodlerId *int, ownerId string, metadata string) (int, error) {
	conn := util.ConnectPostgres()
	query := `
        INSERT INTO folders (folder_name, parent_folder_id, owner_id, metadata, created_at)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `
	var folderID int
	createdAt := time.Now()

	err := conn.QueryRow(context.Background(), query, folderName, parentFodlerId, ownerId, metadata, createdAt).Scan(&folderID)
	if err != nil {
		return 0, err
	}

	return folderID, nil
}

func AddFileToFolder(folderId, fileId int) (int, error) {
	conn := util.ConnectPostgres()
	query := `
        INSERT INTO file_folder_association (folder_id, file_id, created_at)
        VALUES ($1, $2, $3)
        RETURNING id;
    `
	var id int
	createdAt := time.Now()

	err := conn.QueryRow(context.Background(), query, folderId, fileId, createdAt).Scan(&id)
	if err != nil {
		return 0, err
	}

	return id, nil
}

func RemoveFileFromFolder(folderId, fileId int) error {
	conn := util.ConnectPostgres()
	query := `
        DELETE FROM file_folder_association
        WHERE folder_id = $1 AND file_id = $2;
    `
	_, err := conn.Exec(context.Background(), query, folderId, fileId)
	if err != nil {
		return err
	}

	return nil
}

func getFileMimeType(file multipart.File) string {
	buffer := make([]byte, 512)
	file.Read(buffer)
	return http.DetectContentType(buffer)
}
func getFileChecksum(file multipart.File, algorithm string) string {
	switch algorithm {
	case "sha256":
		h := sha256.New()
		io.Copy(h, file)
		return hex.EncodeToString(h.Sum(nil))
	case "md5":
		h := md5.New()
		io.Copy(h, file)
		return hex.EncodeToString(h.Sum(nil))
	}
	return ""
}
