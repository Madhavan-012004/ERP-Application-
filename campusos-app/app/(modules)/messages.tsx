import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, RefreshControl, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Send, MessageSquare } from 'lucide-react-native';
import { messagesApi } from '../../constants/Api';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/GlassCard';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GradientHeader } from '../../components/GradientHeader';
import { Colors } from '../../constants/Colors';

export default function MessagesScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [newMsg, setNewMsg] = useState('');
  const [sending, setSending] = useState(false);

  const CHANNEL_ID = 'general';

  const fetchMessages = async () => {
    try {
      const res = await messagesApi.getChannel(CHANNEL_ID);
      setMessages(res.data ?? []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMessages();
    setRefreshing(false);
  };

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    try {
      setSending(true);
      await messagesApi.send({
        channelId: CHANNEL_ID,
        content: newMsg.trim(),
        senderEmail: user?.email,
      });
      setNewMsg('');
      await fetchMessages();
    } catch {
      Alert.alert('Error', 'Could not send message. Check your connection.');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading messages…" />;

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <GradientHeader
        title="Messages"
        subtitle="# general"
        right={
          <TouchableOpacity onPress={() => router.back()}>
            <ChevronLeft size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.violet} />}
        showsVerticalScrollIndicator={false}
      >
        {messages.length === 0 ? (
          <GlassCard style={styles.emptyCard}>
            <MessageSquare size={40} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No Messages Yet</Text>
            <Text style={styles.emptyDesc}>Be the first to send a message in the general channel.</Text>
          </GlassCard>
        ) : (
          messages.map((m: any, i: number) => {
            const isOwn = m.senderEmail === user?.email;
            return (
              <View key={m.id ?? i} style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
                {!isOwn && (
                  <Text style={styles.bubbleSender}>{m.senderName ?? m.senderEmail ?? 'User'}</Text>
                )}
                <View style={[styles.bubbleContent, isOwn ? styles.bubbleContentOwn : styles.bubbleContentOther]}>
                  <Text style={[styles.bubbleText, isOwn && styles.bubbleTextOwn]}>{m.content ?? m.message}</Text>
                </View>
                <Text style={[styles.bubbleTime, isOwn && styles.bubbleTimeOwn]}>
                  {m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Compose */}
      <View style={styles.compose}>
        <TextInput
          style={styles.composeInput}
          placeholder="Type a message…"
          placeholderTextColor={Colors.textMuted}
          value={newMsg}
          onChangeText={setNewMsg}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendBtn, (!newMsg.trim() || sending) && styles.sendBtnDisabled]}
          onPress={sendMessage}
          disabled={!newMsg.trim() || sending}
          activeOpacity={0.8}
        >
          <Send size={18} color="#0a0b0f" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { padding: 16, paddingBottom: 16, gap: 8 },

  emptyCard: { alignItems: 'center', gap: 10, paddingVertical: 40, marginTop: 20 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  emptyDesc: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', lineHeight: 19, paddingHorizontal: 20 },

  bubble: { maxWidth: '80%', gap: 3 },
  bubbleOwn: { alignSelf: 'flex-end', alignItems: 'flex-end' },
  bubbleOther: { alignSelf: 'flex-start', alignItems: 'flex-start' },
  bubbleSender: { fontSize: 11, color: Colors.violet, fontWeight: '700', marginBottom: 2, paddingLeft: 4 },
  bubbleContent: { borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleContentOwn: { backgroundColor: Colors.violet, borderBottomRightRadius: 4 },
  bubbleContentOther: { backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border, borderBottomLeftRadius: 4 },
  bubbleText: { fontSize: 14, color: Colors.textPrimary, lineHeight: 20 },
  bubbleTextOwn: { color: '#0a0b0f' },
  bubbleTime: { fontSize: 10, color: Colors.textMuted, paddingHorizontal: 4 },
  bubbleTimeOwn: { textAlign: 'right' },

  compose: { flexDirection: 'row', gap: 10, padding: 12, borderTopWidth: 1, borderTopColor: Colors.border, backgroundColor: Colors.bgCard, alignItems: 'flex-end' },
  composeInput: { flex: 1, backgroundColor: Colors.bgElevated, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: Colors.textPrimary, maxHeight: 100 },
  sendBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.violet, alignItems: 'center', justifyContent: 'center' },
  sendBtnDisabled: { opacity: 0.4 },
});
