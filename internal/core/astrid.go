package core

import (
	"github.com/kahshiuhtang/astrid/internal/core/analysis"
	"github.com/kahshiuhtang/astrid/internal/core/index"
)

type Astrid struct {
	Analyzer  analysis.Analyzer
	Tokenizer analysis.Tokenizer
	Index     index.InvertedIndex
}

func (a *Astrid) Initialize() {

}
