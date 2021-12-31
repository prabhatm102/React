import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light m-2 shadow-sm p-3 mb-5 rounded"
      style={{
        backgroundColor: "#e0dfff",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Media
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Sign Up
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {user && user.isAdmin && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                </li>
              </React.Fragment>
            )}
          </ul>
          {user && (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item my-2">
                <NavLink className="nav-link" to="/conversation">
                  Chats
                </NavLink>
              </li>
              <li className="nav-item">
                <div className="dropdown ">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    to="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      src={
                        user && process.env.REACT_APP_USER_IMAGE_URL + user.file
                      }
                      className="img-fluid rounded-start img-thumbnail m-2"
                      alt="userDetails"
                      height="25"
                      width="25"
                    />
                    {user.name}
                  </NavLink>

                  <ul
                    className="dropdown-menu w-25"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li className="nav-item">
                      <NavLink className="nav-link  text-center" to="/profile">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link text-white text-center bg-danger"
                        to="/logout"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
