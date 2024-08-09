package kbase

import (
	"time"
)

type KBaseQuery struct {
	Time        time.Time
	QueryString int
	UserId      string
}

func CreateNewQuery() {
}
