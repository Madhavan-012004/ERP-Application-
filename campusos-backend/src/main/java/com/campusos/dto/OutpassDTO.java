package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OutpassDTO {
    private String id;

    @NotBlank(message = "Student ID is required")
    private String studentId;

    private String studentName; // For response
    
    @NotNull(message = "From Date is required")
    private LocalDateTime fromDate;

    @NotNull(message = "To Date is required")
    private LocalDateTime toDate;

    @NotBlank(message = "Reason is required")
    private String reason;

    private String status;
}
