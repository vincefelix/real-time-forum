package Handle

import (
	"fmt"
	db "forum/Database"
	Struct "forum/data-structs"
	tools "forum/tools"
	"log"
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
	fmt.Println("Sender : ", requestPayload["sender"].(string))
	fmt.Println("Receiver: ", requestPayload["receiver"].(string))
	fmt.Println("Message content: ", requestPayload["message"].(string))

	// Créer une structure pour le message
	message := Struct.Message{
		Sender:      requestPayload["sender"].(string),
		Receiver:    requestPayload["receiver"].(string),
		MessageText: requestPayload["message"].(string),
	}
	// Insérer le message dans la base de données
	values := fmt.Sprintf("('%s', '%s', '%s', '%s')", message.Sender, message.Receiver, tools.EncodeMsg(message.MessageText), message.Timestamp)
	err := database.INSERT("Messages", "(sender_id, receiver_id, message, timestamp)", values)
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
