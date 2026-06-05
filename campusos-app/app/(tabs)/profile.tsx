import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  LogOut, Settings, Shield, Bell, Moon, ChevronRight, User,
} from 'lucide-react-native';
import { useAuth, ROLE_LABELS, ROLE_COLORS } from '../../context/AuthContext';
import { GlassCard } from '../../components/GlassCard';
import { GradientHeader } from '../../components/GradientHeader';
import { Colors } from '../../constants/Colors';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [darkMode] = useState(true);

  const roleLabel = ROLE_LABELS[user?.role!] ?? 'User';
  const roleColor = ROLE_COLORS[user?.role!] ?? Colors.violet;

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: logout },
    ]);
  };

  const MENU = [
    {
      group: 'Account',
      items: [
        { label: 'Profile Settings', icon: Settings, onPress: () => {} },
        { label: 'Notifications', icon: Bell, onPress: () => {} },
        { label: 'Privacy & Security', icon: Shield, onPress: () => {} },
      ],
    },
    {
      group: 'Preferences',
      items: [
        { label: 'Dark Mode', icon: Moon, onPress: () => {}, right: (
          <View style={[styles.toggle, darkMode && styles.toggleOn]}>
            <View style={[styles.toggleKnob, darkMode && styles.toggleKnobOn]} />
          </View>
        )},
      ],
    },
  ];

  return (
    <View style={styles.root}>
      <GradientHeader title="Profile" subtitle="Manage your account" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Avatar card */}
        <GlassCard style={styles.avatarCard}>
          <LinearGradient colors={Colors.gradPrimary} style={styles.avatar} start={[0,0]} end={[1,1]}>
            <Text style={styles.avatarInitials}>{user?.initials ?? 'U'}</Text>
          </LinearGradient>
          <Text style={styles.userName}>{user?.name ?? 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email ?? ''}</Text>
          <View style={[styles.rolePill, { backgroundColor: roleColor + '18', borderColor: roleColor + '40' }]}>
            <Text style={[styles.roleText, { color: roleColor }]}>{roleLabel}</Text>
          </View>
        </GlassCard>

        {/* Menu groups */}
        {MENU.map((group) => (
          <View key={group.group} style={styles.menuGroup}>
            <Text style={styles.groupLabel}>{group.group}</Text>
            <GlassCard padded={false}>
              {group.items.map((item, i) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuItem,
                    i < group.items.length - 1 && styles.menuItemBorder,
                  ]}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                >
                  <View style={styles.menuLeft}>
                    <View style={styles.menuIconBox}>
                      <item.icon size={16} color={Colors.textSecondary} />
                    </View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </View>
                  {(item as any).right
                    ? (item as any).right
                    : <ChevronRight size={16} color={Colors.textMuted} />}
                </TouchableOpacity>
              ))}
            </GlassCard>
          </View>
        ))}

        {/* Tenant info */}
        <GlassCard style={styles.tenantCard}>
          <Text style={styles.tenantLabel}>INSTITUTION</Text>
          <Text style={styles.tenantName}>Delhi Public School</Text>
          <Text style={styles.tenantId}>DPS-001 · CampusOS Pro</Text>
        </GlassCard>

        {/* Logout */}
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.8} style={styles.logoutBtn}>
          <LogOut size={18} color="#c94040" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>CampusOS Mobile v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { padding: 20, paddingBottom: 40 },

  avatarCard: { alignItems: 'center', gap: 8, marginBottom: 20, paddingVertical: 28 },
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  avatarInitials: { fontSize: 26, fontWeight: '800', color: '#0a0b0f' },
  userName: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -0.4 },
  userEmail: { fontSize: 13, color: Colors.textMuted },
  rolePill: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 99, borderWidth: 1, marginTop: 4 },
  roleText: { fontSize: 12, fontWeight: '700' },

  menuGroup: { marginBottom: 20 },
  groupLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIconBox: { width: 32, height: 32, borderRadius: 8, backgroundColor: Colors.bgElevated, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },

  toggle: { width: 40, height: 22, borderRadius: 11, backgroundColor: Colors.bgElevated, borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', paddingHorizontal: 2 },
  toggleOn: { backgroundColor: Colors.violet, borderColor: Colors.violet },
  toggleKnob: { width: 16, height: 16, borderRadius: 8, backgroundColor: Colors.textMuted },
  toggleKnobOn: { backgroundColor: '#fff', alignSelf: 'flex-end' },

  tenantCard: { marginBottom: 20, gap: 4 },
  tenantLabel: { fontSize: 10, fontWeight: '700', color: Colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' },
  tenantName: { fontSize: 16, fontWeight: '800', color: Colors.textPrimary },
  tenantId: { fontSize: 12, color: Colors.textMuted },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, borderWidth: 1, borderColor: 'rgba(201,64,64,0.3)', borderRadius: 12, paddingVertical: 14, backgroundColor: 'rgba(201,64,64,0.08)', marginBottom: 16 },
  logoutText: { fontSize: 15, fontWeight: '700', color: '#c94040' },

  version: { textAlign: 'center', fontSize: 11, color: Colors.textMuted },
});
