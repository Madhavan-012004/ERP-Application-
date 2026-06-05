"use client";
import { useState, useEffect } from "react";
import {
  Crown, Plus, Building2, Copy, Eye, EyeOff, CheckCircle2,
  XCircle, Clock, Trash2, RefreshCw, Search, Shield,
  Users, GraduationCap, TrendingUp, Globe, MoreHorizontal,
  Key, AlertTriangle, UserPlus, BookOpen, UsersRound, Baby,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

/* ─── Types ─── */
interface Institution {
  id: string;
  name: string;
  city: string;
  type: "School" | "College" | "University" | "Coaching";
  adminEmail: string;
  adminId: string;
  adminPass: string;
  status: "Active" | "Pending" | "Suspended";
  createdAt: string;
  plan: "Starter" | "Pro" | "Enterprise";
  studentCap: number;
}

const LS_KEY = "campusos_institutions";

/* ─── Helpers ─── */
function loadInstitutions(): Institution[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { return []; }
}
function saveInstitutions(list: Institution[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}
function nextId(existing: Institution[]): string {
  const nums = existing.map(i => parseInt(i.id.replace("INST-", "")) || 0);
  const max = nums.length ? Math.max(...nums) : 0;
  return `INST-${String(max + 1).padStart(3, "0")}`;
}
function generateAdminId(name: string, existing: Institution[]): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8);
  const taken = new Set(existing.map(i => i.adminId));
  let candidate = `admin_${base}`;
  let n = 1;
  while (taken.has(candidate)) { candidate = `admin_${base}${n++}`; }
  return candidate;
}
function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const specials = "@#$!";
  let pass = "";
  for (let i = 0; i < 8; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  pass += specials[Math.floor(Math.random() * specials.length)];
  pass += Math.floor(Math.random() * 90 + 10);
  return pass;
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

/* ─── StatusBadge ─── */
function StatusBadge({ status }: { status: Institution["status"] }) {
  const cfg = {
    Active:    { icon: CheckCircle2, color: "#2d8c45", bg: "rgba(45,140,69,0.12)" },
    Pending:   { icon: Clock,        color: "#b87d00", bg: "rgba(220,160,20,0.12)" },
    Suspended: { icon: XCircle,      color: "#c94040", bg: "rgba(201,64,64,0.12)" },
  }[status];
  const Icon = cfg.icon;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, background: cfg.bg, color: cfg.color }}>
      <Icon size={10} /> {status}
    </span>
  );
}

