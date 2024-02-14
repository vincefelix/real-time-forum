package tools

import (
	"strings"
	"time"
)

func Time() (string, string) {
	current := time.Now()
	state := "am"

	// check wether the time is past or after morning
	if current.Hour() >= 12 {
		state = "pm"
	}

	date := time.Now().Format("Jan 2, 2006")
	hour := time.Now().Format("03:04" + " " + state)
	return date, hour
}

func DecodeMsg(text string) string {
	text = strings.ReplaceAll(text, "2@c86cb3", "'")
	text = strings.ReplaceAll(text, "2#c86cb3", "`")
	return text
}

func EncodeMsg(text string) string {
	text = strings.ReplaceAll(text, "'", "2@c86cb3")
	text = strings.ReplaceAll(text, "`", "2#c86cb3")
	return text
}
