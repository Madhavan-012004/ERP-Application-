import React from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  GraduationCap, ClipboardList, DollarSign, Calendar,
  BookOpen, Bus, Coffee, HeartPulse, Library, Package,
  Megaphone, Trophy, Shield, BarChart3, Building2, Boxes,
  MessageSquare, Bell, Settings, Users, ArrowRight,
} from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/GlassCard';
import { GradientHeader } from '../../components/GradientHeader';
import { Colors } from '../../constants/Colors';
import { UserRole } from '../../context/AuthContext';

interface Module {
  label: string;
  icon: any;
  href: string;
  color: string;
  bg: string;
  roles: UserRole[];
}

const ALL_MODULES: Module[] = [
  { label: 'Students',     icon: GraduationCap, href: '/(modules)/students',    color: Colors.violet,    bg: Colors.violetDim,              roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','TEACHER'] },
  { label: 'Teachers',     icon: Users,         href: '/(modules)/students',    color: '#1a7ab5',        bg: 'rgba(26,122,181,0.12)',        roles: ['SUPER_ADMIN','INSTITUTION_ADMIN'] },
  { label: 'Attendance',   icon: ClipboardList, href: '/(modules)/attendance',  color: '#2d8c45',        bg: 'rgba(45,140,69,0.12)',         roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','TEACHER','STUDENT','PARENT'] },
  { label: 'Finance',      icon: DollarSign,    href: '/(modules)/finance',     color: '#ffd060',        bg: 'rgba(255,208,96,0.12)',        roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','PARENT'] },
  { label: 'Events',       icon: Calendar,      href: '/(modules)/events',      color: Colors.sky,       bg: 'rgba(174,226,255,0.1)',        roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','TEACHER','STUDENT','PARENT'] },
  { label: 'Messages',     icon: MessageSquare, href: '/(modules)/messages',    color: Colors.violet,    bg: Colors.violetDim,              roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','TEACHER','STUDENT','PARENT'] },
  { label: 'Exams',        icon: Trophy,        href: '/(modules)/students',    color: '#c94040',        bg: 'rgba(201,64,64,0.12)',         roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','TEACHER','STUDENT','PARENT'] },
  { label: 'Library',      icon: Library,       href: '/(modules)/students',    color: '#1a7ab5',        bg: 'rgba(26,122,181,0.12)',        roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','TEACHER','STUDENT'] },
  { label: 'Transport',    icon: Bus,           href: '/(modules)/students',    color: '#6062d6',        bg: 'rgba(96,98,214,0.12)',         roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','STUDENT','PARENT'] },
  { label: 'Canteen',      icon: Coffee,        href: '/(modules)/students',    color: '#b87d00',        bg: 'rgba(220,160,20,0.12)',        roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','STUDENT'] },
  { label: 'Medical',      icon: HeartPulse,    href: '/(modules)/students',    color: '#c94040',        bg: 'rgba(201,64,64,0.12)',         roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','TEACHER'] },
  { label: 'Inventory',    icon: Package,       href: '/(modules)/students',    color: '#5458c4',        bg: 'rgba(84,88,196,0.12)',         roles: ['SUPER_ADMIN','INSTITUTION_ADMIN'] },
  { label: 'Announcements',icon: Megaphone,     href: '/(modules)/students',    color: Colors.violet,    bg: Colors.violetDim,              roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','TEACHER','STUDENT','PARENT'] },
  { label: 'Analytics',    icon: BarChart3,     href: '/(modules)/students',    color: '#2d8c45',        bg: 'rgba(45,140,69,0.12)',         roles: ['SUPER_ADMIN','INSTITUTION_ADMIN'] },
  { label: 'Institution',  icon: Building2,     href: '/(modules)/students',    color: '#1a7ab5',        bg: 'rgba(26,122,181,0.12)',        roles: ['SUPER_ADMIN','INSTITUTION_ADMIN'] },
  { label: 'Admissions',   icon: Boxes,         href: '/(modules)/students',    color: Colors.violet,    bg: Colors.violetDim,              roles: ['SUPER_ADMIN','INSTITUTION_ADMIN'] },
  { label: 'Security',     icon: Shield,        href: '/(modules)/students',    color: '#c94040',        bg: 'rgba(201,64,64,0.12)',         roles: ['SUPER_ADMIN','INSTITUTION_ADMIN'] },
  { label: 'Settings',     icon: Settings,      href: '/(tabs)/profile',        color: Colors.textMuted, bg: 'rgba(90,92,114,0.12)',         roles: ['SUPER_ADMIN','INSTITUTION_ADMIN','TEACHER','STUDENT','PARENT'] },
];

export default function ModulesScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const visibleModules = ALL_MODULES.filter(m =>
    user?.role && m.roles.includes(user.role)
  );

  return (
    <View style={styles.root}>
      <GradientHeader title="Modules" subtitle={`${visibleModules.length} modules available`} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {visibleModules.map((mod) => (
            <TouchableOpacity
              key={mod.label}
              style={styles.cell}
              onPress={() => router.push(mod.href as any)}
              activeOpacity={0.75}
            >
              <GlassCard style={styles.modCard}>
                <View style={[styles.iconBox, { backgroundColor: mod.bg }]}>
                  <mod.icon size={24} color={mod.color} />
                </View>
                <Text style={styles.modLabel}>{mod.label}</Text>
                <ArrowRight size={12} color={Colors.textMuted} style={{ marginTop: 2 }} />
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { padding: 16, paddingBottom: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cell: { width: '30%', flexGrow: 1 },
  modCard: { alignItems: 'center', padding: 16, gap: 8 },
  iconBox: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  modLabel: { fontSize: 12, fontWeight: '700', color: Colors.textPrimary, textAlign: 'center' },
});
