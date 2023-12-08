import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const DetailsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  margin: 0 auto;
  max-width: 800px;
`;

const BookInfo = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
`;

const Author = styled.p`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const InfoLabel = styled.span`
  margin-right: 5px;
`;

const BookImage = styled.img`
  max-width: 300px;
  margin-right: 20px; /* Adjusted margin to create the left side layout */
`;

const AddReviewButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

const BookDetails = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const location = useLocation();
  const {
    state: { book },
  } = location;

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1>Book Details</h1>
      </div>
      <DetailsContainer>
        <BookImage src={book.url} alt={book.title} />{" "}
        {/* Image on the left side */}
        <BookInfo>
          <Title>Title: {book.title}</Title>
          <Author>Author: {book.author}</Author>
          <Description>About: {book.about}</Description>
          <Author>
            <InfoLabel>Genre:</InfoLabel>
            {book.genre}
          </Author>
          <Author>
            <InfoLabel>Status:</InfoLabel>
            {book.status}
          </Author>
          <AddReviewButton
            onClick={() => navigate(`/book/${book?.bookId}/reviews/create`)}
          >
            Add Review
          </AddReviewButton>
        </BookInfo>
      </DetailsContainer>
    </div>
  );
};

export default BookDetails;
