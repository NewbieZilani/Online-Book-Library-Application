package com.example.Online.Book.Library.exception;

public class BookReservedBeforeException extends Exception{
    public BookReservedBeforeException(String MESSAGE) {
        super(MESSAGE);
    }
}