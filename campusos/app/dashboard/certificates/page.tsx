"use client";
import { useState } from "react";
import {
  FileText, Download, Plus, Search, Clock,
  CheckCircle2, XCircle, RefreshCw, Award,
  ChevronRight, Zap, Shield, Eye
} from "lucide-react";

const CERTIFICATES = [
  { id: "CERT-001", type: "Bonafide Certificate", student: "Anjali Singh", class: "12-A", requestDate: "2026-06-01", status: "ready", generatedDate: "2026-06-02" },
  { id: "CERT-002", type: "Transfer Certificate", student: "Rahul Gupta", class: "12-B", requestDate: "2026-06-02", status: "pending", generatedDate: "—" },
  { id: "CERT-003", type: "Conduct Certificate", student: "Meera Nair", class: "11-A", requestDate: "2026-06-01", status: "ready", generatedDate: "2026-06-02" },
  { id: "CERT-004", type: "Fee Paid Certificate", student: "Vikram Shah", class: "12-A", requestDate: "2026-06-03", status: "pending", generatedDate: "—" },
  { id: "CERT-005", type: "Study Certificate", student: "Pooja Rao", class: "11-B", requestDate: "2026-05-30", status: "ready", generatedDate: "2026-06-01" },
  { id: "CERT-006", type: "Bonafide Certificate", student: "Arjun Mehta", class: "10-A", requestDate: "2026-06-04", status: "rejected", generatedDate: "—" },
];

const CERT_TYPES = [
  { name: "Bonafide Certificate", icon: "🎓", desc: "Proof of enrollment", color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
  { name: "Transfer Certificate", icon: "📄", desc: "School transfer document", color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
  { name: "Conduct Certificate", icon: "⭐", desc: "Student behavior record", color: "#B5BAFF", bg: "rgba(181,186,255,0.1)" },
  { name: "Study Certificate", icon: "📚", desc: "Academic study proof", color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
  { name: "Fee Paid Certificate", icon: "💳", desc: "Fee payment confirmation", color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "ready") return <span className="badge badge-mint"><CheckCircle2 size={10} style={{ marginRight: "3px" }} />Ready</span>;
  if (status === "pending") return <span className="badge badge-yellow"><Clock size={10} style={{ marginRight: "3px" }} />Pending</span>;
  return <span className="badge badge-red"><XCircle size={10} style={{ marginRight: "3px" }} />Rejected</span>;
}

export default function CertificatesPage() {
  const [search, setSearch] = useState("");

  const filtered = CERTIFICATES.filter(c =>
    c.student.toLowerCase().includes(search.toLowerCase()) ||
    c.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Certificate Management
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            100% paperless certificate issuance with digital signature
          </p>
        </div>
        <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}>
          <Plus size={14} /> New Request
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Issued", value: "248", icon: Award, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Pending", value: "12", icon: Clock, color: "#ffd060", bg: "rgba(255,208,96,0.1)" },
          { label: "Ready to Download", value: "6", icon: CheckCircle2, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Digitally Signed", value: "100%", icon: Shield, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
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

      {/* Certificate types */}
      <div style={{ marginBottom: "24px" }}>
        <div className="section-title" style={{ marginBottom: "14px" }}>Certificate Types</div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {CERT_TYPES.map((ct, i) => (
            <div key={i} className="quick-action" style={{ minWidth: "160px", flex: 1 }}>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>{ct.icon}</div>
              <div style={{ fontSize: "12.5px", fontWeight: "600", color: ct.color }}>{ct.name}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{ct.desc}</div>
              <button className="btn-primary" style={{ marginTop: "8px", padding: "5px 12px", fontSize: "11.5px" }}>
                Request <ChevronRight size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate workflow info */}
      <div style={{ marginBottom: "24px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <Zap size={16} color="#9FA1FF" />
          <span style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)" }}>Digital Workflow</span>
          <span className="badge badge-violet" style={{ fontSize: "10px" }}>Zero Paper</span>
        </div>
        <div style={{ display: "flex", gap: "0" }}>
          {["📝 Request", "✅ Admin Review", "🔏 Digital Sign", "📥 PDF Download", "📧 Email Delivery"].map((step, i, arr) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{
                flex: 1, padding: "10px 14px", background: `rgba(159,161,255,${0.05 + i * 0.03})`,
                border: "1px solid rgba(159,161,255,0.15)", borderRadius: "8px",
                fontSize: "12px", color: "var(--text-secondary)", textAlign: "center", fontWeight: "500"
              }}>{step}</div>
              {i < arr.length - 1 && <ChevronRight size={16} color="var(--text-muted)" style={{ flexShrink: 0, margin: "0 4px" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="input-field" placeholder="Search by student or certificate type..." value={search}
              onChange={e => setSearch(e.target.value)} style={{ paddingLeft: "34px", fontSize: "13px" }} />
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>Type</th>
              <th>Student</th>
              <th>Class</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Generated</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i}>
                <td><span style={{ fontSize: "12.5px", fontWeight: "600", color: "#9FA1FF" }}>{c.id}</span></td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <FileText size={13} color="var(--text-muted)" />
                    <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>{c.type}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div className="avatar avatar-sm" style={{ background: "linear-gradient(135deg,#9FA1FF,#AEE2FF)", color: "#0a0b0f" }}>
                      {c.student.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>{c.student}</span>
                  </div>
                </td>
                <td><span className="badge badge-lavender">{c.class}</span></td>
                <td style={{ fontSize: "12.5px", color: "var(--text-secondary)" }}>{c.requestDate}</td>
                <td><StatusBadge status={c.status} /></td>
                <td style={{ fontSize: "12.5px", color: "var(--text-secondary)" }}>{c.generatedDate}</td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                    {c.status === "ready" ? (
                      <>
                        <button className="btn-ghost" style={{ padding: "5px" }}><Eye size={14} /></button>
                        <button className="btn-primary" style={{ padding: "5px 10px", fontSize: "11.5px", gap: "4px" }}>
                          <Download size={12} /> PDF
                        </button>
                      </>
                    ) : c.status === "pending" ? (
                      <>
                        <button className="btn-primary" style={{ padding: "5px 10px", fontSize: "11.5px", gap: "4px" }}>
                          <CheckCircle2 size={12} /> Approve
                        </button>
                        <button className="btn-ghost" style={{ padding: "5px", color: "#ff8080" }}><XCircle size={14} /></button>
                      </>
                    ) : (
                      <button className="btn-ghost" style={{ fontSize: "11.5px", gap: "4px" }}>
                        <RefreshCw size={12} /> Resubmit
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
