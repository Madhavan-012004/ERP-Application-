package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class StudentDTO {
    private String id;

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Admission number is required")
    private String admissionNumber;

    @NotBlank(message = "Grade is required")
    private String grade;

    @NotBlank(message = "Section is required")
    private String section;

    private String rollNumber;
    private LocalDate dateOfBirth;
    private String bloodGroup;
    private String guardianName;
    private String guardianPhone;
    private String address;
    private String status;
}
