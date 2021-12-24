import React, { Component } from "react";

export default class ProductDetails extends Component {
  handleSave = () => {
    // this.props.history.push("/products");
    this.props.history.replace("/products");
  };
  render() {
    return (
      <div>
        <h1>Product-{this.props.match.params.id}</h1>
        <button className="btn" onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}
