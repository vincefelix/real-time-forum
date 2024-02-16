package Struct

import "time"

type Message struct {
	Id          string
	Sender      string
	Receiver    string
	MessageText string
	Timestamp   time.Time
	Date        string
	Isread      bool
}

type Msgs []Message
