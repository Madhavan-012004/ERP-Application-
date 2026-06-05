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
          { icon: Calendar, label: "Classes Today", value: "4", change: "Next class in 15 mins", color: "#6062d6", bg: "rgba(96,98,214,0.12)" },
          { icon: BookOpen, label: "Subjects Taught", value: "3", change: "Mathematics, Physics", color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
          { icon: ClipboardList, label: "Attendance Pending", value: "2", change: "Grade 10-A, 10-B", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
          { icon: FileText, label: "Assignments to Grade", value: "45", change: "Due this week", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
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
            {[
              { time: "09:00 AM - 09:45 AM", subject: "Mathematics", class: "Grade 10-A", room: "Room 101", status: "Completed", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
              { time: "10:00 AM - 10:45 AM", subject: "Physics", class: "Grade 11-B", room: "Lab 2", status: "Ongoing", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
              { time: "11:30 AM - 12:15 PM", subject: "Mathematics", class: "Grade 9-C", room: "Room 93", status: "Upcoming", color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
            ].map((schedule, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", padding: "12px", borderRadius: "12px", background: "var(--bg-secondary)" }}>
                <div style={{ width: "80px", flexShrink: 0, fontSize: "12px", color: "var(--text-muted)", fontWeight: "500", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  {schedule.time.split(" - ").map((t, idx) => <span key={idx}>{t}</span>)}
                </div>
                <div style={{ flex: 1, borderLeft: "2px solid var(--border)", paddingLeft: "16px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{schedule.subject} - {schedule.class}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>{schedule.room}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                   <span className={`badge`} style={{ color: schedule.color, background: schedule.bg, border: `1px solid ${schedule.color}30` }}>{schedule.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>Action Items</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { label: "Mark Grade 10-A Attendance", icon: CheckCircle2 },
              { label: "Grade Physics Assignment", icon: FileText },
              { label: "Prepare Quiz for Grade 9", icon: BookOpen },
            ].map((action, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", background: "var(--bg-secondary)", borderRadius: "8px", cursor: "pointer" }}>
                <action.icon size={18} color="var(--violet)" />
                <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>{action.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
