"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Trophy, Calendar, Award, BookOpen, Clock, Download,
  Filter, MapPin, MoreVertical, Plus, Search, TrendingUp
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// Mock Data
const UPCOMING_EXAMS = [
  { id: 1, title: "Mid-Term Physics Practicals", date: "Nov 12, 2026", time: "09:00 AM - 12:00 PM", room: "Lab 302", subject: "Physics", type: "Practical" },
  { id: 2, title: "Advanced Mathematics Written", date: "Nov 15, 2026", time: "10:00 AM - 01:00 PM", room: "Main Hall", subject: "Mathematics", type: "Written" },
  { id: 3, title: "Computer Science Project Viva", date: "Nov 18, 2026", time: "02:00 PM - 04:00 PM", room: "Lab 401", subject: "Computer Science", type: "Viva" },
];

const PAST_RESULTS = [
  { id: 101, title: "Quarterly Assessment 1", subject: "Physics", date: "Aug 10, 2026", score: 85, total: 100, grade: "A", classAverage: 76 },
  { id: 102, title: "Quarterly Assessment 1", subject: "Mathematics", date: "Aug 12, 2026", score: 92, total: 100, grade: "A+", classAverage: 81 },
  { id: 103, title: "Quarterly Assessment 1", subject: "Chemistry", date: "Aug 14, 2026", score: 78, total: 100, grade: "B+", classAverage: 72 },
  { id: 104, title: "Quarterly Assessment 1", subject: "English", date: "Aug 16, 2026", score: 88, total: 100, grade: "A", classAverage: 84 },
];

const PERFORMANCE_DATA = [
  { subject: "Physics", score: 85, avg: 76 },
  { subject: "Math", score: 92, avg: 81 },
  { subject: "Chem", score: 78, avg: 72 },
  { subject: "Eng", score: 88, avg: 84 },
  { subject: "CS", score: 95, avg: 79 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 14px", boxShadow: "var(--shadow-md)" }}>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>{label}</p>
        <p style={{ fontSize: "13px", fontWeight: "600", color: "#9FA1FF" }}>Your Score: {payload[0].value}</p>
        <p style={{ fontSize: "12px", fontWeight: "500", color: "var(--text-secondary)" }}>Class Avg: {payload[1].value}</p>
      </div>
    );
  }
  return null;
}

export default function ExaminationsDashboard() {
  const { user } = useAuth();
  const isStaff = user?.role === "Teacher" || user?.role === "Institution Admin" || user?.role === "Super Admin";
  const isStudentOrParent = user?.role === "Parent";

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Examinations & Results
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            {isStaff ? "Manage exam schedules, publish results, and generate report cards" : "View your upcoming exams, past results, and performance analytics"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {isStaff && (
            <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}><Plus size={14} /> Schedule Exam</button>
          )}
          <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><Download size={14} /> Generate Report Card</button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Overall CGPA", value: isStaff ? "7.8" : "8.4", icon: Award, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Upcoming Exams", value: "3", icon: Calendar, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          { label: "Total Credits", value: "120", icon: BookOpen, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Class Rank", value: isStaff ? "N/A" : "5th", icon: Trophy, color: "#ffd060", bg: "rgba(255,208,96,0.1)" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px" }}>
            <div className="module-icon" style={{ background: s.bg }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        
        {/* Left Col: Upcoming Exams */}
        <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)" }}>
            <div className="section-title" style={{ fontSize: "14px" }}>Upcoming Examinations</div>
            {isStaff && <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: "12px" }}>Manage</button>}
          </div>
          <div style={{ padding: "0" }}>
            {UPCOMING_EXAMS.map((exam, idx) => (
              <div key={exam.id} style={{ display: "flex", gap: "16px", padding: "16px 20px", borderBottom: idx !== UPCOMING_EXAMS.length - 1 ? "1px solid var(--border)" : "none" }}>
                {/* Date Badge */}
                <div style={{ width: "60px", height: "64px", background: "rgba(159,161,255,0.06)", border: "1px solid var(--border)", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--violet)", textTransform: "uppercase" }}>{exam.date.split(" ")[0]}</div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-primary)" }}>{exam.date.split(" ")[1].replace(",", "")}</div>
                </div>
                
                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14.5px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
                    {exam.title}
                    <span className="badge" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "10px" }}>{exam.type}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "12px", color: "var(--text-muted)" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><BookOpen size={12} /> {exam.subject}</span>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><Clock size={12} /> {exam.time}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><MapPin size={12} /> {exam.room}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Performance Analytics */}
        <div className="stat-card" style={{ padding: "20px" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Performance Analytics</div>
              <div className="section-subtitle">Student vs Class Average</div>
            </div>
          </div>
          <div style={{ height: "240px", marginTop: "20px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="subject" tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(159,161,255,0.05)" }} />
                <Bar dataKey="score" fill="#9FA1FF" radius={[4, 4, 0, 0]} name="Your Score" barSize={24} />
                <Bar dataKey="avg" fill="rgba(159,161,255,0.2)" radius={[4, 4, 0, 0]} name="Class Avg" barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Bottom Table: Past Results */}
      <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)" }}>
          <div className="section-title" style={{ fontSize: "14px" }}>Recent Results</div>
          <div style={{ display: "flex", gap: "8px" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: "10px", top: "8px", color: "var(--text-muted)" }} />
              <input type="text" className="input-field" placeholder="Search..." style={{ paddingLeft: "32px", width: "180px", fontSize: "12px", padding: "6px 10px" }} />
            </div>
            <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: "12px", background: "var(--bg-card)", border: "1px solid var(--border)" }}><Filter size={14} style={{ marginRight: 6 }} /> Filter</button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Assessment</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Score</th>
              <th>Grade</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {PAST_RESULTS.map((res, i) => (
              <tr key={i}>
                <td>
                  <div style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)" }}>{res.title}</div>
                </td>
                <td>{res.subject}</td>
                <td>{res.date}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "60px", height: "6px", background: "var(--border)", borderRadius: "3px", overflow: "hidden" }}>
                      <div style={{ height: "100%", background: "var(--violet)", width: `${(res.score / res.total) * 100}%` }}></div>
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{res.score}/{res.total}</span>
                  </div>
                </td>
                <td>
                  <span className="badge" style={{ 
                    background: res.grade.includes("A") ? "rgba(217,249,223,0.2)" : "rgba(159,161,255,0.15)",
                    color: res.grade.includes("A") ? "#2d8c45" : "#6062d6",
                    border: res.grade.includes("A") ? "1px solid rgba(45,140,69,0.2)" : "1px solid rgba(96,98,214,0.2)"
                  }}>{res.grade}</span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className="btn-ghost" style={{ padding: "6px" }}><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}
