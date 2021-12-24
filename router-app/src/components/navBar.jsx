import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <li>
        <Link to="/posts/2021/12">Posts</Link>
      </li>
      <li>
        <Link to="/admin">Dashboard</Link>
      </li>
    </ul>
  );
};

export default NavBar;
