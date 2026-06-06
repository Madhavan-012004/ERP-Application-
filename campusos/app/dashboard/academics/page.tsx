"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  BookOpen, Calendar, CheckCircle2, ChevronRight, Download,
  FileText, FolderOpen, Layers, MoreVertical, PlayCircle,
  Plus, Search, Star, TrendingUp, Users
} from "lucide-react";

// Mock Data
const SUBJECTS = [
  { id: 1, name: "Advanced Mathematics", code: "MATH-401", teacher: "Dr. Robert Smith", progress: 68, totalTopics: 24, completedTopics: 16, status: "On Track", color: "#9FA1FF" },
  { id: 2, name: "Physics: Quantum Mechanics", code: "PHY-302", teacher: "Prof. Sarah Jenkins", progress: 45, totalTopics: 20, completedTopics: 9, status: "Slightly Behind", color: "#AEE2FF" },
  { id: 3, name: "Organic Chemistry", code: "CHEM-205", teacher: "Dr. Emily Chen", progress: 82, totalTopics: 18, completedTopics: 15, status: "Ahead", color: "#D9F9DF" },
  { id: 4, name: "Computer Science: Data Structures", code: "CS-301", teacher: "Alan Turing", progress: 55, totalTopics: 30, completedTopics: 17, status: "On Track", color: "#B5BAFF" },
];

const RECENT_MATERIALS = [
  { title: "Calculus Worksheet 4.pdf", subject: "Mathematics", type: "Document", date: "Today, 10:30 AM", size: "2.4 MB" },
  { title: "Quantum States Lecture.mp4", subject: "Physics", type: "Video", date: "Yesterday, 2:15 PM", size: "145 MB" },
  { title: "Reaction Mechanisms Ch.3", subject: "Chemistry", type: "Slides", date: "Oct 24, 09:00 AM", size: "5.1 MB" },
  { title: "Binary Trees Implementation.zip", subject: "Computer Science", type: "Code", date: "Oct 22, 11:45 AM", size: "1.2 MB" },
];

function AcademicsDashboard() {
  const { user } = useAuth();
  const isStudentOrParent = user?.role === "Parent";
  
  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Academic Hub
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Manage curriculum, track syllabus progress, and access study materials
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {!isStudentOrParent && (
            <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}><Plus size={14} /> Add Lesson Plan</button>
          )}
          <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><Download size={14} /> Download Syllabus</button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Enrolled Subjects", value: "8", icon: BookOpen, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Overall Progress", value: "62%", icon: TrendingUp, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Study Materials", value: "145", icon: FolderOpen, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          { label: "Pending Tasks", value: "3", icon: FileText, color: "#ff8080", bg: "rgba(255,128,128,0.1)" },
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

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Left Column: Curriculum Progress */}
        <div className="stat-card" style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
          <div className="section-header">
            <div>
              <div className="section-title">Curriculum Progress</div>
              <div className="section-subtitle">Track syllabus completion per subject</div>
            </div>
            <button className="btn-ghost" style={{ fontSize: "12px" }}>View All</button>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
            {SUBJECTS.map((sub, i) => (
              <div key={sub.id} style={{ padding: "16px", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div className="module-icon" style={{ background: `${sub.color}20`, width: "40px", height: "40px" }}>
                      <Layers size={18} color={sub.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: "14.5px", fontWeight: "600", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                        {sub.name}
                        <span className="badge" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)", fontSize: "10px" }}>
                          {sub.code}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{sub.teacher}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>{sub.progress}%</div>
                    <div style={{ fontSize: "11px", color: sub.status === "Ahead" ? "#2d8c45" : sub.status === "On Track" ? "var(--text-secondary)" : "#c94040" }}>
                      {sub.status}
                    </div>
                  </div>
                </div>
                
                <div className="progress-bar" style={{ height: "6px", marginBottom: "8px" }}>
                  <div className="progress-fill" style={{ width: `${sub.progress}%`, background: `linear-gradient(90deg, ${sub.color}, ${sub.color}dd)` }} />
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px", color: "var(--text-muted)" }}>
                  <span>{sub.completedTopics} of {sub.totalTopics} topics completed</span>
                  <LinkButton text="View Lesson Plan" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Study Materials & Quick Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Recent Materials */}
          <div className="stat-card" style={{ padding: "20px", flex: 1 }}>
            <div className="section-header">
              <div>
                <div className="section-title">Recent Materials</div>
                <div className="section-subtitle">Latest uploads by teachers</div>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {RECENT_MATERIALS.map((mat, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", cursor: "pointer", transition: "background 0.2s" }} className="hover-bg">
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(159,161,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {mat.type === "Video" ? <PlayCircle size={16} color="#B5BAFF" /> : 
                     mat.type === "Code" ? <FileText size={16} color="#AEE2FF" /> : 
                     <BookOpen size={16} color="#9FA1FF" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{mat.title}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", gap: "6px" }}>
                      <span>{mat.subject}</span> • <span>{mat.size}</span>
                    </div>
                  </div>
                  <button style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>
                    <Download size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-secondary" style={{ width: "100%", marginTop: "16px", fontSize: "12.5px" }}>Browse Library</button>
          </div>

          {/* Quick Actions */}
          <div className="stat-card" style={{ padding: "20px" }}>
             <div className="section-title" style={{ marginBottom: "16px" }}>Quick Links</div>
             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <QuickLink icon={Calendar} label="Academic Calendar" />
                <QuickLink icon={Star} label="Top Performers" />
                <QuickLink icon={Users} label="Study Groups" />
                <QuickLink icon={Search} label="Search Topics" />
             </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function LinkButton({ text }: { text: string }) {
  return (
    <span style={{ color: "var(--violet)", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", gap: "2px" }}>
      {text} <ChevronRight size={12} />
    </span>
  );
}

function QuickLink({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", padding: "12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)", cursor: "pointer", textAlign: "center", transition: "all 0.2s" }} className="hover-bg">
      <Icon size={18} color="var(--violet)" />
      <span style={{ fontSize: "11.5px", fontWeight: "500", color: "var(--text-secondary)" }}>{label}</span>
    </div>
  );
}

export default AcademicsDashboard;
