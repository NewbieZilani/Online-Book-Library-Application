package com.example.Online.Book.Library.controller;

import com.example.Online.Book.Library.dto.BookBorrowingInfoDto;
import com.example.Online.Book.Library.dto.BookDto;
import com.example.Online.Book.Library.dto.BookReserveDto;
import com.example.Online.Book.Library.service.serviceImpl.BookBorrowServiceImpl;
import com.example.Online.Book.Library.service.serviceImpl.BookReserveServiceImpl;
import com.example.Online.Book.Library.service.serviceImpl.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {
    @Autowired
    private BookServiceImpl bookServiceImpl;
    @Autowired
    private BookReserveServiceImpl bookReserveServiceImpl;
    @Autowired
    private BookBorrowServiceImpl bookBorrowServiceImpl;

    @PostMapping("/books/create")
    public ResponseEntity<?> createBook(@RequestBody BookDto bookDto) {
        try {
            BookDto newBook = bookServiceImpl.createBook(bookDto);
            return new  ResponseEntity<>("The book is successfully created", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/books/update")
    public ResponseEntity<?> updateBook(@RequestBody BookDto bookDto) {
        try {
            BookDto updatedBook = bookServiceImpl.updateBook(bookDto);
            return new  ResponseEntity<>("The book is success fully updated", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/books/delete/{bookId}")
    public ResponseEntity<?> deleteBook(@PathVariable Long bookId) {
        try {
            bookServiceImpl.deleteBook(bookId);
            return new  ResponseEntity<>("The book is successfully deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/books/all")
    public ResponseEntity<?> allBooks() {
        try {
            List<BookDto> allBook = bookServiceImpl.getAllBook();
            return new  ResponseEntity<>(allBook, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/books/{bookId}/reserve")
    public ResponseEntity<?> reserveBook (@PathVariable Long bookId) {
        try {
            BookReserveDto bookReserveDto =  bookReserveServiceImpl.reserveBook(bookId);
            return new  ResponseEntity<>(bookReserveDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/books/{bookId}/cancel-reservation")
    public ResponseEntity<?> cancelReserveBook (@PathVariable Long bookId) {
        try {
            BookReserveDto cancelReserveBook =  bookReserveServiceImpl.cancelReserveBook(bookId);
            return new  ResponseEntity<>(cancelReserveBook, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/books/allReserveBook")
    public ResponseEntity<?> allReserveBookByUser () {
        try {
            List<BookReserveDto> bookReserveDto = bookReserveServiceImpl.getAllReserveBook();
            return new  ResponseEntity<>(bookReserveDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/users/{userId}/history")
    public ResponseEntity<?> userHistory(@PathVariable Long userId) {
        try {
            List<BookBorrowingInfoDto> userAllHistory = bookBorrowServiceImpl.getUserAllHistory(userId);
            return new ResponseEntity<>(userAllHistory, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
