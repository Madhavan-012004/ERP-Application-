package com.campusos.service;

import com.campusos.domain.Certificate;
import com.campusos.domain.Student;
import com.campusos.dto.CertificateDTO;
import com.campusos.repository.CertificateRepository;
import com.campusos.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final StudentRepository studentRepository;

    public CertificateDTO requestCertificate(CertificateDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Certificate cert = new Certificate();
        cert.setStudent(student);
        cert.setType(dto.getType());
        cert.setStatus("PENDING");
        cert.setRequestDate(LocalDate.now());

        cert = certificateRepository.save(cert);
        return mapToDto(cert);
    }

    public CertificateDTO approveCertificate(String id) {
        Certificate cert = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));
        cert.setStatus("READY");
        cert.setGeneratedDate(LocalDate.now());
        return mapToDto(certificateRepository.save(cert));
    }

    public CertificateDTO rejectCertificate(String id, String remarks) {
        Certificate cert = certificateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificate not found"));
        cert.setStatus("REJECTED");
        cert.setRemarks(remarks);
        return mapToDto(certificateRepository.save(cert));
    }

    public List<CertificateDTO> getAllCertificates() {
        return certificateRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<CertificateDTO> getPendingCertificates() {
        return certificateRepository.findByStatus("PENDING").stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<CertificateDTO> getStudentCertificates(String studentId) {
        return certificateRepository.findByStudentId(studentId).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private CertificateDTO mapToDto(Certificate entity) {
        CertificateDTO dto = new CertificateDTO();
        dto.setId(entity.getId());
        dto.setStudentId(entity.getStudent().getId());
        dto.setStudentName(entity.getStudent().getFirstName() + " " + entity.getStudent().getLastName());
        dto.setAdmissionNumber(entity.getStudent().getAdmissionNumber());
        dto.setType(entity.getType());
        dto.setStatus(entity.getStatus());
        dto.setRequestDate(entity.getRequestDate());
        dto.setGeneratedDate(entity.getGeneratedDate());
        dto.setRemarks(entity.getRemarks());
        return dto;
    }
}
