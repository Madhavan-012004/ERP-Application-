package com.campusos.repository;

import com.campusos.domain.FeeInvoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeeInvoiceRepository extends JpaRepository<FeeInvoice, String> {
    List<FeeInvoice> findByStudentId(String studentId);
    List<FeeInvoice> findByStatus(String status);
}
