import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUsers, deleteUser } from "../services/userService";
import UserTable from "./userTable";
import UserModel from "./userModel";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Users = () => {
  const [users, setUsers] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const allUsers = async () => {
      const { data } = await getUsers();
      setUsers(data);
    };
    allUsers();
  }, []);
  const handleEdit = (user) => {
    setUser(users.find((u) => u._id === user._id));
  };
  const handleDelete = async (user) => {
    const allUsers = [...users];
    try {
      //Sweet Alert...............
      const result = await MySwal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        setUsers(allUsers.filter((u) => u._id !== user._id));
        await deleteUser(user);
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error("User has already been deleted!");
      setUsers(allUsers);
    }
  };
  const handleDetails = (user) => {
    Swal.fire({
      title: "User Profile",
      text: `Name  :  ${user.name} Email : ${user.email} Status  :  ${
        user.isActive ? "Active" : "Deactive"
      }  Role  :  ${user.isAdmin ? "Admin" : "User"}`,
      imageUrl: user.file,
      imageWidth: 250,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    setUser(users.find((u) => u._id === user._id));
  };

  return (
    <div>
      {users && (
        <div>
          <UserTable
            users={users}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDetails={handleDetails}
          />
          {user && <UserModel user={user} />}
        </div>
      )}
    </div>
  );
};

export default Users;
