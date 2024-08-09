package kbase

type KBaseUser struct {
	Username string
	Id       string
	Rank     int
}

func CreateUser() KBaseUser {
	return KBaseUser{}
}
