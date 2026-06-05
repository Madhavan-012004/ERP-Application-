package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BorrowDTO {
    private String id;
    @NotBlank private String bookId;
    private String bookTitle;
    @NotBlank private String studentId;
    private String studentName;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private String status;
}
