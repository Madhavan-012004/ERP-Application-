"use client";

import { useAuth } from "../../context/AuthContext";
import { BookOpen, Calendar, ClipboardList, FileText, CheckCircle2 } from "lucide-react";

export default function TeacherDashboard() {
  const { user } = useAuth();

  return (
    <div className="page-content">
      <div className="section-header">
        <div>
          <h1 className="section-title">Welcome back, {user?.name}</h1>
          <p className="section-subtitle">Here's your schedule and tasks for today.</p>
        </div>
      </div>

      {/* Teacher Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {[
          { icon: Calendar, label: "Classes Today", value: "0", change: "None scheduled", color: "#6062d6", bg: "rgba(96,98,214,0.12)" },
          { icon: BookOpen, label: "Subjects Taught", value: "0", change: "Not assigned", color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
          { icon: ClipboardList, label: "Attendance Pending", value: "0", change: "All up to date", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
          { icon: FileText, label: "Assignments to Grade", value: "0", change: "None pending", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <stat.icon size={20} color={stat.color} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px" }}>{stat.value}</div>
            <div style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "500", marginBottom: "4px" }}>{stat.label}</div>
            <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>{stat.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Today's Schedule */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div className="section-header">
            <h2 className="section-title">Today's Schedule</h2>
            <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: "12px" }}>View Full Timetable</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ padding: "32px", textAlign: "center", color: "var(--text-muted)", fontSize: "14px" }}>
              No classes scheduled for today.
            </div>
          </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>Action Items</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "20px", textAlign: "center", color: "var(--text-muted)", fontSize: "14px" }}>
              No action items for today!
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
