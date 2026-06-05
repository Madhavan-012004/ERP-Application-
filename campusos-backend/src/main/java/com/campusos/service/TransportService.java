package com.campusos.service;

import com.campusos.domain.Bus;
import com.campusos.domain.BusRoute;
import com.campusos.dto.TransportDTO;
import com.campusos.repository.BusRepository;
import com.campusos.repository.BusRouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransportService {

    private final BusRouteRepository busRouteRepository;
    private final BusRepository busRepository;

    public TransportDTO.BusRouteDTO createRoute(TransportDTO.BusRouteDTO dto) {
        BusRoute route = new BusRoute();
        route.setName(dto.getName());
        route.setDriverName(dto.getDriverName());
        route.setDriverPhone(dto.getDriverPhone());
        route.setDistance(dto.getDistance());
        route.setEta(dto.getEta());
        route.setStatus("ON_ROUTE");

        route = busRouteRepository.save(route);
        return mapRouteEntityToDto(route);
    }

    public List<TransportDTO.BusRouteDTO> getAllRoutes() {
        return busRouteRepository.findAll().stream()
                .map(this::mapRouteEntityToDto)
                .collect(Collectors.toList());
    }

    public TransportDTO.BusDTO addBus(TransportDTO.BusDTO dto) {
        Bus bus = new Bus();
        bus.setRegistrationNumber(dto.getRegistrationNumber());
        bus.setCapacity(dto.getCapacity());
        bus.setFuelLevel(dto.getFuelLevel());
        bus.setStatus(dto.getStatus() != null ? dto.getStatus() : "ACTIVE");
        bus.setLastServiceDate(dto.getLastServiceDate());

        if (dto.getRouteId() != null) {
            BusRoute route = busRouteRepository.findById(dto.getRouteId())
                    .orElseThrow(() -> new RuntimeException("Route not found"));
            bus.setRoute(route);
        }

        bus = busRepository.save(bus);
        return mapBusEntityToDto(bus);
    }

    public List<TransportDTO.BusDTO> getAllBuses() {
        return busRepository.findAll().stream()
                .map(this::mapBusEntityToDto)
                .collect(Collectors.toList());
    }

    private TransportDTO.BusRouteDTO mapRouteEntityToDto(BusRoute entity) {
        TransportDTO.BusRouteDTO dto = new TransportDTO.BusRouteDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDriverName(entity.getDriverName());
        dto.setDriverPhone(entity.getDriverPhone());
        dto.setDistance(entity.getDistance());
        dto.setEta(entity.getEta());
        dto.setStatus(entity.getStatus());
        return dto;
    }

    private TransportDTO.BusDTO mapBusEntityToDto(Bus entity) {
        TransportDTO.BusDTO dto = new TransportDTO.BusDTO();
        dto.setId(entity.getId());
        dto.setRegistrationNumber(entity.getRegistrationNumber());
        dto.setCapacity(entity.getCapacity());
        dto.setFuelLevel(entity.getFuelLevel());
        dto.setStatus(entity.getStatus());
        dto.setLastServiceDate(entity.getLastServiceDate());
        if (entity.getRoute() != null) {
            dto.setRouteId(entity.getRoute().getId());
            dto.setRouteName(entity.getRoute().getName());
        }
        return dto;
    }
}
