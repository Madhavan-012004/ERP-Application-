package com.campusos.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "events")
public class Event extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private String id = UUID.randomUUID().toString();

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDate eventDate;

    @Column(nullable = false)
    private LocalTime eventTime;

    @Column(nullable = false)
    private String venue;

    @Column(nullable = false)
    private String type; // CULTURAL, ACADEMIC, SPORTS, TECHNICAL

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private int registered = 0;

    @Column(nullable = false)
    private String status; // UPCOMING, REGISTRATION_OPEN, ONGOING, COMPLETED

    @Column(columnDefinition = "TEXT")
    private String description;
}
