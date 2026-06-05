"use client";
import { useState } from "react";
import {
  DollarSign, Plus, Search, Download, Filter,
  TrendingUp, TrendingDown, CheckCircle2, Clock,
  XCircle, CreditCard, Wallet, Receipt, AlertTriangle,
  ChevronRight, ArrowUpRight
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

const FEE_DATA = [
  { student: "Anjali Singh", id: "STU-001", class: "12-A", amount: 45000, status: "Paid", date: "2026-06-01", method: "UPI" },
  { student: "Rahul Gupta", id: "STU-002", class: "12-B", amount: 45000, status: "Pending", date: "—", method: "—" },
  { student: "Meera Nair", id: "STU-003", class: "11-A", amount: 42000, status: "Paid", date: "2026-06-02", method: "Online" },
  { student: "Vikram Shah", id: "STU-004", class: "12-A", amount: 45000, status: "Overdue", date: "—", method: "—" },
  { student: "Pooja Rao", id: "STU-005", class: "11-B", amount: 42000, status: "Paid", date: "2026-06-01", method: "Razorpay" },
  { student: "Arjun Mehta", id: "STU-006", class: "10-A", amount: 38000, status: "Partial", date: "2026-06-03", method: "Cash" },
  { student: "Sneha Joshi", id: "STU-007", class: "10-B", amount: 38000, status: "Pending", date: "—", method: "—" },
];

const COLLECTION_DATA = [
  { month: "Jan", collected: 38.4, target: 42 },
  { month: "Feb", collected: 41.2, target: 42 },
  { month: "Mar", collected: 39.8, target: 42 },
  { month: "Apr", collected: 43.5, target: 42 },
  { month: "May", collected: 44.1, target: 42 },
  { month: "Jun", collected: 42.8, target: 42 },
];

const FEE_BREAKDOWN = [
  { label: "Tuition Fee", amount: "₹28,00,000", pct: 65 },
  { label: "Hostel Fee", amount: "₹8,50,000", pct: 20 },
  { label: "Transport Fee", amount: "₹3,20,000", pct: 7.5 },
  { label: "Activity Fee", amount: "₹2,10,000", pct: 5 },
  { label: "Others", amount: "₹1,00,000", pct: 2.5 },
];

function StatusBadge({ status }: { status: string }) {
  const map: any = {
    "Paid": "badge-mint",
    "Pending": "badge-yellow",
    "Overdue": "badge-red",
    "Partial": "badge-sky",
  };
  return <span className={`badge ${map[status] || "badge-violet"}`}>{status}</span>;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 14px" }}>
      <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: "13px", fontWeight: "600", color: p.color }}>
          {p.name}: ₹{p.value}L
        </p>
      ))}
    </div>
  );
}

export default function FinancePage() {
  const [search, setSearch] = useState("");

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Finance Management
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Fee collection, payments, scholarships & financial reports
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}><Download size={14} /> Export</button>
          <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><Plus size={14} /> Collect Fee</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Collected (June)", value: "₹42.8L", change: "+8.4%", up: true, icon: DollarSign, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Pending Fees", value: "₹6.2L", change: "-12%", up: true, icon: Clock, color: "#ffd060", bg: "rgba(255,208,96,0.1)" },
          { label: "Overdue (>30d)", value: "₹1.8L", change: "+2", up: false, icon: AlertTriangle, color: "#ff8080", bg: "rgba(255,128,128,0.1)" },
          { label: "Scholarship Granted", value: "₹3.4L", change: "48 students", up: true, icon: Receipt, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
              <div className="module-icon" style={{ background: s.bg }}>
                <s.icon size={18} color={s.color} />
              </div>
              <div style={{ fontSize: "11.5px", fontWeight: "600", color: s.up ? "#D9F9DF" : "#ff8080", display: "flex", alignItems: "center", gap: "3px" }}>
                {s.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {s.change}
              </div>
            </div>
            <div style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "4px" }}>{s.value}</div>
            <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Collection chart */}
        <div className="stat-card" style={{ padding: "20px" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Fee Collection vs Target</div>
              <div className="section-subtitle">Monthly in lakhs (₹)</div>
            </div>
            <button className="btn-ghost" style={{ fontSize: "12px" }}>Full Report <ArrowUpRight size={12} /></button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={COLLECTION_DATA} barGap={4} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="collected" fill="#9FA1FF" radius={[4,4,0,0]} name="Collected" />
              <Bar dataKey="target" fill="rgba(174,226,255,0.3)" radius={[4,4,0,0]} name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee breakdown */}
        <div className="stat-card" style={{ padding: "20px" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Revenue Breakdown</div>
              <div className="section-subtitle">By fee category</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FEE_BREAKDOWN.map((f, i) => {
              const colors = ["#9FA1FF","#AEE2FF","#B5BAFF","#D9F9DF","#6b7280"];
              return (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                    <span style={{ fontSize: "12.5px", color: "var(--text-secondary)" }}>{f.label}</span>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{f.pct}%</span>
                      <span style={{ fontSize: "13px", fontWeight: "600", color: colors[i] }}>{f.amount}</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${f.pct}%`, background: colors[i] }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Payment methods */}
          <div style={{ marginTop: "18px", paddingTop: "14px", borderTop: "1px solid var(--border)" }}>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "10px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Payment Methods</div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["UPI 42%","Razorpay 28%","Net Banking 18%","Cash 12%"].map((m, i) => (
                <span key={i} className="badge badge-violet" style={{ fontSize: "11px" }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fee table */}
      <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input className="input-field" placeholder="Search by student name or ID..." value={search}
              onChange={e => setSearch(e.target.value)} style={{ paddingLeft: "34px", fontSize: "13px" }} />
          </div>
          <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px", flexShrink: 0 }}>
            <Filter size={13} /> Filter by Status
          </button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Class</th>
              <th>Fee Amount</th>
              <th>Status</th>
              <th>Payment Date</th>
              <th>Method</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {FEE_DATA.filter(f => f.student.toLowerCase().includes(search.toLowerCase()) || f.id.includes(search)).map((f, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div className="avatar avatar-sm" style={{ background: "linear-gradient(135deg,#9FA1FF,#AEE2FF)", color: "#0a0b0f" }}>
                      {f.student.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)" }}>{f.student}</div>
                      <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>{f.id}</div>
                    </div>
                  </div>
                </td>
                <td><span className="badge badge-lavender">{f.class}</span></td>
                <td style={{ fontWeight: "700", color: "var(--text-primary)", fontSize: "14px" }}>
                  ₹{f.amount.toLocaleString()}
                </td>
                <td><StatusBadge status={f.status} /></td>
                <td style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{f.date}</td>
                <td>
                  {f.method !== "—" ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                      <CreditCard size={12} color="#9FA1FF" />
                      <span style={{ fontSize: "12.5px", color: "var(--text-secondary)" }}>{f.method}</span>
                    </div>
                  ) : <span style={{ color: "var(--text-muted)" }}>—</span>}
                </td>
                <td style={{ textAlign: "right" }}>
                  {f.status !== "Paid" ? (
                    <button className="btn-primary" style={{ padding: "5px 12px", fontSize: "12px" }}>
                      Collect <ChevronRight size={12} />
                    </button>
                  ) : (
                    <button className="btn-ghost" style={{ fontSize: "12px" }}>Receipt</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
