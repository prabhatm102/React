// import auth from "./authService";
import http from "./httpServices";

const apiEndpoint = "/conversations";

export const getConversations = (receiver) => {
  return http.get(apiEndpoint + "/" + receiver);
};
export const saveConversation = (conversation) => {
  return http.post(apiEndpoint, conversation);
};

// export const updateConversation = (conversation) => {};

// export const deleteConversation = (conversation) => {
//   return http.delete(apiEndpoint + "/" + conversation._id);
// };
