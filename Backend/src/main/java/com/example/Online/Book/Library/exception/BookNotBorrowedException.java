package com.example.Online.Book.Library.exception;

public class BookNotBorrowedException extends Exception{
    public BookNotBorrowedException(String MESSAGE) {
        super(MESSAGE);
    }
}