package com.campusos.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "students")
public class Student extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private String id = UUID.randomUUID().toString();

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, unique = true)
    private String admissionNumber;

    @Column(nullable = false)
    private String grade; // e.g. "10", "12", "B.Tech 1st Year"

    @Column(nullable = false)
    private String section; // e.g. "A", "B"

    @Column(nullable = true)
    private String rollNumber;

    private LocalDate dateOfBirth;

    private String bloodGroup;

    private String guardianName;

    private String guardianPhone;

    private String address;

    @Column(nullable = false)
    private String status = "ACTIVE"; // ACTIVE, INACTIVE, ALUMNI
}
