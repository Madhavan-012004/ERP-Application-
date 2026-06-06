"use client";

import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import TeacherDashboard from "./TeacherDashboard";
import ParentDashboard from "./ParentDashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  if (!user) return null;

  switch (user.role) {
    case "Super Admin":
    case "Institution Admin":
      return <AdminDashboard />;
    case "Teacher":
      return <TeacherDashboard />;
    case "Parent":
      return <ParentDashboard />;
    default:
      return <AdminDashboard />;
  }
}
