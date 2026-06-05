package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CertificateDTO {
    private String id;
    @NotBlank private String studentId;
    private String studentName;
    private String admissionNumber;
    @NotBlank private String type;
    private String status;
    private LocalDate requestDate;
    private LocalDate generatedDate;
    private String remarks;
}
