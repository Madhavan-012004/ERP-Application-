"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  ClipboardCheck, Calendar as CalendarIcon, ChevronDown, CheckCircle2,
  XCircle, Clock, TrendingUp, Users, Filter, Download,
  AlertCircle, BarChart3, BookOpen
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const CLASSES = ["10-A", "10-B", "11-A", "11-B", "12-A", "12-B"];

const STUDENTS_ATT = [
  { name: "Anjali Singh", roll: "001", status: "present", time: "08:14" },
  { name: "Rahul Gupta", roll: "002", status: "present", time: "08:09" },
  { name: "Meera Nair", roll: "003", status: "absent", time: "—" },
  { name: "Vikram Shah", roll: "004", status: "late", time: "08:52" },
  { name: "Pooja Rao", roll: "005", status: "present", time: "08:11" },
  { name: "Arjun Mehta", roll: "006", status: "present", time: "08:07" },
  { name: "Sneha Joshi", roll: "007", status: "absent", time: "—" },
  { name: "Kiran Kumar", roll: "008", status: "present", time: "08:22" },
  { name: "Priya Das", roll: "009", status: "present", time: "08:17" },
  { name: "Rohit Singh", roll: "010", status: "late", time: "09:05" },
];

const MONTHLY_DATA = [
  { week: "W1", present: 92, absent: 8 },
  { week: "W2", present: 88, absent: 12 },
  { week: "W3", present: 95, absent: 5 },
  { week: "W4", present: 91, absent: 9 },
];

const SUBJECT_ATT = [
  { subject: "Mathematics", pct: 94 },
  { subject: "Physics", pct: 91 },
  { subject: "Chemistry", pct: 88 },
  { subject: "English", pct: 96 },
  { subject: "Computer Science", pct: 98 },
  { subject: "Physical Education", pct: 87 },
];

const AVATAR_COLORS = [
  "linear-gradient(135deg,#9FA1FF,#B5BAFF)",
  "linear-gradient(135deg,#AEE2FF,#9FA1FF)",
  "linear-gradient(135deg,#D9F9DF,#AEE2FF)",
  "linear-gradient(135deg,#B5BAFF,#9FA1FF)",
  "linear-gradient(135deg,#AEE2FF,#B5BAFF)",
];

function StatusBadge({ status }: { status: string }) {
  if (status === "present") return (
    <span className="badge badge-mint" style={{ gap: "4px", display: "flex", alignItems: "center", width: "fit-content" }}>
      <CheckCircle2 size={10} /> Present
    </span>
  );
  if (status === "absent") return (
    <span className="badge badge-red" style={{ gap: "4px", display: "flex", alignItems: "center", width: "fit-content" }}>
      <XCircle size={10} /> Absent
    </span>
  );
  return (
    <span className="badge badge-yellow" style={{ gap: "4px", display: "flex", alignItems: "center", width: "fit-content" }}>
      <Clock size={10} /> Late
    </span>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 14px" }}>
        <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ fontSize: "13px", fontWeight: "600", color: p.color }}>{p.name}: {p.value}%</p>
        ))}
      </div>
    );
  }
  return null;
}

function AdminTeacherAttendance() {
  const [selectedClass, setSelectedClass] = useState("12-A");
  const [selectedDate, setSelectedDate] = useState("2026-06-05");

  const present = STUDENTS_ATT.filter(s => s.status === "present").length;
  const absent = STUDENTS_ATT.filter(s => s.status === "absent").length;
  const late = STUDENTS_ATT.filter(s => s.status === "late").length;

  return (
    <>
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Class Attendance
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Mark and track daily attendance for your classes
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input type="date" className="input-field" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}
            style={{ width: "160px", fontSize: "13px" }} />
          <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}><Download size={14} /> Export</button>
          <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><ClipboardCheck size={14} /> Mark Attendance</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Present", value: present, icon: CheckCircle2, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Absent", value: absent, icon: XCircle, color: "#ff8080", bg: "rgba(255,128,128,0.1)" },
          { label: "Late", value: late, icon: Clock, color: "#ffd060", bg: "rgba(255,208,96,0.1)" },
          { label: "Attendance %", value: `${((present / STUDENTS_ATT.length) * 100).toFixed(1)}%`, icon: TrendingUp, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
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

      <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>Daily Roster</span>
            <select
              className="input-field"
              style={{ width: "120px", fontSize: "12.5px" }}
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
            >
              {CLASSES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Roll No.</th>
              <th>Status</th>
              <th>Time In</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {STUDENTS_ATT.map((s, i) => (
              <tr key={i}>
                <td style={{ color: "var(--text-muted)", fontSize: "12px" }}>{i + 1}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="avatar avatar-sm" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length], color: "#0a0b0f" }}>
                      {s.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span style={{ fontSize: "13.5px", fontWeight: "500", color: "var(--text-primary)" }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ fontSize: "12.5px" }}>{s.roll}</td>
                <td><StatusBadge status={s.status} /></td>
                <td style={{ fontSize: "13px", color: s.status === "late" ? "#ffd060" : "var(--text-secondary)" }}>
                  {s.time}
                </td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                    {["P", "A", "L"].map((status, si) => (
                      <button key={si} style={{
                        padding: "3px 8px", fontSize: "11px", fontWeight: "600", borderRadius: "5px",
                        border: "1px solid var(--border)", background: "transparent",
                        color: si === 0 ? "#D9F9DF" : si === 1 ? "#ff8080" : "#ffd060",
                        cursor: "pointer", transition: "all 0.15s"
                      }}>
                        {status}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function StudentParentAttendance() {
  const { user } = useAuth();
  const isParent = user?.role === "Parent";
  
  return (
    <>
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {isParent ? "Child's Attendance Report" : "My Attendance"}
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            {isParent ? "View Arjun's attendance across subjects and months" : "Track your subject-wise and monthly attendance"}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Overall Attendance", value: "92.5%", icon: TrendingUp, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Total Present Days", value: "112", icon: CheckCircle2, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          { label: "Total Absences", value: "8", icon: XCircle, color: "#ff8080", bg: "rgba(255,128,128,0.1)" },
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
        {/* Monthly trend */}
        <div className="stat-card" style={{ padding: "20px" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Monthly Trend</div>
              <div className="section-subtitle">Present vs Absent (%)</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={MONTHLY_DATA}>
              <defs>
                <linearGradient id="gPresent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9FA1FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9FA1FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="present" stroke="#9FA1FF" strokeWidth={2} fill="url(#gPresent)" name="Present" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Subject-wise attendance */}
        <div className="stat-card" style={{ padding: "20px" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Subject-wise Attendance</div>
              <div className="section-subtitle">Percentage</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {SUBJECT_ATT.map((s, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "12.5px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <BookOpen size={12} color="var(--violet)" /> {s.subject}
                  </span>
                  <span style={{ fontSize: "12.5px", fontWeight: "700", color: s.pct >= 90 ? "#2d8c45" : s.pct >= 80 ? "#9b6e00" : "#c94040" }}>{s.pct}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{
                    width: `${s.pct}%`,
                    background: s.pct >= 90 ? "linear-gradient(90deg,#9FA1FF,#AEE2FF)" : s.pct >= 80 ? "#ffd060" : "#ff8080"
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function AttendancePage() {
  const { user } = useAuth();
  if (!user) return null;

  const isStaff = user.role === "Teacher" || user.role === "Institution Admin" || user.role === "Super Admin";

  return (
    <div className="page-content">
      {isStaff ? <AdminTeacherAttendance /> : <StudentParentAttendance />}
    </div>
  );
}
