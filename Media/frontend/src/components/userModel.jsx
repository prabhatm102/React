import React, { useState } from "react";
import ModalHeader from "./common/modalHeader";
import Input from "./common/input";
import Joi from "joi-browser";
// import auth from "../services/authService";
import { saveUser } from "../services/userService";
import { toast } from "react-toastify";

export default function UserModel({ user }) {
  const [data, setData] = useState({
    _id: user._id,
    name: user.name,
    email: user.email,
    //    password: user.password,
    file: "",
    isActive: user.isActive,
    isAdmin: user.isAdmin,
  });
  const [errors, setErrors] = useState({});

  const schema = {
    name: Joi.string().required().min(3).label("Name"),
    email: Joi.string().email().required().label("Email"),

    file: Joi.any().required().label("Image"),
    isActive: Joi.boolean(),
    isAdmin: Joi.boolean(),
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
        allErrors.file = "Please upload only .png/.jpg/.jpeg/.ico images.";
        setErrors(allErrors);
        data.file = undefined;
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
      formData.append("_id", data._id);
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (!data.file === "") formData.append("file", data.file);
      formData.append("isAdmin", data.isAdmin);
      formData.append("isActive", data.isActive);

      await saveUser(formData);
      toast.success("User Updated");
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        const errorMessage = { ...errors };
        errorMessage.email = ex.response.data;
        setErrors(errorMessage);
      }
    }
  };

  return (
    <div>
      {user && (
        <div
          className="modal fade"
          id="updateUser"
          tabIndex="-1"
          aria-labelledby="updateUserLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <ModalHeader title="Update User" />
              <div className="modal-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <Input
                    type="text"
                    label="Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.name}
                  />
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                  />
                  {/* <Input
                    type="password"
                    label="Password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    error={errors.password}
                  /> */}
                  <Input
                    type="file"
                    label="Profile picture"
                    name="file"
                    onChange={handleChange}
                    error={errors.file}
                  />
                  <div className="form-check offset-3 col-6 my-2">
                    <input
                      type="checkbox"
                      label="Active"
                      id="isActive"
                      name="isActive"
                      onChange={(e) => handleChange(e.currentTarget)}
                      checked={data.isActive}
                      className="form-check-input"
                    />
                    <label className="form-check-label">isActive</label>
                  </div>
                  <div className="form-check offset-3 col-6 my-2">
                    <input
                      type="checkbox"
                      label="Admin"
                      name="isAdmin"
                      id="isAdmin"
                      onChange={(e) => handleChange(e.currentTarget)}
                      checked={data.isAdmin}
                      className="form-check-input"
                    />
                    <label className="form-check-label" htmlFor="">
                      isAdmin
                    </label>
                  </div>

                  <div className="offset-3 col-6 my-2">
                    <button
                      type="button"
                      className="btn btn-secondary "
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary mx-3"
                      disabled={validate()}
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
