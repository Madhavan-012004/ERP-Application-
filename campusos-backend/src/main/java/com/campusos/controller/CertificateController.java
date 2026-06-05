package com.campusos.controller;

import com.campusos.dto.CertificateDTO;
import com.campusos.service.CertificateService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/certificates")
@RequiredArgsConstructor
public class CertificateController {

    private final CertificateService certificateService;

    @PostMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'STUDENT', 'PARENT')")
    public ResponseEntity<CertificateDTO> requestCertificate(@Valid @RequestBody CertificateDTO request) {
        return new ResponseEntity<>(certificateService.requestCertificate(request), HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<List<CertificateDTO>> getAllCertificates() {
        return ResponseEntity.ok(certificateService.getAllCertificates());
    }

    @GetMapping("/pending")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<List<CertificateDTO>> getPending() {
        return ResponseEntity.ok(certificateService.getPendingCertificates());
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'STUDENT', 'PARENT')")
    public ResponseEntity<List<CertificateDTO>> getStudentCertificates(@PathVariable String studentId) {
        return ResponseEntity.ok(certificateService.getStudentCertificates(studentId));
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<CertificateDTO> approve(@PathVariable String id) {
        return ResponseEntity.ok(certificateService.approveCertificate(id));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<CertificateDTO> reject(@PathVariable String id, @RequestParam String remarks) {
        return ResponseEntity.ok(certificateService.rejectCertificate(id, remarks));
    }
}
