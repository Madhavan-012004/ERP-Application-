"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  UserPlus, Search, Filter, FileText, CheckCircle2,
  Clock, XCircle, MoreVertical, Download, Eye, Mail,
  Phone, Calendar, GraduationCap, ChevronRight, Plus,
  Users, TrendingUp, RefreshCw, Award
} from "lucide-react";

type Status = "Applied" | "Under Review" | "Interview Scheduled" | "Accepted" | "Rejected" | "Waitlisted";

const STATUSES: Status[] = ["Applied", "Under Review", "Interview Scheduled", "Accepted", "Rejected", "Waitlisted"];

const STATUS_CONFIG: Record<Status, { color: string; bg: string; icon: React.ReactNode }> = {
  "Applied": { color: "#6DB8E8", bg: "#AEE2FF15", icon: <FileText size={12} /> },
  "Under Review": { color: "#F59E0B", bg: "#FDE68A15", icon: <RefreshCw size={12} /> },
  "Interview Scheduled": { color: "#9FA1FF", bg: "#9FA1FF15", icon: <Calendar size={12} /> },
  "Accepted": { color: "#2d8c45", bg: "#D9F9DF15", icon: <CheckCircle2 size={12} /> },
  "Rejected": { color: "#D64040", bg: "#FFB3B315", icon: <XCircle size={12} /> },
  "Waitlisted": { color: "#B45309", bg: "#FDE68A15", icon: <Clock size={12} /> },
};

const APPLICANTS = [
  { id: "ADM-2024-001", name: "Arjun Mehta", email: "arjun.m@email.com", phone: "+91 98765 43210", grade: "Grade 9", dob: "Mar 12, 2010", status: "Accepted" as Status, appliedDate: "Nov 20, 2024", score: 94, guardian: "Rajesh Mehta", documents: ["Birth Certificate", "Transfer Certificate", "Report Card"], photo: "AM" },
  { id: "ADM-2024-002", name: "Priya Kapoor", email: "priya.k@email.com", phone: "+91 87654 32109", grade: "Grade 11 (Science)", dob: "Jan 5, 2009", status: "Interview Scheduled" as Status, appliedDate: "Nov 22, 2024", score: 88, guardian: "Sunita Kapoor", documents: ["Birth Certificate", "Report Card"], photo: "PK" },
  { id: "ADM-2024-003", name: "Rohan Gupta", email: "rohan.g@email.com", phone: "+91 76543 21098", grade: "Grade 6", dob: "Jul 25, 2013", status: "Under Review" as Status, appliedDate: "Nov 25, 2024", score: 79, guardian: "Anil Gupta", documents: ["Birth Certificate", "Transfer Certificate"], photo: "RG" },
  { id: "ADM-2024-004", name: "Sneha Patil", email: "sneha.p@email.com", phone: "+91 65432 10987", grade: "Grade 9", dob: "Oct 8, 2010", status: "Applied" as Status, appliedDate: "Nov 28, 2024", score: 85, guardian: "Meena Patil", documents: ["Birth Certificate"], photo: "SP" },
  { id: "ADM-2024-005", name: "Vikram Singh", email: "vikram.s@email.com", phone: "+91 54321 09876", grade: "Grade 11 (Commerce)", dob: "May 3, 2009", status: "Waitlisted" as Status, appliedDate: "Dec 1, 2024", score: 72, guardian: "Harish Singh", documents: ["Birth Certificate", "Transfer Certificate", "Report Card", "Medical Certificate"], photo: "VS" },
  { id: "ADM-2024-006", name: "Ananya Krishnan", email: "ananya.k@email.com", phone: "+91 43210 98765", grade: "Grade 6", dob: "Dec 14, 2013", status: "Rejected" as Status, appliedDate: "Dec 2, 2024", score: 58, guardian: "Meera Krishnan", documents: ["Birth Certificate"], photo: "AK" },
];

