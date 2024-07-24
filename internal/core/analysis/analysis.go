package analysis

import (
	"errors"
	"os"
)

type Token struct {
	Term     string
	Position int
	Offset   int
	Length   int
}
type Field struct {
}
type Document struct {
	Filepath string
	Fields   []Field
}
type Analyzer struct {
}

func (a *Analyzer) LoadDocument(currentDocument *Document) (string, error) {
	if currentDocument == nil || currentDocument.Filepath == "" {
		return "", errors.New("LoadDocument(): currentDocument is not specified")
	}
	bytes, err := os.ReadFile(currentDocument.Filepath)
	if err != nil {
		return "", err
	}
	fileContent := string(bytes)
	return fileContent, nil
}

func (a *Analyzer) Tokenize() {

}
