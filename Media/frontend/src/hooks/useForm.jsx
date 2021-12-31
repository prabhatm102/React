import { useState } from "react";
import Joi from "joi-browser";

export default function useForm(schema, doSubmit) {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    file: undefined,
  });
  const [errors, setErrors] = useState({});

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
    // let { name, value } = input;
    // if (input.type === "file") value = input.files[0];
    // setData({
    //   ...data,
    //   [name]: value,
    // });
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

  return {
    data,
    handleChange,
    handleSubmit,
    validate,
    errors,
    setErrors,
  };
}
