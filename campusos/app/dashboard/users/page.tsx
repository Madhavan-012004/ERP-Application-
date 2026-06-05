"use client";
import { useState, useEffect } from "react";
import {
  UserPlus, Users, Trash2, Eye, EyeOff, Copy,
  CheckCircle2, Search, BookOpen, GraduationCap, Baby,
  MoreHorizontal, RefreshCw, Shield,
} from "lucide-react";
import { useAuth, UserRole } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

const LS_USERS = "campusos_users";
const LS_INSTITUTIONS = "campusos_institutions";

type AllowedRole = "Teacher" | "Student" | "Parent" | "Institution Admin";

interface CampusUser {
  id: string;
  institutionId: string;
  institutionName: string;
  loginId: string;
  password: string;
  name: string;
  role: AllowedRole;
  email?: string;
  createdAt: string;
}

function loadUsers(institutionId: string): CampusUser[] {
  try {
    const all: CampusUser[] = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    return all.filter(u => u.institutionId === institutionId);
  } catch { return []; }
}

function saveUser(user: CampusUser) {
  try {
    const all: CampusUser[] = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    all.push(user);
    localStorage.setItem(LS_USERS, JSON.stringify(all));
  } catch {}
}

function deleteUser(userId: string) {
  try {
    const all: CampusUser[] = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    localStorage.setItem(LS_USERS, JSON.stringify(all.filter(u => u.id !== userId)));
  } catch {}
}

function updateUserPassword(userId: string, newPass: string) {
  try {
    const all: CampusUser[] = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    localStorage.setItem(LS_USERS, JSON.stringify(all.map(u => u.id === userId ? { ...u, password: newPass } : u)));
  } catch {}
}

