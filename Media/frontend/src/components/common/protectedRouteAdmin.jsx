import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRouteAdmin = ({
  path,
  render,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser() || !auth.getCurrentUser().isAdmin)
          return (
            <Redirect
              to={{ pathname: "/signin", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRouteAdmin;
