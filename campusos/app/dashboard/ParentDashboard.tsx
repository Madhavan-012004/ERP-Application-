"use client";

import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import {
  User, ClipboardList, DollarSign, Calendar, TrendingUp,
  BookOpen, FileText, Clock, GraduationCap, Bus, HeartPulse, MessageSquare
} from "lucide-react";
import Link from "next/link";

const CHILDREN = [
  { name: "Arjun Kumar", class: "10-A", rollNo: "1042", avatar: "AK" },
  { name: "Sneha Kumar", class: "7-B",  rollNo: "0721", avatar: "SK" },
];

export default function ParentDashboard() {
  const { user } = useAuth();
  const [activeChild, setActiveChild] = useState(0);
  const child = CHILDREN[activeChild];

  const stats = [
    { icon: ClipboardList, label: "Attendance",          value: "87%",  change: "This semester",        color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
    { icon: TrendingUp,   label: "Academic Performance", value: "B+",   change: "Overall grade",        color: "#6062d6", bg: "rgba(96,98,214,0.12)" },
    { icon: FileText,     label: "Pending Assignments",  value: "3",    change: "Due this week",        color: "#9b6e00", bg: "rgba(220,160,20,0.12)" },
    { icon: Calendar,     label: "Upcoming Exams",       value: "2",    change: "Next: Dec 20",         color: "#1a7ab5", bg: "rgba(26,122,181,0.12)" },
    { icon: DollarSign,   label: "Fee Status",           value: "Clear",change: "No dues pending",      color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
    { icon: Bus,          label: "Bus Route",            value: "R-04", change: "ETA: 7:45 AM",         color: "#9FA1FF", bg: "rgba(159,161,255,0.12)" },
  ];

  const todaysClasses = [
    { time: "08:30", subject: "Mathematics",   teacher: "Mr. Sharma",  room: "A101", status: "done" },
    { time: "09:30", subject: "English",       teacher: "Ms. Priya",   room: "A102", status: "done" },
    { time: "10:30", subject: "Physics",       teacher: "Mr. Gupta",   room: "Lab-1",status: "ongoing" },
    { time: "11:30", subject: "History",       teacher: "Ms. Rao",     room: "A101", status: "upcoming" },
    { time: "13:00", subject: "Computer Sci.", teacher: "Mr. Iyer",    room: "Lab-2", status: "upcoming" },
  ];

  const assignments = [
    { subject: "Mathematics",  title: "Quadratic Equations",   due: "Dec 16", status: "pending" },
    { subject: "Physics",      title: "Newton's Laws Report",  due: "Dec 17", status: "pending" },
    { subject: "English",      title: "Essay – Climate Change",due: "Dec 18", status: "submitted" },
  ];

  const statusColor: Record<string,string> = {
    done: "#2d8c45", ongoing: "#9FA1FF", upcoming: "var(--text-muted)",
    pending: "#c94040", submitted: "#2d8c45"
  };
  const statusBg: Record<string,string> = {
    done: "rgba(45,140,69,0.1)", ongoing: "rgba(159,161,255,0.12)", upcoming: "rgba(0,0,0,0.04)",
    pending: "rgba(201,64,64,0.1)", submitted: "rgba(45,140,69,0.1)"
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div className="section-header" style={{ marginBottom: 24 }}>
        <div>
          <h1 className="section-title">Welcome, {user?.name} 👋</h1>
          <p className="section-subtitle">Track your child's academic journey in real time.</p>
        </div>
        <Link href="/dashboard/messages" style={{ textDecoration: "none" }}>
          <button className="btn-secondary" style={{ gap: 7 }}>
            <MessageSquare size={14} /> Message Teacher
          </button>
        </Link>
      </div>

      {/* Child Selector */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 500 }}>Viewing:</span>
        {CHILDREN.map((c, i) => (
          <button key={i} onClick={() => setActiveChild(i)}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 16px", borderRadius: 10,
              border: activeChild === i ? "1.5px solid #9FA1FF" : "1.5px solid var(--border)",
              background: activeChild === i ? "rgba(159,161,255,0.1)" : "var(--bg-card)",
              cursor: "pointer", transition: "all 0.2s"
            }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#B5BAFF,#D9F9DF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#0a0b0f" }}>
              {c.avatar}
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Class {c.class} · Roll #{c.rollNo}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 28 }}>
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon size={20} color={s.color} />
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "var(--text-primary)", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 600, marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{s.change}</div>
          </div>
        ))}
      </div>

      {/* Today's Classes + Assignments */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Today's Timetable */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div className="section-header" style={{ marginBottom: 18 }}>
            <div>
              <h2 className="section-title" style={{ marginBottom: 2 }}>Today's Classes</h2>
              <p className="section-subtitle" style={{ margin: 0 }}>{child.name} · {child.class}</p>
            </div>
            <Link href="/dashboard/timetable" style={{ textDecoration: "none" }}>
              <button className="btn-ghost" style={{ padding: "4px 10px", fontSize: 12 }}>Full Timetable</button>
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {todaysClasses.map((cls, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                <div style={{ width: 44, textAlign: "center", flexShrink: 0 }}>
                  <Clock size={12} color="var(--text-muted)" style={{ marginBottom: 2 }} />
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)" }}>{cls.time}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)" }}>{cls.subject}</div>
                  <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{cls.teacher} · {cls.room}</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: statusBg[cls.status], color: statusColor[cls.status], textTransform: "capitalize" }}>
                  {cls.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Assignments + Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Assignments */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 14 }}>Assignments</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {assignments.map((a, i) => (
                <div key={i} style={{ padding: "12px 14px", borderRadius: 9, background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text-primary)" }}>{a.title}</div>
                    <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: statusBg[a.status], color: statusColor[a.status], flexShrink: 0, marginLeft: 6 }}>
                      {a.status}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{a.subject} · Due {a.due}</div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/assignments" style={{ textDecoration: "none" }}>
              <button className="btn-ghost" style={{ width: "100%", marginTop: 12, fontSize: 12 }}>View All Assignments</button>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 className="section-title" style={{ marginBottom: 14 }}>Quick Actions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {[
                { label: "Pay Fees Online",       icon: DollarSign,  href: "/dashboard/finance" },
                { label: "View Report Card",       icon: GraduationCap, href: "/dashboard/examinations" },
                { label: "Track School Bus",       icon: Bus,         href: "/dashboard/transport" },
                { label: "Medical Records",        icon: HeartPulse,  href: "/dashboard/medical" },
                { label: "Message Class Teacher",  icon: MessageSquare, href: "/dashboard/messages" },
              ].map((action, i) => (
                <Link href={action.href} key={i} style={{ textDecoration: "none" }}>
                  <div className="quick-action" style={{ flexDirection: "row", justifyContent: "flex-start", padding: "10px 14px", cursor: "pointer" }}>
                    <action.icon size={16} color="var(--violet)" />
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-primary)" }}>{action.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
