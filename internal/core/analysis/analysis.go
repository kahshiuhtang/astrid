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
	Fields              map[string]Field
	TokenizedStringForm []string
	TermCount           map[string]int
	TotalTerms          int
	Id                  int
}
type Analyzer struct {
}

func (a *Analyzer) LoadFile(currentDocument *Document) (string, error) {
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

func (a *Analyzer) Tokenize(fieldContent string) ([]string, []Token) {
	var words []string
	var currentWord []rune
	var tokens = make([]Token, 0)
	var currentIndex = 0
	var currentWords = 1
	var wordStart = 0
	for _, r := range fieldContent {
		if unicode.IsSpace(r) || !unicode.IsLetter(r) {
			if len(currentWord) > 0 {
				words = append(words, string(currentWord))
				currentWord = nil
				newToken := Token{
					Term:     string(currentWord),
					Position: currentWords,
					Offset:   wordStart,
					Length:   len(string(currentWord)),
				}
				currentWords += 1
				wordStart = -1
				tokens = append(tokens, newToken)
			}
		} else {
			currentWord = append(currentWord, r)
			if wordStart == -1 {
				wordStart = currentIndex
			}
		}
		currentIndex += 1
	}
	if len(currentWord) > 0 {
		words = append(words, string(currentWord))
		newToken := Token{
			Term:     string(currentWord),
			Position: currentWords,
			Offset:   wordStart,
			Length:   len(string(currentWord)),
		}
		tokens = append(tokens, newToken)
	}
	return words, tokens
}
