package Struct

import "time"

// the credentials structure stores the data of the logged in user
type Credentials struct {
	Id       string
	Name     string
	Age      string
	Gender   string
	Surname  string
	Username string
	Email    string
	Password string
}
type Create struct {
	Surname    string
	Name       string
	Age        string
	Gender     string
	Username   string
	Email      string
	Password   string
	Confirmpwd string
}

//	type Register struct {
//		Username string
//		Password string
//		Message  string
//	}
type Register struct {
	FirstName            string
	LastName             string
	NickName             string
	Age                  string
	Gender               string
	EmailRegister        string
	PasswordRegister     string
	ConfPasswordRegister string
}

type UserInfo struct {
	Id        string
	FirstName string
	LastName  string
	NickName  string
	Age       string
	Gender    string
	Email     string
}

type Cookie struct {
	Name   string
	Value  string
	Expire time.Time
}

type Login struct {
	EmailLogin    string
	PassWordLogin string
}
