package core

import (
	"github.com/kahshiuhtang/astrid/internal/core/analysis"
	"github.com/kahshiuhtang/astrid/internal/core/index"
)

type Astrid struct {
	Analyzer  analysis.Analyzer
	Tokenizer analysis.Tokenizer
	Index     index.InvertedIndex
	Documents []analysis.Document
}

func CreateAstrid() Astrid {
	return Astrid{
		Documents: make([]analysis.Document, 0),
	}
}
