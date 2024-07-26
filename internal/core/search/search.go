package search

import (
	"fmt"
	"math"

	"github.com/kahshiuhtang/astrid/internal/core/analysis"
	"github.com/kahshiuhtang/astrid/internal/core/index"
)

func Tf(doc *analysis.Document, term string) float64 {
	return float64(doc.TermCount[term]) / float64(doc.TotalTerms)
}

func Idf(ind *index.InvertedIndex, docs []analysis.Document, term string) float64 {
	docsAppearedIn := 0
	if _, exists := ind.PostingsList[term]; exists {
		setOfDocs := ind.PostingsList[term]
		docsAppearedIn = setOfDocs.Size()
		fmt.Println(len(docs))
	}
	return math.Log(float64(len(docs) / (1 + docsAppearedIn)))
}

func Tfidf(ind *index.InvertedIndex, term string, documentId int) {

}
