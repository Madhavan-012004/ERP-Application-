"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  FileText, CheckCircle2, Clock, AlertCircle, Plus, Search,
  Filter, Calendar, Download, MoreVertical, UploadCloud,
  Check, X
} from "lucide-react";

// Mock Data
const ASSIGNMENTS = [
  { id: 1, title: "Quantum Physics Lab Report", subject: "Physics", teacher: "Prof. Jenkins", dueDate: "Today, 11:59 PM", status: "pending", score: null, color: "#AEE2FF", type: "Lab" },
  { id: 2, title: "Algebraic Equations Assignment 4", subject: "Mathematics", teacher: "Dr. Smith", dueDate: "Tomorrow, 08:00 AM", status: "submitted", score: null, color: "#9FA1FF", type: "Homework" },
  { id: 3, title: "Data Structures Project Phase 1", subject: "Computer Science", teacher: "A. Turing", dueDate: "Oct 30, 2026", status: "pending", score: null, color: "#B5BAFF", type: "Project" },
  { id: 4, title: "Organic Chemistry Mid-Term Essay", subject: "Chemistry", teacher: "Dr. Chen", dueDate: "Oct 20, 2026", status: "graded", score: "92/100", color: "#D9F9DF", type: "Essay" },
  { id: 5, title: "Literature Review: Shakespeare", subject: "English", teacher: "Mrs. Davis", dueDate: "Oct 15, 2026", status: "graded", score: "88/100", color: "#ffd060", type: "Homework" },
  { id: 6, title: "History of World War II", subject: "History", teacher: "Mr. Brown", dueDate: "Oct 10, 2026", status: "overdue", score: null, color: "#ff8080", type: "Essay" },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "submitted") return <span className="badge badge-sky"><CheckCircle2 size={10} style={{ marginRight: 4 }} /> Submitted</span>;
  if (status === "graded") return <span className="badge badge-mint"><Check size={10} style={{ marginRight: 4 }} /> Graded</span>;
  if (status === "overdue") return <span className="badge badge-red"><AlertCircle size={10} style={{ marginRight: 4 }} /> Overdue</span>;
  return <span className="badge badge-yellow"><Clock size={10} style={{ marginRight: 4 }} /> Pending</span>;
}

export default function AssignmentsDashboard() {
  const { user } = useAuth();
  const isStaff = user?.role === "Teacher" || user?.role === "Institution Admin" || user?.role === "Super Admin";
  
  const [filter, setFilter] = useState("all");
  
  const filteredData = filter === "all" ? ASSIGNMENTS : ASSIGNMENTS.filter(a => a.status === filter);

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Assignments & Homework
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            {isStaff ? "Create assignments, track submissions, and grade work" : "Track your pending tasks, submissions, and grades"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", color: "var(--text-muted)" }} />
            <input type="text" className="input-field" placeholder="Search..." style={{ paddingLeft: "32px", width: "200px", fontSize: "13px" }} />
          </div>
          {isStaff ? (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><Plus size={14} /> New Assignment</button>
          ) : (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><UploadCloud size={14} /> Submit Work</button>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: isStaff ? "Total Active" : "Pending", value: isStaff ? "12" : "2", icon: FileText, color: "#B5BAFF", bg: "rgba(181,186,255,0.1)" },
          { label: isStaff ? "To Grade" : "Submitted", value: isStaff ? "48" : "1", icon: CheckCircle2, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          { label: isStaff ? "Graded" : "Graded", value: isStaff ? "320" : "2", icon: Check, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: isStaff ? "Late Submissions" : "Overdue", value: isStaff ? "5" : "1", icon: AlertCircle, color: "#ff8080", bg: "rgba(255,128,128,0.1)" },
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

      {/* Main Content */}
      <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "all", label: "All Assignments" },
              { id: "pending", label: "Pending" },
              { id: "submitted", label: "Submitted" },
              { id: "graded", label: "Graded" },
            ].map(f => (
              <button 
                key={f.id} 
                onClick={() => setFilter(f.id)}
                className={`badge ${filter === f.id ? 'badge-violet' : ''}`}
                style={{ 
                  background: filter === f.id ? undefined : "transparent", 
                  border: filter === f.id ? undefined : "1px solid var(--border)",
                  color: filter === f.id ? undefined : "var(--text-secondary)",
                  cursor: "pointer",
                  padding: "4px 12px",
                  fontSize: "12px"
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <button className="btn-ghost" style={{ fontSize: "12.5px" }}><Filter size={14} /> Advanced Filter</button>
        </div>

        {/* List View */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {filteredData.map((item, idx) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", borderBottom: idx !== filteredData.length - 1 ? "1px solid var(--border)" : "none", transition: "background 0.2s" }} className="hover-bg">
              {/* Icon */}
              <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${item.color}40` }}>
                <FileText size={20} color={item.color} />
              </div>
              
              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <div style={{ fontSize: "14.5px", fontWeight: "600", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </div>
                  <span style={{ fontSize: "10px", color: "var(--text-muted)", background: "var(--bg-secondary)", padding: "2px 6px", borderRadius: "4px", border: "1px solid var(--border)" }}>{item.type}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "var(--text-muted)" }}>
                  <span>{item.subject}</span>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border)" }}></span>
                  <span>{item.teacher}</span>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border)" }}></span>
                  <span style={{ display: "flex", alignItems: "center", gap: "4px", color: item.status === "overdue" ? "#c94040" : "var(--text-muted)" }}>
                    <Calendar size={12} /> {item.dueDate}
                  </span>
                </div>
              </div>

              {/* Status & Score */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", width: "120px" }}>
                <StatusBadge status={item.status} />
                {item.score && (
                  <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)" }}>{item.score}</div>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: "6px", marginLeft: "8px" }}>
                {!isStaff && item.status === "pending" && (
                  <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: "11px", height: "auto" }}>Submit</button>
                )}
                {isStaff && item.status === "submitted" && (
                  <button className="btn-primary" style={{ padding: "6px 12px", fontSize: "11px", height: "auto" }}>Grade</button>
                )}
                <button className="btn-ghost" style={{ padding: "6px" }}><MoreVertical size={16} /></button>
              </div>
            </div>
          ))}
          
          {filteredData.length === 0 && (
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle2 size={28} color="var(--text-muted)" />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "8px" }}>All caught up!</h3>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>There are no assignments matching this filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
