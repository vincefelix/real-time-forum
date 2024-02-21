export const decode = (token) => {
  const [header, payload, _] = token.split(".");
  const decodedHeader = atob(header);
  const decodedPayload = atob(payload);
  const HeaderObj = JSON.parse(decodedHeader);
  const payloadObj = JSON.parse(decodedPayload);
  // console.log("Header décodé:", HeaderObj);
  // console.log("Payload décodé:", payloadObj);
  return payloadObj;
};
export const setJWT = (token) => {
  localStorage.setItem("jwtToken", token);
};