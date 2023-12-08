import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"; // Import the Button component
import "../css/addToCart.css";
import { axiosInstanceBook } from "../utils/axiosInstance";
import { useCart } from "../context/CartContext";

const AllBook = () => {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [bookInCart, setBookInCart] = useState({});
  const role = localStorage.getItem("role");
  const getAllBooks = async () => {
    try {
      const response = await axiosInstanceBook.get("/all");
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  // Create a function to check if a book is in the cart
  const isBookInCart = (book) => {
    return cartItems.some((item) => item.bookId === book.bookId);
  };

  return (
    <div>
      <Container>
        <h1 className="text-center mt-4">Online Book Library</h1>
        <Row xs={1} md={2} lg={4} className="g-4">
          {data.map((book) => (
            <Card key={book.bookId} className="mb-4" style={{ width: "15rem" }}>
              <div className="image-container">
                <Image
                  src={book.url}
                  alt={book.title}
                  fluid
                  style={{ width: "14rem", height: "15rem" }}
                />
                {role === "CUSTOMER" && (
                  <div className="add-to-cart-button">
                    <Card.Link
                      href="#"
                      className="add-to-cart"
                      onClick={() => {
                        if (!isBookInCart(book)) {
                          addToCart(book);
                          setBookInCart((prev) => ({
                            ...prev,
                            [book.bookId]: true,
                          }));
                        }
                      }}
                      disabled={isBookInCart(book)}
                    >
                      {isBookInCart(book) ? "Added to Cart" : "Add to Cart"}
                    </Card.Link>
                  </div>
                )}
              </div>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>Author: {book.author}</Card.Text>
                <Card.Link
                  href={`/books/${book.bookId}`}
                  onClick={() =>
                    navigate(`/books/${book.bookId}`, { state: { book } })
                  }
                >
                  <Button>See Book Details</Button>
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default AllBook;
