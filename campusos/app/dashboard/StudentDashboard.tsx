"use client";

import { useAuth } from "../../context/AuthContext";
import { GraduationCap, Calendar, ClipboardList, BookOpen, Clock, FileText } from "lucide-react";

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="page-content">
      <div className="section-header">
        <div>
          <h1 className="section-title">Welcome, {user?.name}</h1>
          <p className="section-subtitle">Here's your academic overview for today.</p>
        </div>
      </div>

      {/* Student Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {[
          { icon: ClipboardList, label: "My Attendance", value: "92.5%", change: "Last 30 days", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
          { icon: BookOpen, label: "Current GPA", value: "3.8", change: "Top 10% in class", color: "#6062d6", bg: "rgba(96,98,214,0.12)" },
          { icon: FileText, label: "Pending Assignments", value: "3", change: "1 due tomorrow", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
          { icon: Calendar, label: "Upcoming Exams", value: "2", change: "Next week", color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
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
        {/* Today's Classes */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div className="section-header">
            <h2 className="section-title">Today's Classes</h2>
            <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: "12px" }}>View Timetable</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { time: "09:00 AM", subject: "Mathematics", teacher: "Mr. Sharma", room: "Room 101", status: "Completed", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
              { time: "10:00 AM", subject: "Physics", teacher: "Ms. Gupta", room: "Lab 2", status: "Ongoing", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
              { time: "11:30 AM", subject: "Chemistry", teacher: "Dr. Singh", room: "Lab 1", status: "Upcoming", color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
            ].map((schedule, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", padding: "12px", borderRadius: "12px", background: "var(--bg-secondary)" }}>
                <div style={{ width: "60px", flexShrink: 0, fontSize: "12px", color: "var(--text-muted)", fontWeight: "500", display: "flex", alignItems: "center" }}>
                   {schedule.time}
                </div>
                <div style={{ flex: 1, borderLeft: "2px solid var(--border)", paddingLeft: "16px" }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{schedule.subject}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>{schedule.teacher} • {schedule.room}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                   <span className={`badge`} style={{ color: schedule.color, background: schedule.bg, border: `1px solid ${schedule.color}30` }}>{schedule.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments Due */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>Assignments Due</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { title: "Algebra Worksheet", subject: "Mathematics", due: "Tomorrow" },
              { title: "Physics Lab Report", subject: "Physics", due: "In 2 days" },
              { title: "History Essay", subject: "History", due: "Next week" },
            ].map((task, i) => (
              <div key={i} style={{ padding: "12px", background: "var(--bg-secondary)", borderRadius: "8px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{task.title}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", display: "flex", justifyContent: "space-between" }}>
                  <span>{task.subject}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "#9b6e00" }}>
                    <Clock size={12} /> {task.due}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
