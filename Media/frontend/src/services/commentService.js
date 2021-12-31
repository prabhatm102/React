import auth from "./authService";
import http from "./httpServices";

const apiEndpoint = "/comments";

// export const getComments = () => {
//   return http.get(apiEndpoint + "/" + auth.getCurrentUser()._id);
// };
export const saveComment = (comment) => {
  comment.userId = auth.getCurrentUser()._id;
  return http.post(apiEndpoint, comment);
};

export const updateComment = (comment) => {};

export const deleteComment = (comment) => {
  return http.delete(apiEndpoint + "/" + comment._id);
};
