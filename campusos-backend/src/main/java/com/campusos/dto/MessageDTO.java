package com.campusos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private String id;

    private String senderId;
    private String senderName;
    private String senderAvatar;

    private String receiverId;
    private String channelId;

    @NotBlank(message = "Message content cannot be empty")
    private String content;

    private boolean isRead;
    private LocalDateTime timestamp;
}
