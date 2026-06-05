"use client";
import {
  Megaphone, Calendar, Clock, Users, Plus,
  ChevronRight, Star, MapPin, Ticket, Award, Trophy
} from "lucide-react";

const EVENTS = [
  {
    id: "EVT-001", title: "Annual Day 2026", date: "2026-07-15", time: "09:00 AM",
    venue: "Main Auditorium", type: "Cultural", registered: 842, capacity: 1000,
    status: "upcoming", color: "#9FA1FF", bg: "rgba(159,161,255,0.1)"
  },
  {
    id: "EVT-002", title: "Science Fair", date: "2026-06-20", time: "10:00 AM",
    venue: "Science Block", type: "Academic", registered: 156, capacity: 200,
    status: "registration-open", color: "#AEE2FF", bg: "rgba(174,226,255,0.1)"
  },
  {
    id: "EVT-003", title: "Inter-School Cricket Tournament", date: "2026-06-22", time: "08:00 AM",
    venue: "Sports Ground", type: "Sports", registered: 48, capacity: 60,
    status: "registration-open", color: "#D9F9DF", bg: "rgba(217,249,223,0.1)"
  },
  {
    id: "EVT-004", title: "Tech Symposium 2026", date: "2026-06-28", time: "11:00 AM",
    venue: "IT Block", type: "Technical", registered: 220, capacity: 250,
    status: "registration-open", color: "#B5BAFF", bg: "rgba(181,186,255,0.1)"
  },
  {
    id: "EVT-005", title: "Cultural Fest — CampusBeat", date: "2026-08-10", time: "05:00 PM",
    venue: "Open Air Theatre", type: "Cultural", registered: 0, capacity: 800,
    status: "upcoming", color: "#9FA1FF", bg: "rgba(159,161,255,0.1)"
  },
];

const TOURNAMENTS = [
  { sport: "Cricket", teams: 8, status: "ongoing", round: "Quarter Finals", nextMatch: "Jun 8", icon: "🏏" },
  { sport: "Football", teams: 12, status: "registration", round: "Registration", nextMatch: "Jun 15", icon: "⚽" },
  { sport: "Chess", teams: 24, status: "completed", round: "Completed", nextMatch: "—", icon: "♟️" },
  { sport: "Basketball", teams: 6, status: "ongoing", round: "Semi Finals", nextMatch: "Jun 7", icon: "🏀" },
];

function EventStatusBadge({ status }: { status: string }) {
  const map: any = {
    "upcoming": { cls: "badge-lavender", label: "Upcoming" },
    "registration-open": { cls: "badge-mint", label: "Registration Open" },
    "ongoing": { cls: "badge-sky", label: "Ongoing" },
    "completed": { cls: "badge-violet", label: "Completed" },
  };
  const { cls, label } = map[status] || {};
  return <span className={`badge ${cls}`}>{label}</span>;
}

export default function EventsPage() {
  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Events & Tournaments
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Manage campus events, sports tournaments, and registrations
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}><Trophy size={13} /> Tournaments</button>
          <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><Plus size={14} /> Create Event</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Upcoming Events", value: "8", icon: Calendar, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Registrations Open", value: "4", icon: Ticket, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Active Tournaments", value: "3", icon: Trophy, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          { label: "Students Registered", value: "1,266", icon: Users, color: "#B5BAFF", bg: "rgba(181,186,255,0.1)" },
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

      {/* Events grid */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <span className="section-title">Upcoming Events</span>
          <button className="btn-ghost" style={{ fontSize: "12px" }}>View Calendar</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {EVENTS.map((ev, i) => (
            <div key={i} className="stat-card" style={{ padding: "20px", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                <div className="module-icon" style={{ background: ev.bg }}>
                  <Megaphone size={18} color={ev.color} />
                </div>
                <EventStatusBadge status={ev.status} />
              </div>
              <div style={{ marginBottom: "8px" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px" }}>{ev.title}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
                  <Calendar size={11} color="var(--text-muted)" />
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{ev.date} · {ev.time}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <MapPin size={11} color="var(--text-muted)" />
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{ev.venue}</span>
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>Registrations</span>
                  <span style={{ fontSize: "11.5px", fontWeight: "600", color: ev.color }}>{ev.registered}/{ev.capacity}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${(ev.registered/ev.capacity)*100}%`, background: ev.color }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                <span className="badge" style={{ background: `${ev.color}15`, color: ev.color, border: `1px solid ${ev.color}33`, fontSize: "10.5px" }}>
                  {ev.type}
                </span>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", marginLeft: "auto" }}>{ev.id}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tournaments */}
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
          <span className="section-title">Sports Tournaments</span>
          <button className="btn-primary" style={{ gap: "6px", fontSize: "12px", padding: "7px 14px" }}>
            <Plus size={13} /> Add Tournament
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          {TOURNAMENTS.map((t, i) => (
            <div key={i} className="stat-card" style={{ padding: "18px" }}>
              <div style={{ fontSize: "28px", marginBottom: "10px" }}>{t.icon}</div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px" }}>{t.sport}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "10px" }}>{t.teams} teams · {t.round}</div>
              <EventStatusBadge status={t.status} />
              {t.nextMatch !== "—" && (
                <div style={{ marginTop: "10px", fontSize: "12px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "5px" }}>
                  <Calendar size={11} color="var(--text-muted)" /> Next: {t.nextMatch}
                </div>
              )}
              <button className="btn-secondary" style={{ width: "100%", marginTop: "12px", fontSize: "12px" }}>
                View Fixtures <ChevronRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
