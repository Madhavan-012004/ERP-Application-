package com.campusos.service;

import com.campusos.domain.Book;
import com.campusos.domain.BookBorrow;
import com.campusos.domain.Student;
import com.campusos.dto.BookDTO;
import com.campusos.dto.BorrowDTO;
import com.campusos.repository.BookBorrowRepository;
import com.campusos.repository.BookRepository;
import com.campusos.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LibraryService {

    private final BookRepository bookRepository;
    private final BookBorrowRepository bookBorrowRepository;
    private final StudentRepository studentRepository;

    public BookDTO addBook(BookDTO dto) {
        Book book = new Book();
        book.setTitle(dto.getTitle());
        book.setAuthor(dto.getAuthor());
        book.setIsbn(dto.getIsbn());
        book.setCategory(dto.getCategory());
        book.setTotalCopies(dto.getTotalCopies());
        book.setAvailableCopies(dto.getTotalCopies());
        book = bookRepository.save(book);
        return mapBookToDto(book);
    }

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream().map(this::mapBookToDto).collect(Collectors.toList());
    }

    @Transactional
    public BorrowDTO borrowBook(BorrowDTO dto) {
        Book book = bookRepository.findById(dto.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (book.getAvailableCopies() <= 0) {
            throw new RuntimeException("No copies available for borrowing");
        }

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        BookBorrow borrow = new BookBorrow();
        borrow.setBook(book);
        borrow.setStudent(student);
        borrow.setBorrowDate(LocalDate.now());
        borrow.setDueDate(LocalDate.now().plusDays(14)); // 2-week default loan
        borrow.setStatus("BORROWED");

        // Decrement available copies
        book.setAvailableCopies(book.getAvailableCopies() - 1);
        bookRepository.save(book);

        borrow = bookBorrowRepository.save(borrow);
        return mapBorrowToDto(borrow);
    }

    @Transactional
    public BorrowDTO returnBook(String borrowId) {
        BookBorrow borrow = bookBorrowRepository.findById(borrowId)
                .orElseThrow(() -> new RuntimeException("Borrow record not found"));

        borrow.setReturnDate(LocalDate.now());
        borrow.setStatus("RETURNED");

        // Increment available copies
        Book book = borrow.getBook();
        book.setAvailableCopies(book.getAvailableCopies() + 1);
        bookRepository.save(book);

        borrow = bookBorrowRepository.save(borrow);
        return mapBorrowToDto(borrow);
    }

    public List<BorrowDTO> getOverdueBorrows() {
        return bookBorrowRepository.findByStatus("BORROWED").stream()
                .filter(b -> b.getDueDate().isBefore(LocalDate.now()))
                .map(b -> {
                    b.setStatus("OVERDUE");
                    return mapBorrowToDto(bookBorrowRepository.save(b));
                })
                .collect(Collectors.toList());
    }

    public List<BorrowDTO> getBorrowsByStudent(String studentId) {
        return bookBorrowRepository.findByStudentId(studentId).stream()
                .map(this::mapBorrowToDto)
                .collect(Collectors.toList());
    }

    private BookDTO mapBookToDto(Book entity) {
        BookDTO dto = new BookDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setAuthor(entity.getAuthor());
        dto.setIsbn(entity.getIsbn());
        dto.setCategory(entity.getCategory());
        dto.setTotalCopies(entity.getTotalCopies());
        dto.setAvailableCopies(entity.getAvailableCopies());
        return dto;
    }

    private BorrowDTO mapBorrowToDto(BookBorrow entity) {
        BorrowDTO dto = new BorrowDTO();
        dto.setId(entity.getId());
        dto.setBookId(entity.getBook().getId());
        dto.setBookTitle(entity.getBook().getTitle());
        dto.setStudentId(entity.getStudent().getId());
        dto.setStudentName(entity.getStudent().getFirstName() + " " + entity.getStudent().getLastName());
        dto.setBorrowDate(entity.getBorrowDate());
        dto.setDueDate(entity.getDueDate());
        dto.setReturnDate(entity.getReturnDate());
        dto.setStatus(entity.getStatus());
        return dto;
    }
}
