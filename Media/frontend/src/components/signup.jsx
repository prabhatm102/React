import Joi from "joi-browser";
import React from "react";
import { Redirect } from "react-router-dom";
import useForm from "../hooks/useForm";
import auth from "../services/authService";
import { saveUser } from "../services/userService";
import Input from "./common/input";

const Signup = () => {
  const schema = {
    name: Joi.string().required().min(3).label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(8).max(16).label("Password"),
    file: Joi.any().required().label("Image"),
  };
  const doSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("file", data.file);

      const response = await saveUser(formData);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 409) {
        const errorMessage = { ...errors };
        errorMessage.email = ex.response.data;
        setErrors(errorMessage);
      }
    }
  };
  const { data, handleChange, validate, handleSubmit, errors, setErrors } =
    useForm(schema, doSubmit);
  // const [data, setData] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   file: undefined,
  // });
  // const [errors, setErrors] = useState({});

  // const validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   const singleSchema = {
  //     [name]: schema[name],
  //   };

  //   const { error } = Joi.validate(obj, singleSchema);
  //   return error ? error.details[0].message : null;
  // };
  // const handleChange = (input) => {
  //   const allErrors = { ...errors };
  //   const errorMessage = validateProperty(input);
  //   if (errorMessage) allErrors[input.name] = errorMessage;
  //   else delete allErrors[input.name];

  //   setErrors(allErrors);

  //   const newData = { ...data };

  //   if (input.files && input.files.length > 0) {
  //     const allowedExt = [
  //       "image/png",
  //       "image/jpeg",
  //       "image/vnd.microsoft.icon",
  //     ];
  //     if (allowedExt.indexOf(input.files[0].type) === -1) {
  //       allErrors.file = "Please upload only .png/.jpg/.jpeg/.ico images.";
  //       setErrors(allErrors);
  //       data.file = undefined;
  //       return;
  //     }
  //     newData[input.name] = input.files[0];
  //   } else newData[input.name] = input.value;
  //   setData(newData);
  // };
  // const validate = () => {
  //   const options = { abortEarly: false };
  //   const { error } = Joi.validate(data, schema, options);

  //   if (!error) return null;
  //   const errors = {};

  //   for (let item of error.details) errors[item.path[0]] = item.message;
  //   return errors;
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const errors = validate();
  //   setErrors(errors || {});
  //   if (errors) return;
  //   doSubmit();
  // };

  return (
    <div className="row shadow p-3 mb-5 bg-body rounded offset-3 col-6">
      {auth.getCurrentUser() && <Redirect to="/" />}
      <h1 className="offset-3 col-6 text-center">Sign Up </h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Input
          type="text"
          label="Name"
          name="name"
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          type="email"
          label="Email"
          name="email"
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          type="file"
          label="Profile picture"
          name="file"
          onChange={handleChange}
          error={errors.file}
        />
        <div className="offset-3 col-6 my-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={validate()}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
