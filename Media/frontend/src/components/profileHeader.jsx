import React from "react";

export default function ProfileHeader({ user }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="profile-header text-center">
            <img
              src={"http://192.168.1.29:5000/uploads/" + user.file}
              className="img-fluid rounded-start img-thumbnail h-25 w-30 mx-auto d-block"
              alt="userDetails"
            />
            <h1>{user.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
