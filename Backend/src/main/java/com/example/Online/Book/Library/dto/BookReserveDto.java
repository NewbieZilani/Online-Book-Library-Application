package com.example.Online.Book.Library.dto;

import com.example.Online.Book.Library.entity.BookEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookReserveDto {
    private Long reserveId;
    private Long userId;
    private BookEntity bookEntity;
    private Long bookId;
    private String status;
    private LocalDate reserveDate;
}
