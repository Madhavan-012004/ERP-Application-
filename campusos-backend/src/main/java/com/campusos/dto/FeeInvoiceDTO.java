package com.campusos.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class FeeInvoiceDTO {
    private String id;

    @NotBlank(message = "Student ID is required")
    private String studentId;

    private String studentName; // For response
    private String admissionNumber; // For response

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than zero")
    private BigDecimal amount;

    private BigDecimal amountPaid;

    @NotNull(message = "Due date is required")
    private LocalDate dueDate;

    private String status;
    private String description;
}
