import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Users, ClipboardList, DollarSign, Calendar,
  TrendingUp, BookOpen, GraduationCap, Bell, ArrowRight,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth, ROLE_LABELS, ROLE_COLORS } from '../../context/AuthContext';
import { attendanceApi, financeApi, studentsApi, eventsApi } from '../../constants/Api';
import { GlassCard } from '../../components/GlassCard';
import { StatCard } from '../../components/StatCard';
import { Badge } from '../../components/Badge';
import { Colors } from '../../constants/Colors';
import { GradientHeader } from '../../components/GradientHeader';

export default function DashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'INSTITUTION_ADMIN';
  const isTeacher = user?.role === 'TEACHER';
  const isParent = user?.role === 'PARENT';
  const isStudent = user?.role === 'STUDENT';

  const fetchData = async () => {
    try {
      if (isAdmin || isTeacher) {
        const [sRes, aRes, eRes] = await Promise.allSettled([
          studentsApi.getAll(),
          attendanceApi.getByDate(new Date().toISOString().split('T')[0]),
          eventsApi.getAll(),
        ]);
        if (sRes.status === 'fulfilled') setStudents(sRes.value.data);
        if (aRes.status === 'fulfilled') setAttendance(aRes.value.data);
        if (eRes.status === 'fulfilled') setEvents(eRes.value.data);
      }
      if (isParent || isAdmin) {
        const fRes = await financeApi.getAllInvoices().catch(() => null);
        if (fRes) setInvoices(fRes.data);
      }
      if (isStudent) {
        const eRes = await eventsApi.getAll().catch(() => null);
        if (eRes) setEvents(eRes.data);
      }
    } catch (_) {}
  };

  useEffect(() => { fetchData(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const roleColor = ROLE_COLORS[user?.role!] ?? Colors.violet;
  const roleLabel = ROLE_LABELS[user?.role!] ?? 'User';

  const pendingInvoices = invoices.filter((i: any) => i.status === 'PENDING' || i.status === 'OVERDUE');
  const todayPresent = attendance.filter((a: any) => a.status === 'PRESENT').length;

  return (
    <View style={styles.root}>
      <GradientHeader
        title={`Hello, ${user?.name ?? 'User'} 👋`}
        subtitle={`${roleLabel} · CampusOS`}
        right={
          <TouchableOpacity onPress={() => router.push('/(tabs)/notifications')}>
            <Bell size={22} color={Colors.textSecondary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.violet} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Role badge */}
        <View style={styles.roleBadgeRow}>
          <View style={[styles.rolePill, { backgroundColor: roleColor + '18', borderColor: roleColor + '40' }]}>
            <View style={[styles.roleDot, { backgroundColor: roleColor }]} />
            <Text style={[styles.roleText, { color: roleColor }]}>{roleLabel}</Text>
          </View>
        </View>

        {/* ── ADMIN / SUPER_ADMIN STATS ── */}
        {isAdmin && (
          <View style={styles.statsGrid}>
            <StatCard
              label="Total Students"
              value={students.length ? String(students.length) : '—'}
              icon={GraduationCap}
              iconColor={Colors.violet}
              iconBg={Colors.violetDim}
              style={styles.statHalf}
            />
            <StatCard
              label="Present Today"
              value={todayPresent ? String(todayPresent) : '—'}
              icon={ClipboardList}
              iconColor="#2d8c45"
              iconBg="rgba(45,140,69,0.15)"
              style={styles.statHalf}
            />
            <StatCard
              label="Pending Fees"
              value={pendingInvoices.length ? String(pendingInvoices.length) : '0'}
              icon={DollarSign}
              iconColor="#ffd060"
              iconBg="rgba(255,208,96,0.12)"
              style={styles.statHalf}
            />
            <StatCard
              label="Events"
              value={events.length ? String(events.length) : '0'}
              icon={Calendar}
              iconColor={Colors.sky}
              iconBg="rgba(174,226,255,0.1)"
              style={styles.statHalf}
            />
          </View>
        )}

        {/* ── TEACHER STATS ── */}
        {isTeacher && (
          <View style={styles.statsGrid}>
            <StatCard
              label="My Students"
              value={students.length ? String(students.length) : '—'}
              icon={Users}
              iconColor={Colors.violet}
              iconBg={Colors.violetDim}
              style={styles.statHalf}
            />
            <StatCard
              label="Present Today"
              value={todayPresent ? String(todayPresent) : '—'}
              icon={ClipboardList}
              iconColor="#2d8c45"
              iconBg="rgba(45,140,69,0.15)"
              style={styles.statHalf}
            />
          </View>
        )}

        {/* ── PARENT STATS ── */}
        {isParent && (
          <View style={styles.statsGrid}>
            <StatCard
              label="Fee Status"
              value={pendingInvoices.length > 0 ? 'Pending' : 'Paid'}
              sub={pendingInvoices.length > 0 ? `${pendingInvoices.length} unpaid invoice(s)` : 'All clear'}
              icon={DollarSign}
              iconColor={pendingInvoices.length > 0 ? '#ffd060' : '#2d8c45'}
              iconBg={pendingInvoices.length > 0 ? 'rgba(255,208,96,0.12)' : 'rgba(45,140,69,0.12)'}
              style={styles.statFull}
            />
          </View>
        )}

        {/* ── STUDENT STATS ── */}
        {isStudent && (
          <View style={styles.statsGrid}>
            <StatCard
              label="Upcoming Events"
              value={events.length ? String(events.length) : '0'}
              icon={Calendar}
              iconColor={Colors.sky}
              iconBg="rgba(174,226,255,0.1)"
              style={styles.statFull}
            />
          </View>
        )}

        {/* ── Quick Actions ── */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          {getQuickActions(user?.role).map((action) => (
            <TouchableOpacity
              key={action.label}
              style={styles.quickCard}
              onPress={() => router.push(action.href as any)}
              activeOpacity={0.8}
            >
              <GlassCard style={styles.quickInner}>
                <View style={[styles.quickIcon, { backgroundColor: action.color + '18' }]}>
                  <action.icon size={22} color={action.color} />
                </View>
                <Text style={styles.quickLabel}>{action.label}</Text>
                <ArrowRight size={14} color={Colors.textMuted} style={{ marginTop: 4 }} />
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Recent Events ── */}
        {events.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            {events.slice(0, 3).map((e: any, i: number) => (
              <GlassCard key={i} style={styles.eventCard}>
                <View style={styles.eventRow}>
                  <View style={[styles.eventDot, { backgroundColor: Colors.violet }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventTitle}>{e.title ?? `Event ${i + 1}`}</Text>
                    <Text style={styles.eventSub}>{e.date ?? 'Upcoming'}</Text>
                  </View>
                  <Badge label="Event" variant="violet" />
                </View>
              </GlassCard>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

function getQuickActions(role: string | undefined) {
  switch (role) {
    case 'SUPER_ADMIN':
    case 'INSTITUTION_ADMIN':
      return [
        { label: 'Students', icon: GraduationCap, href: '/(modules)/students', color: Colors.violet },
        { label: 'Attendance', icon: ClipboardList, href: '/(modules)/attendance', color: '#2d8c45' },
        { label: 'Finance', icon: DollarSign, href: '/(modules)/finance', color: '#ffd060' },
        { label: 'Events', icon: Calendar, href: '/(modules)/events', color: Colors.sky },
      ];
    case 'TEACHER':
      return [
        { label: 'Attendance', icon: ClipboardList, href: '/(modules)/attendance', color: '#2d8c45' },
        { label: 'Students', icon: GraduationCap, href: '/(modules)/students', color: Colors.violet },
        { label: 'Messages', icon: BookOpen, href: '/(modules)/messages', color: Colors.sky },
      ];
    case 'PARENT':
      return [
        { label: 'Pay Fees', icon: DollarSign, href: '/(modules)/finance', color: '#ffd060' },
        { label: 'Attendance', icon: ClipboardList, href: '/(modules)/attendance', color: '#2d8c45' },
        { label: 'Messages', icon: BookOpen, href: '/(modules)/messages', color: Colors.sky },
      ];
    case 'STUDENT':
      return [
        { label: 'Attendance', icon: ClipboardList, href: '/(modules)/attendance', color: '#2d8c45' },
        { label: 'Events', icon: Calendar, href: '/(modules)/events', color: Colors.sky },
        { label: 'Messages', icon: BookOpen, href: '/(modules)/messages', color: Colors.violet },
      ];
    default:
      return [];
  }
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { padding: 20, paddingBottom: 40 },

  roleBadgeRow: { marginBottom: 16 },
  rolePill: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, borderWidth: 1 },
  roleDot: { width: 6, height: 6, borderRadius: 3 },
  roleText: { fontSize: 12, fontWeight: '700' },

  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statHalf: { width: '47%' },
  statFull: { width: '100%' },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12, letterSpacing: -0.3 },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  quickCard: { width: '47%' },
  quickInner: { alignItems: 'flex-start', gap: 8, padding: 16 },
  quickIcon: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },

  eventCard: { marginBottom: 10, padding: 14 },
  eventRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  eventDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  eventTitle: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  eventSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
});
