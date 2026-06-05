package com.campusos.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "certificates")
public class Certificate extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private String id = UUID.randomUUID().toString();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(nullable = false)
    private String type; // BONAFIDE, TRANSFER, CONDUCT, STUDY, FEE_PAID

    @Column(nullable = false)
    private String status; // PENDING, APPROVED, REJECTED, READY

    private LocalDate requestDate;
    private LocalDate generatedDate;

    @Column(columnDefinition = "TEXT")
    private String remarks;
}
