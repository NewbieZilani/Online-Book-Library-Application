import { useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/registration.css";

const RegistrationForm = () => {
  const navigate = useNavigate();

  //const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [isRegistrationDone, setIsRegistrationDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();

    if (!firstName) {
      setErrors({
        ...errors,
        firstName: "First name is required",
      });
      return;
    }

    if (!lastName) {
      setErrors({
        ...errors,
        lastName: "Last name is required",
      });
      return;
    }

    if (!email) {
      setErrors({
        ...errors,
        email: "Email is required",
      });
      return;
    }

    if (!password) {
      setErrors({
        ...errors,
        password: "Password is required",
      });
      return;
    }

    if (!address) {
      setErrors({
        ...errors,
        address: "Address is required",
      });
      return;
    }

    if (!role) {
      setErrors({
        ...errors,
        role: "Role is required",
      });
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      password,
      address,
      role,
    };

    setIsLoading(true);

    axiosInstance
      .post("/register", data)
      .then((resp) => {
        console.log(data);
        console.log("The Response", resp);
        setIsRegistrationDone(true);
        toast.success("Registration Done. Please login for visit this site");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error is ", error.response.status);
        if (error.response.status == 400) {
          toast.warn("You are already registered. Please login.");
        } else {
          setError(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="register-form">
      <h1>Registration</h1>
      {isRegistrationDone && (
        <h2 style={{ color: "green" }}>Successfully Done Registration</h2>
      )}
      {isLoading && <h1>Loading.....</h1>}
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <h4>First Name</h4>
          <input
            value={firstName}
            placeholder="Enter First Name"
            type="text"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          {errors.firstName && (
            <p style={{ color: "red" }}>{errors.firstName}</p>
          )}
        </div>

        <div className="form-group">
          <h4>Last Name</h4>
          <input
            value={lastName}
            placeholder="Enter Last Name"
            type="text"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          {errors.lastName && <p style={{ color: "red" }}>{errors.lastName}</p>}
        </div>

        <div className="form-group">
          <h4>Email</h4>
          <input
            value={email}
            placeholder="Enter Email"
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errors.email && <p style={{ color: "red" }}> {errors.email}</p>}
        </div>

        <div className="form-group">
          <h4>Enter Password</h4>
          <input
            value={password}
            placeholder="Enter Password"
            type="text"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {errors.password && (
            <p style={{ color: "red" }}> {errors.password}</p>
          )}
        </div>

        <div className="form-group">
          <h4>Current Address</h4>
          <input
            value={address}
            placeholder="Address"
            type="text"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        </div>

        <div className="form-group">
          <h4>User Role</h4>
          <select
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {errors.role && <p style={{ color: "red" }}>{errors.role}</p>}
        </div>

        <button className="button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
