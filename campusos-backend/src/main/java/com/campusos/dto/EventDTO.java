package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class EventDTO {
    private String id;
    @NotBlank private String title;
    @NotNull private LocalDate eventDate;
    @NotNull private LocalTime eventTime;
    @NotBlank private String venue;
    @NotBlank private String type;
    private int capacity;
    private int registered;
    private String status;
    private String description;
}
