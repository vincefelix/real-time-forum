package Handle

import (
	"fmt"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
	"log"
	"time"
)

func HandleLoadMsg(requestPayload map[string]interface{}, database db.Db, request string) (map[string]interface{}, bool, Struct.Errormessage) {
	var Messages Struct.Msgs
	var IdMess string
	sender, receiver := requestPayload["Sender"].(string), requestPayload["Receiver"].(string)
	if request == "moreMsg" {
		IdMess = requestPayload["IdMess"].(string)
	}
	rows, err := database.LoadMessage(sender, receiver, IdMess, time.Time{}, request)
	if err != nil {
		fmt.Println("Error in loading messages: ", err)
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
		err = rows.Scan(&msg.Id, &msg.Sender, &msg.Receiver, &msg.MessageText, &msg.Timestamp, &msg.Date, &msg.Isread)
		if err != nil {
			log.Println("❌ Error while iterating through the results of query to load message: ", err)
			return nil, false, Struct.Errormessage{
				Type:       tools.IseType,
				Msg:        tools.InternalServorError,
				StatusCode: tools.IseStatus,
				Location:   "home",
				Display:    true,
			}
		}

		fmt.Println("--------scanned----------")
		fmt.Println("message id => ", msg.Id)
		fmt.Println("sender => ", msg.Sender)
		fmt.Println("receiver => ", msg.Receiver)
		fmt.Println("content => ", msg.MessageText)
		fmt.Println("timestamp => ", msg.Timestamp)
		fmt.Println("date => ", msg.Date)
		fmt.Println("ReadState => ", msg.Isread)
		fmt.Println("-------------------------")

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
