"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  ShieldCheck, AlertTriangle, Key, Users, Car,
  Clock, CheckCircle2, UserCheck, UserX, XCircle, FileText
} from "lucide-react";

// Mock Data
const VISITOR_LOGS = [
  { id: "VIS-101", name: "Anand Mehta", purpose: "Meeting with Principal", timeIn: "09:30 AM", timeOut: "10:45 AM", status: "Checked Out", host: "Dr. R. Sharma" },
  { id: "VIS-102", name: "Sunita Rao", purpose: "Parent-Teacher Meeting", timeIn: "11:15 AM", timeOut: "-", status: "Inside Campus", host: "Mrs. Davis" },
  { id: "VIS-103", name: "Delivery (Amazon)", purpose: "Package Drop", timeIn: "12:00 PM", timeOut: "12:10 PM", status: "Checked Out", host: "Admin Office" },
  { id: "VIS-104", name: "Vikram Singh", purpose: "Guest Lecture", timeIn: "01:30 PM", timeOut: "-", status: "Inside Campus", host: "CS Dept" },
];

const GATE_PASSES = [
  { id: "GP-992", student: "Arjun Mehta", class: "12-A", reason: "Dental Appointment", approvedBy: "Class Teacher", status: "Active", validUntil: "Today, 03:00 PM" },
  { id: "GP-993", student: "Priya Das", class: "11-B", reason: "Family Emergency", approvedBy: "Principal", status: "Used", validUntil: "Yesterday" },
];

export default function SecurityDashboard() {
  const { user } = useAuth();
  const isStaff = user?.role === "Teacher" || user?.role === "Institution Admin" || user?.role === "Super Admin";
  const isParent = user?.role === "Parent";

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "10px" }}>
            Campus Security
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            {isStaff ? "Monitor visitor logs, manage gate passes, and enforce campus safety" : "Request gate passes and view security notifications"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {isStaff ? (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><UserCheck size={14} /> New Visitor Entry</button>
          ) : (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><FileText size={14} /> Request Gate Pass</button>
          )}
        </div>
      </div>

      {/* Stats row */}
      {isStaff && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {[
            { label: "Active Visitors", value: "24", icon: Users, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
            { label: "Gate Passes Issued", value: "8", icon: Key, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
            { label: "Vehicles Inside", value: "12", icon: Car, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
            { label: "Security Alerts", value: "0", icon: ShieldCheck, color: "#2d8c45", bg: "rgba(45,140,69,0.1)" },
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
      )}

      <div style={{ display: "grid", gridTemplateColumns: isStaff ? "2fr 1fr" : "1fr", gap: "20px" }}>
        
        {/* Left Column: Visitor Logs or My Gate Passes */}
        {isStaff ? (
          <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)" }}>
              <div className="section-title" style={{ fontSize: "14px" }}>Today's Visitor Log</div>
              <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: "12px" }}>View Archive</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Visitor</th>
                  <th>Purpose</th>
                  <th>Host</th>
                  <th>Time In/Out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {VISITOR_LOGS.map((vis, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)" }}>{vis.name}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>ID: {vis.id}</div>
                    </td>
                    <td>{vis.purpose}</td>
                    <td>{vis.host}</td>
                    <td>
                      <div style={{ fontSize: "12.5px", color: "var(--text-primary)" }}>{vis.timeIn}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{vis.timeOut}</div>
                    </td>
                    <td>
                      {vis.status === "Inside Campus" ? (
                        <span className="badge badge-sky"><Clock size={10} style={{ marginRight: 4 }}/> Inside</span>
                      ) : (
                        <span className="badge badge-mint"><CheckCircle2 size={10} style={{ marginRight: 4 }}/> Checked Out</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)" }}>
              <div className="section-title" style={{ fontSize: "14px" }}>My Gate Passes</div>
            </div>
            <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
              {GATE_PASSES.map((gp, i) => (
                <div key={i} style={{ border: "1px solid var(--border)", borderRadius: "12px", padding: "16px", background: gp.status === "Active" ? "rgba(174,226,255,0.05)" : "var(--bg-secondary)", position: "relative" }}>
                  <div style={{ position: "absolute", top: "16px", right: "16px" }}>
                    {gp.status === "Active" ? <span className="badge badge-sky">Active</span> : <span className="badge" style={{ background: "var(--border)", color: "var(--text-secondary)" }}>Used</span>}
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "4px" }}>{gp.id}</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--violet)", marginBottom: "12px" }}>{gp.student} ({gp.class})</div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "12px", color: "var(--text-muted)" }}>
                    <div>
                      <div style={{ marginBottom: "2px" }}>Reason:</div>
                      <div style={{ color: "var(--text-primary)", fontWeight: "500" }}>{gp.reason}</div>
                    </div>
                    <div>
                      <div style={{ marginBottom: "2px" }}>Approved By:</div>
                      <div style={{ color: "var(--text-primary)", fontWeight: "500" }}>{gp.approvedBy}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "16px", paddingTop: "12px", borderTop: "1px dashed var(--border)", fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={12} /> Valid Until: {gp.validUntil}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right Column: Alerts & Emergency */}
        {isStaff && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            
            {/* Active Gate Passes (Staff View) */}
            <div className="stat-card" style={{ padding: "20px" }}>
              <div className="section-title" style={{ marginBottom: "16px" }}>Active Gate Passes</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {GATE_PASSES.filter(g => g.status === "Active").map((gp, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{gp.student}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{gp.class} • {gp.reason}</div>
                    </div>
                    <button className="btn-secondary" style={{ padding: "4px 8px", fontSize: "11px" }}>Verify</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Action */}
            <div style={{ background: "linear-gradient(135deg, #c94040 0%, #8a2424 100%)", borderRadius: "16px", padding: "24px", color: "#fff", textAlign: "center", boxShadow: "0 8px 32px rgba(201,64,64,0.3)" }}>
              <AlertTriangle size={32} color="#fff" style={{ margin: "0 auto 12px" }} />
              <div style={{ fontSize: "18px", fontWeight: "800", marginBottom: "8px" }}>Emergency Lockdown</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "20px" }}>
                This will lock all campus electronic gates and notify local authorities immediately.
              </div>
              <button style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#fff", color: "#c94040", border: "none", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>
                INITIATE PROTOCOL
              </button>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
