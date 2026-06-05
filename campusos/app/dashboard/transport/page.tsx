"use client";
import { useState } from "react";
import {
  Bus, MapPin, Users, Clock, Plus, Navigation,
  AlertTriangle, CheckCircle2, ChevronRight, Phone,
  Fuel, Settings, Eye, Route
} from "lucide-react";

const ROUTES = [
  { id: "RT-01", name: "Route 1 — Connaught Place", buses: 2, students: 84, driver: "Ram Singh", status: "on-route", eta: "08:32", distance: "12.4 km" },
  { id: "RT-02", name: "Route 2 — Dwarka", buses: 3, students: 120, driver: "Mohan Lal", status: "on-route", eta: "08:45", distance: "18.2 km" },
  { id: "RT-03", name: "Route 3 — Rohini", buses: 2, students: 96, driver: "Suresh Kumar", status: "delayed", eta: "09:10", distance: "21.6 km" },
  { id: "RT-04", name: "Route 4 — Lajpat Nagar", buses: 2, students: 78, driver: "Vijay Sharma", status: "on-route", eta: "08:28", distance: "9.8 km" },
  { id: "RT-05", name: "Route 5 — Faridabad", buses: 3, students: 142, driver: "Deepak Singh", status: "completed", eta: "Arrived", distance: "28.4 km" },
];

const BUSES = [
  { id: "DL-01-AB-1234", route: "Route 1", driver: "Ram Singh", students: 42, capacity: 60, fuel: 72, status: "active", lastService: "2026-05-15" },
  { id: "DL-01-CD-5678", route: "Route 2", driver: "Mohan Lal", students: 58, capacity: 60, fuel: 45, status: "active", lastService: "2026-05-20" },
  { id: "DL-01-EF-9012", route: "Route 3", driver: "Suresh Kumar", students: 48, capacity: 60, fuel: 30, status: "low-fuel", lastService: "2026-04-30" },
  { id: "DL-01-GH-3456", route: "Route 4", driver: "Vijay Sharma", students: 39, capacity: 60, fuel: 85, status: "active", lastService: "2026-05-25" },
];

function RouteStatusBadge({ status }: { status: string }) {
  if (status === "on-route") return <span className="badge badge-mint">🟢 On Route</span>;
  if (status === "delayed") return <span className="badge badge-yellow">⚠️ Delayed</span>;
  return <span className="badge badge-sky">✅ Completed</span>;
}

function BusStatusBadge({ status }: { status: string }) {
  if (status === "active") return <span className="badge badge-mint">Active</span>;
  if (status === "low-fuel") return <span className="badge badge-yellow">Low Fuel</span>;
  return <span className="badge badge-red">Inactive</span>;
}

