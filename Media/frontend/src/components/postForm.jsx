import React, { useState } from "react";
import Joi from "joi-browser";
import { savePost } from "../services/postService";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export default function PostForm({ user, posts, setPosts }) {
  const [data, setData] = useState({
    message: "",
    postFile: undefined,
  });
  const [errors, setErrors] = useState({});
  const schema = {
    message: Joi.string().required().min(1).label("Name"),
    postFile: Joi.any().label("Image"),
  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const singleSchema = {
      [name]: schema[name],
    };

    const { error } = Joi.validate(obj, singleSchema);
    return error ? error.details[0].message : null;
  };
  const handleChange = (input) => {
    const allErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) allErrors[input.name] = errorMessage;
    else delete allErrors[input.name];

    setErrors(allErrors);

    const newData = { ...data };

    if (input.files && input.files.length > 0) {
      const allowedExt = [
        "image/png",
        "image/jpeg",
        "image/vnd.microsoft.icon",
      ];
      if (allowedExt.indexOf(input.files[0].type) === -1) {
        allErrors.postFile = "Please upload only .png/.jpg/.jpeg/.ico images.";
        setErrors(allErrors);
        data.postFile = undefined;
        return;
      }
      newData[input.name] = input.files[0];
    } else newData[input.name] = input.value;
    setData(newData);
  };
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;
    const errors = {};

    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    doSubmit();
  };
  const doSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("message", data.message);
      formData.append("postFile", data.postFile);

      const response = await savePost(formData);
      const prevPosts = [...posts];
      prevPosts.push(response.data);
      setPosts(prevPosts);
      await MySwal.fire({
        position: "center",
        icon: "success",
        title: "Posted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errorMessage = { ...errors };
        errorMessage.email = ex.response.data;
        setErrors(errorMessage);
      }
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="post  d-flex">
            <img
              src={process.env.REACT_APP_USER_IMAGE_URL + user.file}
              className="img-fluid img-thumbnail m-1"
              alt="userDetails"
              height="20"
              width="40"
            />
            <form
              className="d-flex"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <input
                type="text"
                className="form-control me-2"
                id="message"
                name="message"
                onChange={(e) => handleChange(e.currentTarget)}
              />
              <div className="form-group m-2">
                <input
                  type="file"
                  className="form-control"
                  id="postFile"
                  name="postFile"
                  onChange={(e) => handleChange(e.currentTarget)}
                />
              </div>
              <button
                className="btn btn-outline-primary form-control w-25"
                type="submit"
                disabled={validate()}
              >
                Post
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
