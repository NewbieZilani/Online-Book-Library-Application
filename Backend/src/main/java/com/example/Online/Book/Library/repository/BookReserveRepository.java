package com.example.Online.Book.Library.repository;

import com.example.Online.Book.Library.entity.BookEntity;
import com.example.Online.Book.Library.entity.BookReserveEntity;
import com.example.Online.Book.Library.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookReserveRepository extends JpaRepository<BookReserveEntity, Long> {
    List<BookReserveEntity> findAllByBookEntityAndStatus(BookEntity bookEntity, String pending);
    Optional<BookReserveEntity> findByUserEntityAndBookEntityAndStatus(UserEntity userEntity, BookEntity bookEntity, String pending);
    List<BookReserveEntity> findAllByUserEntity(UserEntity userEntity);
}