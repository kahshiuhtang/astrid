package core

import (
	"container/heap"
	"errors"
	"fmt"
	"math"
	"strconv"

	"github.com/huandu/skiplist"
	"github.com/kahshiuhtang/astrid/internal/core/analysis"
	"github.com/kahshiuhtang/astrid/internal/core/index"
	"github.com/kahshiuhtang/astrid/internal/modules/util"
)

type Astrid struct {
	Parser         analysis.Parser
	Tokenizer      analysis.Tokenizer
	Index          index.InvertedIndex
	Documents      map[int]analysis.Document
	NextDocumentId int
	FilesSkipList  *skiplist.SkipList
}

func CreateAstrid() Astrid {
	return Astrid{
		Parser:         analysis.Parser{},
		Tokenizer:      analysis.Tokenizer{},
		Index:          index.InitInvertedIndex(),
		Documents:      make(map[int]analysis.Document, 0),
		NextDocumentId: 0,
		FilesSkipList:  skiplist.New(skiplist.Int),
	}
}
func (a *Astrid) SaveDocument() {

}

func (a *Astrid) CreateDocument(filePath string) *analysis.Document {
	newDoc := analysis.Document{
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

func (a *Astrid) FindDocumentsWithTerm(term string, count int) ([]analysis.Document, error) {
	resDocs := make([]analysis.Document, 0)
	pq := make(util.PriorityQueue, len(a.Documents))
	i := 0

	for docId, _ := range a.Documents {
		score, err := a.Tfidf(term, docId)
		if err != nil {
			continue
		}
		pq[i] = &util.Item{
			Value:    fmt.Sprint(docId),
			Priority: score,
			Index:    i,
		}
		i++
	}
	heap.Init(&pq)

	i = count
	for pq.Len() > 0 {
		docId := heap.Pop(&pq).(*util.Item)
		index, err := strconv.Atoi(docId.Value)
		if err != nil {
			continue
		}
		resDocs = append(resDocs, a.Documents[index])
	}
	return resDocs, nil
}
