package Handle

import (
	"fmt"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
	"log"
	"time"

	"github.com/gofrs/uuid/v5"
)

func HandleMessage(requestPayload map[string]interface{}, database db.Db) (map[string]interface{}, string, bool, Struct.Errormessage) {
	log.Println("Handling message creation")

	// Vérifier si les champs requis sont présents dans la requête
	requiredFields := []string{"sender", "receiver", "message"}
	for _, field := range requiredFields {
		if _, ok := requestPayload[field]; !ok {
			errMsg := fmt.Sprintf("Field '%s' is missing in the request payload", field)
			log.Println(errMsg)
			return nil,
				"",
				false,
				Struct.Errormessage{
					Type:       tools.BdType,
					Msg:        "wrong request",
					StatusCode: tools.BdStatus,
					Location:   "home",
					Display:    true,
				}
		}
	}
	date := time.Now()
	idMess, err := uuid.NewV4()
	if err != nil {
		fmt.Println("❌  Failed to generate UUID for new message.")
		return nil,
			"",
			false,
			Struct.Errormessage{
				Type:       tools.BdType,
				Msg:        "wrong request",
				StatusCode: tools.BdStatus,
				Location:   "home",
				Display:    true,
			}
	}

	parsedDate := date.Format("02/01/2006 15:04")
	fmt.Println("Sender : ", requestPayload["sender"].(string))
	fmt.Println("Receiver: ", requestPayload["receiver"].(string))
	fmt.Println("Message content: ", requestPayload["message"].(string))
	fmt.Println("sent at : ", date)
	fmt.Println("sent at date parsed : ", parsedDate)

	// Créer une structure pour le message
	message := Struct.Message{
		Id:          idMess.String(),
		Sender:      requestPayload["sender"].(string),
		Receiver:    requestPayload["receiver"].(string),
		MessageText: requestPayload["message"].(string),
		Timestamp:   date,
		Date:        parsedDate,
	}
	// Insérer le message dans la base de données
	values := fmt.Sprintf("('%s','%s', '%s', '%s', '%v', '%v')", message.Id, message.Sender, message.Receiver, tools.EncodeMsg(message.MessageText), message.Timestamp, parsedDate)
	err = database.INSERT("Messages", "(id, sender, receiver, message, timestamp, date)", values)
	if err != nil {
		errMsg := fmt.Sprintf("Error inserting message into database: %v", err)
		log.Println(errMsg)
		return nil, "", false, Struct.Errormessage{
			Type:       tools.IseType,
			Msg:        tools.InternalServorError,
			StatusCode: tools.IseStatus,
			Location:   "home",
			Display:    true,
		}
	}
	// Construire la réponse
	response := make(map[string]interface{}, 0)
	response["Type"] = "newMsg"
	response["Payload"] = message
	response["status"] = "200"
	response["message"] = "Message created successfully"

	return response, message.Receiver, true, Struct.Errormessage{}
}
