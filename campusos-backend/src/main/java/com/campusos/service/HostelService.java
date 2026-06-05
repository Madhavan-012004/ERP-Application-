package com.campusos.service;

import com.campusos.domain.Outpass;
import com.campusos.domain.Room;
import com.campusos.domain.Student;
import com.campusos.dto.OutpassDTO;
import com.campusos.dto.RoomDTO;
import com.campusos.repository.OutpassRepository;
import com.campusos.repository.RoomRepository;
import com.campusos.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HostelService {

    private final RoomRepository roomRepository;
    private final OutpassRepository outpassRepository;
    private final StudentRepository studentRepository;

    public RoomDTO createRoom(RoomDTO dto) {
        Room room = new Room();
        room.setBlock(dto.getBlock());
        room.setRoomNumber(dto.getRoomNumber());
        room.setCapacity(dto.getCapacity());
        room.setType(dto.getType());
        room.setWarden(dto.getWarden());
        room.setOccupied(0);

        room = roomRepository.save(room);
        return mapRoomEntityToDto(room);
    }

    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(this::mapRoomEntityToDto)
                .collect(Collectors.toList());
    }

    public OutpassDTO createOutpassRequest(OutpassDTO dto) {
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Outpass outpass = new Outpass();
        outpass.setStudent(student);
        outpass.setFromDate(dto.getFromDate());
        outpass.setToDate(dto.getToDate());
        outpass.setReason(dto.getReason());
        outpass.setStatus("PENDING");

        outpass = outpassRepository.save(outpass);
        return mapOutpassEntityToDto(outpass);
    }

    public OutpassDTO processOutpass(String id, String status) {
        Outpass outpass = outpassRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Outpass not found"));

        outpass.setStatus(status);
        outpass = outpassRepository.save(outpass);
        return mapOutpassEntityToDto(outpass);
    }

    public List<OutpassDTO> getPendingOutpasses() {
        return outpassRepository.findByStatus("PENDING").stream()
                .map(this::mapOutpassEntityToDto)
                .collect(Collectors.toList());
    }

    private RoomDTO mapRoomEntityToDto(Room entity) {
        RoomDTO dto = new RoomDTO();
        dto.setId(entity.getId());
        dto.setBlock(entity.getBlock());
        dto.setRoomNumber(entity.getRoomNumber());
        dto.setCapacity(entity.getCapacity());
        dto.setOccupied(entity.getOccupied());
        dto.setType(entity.getType());
        dto.setWarden(entity.getWarden());
        return dto;
    }

    private OutpassDTO mapOutpassEntityToDto(Outpass entity) {
        OutpassDTO dto = new OutpassDTO();
        dto.setId(entity.getId());
        dto.setStudentId(entity.getStudent().getId());
        dto.setStudentName(entity.getStudent().getFirstName() + " " + entity.getStudent().getLastName());
        dto.setFromDate(entity.getFromDate());
        dto.setToDate(entity.getToDate());
        dto.setReason(entity.getReason());
        dto.setStatus(entity.getStatus());
        return dto;
    }
}
