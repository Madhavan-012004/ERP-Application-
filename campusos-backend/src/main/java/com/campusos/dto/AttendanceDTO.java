package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class AttendanceDTO {
    private String id;

    @NotBlank(message = "Student ID is required")
    private String studentId;
    
    private String studentName; // Optional, useful for responses

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotBlank(message = "Status is required")
    private String status;

    private String remarks;
    private String markedBy;
}
