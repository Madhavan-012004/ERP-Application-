import { AuthProvider, useAuth } from '../context/AuthContext';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LoadingSpinner } from '../components/LoadingSpinner';

function RouteGuard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;
    const inAuthArea = segments[0] === '(tabs)' || segments[0] === '(modules)';
    if (!user && inAuthArea) {
      router.replace('/');
    } else if (user && !inAuthArea) {
      router.replace('/(tabs)/dashboard');
    }
  }, [user, loading, segments]);

  if (loading) return <LoadingSpinner message="Restoring session…" />;
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" backgroundColor="#0a0b0f" />
      <RouteGuard />
    </AuthProvider>
  );
}
