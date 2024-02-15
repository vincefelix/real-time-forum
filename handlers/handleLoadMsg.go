package Handle

import (
	"fmt"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
	"log"
	"time"
)

func HandleLoadMsg(requestPayload map[string]interface{}, database db.Db) (map[string]interface{}, bool, Struct.Errormessage) {
	var Messages Struct.Msgs
	sender, receiver := requestPayload["Sender"].(string), requestPayload["Receiver"].(string)
	rows, err := database.LoadMessage(sender, receiver, time.Time{})
	if err != nil {
		return nil, false, Struct.Errormessage{
			Type:       tools.IseType,
			Msg:        tools.InternalServorError,
			StatusCode: tools.IseStatus,
			Location:   "home",
			Display:    true,
		}
	}
	for rows.Next() {
		var msg Struct.Message
		err = rows.Scan(&msg.Sender, &msg.Receiver, &msg.MessageText, &msg.Timestamp, &msg.Isread)
		if err != nil {
			return nil, false, Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location:   "home",
				Display:    true,
			}
		}
		msg.Date = msg.Timestamp.Format("02 Jan 15:04") // Format the timestamp to a
		Messages = append(Messages, msg)
	}
	log.Println("✔ Messages loaded and stored in local struct")
	fmt.Println("messages tab", Messages)
	serverResponse := make(map[string]interface{}, 0)
	serverResponse["Type"] = "loadMsg"
	serverResponse["status"] = "200"
	serverResponse["Payload"] = Messages
	return serverResponse, true, Struct.Errormessage{}
}

// func sortByDate(messages []Struct.Message) {
// 	for i := range messages {
// 		j := i + 1
// 		for j < len(messages) && messages[i].Timestamp.After(messages[j].Timestamp) {
// 			messages[i], messages[j] = messages[j], messages[i]
// 			j = i + 1
// 		}
// 	}
// }
