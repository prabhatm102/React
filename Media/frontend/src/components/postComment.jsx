import React, { useState } from "react";
import Joi from "joi-browser";
import { saveComment } from "../services/commentService";
import auth from "../services/authService";

export default function PostForm({ post, posts, setPosts }) {
  const user = auth.getCurrentUser();
  const [data, setData] = useState({
    comment: "",
    postId: "",
  });
  const [errors, setErrors] = useState({});
  const schema = {
    comment: Joi.string().required().min(1).label("Comment"),
    postId: Joi.string().required(),
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

    newData[input.name] = input.value;
    newData.postId = post._id;
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
      const response = await saveComment(data);
      const prevPosts = [...posts];
      const index = prevPosts.findIndex((p) => p._id === post._id);
      prevPosts[index] = response.data;

      setPosts(prevPosts);
      delete data.userId;
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
          <div className="comment  d-flex">
            <img
              src={process.env.REACT_APP_USER_IMAGE_URL + user.file}
              className="img-fluid img-thumbnail m-1"
              alt="userDetails"
              height="10"
              width="30"
            />
            <form
              className="d-flex"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <input
                type="text"
                className="form-control mx-2"
                id="comment"
                name="comment"
                onChange={(e) => handleChange(e.currentTarget)}
                style={{ height: "35px", width: "120px" }}
              />

              <button
                className="btn btn-outline-primary btn-sm form-control"
                type="submit"
                disabled={validate()}
              >
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
