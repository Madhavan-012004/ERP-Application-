import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

type Variant = 'violet' | 'mint' | 'sky' | 'yellow' | 'red' | 'green';

interface BadgeProps {
  label: string;
  variant?: Variant;
}

const VARIANTS: Record<Variant, { bg: string; color: string }> = {
  violet: { bg: Colors.violetDim, color: Colors.violet },
  mint:   { bg: 'rgba(45,140,69,0.15)', color: '#2d8c45' },
  sky:    { bg: 'rgba(26,122,181,0.15)', color: '#1a7ab5' },
  yellow: { bg: 'rgba(220,160,20,0.15)', color: '#b87d00' },
  red:    { bg: 'rgba(201,64,64,0.15)', color: '#c94040' },
  green:  { bg: 'rgba(45,140,69,0.15)', color: '#2d8c45' },
};

export function Badge({ label, variant = 'violet' }: BadgeProps) {
  const { bg, color } = VARIANTS[variant];
  return (
    <Text style={[styles.badge, { backgroundColor: bg, color }]}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  badge: {
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 99,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
