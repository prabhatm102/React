import auth from "./authService";
import http from "./httpServices";

const apiEndpoint = "/posts";

export const getAllPosts = () => {
  return http.get(apiEndpoint);
};
export const getPosts = () => {
  return http.get(apiEndpoint + "/" + auth.getCurrentUser()._id);
};
export const savePost = (post) => {
  return http.post(apiEndpoint + "/" + auth.getCurrentUser()._id, post, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updatePost = (post) => {};

export const deletePost = (post) => {
  return http.delete(apiEndpoint + "/" + post._id);
};
