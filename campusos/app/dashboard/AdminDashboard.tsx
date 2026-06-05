"use client";

import { useAuth } from "../../context/AuthContext";
import { Users, GraduationCap, DollarSign, Calendar, TrendingUp, Sparkles, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ student: 0, staff: 0 });

  useEffect(() => {
    if (!user?.tenantId) return;
    try {
      const allUsers = JSON.parse(localStorage.getItem("campusos_users") || "[]");
      const myUsers = allUsers.filter((u: any) => u.institutionId === user.tenantId);
      const studentCount = myUsers.filter((u: any) => u.role === "Student").length;
      const staffCount = myUsers.filter((u: any) => u.role === "Teacher" || u.role === "Institution Admin").length;
      setCounts({ student: studentCount, staff: staffCount });
    } catch {}
  }, [user]);

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
          { icon: GraduationCap, label: "Total Students", value: counts.student.toLocaleString(), change: "Enrolled in platform", color: "#6062d6", bg: "rgba(96,98,214,0.12)" },
          { icon: Users, label: "Total Staff", value: counts.staff.toLocaleString(), change: "Active staff members", color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
          { icon: DollarSign, label: "Fee Collection", value: "$0", change: "Awaiting fee module setup", color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
          { icon: Calendar, label: "Today's Attendance", value: "0%", change: "No data available", color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
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
        {/* Recent Activities */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <div className="section-header">
            <h2 className="section-title">Recent Activities</h2>
            <button className="btn-ghost" style={{ padding: "4px 8px", fontSize: "12px" }}>View all</button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", gap: "16px", padding: "12px", borderRadius: "12px", background: "var(--bg-secondary)" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(159,161,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Sparkles size={20} color="#9FA1FF" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>Welcome to CampusOS</div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "2px" }}>Your institution dashboard is now active. Start by adding users.</div>
              </div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Just now</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-card" style={{ padding: "24px" }}>
          <h2 className="section-title" style={{ marginBottom: "16px" }}>Quick Actions</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Link href="/dashboard/users" className="quick-action" style={{ textDecoration: "none" }}>
              <PlusCircle size={20} color="var(--violet)" />
              <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>Add User</span>
            </Link>
            <div className="quick-action">
              <Calendar size={20} color="var(--violet)" />
              <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>Send Notice</span>
            </div>
            <div className="quick-action">
              <DollarSign size={20} color="var(--violet)" />
              <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>Collect Fee</span>
            </div>
            <div className="quick-action">
              <GraduationCap size={20} color="var(--violet)" />
              <span style={{ fontSize: "13px", fontWeight: "500", color: "var(--text-primary)" }}>Manage Classes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
