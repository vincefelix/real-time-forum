package tools

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	Struct "forum/data-structs"
	"strings"
)

func Signature(encodedData string) string {
	hmacHash := hmac.New(sha256.New, []byte("FME0D+lOPSaUO+E7AiNr+by/7U5I6ic52ajyoeyErkOMx9yNOOqaxZXGMkGxyVdUBzC1GweiK5zNtGnZYLoSZg"))
	hmacHash.Write([]byte(encodedData))
	return base64.URLEncoding.EncodeToString(hmacHash.Sum(nil))
}

func GenerateToken(data interface{}) (string, error, Struct.Errormessage) {
	header := map[string]interface{}{
		"alg": "vm",
		"typ": "JWT",
	}
	headerJSON, err := json.Marshal(header)
	if err != nil {
		fmt.Println("❌ error while marshalling header")
		return "", err, Struct.Errormessage{Type: IseType, Msg: InternalServorError, StatusCode: IseStatus, Location: "home",Display: true,}
	}
	encodedHeader := base64.URLEncoding.EncodeToString(headerJSON)

	Datas := map[string]interface{}{
		"payload": data,
	}
	DataJSON, err := json.Marshal(Datas)
	if err != nil {
		fmt.Println("❌ error while marshalling datas")
		return "", err, Struct.Errormessage{Type: IseType, Msg: InternalServorError, StatusCode: IseStatus, Location: "home",Display: true,}
	}
	encodedData := base64.URLEncoding.EncodeToString(DataJSON)

	return fmt.Sprintf("%s.%s.%s", encodedHeader, encodedData, Signature(encodedData)), nil, Struct.Errormessage{}
}

func DecodeJwT(token string) (interface{}, error) {
	tokenComponent := strings.Split(token, ".")
	if len(tokenComponent) != 2 {
		return nil, errors.New("wrong token structure ❌")
	}

	decodedPayload, err := base64.URLEncoding.DecodeString(tokenComponent[0])
	if err != nil {
		return nil, err
	}
	var payload map[string]interface{}
	err = json.Unmarshal(decodedPayload, &payload)
	if err != nil {
		return nil, err
	}
	return payload, nil

}
