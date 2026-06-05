package com.campusos.repository;

import com.campusos.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {
    Optional<Book> findByIsbn(String isbn);
    List<Book> findByCategory(String category);
    List<Book> findByAvailableCopiesGreaterThan(int count);
}
