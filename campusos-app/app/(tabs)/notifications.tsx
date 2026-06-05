import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Bell, ClipboardList, DollarSign, Calendar, MessageSquare } from 'lucide-react-native';
import { GlassCard } from '../../components/GlassCard';
import { GradientHeader } from '../../components/GradientHeader';
import { Badge } from '../../components/Badge';
import { Colors } from '../../constants/Colors';

const NOTIFICATIONS = [
  { id: 1, title: 'Term 2 Fee Invoice Generated', desc: 'Due by Nov 15th — ₹1,200 pending', time: 'Just now', icon: DollarSign, color: '#ffd060', bg: 'rgba(255,208,96,0.12)', badge: 'Finance' as const, badgeVariant: 'yellow' as const },
  { id: 2, title: 'Attendance Marked', desc: 'Present today — 09:15 AM', time: '2 hours ago', icon: ClipboardList, color: '#2d8c45', bg: 'rgba(45,140,69,0.12)', badge: 'Attendance' as const, badgeVariant: 'mint' as const },
  { id: 3, title: 'Parent-Teacher Meeting', desc: 'Scheduled for Saturday, 10:00 AM', time: '1 day ago', icon: Calendar, color: Colors.sky, bg: 'rgba(174,226,255,0.1)', badge: 'Event' as const, badgeVariant: 'sky' as const },
  { id: 4, title: 'New Message from Teacher', desc: 'Ms. Priya Sharma sent you a message', time: '2 days ago', icon: MessageSquare, color: Colors.violet, bg: Colors.violetDim, badge: 'Message' as const, badgeVariant: 'violet' as const },
  { id: 5, title: 'Exam Schedule Updated', desc: 'Mathematics exam rescheduled to Dec 12', time: '3 days ago', icon: Bell, color: '#c94040', bg: 'rgba(201,64,64,0.12)', badge: 'Exam' as const, badgeVariant: 'red' as const },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.root}>
      <GradientHeader title="Notifications" subtitle="Your latest alerts" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {NOTIFICATIONS.map((n) => (
          <GlassCard key={n.id} style={styles.card}>
            <View style={styles.row}>
              <View style={[styles.iconBox, { backgroundColor: n.bg }]}>
                <n.icon size={20} color={n.color} />
              </View>
              <View style={styles.content}>
                <View style={styles.titleRow}>
                  <Text style={styles.title} numberOfLines={1}>{n.title}</Text>
                  <Text style={styles.time}>{n.time}</Text>
                </View>
                <Text style={styles.desc} numberOfLines={2}>{n.desc}</Text>
                <Badge label={n.badge} variant={n.badgeVariant} />
              </View>
            </View>
          </GlassCard>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { padding: 16, paddingBottom: 40, gap: 10 },
  card: { padding: 14 },
  row: { flexDirection: 'row', gap: 12 },
  iconBox: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  content: { flex: 1, gap: 4 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  title: { fontSize: 13.5, fontWeight: '700', color: Colors.textPrimary, flex: 1 },
  time: { fontSize: 11, color: Colors.textMuted, flexShrink: 0 },
  desc: { fontSize: 12.5, color: Colors.textSecondary, lineHeight: 17 },
});
