"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Building2, Users, MapPin, Phone, Mail, Globe, Calendar,
  Edit2, Camera, Award, TrendingUp, BookOpen, GraduationCap,
  Star, Clock, CheckCircle2, ChevronRight, Download,
  BarChart2, Layers, Cpu, Shield, FileText
} from "lucide-react";

const TABS = ["Overview", "Academic Info", "Staff", "Infrastructure", "Accreditation"];

const INSTITUTION = {
  name: "Greenwood International School",
  shortName: "GIS",
  established: "1998",
  type: "Co-Education, CBSE Affiliated",
  affiliation: "Central Board of Secondary Education (CBSE)",
  affiliationCode: "430120",
  udiseCode: "27240112301",
  address: "45, Greenwood Road, Sector 12, Pune, Maharashtra 411001",
  phone: "+91 (020) 2456-7890",
  email: "info@greenwoodschool.edu.in",
  website: "www.greenwoodschool.edu.in",
  principal: "Dr. Anjali Sharma",
  chairman: "Mr. Raghunath Desai",
  logo: "🏫",
  banner: "linear-gradient(135deg, #9FA1FF 0%, #AEE2FF 50%, #D9F9DF 100%)",
};

const STATS_OVERVIEW = [
  { label: "Total Students", value: "2,485", icon: <Users size={20} />, color: "#9FA1FF", change: "+3.2%" },
  { label: "Teaching Staff", value: "148", icon: <GraduationCap size={20} />, color: "#AEE2FF", change: "+5" },
  { label: "Classrooms", value: "86", icon: <Layers size={20} />, color: "#D9F9DF", change: "New wing" },
  { label: "Avg. Pass Rate", value: "97.8%", icon: <TrendingUp size={20} />, color: "#FDE68A", change: "+1.2%" },
];

const ACADEMIC_INFO = [
  { label: "Grades Offered", value: "Pre-KG to Grade 12" },
  { label: "Medium of Instruction", value: "English" },
  { label: "Second Language", value: "Hindi, Marathi, Sanskrit" },
  { label: "Academic Year", value: "June – April" },
  { label: "Sections per Grade", value: "4 (A, B, C, D)" },
  { label: "Max Students per Class", value: "40" },
  { label: "Shift", value: "Single Shift (7:30 AM – 2:30 PM)" },
  { label: "Board Exam Results (2024)", value: "Grade 10: 99.2% | Grade 12: 97.8%" },
];

const INFRASTRUCTURE = [
  { icon: "🔬", name: "Science Laboratories", count: 6, note: "Physics, Chemistry, Biology, Computer, Robotics, Chemistry-New" },
  { icon: "📚", name: "Library", count: 1, note: "15,000+ books, 50-seat reading room, Digital catalog" },
  { icon: "💻", name: "Computer Labs", count: 3, note: "200 workstations, Fiber broadband internet" },
  { icon: "🏃", name: "Sports Grounds", count: 4, note: "Cricket, Football, Basketball, Athletics Track" },
  { icon: "🎭", name: "Auditorium", count: 1, note: "800-seat capacity, AC, Full AV setup" },
  { icon: "🏊", name: "Swimming Pool", count: 1, note: "Olympic-size, Coaches available" },
  { icon: "🍽️", name: "Cafeteria", count: 2, note: "Main canteen + Junior school canteen" },
  { icon: "🚌", name: "School Buses", count: 22, note: "GPS-enabled, covering 30+ routes" },
];

const STAFF_DEPARTMENTS = [
  { dept: "Mathematics", head: "Mr. Karthik Rajan", teachers: 12, satisfaction: 4.8 },
  { dept: "Science", head: "Mrs. Rekha Verma", teachers: 15, satisfaction: 4.9 },
  { dept: "English", head: "Ms. Priya Nair", teachers: 10, satisfaction: 4.7 },
  { dept: "Social Studies", head: "Mr. Suresh Kumar", teachers: 8, satisfaction: 4.6 },
  { dept: "Computer Science", head: "Mr. Arun Mehta", teachers: 7, satisfaction: 4.9 },
  { dept: "Physical Education", head: "Mr. Rajat Mishra", teachers: 6, satisfaction: 4.8 },
  { dept: "Arts & Crafts", head: "Ms. Deepa Joshi", teachers: 5, satisfaction: 4.7 },
];

