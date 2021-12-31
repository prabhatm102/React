import React from "react";
import _ from "lodash";
import auth from "../../services/authService";

const TableBody = ({ data, columns }) => {
  const renderCells = (item, column) => {
    if (
      column.content &&
      item.isAdmin &&
      item._id !== auth.getCurrentUser()._id &&
      column.key !== "file"
    )
      return;

    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };
  const createKey = (item, column) => {
    return item._id + (column.key || column.path);
  };
  return (
    <tbody>
      {data &&
        data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>
                {(renderCells(item, column) === true && (
                  <div className="alert-success badge rounded-pill">Yes</div>
                )) ||
                  (renderCells(item, column) === false && (
                    <div className="alert-danger badge rounded-pill">No</div>
                  )) ||
                  renderCells(item, column)}
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
};

export default TableBody;
