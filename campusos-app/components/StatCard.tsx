import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import { GlassCard } from './GlassCard';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  sub?: string;
  style?: ViewStyle;
}

export function StatCard({ label, value, icon: Icon, iconColor, iconBg, sub, style }: StatCardProps) {
  return (
    <GlassCard style={[styles.card, style]}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <Icon size={20} color={iconColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    gap: 6,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  label: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  sub: {
    fontSize: 11,
    color: Colors.violet,
    fontWeight: '600',
  },
});
