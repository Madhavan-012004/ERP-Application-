package com.campusos.service;

import com.campusos.domain.Student;
import com.campusos.dto.StudentDTO;
import com.campusos.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentDTO createStudent(StudentDTO dto) {
        Student student = new Student();
        mapDtoToEntity(dto, student);
        student = studentRepository.save(student);
        return mapEntityToDto(student);
    }

    public StudentDTO updateStudent(String id, StudentDTO dto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        
        mapDtoToEntity(dto, student);
        student = studentRepository.save(student);
        return mapEntityToDto(student);
    }

    public StudentDTO getStudentById(String id) {
        return studentRepository.findById(id)
                .map(this::mapEntityToDto)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll()
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public void deleteStudent(String id) {
        studentRepository.deleteById(id);
    }

    private void mapDtoToEntity(StudentDTO dto, Student entity) {
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setAdmissionNumber(dto.getAdmissionNumber());
        entity.setGrade(dto.getGrade());
        entity.setSection(dto.getSection());
        entity.setRollNumber(dto.getRollNumber());
        entity.setDateOfBirth(dto.getDateOfBirth());
        entity.setBloodGroup(dto.getBloodGroup());
        entity.setGuardianName(dto.getGuardianName());
        entity.setGuardianPhone(dto.getGuardianPhone());
        entity.setAddress(dto.getAddress());
        if (dto.getStatus() != null) {
            entity.setStatus(dto.getStatus());
        }
    }

    private StudentDTO mapEntityToDto(Student entity) {
        StudentDTO dto = new StudentDTO();
        dto.setId(entity.getId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setAdmissionNumber(entity.getAdmissionNumber());
        dto.setGrade(entity.getGrade());
        dto.setSection(entity.getSection());
        dto.setRollNumber(entity.getRollNumber());
        dto.setDateOfBirth(entity.getDateOfBirth());
        dto.setBloodGroup(entity.getBloodGroup());
        dto.setGuardianName(entity.getGuardianName());
        dto.setGuardianPhone(entity.getGuardianPhone());
        dto.setAddress(entity.getAddress());
        dto.setStatus(entity.getStatus());
        return dto;
    }
}
