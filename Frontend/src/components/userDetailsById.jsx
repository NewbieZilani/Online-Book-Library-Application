const UserDetailsById = ({ userDetails }) => {
  return (
    <div className="user-details">
      <h1>User Profile</h1>
      {userDetails ? (
        <div className="div">
          <div className="user-field">
            <label>User ID</label>
            <p className="user-value">{userDetails.userId}</p>
          </div>
          <div className="user-field">
            <label>First Name</label>
            <p className="user-value">{userDetails.firstName}</p>
          </div>
          <div className="user-field">
            <label>Last Name</label>
            <p className="user-value">{userDetails.lastName}</p>
          </div>
          <div className="user-field">
            <label>Email</label>
            <p className="user-value">{userDetails.email}</p>
          </div>
          <div className="user-field">
            <label>Address</label>
            <p className="user-value">{userDetails.address}</p>
          </div>
          <div className="user-field">
            <label>Role</label>
            <p className="user-value">{userDetails.role}</p>
          </div>
        </div>
      ) : (
        <div>Loading... </div>
      )}
    </div>
  );
};

export default UserDetailsById;
