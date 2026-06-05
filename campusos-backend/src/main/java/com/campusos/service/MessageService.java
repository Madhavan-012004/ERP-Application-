package com.campusos.service;

import com.campusos.domain.Message;
import com.campusos.domain.User;
import com.campusos.dto.MessageDTO;
import com.campusos.repository.MessageRepository;
import com.campusos.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageDTO sendMessage(MessageDTO dto) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User sender = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        Message message = new Message();
        message.setSenderId(sender.getId());
        message.setSenderName(sender.getRole() + " " + sender.getId().substring(0, 4)); // In real app, fetch profile name
        message.setSenderAvatar(sender.getRole().name().substring(0, 1));
        
        message.setReceiverId(dto.getReceiverId());
        message.setChannelId(dto.getChannelId());
        message.setContent(dto.getContent());
        message.setRead(false);

        message = messageRepository.save(message);
        return mapEntityToDto(message);
    }

    public List<MessageDTO> getChannelMessages(String channelId) {
        return messageRepository.findByChannelIdOrderByCreatedAtAsc(channelId)
                .stream()
                .map(this::mapEntityToDto)
                .collect(Collectors.toList());
    }

    public List<MessageDTO> getDirectMessages(String receiverId) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User sender = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Simplistic approach: get messages where currentUser is sender or receiver. 
        // In reality, you'd fetch conversation between User A and User B.
        List<Message> sent = messageRepository.findBySenderIdAndReceiverIdOrderByCreatedAtAsc(sender.getId(), receiverId);
        List<Message> received = messageRepository.findBySenderIdAndReceiverIdOrderByCreatedAtAsc(receiverId, sender.getId());
        
        sent.addAll(received);
        sent.sort((m1, m2) -> m1.getCreatedAt().compareTo(m2.getCreatedAt()));

        return sent.stream().map(this::mapEntityToDto).collect(Collectors.toList());
    }

    private MessageDTO mapEntityToDto(Message entity) {
        MessageDTO dto = new MessageDTO();
        dto.setId(entity.getId());
        dto.setSenderId(entity.getSenderId());
        dto.setSenderName(entity.getSenderName());
        dto.setSenderAvatar(entity.getSenderAvatar());
        dto.setReceiverId(entity.getReceiverId());
        dto.setChannelId(entity.getChannelId());
        dto.setContent(entity.getContent());
        dto.setRead(entity.isRead());
        dto.setTimestamp(entity.getCreatedAt());
        return dto;
    }
}
