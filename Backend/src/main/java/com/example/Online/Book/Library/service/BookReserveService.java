package com.example.Online.Book.Library.service;

import com.example.Online.Book.Library.dto.BookReserveDto;

import java.util.List;

public interface BookReserveService {
    BookReserveDto reserveBook(Long bookId) throws Exception;
    BookReserveDto cancelReserveBook(Long bookId) throws Exception;
    List<BookReserveDto> getAllReserveBook() throws Exception;
}
