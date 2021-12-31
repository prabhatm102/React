import http from "./httpServices";

const apiEndpoint = "/users";

export const getUsers = () => {
  return http.get(apiEndpoint);
};
export const saveUser = (user) => {
  if (user._id) {
    const body = { ...user };
    delete body._id;
    console.log(body);
    if (user.file) {
      return http.put(apiEndpoint + "/" + user._id, user, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    return http.put(apiEndpoint + "/" + user._id, user);
  }
  return http.post(apiEndpoint, user, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateUser = (user) => {};

export const deleteUser = (user) => {
  return http.delete(apiEndpoint + "/" + user._id);
};

export const getFriends = () => {
  return http.get(apiEndpoint + "/getFriends");
};
