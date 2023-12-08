package com.example.Online.Book.Library.exception;

public class BookAlreadyExistsException extends Exception{
    public BookAlreadyExistsException(String MESSAGE) {
        super(MESSAGE);
    }
}
