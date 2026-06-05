package com.campusos.repository;

import com.campusos.domain.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, String> {
    List<Certificate> findByStudentId(String studentId);
    List<Certificate> findByStatus(String status);
}
