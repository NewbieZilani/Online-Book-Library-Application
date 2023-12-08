import "../css/bookManagement.css";

import { useState, useEffect } from "react";

const BookForm = ({ mode, initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="book-form-container">
      {/* <h2>{mode === "create" ? "Create a New Book" : "Update Book"}</h2> */}
      <form onSubmit={handleSubmit}>
        {mode === "update" && (
          <div>
            <label htmlFor="bookId">Book ID</label>
            <input
              type="number"
              name="bookId"
              value={formData.bookId || ""}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            required
            placeholder="Enter the title"
          />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author || ""}
            onChange={handleChange}
            required
            placeholder="Enter the author"
          />
        </div>

        <div>
          <label htmlFor="genre">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre || ""}
            onChange={handleChange}
            required
            placeholder="Enter the genre"
          />
        </div>

        <div>
          <label htmlFor="about">About</label>
          <textarea
            name="about"
            value={formData.about || ""}
            onChange={handleChange}
            required
            placeholder="Enter a brief description"
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <input
            type="text"
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            required
            placeholder="Enter the status"
          />
        </div>

        <div>
          <label htmlFor="url">URL</label>
          <input
            type="text"
            name="url"
            value={formData.url || ""}
            onChange={handleChange}
            required
            placeholder="Enter the URL"
          />
        </div>
        <button type="submit">
          {mode === "create" ? "Add Book" : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
