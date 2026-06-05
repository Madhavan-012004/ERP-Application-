package com.campusos.repository;

import com.campusos.domain.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, String> {
    Optional<Student> findByAdmissionNumber(String admissionNumber);
    List<Student> findByGradeAndSection(String grade, String section);
}
