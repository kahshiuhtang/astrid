package analysis

import (
	"errors"
	"unicode"
)

type Token struct {
	Term     string
	Position int
	Offset   int
	Length   int
}
type Tokenizer struct {
	CurrentWord       []rune
	Tokens            []Token
	CurrentIndex      int
	CurrentTokenCount int
	CurrWordStart     int
	Content           string
}

func CreateTokenizer() Tokenizer {
	return Tokenizer{
		CurrentWord:       make([]rune, 0),
		Tokens:            make([]Token, 0),
		CurrentIndex:      0,
		CurrentTokenCount: 0,
		CurrWordStart:     0,
		Content:           "",
	}
}

func (t *Tokenizer) NextToken() (Token, error) {
	if t.Content == "" {
		return Token{}, errors.New("Tokenizer NextToken(): No string set for this tokenizer")
	}
	for _, r := range t.Content[t.CurrentIndex:] {
		if unicode.IsSpace(r) || !unicode.IsLetter(r) {
			if len(t.CurrentWord) > 0 {
				newToken := Token{
					Term:     string(t.CurrentWord),
					Position: t.CurrentTokenCount,
					Offset:   t.CurrWordStart,
					Length:   len(string(t.CurrentWord)),
				}
				t.CurrentTokenCount += 1
				t.CurrentWord = make([]rune, 0)
				t.Tokens = append(t.Tokens, newToken)
				return newToken, nil
			}
		} else {
			if len(t.CurrentWord) == 0 {
				t.CurrWordStart = t.CurrentIndex
			}
			t.CurrentWord = append(t.CurrentWord, r)
		}
		t.CurrentIndex += 1
	}
	return Token{}, nil
}

func (t *Tokenizer) TokenizeString(fieldContent string) []Token {
	var currentWord []rune
	var tokens = make([]Token, 0)
	var currentIndex = 0
	var currentWords = 1
	var wordStart = 0
	for _, r := range fieldContent {
		if unicode.IsSpace(r) || !unicode.IsLetter(r) {
			if len(currentWord) > 0 {
				newToken := Token{
					Term:     string(currentWord),
					Position: currentWords,
					Offset:   wordStart,
					Length:   len(string(currentWord)),
				}
				currentWord = make([]rune, 0)
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
		newToken := Token{
			Term:     string(currentWord),
			Position: currentWords,
			Offset:   wordStart,
			Length:   len(string(currentWord)),
		}
		tokens = append(tokens, newToken)
	}
	return tokens
}
