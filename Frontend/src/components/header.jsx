import { Link, useNavigate, NavLink } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import AddToCart from "./BookCart";
import { Button, Dropdown } from "react-bootstrap";
import "../css/navbar.css";
import { useState } from "react";

const Header = () => {
  // const navigate = useNavigate();
  // const token = localStorage.getItem("token");
  // const role = localStorage.getItem("role");

  // return (
  //   <div className="Navbar">
  //     <div className="Navbar-child">
  //       <Link to="/">Home</Link>
  //       {token && role === "CUSTOMER" && (
  //         <>
  //           {/* <Link to="/users/profile">Profile</Link>
  //           <Link to="/users">User List</Link>
  //           <Link to="/user/search">Search User</Link> */}
  //         </>
  //       )}
  //       {token && role === "ADMIN" && (
  //         <>
  //           <Link to="/books">Book Management</Link>
  //           <Link to="/users/all">UserList</Link>
  //         </>
  //       )}
  //     </div>

  //     <div className="Navbar-auth">
  //       <AddToCart />
  //       {!token ? ( // Check if the user is logged in
  //         <>
  //           <NavLink to="/register" activeClassName="active-link">
  //             Register
  //           </NavLink>
  //           <NavLink to="/login" activeClassName="active-link">
  //             Login
  //           </NavLink>
  //         </>
  //       ) : (
  //         <Dropdown>
  //           {" "}
  //           {/* Use the Dropdown component */}
  //           <Dropdown.Toggle variant="success" id="dropdown-basic">
  //             My Account
  //           </Dropdown.Toggle>
  //           <Dropdown.Menu>
  //             <Dropdown.Item href="/users/profile">My Profile</Dropdown.Item>
  //             <Dropdown.Item href="/borrow">My Order</Dropdown.Item>
  //             <Dropdown.Divider />
  //             <Dropdown.Item
  //               onClick={() => {
  //                 localStorage.removeItem("token");
  //                 navigate("/login");
  //               }}
  //             >
  //               Logout
  //             </Dropdown.Item>
  //           </Dropdown.Menu>
  //         </Dropdown>
  //       )}
  //     </div>
  //   </div>
  // );

  //   const navigate = useNavigate();
  //   const token = localStorage.getItem("token");
  //   const role = localStorage.getItem("role");

  //   return (
  //     <div className="Navbar">
  //       <div className="Navbar-child">
  //         <Link to="/">Online Book Library</Link>
  //         {token && role === "CUSTOMER" && (
  //           <>{/* Add more navigation links for customers */}</>
  //         )}
  //         {token && role === "ADMIN" && (
  //           <>
  //             <Link to="/books">ADMIN</Link>
  //             <Link to="/users">User List</Link>
  //             <Link to="/books/all">Book List</Link>
  //           </>
  //         )}
  //       </div>

  //       <div className="Navbar-auth">
  //         <AddToCart />
  //         {!token ? (
  //           <>
  //             <Link to="/register" activeClassName="active-link">
  //               Register
  //             </Link>
  //             <NavLink to="/login" activeClassName="active-link">
  //               Login
  //             </NavLink>
  //           </>
  //         ) : ({role === "CUSTOMER" && (<Dropdown className="custom-dropdown">
  //         <Dropdown.Toggle variant="success" id="dropdown-basic">
  //           User Account
  //         </Dropdown.Toggle>
  //         <Dropdown.Menu>
  //            (
  //             <Dropdown.Item as={Link} to="/users/profile">
  //               My Profile
  //             </Dropdown.Item>
  //           )

  //           {/* <Dropdown.Item as={Link} to="/borrow">
  //             Current Borrowed Books
  //           </Dropdown.Item> */}
  //           <Dropdown.Divider />
  //           <Dropdown.Item
  //             onClick={() => {
  //               localStorage.removeItem("token");
  //               navigate("/login");
  //             }}
  //           >
  //             Logout
  //           </Dropdown.Item>
  //         </Dropdown.Menu>
  //       </Dropdown>)})

  // }
  //       </div>
  //     </div>
  //   );

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <div className="Navbar">
      <div className="Navbar-child">
        <Link to="/">Online Book Library</Link>
        {token && role === "CUSTOMER" && (
          <>{/* Add more navigation links for customers */}</>
        )}
        {token && role === "ADMIN" && (
          <>
            <Link to="/books">ADMIN</Link>
            <Link to="/users">User List</Link>
            <Link to="/books/all">Book List</Link>
          </>
        )}
      </div>

      <div className="Navbar-auth">
        <AddToCart />
        {!token ? (
          <>
            <Link to="/register" activeClassName="active-link">
              Register
            </Link>
            <NavLink to="/login" activeClassName="active-link">
              Login
            </NavLink>
          </>
        ) : (
          role === "CUSTOMER" && (
            <Dropdown className="custom-dropdown">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                User Account
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/users/profile">
                  My Profile
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        )}
        {token && role === "ADMIN" && (
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
