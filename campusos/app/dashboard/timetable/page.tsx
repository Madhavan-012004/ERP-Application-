"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Search, User } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"
];

const SCHEDULE_DATA = [
  { id: 1, day: "Monday", timeIndex: 0, duration: 1, subject: "Physics", teacher: "Prof. Jenkins", room: "Lab 302", color: "#AEE2FF", type: "Lab" },
  { id: 2, day: "Monday", timeIndex: 1, duration: 1, subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", color: "#9FA1FF", type: "Lecture" },
  { id: 3, day: "Monday", timeIndex: 3, duration: 2, subject: "Chemistry", teacher: "Dr. Chen", room: "Lab 205", color: "#D9F9DF", type: "Lab" },
  { id: 4, day: "Tuesday", timeIndex: 0, duration: 2, subject: "Computer Science", teacher: "A. Turing", room: "Lab 401", color: "#B5BAFF", type: "Lecture" },
  { id: 5, day: "Tuesday", timeIndex: 4, duration: 1, subject: "English", teacher: "Mrs. Davis", room: "Room 105", color: "#ffd060", type: "Lecture" },
  { id: 6, day: "Wednesday", timeIndex: 1, duration: 1, subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101", color: "#9FA1FF", type: "Lecture" },
  { id: 7, day: "Wednesday", timeIndex: 2, duration: 1, subject: "Physics", teacher: "Prof. Jenkins", room: "Room 304", color: "#AEE2FF", type: "Lecture" },
  { id: 8, day: "Thursday", timeIndex: 5, duration: 2, subject: "Physical Ed", teacher: "Coach Carter", room: "Field A", color: "#ff8080", type: "Sports" },
  { id: 9, day: "Friday", timeIndex: 0, duration: 1, subject: "English", teacher: "Mrs. Davis", room: "Room 105", color: "#ffd060", type: "Lecture" },
  { id: 10, day: "Friday", timeIndex: 2, duration: 2, subject: "Computer Science", teacher: "A. Turing", room: "Lab 401", color: "#B5BAFF", type: "Lab" },
];

export default function TimetableDashboard() {
  const { user } = useAuth();
  const isStaff = user?.role === "Teacher" || user?.role === "Institution Admin" || user?.role === "Super Admin";
  
  const [selectedClass, setSelectedClass] = useState("12-A");

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Timetable & Schedule
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            {isStaff ? "Manage class routines and instructor schedules" : "View your weekly class schedule"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {isStaff && (
            <select className="input-field" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={{ width: "150px", fontSize: "13px" }}>
              <option value="10-A">Class 10-A</option>
              <option value="11-A">Class 11-A</option>
              <option value="12-A">Class 12-A</option>
              <option value="12-B">Class 12-B</option>
            </select>
          )}
          <div style={{ display: "flex", alignItems: "center", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "4px" }}>
            <button className="btn-ghost" style={{ padding: "6px" }}><ChevronLeft size={16} /></button>
            <span style={{ fontSize: "13px", fontWeight: "600", padding: "0 12px" }}>This Week</span>
            <button className="btn-ghost" style={{ padding: "6px" }}><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>
        {/* Main Calendar Grid */}
        <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
          {/* Calendar Header */}
          <div style={{ display: "flex", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
            <div style={{ width: "80px", flexShrink: 0, borderRight: "1px solid var(--border)" }}></div>
            {DAYS.map(day => (
              <div key={day} style={{ flex: 1, textAlign: "center", padding: "12px", borderRight: "1px solid var(--border)", fontSize: "13px", fontWeight: "600", color: "var(--text-secondary)" }}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div style={{ position: "relative" }}>
            {TIME_SLOTS.map((time, idx) => (
              <div key={idx} style={{ display: "flex", borderBottom: "1px solid var(--border)", height: "80px" }}>
                <div style={{ width: "80px", flexShrink: 0, borderRight: "1px solid var(--border)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "8px 0" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "500" }}>{time}</span>
                </div>
                {DAYS.map(day => (
                  <div key={`${day}-${idx}`} style={{ flex: 1, borderRight: "1px solid var(--border)", position: "relative" }}>
                    {/* Render blocks here */}
                    {SCHEDULE_DATA.filter(s => s.day === day && s.timeIndex === idx).map(block => (
                      <div key={block.id} style={{
                        position: "absolute", top: "4px", left: "4px", right: "4px", height: `calc(${block.duration * 100}% - 8px)`,
                        background: `${block.color}15`, borderLeft: `3px solid ${block.color}`, borderRadius: "4px", padding: "8px",
                        zIndex: 10, cursor: "pointer", transition: "all 0.2s"
                      }} className="hover-bg">
                        <div style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {block.subject}
                        </div>
                        <div style={{ fontSize: "10.5px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                          <User size={10} /> {block.teacher}
                        </div>
                        <div style={{ fontSize: "10px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                          <MapPin size={10} /> {block.room}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            
            {/* Current Time Indicator Line (Mocked position) */}
            <div style={{ position: "absolute", top: "280px", left: "80px", right: "0", height: "2px", background: "#ff8080", zIndex: 20, pointerEvents: "none" }}>
              <div style={{ position: "absolute", left: "-6px", top: "-4px", width: "10px", height: "10px", borderRadius: "50%", background: "#ff8080" }}></div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Today's Overview */}
          <div className="stat-card" style={{ padding: "20px" }}>
            <div className="section-title" style={{ marginBottom: "16px" }}>Today's Classes</div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", position: "relative" }}>
              <div style={{ position: "absolute", left: "15px", top: "10px", bottom: "10px", width: "2px", background: "var(--border)", zIndex: 0 }}></div>
              
              {[
                { time: "08:00 AM", subject: "Physics", room: "Lab 302", active: false, passed: true },
                { time: "09:00 AM", subject: "Mathematics", room: "Room 101", active: false, passed: true },
                { time: "11:00 AM", subject: "Chemistry", room: "Lab 205", active: true, passed: false },
                { time: "01:00 PM", subject: "Lunch Break", room: "Cafeteria", active: false, passed: false },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", position: "relative", zIndex: 1, opacity: item.passed ? 0.6 : 1 }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: item.active ? "var(--violet)" : "var(--bg-secondary)", border: item.active ? "none" : "2px solid var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: item.active ? "var(--shadow-glow-violet)" : "none" }}>
                    <Clock size={14} color={item.active ? "#fff" : "var(--text-muted)"} />
                  </div>
                  <div style={{ padding: "8px 12px", background: item.active ? "var(--bg-card-hover)" : "transparent", borderRadius: "8px", flex: 1, border: item.active ? "1px solid var(--border)" : "none" }}>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: item.active ? "var(--violet)" : "var(--text-muted)", marginBottom: "2px" }}>{item.time}</div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{item.subject}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{item.room}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="stat-card" style={{ padding: "20px" }}>
             <div className="section-title" style={{ marginBottom: "16px" }}>Actions</div>
             <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
               <button className="btn-secondary" style={{ width: "100%", justifyContent: "flex-start", fontSize: "12.5px" }}><Search size={14} /> Search Faculty</button>
               <button className="btn-secondary" style={{ width: "100%", justifyContent: "flex-start", fontSize: "12.5px" }}><MapPin size={14} /> Room Availability</button>
               {isStaff && <button className="btn-primary" style={{ width: "100%", marginTop: "8px", fontSize: "12.5px" }}>Request Reschedule</button>}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
