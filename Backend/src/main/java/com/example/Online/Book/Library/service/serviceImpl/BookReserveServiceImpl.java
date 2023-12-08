package com.example.Online.Book.Library.service.serviceImpl;

import com.example.Online.Book.Library.constants.AppConstants;
import com.example.Online.Book.Library.dto.BookDto;
import com.example.Online.Book.Library.dto.BookReserveDto;
import com.example.Online.Book.Library.entity.BookEntity;
import com.example.Online.Book.Library.entity.BookReserveEntity;
import com.example.Online.Book.Library.entity.UserEntity;
import com.example.Online.Book.Library.exception.*;
import com.example.Online.Book.Library.repository.BookRepository;
import com.example.Online.Book.Library.repository.BookReserveRepository;
import com.example.Online.Book.Library.repository.BorrowBookRepository;
import com.example.Online.Book.Library.repository.UserRepository;
import com.example.Online.Book.Library.service.BookBorrowService;
import com.example.Online.Book.Library.service.BookReserveService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookReserveServiceImpl implements BookReserveService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private  UserRepository userRepository;
    @Autowired
    private  BookReserveRepository bookReserveRepository;
    @Autowired
    private  BorrowBookRepository bookBorrowRepository;

    @Override
    public BookReserveDto reserveBook(Long bookId) throws Exception{
        UserEntity userEntity = getCurrentUser();
        BookEntity bookEntity = getBookById(bookId);
        if (AppConstants.STATUS_AVAILABLE.equals(bookEntity.getStatus()))
            throw new BookAlreadyExistsException(AppConstants.BOOK_AVAILABLE);
        if (bookReserveRepository
                .findByUserEntityAndBookEntityAndStatus(userEntity, bookEntity, AppConstants.STATUS_PENDING)
                .isPresent()
        ) throw new BookReservedBeforeException(AppConstants.BOOK_RESERVEDBYYOU);
        if (bookBorrowRepository
                .findByUserEntityAndBookEntityAndReturnDateIsNull(userEntity, bookEntity)
                .isPresent()
        ) throw new BookNotBorrowedException(AppConstants.BOOK_BORROWEDBYYOU);
        BookReserveEntity bookReserveEntity = new BookReserveEntity();
        bookReserveEntity.setBookEntity(bookEntity);
        bookReserveEntity.setUserEntity(userEntity);
        bookReserveEntity.setReserveDate(LocalDate.now());
        bookReserveEntity.setStatus(AppConstants.STATUS_PENDING);
        BookReserveEntity storeReserveDetails = bookReserveRepository.save(bookReserveEntity);
        return new ModelMapper().map(storeReserveDetails, BookReserveDto.class);
    }

    @Override
    public BookReserveDto cancelReserveBook(Long bookId) throws Exception {
        UserEntity userEntity = getCurrentUser();
        BookEntity bookEntity = getBookById(bookId);
        BookReserveEntity bookCancelReserveEntity = bookReserveRepository
                .findByUserEntityAndBookEntityAndStatus(userEntity, bookEntity, AppConstants.STATUS_PENDING)
                .orElseThrow(()-> new BookNotReservedException(AppConstants.BOOK_RESERVATION_NOTFOUND));
        bookCancelReserveEntity.setStatus(AppConstants.STATUS_CANCEL);
        return new ModelMapper().map(bookCancelReserveEntity, BookReserveDto.class);
    }

    @Override
    public List<BookReserveDto> getAllReserveBook() throws Exception{
        UserEntity userEntity = getCurrentUser();
        List<BookReserveEntity> allReserveBookEntities = bookReserveRepository.findAllByUserEntity(userEntity);//incomplete
        return allReserveBookEntities.stream()
                .map(reserveBook -> BookReserveDto.builder()
                        .bookEntity(reserveBook.getBookEntity())
                        .userId(reserveBook.getUserEntity().getUserId())
                        .build()
                )
                .collect(Collectors.toList());
    }

    private UserEntity getCurrentUser() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new Exception(AppConstants.TOKEN_INVALID));
    }

    private BookEntity getBookById(Long bookId) throws Exception {
        BookEntity bookEntity = bookRepository.findByBookId(bookId);
        if (bookEntity == null || bookEntity.getStatus().equals("DELETED")) throw new BookIdNotFoundException(AppConstants.BOOK_NOTFOUND);
        return bookEntity;
    }
}
