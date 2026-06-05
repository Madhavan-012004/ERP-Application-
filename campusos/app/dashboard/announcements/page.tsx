"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Bell, Megaphone, Pin, Search, Plus, Calendar, Tag,
  ChevronRight, Eye, Users, AlertTriangle, Info, Star,
  BookOpen, Trophy, Clock, Filter, MoreVertical, CheckCircle2
} from "lucide-react";

const CATEGORIES = ["All", "Academic", "Events", "Sports", "Administrative", "Urgent"];

const ANNOUNCEMENTS = [
  {
    id: 1, title: "Final Examination Schedule Released", category: "Academic", urgent: true, pinned: true,
    author: "Principal Dr. Sharma", authorRole: "Principal", date: "Today, 9:00 AM", readTime: "2 min",
    content: "The final examination timetable for the current semester has been published. Students are advised to check the schedule carefully and note any clashes. The exams will commence from December 20, 2024. Hall tickets will be distributed from December 16. Make sure your attendance is above 75% to be eligible.",
    read: false, audience: ["Student", "Parent", "Teacher"], icon: "📋", reactions: { 👍: 42, ❤️: 18 }
  },
  {
    id: 2, title: "Annual Sports Day — Registration Open", category: "Sports", urgent: false, pinned: true,
    author: "Sports Coordinator Mr. Patel", authorRole: "Teacher", date: "Yesterday, 11:30 AM", readTime: "3 min",
    content: "The Annual Sports Day is scheduled for January 15, 2025. Students interested in participating in field events, track, cricket, or football must register before December 20. Registration forms are available with the class teacher. Prize distribution will follow the events. Refreshments will be provided.",
    read: false, audience: ["Student", "Parent"], icon: "🏅", reactions: { 👍: 65, 🎉: 31 }
  },
  {
    id: 3, title: "Parent-Teacher Meeting — December 18", category: "Events", urgent: false, pinned: false,
    author: "Administration", authorRole: "Admin", date: "Dec 3, 2:00 PM", readTime: "1 min",
    content: "Parent-Teacher meetings are scheduled for December 18, 2024 from 9:00 AM to 1:00 PM. Parents are requested to meet their respective class teachers and collect the progress cards. Kindly carry your ward's ID card. Parking will be available in the rear campus lot. Appointments can be pre-booked via the parent portal.",
    read: true, audience: ["Parent", "Teacher"], icon: "🤝", reactions: { 👍: 38, ❤️: 14 }
  },
  {
    id: 4, title: "Library Hours Extended During Exams", category: "Academic", urgent: false, pinned: false,
    author: "Librarian Mrs. Nair", authorRole: "Staff", date: "Dec 2, 10:15 AM", readTime: "1 min",
    content: "The school library will remain open from 7:00 AM to 8:00 PM on all working days from December 15 to January 5 to support exam preparation. Reference books and digital resources will be available. Silence is mandatory inside the library. Food and beverages are strictly prohibited.",
    read: true, audience: ["Student", "Teacher"], icon: "📚", reactions: { 👍: 27, 😊: 12 }
  },
  {
    id: 5, title: "School Fees Due — Last Date December 15", category: "Administrative", urgent: true, pinned: false,
    author: "Finance Department", authorRole: "Admin", date: "Dec 1, 9:00 AM", readTime: "2 min",
    content: "This is a reminder that the second semester fees are due by December 15, 2024. Late payments will attract a fine of ₹500 per week. Payments can be made via the online portal, bank transfer, or at the school office. Receipts will be generated automatically. Students with outstanding dues will not receive hall tickets.",
    read: false, audience: ["Parent"], icon: "💰", reactions: { 👍: 15 }
  },
  {
    id: 6, title: "New Chemistry Lab Inaugurated", category: "Events", urgent: false, pinned: false,
    author: "Principal Dr. Sharma", authorRole: "Principal", date: "Nov 30, 3:00 PM", readTime: "2 min",
    content: "We are pleased to announce the inauguration of our state-of-the-art Chemistry Laboratory. The lab is equipped with the latest instruments and safety equipment. Classes for grades 9-12 will now be conducted in the new lab. Safety protocols must be followed at all times. Students must wear lab coats.",
    read: true, audience: ["Student", "Parent", "Teacher"], icon: "🔬", reactions: { 👍: 78, 🎉: 45 }
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Academic": { bg: "#9FA1FF20", text: "#9FA1FF" },
  "Events": { bg: "#AEE2FF20", text: "#6DB8E8" },
  "Sports": { bg: "#D9F9DF20", text: "#2d8c45" },
  "Administrative": { bg: "#FDE68A20", text: "#B45309" },
  "Urgent": { bg: "#FFB3B320", text: "#D64040" },
};

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof ANNOUNCEMENTS[0] | null>(ANNOUNCEMENTS[0]);
  const [readStates, setReadStates] = useState<Record<number, boolean>>(
    Object.fromEntries(ANNOUNCEMENTS.map(a => [a.id, a.read]))
  );

  const isAdmin = user?.role === "Super Admin" || user?.role === "Institution Admin";

  const filteredAnnouncements = ANNOUNCEMENTS.filter(a => {
    const matchesCategory = activeCategory === "All" || a.category === activeCategory || (activeCategory === "Urgent" && a.urgent);
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const unreadCount = Object.values(readStates).filter(r => !r).length;

  const handleSelect = (ann: typeof ANNOUNCEMENTS[0]) => {
    setSelectedAnnouncement(ann);
    setReadStates(prev => ({ ...prev, [ann.id]: true }));
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em", display: "flex", alignItems: "center", gap: "10px" }}>
            Announcements
            {unreadCount > 0 && (
              <span style={{ fontSize: "13px", fontWeight: "700", padding: "2px 10px", borderRadius: "99px", background: "#9FA1FF", color: "#fff" }}>{unreadCount} new</span>
            )}
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Stay updated with school notices, events, and important communications
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", color: "var(--text-muted)" }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "32px", width: "220px", fontSize: "13px" }}
            />
          </div>
          {isAdmin && (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}>
              <Plus size={14} /> New Announcement
            </button>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "20px", height: "calc(100vh - 220px)", minHeight: "500px" }}>
        {/* Left: List Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflow: "hidden" }}>
          {/* Category Pills */}
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "6px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: "600",
                  cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                  background: activeCategory === cat ? "var(--text-primary)" : "var(--bg-card)",
                  color: activeCategory === cat ? "var(--bg-primary)" : "var(--text-secondary)",
                  border: activeCategory === cat ? "1px solid var(--text-primary)" : "1px solid var(--border)",
                }}
              >
                {cat === "Urgent" && <AlertTriangle size={10} style={{ display: "inline", marginRight: "4px" }} />}
                {cat}
              </button>
            ))}
          </div>

          {/* Announcement Items */}
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "8px", paddingRight: "4px" }}>
            {filteredAnnouncements.map(ann => (
              <div
                key={ann.id}
                onClick={() => handleSelect(ann)}
                style={{
                  padding: "14px 16px", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s",
                  border: selectedAnnouncement?.id === ann.id ? "1px solid var(--violet)" : "1px solid var(--border)",
                  background: selectedAnnouncement?.id === ann.id ? "var(--violet)10" : "var(--bg-card)",
                  boxShadow: selectedAnnouncement?.id === ann.id ? "var(--shadow-md)" : "none",
                  position: "relative"
                }}
              >
                {!readStates[ann.id] && (
                  <div style={{ position: "absolute", top: "14px", right: "14px", width: "8px", height: "8px", borderRadius: "50%", background: "#9FA1FF" }} />
                )}
                {ann.pinned && (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "#F59E0B", marginBottom: "6px", fontWeight: "600" }}>
                    <Pin size={9} /> PINNED
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <div style={{ fontSize: "24px", flexShrink: 0 }}>{ann.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13.5px", fontWeight: readStates[ann.id] ? "600" : "700", color: "var(--text-primary)", marginBottom: "4px", lineHeight: "1.3" }}>
                      {ann.title}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      {ann.urgent && (
                        <span style={{ fontSize: "10px", fontWeight: "700", padding: "1px 6px", borderRadius: "99px", background: "#D6404020", color: "#D64040" }}>URGENT</span>
                      )}
                      <span style={{ fontSize: "10.5px", padding: "1px 8px", borderRadius: "99px", background: CATEGORY_COLORS[ann.category]?.bg || "var(--bg-secondary)", color: CATEGORY_COLORS[ann.category]?.text || "var(--text-muted)" }}>
                        {ann.category}
                      </span>
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px" }}>{ann.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="stat-card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {selectedAnnouncement ? (
            <>
              {/* Urgent Banner */}
              {selectedAnnouncement.urgent && (
                <div style={{ background: "linear-gradient(90deg, #D6404015, #D6404005)", borderBottom: "1px solid #D6404030", padding: "10px 24px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <AlertTriangle size={14} color="#D64040" />
                  <span style={{ fontSize: "12.5px", fontWeight: "600", color: "#D64040" }}>Urgent Notice — Action Required</span>
                </div>
              )}

              {/* Content */}
              <div style={{ padding: "28px 28px 20px", flex: 1, overflowY: "auto" }}>
                {/* Meta */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
                  {selectedAnnouncement.pinned && (
                    <span style={{ fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "99px", background: "#FDE68A20", color: "#B45309", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Pin size={8} /> PINNED
                    </span>
                  )}
                  <span style={{ fontSize: "11px", fontWeight: "600", padding: "2px 10px", borderRadius: "99px", background: CATEGORY_COLORS[selectedAnnouncement.category]?.bg, color: CATEGORY_COLORS[selectedAnnouncement.category]?.text }}>
                    {selectedAnnouncement.category}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{selectedAnnouncement.date}</span>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}><Clock size={10} /> {selectedAnnouncement.readTime} read</span>
                </div>

                <h2 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: "16px", lineHeight: "1.3" }}>
                  {selectedAnnouncement.title}
                </h2>

                {/* Author */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "var(--bg-secondary)", borderRadius: "10px", marginBottom: "20px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--violet)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", color: "#fff", flexShrink: 0 }}>
                    {selectedAnnouncement.author[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{selectedAnnouncement.author}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{selectedAnnouncement.authorRole}</div>
                  </div>
                </div>

                {/* Body */}
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "24px" }}>
                  {selectedAnnouncement.content}
                </p>

                {/* Audience */}
                <div style={{ padding: "12px 16px", background: "var(--bg-secondary)", borderRadius: "10px", marginBottom: "20px" }}>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "600" }}>VISIBLE TO</div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {selectedAnnouncement.audience.map(a => (
                      <span key={a} style={{ fontSize: "12px", fontWeight: "600", padding: "3px 10px", borderRadius: "99px", background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "5px" }}>
                        <Users size={10} /> {a}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reactions */}
                <div style={{ display: "flex", gap: "8px" }}>
                  {Object.entries(selectedAnnouncement.reactions).map(([emoji, count]) => (
                    <button key={emoji} style={{ padding: "6px 12px", borderRadius: "99px", background: "var(--bg-secondary)", border: "1px solid var(--border)", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px", transition: "all 0.2s" }}
                      onMouseOver={e => (e.currentTarget.style.borderColor = "var(--violet)")}
                      onMouseOut={e => (e.currentTarget.style.borderColor = "var(--border)")}
                    >
                      {emoji} <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>{count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: "14px 24px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end", gap: "10px", background: "var(--bg-secondary)" }}>
                <button className="btn-ghost" style={{ fontSize: "13px" }}>Share</button>
                {isAdmin && <button className="btn-ghost" style={{ fontSize: "13px" }}>Edit</button>}
                <button className="btn-primary" style={{ fontSize: "13px" }}>
                  <CheckCircle2 size={13} /> Mark as Read
                </button>
              </div>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", padding: "40px" }}>
              <Megaphone size={48} style={{ marginBottom: "16px", opacity: 0.3 }} />
              <p style={{ fontSize: "14px" }}>Select an announcement to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
