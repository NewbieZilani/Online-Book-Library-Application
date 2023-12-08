package com.example.Online.Book.Library.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler({BookAlreadyExistsException.class})
    public String handleBookAlreadyExistsException(String MESSAGE) {
        return MESSAGE;
    }
    @ExceptionHandler({BookIdNotFoundException.class})
    public String handleBookIdNotFoundException(String MESSAGE) {
        return MESSAGE;
    }
    @ExceptionHandler({BookNotBorrowedException.class})
    public String handleBookNotBorrowedException(String MESSAGE) {
        return MESSAGE;
    }
    @ExceptionHandler({BookNotReservedException.class})
    public String handleBookNotReservedException(String MESSAGE) {
        return MESSAGE;
    }
    @ExceptionHandler({BookReservedBeforeException.class})
    public String handleBookReservedBeforeException(String MESSAGE) {
        return MESSAGE;
    }
    @ExceptionHandler({NotAuthorizedException.class})
    public String handleNotAuthorizedException(String MESSAGE) {
        return MESSAGE;
    }
    @ExceptionHandler({UserIdNotFoundException.class})
    public String handleUserIdNotFoundException(String MESSAGE) {
        return MESSAGE;
    }
}