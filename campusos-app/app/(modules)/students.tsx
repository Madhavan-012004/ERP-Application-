import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, GraduationCap, CheckCircle2, TrendingUp, XCircle, Search } from 'lucide-react-native';
import { studentsApi } from '../../constants/Api';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/GlassCard';
import { Badge } from '../../components/Badge';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GradientHeader } from '../../components/GradientHeader';
import { Colors } from '../../constants/Colors';

export default function StudentsScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'INSTITUTION_ADMIN';

  const fetchStudents = async () => {
    try {
      const res = await studentsApi.getAll();
      setStudents(res.data ?? []);
    } catch {
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStudents(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchStudents();
    setRefreshing(false);
  };

  const AVATAR_COLORS = [
    'rgba(159,161,255,0.6)', 'rgba(174,226,255,0.6)',
    'rgba(217,249,223,0.6)', 'rgba(181,186,255,0.6)',
  ];

  if (loading) return <LoadingSpinner message="Loading students…" />;

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <GradientHeader
        title="Students"
        subtitle={`${students.length} enrolled students`}
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
        {/* Stats */}
        <View style={styles.statsRow}>
          <GlassCard style={styles.statCard}>
            <GraduationCap size={20} color={Colors.violet} />
            <Text style={styles.statValue}>{students.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <CheckCircle2 size={20} color="#2d8c45" />
            <Text style={[styles.statValue, { color: '#2d8c45' }]}>
              {students.filter(s => s.status === 'ACTIVE').length || students.length}
            </Text>
            <Text style={styles.statLabel}>Active</Text>
          </GlassCard>
        </View>

        {/* Student list */}
        {students.length === 0 ? (
          <GlassCard style={styles.emptyCard}>
            <GraduationCap size={40} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No Students Found</Text>
            <Text style={styles.emptyDesc}>No student records are available yet.</Text>
          </GlassCard>
        ) : (
          students.map((s: any, i: number) => (
            <GlassCard key={s.id ?? i} style={styles.studentCard}>
              <View style={styles.studentRow}>
                <View style={[styles.avatar, { backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }]}>
                  <Text style={styles.avatarText}>
                    {(s.name ?? s.firstName ?? 'S').slice(0, 2).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{s.name ?? `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim()}</Text>
                  <Text style={styles.studentMeta}>
                    {s.id ?? s.studentId ?? `ID-${i + 1}`}
                    {s.className ? ` · Class ${s.className}` : ''}
                  </Text>
                </View>
                <Badge
                  label={s.status ?? 'ACTIVE'}
                  variant={s.status === 'INACTIVE' ? 'red' : 'mint'}
                />
              </View>
              {/* Hide fee info from Teachers */}
              {isAdmin && s.feeStatus && (
                <View style={styles.feeRow}>
                  <Text style={styles.feeLabel}>Fee Status:</Text>
                  <Badge
                    label={s.feeStatus}
                    variant={s.feeStatus === 'PAID' ? 'mint' : s.feeStatus === 'OVERDUE' ? 'red' : 'yellow'}
                  />
                </View>
              )}
            </GlassCard>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { padding: 16, paddingBottom: 40 },

  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  statCard: { flex: 1, alignItems: 'center', gap: 6, paddingVertical: 16 },
  statValue: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },

  emptyCard: { alignItems: 'center', gap: 10, paddingVertical: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  emptyDesc: { fontSize: 13, color: Colors.textMuted, textAlign: 'center' },

  studentCard: { marginBottom: 10, gap: 10 },
  studentRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontWeight: '800', color: '#0a0b0f' },
  studentInfo: { flex: 1, gap: 2 },
  studentName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  studentMeta: { fontSize: 12, color: Colors.textMuted },

  feeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: Colors.border },
  feeLabel: { fontSize: 12, color: Colors.textMuted, fontWeight: '600' },
});
