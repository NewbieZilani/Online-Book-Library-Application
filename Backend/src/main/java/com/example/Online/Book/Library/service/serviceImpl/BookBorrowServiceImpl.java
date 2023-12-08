package com.example.Online.Book.Library.service.serviceImpl;

import com.example.Online.Book.Library.constants.AppConstants;
import com.example.Online.Book.Library.dto.BookBorrowingInfoDto;
import com.example.Online.Book.Library.dto.BookDto;
import com.example.Online.Book.Library.dto.BorrowBookDto;
import com.example.Online.Book.Library.entity.BookBorrowingEntity;
import com.example.Online.Book.Library.entity.BookEntity;
import com.example.Online.Book.Library.entity.BorrowBookEntity;
import com.example.Online.Book.Library.entity.UserEntity;
import com.example.Online.Book.Library.exception.BookIdNotFoundException;
import com.example.Online.Book.Library.exception.BookNotBorrowedException;
import com.example.Online.Book.Library.exception.NotAuthorizedException;
import com.example.Online.Book.Library.exception.UserIdNotFoundException;
import com.example.Online.Book.Library.repository.BookRepository;
import com.example.Online.Book.Library.repository.BookReserveRepository;
import com.example.Online.Book.Library.repository.BorrowBookRepository;
import com.example.Online.Book.Library.repository.UserRepository;
import com.example.Online.Book.Library.service.BookBorrowService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookBorrowServiceImpl implements BookBorrowService {
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BorrowBookRepository borrowBookRepository;

    @Autowired
    private BookReserveRepository bookReserveRepository;

    @Override
    public BorrowBookDto borrowBook(Long bookId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());
        Long userId = user.get().getUserId();

        UserEntity userEntity = userRepository.findByUserId(userId);
        BookEntity bookEntity = bookRepository.findByBookId(bookId);

        if (bookEntity == null || bookEntity.getStatus().equals("DELETED")) throw new Exception("Book not found!");
        if (bookEntity.getStatus().equals("BORROWED")) throw new Exception("Currently not available");

        BorrowBookEntity borrowBookEntity = new BorrowBookEntity();
        borrowBookEntity.setBookEntity(bookEntity);
        borrowBookEntity.setUserEntity(userEntity);
        borrowBookEntity.setBorrowDate(LocalDate.now());
        borrowBookEntity.setDueDate(LocalDate.now().plusDays(10));
        borrowBookEntity.setUrl(bookEntity.getUrl());
        bookEntity.setStatus("BORROWED");

        BorrowBookEntity borrowBook = borrowBookRepository.save(borrowBookEntity);

        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(borrowBook, BorrowBookDto.class);
    }

    @Override
    public BorrowBookDto returnBook(Long bookId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> userEntity = userRepository.findByEmail(authentication.getName());
        BookEntity bookEntity = bookRepository.findByBookId(bookId);

        if (bookEntity == null || bookEntity.getStatus().equals("DELETED")) throw new Exception("Book not found");

        BorrowBookEntity borrowBookEntity = borrowBookRepository.findByUserEntityAndBookEntityAndReturnDateIsNull(userEntity.get(), bookEntity).get();

        if (borrowBookEntity != null){
            borrowBookEntity.setReturnDate(LocalDate.now());
            bookEntity.setStatus("AVAILABLE");
            bookRepository.save(bookEntity);
            borrowBookRepository.save(borrowBookEntity);
        }
        ModelMapper modelMapper = new ModelMapper();
        return modelMapper.map(borrowBookEntity, BorrowBookDto.class);
    }

    @Override
    public List<BookEntity> getAllBookByUser(Long userId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());

        String userRole = user.get().getRole();
        Long id = user.get().getUserId();

        if (!id.equals(userId) && userRole.equals("CUSTOMER")) {
            throw new Exception("You can't access this");
        }
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) throw new Exception("User not found");

        List<BorrowBookEntity> borrowBooks = borrowBookRepository.findAllByUserEntity(userEntity);

        return borrowBooks.stream()
                .map(BorrowBookEntity::getBookEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookDto> getAllBorrowedBookByUser(Long userId) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<UserEntity> user = userRepository.findByEmail(authentication.getName());

        String userRole = user.get().getRole();
        Long id = user.get().getUserId();

        if (!id.equals(userId) && userRole.equals("CUSTOMER")) {
            throw new Exception("You can't access this");
        }
        UserEntity userEntity = userRepository.findByUserId(userId);
        if (userEntity == null) throw new Exception("User not found");

        List<BorrowBookEntity> bookBorrowings = borrowBookRepository.findAllByUserEntityAndReturnDateIsNull(userEntity);
        return bookBorrowings.stream()
                .map(bookBorrowingEntity -> new ModelMapper().map(bookBorrowingEntity.getBookEntity(), BookDto.class))
                .collect(Collectors.toList());

    }
    @Override
    public List<BookBorrowingInfoDto> getUserAllHistory(Long userId) throws Exception {
        if (!getCurrentUser().getUserId().equals(userId) && getCurrentUser().getRole().equals(AppConstants.ROLE_CUSTOMER)) {
            throw new NotAuthorizedException(AppConstants.USER_UNAUTHORIZED);
        }
        UserEntity userEntity = userRepository.findByUserId(userId);
        List<BorrowBookEntity> bookBorrowings = borrowBookRepository.findAllByUserEntity(userEntity);
        return bookBorrowings.stream()
                .map(bookBorrowingEntity -> BookBorrowingInfoDto.builder()
                        .borrowId(bookBorrowingEntity.getBorrowId())
                        .bookEntity(bookBorrowingEntity.getBookEntity())
                        .borrowDate(bookBorrowingEntity.getBorrowDate())
                        .dueDate(bookBorrowingEntity.getDueDate())
                        .returnDate(bookBorrowingEntity.getReturnDate())
                        .build()
                )
                .collect(Collectors.toList());
    }
    private UserEntity getCurrentUser() throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new Exception(AppConstants.TOKEN_INVALID));
    }
}
