import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logServices";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurred!");
    //toast(".."); or toast.warn("..") or toast.success("...")....
  } else {
    toast.error("Client Error! " + error.message);
  }
  // return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