const STAT_CARDS = [
  { label: "Total Applications", value: APPLICANTS.length, icon: <FileText size={18} />, color: "#9FA1FF" },
  { label: "Accepted", value: APPLICANTS.filter(a => a.status === "Accepted").length, icon: <CheckCircle2 size={18} />, color: "#2d8c45" },
  { label: "Under Review", value: APPLICANTS.filter(a => a.status === "Under Review" || a.status === "Applied").length, icon: <Clock size={18} />, color: "#F59E0B" },
  { label: "Interviews Scheduled", value: APPLICANTS.filter(a => a.status === "Interview Scheduled").length, icon: <Calendar size={18} />, color: "#AEE2FF" },
];

export default function AdmissionsPage() {
  const { user } = useAuth();
  const [activeStatus, setActiveStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState<typeof APPLICANTS[0] | null>(APPLICANTS[0]);
  const [statuses, setStatuses] = useState<Record<string, Status>>(
    Object.fromEntries(APPLICANTS.map(a => [a.id, a.status]))
  );

  const isAdmin = user?.role === "Super Admin" || user?.role === "Institution Admin";

  const filtered = APPLICANTS.filter(a => {
    const matchesStatus = activeStatus === "All" || statuses[a.id] === activeStatus;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const updateStatus = (id: string, newStatus: Status) => {
    setStatuses(prev => ({ ...prev, [id]: newStatus }));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  const getScoreColor = (score: number) => score >= 85 ? "#2d8c45" : score >= 70 ? "#F59E0B" : "#D64040";

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Admissions
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Manage student applications, review documents, and track admission pipeline
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", color: "var(--text-muted)" }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search applicants..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "32px", width: "220px", fontSize: "13px" }}
            />
          </div>
          <button className="btn-ghost" style={{ fontSize: "13px", gap: "6px" }}>
            <Download size={14} /> Export
          </button>
          {isAdmin && (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}>
              <Plus size={14} /> New Application
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {STAT_CARDS.map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: `${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "20px", height: "calc(100vh - 280px)", minHeight: "440px" }}>
        {/* Left: List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", overflow: "hidden" }}>
          {/* Status Filters */}
          <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
            {["All", ...STATUSES].map(s => (
              <button
                key={s}
                onClick={() => setActiveStatus(s)}
                style={{
                  padding: "5px 12px", borderRadius: "999px", fontSize: "11.5px", fontWeight: "600",
                  cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                  background: activeStatus === s ? "var(--text-primary)" : "var(--bg-card)",
                  color: activeStatus === s ? "var(--bg-primary)" : "var(--text-secondary)",
                  border: activeStatus === s ? "1px solid var(--text-primary)" : "1px solid var(--border)",
                }}
              >
                {s}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", paddingRight: "4px" }}>
            {filtered.map(app => {
              const currentStatus = statuses[app.id];
              const cfg = STATUS_CONFIG[currentStatus];
              return (
                <div
                  key={app.id}
                  onClick={() => setSelected(app)}
                  style={{
                    padding: "14px 16px", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s",
                    border: selected?.id === app.id ? "1px solid var(--violet)" : "1px solid var(--border)",
                    background: selected?.id === app.id ? "var(--violet)10" : "var(--bg-card)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--violet)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: "#fff", flexShrink: 0 }}>
                      {app.photo}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "2px" }}>{app.name}</div>
                      <div style={{ fontSize: "11.5px", color: "var(--text-muted)", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <span>{app.id}</span>
                        <span>•</span>
                        <span>{app.grade}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "16px", fontWeight: "800", color: getScoreColor(app.score), marginBottom: "4px" }}>{app.score}%</div>
                      <span style={{ fontSize: "10px", fontWeight: "600", padding: "2px 8px", borderRadius: "99px", background: cfg.bg, color: cfg.color, display: "flex", alignItems: "center", gap: "3px" }}>
                        {cfg.icon} {currentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detail */}
        <div className="stat-card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {selected ? (() => {
            const currentStatus = statuses[selected.id];
            const cfg = STATUS_CONFIG[currentStatus];
            return (
              <>
                {/* Top Banner */}
                <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)", display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #9FA1FF, #B5BAFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", color: "#fff", flexShrink: 0 }}>
                    {selected.photo}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "17px", fontWeight: "800", color: "var(--text-primary)", marginBottom: "4px" }}>{selected.name}</div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                      <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>{selected.id}</span>
                      <span style={{ fontSize: "10px", fontWeight: "600", padding: "2px 10px", borderRadius: "99px", background: cfg.bg, color: cfg.color, display: "flex", alignItems: "center", gap: "3px" }}>
                        {cfg.icon} {currentStatus}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "26px", fontWeight: "800", color: getScoreColor(selected.score), letterSpacing: "-0.02em" }}>{selected.score}%</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Entrance Score</div>
                  </div>
                </div>

                <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
                  {/* Info Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                    {[
                      { label: "Applying For", value: selected.grade, icon: <GraduationCap size={13} /> },
                      { label: "Date of Birth", value: selected.dob, icon: <Calendar size={13} /> },
                      { label: "Guardian Name", value: selected.guardian, icon: <Users size={13} /> },
                      { label: "Applied On", value: selected.appliedDate, icon: <Clock size={13} /> },
                      { label: "Email", value: selected.email, icon: <Mail size={13} /> },
                      { label: "Phone", value: selected.phone, icon: <Phone size={13} /> },
                    ].map((info, i) => (
                      <div key={i} style={{ padding: "12px", background: "var(--bg-secondary)", borderRadius: "10px" }}>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px", display: "flex", alignItems: "center", gap: "5px" }}>{info.icon} {info.label}</div>
                        <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", wordBreak: "break-all" }}>{info.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Documents */}
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "10px" }}>Submitted Documents</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {["Birth Certificate", "Transfer Certificate", "Report Card", "Medical Certificate"].map(doc => {
                        const submitted = selected.documents.includes(doc);
                        return (
                          <div key={doc} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "8px", background: submitted ? "#D9F9DF15" : "var(--bg-secondary)", border: `1px solid ${submitted ? "#D9F9DF" : "var(--border)"}` }}>
                            {submitted ? <CheckCircle2 size={14} color="#2d8c45" /> : <XCircle size={14} color="var(--text-muted)" />}
                            <span style={{ fontSize: "13px", color: submitted ? "var(--text-primary)" : "var(--text-muted)", flex: 1 }}>{doc}</span>
                            {submitted && <button className="btn-ghost" style={{ padding: "3px 8px", fontSize: "11px" }}><Eye size={10} /></button>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Update Status */}
                  {isAdmin && (
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "10px" }}>Update Status</div>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {STATUSES.map(s => {
                          const sCfg = STATUS_CONFIG[s];
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(selected.id, s)}
                              style={{
                                padding: "7px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "600",
                                cursor: "pointer", transition: "all 0.2s",
                                background: currentStatus === s ? sCfg.bg : "var(--bg-secondary)",
                                color: currentStatus === s ? sCfg.color : "var(--text-muted)",
                                border: `1px solid ${currentStatus === s ? sCfg.color : "var(--border)"}`,
                                display: "flex", alignItems: "center", gap: "5px"
                              }}
                            >
                              {sCfg.icon} {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div style={{ padding: "14px 24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: "10px", background: "var(--bg-secondary)" }}>
                  <button className="btn-ghost" style={{ fontSize: "13px", gap: "6px" }}><Mail size={13} /> Email Applicant</button>
                  <button className="btn-primary" style={{ fontSize: "13px", gap: "6px" }}><Download size={13} /> Download Form</button>
                </div>
              </>
            );
          })() : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", padding: "40px" }}>
              <UserPlus size={48} style={{ marginBottom: "16px", opacity: 0.3 }} />
              <p style={{ fontSize: "14px" }}>Select an application to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
