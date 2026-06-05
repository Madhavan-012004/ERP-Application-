import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Eye, EyeOff, GraduationCap, ArrowRight, Lock } from 'lucide-react-native';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/Colors';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    try {
      setLoading(true);
      await login(email.trim(), password);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        'Invalid credentials. Please try again.';
      Alert.alert('Login Failed', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* BG Blobs */}
        <View style={[styles.blob, { top: -80, right: -60, backgroundColor: 'rgba(159,161,255,0.12)' }]} />
        <View style={[styles.blob, { bottom: 60, left: -80, backgroundColor: 'rgba(174,226,255,0.08)', width: 220, height: 220 }]} />

        {/* Logo */}
        <View style={styles.logoRow}>
          <LinearGradient colors={Colors.gradPrimary} style={styles.logoBox} start={[0,0]} end={[1,1]}>
            <GraduationCap size={22} color="#0a0b0f" />
          </LinearGradient>
          <View>
            <Text style={styles.logoName}>Campus<Text style={styles.logoAccent}>OS</Text></Text>
            <Text style={styles.logoCap}>DIGITAL CAMPUS PLATFORM</Text>
          </View>
        </View>

        {/* Heading */}
        <View style={styles.heroSection}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>✦ Enterprise Education Platform</Text>
          </View>
          <Text style={styles.heroTitle}>
            The{' '}
            <Text style={styles.heroGradient}>Operating System</Text>
            {'\n'}for your Campus
          </Text>
          <Text style={styles.heroSub}>
            One app for students, parents, teachers and administrators.
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome back</Text>
          <Text style={styles.cardSub}>Sign in to your CampusOS workspace</Text>

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>Email / ID</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email or ID"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {/* Password */}
          <View style={styles.field}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Password</Text>
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.passwordWrap}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="••••••••"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPass(!showPass)}
              >
                {showPass
                  ? <EyeOff size={18} color={Colors.textMuted} />
                  : <Eye size={18} color={Colors.textMuted} />}
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[styles.signInBtn, (loading || !email || !password) && styles.signInBtnDisabled]}
            onPress={handleLogin}
            disabled={loading || !email || !password}
            activeOpacity={0.85}
          >
            <LinearGradient colors={Colors.gradPrimary} style={styles.signInGrad} start={[0,0]} end={[1,0]}>
              {loading
                ? <ActivityIndicator color="#0a0b0f" />
                : <>
                    <Text style={styles.signInText}>Sign In</Text>
                    <ArrowRight size={18} color="#0a0b0f" />
                  </>
              }
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* OTP Button */}
          <TouchableOpacity style={styles.otpBtn} activeOpacity={0.85}>
            <Lock size={14} color={Colors.textSecondary} />
            <Text style={styles.otpText}>Login with OTP</Text>
          </TouchableOpacity>

          <Text style={styles.security}>🔒 Secured by JWT · Multi-Factor Auth · SOC2 Compliant</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary },
  scroll: { flexGrow: 1, paddingHorizontal: 20, paddingBottom: 40 },
  blob: { position: 'absolute', width: 260, height: 260, borderRadius: 130, zIndex: 0 },

  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 64, marginBottom: 32 },
  logoBox: { width: 42, height: 42, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  logoName: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
  logoAccent: { color: Colors.violet },
  logoCap: { fontSize: 9, color: Colors.textMuted, letterSpacing: 1.2 },

  heroSection: { marginBottom: 28 },
  heroBadge: { backgroundColor: Colors.violetDim, borderWidth: 1, borderColor: Colors.violetBorder, borderRadius: 99, paddingHorizontal: 12, paddingVertical: 5, alignSelf: 'flex-start', marginBottom: 14 },
  heroBadgeText: { fontSize: 11, color: Colors.violet, fontWeight: '600' },
  heroTitle: { fontSize: 32, fontWeight: '800', color: Colors.textPrimary, lineHeight: 40, letterSpacing: -0.8, marginBottom: 10 },
  heroGradient: { color: Colors.violet },
  heroSub: { fontSize: 14, color: Colors.textSecondary, lineHeight: 21 },

  card: { backgroundColor: Colors.bgCard, borderRadius: 20, borderWidth: 1, borderColor: Colors.border, padding: 24, zIndex: 1 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  cardSub: { fontSize: 13, color: Colors.textMuted, marginBottom: 22 },

  field: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary, marginBottom: 7 },
  labelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 },
  forgot: { fontSize: 12, color: Colors.violet, fontWeight: '500' },

  input: {
    backgroundColor: Colors.bgElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 11,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  passwordWrap: { position: 'relative' },
  passwordInput: { paddingRight: 46 },
  eyeBtn: { position: 'absolute', right: 12, top: 0, bottom: 0, justifyContent: 'center' },

  signInBtn: { borderRadius: 12, overflow: 'hidden', marginTop: 4 },
  signInBtnDisabled: { opacity: 0.5 },
  signInGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14 },
  signInText: { fontSize: 15, fontWeight: '700', color: '#0a0b0f' },

  divider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 18 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerText: { fontSize: 12, color: Colors.textMuted },

  otpBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, paddingVertical: 13, backgroundColor: Colors.bgElevated },
  otpText: { fontSize: 14, fontWeight: '600', color: Colors.textSecondary },

  security: { fontSize: 11, color: Colors.textMuted, textAlign: 'center', marginTop: 18, lineHeight: 18 },
});
