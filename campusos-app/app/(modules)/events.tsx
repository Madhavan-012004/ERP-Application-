import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Calendar, MapPin, Clock, Users } from 'lucide-react-native';
import { eventsApi } from '../../constants/Api';
import { GlassCard } from '../../components/GlassCard';
import { Badge } from '../../components/Badge';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GradientHeader } from '../../components/GradientHeader';
import { Colors } from '../../constants/Colors';

export default function EventsScreen() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const res = await eventsApi.getAll();
      setEvents(res.data ?? []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  const EVENT_COLORS = [Colors.violet, Colors.sky, '#2d8c45', '#ffd060', '#c94040'];

  if (loading) return <LoadingSpinner message="Loading events…" />;

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <GradientHeader
        title="Events"
        subtitle={`${events.length} upcoming events`}
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
        {events.length === 0 ? (
          <GlassCard style={styles.emptyCard}>
            <Calendar size={40} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No Events Scheduled</Text>
            <Text style={styles.emptyDesc}>There are no upcoming events at this time.</Text>
          </GlassCard>
        ) : (
          events.map((e: any, i: number) => {
            const color = EVENT_COLORS[i % EVENT_COLORS.length];
            return (
              <GlassCard key={e.id ?? i} style={styles.eventCard}>
                <View style={[styles.colorBar, { backgroundColor: color }]} />
                <View style={styles.eventBody}>
                  <View style={styles.eventTop}>
                    <Text style={styles.eventTitle}>{e.title ?? `Event ${i + 1}`}</Text>
                    <Badge label={e.category ?? 'Event'} variant="violet" />
                  </View>
                  {e.description && (
                    <Text style={styles.eventDesc} numberOfLines={2}>{e.description}</Text>
                  )}
                  <View style={styles.metaRow}>
                    {e.date && (
                      <View style={styles.meta}>
                        <Calendar size={12} color={Colors.textMuted} />
                        <Text style={styles.metaText}>{e.date}</Text>
                      </View>
                    )}
                    {e.time && (
                      <View style={styles.meta}>
                        <Clock size={12} color={Colors.textMuted} />
                        <Text style={styles.metaText}>{e.time}</Text>
                      </View>
                    )}
                    {e.venue && (
                      <View style={styles.meta}>
                        <MapPin size={12} color={Colors.textMuted} />
                        <Text style={styles.metaText}>{e.venue}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </GlassCard>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { padding: 16, paddingBottom: 40 },

  emptyCard: { alignItems: 'center', gap: 10, paddingVertical: 40, marginTop: 20 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  emptyDesc: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },

  eventCard: { marginBottom: 12, flexDirection: 'row', padding: 0, overflow: 'hidden' },
  colorBar: { width: 4, borderRadius: 4, margin: 12, alignSelf: 'stretch' },
  eventBody: { flex: 1, padding: 14, paddingLeft: 4, gap: 6 },
  eventTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  eventTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, flex: 1 },
  eventDesc: { fontSize: 12.5, color: Colors.textSecondary, lineHeight: 18 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11.5, color: Colors.textMuted },
});
