import http from "./httpServices";
import jwtDecode from "jwt-decode";

const apiEndpoint = "/logins";
const tokenKey = "authToken";

export const login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
};
export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};

export const getCurrentUser = () => {
  try {
    return jwtDecode(localStorage.getItem(tokenKey));
  } catch (ex) {
    return null;
  }
};

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

http.setJwt(getJwt());

const auth = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};

export default auth;
