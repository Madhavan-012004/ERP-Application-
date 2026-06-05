package com.campusos.controller;

import com.campusos.dto.BookDTO;
import com.campusos.dto.BorrowDTO;
import com.campusos.service.LibraryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/library")
@RequiredArgsConstructor
public class LibraryController {

    private final LibraryService libraryService;

    @PostMapping("/books")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<BookDTO> addBook(@Valid @RequestBody BookDTO request) {
        return new ResponseEntity<>(libraryService.addBook(request), HttpStatus.CREATED);
    }

    @GetMapping("/books")
    public ResponseEntity<List<BookDTO>> getAllBooks() {
        return ResponseEntity.ok(libraryService.getAllBooks());
    }

    @PostMapping("/borrows")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'TEACHER')")
    public ResponseEntity<BorrowDTO> borrowBook(@Valid @RequestBody BorrowDTO request) {
        return new ResponseEntity<>(libraryService.borrowBook(request), HttpStatus.CREATED);
    }

    @PutMapping("/borrows/{id}/return")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'TEACHER')")
    public ResponseEntity<BorrowDTO> returnBook(@PathVariable String id) {
        return ResponseEntity.ok(libraryService.returnBook(id));
    }

    @GetMapping("/borrows/overdue")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'TEACHER')")
    public ResponseEntity<List<BorrowDTO>> getOverdueBorrows() {
        return ResponseEntity.ok(libraryService.getOverdueBorrows());
    }

    @GetMapping("/borrows/student/{studentId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'TEACHER', 'STUDENT', 'PARENT')")
    public ResponseEntity<List<BorrowDTO>> getBorrowsByStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(libraryService.getBorrowsByStudent(studentId));
    }
}
