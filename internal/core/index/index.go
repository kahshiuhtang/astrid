package index

import (
	"errors"
	"log"

	"github.com/kahshiuhtang/astrid/internal/core/analysis"
	"github.com/kahshiuhtang/astrid/internal/modules/util"
)

type InvertedIndex struct {
	TermDictionary   map[string]int
	TermCount        map[int]int
	PostingsList     map[string]util.Set[int]
	CurrentTermCount int
}

func InitInvertedIndex() InvertedIndex {
	res := InvertedIndex{
		TermDictionary:   make(map[string]int),           // Maps each term string to a term Id
		PostingsList:     make(map[string]util.Set[int]), // Maps each term string to a list of documents Ids containing this term
		TermCount:        make(map[int]int),              // Maps each term id and how many times the word has appeared
		CurrentTermCount: 0,
	}
	return res
}

func (ind *InvertedIndex) AddDocument(currentDocument *analysis.Document) error {
	if currentDocument == nil || currentDocument.TokenizedStringForm == nil {
		return errors.New("AddDocument(): currentDocument is not specified")
	}
	for _, word := range currentDocument.TokenizedStringForm {
		if _, exists := ind.PostingsList[word]; exists {
			set, exists := ind.PostingsList[word]
			if !exists {
				log.Fatal("AddDocument(): set does not exist when it has been crea")
			}
			set.Add(currentDocument.Id)
			ind.TermCount[ind.TermDictionary[word]] += 1
		} else {
			ind.TermDictionary[word] = ind.CurrentTermCount
			setForWord := util.NewSet[int]()
			setForWord.Add(currentDocument.Id)
			ind.PostingsList[word] = setForWord
			ind.TermCount[ind.CurrentTermCount] = 1
			ind.CurrentTermCount += 1
		}
	}
	return nil
}
