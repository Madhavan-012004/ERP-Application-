package com.campusos.repository;

import com.campusos.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    List<Message> findByChannelIdOrderByCreatedAtAsc(String channelId);
    List<Message> findByReceiverIdOrderByCreatedAtAsc(String receiverId);
    List<Message> findBySenderIdAndReceiverIdOrderByCreatedAtAsc(String senderId, String receiverId);
}
