import React from "react";
import TableHeader from "./common/tableHeader";

const UserTable = ({ users, onEdit, onDelete, onDetails }) => {
  const columns = [
    { path: "user.name", label: "Name" },
    { path: "user.email", label: "Email" },
    { path: "user.isActive", label: "Active" },
    { path: "user.isAdmin", label: "Admin" },
  ];
  return (
    <div>
      <div className="table-responsive shadow p-3 mb-5 bg-body rounded">
        <table className="table align-middle">
          <TableHeader columns={columns} />
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isActive ? (
                      <div className="alert-success badge rounded-pill">
                        Active
                      </div>
                    ) : (
                      <div className="alert-danger badge rounded-pill">
                        Dective
                      </div>
                    )}
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <div className="alert-success badge rounded-pill">
                        Yes
                      </div>
                    ) : (
                      <div className="alert-danger badge rounded-pill">No</div>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={onEdit}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={onDelete}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={onDetails}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
