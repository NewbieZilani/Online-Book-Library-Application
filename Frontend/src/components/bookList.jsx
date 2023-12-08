import React, { useEffect, useState } from "react";
import { axiosInstanceBook } from "../utils/axiosInstance"; // Make sure to import the correct axios instance
import { useTable } from "react-table";
import "../css/UserList.css";

const BookList = () => {
  const [books, setBooks] = useState([]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Book ID",
        accessor: "bookId",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Genre",
        accessor: "genre",
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstanceBook.get("/all");
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  const data = React.useMemo(() => books, [books]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div>
      <h1>Book List</h1>
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

export default BookList;
