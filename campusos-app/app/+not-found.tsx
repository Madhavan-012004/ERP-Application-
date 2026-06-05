import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View style={styles.root}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.sub}>This screen doesn't exist.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => router.replace('/')}>
        <Text style={styles.btnText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bgPrimary, alignItems: 'center', justifyContent: 'center', padding: 24 },
  code: { fontSize: 72, fontWeight: '800', color: Colors.violet, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  sub: { fontSize: 14, color: Colors.textMuted, marginBottom: 32 },
  btn: { backgroundColor: Colors.violet, paddingHorizontal: 28, paddingVertical: 13, borderRadius: 12 },
  btnText: { fontSize: 15, fontWeight: '700', color: '#0a0b0f' },
});
