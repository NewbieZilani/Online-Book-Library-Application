// import { useState, useEffect } from "react";
// import { Button, Card, Row } from "react-bootstrap";
// import { axiosInstance, axiosInstanceBook } from "../utils/axiosInstance";
// import { toast } from "react-toastify";

// const BorrowedBooks = () => {
//   const [borrowedBooks, setBorrowedBooks] = useState([]);
//   const userId = localStorage.getItem("userId");
//   console.log("userId is : ", userId);

//   const getAllBorrowedBooks = async () => {
//     try {
//       const response = await axiosInstance.get(`/${userId}/borrowed-books`);
//       setBorrowedBooks(response.data);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllBorrowedBooks();
//   }, []);

//   const returnBook = async (bookId) => {
//     try {
//       const response = await axiosInstanceBook.get(`/${bookId}/return`);
//       setBorrowedBooks((prevBooks) =>
//         prevBooks.filter((book) => book.bookId !== bookId)
//       );
//       toast.success("Successfully returned");
//       console.log("the response for return the book is : ", response);
//     } catch (error) {
//       console.log("Error returning the book:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Borrowed Books</h1>
//       <Row xs={1} md={2} lg={4} className="g-4">
//         {borrowedBooks.map((book) => (
//           <Card key={book.bookId} className="mb-4">
//             <Card.Body>
//               <Card.Title>{book.title}</Card.Title>
//               <Card.Text>Author: {book.author}</Card.Text>
//               <Button variant="danger" onClick={() => returnBook(book.bookId)}>
//                 Return
//               </Button>
//             </Card.Body>
//           </Card>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default BorrowedBooks;

import { useState, useEffect } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { axiosInstance, axiosInstanceBook } from "../utils/axiosInstance";
import { toast } from "react-toastify";

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const userId = localStorage.getItem("userId");
  console.log("userId is : ", userId);

  const getAllBorrowedBooks = async () => {
    try {
      const response = await axiosInstance.get(`/${userId}/borrowed-books`);
      setBorrowedBooks(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBorrowedBooks();
  }, []);

  const returnBook = async (bookId) => {
    try {
      const response = await axiosInstanceBook.get(`/${bookId}/return`);
      setBorrowedBooks((prevBooks) =>
        prevBooks.filter((book) => book.bookId !== bookId)
      );
      toast.success("Successfully returned");
      console.log("the response for return the book is : ", response);
    } catch (error) {
      console.log("Error returning the book:", error);
    }
  };

  return (
    <div>
      <h1>Borrowed Books</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {borrowedBooks.map((book) => (
          <Card key={book.bookId} className="mb-4">
            <Card.Img variant="top" src={book.url} alt={book.title} />{" "}
            {/* Book Image */}
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Author: {book.author}</Card.Text>
              <Button variant="danger" onClick={() => returnBook(book.bookId)}>
                Return
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default BorrowedBooks;
