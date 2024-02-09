package Struct

type Request struct {
	Type    string                 `json:"type"`
	Payload map[string]interface{} `json:"payload"`
}
type WebError struct {
	Type    string
	Status  int
	Message string
}

type Message struct {
	Content string
	Sender string
	Receiver string
	Date string
}