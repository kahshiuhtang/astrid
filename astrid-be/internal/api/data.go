package api

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	data "github.com/kahshiuhtang/astrid-fs/internal/data"
)

func SetupDateDigestRoutes(router *mux.Router) {
	router.HandleFunc("/files/upload", storeFile).Methods("POST")
	router.HandleFunc("/objects/upload", storeObject).Methods("POST")
	router.HandleFunc("/objects/{objectId}", getObject).Methods("GET")
	router.HandleFunc("/db/upload", storeDBData).Methods("POST")
}

func storeObject(w http.ResponseWriter, r *http.Request) {
	err := r.ParseMultipartForm(10 << 20) // 10 MB size limit
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}
	file, fileHeader, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()
	assignResp, err := data.GetFileAssignment()
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get file assignment: %v", err), http.StatusInternalServerError)
		return
	}
	uploadResp, err := data.UploadToObjectStoreSW(file, fileHeader, assignResp)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to upload file: %v", err), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(uploadResp)
}

func getObject(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	objectId := vars["objectId"]
	seaweedURL := fmt.Sprintf("http://localhost:8080/%s", objectId)
	fmt.Println(objectId)
	resp, err := http.Get(seaweedURL)
	if err != nil {
		http.Error(w, "Failed to pull file", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		http.Error(w, "File not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
	_, err = io.Copy(w, resp.Body)
	if err != nil {
		http.Error(w, "Failed to send file", http.StatusInternalServerError)
		return
	}
	log.Printf("Successfully served file: %s", objectId)
}
func storeFile(w http.ResponseWriter, r *http.Request) {

}
func storeDBData(w http.ResponseWriter, r *http.Request) {

}
