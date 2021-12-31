import React from "react";
import Table from "./common/table";

const UserTable = ({ users, onEdit, onDelete, onDetails }) => {
  const columns = [
    {
      key: "file",
      content: (user) => (
        <img
          src={user.file}
          height="30"
          width="30"
          alt="user icon"
          className="img-fluid img-thumbnail"
        />
      ),
    },
    { path: "name", label: "Name" },
    { path: "email", label: "Email" },
    { path: "isActive", label: "Active" },
    { path: "isAdmin", label: "Admin" },
    {
      key: "edit",
      content: (user) => (
        <button
          onClick={() => onEdit(user)}
          className="btn btn-sm btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#updateUser"
        >
          Edit
        </button>
      ),
    },
    {
      key: "delete",
      content: (user) => (
        <button
          onClick={() => onDelete(user)}
          className="btn btn-sm btn-danger"
        >
          Delete
        </button>
      ),
    },
    {
      key: "view",
      content: (user) => (
        <button
          onClick={() => onDetails(user)}
          className="btn btn-sm btn-primary"
          // data-bs-toggle="modal"
          //  data-bs-target="#userDetails"
        >
          View
        </button>
      ),
    },
  ];
  return (
    <div>
      <div className="table-responsive shadow p-3 mb-5 bg-body rounded">
        {users && <Table users={users} columns={columns} />}
      </div>
    </div>
  );
};

export default UserTable;
