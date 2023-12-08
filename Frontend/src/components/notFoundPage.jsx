const NotFoundPage = () => {
  const notFoundStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 100px)",
    background: "#f4f4f4",
  };

  const headingStyle = {
    fontSize: "2rem",
    color: "#333",
  };

  return (
    <div style={notFoundStyle}>
      <h2 style={headingStyle}>404! Page Not Found</h2>
    </div>
  );
};

export default NotFoundPage;
