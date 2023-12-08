import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const BookCart = () => {
  const { cartCount, cartItems } = useCart();
  const token = localStorage.getItem("role");
  if (token === "CUSTOMER") {
    return (
      <div className="cart-icon">
        <Link to="/cart">
          <i className="fa fa-shopping-cart fa-2x"></i>
          <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
    );
  }
};

export default BookCart;
