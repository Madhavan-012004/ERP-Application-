# CampusOS Mobile App

React Native (Expo) mobile application for the CampusOS ERP platform.

## Tech Stack
- **Framework**: Expo (React Native)
- **Routing**: Expo Router (file-based, same as Next.js)
- **API**: Axios with JWT Bearer token auth
- **Storage**: AsyncStorage for session persistence
- **Icons**: lucide-react-native
- **Styling**: Expo LinearGradient + custom StyleSheet

## Project Structure
```
app/
  _layout.tsx           ← Root layout + Auth guard
  index.tsx             ← Login screen → POST /api/v1/auth/login
  (tabs)/
    dashboard.tsx       ← Role-adaptive dashboard
    modules.tsx         ← All module grid
    notifications.tsx   ← Alerts & notifications
    profile.tsx         ← Profile & sign out
  (modules)/
    attendance.tsx      ← Mark & view attendance
    finance.tsx         ← Fee invoices & payment
    students.tsx        ← Student management
    messages.tsx        ← Channel messaging
    events.tsx          ← Events calendar
components/
  GlassCard.tsx         ← Dark glassmorphic card
  StatCard.tsx          ← Stats with icon
  Badge.tsx             ← Status pill badges
  LoadingSpinner.tsx    ← Full-screen loader
  GradientHeader.tsx    ← Screen header with safe area
constants/
  Colors.ts             ← Dark theme palette
  Api.ts                ← Axios instance + all API groups
context/
  AuthContext.tsx       ← Login/logout + JWT storage
```

## Running Locally

### Prerequisites
- Node.js 18+
- Expo Go app on your Android/iOS device (from Play Store / App Store)
- Backend running at `localhost:8080`

### Start dev server
```bash
cd campusos-app
npm start
```
Then **scan the QR code** with:
- **Android**: Expo Go app
- **iOS**: Camera app or Expo Go

### Android Emulator
```bash
npm run android
```

### iOS Simulator (macOS only)
```bash
npm run ios
```

## API Base URL
- **Android Emulator**: `http://10.0.2.2:8080/api/v1`
- **iOS Simulator**: `http://localhost:8080/api/v1`
- **Real Device**: Change `BASE_URL` in `constants/Api.ts` to your machine's **local IP** (e.g. `http://192.168.1.10:8080/api/v1`)

## Role-Based Access
| Role | Finance | Students (Fee) | Attendance | Messages |
|------|---------|----------------|------------|---------|
| Super Admin | ✅ Full | ✅ All info | ✅ Mark | ✅ |
| Institution Admin | ✅ Full | ✅ All info | ✅ Mark | ✅ |
| Teacher | ❌ Hidden | ✅ No fee info | ✅ Mark | ✅ |
| Parent | ✅ Own child | ❌ | ✅ View | ✅ |
| Student | ❌ Hidden | ❌ | ✅ Own | ✅ |
