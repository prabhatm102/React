import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({ users, columns }) => {
  return (
    <table className="table align-middle">
      <TableHeader columns={columns} />
      {users && <TableBody data={users} columns={columns} />}
    </table>
  );
};

export default Table;
