"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { GraduationCap, Users, Star, BookOpen, Clock, Search, Filter, Plus, Download } from 'lucide-react';

export default function TeachersPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [teachers, setTeachers] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.tenantId) return;
    try {
      const allUsers = JSON.parse(localStorage.getItem("campusos_users") || "[]");
      setTeachers(allUsers.filter((u: any) => u.institutionId === user.tenantId && u.role === "Teacher"));
    } catch {}
  }, [user]);

  const filtered = teachers.filter(t =>
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.loginId.includes(search.toLowerCase()))
  );

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Teacher Management
            </h1>
            <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
              Manage faculty profiles, assignments, and performance
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}>
              <Download size={14} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Users size={20} color="#B5BAFF" />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Teachers</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#B5BAFF' }}>{teachers.length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Active staff</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Star size={20} color="#AEE2FF" />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Avg. Rating</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#AEE2FF' }}>0.0</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Out of 5.0</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <BookOpen size={20} color="#D9F9DF" />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Subjects Covered</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#D9F9DF' }}>0</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Across all grades</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Clock size={20} color="#9FA1FF" />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>On Leave</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#9FA1FF' }}>0</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Currently absent</div>
        </div>
      </div>

      {/* Table card */}
      <div className="stat-card" style={{ padding: 0, overflow: "visible" }}>
        {/* Filters */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input
              className="input-field"
              placeholder="Search by name or login ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ paddingLeft: "34px", fontSize: "13px" }}
            />
          </div>
          <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px", flexShrink: 0 }}>
            <Filter size={13} /> Filters
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Name', 'Login ID', 'Email', 'Classes', 'Status'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-muted)" }}>
                    <Users size={32} style={{ margin: "0 auto 12px", display: "block", opacity: 0.3 }} />
                    {search ? "No teachers match your search." : "No teachers added yet."}
                  </td>
                </tr>
              ) : filtered.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{t.name}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#9FA1FF", background: "rgba(159,161,255,0.1)", display: "inline-block", padding: "2px 6px", borderRadius: "4px" }}>{t.loginId}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{t.email || "No email"}</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>Unassigned</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ background: 'rgba(217,249,223,0.15)', color: '#D9F9DF', borderRadius: '999px', padding: '0.2rem 0.75rem', fontSize: '0.8rem', fontWeight: 600 }}>
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