function generateId(name: string, role: string, existing: CampusUser[], instId: string): string {
  const prefix = role === "Teacher" ? "tch" : role === "Student" ? "stu" : role === "Parent" ? "par" : "adm";
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6);
  const taken = new Set(existing.map(u => u.loginId));
  let id = `${prefix}_${base}`;
  let n = 1;
  while (taken.has(id)) { id = `${prefix}_${base}${n++}`; }
  return id;
}

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let pass = "";
  for (let i = 0; i < 8; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass + "@" + Math.floor(Math.random() * 90 + 10);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  return (
    <button onClick={copy} title="Copy" style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#2d8c45" : "var(--text-muted)", padding: "2px 4px" }}>
      {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
    </button>
  );
}

const ROLE_CONFIG: Record<AllowedRole, { color: string; bg: string; icon: any }> = {
  "Institution Admin": { color: "#9FA1FF", bg: "rgba(159,161,255,0.12)", icon: Shield },
  "Teacher":          { color: "#2d8c45", bg: "rgba(45,140,69,0.12)",   icon: BookOpen },
  "Student":          { color: "#5458c4", bg: "rgba(84,88,196,0.12)",   icon: GraduationCap },
  "Parent":           { color: "#1a7ab5", bg: "rgba(26,122,181,0.12)",  icon: Baby },
};

export default function UsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<CampusUser[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [revealMap, setRevealMap] = useState<Record<string, boolean>>({});
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "Student" as AllowedRole, email: "" });
  const [formError, setFormError] = useState("");

  // Only Institution Admin can access
  useEffect(() => {
    if (user && user.role !== "Institution Admin") router.replace("/dashboard");
  }, [user]);

  useEffect(() => {
    if (user?.tenantId) setUsers(loadUsers(user.tenantId));
  }, [user]);

  const refresh = () => { if (user?.tenantId) setUsers(loadUsers(user.tenantId)); };

  const handleCreate = () => {
    setFormError("");
    if (!form.name.trim()) { setFormError("Name is required."); return; }

    const loginId = generateId(form.name, form.role, users, user!.tenantId);
    const password = generatePassword();

    const newUser: CampusUser = {
      id: `${user!.tenantId}-${Date.now()}`,
      institutionId: user!.tenantId,
      institutionName: user!.tenantName,
      loginId,
      password,
      name: form.name.trim(),
      role: form.role,
      email: form.email.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    saveUser(newUser);
    refresh();
    setShowModal(false);
    setForm({ name: "", role: "Student", email: "" });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this user? They will lose access immediately.")) return;
    deleteUser(id);
    refresh();
    setActionMenu(null);
  };

  const handleResetPass = (id: string) => {
    const newPass = generatePassword();
    updateUserPassword(id, newPass);
    refresh();
    setActionMenu(null);
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.loginId.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const counts = {
    Teacher: users.filter(u => u.role === "Teacher").length,
    Student: users.filter(u => u.role === "Student").length,
    Parent:  users.filter(u => u.role === "Parent").length,
    "Institution Admin": users.filter(u => u.role === "Institution Admin").length,
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div className="section-header" style={{ marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(159,161,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={18} color="#9FA1FF" />
            </div>
            <h1 className="section-title" style={{ margin: 0, fontSize: 20 }}>User Management</h1>
          </div>
          <p className="section-subtitle">{user?.tenantName} — Create and manage user accounts</p>
        </div>
        <button className="btn-primary" style={{ gap: 7 }} onClick={() => setShowModal(true)}>
          <UserPlus size={15} /> Add User
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 28 }}>
        {(["Teacher", "Student", "Parent", "Institution Admin"] as AllowedRole[]).map(role => {
          const { color, bg, icon: Icon } = ROLE_CONFIG[role];
          return (
            <div key={role} className="stat-card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={17} color={color} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>{counts[role]}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>{role}s</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: 18, maxWidth: 360 }}>
        <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }} />
        <input className="input-field" placeholder="Search by name, login ID or role…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36, width: "100%" }} />
      </div>

      {/* Table */}
      <div className="glass-card" style={{ padding: 0, overflow: "visible" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["User", "Login ID", "Password", "Role", "Created", "Actions"].map(h => (
                <th key={h} style={{ padding: "13px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "48px 24px", textAlign: "center", color: "var(--text-muted)" }}>
                  <Users size={32} style={{ margin: "0 auto 12px", display: "block", opacity: 0.3 }} />
                  {search ? "No users match your search." : 'No users yet. Click "Add User" to create the first account.'}
                </td>
              </tr>
            ) : filtered.map(u => {
              const { color, bg, icon: Icon } = ROLE_CONFIG[u.role];
              const showPass = revealMap[u.id];
              const initials = u.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase();
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s", position: actionMenu === u.id ? "relative" : "static", zIndex: actionMenu === u.id ? 51 : "auto" }}
                  onMouseOver={e => (e.currentTarget.style.background = "rgba(159,161,255,0.04)")}
                  onMouseOut={e => (e.currentTarget.style.background = "transparent")}
                >
                  {/* User */}
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, fontWeight: 800, color }}>
                        {initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)" }}>{u.name}</div>
                        {u.email && <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{u.email}</div>}
                      </div>
                    </div>
                  </td>
                  {/* Login ID */}
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <code style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", background: "var(--bg-secondary)", padding: "2px 7px", borderRadius: 5 }}>{u.loginId}</code>
                      <CopyBtn text={u.loginId} />
                    </div>
                  </td>
                  {/* Password */}
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <code style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text-primary)", background: "var(--bg-secondary)", padding: "2px 7px", borderRadius: 5 }}>
                        {showPass ? u.password : "••••••••••"}
                      </code>
                      <button onClick={() => setRevealMap(m => ({ ...m, [u.id]: !showPass }))} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "2px 4px" }}>
                        {showPass ? <EyeOff size={12} /> : <Eye size={12} />}
                      </button>
                      {showPass && <CopyBtn text={u.password} />}
                    </div>
                  </td>
                  {/* Role */}
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: bg, color }}>
                      <Icon size={11} /> {u.role}
                    </span>
                  </td>
                  {/* Created */}
                  <td style={{ padding: "13px 16px", fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{formatDate(u.createdAt)}</td>
                  {/* Actions */}
                  <td style={{ padding: "13px 16px", position: "relative" }}>
                    <button className="btn-ghost" style={{ padding: "6px 8px" }} onClick={() => setActionMenu(actionMenu === u.id ? null : u.id)}>
                      <MoreHorizontal size={15} />
                    </button>
                    {actionMenu === u.id && (
                      <div style={{ position: "absolute", right: 8, top: "calc(100% - 4px)", width: 180, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: 8, boxShadow: "var(--shadow-lg)", zIndex: 60 }}>
                        <button className="hover-bg" onClick={() => handleResetPass(u.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", background: "none", border: "none", cursor: "pointer", borderRadius: 7, fontSize: 13, color: "var(--text-secondary)" }}>
                          <RefreshCw size={13} /> Reset Password
                        </button>
                        <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
                        <button onClick={() => handleDelete(u.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", background: "none", border: "none", cursor: "pointer", borderRadius: 7, fontSize: 13, color: "#c94040" }}>
                          <Trash2 size={13} /> Delete User
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

      {/* ── Create User Modal ── */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)", width: "100%", maxWidth: 460, padding: "30px 34px", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(159,161,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <UserPlus size={18} color="#9FA1FF" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>Add New User</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>A unique Login ID and password will be generated</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ fontSize: 12.5, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 7 }}>Full Name *</label>
                <input className="input-field" placeholder="e.g. Arjun Kumar" value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setFormError(""); }} style={{ width: "100%" }} />
                {form.name && (
                  <div style={{ marginTop: 5, fontSize: 11.5, color: "var(--text-muted)" }}>
                    Login ID preview: <code style={{ color: "#9FA1FF" }}>
                      {form.role === "Teacher" ? "tch" : form.role === "Student" ? "stu" : form.role === "Parent" ? "par" : "adm"}_{form.name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6)}
                    </code>
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: 12.5, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 7 }}>Role *</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {(["Student", "Teacher", "Parent", "Institution Admin"] as AllowedRole[]).map(role => {
                    const { color, bg, icon: Icon } = ROLE_CONFIG[role];
                    const selected = form.role === role;
                    return (
                      <button key={role} type="button" onClick={() => setForm({ ...form, role })}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 9, border: selected ? `1.5px solid ${color}` : "1.5px solid var(--border)", background: selected ? bg : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
                        <Icon size={14} color={selected ? color : "var(--text-muted)"} />
                        <span style={{ fontSize: 12.5, fontWeight: 600, color: selected ? color : "var(--text-secondary)" }}>{role}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12.5, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 7 }}>Email <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></label>
                <input className="input-field" type="email" placeholder="user@school.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: "100%" }} />
              </div>

              {formError && (
                <div style={{ padding: "9px 12px", borderRadius: 8, background: "rgba(201,64,64,0.10)", border: "1px solid rgba(201,64,64,0.2)", fontSize: 13, color: "#c94040" }}>
                  {formError}
                </div>
              )}

              <div style={{ padding: "10px 12px", borderRadius: 9, background: "rgba(159,161,255,0.07)", border: "1px solid rgba(159,161,255,0.15)", fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                🔑 A unique <strong>Login ID</strong> and <strong>password</strong> will be auto-generated. Share these with the user to let them log in.
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => { setShowModal(false); setFormError(""); }}>Cancel</button>
              <button className="btn-primary" style={{ flex: 2, gap: 7 }} onClick={handleCreate} disabled={!form.name.trim()}>
                <UserPlus size={14} /> Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {actionMenu && <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setActionMenu(null)} />}
    </div>
  );
}
