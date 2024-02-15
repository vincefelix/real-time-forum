package Struct

import "time"

type Message struct {
	Sender      string
	Receiver    string
	MessageText string
	Timestamp   time.Time
	Date        string
	Isread      bool
}

type Msgs []Message
