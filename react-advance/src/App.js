// import Movie from "./hoc/movie";

// import Counter from "./counter";
// // import Counter2 from "./counterF";

// import Counter from "./hooks/Counter";
// import Users from "./hooks/Users";

import UserContext from "./context/userContext";
import CartContext from "./context/cartContext";
import MoviePage from "./context/MoviePage";
import Login from "./context/Login";
import Logout from "./context/Logout";
import React, { Component } from "react";
import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       {/* <Movie id={1} /> */}

//       {/* <Counter />
//       <Counter2 /> */}

//       {/* <Counter />
//       <Users /> */}

//     </div>
//   );
// }

class App extends Component {
  state = {
    currentUser: null,
  };
  handleLoggedIn = (username) => {
    console.log("Getting the user " + username);
    const user = { name: "abc" };
    this.setState({ currentUser: user });
  };
  handleLoggedOut = (username) => {
    console.log("Logging Out the user " + username);
    this.setState({ currentUser: null });
  };
  render() {
    return (
      <CartContext.Provider value={{ cart: ["Product-1"] }}>
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onLoggedIn: this.handleLoggedIn,
            onLoggedOut: this.handleLoggedOut,
          }}
        >
          <div>
            <MoviePage />
            <Login />
            <Logout />
          </div>
        </UserContext.Provider>
      </CartContext.Provider>
    );
  }
}

export default App;
