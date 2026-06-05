"use client";

import { useAuth } from "../../context/AuthContext";
import { Users, GraduationCap, DollarSign, Calendar, TrendingUp, Trophy } from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="page-content">
      <div className="section-header">
        <div>
          <h1 className="section-title">Welcome back, {user?.name}</h1>
          <p className="section-subtitle">Here's what's happening at {user?.tenantName} today.</p>
        </div>
      </div>

      {/* Admin Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "32px" }}>
        {[
          { icon: GraduationCap, label: "Total Students", value: "3,240", change: "+124 this year", color: "#6062d6", bg: "rgba(96,98,214,0.12)" },
          { icon: Users, label: "Total Staff", value: "248", change: "+12 this year", color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
          { icon: DollarSign, label: "Fee Collection", value: "$1.2M", change: "82% collected", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
          { icon: Calendar, label: "Today's Attendance", value: "94.2%", change: "+2.1% from yesterday", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: stat.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <stat.icon size={20} color={stat.color} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>
                <TrendingUp size={14} /> 2.4%
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px" }}>{stat.value}</div>
            <div style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "500", marginBottom: "4px" }}>{stat.label}</div>
            <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>{stat.change}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Recent Activities */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div className="section-header">
            <h2 className="section-title">Recent Activities</h2>
            <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: "12px" }}>View all</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: Trophy, title: "Inter-school Debate Won", desc: "Our team won 1st prize at City Finals", time: "2 hours ago", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
              { icon: DollarSign, title: "Fee Payment Received", desc: "Grade 10 term fees collected: $45,000", time: "4 hours ago", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
              { icon: Users, title: "New Teacher Onboarded", desc: "Mr. Sharma joined Mathematics Dept", time: "1 day ago", color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
            ].map((activity, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", padding: "12px", borderRadius: "12px", background: "var(--bg-secondary)" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: activity.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <activity.icon size={20} color={activity.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{activity.title}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>{activity.desc}</div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>Quick Actions</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { label: "Add Student", icon: GraduationCap },
              { label: "Add Teacher", icon: Users },
              { label: "Send Notice", icon: Calendar },
              { label: "Collect Fee", icon: DollarSign },
            ].map((action, i) => (
              <div key={i} className="quick-action">
                <action.icon size={20} color="var(--violet)" />
                <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>{action.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
