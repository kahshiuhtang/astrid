package index

import (
	"errors"

	"github.com/kahshiuhtang/astrid/internal/core/analysis"
)

type InvertedIndex struct {
	TermDictionary       map[int]string
	PostingsList         map[string][]int
	CurrentDocumentCount int
}

func InitInvertedIndex() InvertedIndex {
	res := InvertedIndex{
		TermDictionary:       make(map[int]string),
		PostingsList:         make(map[string][]int),
		CurrentDocumentCount: 0,
	}
	return res
}

func (ind *InvertedIndex) AddDocument(currentDocument *analysis.Document) error {
	if currentDocument == nil || currentDocument.TokenizedStringForm == nil {
		return errors.New("AddDocument(): currentDocument is not specified")
	}
	for _, word := range currentDocument.TokenizedStringForm {
		if _, exists := ind.PostingsList[word]; exists {
			ind.TermDictionary[ind.CurrentDocumentCount] = word
			ind.PostingsList[word] = make([]int, 0)
			ind.PostingsList[word] = append(ind.PostingsList[word], currentDocument.Id)
			ind.CurrentDocumentCount += 1
		} else {
			ind.PostingsList[word] = append(ind.PostingsList[word], currentDocument.Id)
		}
	}
	return nil
}
