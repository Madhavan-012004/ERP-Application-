package com.campusos.service;

import com.campusos.domain.Event;
import com.campusos.dto.EventDTO;
import com.campusos.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public EventDTO createEvent(EventDTO dto) {
        Event event = new Event();
        event.setTitle(dto.getTitle());
        event.setEventDate(dto.getEventDate());
        event.setEventTime(dto.getEventTime());
        event.setVenue(dto.getVenue());
        event.setType(dto.getType());
        event.setCapacity(dto.getCapacity());
        event.setRegistered(0);
        event.setStatus("UPCOMING");
        event.setDescription(dto.getDescription());
        event = eventRepository.save(event);
        return mapToDto(event);
    }

    public EventDTO updateStatus(String id, String status) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setStatus(status);
        return mapToDto(eventRepository.save(event));
    }

    public EventDTO registerForEvent(String id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        if (event.getRegistered() >= event.getCapacity()) {
            throw new RuntimeException("Event is full");
        }
        event.setRegistered(event.getRegistered() + 1);
        return mapToDto(eventRepository.save(event));
    }

    public List<EventDTO> getAllEvents() {
        return eventRepository.findAll().stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<EventDTO> getEventsByStatus(String status) {
        return eventRepository.findByStatus(status).stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private EventDTO mapToDto(Event entity) {
        EventDTO dto = new EventDTO();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setEventDate(entity.getEventDate());
        dto.setEventTime(entity.getEventTime());
        dto.setVenue(entity.getVenue());
        dto.setType(entity.getType());
        dto.setCapacity(entity.getCapacity());
        dto.setRegistered(entity.getRegistered());
        dto.setStatus(entity.getStatus());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}
