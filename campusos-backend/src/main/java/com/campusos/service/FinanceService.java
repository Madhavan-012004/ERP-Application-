package com.campusos.service;

import com.campusos.domain.FeeInvoice;
import com.campusos.domain.Student;
import com.campusos.dto.FeeInvoiceDTO;
import com.campusos.repository.FeeInvoiceRepository;
import com.campusos.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FinanceService {

    private final FeeInvoiceRepository feeInvoiceRepository;
    private final StudentRepository studentRepository;

    public FeeInvoiceDTO createInvoice(FeeInvoiceDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        FeeInvoice invoice = new FeeInvoice();
        invoice.setStudent(student);
        invoice.setTitle(dto.getTitle());
        invoice.setAmount(dto.getAmount());
        invoice.setDueDate(dto.getDueDate());
        invoice.setDescription(dto.getDescription());
        
        // Initialize values
        invoice.setAmountPaid(BigDecimal.ZERO);
        invoice.setStatus("PENDING");

        invoice = feeInvoiceRepository.save(invoice);
        return mapEntityToDto(invoice);
    }

    public FeeInvoiceDTO recordPayment(String invoiceId, BigDecimal amount) {
        FeeInvoice invoice = feeInvoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new RuntimeException("Invoice not found"));

        BigDecimal newTotalPaid = invoice.getAmountPaid().add(amount);
        invoice.setAmountPaid(newTotalPaid);

        if (newTotalPaid.compareTo(invoice.getAmount()) >= 0) {
            invoice.setStatus("PAID");
        } else if (newTotalPaid.compareTo(BigDecimal.ZERO) > 0) {
            invoice.setStatus("PARTIAL");
        }

        invoice = feeInvoiceRepository.save(invoice);
        return mapEntityToDto(invoice);
    }

    public List<FeeInvoiceDTO> getInvoicesByStudent(String studentId) {
        return feeInvoiceRepository.findByStudentId(studentId)
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public List<FeeInvoiceDTO> getAllInvoices() {
        return feeInvoiceRepository.findAll()
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    private FeeInvoiceDTO mapEntityToDto(FeeInvoice entity) {
        FeeInvoiceDTO dto = new FeeInvoiceDTO();
        dto.setId(entity.getId());
        dto.setStudentId(entity.getStudent().getId());
        dto.setStudentName(entity.getStudent().getFirstName() + " " + entity.getStudent().getLastName());
        dto.setAdmissionNumber(entity.getStudent().getAdmissionNumber());
        dto.setTitle(entity.getTitle());
        dto.setAmount(entity.getAmount());
        dto.setAmountPaid(entity.getAmountPaid());
        dto.setDueDate(entity.getDueDate());
        dto.setStatus(entity.getStatus());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}
