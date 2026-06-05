"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Search, Plus, Filter, Download, MoreHorizontal,
  GraduationCap, Phone, Mail, MapPin, Calendar,
  ChevronLeft, ChevronRight, Eye, Edit, Trash2,
  CheckCircle2, Clock, XCircle, Users, TrendingUp
} from "lucide-react";

const STUDENTS = [
  { id: "STU-001", name: "Anjali Singh", class: "12-A", roll: "001", parent: "Rajesh Singh", phone: "XXXXXXXX90", fee: "Paid", attendance: 96.2, dob: "2007-04-12", status: "active", avatar: "AS", grade: "A+" },
  { id: "STU-002", name: "Rahul Gupta", class: "12-B", roll: "032", parent: "Suresh Gupta", phone: "XXXXXXXX45", fee: "Pending", attendance: 88.5, dob: "2007-09-23", status: "active", avatar: "RG", grade: "A" },
  { id: "STU-003", name: "Meera Nair", class: "11-A", roll: "015", parent: "Priya Nair", phone: "XXXXXXXX67", fee: "Paid", attendance: 94.1, dob: "2008-01-08", status: "active", avatar: "MN", grade: "A+" },
  { id: "STU-004", name: "Vikram Shah", class: "12-A", roll: "022", parent: "Amit Shah", phone: "XXXXXXXX34", fee: "Overdue", attendance: 72.3, dob: "2007-07-15", status: "warning", avatar: "VS", grade: "B+" },
  { id: "STU-005", name: "Pooja Rao", class: "11-B", roll: "008", parent: "Kavitha Rao", phone: "XXXXXXXX89", fee: "Paid", attendance: 97.8, dob: "2008-05-30", status: "active", avatar: "PR", grade: "A+" },
  { id: "STU-006", name: "Arjun Mehta", class: "10-A", roll: "004", parent: "Nitin Mehta", phone: "XXXXXXXX12", fee: "Paid", attendance: 91.4, dob: "2009-02-18", status: "active", avatar: "AM", grade: "A" },
  { id: "STU-007", name: "Sneha Joshi", class: "10-B", roll: "019", parent: "Ramesh Joshi", phone: "XXXXXXXX55", fee: "Pending", attendance: 83.6, dob: "2009-11-09", status: "active", avatar: "SJ", grade: "B+" },
  { id: "STU-008", name: "Kiran Kumar", class: "9-A", roll: "041", parent: "Suresh Kumar", phone: "XXXXXXXX77", fee: "Overdue", attendance: 65.2, dob: "2010-06-22", status: "warning", avatar: "KK", grade: "C+" },
];

const AVATAR_COLORS = [
  "linear-gradient(135deg,#9FA1FF,#B5BAFF)",
  "linear-gradient(135deg,#AEE2FF,#9FA1FF)",
  "linear-gradient(135deg,#D9F9DF,#AEE2FF)",
  "linear-gradient(135deg,#B5BAFF,#9FA1FF)",
  "linear-gradient(135deg,#AEE2FF,#B5BAFF)",
  "linear-gradient(135deg,#9FA1FF,#AEE2FF)",
  "linear-gradient(135deg,#D9F9DF,#B5BAFF)",
  "linear-gradient(135deg,#B5BAFF,#AEE2FF)",
];

function FeeStatusBadge({ status }: { status: string }) {
  if (status === "Paid") return <span className="badge badge-mint">Paid</span>;
  if (status === "Pending") return <span className="badge badge-yellow">Pending</span>;
  return <span className="badge badge-red">Overdue</span>;
}

function AttendanceBadge({ pct }: { pct: number }) {
  const color = pct >= 90 ? "badge-mint" : pct >= 75 ? "badge-yellow" : "badge-red";
  return <span className={`badge ${color}`}>{pct}%</span>;
}

export default function StudentsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const filtered = STUDENTS.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search)) &&
    (filterClass === "All" || s.class === filterClass)
  );

  return (
    <div className="page-content">
      {/* Page header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Student Management
            </h1>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
              Manage all students across departments and classes
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}>
              <Download size={14} /> Export
            </button>
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}>
              <Plus size={14} /> Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Students", value: "1,847", icon: GraduationCap, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Active", value: "1,792", icon: CheckCircle2, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Attendance Today", value: "94.6%", icon: TrendingUp, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          ...(user?.role !== "Teacher" ? [{ label: "Fee Defaulters", value: "48", icon: XCircle, color: "#ff8080", bg: "rgba(255,128,128,0.1)" }] : []),
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px" }}>
            <div className="module-icon" style={{ background: s.bg }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-primary)" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
        {/* Filters */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              className="input-field"
              placeholder="Search by name or student ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: "34px", fontSize: "13px" }}
            />
          </div>
          <select
            className="input-field"
            style={{ width: "140px", fontSize: "13px" }}
            value={filterClass}
            onChange={e => setFilterClass(e.target.value)}
          >
            <option>All</option>
            <option>9-A</option><option>9-B</option>
            <option>10-A</option><option>10-B</option>
            <option>11-A</option><option>11-B</option>
            <option>12-A</option><option>12-B</option>
          </select>
          <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px", flexShrink: 0 }}>
            <Filter size={13} /> Filters
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>ID / Roll</th>
                <th>Class</th>
                <th>Parent</th>
                <th>Attendance</th>
                {user?.role !== "Teacher" && <th>Fee Status</th>}
                <th>Grade</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div className="avatar" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length], color: "#0a0b0f" }}>
                        {s.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)" }}>{s.name}</div>
                        <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>DOB: {s.dob}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#9FA1FF" }}>{s.id}</div>
                    <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Roll: {s.roll}</div>
                  </td>
                  <td>
                    <span className="badge badge-lavender">{s.class}</span>
                  </td>
                  <td>
                    <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{s.parent}</div>
                    <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>🔒 {s.phone}</div>
                  </td>
                  <td><AttendanceBadge pct={s.attendance} /></td>
                  {user?.role !== "Teacher" && <td><FeeStatusBadge status={s.fee} /></td>}
                  <td>
                    <span style={{
                      fontSize: "12.5px", fontWeight: "700",
                      color: s.grade === "A+" ? "#9FA1FF" : s.grade === "A" ? "#AEE2FF" : s.grade === "B+" ? "#D9F9DF" : "#ffd060"
                    }}>
                      {s.grade}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                      <button className="btn-ghost" style={{ padding: "6px" }}><Eye size={14} /></button>
                      <button className="btn-ghost" style={{ padding: "6px" }}><Edit size={14} /></button>
                      <button className="btn-ghost" style={{ padding: "6px", color: "rgba(255,128,128,0.7)" }}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
            Showing {filtered.length} of 1,847 students
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            <button className="btn-ghost" style={{ padding: "6px 10px", fontSize: "12px" }}>
              <ChevronLeft size={14} />
            </button>
            {[1,2,3,"...",187].map((p, i) => (
              <button key={i} className="btn-ghost" style={{
                padding: "6px 10px", fontSize: "12px",
                background: p === 1 ? "rgba(159,161,255,0.15)" : "transparent",
                color: p === 1 ? "#9FA1FF" : "var(--text-secondary)"
              }}>
                {p}
              </button>
            ))}
            <button className="btn-ghost" style={{ padding: "6px 10px", fontSize: "12px" }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
