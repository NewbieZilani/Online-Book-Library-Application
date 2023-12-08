// import { useState } from "react";
// import BookForm from "./bookForm";
// import { axiosInstanceBook } from "../utils/axiosInstance";
// import { toast } from "react-toastify";
// import DeleteBookForm from "./deleteBookForm";

// const BookManagement = () => {
//   const [isCreateMode, setCreateMode] = useState(true);
//   const [bookToUpdate, setBookToUpdate] = useState(false);
//   const [showDeleteForm, setShowDeleteForm] = useState(false);

//   const handleCreate = (formData) => {
//     const bookData = {
//       title: formData.title,
//       author: formData.author,
//       genre: formData.genre,
//       about: formData.about,
//       status: formData.status,
//       url: formData.url,
//     };

//     axiosInstanceBook
//       .post("/create", bookData)
//       .then((resp) => {
//         console.log("The Response", resp);
//         toast.success("Successfully created");
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     setBookToUpdate(false);
//     setCreateMode(true);
//   };

//   const handleUpdate = (formData) => {
//     const bookData = {
//       bookId: formData.bookId,
//       title: formData.title,
//       author: formData.author,
//       genre: formData.genre,
//       about: formData.about,
//       status: formData.status,
//       url: formData.url,
//     };

//     axiosInstanceBook
//       .put("/update", bookData)
//       .then((resp) => {
//         console.log("The Response", resp);
//         toast.success("Successfully updated");
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     setCreateMode(false);
//     setBookToUpdate(true);
//   };

//   const handleEdit = (bookData) => {
//     setCreateMode(false);
//     setBookToUpdate(bookData);
//   };

//   const handleDelete = (formData) => {
//     const bookId = formData.bookId;

//     axiosInstanceBook
//       .delete(`/delete/${bookId}`)
//       .then((resp) => {
//         console.log("The Response", resp);
//         toast.success("Successfully deleted");
//         setShowDeleteForm(false);
//       })
//       .catch((error) => {
//         toast.warning("Book is not available");
//       });

//     setShowDeleteForm(true);
//   };

//   const toggleDeleteForm = () => {
//     setShowDeleteForm(!showDeleteForm);
//   };

//   return (
//     <div>
//       <h1 style={{ textAlign: "center" }}>This is for Admin</h1>
//       <div>
//         <button onClick={() => setCreateMode(true)}>Create Book</button>
//         <button onClick={() => handleEdit({})}>Update Book</button>
//         <button onClick={toggleDeleteForm}>
//           {showDeleteForm ? "Cancel Delete" : "Delete Book"}
//         </button>
//       </div>

//       {showDeleteForm ? (
//         <DeleteBookForm onSubmit={handleDelete} onCancel={toggleDeleteForm} />
//       ) : (
//         <BookForm
//           mode={isCreateMode ? "create" : "update"}
//           initialData={isCreateMode ? {} : bookToUpdate}
//           onSubmit={isCreateMode ? handleCreate : handleUpdate}
//         />
//       )}
//     </div>
//   );
// };

// export default BookManagement;

import React, { useState } from "react";
import BookForm from "./bookForm";
import { axiosInstanceBook } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import DeleteBookForm from "./deleteBookForm";

const BookManagement = () => {
  const [isCreateMode, setCreateMode] = useState(true);
  const [bookToUpdate, setBookToUpdate] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);

  const handleCreate = (formData) => {
    const bookData = {
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      about: formData.about,
      status: formData.status,
      url: formData.url,
    };

    axiosInstanceBook
      .post("/create", bookData)
      .then((resp) => {
        toast.success("Successfully created");
      })
      .catch((error) => {
        console.log(error);
      });

    setBookToUpdate(false);
    setCreateMode(true);
  };

  const handleUpdate = (formData) => {
    const bookData = {
      bookId: formData.bookId,
      title: formData.title,
      author: formData.author,
      genre: formData.genre,
      about: formData.about,
      status: formData.status,
      url: formData.url,
    };

    axiosInstanceBook
      .put("/update", bookData)
      .then((resp) => {
        toast.success("Successfully updated");
      })
      .catch((error) => {
        console.log(error);
      });

    setCreateMode(false);
    setBookToUpdate(true);
  };

  const handleEdit = (bookData) => {
    setCreateMode(false);
    setBookToUpdate(bookData);
  };

  const handleDelete = (formData) => {
    const bookId = formData.bookId;

    axiosInstanceBook
      .delete(`/delete/${bookId}`)
      .then((resp) => {
        toast.success("Successfully deleted");
        setShowDeleteForm(false);
      })
      .catch((error) => {
        toast.warning("Book is not available");
      });

    setShowDeleteForm(true);
  };

  const toggleDeleteForm = () => {
    setShowDeleteForm(!showDeleteForm);
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-primary mx-2"
          onClick={() => setCreateMode(true)}
        >
          Add Book
        </button>
        <button className="btn btn-info mx-2" onClick={() => handleEdit({})}>
          Update Book
        </button>
        <button
          className={`btn ${
            showDeleteForm ? "btn-secondary" : "btn-danger"
          } mx-2`}
          onClick={toggleDeleteForm}
        >
          {showDeleteForm ? "Cancel Delete" : "Delete Book"}
        </button>
      </div>

      {showDeleteForm ? (
        <DeleteBookForm onSubmit={handleDelete} onCancel={toggleDeleteForm} />
      ) : (
        <BookForm
          mode={isCreateMode ? "create" : "update"}
          initialData={isCreateMode ? {} : bookToUpdate}
          onSubmit={isCreateMode ? handleCreate : handleUpdate}
        />
      )}
    </div>
  );
};

export default BookManagement;
