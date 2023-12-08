import { useState, useEffect } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { axiosInstance } from "../utils/axiosInstance";

const BorrowedHistory = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const userId = localStorage.getItem("userId");
  console.log("userId is : ", userId);

  const getAllBorrowedBooks = async () => {
    try {
      const response = await axiosInstance.get(`/${userId}/books`);
      setBorrowedBooks(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBorrowedBooks();
  }, []);

  return (
    <div>
      <h1>Borrowed Books</h1>
      <Row xs={1} md={2} lg={4} className="g-4">
        {borrowedBooks.map((book) => (
          <Card key={book.bookId} className="mb-4">
            <Card.Body>
              <Card.Img variant="top" src={book.url} alt={book.title} />{" "}
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>Author: {book.author}</Card.Text>
              {book.status === "AVAILABLE" ? (
                <Button variant="success" disabled>
                  Returned
                </Button>
              ) : (
                <Button variant="danger">Borrowed</Button>
              )}
            </Card.Body>
          </Card>
        ))}
      </Row>
    </div>
  );
};

export default BorrowedHistory;
