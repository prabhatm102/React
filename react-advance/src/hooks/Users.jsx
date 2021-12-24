import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(data);
      } catch (ex) {}
    };
    fetchUsers();
  });
  return (
    <Fragment>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Users;
