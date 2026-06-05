package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class BookDTO {
    private String id;
    @NotBlank private String title;
    @NotBlank private String author;
    private String isbn;
    @NotBlank private String category;
    private int totalCopies;
    private int availableCopies;
}
