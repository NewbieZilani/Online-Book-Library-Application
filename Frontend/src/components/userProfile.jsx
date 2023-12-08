import { useState, useEffect } from "react";
import UserDetailsById from "./userDetailsById";
import BorrowedBooks from "./borrowedBooks";
import BorrowedHistory from "./borrowedHistory";
import axiosInstance from "../utils/axiosInstance";
import "../css/UserProfile.css";

const UserProfile = () => {
  const [selectedSection, setSelectedSection] = useState("details");
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axiosInstance.get(`${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="user-profile">
      <div className="left-section">
        <div className="links">
          <a
            onClick={() => handleSectionChange("details")}
            className={selectedSection === "details" ? "active-link" : ""}
          >
            User Details
          </a>
          <a
            onClick={() => handleSectionChange("borrowedBooks")}
            className={selectedSection === "borrowedBooks" ? "active-link" : ""}
          >
            Current Borrowed Books
          </a>
          <a
            onClick={() => handleSectionChange("history")}
            className={selectedSection === "history" ? "active-link" : ""}
          >
            History
          </a>
          {/* <a
            onClick={() => handleSectionChange("updateDetails")}
            className={selectedSection === "updateDetails" ? "active-link" : ""}
          >
            Update User Details
          </a> */}
        </div>
      </div>
      <div className="right-section">
        {selectedSection === "details" && (
          <UserDetailsById userDetails={userDetails} />
        )}
        {selectedSection === "borrowedBooks" && <BorrowedBooks />}
        {selectedSection === "history" && <BorrowedHistory />}
        {/* {selectedSection === "updateDetails" && <UpdateUserDetails />} */}
      </div>
    </div>
  );
};

export default UserProfile;