/* ─── CopyBtn ─── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };
  return (
    <button onClick={copy} title="Copy" style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#2d8c45" : "var(--text-muted)", padding: "2px 4px", borderRadius: 4, transition: "color 0.2s" }}>
      {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
    </button>
  );
}

const PLAN_COLORS: Record<Institution["plan"], { color: string; bg: string }> = {
  Starter:    { color: "#5458c4", bg: "rgba(84,88,196,0.12)" },
  Pro:        { color: "#9FA1FF", bg: "rgba(159,161,255,0.12)" },
  Enterprise: { color: "#ff8c00", bg: "rgba(255,140,0,0.12)" },
};

/* ════════════════════════ MAIN PAGE ════════════════════════ */
export default function BackofficePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [revealMap, setRevealMap] = useState<Record<string, boolean>>({});
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "", city: "", type: "School" as Institution["type"],
    plan: "Pro" as Institution["plan"], studentCap: "500",
  });

  useEffect(() => {
    if (user && user.role !== "SaaS Owner") router.replace("/dashboard");
  }, [user]);

  useEffect(() => { setInstitutions(loadInstitutions()); }, []);

  const filtered = institutions.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.id.toLowerCase().includes(search.toLowerCase()) ||
    i.adminId.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.name.trim() || !form.city.trim()) return;
    const newList = [...institutions];
    const id = nextId(newList);
    const adminId = generateAdminId(form.name, newList);
    const adminPass = generatePassword();
    const inst: Institution = {
      id, name: form.name.trim(), city: form.city.trim(), type: form.type,
      adminEmail: `${adminId}@campusos.io`, adminId, adminPass,
      status: "Pending", createdAt: new Date().toISOString(),
      plan: form.plan, studentCap: parseInt(form.studentCap) || 500,
    };
    newList.push(inst);
    saveInstitutions(newList);
    setInstitutions(newList);
    setShowModal(false);
    setForm({ name: "", city: "", type: "School", plan: "Pro", studentCap: "500" });
  };

  const setStatus = (id: string, status: Institution["status"]) => {
    const updated = institutions.map(i => i.id === id ? { ...i, status } : i);
    saveInstitutions(updated);
    setInstitutions(updated);
    setActionMenu(null);
  };

  const resetPass = (id: string) => {
    const updated = institutions.map(i => i.id === id ? { ...i, adminPass: generatePassword() } : i);
    saveInstitutions(updated);
    setInstitutions(updated);
    setActionMenu(null);
  };

  const deleteInst = (id: string) => {
    if (!confirm("Permanently delete this institution? All associated users will also lose access.")) return;
    // remove institution users too
    try {
      const users = JSON.parse(localStorage.getItem("campusos_users") || "[]");
      localStorage.setItem("campusos_users", JSON.stringify(users.filter((u: any) => u.institutionId !== id)));
    } catch {}
    const updated = institutions.filter(i => i.id !== id);
    saveInstitutions(updated);
    setInstitutions(updated);
    setActionMenu(null);
  };

  const active    = institutions.filter(i => i.status === "Active").length;
  const pending   = institutions.filter(i => i.status === "Pending").length;
  const suspended = institutions.filter(i => i.status === "Suspended").length;

  return (
    <div className="page-content">
      {/* Header */}
      <div className="section-header" style={{ marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,140,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Crown size={18} color="#ff8c00" />
            </div>
            <h1 className="section-title" style={{ margin: 0, fontSize: 20 }}>
              CampusOS <span style={{ background: "linear-gradient(90deg,#ff8c00,#ffd060)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Backoffice</span>
            </h1>
          </div>
          <p className="section-subtitle">Provision institutions and manage Super Admin credentials</p>
        </div>
        <button className="btn-primary" style={{ gap: 7 }} onClick={() => setShowModal(true)}>
          <Plus size={15} /> New Institution
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Total Institutions", value: institutions.length, icon: Building2, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Active",    value: active,    icon: CheckCircle2, color: "#2d8c45", bg: "rgba(45,140,69,0.1)" },
          { label: "Pending",   value: pending,   icon: Clock,        color: "#b87d00", bg: "rgba(220,160,20,0.1)" },
          { label: "Suspended", value: suspended, icon: XCircle,      color: "#c94040", bg: "rgba(201,64,64,0.1)" },
          { label: "Total Capacity", value: institutions.reduce((s, i) => s + i.studentCap, 0).toLocaleString(), icon: GraduationCap, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
            <div className="module-icon" style={{ background: s.bg, width: 40, height: 40, borderRadius: 10 }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 18, maxWidth: 360 }}>
        <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
        <input className="input-field" placeholder="Search by name, ID or admin ID…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36, width: "100%" }} />
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Institution", "ID", "Admin Credentials", "Plan", "Capacity", "Status", "Created", "Actions"].map(h => (
                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-muted)" }}>
                  <Building2 size={32} style={{ margin: "0 auto 12px", display: "block", opacity: 0.3 }} />
                  {search ? "No institutions match your search." : 'No institutions yet. Click "New Institution" to get started.'}
                </td>
              </tr>
            ) : filtered.map(inst => {
              const showPass = revealMap[inst.id];
              const { color: planColor, bg: planBg } = PLAN_COLORS[inst.plan];
              return (
                <tr key={inst.id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s" }}
                  onMouseOver={e => (e.currentTarget.style.background = "rgba(159,161,255,0.04)")}
                  onMouseOut={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(159,161,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 800, color: "#9FA1FF" }}>
                        {inst.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)" }}>{inst.name}</div>
                        <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{inst.city} · {inst.type}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 700, color: "#9FA1FF", background: "rgba(159,161,255,0.1)", padding: "3px 8px", borderRadius: 6 }}>{inst.id}</span>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 11, color: "var(--text-muted)", width: 22, flexShrink: 0 }}>ID</span>
                        <code style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-primary)", background: "var(--bg-secondary)", padding: "1px 6px", borderRadius: 4 }}>{inst.adminId}</code>
                        <CopyBtn text={inst.adminId} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontSize: 11, color: "var(--text-muted)", width: 22, flexShrink: 0 }}>PW</span>
                        <code style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-primary)", background: "var(--bg-secondary)", padding: "1px 6px", borderRadius: 4 }}>
                          {showPass ? inst.adminPass : "••••••••••"}
                        </code>
                        <button onClick={() => setRevealMap(m => ({ ...m, [inst.id]: !showPass }))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "2px 4px" }}>
                          {showPass ? <EyeOff size={12} /> : <Eye size={12} />}
                        </button>
                        {showPass && <CopyBtn text={inst.adminPass} />}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: planBg, color: planColor }}>{inst.plan}</span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>
                    {inst.studentCap.toLocaleString()}
                  </td>
                  <td style={{ padding: "14px 16px" }}><StatusBadge status={inst.status} /></td>
                  <td style={{ padding: "14px 16px", fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{formatDate(inst.createdAt)}</td>
                  <td style={{ padding: "14px 16px", position: "relative" }}>
                    <button className="btn-ghost" style={{ padding: "6px 8px" }} onClick={() => setActionMenu(actionMenu === inst.id ? null : inst.id)}>
                      <MoreHorizontal size={15} />
                    </button>
                    {actionMenu === inst.id && (
                      <div style={{ position: "absolute", right: 8, top: "calc(100% - 4px)", width: 190, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 8, boxShadow: "var(--shadow-lg)", zIndex: 50 }}>
                        {inst.status !== "Active" && (
                          <button className="hover-bg" onClick={() => setStatus(inst.id, "Active")} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", background: "none", border: "none", cursor: "pointer", borderRadius: 7, fontSize: 13, color: "#2d8c45" }}>
                            <CheckCircle2 size={13} /> Activate
                          </button>
                        )}
                        {inst.status !== "Suspended" && (
                          <button className="hover-bg" onClick={() => setStatus(inst.id, "Suspended")} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", background: "none", border: "none", cursor: "pointer", borderRadius: 7, fontSize: 13, color: "#b87d00" }}>
                            <AlertTriangle size={13} /> Suspend
                          </button>
                        )}
                        <button className="hover-bg" onClick={() => resetPass(inst.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", background: "none", border: "none", cursor: "pointer", borderRadius: 7, fontSize: 13, color: "var(--text-secondary)" }}>
                          <RefreshCw size={13} /> Reset Password
                        </button>
                        <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
                        <button onClick={() => deleteInst(inst.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", background: "none", border: "none", cursor: "pointer", borderRadius: 7, fontSize: 13, color: "#c94040" }}>
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Create Modal ── */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)", width: "100%", maxWidth: 520, padding: "32px 36px", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,140,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={18} color="#ff8c00" />
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)" }}>Add New Institution</div>
                <div style={{ fontSize: 12.5, color: "var(--text-muted)" }}>Unique Admin ID and password will be auto-generated</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12.5, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 7 }}>Institution Name *</label>
                <input className="input-field" placeholder="e.g. Delhi Public School" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: "100%" }} />
                {form.name && (
                  <div style={{ marginTop: 6, fontSize: 11.5, color: "var(--text-muted)" }}>
                    Admin login ID will be: <code style={{ color: "#9FA1FF" }}>admin_{form.name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 8)}</code>
                  </div>
                )}
              </div>
              <div>
                <label style={{ fontSize: 12.5, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 7 }}>City *</label>
                <input className="input-field" placeholder="e.g. New Delhi" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} style={{ width: "100%" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12.5, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 7 }}>Type</label>
                  <select className="input-field" value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })} style={{ width: "100%" }}>
                    {["School", "College", "University", "Coaching"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12.5, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 7 }}>Plan</label>
                  <select className="input-field" value={form.plan} onChange={e => setForm({ ...form, plan: e.target.value as any })} style={{ width: "100%" }}>
                    {["Starter", "Pro", "Enterprise"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12.5, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 7 }}>Max Students</label>
                <input className="input-field" type="number" min={10} max={50000} placeholder="500" value={form.studentCap} onChange={e => setForm({ ...form, studentCap: e.target.value })} style={{ width: "100%" }} />
              </div>
              <div style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(159,161,255,0.08)", border: "1px solid rgba(159,161,255,0.18)", display: "flex", gap: 10 }}>
                <Key size={16} color="#9FA1FF" style={{ flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  A unique <strong>Admin ID</strong> and secure <strong>password</strong> will be generated. No two institutions will share the same login ID. The Institution Admin uses these to log in and create accounts for their staff and students.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-primary" style={{ flex: 2, gap: 7 }} onClick={handleCreate} disabled={!form.name.trim() || !form.city.trim()}>
                <Plus size={14} /> Create Institution
              </button>
            </div>
          </div>
        </div>
      )}

      {actionMenu && <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setActionMenu(null)} />}
    </div>
  );
}
