"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Users, Star, Calendar, Plus, Search, Award,
  ChevronRight, Heart, Mic, Code2, Palette, Music2,
  Trophy, Clock, MapPin, UserCheck, UserPlus, Filter
} from "lucide-react";

const CATEGORIES = ["All", "Sports", "Arts", "Technology", "Music", "Academic", "Social"];

const CLUBS = [
  {
    id: 1, name: "Robotics & AI Club", category: "Technology", icon: "🤖",
    members: 48, maxMembers: 60, rating: 4.9, joined: true, featured: true,
    nextEvent: "Workshop on Neural Networks", eventDate: "Dec 12, 3:00 PM",
    description: "Explore AI, robotics, and cutting-edge tech through hands-on projects.",
    color: "linear-gradient(135deg, #9FA1FF 0%, #B5BAFF 100%)"
  },
  {
    id: 2, name: "Drama & Theatre", category: "Arts", icon: "🎭",
    members: 35, maxMembers: 50, rating: 4.7, joined: false, featured: true,
    nextEvent: "Annual Drama Festival Auditions", eventDate: "Dec 15, 4:30 PM",
    description: "Bringing stories to life through powerful performances and stagecraft.",
    color: "linear-gradient(135deg, #FFB3B3 0%, #FF8080 100%)"
  },
  {
    id: 3, name: "Chess Club", category: "Academic", icon: "♟️",
    members: 22, maxMembers: 30, rating: 4.8, joined: true, featured: false,
    nextEvent: "Inter-School Championship", eventDate: "Dec 20, 10:00 AM",
    description: "Sharpen strategic thinking through competitive and casual chess play.",
    color: "linear-gradient(135deg, #AEE2FF 0%, #D9F9DF 100%)"
  },
  {
    id: 4, name: "Music Band", category: "Music", icon: "🎵",
    members: 18, maxMembers: 20, rating: 4.6, joined: false, featured: true,
    nextEvent: "Annual Music Fest Performance", eventDate: "Dec 22, 5:00 PM",
    description: "Jamming together across genres — from classical to contemporary.",
    color: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)"
  },
  {
    id: 5, name: "Photography Club", category: "Arts", icon: "📸",
    members: 31, maxMembers: 40, rating: 4.5, joined: false, featured: false,
    nextEvent: "Campus Photo Walk", eventDate: "Dec 18, 7:00 AM",
    description: "Capture the world through a lens — portraits, nature, and stories.",
    color: "linear-gradient(135deg, #D9F9DF 0%, #AEE2FF 100%)"
  },
  {
    id: 6, name: "Debate Society", category: "Academic", icon: "🗣️",
    members: 27, maxMembers: 35, rating: 4.8, joined: true, featured: false,
    nextEvent: "Quarterly Debate Tournament", eventDate: "Dec 14, 2:00 PM",
    description: "Build confidence, research skills, and the art of persuasive argument.",
    color: "linear-gradient(135deg, #B5BAFF 0%, #9FA1FF 100%)"
  },
];

const UPCOMING_EVENTS = [
  { clubName: "Debate Society", event: "Quarterly Debate Tournament", date: "Dec 14", time: "2:00 PM", venue: "Auditorium A", type: "Competition" },
  { clubName: "Robotics & AI Club", event: "Neural Networks Workshop", date: "Dec 12", time: "3:00 PM", venue: "Lab 204", type: "Workshop" },
  { clubName: "Chess Club", event: "Inter-School Championship", date: "Dec 20", time: "10:00 AM", venue: "Activity Hall", type: "Competition" },
  { clubName: "Music Band", event: "Annual Music Fest", date: "Dec 22", time: "5:00 PM", venue: "Main Stage", type: "Performance" },
];

const EVENT_TYPE_COLORS: Record<string, string> = {
  "Competition": "#9FA1FF",
  "Workshop": "#AEE2FF",
  "Performance": "#FDE68A",
  "Meeting": "#D9F9DF",
};

