//import ProductDetails from "./productDetails";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class products extends Component {
  state = {
    products: [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
      { id: 3, name: "Product 3" },
    ],
  };
  render() {
    return (
      <ul>
        <h1>Products</h1>
        {this.state.products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    );
  }
}
