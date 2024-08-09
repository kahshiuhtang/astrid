package kbase

// KBase is a tree of nodes with documents
type KBaseNode struct {
	Next      []*KBase
	Content   string
	Id        int
	Visits    int
	AuthLevel int // Min level needed to see this in search
	Url       string
	Orgs      []int // Organizations that can see this file
	Before    []*KBase
}
type KBase struct {
	Root *KBaseNode
	Tags map[string]int
}

func CreateKBase() KBase {
	return KBase{
		Root: &KBaseNode{
			Next:    make([]*KBase, 0),
			Content: "",
			Id:      -1,
			Visits:  -1,
			Before:  make([]*KBase, 0),
		},
		Tags: make(map[string]int),
	}
}

func CreateKBaseNode() KBaseNode {
	return KBaseNode{
		Next:    make([]*KBase, 0),
		Content: "",
		Id:      -1,
		Visits:  -1,
		Before:  make([]*KBase, 0),
	}
}
func (k *KBase) AddNewNode() {

}
func (k *KBase) RemoveNode() {

}
