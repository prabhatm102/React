import auth from "../services/authService";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import React, { useState } from "react";
import Input from "./common/input";

const Signin = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().min(8).max(16).label("Password"),
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
      await auth.login(data.email, data.password);
      const { state } = props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errorMessage = { ...errors };
        errorMessage.email = ex.response.data;
        setErrors(errorMessage);
      }
    }
  };

  return (
    <div className="row shadow p-3 mb-5 bg-body rounded offset-3 col-6">
      {auth.getCurrentUser() && <Redirect to="/" />}
      <h1 className="offset-3 col-6 text-center">Sign In </h1>
      <form onSubmit={handleSubmit}>
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
        <div className="offset-3 col-6 my-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={validate()}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
