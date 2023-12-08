# Online Book Library Application

This project is a comprehensive Online Book Library application that combines both a backend and a frontend. The backend is built with Java Spring Boot, utilizing Spring Security for role-based authentication, and MySQL for the database. The frontend is developed using HTML, CSS, Bootstrap, and React to provide users with a rich and interactive user interface.

## Backend Features

### User Management Endpoints
1. **/user/register:** Allows users to register by providing their personal information, including first name, last name, email, password, and address.
2. **/user/login:** Users can log in using their email and password, receiving a token as a response for authentication. User email should be present in the payload data.
3. **/users/{userId}:** Retrieve user details by userId. Only users with ADMIN roles should have access to this API.
4. **/users/{userId}/books:** Retrieve the books borrowed or owned by a specific user. This endpoint can be accessed by the user to view their own books or by an ADMIN to view any user's books.
5. **/users/{userId}/borrowed-books:** Retrieve the books currently borrowed by a specific user. This endpoint can be accessed by the user to view their own borrowed books or by an ADMIN to view any user's borrowed books.

### Books Management
1. **/books/create:** This endpoint is used to add a new book to the database. Users must have the "ADMIN" role to use this API.
2. **/books/update:** Update a book's data that is already saved in the database. Users must have the "ADMIN" role to use this API.
3. **/books/delete:** Delete a book from the database. Users must have the "ADMIN" role to use this API.
4. **/books/all:** Fetch and display all the books data stored in the database. Users must have either the "ADMIN" or "CUSTOMER" role to use this API.

### Book Borrowing/Returning Endpoints
1. **/books/{bookId}/borrow:** Allow users (CUSTOMER) to borrow a book by bookId. Implement logic to track the book's availability and due date.
2. **/books/{bookId}/return:** Allow users (CUSTOMER) to return a borrowed book by bookId. Update the book's status accordingly.

### Book Reservation Endpoints (Optional)
1. **/books/{bookId}/reserve:** Allow users (CUSTOMER) to reserve a book that is currently unavailable. Implement logic to notify the user when the book becomes available.
2. **/books/{bookId}/cancel-reservation:** Allow users (CUSTOMER) to cancel a book reservation. Update the reservation status accordingly.

### Book Reviews and Ratings
1. **/books/{bookId}/reviews:** Retrieve reviews and ratings for a specific book by bookId.
2. **/books/{bookId}/reviews/create:** Allow users (CUSTOMER) to create a review and rating for a book.
3. **/books/{bookId}/reviews/{reviewId}/update:** Allow users (CUSTOMER) to update their own review and rating for a book.
4. **/books/{bookId}/reviews/{reviewId}/delete:** Allow users (CUSTOMER) to delete their own review and rating for a book.

### User History (Optional)
1. **/users/{userId}/history:** Allow users to view their borrowing history, including borrowed books, due dates, and return dates.

## Frontend Features

The frontend of the application is built using React, HTML, CSS, and Bootstrap, providing an intuitive and user-friendly interface for users to interact with the backend functionality. Users can perform the following actions from the frontend:

- Register and log in with their credentials.
- View and manage their personal information.
- Browse and search for available books in the library.
- Borrow books and track their due dates.
- Leave reviews and ratings for books.
- View their borrowing history.

## Technologies Used

### Backend
- Java Spring Boot
- Spring Security
- MySQL

### Frontend
- React
- HTML
- CSS
- Bootstrap

## Getting Started

### Backend
1. Clone the repository.
2. Configure the database connection in `application.properties`.
3. Build and run the Spring Boot application.

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies using `npm install`.
3. Start the React application with `npm start`.

## Usage
After setting up both the backend and frontend, users can access the Online Book Library application through the web interface created with React.

## Contributors
- [Zilani Mia]
