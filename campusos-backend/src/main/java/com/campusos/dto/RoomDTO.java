package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RoomDTO {
    private String id;
    
    @NotBlank(message = "Block is required")
    private String block;
    
    @NotBlank(message = "Room number is required")
    private String roomNumber;
    
    private int capacity;
    private int occupied;
    private String type;
    private String warden;
}
