import { Route, Routes } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./components/home.jsx";
import RegistrationPage from "./components/register.jsx";
import LoginPage from "./components/login.jsx";
import UserCart from "./components/UserCart.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import BorrowedBooks from "./components/borrowedBooks.jsx";
import BookManagement from "./components/bookManagement.jsx";
import NotFoundPage from "./components/notFoundPage.jsx";
import Header from "./components/header.jsx";
import Authenticate from "./components/Authenticate";
import UserList from "./components/userList.jsx";
import Profile from "./components/userProfile.jsx";
import BookDetails from "./components/bookDetails.jsx";
import BookList from "./components/bookList.jsx";
import ReviewForm from "./components/bookReview.jsx";

function App() {
  return (
    <div>
      <CartProvider>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" exact element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route element={<Authenticate expectedRole="CUSTOMER" />}>
            <Route path="/users/profile" element={<Profile />} />
            <Route path="/borrow" element={<BorrowedBooks />} />
            <Route path="/cart" element={<UserCart />} />
            <Route
              path="/book/:bookId/reviews/create"
              element={<ReviewForm />}
            />
          </Route>

          <Route element={<Authenticate expectedRole="ADMIN" />}>
            {/* <Route path="/book/:bookId/update" element={<UpdateBook />} /> */}
            <Route path="books" element={<BookManagement />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/books/all" element={<BookList />} />
            {/* <Route path="/users/:userId" element={<UserDetails />} /> */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          pauseOnHover={false}
          transition={Zoom}
        />
      </CartProvider>
    </div>
  );
}

export default App;
