import React from "react";

const Input = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="offset-3 col-6">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.currentTarget)}
      />
      {error && <div className="m-1 text-danger">{error}</div>}
    </div>
  );
};

export default Input;
