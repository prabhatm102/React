import React from "react";

const Profile = ({ user }) => {
  return (
    <div>
      <h1>Profile Page</h1>
      {user && (
        <>
          <h2>Name:{user.name}</h2>
          <h2>Email:{user.email}</h2>
        </>
      )}
    </div>
  );
};

export default Profile;
