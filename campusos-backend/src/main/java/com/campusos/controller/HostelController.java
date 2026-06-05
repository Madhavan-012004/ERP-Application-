package com.campusos.controller;

import com.campusos.dto.OutpassDTO;
import com.campusos.dto.RoomDTO;
import com.campusos.service.HostelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/hostel")
@RequiredArgsConstructor
public class HostelController {

    private final HostelService hostelService;

    @PostMapping("/rooms")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<RoomDTO> createRoom(@Valid @RequestBody RoomDTO request) {
        return new ResponseEntity<>(hostelService.createRoom(request), HttpStatus.CREATED);
    }

    @GetMapping("/rooms")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'TEACHER', 'STUDENT')")
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        return ResponseEntity.ok(hostelService.getAllRooms());
    }

    @PostMapping("/outpasses")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'STUDENT')")
    public ResponseEntity<OutpassDTO> requestOutpass(@Valid @RequestBody OutpassDTO request) {
        return new ResponseEntity<>(hostelService.createOutpassRequest(request), HttpStatus.CREATED);
    }

    @PutMapping("/outpasses/{id}/status")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<OutpassDTO> processOutpass(
            @PathVariable String id,
            @RequestParam String status) {
        return ResponseEntity.ok(hostelService.processOutpass(id, status));
    }

    @GetMapping("/outpasses/pending")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<List<OutpassDTO>> getPendingOutpasses() {
        return ResponseEntity.ok(hostelService.getPendingOutpasses());
    }
}
