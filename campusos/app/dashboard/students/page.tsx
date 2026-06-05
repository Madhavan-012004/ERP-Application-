"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Search, Plus, Filter, Download, MoreHorizontal,
  GraduationCap, Eye, Edit, Trash2, CheckCircle2, TrendingUp, XCircle, Sparkles
} from "lucide-react";

const AVATAR_COLORS = [
  "linear-gradient(135deg,#9FA1FF,#B5BAFF)",
  "linear-gradient(135deg,#AEE2FF,#9FA1FF)",
  "linear-gradient(135deg,#D9F9DF,#AEE2FF)",
  "linear-gradient(135deg,#B5BAFF,#9FA1FF)",
];

export default function StudentsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.tenantId) return;
    try {
      const allUsers = JSON.parse(localStorage.getItem("campusos_users") || "[]");
      setStudents(allUsers.filter((u: any) => u.institutionId === user.tenantId && u.role === "Student"));
    } catch {}
  }, [user]);

  const filtered = students.filter(s =>
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.loginId.includes(search.toLowerCase()))
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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Students", value: students.length, icon: GraduationCap, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Active", value: students.length, icon: CheckCircle2, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Attendance Today", value: "0%", icon: TrendingUp, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          ...(user?.role !== "Teacher" ? [{ label: "Fee Defaulters", value: "0", icon: XCircle, color: "#ff8080", bg: "rgba(255,128,128,0.1)" }] : []),
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
      <div className="stat-card" style={{ padding: 0, overflow: "visible" }}>
        {/* Filters */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              className="input-field"
              placeholder="Search by name or login ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: "34px", fontSize: "13px" }}
            />
          </div>
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
                <th>Login ID</th>
                <th>Class</th>
                <th>Parent/Email</th>
                <th>Attendance</th>
                {user?.role !== "Teacher" && <th>Fee Status</th>}
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-muted)" }}>
                    <GraduationCap size={32} style={{ margin: "0 auto 12px", display: "block", opacity: 0.3 }} />
                    {search ? "No students match your search." : "No students added yet."}
                  </td>
                </tr>
              ) : filtered.map((s, i) => {
                const initials = s.name.split(" ").map((w:string)=>w[0]).slice(0,2).join("").toUpperCase();
                return (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div className="avatar" style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length], color: "#0a0b0f" }}>
                          {initials}
                        </div>
                        <div>
                          <div style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)" }}>{s.name}</div>
                          <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Joined: {new Date(s.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#9FA1FF", background: "rgba(159,161,255,0.1)", display: "inline-block", padding: "2px 6px", borderRadius: "4px" }}>{s.loginId}</div>
                    </td>
                    <td>
                      <span className="badge badge-lavender">Unassigned</span>
                    </td>
                    <td>
                      <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{s.email || "No email"}</div>
                    </td>
                    <td><span className="badge badge-yellow">0%</span></td>
                    {user?.role !== "Teacher" && <td><span className="badge badge-mint">N/A</span></td>}
                    <td>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                        <button className="btn-ghost" style={{ padding: "6px" }}><Eye size={14} /></button>
                        <button className="btn-ghost" style={{ padding: "6px" }}><Edit size={14} /></button>
                        <button className="btn-ghost" style={{ padding: "6px", color: "rgba(255,128,128,0.7)" }}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div style={{ padding: "14px 20px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
              Showing {filtered.length} of {students.length} students
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
