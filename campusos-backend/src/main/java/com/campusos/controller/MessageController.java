package com.campusos.controller;

import com.campusos.dto.MessageDTO;
import com.campusos.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageDTO> sendMessage(@Valid @RequestBody MessageDTO request) {
        return new ResponseEntity<>(messageService.sendMessage(request), HttpStatus.CREATED);
    }

    @GetMapping("/channels/{channelId}")
    public ResponseEntity<List<MessageDTO>> getChannelMessages(@PathVariable String channelId) {
        return ResponseEntity.ok(messageService.getChannelMessages(channelId));
    }

    @GetMapping("/direct/{receiverId}")
    public ResponseEntity<List<MessageDTO>> getDirectMessages(@PathVariable String receiverId) {
        return ResponseEntity.ok(messageService.getDirectMessages(receiverId));
    }
}
