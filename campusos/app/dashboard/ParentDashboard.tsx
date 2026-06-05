"use client";

import { useAuth } from "../../context/AuthContext";
import { User, ClipboardList, DollarSign, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ParentDashboard() {
  const { user } = useAuth();

  return (
    <div className="page-content">
      <div className="section-header">
        <div>
          <h1 className="section-title">Welcome, {user?.name}</h1>
          <p className="section-subtitle">Here's the latest update on your child's progress.</p>
        </div>
      </div>

      {/* Child Selector (Mock) */}
      <div style={{ marginBottom: "24px", display: "inline-flex", alignItems: "center", gap: "12px", background: "var(--bg-card)", padding: "8px 16px", borderRadius: "12px", border: "1px solid var(--border)" }}>
        <span style={{ fontSize: "13px", color: "var(--text-muted)", fontWeight: "500" }}>Viewing data for:</span>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--grad-primary)", color: "#0a0b0f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "700" }}>
            AM
          </div>
          <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>Arjun Mehta</span>
          <span className="badge badge-lavender" style={{ fontSize: "10px" }}>Grade 10-A</span>
        </div>
      </div>

      {/* Parent Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {[
          { icon: ClipboardList, label: "Child's Attendance", value: "92.5%", change: "Last 30 days", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
          { icon: TrendingUp, label: "Academic Performance", value: "A-", change: "Mid-term exams", color: "#6062d6", bg: "rgba(96,98,214,0.12)" },
          { icon: DollarSign, label: "Fee Status", value: "Pending", change: "$1,200 due Nov 15th", color: "#ffd060", bg: "rgba(255,208,96,0.12)" },
          { icon: Calendar, label: "Upcoming Events", value: "1", change: "Parent-Teacher Meeting", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
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
        {/* Recent Updates */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div className="section-header">
            <h2 className="section-title">Recent Updates</h2>
            <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: "12px" }}>View all</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: AlertCircle, title: "Term 2 Fee Invoice Generated", desc: "Due by Nov 15th, $1,200", time: "Yesterday", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
              { icon: ClipboardList, title: "Mid-term Report Card Available", desc: "Arjun secured A- overall grade", time: "2 days ago", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
              { icon: Calendar, title: "Parent-Teacher Meeting", desc: "Scheduled for this Saturday, 10:00 AM", time: "Last week", color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
            ].map((update, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", padding: "12px", borderRadius: "12px", background: "var(--bg-secondary)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: update.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <update.icon size={20} color={update.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{update.title}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>{update.desc}</div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{update.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>Quick Actions</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
            {[
              { label: "Pay Fees Online", icon: DollarSign, href: "/dashboard/finance" },
              { label: "Message Class Teacher", icon: User, href: "/dashboard/messages" },
              { label: "Apply for Leave", icon: Calendar, href: "#" },
            ].map((action, i) => (
              <Link href={action.href} key={i} style={{ textDecoration: "none" }}>
                <div className="quick-action" style={{ flexDirection: "row", justifyContent: "flex-start", padding: "12px 16px", cursor: "pointer" }}>
                  <action.icon size={18} color="var(--violet)" />
                  <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
