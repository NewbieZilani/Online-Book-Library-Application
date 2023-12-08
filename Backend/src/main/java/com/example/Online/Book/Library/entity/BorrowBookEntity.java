package com.example.Online.Book.Library.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "borrow-book")
public class BorrowBookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long borrowId;

    @ManyToOne
    @JoinColumn(name = "bookId")
    private BookEntity bookEntity;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserEntity userEntity;

    private LocalDate borrowDate;
    private LocalDate returnDate = null;
    private LocalDate dueDate;
    private String url;
    //Incomplete
}
