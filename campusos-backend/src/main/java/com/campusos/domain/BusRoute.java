package com.campusos.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "bus_routes")
public class BusRoute extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private String id = UUID.randomUUID().toString();

    @Column(nullable = false)
    private String name; // e.g., "Route 1 - Connaught Place"

    @Column(nullable = false)
    private String driverName;

    @Column(nullable = false)
    private String driverPhone;

    @Column(nullable = false)
    private String distance; // e.g., "12.4 km"

    @Column(nullable = false)
    private String eta;

    @Column(nullable = false)
    private String status; // ON_ROUTE, DELAYED, COMPLETED
}
