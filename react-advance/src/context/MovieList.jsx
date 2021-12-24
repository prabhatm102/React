import React, { Component } from "react";
import MovieRow from "./MovieRow";
import UserContext from "./userContext";

export default class MovieList extends Component {
  static contextType = UserContext; // use for access context outside render()
  componentDidMount() {
    console.log("context", this.context);
  }

  render() {
    return (
      <UserContext.Consumer>
        {(userContext) => (
          <div>
            MovieList{" "}
            {userContext.currentUser ? userContext.currentUser.name : ""}
            <MovieRow />
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

//MovieList.contextType = UserContext;          // use for access context outside render()
