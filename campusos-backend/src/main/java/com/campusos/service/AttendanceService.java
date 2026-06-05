package com.campusos.service;

import com.campusos.domain.Attendance;
import com.campusos.domain.Student;
import com.campusos.dto.AttendanceDTO;
import com.campusos.repository.AttendanceRepository;
import com.campusos.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;

    public AttendanceDTO markAttendance(AttendanceDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Check if attendance already marked for today
        Attendance attendance = attendanceRepository.findByStudentIdAndDate(dto.getStudentId(), dto.getDate())
                .orElse(new Attendance());

        attendance.setStudent(student);
        attendance.setDate(dto.getDate());
        attendance.setStatus(dto.getStatus());
        attendance.setRemarks(dto.getRemarks());
        attendance.setMarkedBy(dto.getMarkedBy());

        attendance = attendanceRepository.save(attendance);
        return mapEntityToDto(attendance);
    }

    public List<AttendanceDTO> getAttendanceByStudent(String studentId) {
        return attendanceRepository.findByStudentId(studentId)
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public List<AttendanceDTO> getAttendanceByDate(LocalDate date) {
        return attendanceRepository.findByDate(date)
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    private AttendanceDTO mapEntityToDto(Attendance entity) {
        AttendanceDTO dto = new AttendanceDTO();
        dto.setId(entity.getId());
        dto.setStudentId(entity.getStudent().getId());
        dto.setStudentName(entity.getStudent().getFirstName() + " " + entity.getStudent().getLastName());
        dto.setDate(entity.getDate());
        dto.setStatus(entity.getStatus());
        dto.setRemarks(entity.getRemarks());
        dto.setMarkedBy(entity.getMarkedBy());
        return dto;
    }
}
