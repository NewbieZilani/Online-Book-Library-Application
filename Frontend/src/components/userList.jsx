import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useTable } from "react-table";
import "../css/UserList.css";

const UserList = () => {
  const [allUser, setAllUser] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "userId",
      },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Role",
        accessor: "role",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/all");
        setAllUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const data = React.useMemo(() => allUser, [allUser]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div>
      <h1>User List</h1>
      <table {...getTableProps()} className="table table-responsive">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
