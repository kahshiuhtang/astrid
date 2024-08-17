package sync

type VersionControlManager struct {
}
type VersionComment struct {
}
type VersionSuggestion struct {
}
type VersionTag struct{}

func (vcs *VersionControlManager) Checkpoint(fileId string) {

}
func (vcs *VersionControlManager) Revert(fileId string, versionId string) {

}
func (vcs *VersionControlManager) ApplyComments(fileId string, comments VersionComment) {

}
func (vcs *VersionControlManager) ApplySuggestions(fileId string, suggestions VersionSuggestion) {

}
func (vcs *VersionControlManager) CreateBranch(fileId string, branchId string) {

}
func (vcs *VersionControlManager) DeleteBranch(fileId string, branchId string) {

}
func (vcs *VersionControlManager) Sync(fileId string) {

}
func (vcs *VersionControlManager) Pull(fileId string) {

}
func (vcs *VersionControlManager) SwapBranch(fileId string, newBranchId string) {

}
func (vcs *VersionControlManager) MergeBranches(fileId string, oldBranchId string, newBranchId string) {

}
func (vcs *VersionControlManager) Merge(fileId string) {

}
func (vcs *VersionControlManager) TagUser(fileId string, tag VersionTag) {

}
func (vcs *VersionControlManager) AddUser(fileId string, userId string) {

}
func (vcs *VersionControlManager) RemoveUser(fileId string, userId string) {

}
func (vcs *VersionControlManager) Lock(fileId string, userId string) {

}
func (vcs *VersionControlManager) Unlock(fileId string, userId string) {

}
func (vcs *VersionControlManager) Backup(fileId string, userId string) {

}
func (vcs *VersionControlManager) Search(fileId string, userId string, phrase string) {

}
func (vcs *VersionControlManager) Highlight(fileId string, userId string, phrase string) {

}
func (vcs *VersionControlManager) Enter(fileId string, userId string, phrase string) {

}
func (vcs *VersionControlManager) CompareVersions(fileId string, version1Id string, version2Id string) {

}
