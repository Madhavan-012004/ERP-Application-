package com.campusos.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "buses")
public class Bus extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private String id = UUID.randomUUID().toString();

    @Column(nullable = false, unique = true)
    private String registrationNumber; // e.g. DL-01-AB-1234

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id", nullable = true)
    private BusRoute route;

    @Column(nullable = false)
    private int capacity;

    @Column(nullable = false)
    private int fuelLevel; // 0-100 percentage

    @Column(nullable = false)
    private String status; // ACTIVE, INACTIVE, MAINTENANCE

    private LocalDate lastServiceDate;
}
