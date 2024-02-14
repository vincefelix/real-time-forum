package Handle

import (
	db "forum/Database"
	Struct "forum/data-structs"
)

func HandleLoadMsg(database db.Db) (map[string]interface{}, bool, Struct.Errormessage) {
	Messages := Struct.Msgs{
		Struct.Message{Sender: "papis", Receiver: "sniang", MessageText: "hi 1"},
		Struct.Message{Sender: "papis", Receiver: "sniang", MessageText: "hi 2"},
		Struct.Message{Sender: "papis", Receiver: "sniang", MessageText: "hi 3"},
		Struct.Message{Sender: "sniang", Receiver: "papis", MessageText: "hue 4"},
		Struct.Message{Sender: "sniang", Receiver: "papis", MessageText: "hue 5"},
		Struct.Message{Sender: "sniang", Receiver: "papis", MessageText: "hue 6"},
		Struct.Message{Sender: "sniang", Receiver: "papis", MessageText: "hue 7"},
	}
	serverResponse := make(map[string]interface{}, 0)
	serverResponse["Type"] = "loadMsg"
	serverResponse["status"] = "200"
	serverResponse["Payload"] = Messages
	return serverResponse, true, Struct.Errormessage{}
}
