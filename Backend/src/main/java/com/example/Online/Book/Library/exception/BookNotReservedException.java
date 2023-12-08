package com.example.Online.Book.Library.exception;

public class BookNotReservedException extends Exception{
    public BookNotReservedException(String MESSAGE) {
        super(MESSAGE);
    }
}