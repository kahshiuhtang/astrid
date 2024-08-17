package storage

type MetadataServer struct {
}

func (ms *MetadataServer) StoreFile(filePath string) string {
	return ""
}
func (ms *MetadataServer) StoreLink(fileLink string) string {
	return ""
}
func (ms *MetadataServer) UpdateFile(fileId string) bool {
	return false
}
func (ms *MetadataServer) RemoveFile(fileId string) {

}
func (ms *MetadataServer) GetFileMetaData(fileId string) []string {
	return nil
}
func (ms *MetadataServer) GetFileVersionHistory(fileId string) []string {
	return nil
}
func (ms *MetadataServer) AddUserToFile(fileId string, userId string, newUserId string) bool {
	return false
}
func (ms *MetadataServer) RemoveUserFromFile(fileId string, userId string, userToRemoveId string) bool {
	return false
}
func (ms *MetadataServer) UpdateFileMetadata(fileId string, userId string, metadata []string) bool {
	return false
}
func (ms *MetadataServer) SendNotification(fileId string, userId string, recepientUserId string, message string) bool {
	return false
}
func (ms *MetadataServer) Snapshot(userId string) bool {
	return false
}
func (ms *MetadataServer) SnapshotFile(userId string, fileId string) bool {
	return false
}
func (ms *MetadataServer) SetFileVersion(userId string, fileId string) bool {
	return false
}
func (ms *MetadataServer) CompressFile(userId string, fileId string) bool {
	return false
}
func (ms *MetadataServer) DecompressFile(userId string, fileId string) bool {
	return false
}
func (ms *MetadataServer) AppendAccessLog(userId string, fileId string, message string) bool {
	return false
}
func (ms *MetadataServer) GetAccessLog(userId string, fileId string) string {
	return ""
}
