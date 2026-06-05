package com.campusos.controller;

import com.campusos.dto.TransportDTO;
import com.campusos.service.TransportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transport")
@RequiredArgsConstructor
public class TransportController {

    private final TransportService transportService;

    @PostMapping("/routes")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<TransportDTO.BusRouteDTO> createRoute(@Valid @RequestBody TransportDTO.BusRouteDTO request) {
        return new ResponseEntity<>(transportService.createRoute(request), HttpStatus.CREATED);
    }

    @GetMapping("/routes")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'TEACHER', 'STUDENT', 'PARENT')")
    public ResponseEntity<List<TransportDTO.BusRouteDTO>> getAllRoutes() {
        return ResponseEntity.ok(transportService.getAllRoutes());
    }

    @PostMapping("/buses")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<TransportDTO.BusDTO> addBus(@Valid @RequestBody TransportDTO.BusDTO request) {
        return new ResponseEntity<>(transportService.addBus(request), HttpStatus.CREATED);
    }

    @GetMapping("/buses")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<List<TransportDTO.BusDTO>> getAllBuses() {
        return ResponseEntity.ok(transportService.getAllBuses());
    }
}