const ACCREDITATIONS = [
  { title: "CBSE Affiliation", body: "Central Board of Secondary Education", year: "1998", valid: "2026", status: "Active" },
  { title: "ISO 9001:2015", body: "International Organization for Standardization", year: "2015", valid: "2027", status: "Active" },
  { title: "National Green School Award", body: "Ministry of Environment, Govt. of India", year: "2022", valid: "Permanent", status: "Received" },
  { title: "Digital India – Smart School", body: "Dept. of Electronics & IT, GoI", year: "2020", valid: "2025", status: "Active" },
];

export default function InstitutionPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Overview");
  const isAdmin = user?.role === "Super Admin" || user?.role === "Institution Admin";

  return (
    <div className="page-content">
      {/* Hero Banner */}
      <div style={{ borderRadius: "20px", overflow: "hidden", marginBottom: "24px", boxShadow: "var(--shadow-lg)", position: "relative" }}>
        <div style={{ background: INSTITUTION.banner, height: "140px", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.15)" }} />
          {isAdmin && (
            <button style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "8px", padding: "6px 12px", color: "#fff", fontSize: "12px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", backdropFilter: "blur(4px)" }}>
              <Camera size={13} /> Edit Banner
            </button>
          )}
        </div>
        <div style={{ background: "var(--bg-card)", padding: "0 28px 22px", position: "relative" }}>
          {/* Logo */}
          <div style={{ position: "absolute", top: "-40px", left: "28px", width: "80px", height: "80px", borderRadius: "20px", background: "var(--bg-card)", border: "4px solid var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", boxShadow: "var(--shadow-md)" }}>
            {INSTITUTION.logo}
          </div>
          <div style={{ paddingTop: "52px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1 style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "4px" }}>{INSTITUTION.name}</h1>
              <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px" }}>{INSTITUTION.type}</p>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {[
                  { icon: <MapPin size={12} />, text: INSTITUTION.address.split(",")[2]?.trim() + ", Maharashtra" },
                  { icon: <Calendar size={12} />, text: `Est. ${INSTITUTION.established}` },
                  { icon: <Globe size={12} />, text: INSTITUTION.website },
                ].map((info, i) => (
                  <span key={i} style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "5px" }}>
                    {info.icon} {info.text}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button className="btn-ghost" style={{ fontSize: "13px", gap: "6px" }}><Download size={13} /> Profile PDF</button>
              {isAdmin && <button className="btn-primary" style={{ fontSize: "13px", gap: "6px" }}><Edit2 size={13} /> Edit Institution</button>}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {STATS_OVERVIEW.map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${s.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, flexShrink: 0 }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.label}</div>
              <div style={{ fontSize: "11px", color: "#2d8c45", fontWeight: "600", marginTop: "2px" }}>{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "20px", background: "var(--bg-secondary)", padding: "4px", borderRadius: "12px", width: "fit-content" }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 18px", borderRadius: "9px", fontSize: "13px", fontWeight: "600",
              cursor: "pointer", transition: "all 0.2s", border: "none",
              background: activeTab === tab ? "var(--bg-card)" : "transparent",
              color: activeTab === tab ? "var(--text-primary)" : "var(--text-muted)",
              boxShadow: activeTab === tab ? "var(--shadow-sm)" : "none",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px" }}>
          <div className="stat-card" style={{ padding: "24px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Building2 size={16} /> Institution Details
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Full Name", value: INSTITUTION.name },
                { label: "CBSE Affiliation No.", value: INSTITUTION.affiliationCode },
                { label: "UDISE Code", value: INSTITUTION.udiseCode },
                { label: "Principal", value: INSTITUTION.principal },
                { label: "Chairman / Trustee", value: INSTITUTION.chairman },
                { label: "Full Address", value: INSTITUTION.address },
                { label: "Phone", value: INSTITUTION.phone },
                { label: "Email", value: INSTITUTION.email },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", paddingBottom: "14px", borderBottom: i < 7 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ width: "150px", fontSize: "12px", color: "var(--text-muted)", fontWeight: "600", flexShrink: 0, paddingTop: "1px" }}>{row.label}</div>
                  <div style={{ fontSize: "13.5px", color: "var(--text-primary)", fontWeight: "500" }}>{row.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div className="stat-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}><Award size={15} /> Quick Highlights</h3>
              {[
                { icon: "🏆", text: "National Excellence Award 2023" },
                { icon: "📊", text: "Top 10 CBSE Schools in Pune" },
                { icon: "💻", text: "100% Digital Classroom Integration" },
                { icon: "🌿", text: "Green Campus Certification" },
                { icon: "♿", text: "Differently-abled Friendly Campus" },
              ].map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ fontSize: "18px" }}>{h.icon}</span>
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{h.text}</span>
                </div>
              ))}
            </div>
            <div className="stat-card" style={{ padding: "20px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}><Cpu size={15} /> Tech Infrastructure</h3>
              {[
                { label: "Student & Parent Portal", status: "Live", color: "#2d8c45" },
                { label: "Teacher Dashboard", status: "Live", color: "#2d8c45" },
                { label: "Parent App", status: "Live", color: "#2d8c45" },
                { label: "AI Attendance", status: "Pilot", color: "#F59E0B" },
                { label: "Online Exams", status: "Beta", color: "#9FA1FF" },
              ].map((tech, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{tech.label}</span>
                  <span style={{ fontSize: "11px", fontWeight: "700", padding: "2px 10px", borderRadius: "99px", background: `${tech.color}20`, color: tech.color }}>{tech.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Academic Info" && (
        <div className="stat-card" style={{ padding: "28px" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}><BookOpen size={16} /> Academic Structure</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
            {ACADEMIC_INFO.map((row, i) => (
              <div key={i} style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontSize: "11.5px", color: "var(--text-muted)", fontWeight: "600", marginBottom: "5px" }}>{row.label}</div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{row.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Staff" && (
        <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>Department Overview</div>
            <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>Total: 148 Teaching Staff</div>
          </div>
          {STAFF_DEPARTMENTS.map((dept, i) => (
            <div key={i} style={{ padding: "16px 20px", borderBottom: i !== STAFF_DEPARTMENTS.length - 1 ? "1px solid var(--border)" : "none", display: "flex", alignItems: "center", gap: "16px", transition: "background 0.2s", cursor: "pointer" }}
              onMouseOver={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
              onMouseOut={e => (e.currentTarget.style.background = "")}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
                {["📐", "🔬", "📖", "🗺️", "💻", "⚽", "🎨"][i]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "2px" }}>{dept.dept}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>HOD: {dept.head}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>{dept.teachers}</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Teachers</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#F59E0B", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Star size={14} fill="#F59E0B" /> {dept.satisfaction}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Rating</div>
              </div>
              <ChevronRight size={16} color="var(--text-muted)" />
            </div>
          ))}
        </div>
      )}

      {activeTab === "Infrastructure" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {INFRASTRUCTURE.map((item, i) => (
            <div key={i} className="stat-card" style={{ padding: "18px 20px", display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ fontSize: "32px", flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14.5px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px" }}>{item.name}</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5" }}>{item.note}</div>
              </div>
              <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--violet)", flexShrink: 0 }}>{item.count}</div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Accreditation" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {ACCREDITATIONS.map((acc, i) => (
            <div key={i} className="stat-card" style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                {["📋", "🏅", "🌿", "💻"][i]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "3px" }}>{acc.title}</div>
                <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>{acc.body}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-secondary)" }}>Since {acc.year}</div>
                <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Valid: {acc.valid}</div>
              </div>
              <span style={{ fontSize: "11.5px", fontWeight: "700", padding: "4px 14px", borderRadius: "99px", background: "#D9F9DF20", color: "#2d8c45", display: "flex", alignItems: "center", gap: "5px" }}>
                <CheckCircle2 size={11} /> {acc.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
