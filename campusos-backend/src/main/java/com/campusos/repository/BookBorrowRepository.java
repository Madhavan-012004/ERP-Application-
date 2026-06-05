package com.campusos.repository;

import com.campusos.domain.BookBorrow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookBorrowRepository extends JpaRepository<BookBorrow, String> {
    List<BookBorrow> findByStudentId(String studentId);
    List<BookBorrow> findByStatus(String status);
    List<BookBorrow> findByBookId(String bookId);
}
