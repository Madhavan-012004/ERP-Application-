import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  RefreshControl, Alert, TextInput,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, DollarSign, CheckCircle2, Clock, AlertTriangle, CreditCard } from 'lucide-react-native';
import { financeApi } from '../../constants/Api';
import { useAuth } from '../../context/AuthContext';
import { GlassCard } from '../../components/GlassCard';
import { Badge } from '../../components/Badge';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { GradientHeader } from '../../components/GradientHeader';
import { Colors } from '../../constants/Colors';

export default function FinanceScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [payingId, setPayingId] = useState<string | null>(null);

  const isAdmin = user?.role === 'SUPER_ADMIN' || user?.role === 'INSTITUTION_ADMIN';

  const fetchInvoices = async () => {
    try {
      const res = isAdmin
        ? await financeApi.getAllInvoices()
        : await financeApi.getStudentInvoices(user?.email ?? '');
      setInvoices(res.data ?? []);
    } catch {
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchInvoices();
    setRefreshing(false);
  };

  const handlePay = (invoice: any) => {
    Alert.alert(
      'Confirm Payment',
      `Pay ₹${invoice.amount ?? 0} for ${invoice.description ?? 'Fee'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay Now',
          onPress: async () => {
            try {
              setPayingId(invoice.id);
              await financeApi.recordPayment(invoice.id, invoice.amount);
              Alert.alert('✓ Payment Successful', 'Your fee has been recorded.');
              await fetchInvoices();
            } catch {
              Alert.alert('Payment Failed', 'Could not process payment. Please try again.');
            } finally {
              setPayingId(null);
            }
          },
        },
      ]
    );
  };

  const totalPending = invoices
    .filter(i => i.status === 'PENDING' || i.status === 'OVERDUE')
    .reduce((sum, i) => sum + (i.amount ?? 0), 0);
  const totalPaid = invoices
    .filter(i => i.status === 'PAID')
    .reduce((sum, i) => sum + (i.amount ?? 0), 0);

  const statusBadge = (status: string) => {
    if (status === 'PAID') return 'mint';
    if (status === 'OVERDUE') return 'red';
    return 'yellow';
  };

  if (loading) return <LoadingSpinner message="Loading invoices…" />;

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false }} />
      <GradientHeader
        title="Finance"
        subtitle={isAdmin ? 'All fee invoices' : 'Your fee summary'}
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
        {/* Summary */}
        <View style={styles.summaryRow}>
          <GlassCard style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: 'rgba(255,208,96,0.12)' }]}>
              <Clock size={18} color="#ffd060" />
            </View>
            <Text style={[styles.summaryValue, { color: '#ffd060' }]}>₹{totalPending.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </GlassCard>
          <GlassCard style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: 'rgba(45,140,69,0.12)' }]}>
              <CheckCircle2 size={18} color="#2d8c45" />
            </View>
            <Text style={[styles.summaryValue, { color: '#2d8c45' }]}>₹{totalPaid.toLocaleString()}</Text>
            <Text style={styles.summaryLabel}>Paid</Text>
          </GlassCard>
          <GlassCard style={styles.summaryCard}>
            <View style={[styles.summaryIcon, { backgroundColor: Colors.violetDim }]}>
              <DollarSign size={18} color={Colors.violet} />
            </View>
            <Text style={[styles.summaryValue, { color: Colors.violet }]}>{invoices.length}</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </GlassCard>
        </View>

        {/* Invoices */}
        {invoices.length === 0 ? (
          <GlassCard style={styles.emptyCard}>
            <CreditCard size={40} color={Colors.textMuted} />
            <Text style={styles.emptyTitle}>No Invoices Found</Text>
            <Text style={styles.emptyDesc}>No fee invoices are available for your account.</Text>
          </GlassCard>
        ) : (
          invoices.map((inv: any, i: number) => (
            <GlassCard key={inv.id ?? i} style={styles.invoiceCard}>
              <View style={styles.invoiceTop}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.invoiceTitle}>{inv.description ?? `Invoice #${inv.id ?? i + 1}`}</Text>
                  <Text style={styles.invoiceSub}>
                    {inv.studentName ?? inv.studentId ?? 'Student'} · Due: {inv.dueDate ?? 'N/A'}
                  </Text>
                </View>
                <Badge label={inv.status ?? 'PENDING'} variant={statusBadge(inv.status)} />
              </View>

              <View style={styles.invoiceAmountRow}>
                <Text style={styles.invoiceAmount}>₹{(inv.amount ?? 0).toLocaleString()}</Text>
                {(inv.status === 'PENDING' || inv.status === 'OVERDUE') && (
                  <TouchableOpacity
                    style={[styles.payBtn, payingId === inv.id && styles.payBtnDisabled]}
                    onPress={() => handlePay(inv)}
                    disabled={payingId === inv.id}
                    activeOpacity={0.8}
                  >
                    <CreditCard size={13} color="#0a0b0f" />
                    <Text style={styles.payBtnText}>
                      {payingId === inv.id ? 'Processing…' : 'Pay Now'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {inv.status === 'OVERDUE' && (
                <View style={styles.overdueWarn}>
                  <AlertTriangle size={13} color="#c94040" />
                  <Text style={styles.overdueText}>This invoice is overdue. Please pay immediately.</Text>
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
  summaryValue: { fontSize: 18, fontWeight: '800' },
  summaryLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '600' },

  emptyCard: { alignItems: 'center', gap: 10, paddingVertical: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  emptyDesc: { fontSize: 13, color: Colors.textMuted, textAlign: 'center', lineHeight: 19 },

  invoiceCard: { marginBottom: 12, gap: 12 },
  invoiceTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  invoiceTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 3 },
  invoiceSub: { fontSize: 12, color: Colors.textMuted },
  invoiceAmountRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  invoiceAmount: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  payBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.violet, paddingHorizontal: 16, paddingVertical: 9, borderRadius: 10 },
  payBtnDisabled: { opacity: 0.5 },
  payBtnText: { fontSize: 13, fontWeight: '700', color: '#0a0b0f' },
  overdueWarn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(201,64,64,0.08)', borderWidth: 1, borderColor: 'rgba(201,64,64,0.2)', borderRadius: 8, padding: 10 },
  overdueText: { fontSize: 12, color: '#c94040', flex: 1 },
});
