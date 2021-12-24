import React, { Component } from "react";

export default class Counter extends Component {
  state = { count: 0 };
  setCount = (count) => {
    this.setState({ count });
  };
  render() {
    return (
      <div>
        Count:{this.state.count}
        <br />
        <button onClick={() => this.setCount(this.state.count + 1)}>
          Increase Class
        </button>
      </div>
    );
  }
}
