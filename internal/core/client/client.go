package client

type SearchClient struct {
}
type StorageClient struct {
}

func (sc *StorageClient) ConnectToServer() {

}
func (sc *StorageClient) Login() {

}
func (sc *StorageClient) Logout() {

}
func (sc *StorageClient) SyncUpFile(fileId string) {

}
func (sc *StorageClient) SyncDownFile(fileId string) {

}
func (sc *StorageClient) AddFile(filePath string) string {
	return ""
}
func (sc *StorageClient) AddFolder(folderPath string) string {
	return ""
}
func (sc *StorageClient) Checkpoint(fileId string) string {
	return ""
}
func (sc *StorageClient) GetVersionHistory(fileId string) string {
	return ""
}

func (sc *StorageClient) CreateDocument(fileId string) bool {
	return false
}
func (sc *StorageClient) UpdateDocument(fileId string) bool {
	return false
}
func (sc *StorageClient) DeleteDocument(fileId string) bool {
	return false
}
func (sc *StorageClient) SyncDownDocument(fileId string) bool {
	return false
}
func (sc *StorageClient) SyncUpDocument(fileId string) bool {
	return false
}
