package com.campusos.repository;

import com.campusos.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, String> {
    List<Event> findByStatus(String status);
    List<Event> findByType(String type);
}
