package analysis

import (
	"errors"
	"os"
	"unicode"
)

type Token struct {
	Term     string
	Position int
	Offset   int
	Length   int
}
type Field struct {
	TermString string
}
type Document struct {
	Filepath            string
	Fields              []Field
	TokenizedStringForm []string
	TermCount           map[string]int
	TotalTerms          int
	Id                  int
}
type Analyzer struct {
}

func CreateDocument(filePath string, id int) Document {
	return Document{
		Filepath:            filePath,
		Fields:              make([]Field, 0),
		TokenizedStringForm: make([]string, 0),
		TermCount:           make(map[string]int, 0),
		TotalTerms:          0,
		Id:                  id,
	}
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

func (a *Analyzer) Tokenize(fileContent string) []string {
	var words []string
	var currentWord []rune

	for _, r := range fileContent {
		if unicode.IsSpace(r) || !unicode.IsLetter(r) {
			if len(currentWord) > 0 {
				words = append(words, string(currentWord))
				currentWord = nil
			}
		} else {
			currentWord = append(currentWord, r)
		}
	}
	if len(currentWord) > 0 {
		words = append(words, string(currentWord))
	}
	return words
}
