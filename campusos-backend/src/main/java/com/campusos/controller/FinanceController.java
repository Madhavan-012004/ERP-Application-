package com.campusos.controller;

import com.campusos.dto.FeeInvoiceDTO;
import com.campusos.service.FinanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/finance")
@RequiredArgsConstructor
public class FinanceController {

    private final FinanceService financeService;

    @PostMapping("/invoices")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<FeeInvoiceDTO> createInvoice(@Valid @RequestBody FeeInvoiceDTO request) {
        return new ResponseEntity<>(financeService.createInvoice(request), HttpStatus.CREATED);
    }

    @PostMapping("/invoices/{id}/pay")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<FeeInvoiceDTO> recordPayment(
            @PathVariable String id,
            @RequestParam BigDecimal amount) {
        return ResponseEntity.ok(financeService.recordPayment(id, amount));
    }

    @GetMapping("/students/{studentId}/invoices")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN', 'PARENT', 'STUDENT')")
    public ResponseEntity<List<FeeInvoiceDTO>> getInvoicesByStudent(@PathVariable String studentId) {
        return ResponseEntity.ok(financeService.getInvoicesByStudent(studentId));
    }

    @GetMapping("/invoices")
    @PreAuthorize("hasAnyRole('SUPER_ADMIN', 'INSTITUTION_ADMIN')")
    public ResponseEntity<List<FeeInvoiceDTO>> getAllInvoices() {
        return ResponseEntity.ok(financeService.getAllInvoices());
    }
}
