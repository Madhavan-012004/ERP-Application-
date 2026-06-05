import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * Base URL: on Android emulator localhost = 10.0.2.2
 * On a real device, use the actual LAN IP where the backend is running.
 * On iOS Simulator, localhost works directly.
 */
const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:8080/api/v1';
    }
    return 'http://localhost:8080/api/v1';
  }
  return 'https://api.campusos.io/api/v1'; // production
};

export const BASE_URL = getBaseUrl();

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach JWT token to every request automatically
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('campusos_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally (token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('campusos_token');
      await AsyncStorage.removeItem('campusos_user');
    }
    return Promise.reject(error);
  }
);

// ── Auth ──────────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ token: string; role: string; email: string }>('/auth/login', { email, password }),
};

// ── Students ──────────────────────────────────────────────
export const studentsApi = {
  getAll: () => api.get('/students'),
  getById: (id: string) => api.get(`/students/${id}`),
  create: (data: any) => api.post('/students', data),
  update: (id: string, data: any) => api.put(`/students/${id}`, data),
  delete: (id: string) => api.delete(`/students/${id}`),
};

// ── Attendance ────────────────────────────────────────────
export const attendanceApi = {
  mark: (data: any) => api.post('/attendance', data),
  getByStudent: (studentId: string) => api.get(`/attendance/student/${studentId}`),
  getByDate: (date: string) => api.get(`/attendance/date/${date}`),
};

// ── Finance ───────────────────────────────────────────────
export const financeApi = {
  getAllInvoices: () => api.get('/finance/invoices'),
  getStudentInvoices: (studentId: string) => api.get(`/finance/students/${studentId}/invoices`),
  createInvoice: (data: any) => api.post('/finance/invoices', data),
  recordPayment: (id: string, amount: number) =>
    api.post(`/finance/invoices/${id}/pay`, null, { params: { amount } }),
};

// ── Messages ──────────────────────────────────────────────
export const messagesApi = {
  send: (data: any) => api.post('/messages', data),
  getChannel: (channelId: string) => api.get(`/messages/channels/${channelId}`),
  getDirect: (receiverId: string) => api.get(`/messages/direct/${receiverId}`),
};

// ── Events ────────────────────────────────────────────────
export const eventsApi = {
  getAll: () => api.get('/events'),
  getById: (id: string) => api.get(`/events/${id}`),
  create: (data: any) => api.post('/events', data),
};

// ── Certificates ──────────────────────────────────────────
export const certificatesApi = {
  getAll: () => api.get('/certificates'),
  generate: (data: any) => api.post('/certificates', data),
};

// ── Library ───────────────────────────────────────────────
export const libraryApi = {
  getAll: () => api.get('/library'),
  borrowBook: (data: any) => api.post('/library/borrow', data),
};

// ── Hostel ────────────────────────────────────────────────
export const hostelApi = {
  getRooms: () => api.get('/hostel/rooms'),
  allocate: (data: any) => api.post('/hostel/allocate', data),
};

// ── Transport ─────────────────────────────────────────────
export const transportApi = {
  getRoutes: () => api.get('/transport/routes'),
  assign: (data: any) => api.post('/transport/assign', data),
};

export default api;