export default function ClubsPage() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyJoined, setShowOnlyJoined] = useState(false);
  const [clubStates, setClubStates] = useState<Record<number, boolean>>(
    Object.fromEntries(CLUBS.map(c => [c.id, c.joined]))
  );

  const isAdmin = user?.role === "Super Admin" || user?.role === "Institution Admin";

  const filteredClubs = CLUBS.filter(club => {
    const matchesCategory = activeCategory === "All" || club.category === activeCategory;
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJoined = !showOnlyJoined || clubStates[club.id];
    return matchesCategory && matchesSearch && matchesJoined;
  });

  const myClubsCount = Object.values(clubStates).filter(Boolean).length;

  const toggleMembership = (id: number) => {
    setClubStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Clubs & Activities
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Discover, join, and manage your campus clubs and extracurricular activities
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", color: "var(--text-muted)" }} />
            <input
              type="text"
              className="input-field"
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "32px", width: "200px", fontSize: "13px" }}
            />
          </div>
          {isAdmin && (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}>
              <Plus size={14} /> New Club
            </button>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Clubs", value: CLUBS.length, icon: <Users size={18} />, color: "#9FA1FF" },
          { label: "My Memberships", value: myClubsCount, icon: <UserCheck size={18} />, color: "#AEE2FF" },
          { label: "Active Events", value: UPCOMING_EVENTS.length, icon: <Calendar size={18} />, color: "#D9F9DF" },
          { label: "Total Members", value: "181+", icon: <Award size={18} />, color: "#FDE68A" },
        ].map((stat, i) => (
          <div key={i} className="stat-card" style={{ padding: "16px", display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${stat.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color, flexShrink: 0 }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{stat.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "1px" }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
        {/* Left: Club List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Filters */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "2px", flex: 1 }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "7px 14px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "600",
                    cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                    background: activeCategory === cat ? "var(--text-primary)" : "var(--bg-card)",
                    color: activeCategory === cat ? "var(--bg-primary)" : "var(--text-secondary)",
                    border: activeCategory === cat ? "1px solid var(--text-primary)" : "1px solid var(--border)",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
            {!isAdmin && (
              <button
                onClick={() => setShowOnlyJoined(!showOnlyJoined)}
                style={{
                  padding: "7px 14px", borderRadius: "999px", fontSize: "12.5px", fontWeight: "600",
                  cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
                  background: showOnlyJoined ? "#9FA1FF" : "var(--bg-card)",
                  color: showOnlyJoined ? "#fff" : "var(--text-secondary)",
                  border: showOnlyJoined ? "1px solid #9FA1FF" : "1px solid var(--border)",
                  display: "flex", alignItems: "center", gap: "6px"
                }}
              >
                <Filter size={12} /> My Clubs
              </button>
            )}
          </div>

          {/* Clubs Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {filteredClubs.map(club => (
              <div key={club.id} className="stat-card" style={{ padding: "0", overflow: "hidden", position: "relative" }}>
                {/* Banner */}
                <div style={{ height: "8px", background: club.color }} />
                
                <div style={{ padding: "16px" }}>
                  {/* Header Row */}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
                    <div style={{ fontSize: "32px", background: "var(--bg-secondary)", width: "52px", height: "52px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {club.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "14.5px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "3px", lineHeight: 1.3 }}>{club.name}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "99px", background: "var(--bg-secondary)", color: "var(--text-muted)", fontWeight: "600" }}>{club.category}</span>
                        <span style={{ fontSize: "11px", color: "#F59E0B", display: "flex", alignItems: "center", gap: "2px" }}>
                          <Star size={10} fill="#F59E0B" /> {club.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {club.description}
                  </p>

                  {/* Members Progress */}
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Users size={10} /> {club.members}/{club.maxMembers} members</span>
                      <span>{Math.round(club.members / club.maxMembers * 100)}% full</span>
                    </div>
                    <div style={{ height: "4px", background: "var(--bg-secondary)", borderRadius: "99px", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${club.members / club.maxMembers * 100}%`, background: "var(--violet)", borderRadius: "99px", transition: "width 0.6s ease" }} />
                    </div>
                  </div>

                  {/* Next Event */}
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Calendar size={10} /> <span>Next: {club.nextEvent} — {club.eventDate}</span>
                  </div>

                  {/* Action */}
                  {!isAdmin ? (
                    <button
                      onClick={() => toggleMembership(club.id)}
                      className={clubStates[club.id] ? "btn-secondary" : "btn-primary"}
                      style={{ width: "100%", padding: "8px", fontSize: "12.5px", gap: "6px" }}
                    >
                      {clubStates[club.id] ? <><UserCheck size={13} /> Joined</> : <><UserPlus size={13} /> Join Club</>}
                    </button>
                  ) : (
                    <button className="btn-ghost" style={{ width: "100%", padding: "8px", fontSize: "12.5px" }}>
                      Manage Club
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Upcoming Events */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <Calendar size={15} /> Upcoming Events
              </div>
            </div>
            <div>
              {UPCOMING_EVENTS.map((event, i) => (
                <div
                  key={i}
                  style={{ padding: "14px 20px", borderBottom: i !== UPCOMING_EVENTS.length - 1 ? "1px solid var(--border)" : "none", display: "flex", gap: "12px", alignItems: "flex-start", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseOver={e => (e.currentTarget.style.background = "var(--bg-secondary)")}
                  onMouseOut={e => (e.currentTarget.style.background = "")}
                >
                  <div style={{ textAlign: "center", background: "var(--bg-secondary)", borderRadius: "8px", padding: "6px 10px", flexShrink: 0, minWidth: "40px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "800", color: "var(--text-primary)" }}>{event.date.split(" ")[1]}</div>
                    <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{event.date.split(" ")[0]}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "3px" }}>{event.event}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "6px" }}>{event.clubName}</div>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "10.5px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "3px" }}><Clock size={9} /> {event.time}</span>
                      <span style={{ fontSize: "10.5px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "3px" }}><MapPin size={9} /> {event.venue}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: "600", padding: "2px 8px", borderRadius: "99px", background: `${EVENT_TYPE_COLORS[event.type]}20`, color: EVENT_TYPE_COLORS[event.type], flexShrink: 0 }}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* My Achievements */}
          {!isAdmin && (
            <div className="stat-card" style={{ padding: "20px" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Trophy size={15} /> My Achievements
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { badge: "🏆", title: "Club Champion", desc: "Won Inter-School Chess 2024" },
                  { badge: "⭐", title: "Active Member", desc: "3+ months in Robotics Club" },
                  { badge: "🎖️", title: "Event Organizer", desc: "Helped organize 2 events" },
                ].map((ach, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", background: "var(--bg-secondary)", borderRadius: "10px" }}>
                    <div style={{ fontSize: "24px" }}>{ach.badge}</div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{ach.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{ach.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
