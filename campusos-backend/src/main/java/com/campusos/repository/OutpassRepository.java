package com.campusos.repository;

import com.campusos.domain.Outpass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OutpassRepository extends JpaRepository<Outpass, String> {
    List<Outpass> findByStudentId(String studentId);
    List<Outpass> findByStatus(String status);
}
