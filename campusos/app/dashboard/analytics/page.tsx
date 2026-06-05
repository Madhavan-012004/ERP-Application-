"use client";
import { useState } from "react";
import {
  BarChart3, TrendingUp, TrendingDown, Users, GraduationCap,
  DollarSign, Calendar, Download, RefreshCw, ArrowUpRight,
  Activity, Zap, Brain, Target, Award, BookOpen
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from "recharts";

const REVENUE_TREND = [
  { month: "Jul", revenue: 38.2, expenses: 28.4 },
  { month: "Aug", revenue: 41.5, expenses: 30.1 },
  { month: "Sep", revenue: 39.8, expenses: 29.6 },
  { month: "Oct", revenue: 44.2, expenses: 31.5 },
  { month: "Nov", revenue: 43.1, expenses: 30.8 },
  { month: "Dec", revenue: 46.8, expenses: 32.2 },
  { month: "Jan", revenue: 42.4, expenses: 30.5 },
  { month: "Feb", revenue: 45.1, expenses: 31.9 },
  { month: "Mar", revenue: 48.6, expenses: 34.2 },
  { month: "Apr", revenue: 47.3, expenses: 33.1 },
  { month: "May", revenue: 51.2, expenses: 36.4 },
  { month: "Jun", revenue: 53.4, expenses: 37.8 },
];

const ENROLLMENT_TREND = [
  { year: "2021", students: 1420 },
  { year: "2022", students: 1556 },
  { year: "2023", students: 1689 },
  { year: "2024", students: 1774 },
  { year: "2025", students: 1847 },
];

const DEPT_PERFORMANCE = [
  { dept: "Science", score: 85, attendance: 92, pass: 96 },
  { dept: "Commerce", score: 78, attendance: 88, pass: 93 },
  { dept: "Arts", score: 82, attendance: 90, pass: 94 },
  { dept: "Technology", score: 91, attendance: 95, pass: 98 },
];

const RADAR_DATA = [
  { subject: "Academics", A: 87, fullMark: 100 },
  { subject: "Attendance", A: 92, fullMark: 100 },
  { subject: "Finance", A: 78, fullMark: 100 },
  { subject: "Hostel", A: 89, fullMark: 100 },
  { subject: "Sports", A: 83, fullMark: 100 },
  { subject: "Events", A: 76, fullMark: 100 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", padding: "10px 14px" }}>
      <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "6px" }}>{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: "13px", fontWeight: "600", color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
}

const AI_INSIGHTS = [
  { icon: TrendingUp, color: "#D9F9DF", bg: "rgba(217,249,223,0.12)", title: "Enrollment Growth", text: "Student enrollment grew 30% over 4 years. Projected to reach 2,100 by 2027." },
  { icon: AlertIcon, color: "#ffd060", bg: "rgba(255,208,96,0.12)", title: "Attendance Risk", text: "12 students in Grade 9 are at risk of dropping below 75% attendance threshold." },
  { icon: DollarSign, color: "#9FA1FF", bg: "rgba(159,161,255,0.12)", title: "Revenue Forecast", text: "Projected ₹54.8L collection in July based on current payment patterns." },
  { icon: Award, color: "#AEE2FF", bg: "rgba(174,226,255,0.12)", title: "Top Department", text: "Technology dept leads with 91% avg score and 98% pass rate this term." },
];

function AlertIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function AnalyticsPage() {
  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Analytics & Insights
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            AI-powered institutional analytics for informed decision making
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}>
            <RefreshCw size={13} /> Refresh
          </button>
          <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}>
            <Download size={13} /> Export PDF
          </button>
          <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}>
            <Brain size={13} /> AI Report
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Overall Performance Index", value: "84.7/100", change: "+3.2", up: true, icon: Target, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Annual Revenue", value: "₹5.8Cr", change: "+14.2%", up: true, icon: DollarSign, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Student Satisfaction", value: "4.6/5", change: "+0.2", up: true, icon: Award, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          { label: "Staff Performance", value: "92.1%", change: "+1.4%", up: true, icon: Users, color: "#B5BAFF", bg: "rgba(181,186,255,0.1)" },
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

      {/* AI Insights */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "7px", background: "linear-gradient(135deg,#9FA1FF,#AEE2FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={14} color="#0a0b0f" />
          </div>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>AI Insights</span>
          <span className="badge badge-violet" style={{ fontSize: "10px" }}>Powered by CampusOS AI</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {AI_INSIGHTS.map((insight, i) => (
            <div key={i} style={{
              padding: "16px", borderRadius: "12px",
              background: insight.bg, border: `1px solid ${insight.color}22`,
              display: "flex", flexDirection: "column", gap: "8px"
            }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: insight.bg, border: `1px solid ${insight.color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <insight.icon size={16} color={insight.color} />
              </div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-primary)" }}>{insight.title}</div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>{insight.text}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts row 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Revenue vs Expenses */}
        <div className="stat-card" style={{ padding: "20px" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Revenue vs Expenses</div>
              <div className="section-subtitle">Annual trend in lakhs (₹)</div>
            </div>
            <button className="btn-ghost" style={{ fontSize: "12px" }}>2025-26 <ArrowUpRight size={12} /></button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_TREND}>
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9FA1FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#9FA1FF" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#AEE2FF" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#AEE2FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#9FA1FF" strokeWidth={2.5} fill="url(#gRev)" name="Revenue (L)" />
              <Area type="monotone" dataKey="expenses" stroke="#AEE2FF" strokeWidth={2.5} fill="url(#gExp)" name="Expenses (L)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Campus radar */}
        <div className="stat-card" style={{ padding: "20px" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Campus Health Score</div>
              <div className="section-subtitle">Performance across modules</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
              <PolarGrid stroke="rgba(159,161,255,0.12)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#8b90b5" }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#4a4f6b" }} />
              <Radar name="Score" dataKey="A" stroke="#9FA1FF" fill="#9FA1FF" fillOpacity={0.2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Enrollment trend */}
        <div className="stat-card" style={{ padding: "20px" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Enrollment Trend</div>
              <div className="section-subtitle">5-year student growth</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={ENROLLMENT_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="year" tick={{ fontSize: 12, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="students" stroke="#9FA1FF" strokeWidth={3} dot={{ fill: "#9FA1FF", r: 5 }} activeDot={{ r: 7 }} name="Students" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department performance */}
        <div className="stat-card" style={{ padding: "20px" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Department Performance</div>
              <div className="section-subtitle">Avg score by department</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={DEPT_PERFORMANCE} barSize={20} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="dept" tick={{ fontSize: 12, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#4a4f6b" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" radius={[4,4,0,0]} name="Avg Score">
                {DEPT_PERFORMANCE.map((_, i) => (
                  <Bar key={i} dataKey="score" fill={["#9FA1FF","#AEE2FF","#B5BAFF","#D9F9DF"][i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
