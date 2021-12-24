import auth from "../services/authService";

const Logout = () => {
  auth.logout();
  window.location = "/";
  return null;
};

export default Logout;
