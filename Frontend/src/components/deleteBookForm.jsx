import { useState } from "react";

const DeleteBookForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ bookId: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <h1>Delete Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="bookId">Book ID:</label>
          <input
            type="number"
            name="bookId"
            value={formData.bookId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Delete Book</button>
      </form>
    </div>
  );
};

export default DeleteBookForm;
