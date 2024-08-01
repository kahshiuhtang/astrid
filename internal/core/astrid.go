package core

import (
	"errors"
	"math"

	"github.com/kahshiuhtang/astrid/internal/core/analysis"
	"github.com/kahshiuhtang/astrid/internal/core/index"
)

type Astrid struct {
	Analyzer       analysis.Analyzer
	Tokenizer      analysis.Tokenizer
	Index          index.InvertedIndex
	Documents      map[int]analysis.Document
	NextDocumentId int
}

func CreateAstrid() Astrid {
	return Astrid{
		Analyzer:       analysis.Analyzer{},
		Tokenizer:      analysis.Tokenizer{},
		Index:          index.InitInvertedIndex(),
		Documents:      make(map[int]analysis.Document, 0),
		NextDocumentId: 0,
	}
}

func (a *Astrid) CreateDocument(filePath string) *analysis.Document {
	newDoc := analysis.Document{
		Filepath:            filePath,
		Fields:              make(map[string]analysis.Field, 0),
		TokenizedStringForm: make([]string, 0),
		TermCount:           make(map[string]int, 0),
		TotalTerms:          0,
		Id:                  a.NextDocumentId,
	}
	a.Documents[a.NextDocumentId] = newDoc
	a.NextDocumentId += 1
	return &newDoc
}

func (a *Astrid) Tf(docId int, term string) (float64, error) {
	if _, exists := a.Documents[docId]; !exists {
		return 0, errors.New("Tf(): unable to find doc from docId")
	}
	doc := a.Documents[docId]
	return float64(doc.TermCount[term]) / float64(doc.TotalTerms), nil
}

func (a *Astrid) Idf(term string) (float64, error) {
	docsAppearedIn := 0
	if _, exists := a.Index.PostingsList[term]; exists {
		setOfDocs := a.Index.PostingsList[term]
		docsAppearedIn = setOfDocs.Size()
	}
	return math.Log((float64(1.0) + float64(len(a.Documents))/float64(1+docsAppearedIn))), nil
}

func (a *Astrid) Tfidf(term string, documentId int) (float64, error) {
	tf, err := a.Tf(documentId, term)
	if err != nil {
		return -1, errors.New("Tfidf(): unable calculate Tf")
	}
	idf, err := a.Idf(term)
	if err != nil {
		return -1, errors.New("Tfidf(): unable calculate Idf")
	}
	return tf * idf, nil
}
