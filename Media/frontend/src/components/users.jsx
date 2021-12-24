import React, { useState, useEffect } from "react";
import http from "../services/htttpServices";
import UserTable from "./userTable";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await http.get("/users");
      setUsers(data);
    };
    getUsers();
  }, []);
  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleDetails = () => {};

  return (
    <div>
      <UserTable
        users={users}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onDetails={handleDetails}
      />
    </div>
  );
};

export default Users;
