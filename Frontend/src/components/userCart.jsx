import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useCart } from "../context/CartContext";
import { axiosInstanceBook } from "../utils/axiosInstance";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const UserCart = () => {
  const { cartItems, removeFromCart } = useCart();

  const handleBorrowClick = (book) => {
    axiosInstanceBook
      .get(`/${book.bookId}/borrow`)
      .then((response) => {
        console.log("Book borrowed successfully:", response);
        toast.success("Successfully borrowed");
        removeFromCart(book);
      })
      .catch((error) => {
        toast.error("This book is unavailable right now");
        console.error("Error borrowing the book:", error);
      });
  };

  const handleReserveClick = (book) => {
    axiosInstanceBook
      .get(`/${book.bookId}/reserve`)
      .then((response) => {
        console.log("Book borrowed successfully:", response);
        toast.success("Successfully reserved");
        removeFromCart(book);
      })
      .catch((error) => {
        toast.error("This book is available. You can borrow");
        console.error("Error borrowing the book:", error);
      });
  };

  const handleRemoveFromCart = (book) => {
    removeFromCart(book);
  };

  return (
    <div>
      <h1 className="text-center my-4">
        {cartItems.length > 0 ? "Your Cart" : "Your Cart is Empty"}
      </h1>
      <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {cartItems.map((book) => (
            <Card key={book.bookId} className="mb-4" style={{ width: "18rem" }}>
              <Image
                src={book.url}
                alt={book.title}
                fluid
                style={{ height: "15rem" }}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>Author: {book.author}</Card.Text>
                <Button
                  variant="primary"
                  className="mr-2"
                  onClick={() => handleBorrowClick(book)}
                >
                  Borrow
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleReserveClick(book)}
                >
                  Reserve
                </Button>
                {/* <Button
                  variant="danger"
                  onClick={() => handleRemoveFromCart(book)}
                >
                  Remove
                </Button> */}
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default UserCart;
