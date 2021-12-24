import http from "./htttpServices";

const apiEndpoint = "/users";
export const saveUser = (user) => {
  return http.post(apiEndpoint, user, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
