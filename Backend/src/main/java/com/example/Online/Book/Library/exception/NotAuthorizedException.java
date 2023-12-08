package com.example.Online.Book.Library.exception;

public class NotAuthorizedException extends Exception{
    public NotAuthorizedException(String MESSAGE) {
        super(MESSAGE);
    }
}