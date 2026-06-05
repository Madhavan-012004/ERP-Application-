import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  RefreshControl, Alert,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, CheckCircle2, XCircle, Clock, Calendar } from 'lucide-react-native';
import { attendanceApi } from '../../constants/Api';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/GlassCard';
import { Badge } from '../../components/Badge';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GradientHeader } from '../../components/GradientHeader';
import { Colors } from '../../constants/Colors';

export default function AttendanceScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const isTeacherOrAdmin =
    user?.role === 'SUPER_ADMIN' || user?.role === 'INSTITUTION_ADMIN' || user?.role === 'TEACHER';

  const fetchAttendance = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      let res;
      if (isTeacherOrAdmin) {
        res = await attendanceApi.getByDate(today);
      } else {
        // Student/Parent — fetch their own records (needs studentId, using email placeholder)
        res = await attendanceApi.getByStudent(user?.email ?? '');
      }
      setRecords(res.data ?? []);
    } catch (e: any) {
      // If 404/empty, just show empty state
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAttendance(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAttendance();
    setRefreshing(false);
  };

  // Quick mark for today (Teacher/Admin)
  const markAttendance = async (studentId: string, status: 'PRESENT' | 'ABSENT') => {
    try {
      await attendanceApi.mark({
        studentId,
        date: new Date().toISOString().split('T')[0],
        status,
      });
      Alert.alert('✓ Done', `Attendance marked as ${status}`);
      await fetchAttendance();
    } catch {
      Alert.alert('Error', 'Could not mark attendance. Check API connection.');
    }
  };

  const presentCount = records.filter(r => r.status === 'PRESENT').length;
  const absentCount  = records.filter(r => r.status === 'ABSENT').length;
  const lateCount    = records.filter(r => r.status === 'LATE').length;

  if (loading) return <LoadingSpinner message="Fetching attendance…" />;

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <GradientHeader
        title="Attendance"
        subtitle={isTeacherOrAdmin ? "Today's class attendance" : "My attendance record"}
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
        {/* Summary cards */}
        <View style={styles.summaryRow}>
          {[
            { label: 'Present', value: presentCount, icon: CheckCircle2, color: '#2d8c45', bg: 'rgba(45,140,69,0.12)' },
            { label: 'Absent',  value: absentCount,  icon: XCircle,      color: '#c94040', bg: 'rgba(201,64,64,0.12)' },
            { label: 'Late',    value: lateCount,    icon: Clock,        color: '#ffd060', bg: 'rgba(255,208,96,0.12)' },
          ].map(s => (
            <GlassCard key={s.label} style={styles.summaryCard}>
              <View style={[styles.summaryIcon, { backgroundColor: s.bg }]}>
                <s.icon size={18} color={s.color} />
              </View>
              <Text style={[styles.summaryValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.summaryLabel}>{s.label}</Text>
            </GlassCard>
          ))}
        </View>

        {/* Records list */}
        {records.length === 0 ? (
          <GlassCard style={styles.emptyCard}>
            <Calendar size={40} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No Records Found</Text>
            <Text style={styles.emptyDesc}>
              {isTeacherOrAdmin
                ? "No attendance has been recorded for today yet."
                : "No attendance records available for your account."}
            </Text>
          </GlassCard>
        ) : (
          records.map((r: any, i: number) => (
            <GlassCard key={i} style={styles.recordCard}>
              <View style={styles.recordRow}>
                <View style={styles.recordLeft}>
                  <Text style={styles.recordName}>
                    {r.studentName ?? r.studentId ?? `Student ${i + 1}`}
                  </Text>
                  <Text style={styles.recordDate}>{r.date ?? 'Today'}</Text>
                </View>
                <Badge
                  label={r.status ?? 'UNKNOWN'}
                  variant={
                    r.status === 'PRESENT' ? 'mint' :
                    r.status === 'ABSENT'  ? 'red'  :
                    r.status === 'LATE'    ? 'yellow' : 'violet'
                  }
                />
              </View>

              {/* Mark attendance buttons (Teacher/Admin only) */}
              {isTeacherOrAdmin && (
                <View style={styles.markRow}>
                  <TouchableOpacity
                    style={[styles.markBtn, styles.markPresent]}
                    onPress={() => markAttendance(r.studentId, 'PRESENT')}
                    activeOpacity={0.8}
                  >
                    <CheckCircle2 size={13} color="#2d8c45" />
                    <Text style={[styles.markBtnText, { color: '#2d8c45' }]}>Present</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.markBtn, styles.markAbsent]}
                    onPress={() => markAttendance(r.studentId, 'ABSENT')}
                    activeOpacity={0.8}
                  >
                    <XCircle size={13} color="#c94040" />
                    <Text style={[styles.markBtnText, { color: '#c94040' }]}>Absent</Text>
                  </TouchableOpacity>
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

  summaryRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  summaryCard: { flex: 1, alignItems: 'center', padding: 14, gap: 4 },
  summaryIcon: { width: 36, height: 36, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  summaryValue: { fontSize: 22, fontWeight: '800' },
  summaryLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },

  emptyCard: { alignItems: 'center', gap: 10, paddingVertical: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  emptyDesc: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', lineHeight: 19, paddingHorizontal: 20 },

  recordCard: { marginBottom: 10, padding: 14, gap: 10 },
  recordRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  recordLeft: { gap: 2 },
  recordName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  recordDate: { fontSize: 12, color: Colors.textMuted },

  markRow: { flexDirection: 'row', gap: 8 },
  markBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, paddingVertical: 8, borderRadius: 8, borderWidth: 1 },
  markPresent: { backgroundColor: 'rgba(45,140,69,0.08)', borderColor: 'rgba(45,140,69,0.3)' },
  markAbsent:  { backgroundColor: 'rgba(201,64,64,0.08)', borderColor: 'rgba(201,64,64,0.3)' },
  markBtnText: { fontSize: 12, fontWeight: '700' },
});