export default function TransportPage() {
  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Transport Management
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            Fleet, routes, GPS tracking and driver management
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}>
            <Navigation size={13} /> Live Map
          </button>
          <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}>
            <Plus size={14} /> Add Route
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Active Buses", value: "18", icon: Bus, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Total Routes", value: "12", icon: Route, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          { label: "Students Covered", value: "624", icon: Users, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "On-time Arrivals", value: "94%", icon: Clock, color: "#B5BAFF", bg: "rgba(181,186,255,0.1)" },
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

      {/* Map placeholder + Alerts */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px", marginBottom: "20px" }}>
        {/* Live Map Placeholder */}
        <div className="stat-card" style={{
          padding: "0", overflow: "hidden", position: "relative", minHeight: "300px",
          display: "flex", flexDirection: "column"
        }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div className="section-title">Live GPS Tracking</div>
              <div className="section-subtitle">Real-time bus positions</div>
            </div>
            <span className="badge badge-mint"><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#D9F9DF", display: "inline-block", marginRight: "4px" }} />Live</span>
          </div>
          <div style={{
            flex: 1, background: "linear-gradient(135deg, rgba(159,161,255,0.05) 0%, rgba(174,226,255,0.05) 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", position: "relative", minHeight: "220px"
          }}>
            {/* Simulated map grid */}
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(159,161,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(159,161,255,0.06) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
            {/* Bus markers */}
            {[
              { top: "30%", left: "25%", route: "RT-1", color: "#9FA1FF" },
              { top: "55%", left: "60%", route: "RT-2", color: "#AEE2FF" },
              { top: "20%", left: "70%", route: "RT-3", color: "#ffd060" },
              { top: "70%", left: "35%", route: "RT-4", color: "#D9F9DF" },
            ].map((marker, i) => (
              <div key={i} style={{
                position: "absolute", top: marker.top, left: marker.left,
                transform: "translate(-50%, -50%)", cursor: "pointer"
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: marker.color, display: "flex", alignItems: "center", justifyContent: "center",
                  border: "3px solid rgba(255,255,255,0.2)", boxShadow: `0 0 12px ${marker.color}66`,
                  animation: i < 3 ? "pulse-glow 2s ease-in-out infinite" : "none"
                }}>
                  <Bus size={16} color="#0a0b0f" />
                </div>
                <div style={{
                  marginTop: "4px", fontSize: "9px", fontWeight: "700",
                  color: marker.color, textAlign: "center", whiteSpace: "nowrap"
                }}>{marker.route}</div>
              </div>
            ))}
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <Navigation size={32} color="rgba(159,161,255,0.3)" style={{ marginBottom: "8px" }} />
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Google Maps Integration</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>Connect your Google Maps API key</div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div>
          <div style={{ marginBottom: "14px" }}>
            <div className="section-title">Route Status</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {ROUTES.map((r, i) => (
              <div key={i} style={{
                padding: "14px", borderRadius: "12px",
                background: "var(--bg-card)", border: "1px solid var(--border)",
                display: "flex", flexDirection: "column", gap: "8px"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{r.name}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Driver: {r.driver} · {r.distance}</div>
                  </div>
                  <RouteStatusBadge status={r.status} />
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Users size={11} color="var(--text-muted)" />
                    <span style={{ fontSize: "11.5px", color: "var(--text-secondary)" }}>{r.students} students</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Clock size={11} color={r.status === "delayed" ? "#ffd060" : "var(--text-muted)"} />
                    <span style={{ fontSize: "11.5px", color: r.status === "delayed" ? "#ffd060" : "var(--text-secondary)" }}>ETA: {r.eta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fleet table */}
      <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
          <div className="section-title">Fleet Management</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Route</th>
              <th>Driver</th>
              <th>Occupancy</th>
              <th>Fuel Level</th>
              <th>Status</th>
              <th>Last Service</th>
              <th style={{ textAlign: "right" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {BUSES.map((b, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div className="module-icon" style={{ width: "32px", height: "32px", background: "rgba(159,161,255,0.1)" }}>
                      <Bus size={14} color="#9FA1FF" />
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#9FA1FF" }}>{b.id}</span>
                  </div>
                </td>
                <td style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{b.route}</td>
                <td style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{b.driver}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div className="progress-bar" style={{ width: "80px" }}>
                      <div className="progress-fill" style={{ width: `${(b.students/b.capacity)*100}%` }} />
                    </div>
                    <span style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>{b.students}/{b.capacity}</span>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Fuel size={12} color={b.fuel < 40 ? "#ffd060" : "#D9F9DF"} />
                    <div className="progress-bar" style={{ width: "60px" }}>
                      <div className="progress-fill" style={{ width: `${b.fuel}%`, background: b.fuel < 40 ? "#ffd060" : "linear-gradient(90deg,#9FA1FF,#AEE2FF)" }} />
                    </div>
                    <span style={{ fontSize: "11px", color: b.fuel < 40 ? "#ffd060" : "var(--text-muted)" }}>{b.fuel}%</span>
                  </div>
                </td>
                <td><BusStatusBadge status={b.status} /></td>
                <td style={{ fontSize: "12.5px", color: "var(--text-secondary)" }}>{b.lastService}</td>
                <td style={{ textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "4px", justifyContent: "flex-end" }}>
                    <button className="btn-ghost" style={{ padding: "5px" }}><Eye size={14} /></button>
                    <button className="btn-ghost" style={{ padding: "5px" }}><Settings size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
