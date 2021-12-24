import React, { useContext } from "react";
import UserContext from "./userContext";

const Logout = () => {
  const userContext = useContext(UserContext);
  return (
    <div>
      <button onClick={() => userContext.onLoggedOut("username")}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
