package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransportDTO {

    @Data
    public static class BusRouteDTO {
        private String id;
        @NotBlank(message = "Route name is required")
        private String name;
        @NotBlank(message = "Driver name is required")
        private String driverName;
        private String driverPhone;
        private String distance;
        private String eta;
        private String status;
    }

    @Data
    public static class BusDTO {
        private String id;
        @NotBlank(message = "Registration number is required")
        private String registrationNumber;
        private String routeId;
        private String routeName;
        private int capacity;
        private int fuelLevel;
        private String status;
        private LocalDate lastServiceDate;
    }
}
