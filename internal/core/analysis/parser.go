package analysis

import (
	"errors"
	"os"
	"strings"
	"unicode"

	"golang.org/x/text/unicode/norm"
)

type Field struct {
	TermString string
}
type MetaData struct {
	OtherInformation map[string]string
}
type Document struct {
	Fields              map[string]Field
	TokenizedStringForm []string
	TermCount           map[string]int
	TotalTerms          int
	Id                  int
	MetaData            MetaData
}
type Parser struct {
	Content        string
	MinTokenLength int
	MaxTokenLength int
}

func CreateParser(fileContent string) Parser {
	return Parser{
		Content:        fileContent,
		MinTokenLength: -1,
		MaxTokenLength: -1,
	}
}
func (d *Parser) Run() {
	d.RemovePunctuation()
	d.RemoveDiatrics()
}
func (d *Parser) RemovePunctuation() {
	var result []rune
	for _, r := range d.Content {
		if !unicode.IsPunct(r) {
			result = append(result, r)
		}
	}
	d.Content = string(result)
}
func (d *Parser) ConvertToLowercase() {
	d.Content = strings.ToLower(d.Content)
}
func (d *Parser) RemoveDiatrics() {
	t := norm.NFD.String(d.Content)
	var b strings.Builder
	b.Grow(len(t))

	for _, r := range t {
		if unicode.Is(unicode.Mn, r) { // Mn: nonspacing marks
			continue
		}
		b.WriteRune(r)
	}
	d.Content = b.String()
}
func (d *Document) AddField(key string, value string) {
	d.Fields[key] = Field{TermString: value}
}

func LoadFileContentsIntoMemory(filePath string) (string, error) {
	if filePath == "" {
		return "", errors.New("LoadDocument(): currentDocument is not specified")
	}
	bytes, err := os.ReadFile(filePath)
	if err != nil {
		return "", err
	}
	fileContent := string(bytes)
	return fileContent, nil
}
