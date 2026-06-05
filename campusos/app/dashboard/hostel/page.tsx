"use client";
import { useState } from "react";
import {
  Home, Plus, Search, Users, BedDouble, Key, MapPin,
  Clock, CheckCircle2, XCircle, AlertTriangle, ArrowUpRight,
  ClipboardList, ChevronRight, Eye
} from "lucide-react";

const ROOMS = [
  { block: "Block A", room: "A-101", capacity: 4, occupied: 4, type: "Standard", warden: "Mr. Suresh", students: ["Anjali S.", "Meera N.", "Pooja R.", "Priya D."] },
  { block: "Block A", room: "A-102", capacity: 4, occupied: 3, type: "Standard", warden: "Mr. Suresh", students: ["Rohit S.", "Kiran K.", "Arjun M."] },
  { block: "Block A", room: "A-103", capacity: 2, occupied: 2, type: "Premium", warden: "Mr. Suresh", students: ["Vikram S.", "Rahul G."] },
  { block: "Block B", room: "B-201", capacity: 6, occupied: 5, type: "Dormitory", warden: "Mrs. Kavita", students: ["Sneha J.", "Priya S.", "Anita M.", "Rita K.", "Suma R."] },
  { block: "Block B", room: "B-202", capacity: 6, occupied: 6, type: "Dormitory", warden: "Mrs. Kavita", students: ["Deepa N.", "Lata P.", "Mona S.", "Nisha K.", "Ritu M.", "Usha R."] },
  { block: "Block C", room: "C-301", capacity: 4, occupied: 1, type: "Standard", warden: "Mr. Ramesh", students: ["Anil K."] },
];

const OUTPASS = [
  { student: "Rahul Gupta", room: "A-103", from: "2026-06-05 14:00", to: "2026-06-05 20:00", reason: "Family function", status: "pending" },
  { student: "Priya Sharma", room: "B-201", from: "2026-06-06 09:00", to: "2026-06-07 18:00", reason: "Medical appointment", status: "approved" },
  { student: "Kiran Kumar", room: "A-102", from: "2026-06-05 16:00", to: "2026-06-05 21:00", reason: "Shopping", status: "rejected" },
  { student: "Meera Nair", room: "A-101", from: "2026-06-07 08:00", to: "2026-06-08 20:00", reason: "Weekend home visit", status: "pending" },
];

function OccupancyBar({ occupied, capacity }: { occupied: number; capacity: number }) {
  const pct = (occupied / capacity) * 100;
  const color = pct === 100 ? "#ff8080" : pct >= 75 ? "#D9F9DF" : "#ffd060";
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{occupied}/{capacity} beds</span>
        <span style={{ fontSize: "11px", fontWeight: "600", color }}>{pct.toFixed(0)}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function OutpassBadge({ status }: { status: string }) {
  const map: any = { approved: "badge-mint", pending: "badge-yellow", rejected: "badge-red" };
  return <span className={`badge ${map[status]}`}>{status}</span>;
}

export default function HostelPage() {
  const totalBeds = ROOMS.reduce((a, r) => a + r.capacity, 0);
  const occupiedBeds = ROOMS.reduce((a, r) => a + r.occupied, 0);

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Hostel Management
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Room allocation, outpass management, and hostel operations
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}>
            <Plus size={14} /> Allocate Room
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Beds", value: totalBeds, icon: BedDouble, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Occupied", value: occupiedBeds, icon: Users, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Occupancy %", value: `${((occupiedBeds/totalBeds)*100).toFixed(1)}%`, icon: Home, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          { label: "Pending Outpass", value: OUTPASS.filter(o => o.status === "pending").length, icon: Clock, color: "#ffd060", bg: "rgba(255,208,96,0.1)" },
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

      {/* Rooms grid + Outpass */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px" }}>
        {/* Rooms */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>Room Status</span>
            <button className="btn-ghost" style={{ fontSize: "12px" }}>View All <ArrowUpRight size={12} /></button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {ROOMS.map((room, i) => (
              <div key={i} className="stat-card" style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>{room.room}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{room.block} · {room.type}</div>
                  </div>
                  <span className={`badge ${room.occupied === room.capacity ? "badge-red" : "badge-mint"}`}>
                    {room.occupied === room.capacity ? "Full" : "Available"}
                  </span>
                </div>
                <OccupancyBar occupied={room.occupied} capacity={room.capacity} />
                <div style={{ marginTop: "10px" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "5px" }}>Residents:</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {room.students.slice(0, 3).map((s, si) => (
                      <span key={si} style={{ fontSize: "10.5px", background: "rgba(159,161,255,0.08)", color: "#9FA1FF", padding: "2px 7px", borderRadius: "999px", border: "1px solid rgba(159,161,255,0.15)" }}>{s}</span>
                    ))}
                    {room.students.length > 3 && (
                      <span style={{ fontSize: "10.5px", background: "rgba(255,255,255,0.04)", color: "var(--text-muted)", padding: "2px 7px", borderRadius: "999px" }}>+{room.students.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outpass */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>Outpass Requests</span>
            <span className="badge badge-yellow">{OUTPASS.filter(o => o.status === "pending").length} Pending</span>
          </div>
          <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
            {OUTPASS.map((op, i) => (
              <div key={i} style={{
                padding: "14px 16px",
                borderBottom: i < OUTPASS.length - 1 ? "1px solid var(--border)" : "none",
                display: "flex", flexDirection: "column", gap: "8px"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div className="avatar avatar-sm" style={{ background: "linear-gradient(135deg,#9FA1FF,#AEE2FF)", color: "#0a0b0f" }}>
                      {op.student.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{op.student}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Room {op.room}</div>
                    </div>
                  </div>
                  <OutpassBadge status={op.status} />
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-secondary)", background: "rgba(255,255,255,0.03)", borderRadius: "7px", padding: "8px 10px" }}>
                  <div style={{ display: "flex", gap: "6px", alignItems: "center", marginBottom: "3px" }}>
                    <Clock size={11} color="var(--text-muted)" />
                    <span style={{ color: "var(--text-muted)" }}>{op.from} → {op.to}</span>
                  </div>
                  <div>📝 {op.reason}</div>
                </div>
                {op.status === "pending" && (
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button className="btn-primary" style={{ flex: 1, padding: "6px", fontSize: "12px", gap: "4px" }}>
                      <CheckCircle2 size={12} /> Approve
                    </button>
                    <button className="btn-secondary" style={{ flex: 1, padding: "6px", fontSize: "12px", gap: "4px", color: "#ff8080", borderColor: "rgba(255,128,128,0.3)" }}>
                      <XCircle size={12} /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Warden info */}
          <div style={{ marginTop: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "10px" }}>On-duty Wardens</div>
            {[
              { name: "Mr. Suresh Kumar", block: "Block A", shift: "Day", avatar: "SK" },
              { name: "Mrs. Kavita Singh", block: "Block B", shift: "Night", avatar: "KS" },
              { name: "Mr. Ramesh Rao", block: "Block C", shift: "Day", avatar: "RR" },
            ].map((w, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "10px", background: "var(--bg-card)", border: "1px solid var(--border)", marginBottom: "8px" }}>
                <div className="avatar avatar-sm" style={{ background: "linear-gradient(135deg,#B5BAFF,#9FA1FF)", color: "#0a0b0f" }}>{w.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{w.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{w.block} · {w.shift} shift</div>
                </div>
                <span className={`badge ${w.shift === "Day" ? "badge-mint" : "badge-violet"}`}>{w.shift}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
