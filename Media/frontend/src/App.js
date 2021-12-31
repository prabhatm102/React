import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import NavBar from "./components/navBar";
import Home from "./components/home";
import Profile from "./components/profile";
import Users from "./components/users";
import Conversation from "./components/conversation";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import NotFound from "./components/notFound";
import ProtectedRouteAdmin from "./components/common/protectedRouteAdmin";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);
  return (
    <React.Fragment>
      <ToastContainer />
      <NavBar user={user} />
      <main className="container">
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/logout" component={Logout} />
          <Route
            path="/"
            exact
            render={(props) => <Home {...props} user={user} />}
          />
          <Route
            path="/profile"
            render={(props) => <Profile {...props} user={user} />}
          />
          <ProtectedRouteAdmin path="/users" component={Users} />
          <Route
            path="/conversation"
            render={(props) => <Conversation {...props} user={user} />}
          />
          <Route path="/notFound" component={NotFound} />
          <Redirect to="/notFound" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
