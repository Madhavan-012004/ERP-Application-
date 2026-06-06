"use client";
import { useState, useEffect, useRef } from "react";
import {
  UserPlus, Users, Trash2, Eye, EyeOff, Copy,
  CheckCircle2, Search, BookOpen, Baby,
  MoreHorizontal, RefreshCw, Shield, Upload,
  Download, Plus, X, FileText, ChevronDown, Layers,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

const LS_USERS = "campusos_users";

type AllowedRole = "Teacher" | "Parent" | "Institution Admin";
type ModalMode = "single" | "bulk" | "batch" | null;

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

/* ── helpers ── */
function loadUsers(institutionId: string): CampusUser[] {
  try {
    const all: CampusUser[] = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    return all.filter(u => u.institutionId === institutionId);
  } catch { return []; }
}
function saveUsers(newUsers: CampusUser[]) {
  try {
    const all: CampusUser[] = JSON.parse(localStorage.getItem(LS_USERS) || "[]");
    all.push(...newUsers);
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
function generateId(name: string, role: string, existing: CampusUser[]): string {
  const prefix = role === "Teacher" ? "tch" : role === "Parent" ? "par" : "adm";
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6);
  const taken = new Set(existing.map(u => u.loginId));
  let id = `${prefix}_${base}`;
  let n = 1;
  while (taken.has(id)) { id = `${prefix}_${base}${n++}`; }
  existing.push({ loginId: id } as any); // temp push to avoid dupes in batch
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

/* ── sub-components ── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };
  return (
    <button onClick={copy} title="Copy" style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#2d8c45" : "var(--text-muted)", padding: "2px 4px" }}>
      {copied ? <CheckCircle2 size={13} /> : <Copy size={13} />}
    </button>
  );
}

const ROLE_CONFIG: Record<AllowedRole, { color: string; bg: string; icon: any; label: string }> = {
  "Institution Admin": { color: "#9FA1FF", bg: "rgba(159,161,255,0.12)", icon: Shield,   label: "Admin" },
  "Teacher":           { color: "#2d8c45", bg: "rgba(45,140,69,0.12)",   icon: BookOpen, label: "Teacher" },
  "Parent":            { color: "#6062d6", bg: "rgba(96,98,214,0.12)",   icon: Baby,     label: "Parent" },
};

const ROLES: AllowedRole[] = ["Teacher", "Parent", "Institution Admin"];

/* ═══════════════════════════════════════════
   MODAL 1 — Single User Add
═══════════════════════════════════════════ */
function SingleModal({ onClose, onSave, existingUsers, tenantId, tenantName }: any) {
  const [form, setForm] = useState({ name: "", role: "Parent" as AllowedRole, email: "" });
  const [err, setErr] = useState("");
  const idPreview = form.name
    ? `${form.role === "Teacher" ? "tch" : form.role === "Parent" ? "par" : "adm"}_${form.name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 6)}`
    : "";

  const handleCreate = () => {
    if (!form.name.trim()) { setErr("Name is required."); return; }
    const tmp = [...existingUsers];
    const loginId = generateId(form.name, form.role, tmp);
    const password = generatePassword();
    const newUser: CampusUser = {
      id: `${tenantId}-${Date.now()}`,
      institutionId: tenantId, institutionName: tenantName,
      loginId, password, name: form.name.trim(),
      role: form.role, email: form.email.trim() || undefined,
      createdAt: new Date().toISOString(),
    };
    onSave([newUser]);
    onClose();
  };

  return (
    <ModalShell onClose={onClose} title="Add Single User" subtitle="A unique Login ID and password will be auto-generated" icon={<UserPlus size={18} color="#9FA1FF" />}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Field label="Full Name *">
          <input className="input-field" placeholder="e.g. Arjun Kumar" value={form.name}
            onChange={e => { setForm({ ...form, name: e.target.value }); setErr(""); }} style={{ width: "100%" }} />
          {idPreview && <div style={{ marginTop: 5, fontSize: 11.5, color: "var(--text-muted)" }}>Preview ID: <code style={{ color: "#9FA1FF" }}>{idPreview}</code></div>}
        </Field>
        <Field label="Role *">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {ROLES.map(role => {
              const { color, bg, icon: Icon, label } = ROLE_CONFIG[role];
              const sel = form.role === role;
              return (
                <button key={role} type="button" onClick={() => setForm({ ...form, role })}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 8px", borderRadius: 10, border: sel ? `2px solid ${color}` : "1.5px solid var(--border)", background: sel ? bg : "transparent", cursor: "pointer", transition: "all 0.15s" }}>
                  <Icon size={16} color={sel ? color : "var(--text-muted)"} />
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: sel ? color : "var(--text-secondary)" }}>{label}</span>
                </button>
              );
            })}
          </div>
        </Field>
        <Field label={<>Email <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>(optional)</span></>}>
          <input className="input-field" type="email" placeholder="user@school.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: "100%" }} />
        </Field>
        {err && <ErrBox>{err}</ErrBox>}
        <InfoBox>🔑 A unique <strong>Login ID</strong> and <strong>password</strong> will be auto-generated. Share these with the user.</InfoBox>
      </div>
      <ModalFooter onCancel={onClose} onConfirm={handleCreate} confirmText="Create User" disabled={!form.name.trim()} />
    </ModalShell>
  );
}

/* ═══════════════════════════════════════════
   MODAL 2 — Batch Add (multiple rows inline)
═══════════════════════════════════════════ */
type BatchRow = { name: string; role: AllowedRole; email: string; _id: number };
function BatchModal({ onClose, onSave, existingUsers, tenantId, tenantName }: any) {
  const [rows, setRows] = useState<BatchRow[]>([
    { name: "", role: "Parent", email: "", _id: Date.now() },
  ]);
  const [err, setErr] = useState("");

  const addRow = () => setRows(r => [...r, { name: "", role: "Parent", email: "", _id: Date.now() + Math.random() }]);
  const removeRow = (id: number) => setRows(r => r.filter(x => x._id !== id));
  const update = (id: number, field: keyof BatchRow, val: string) =>
    setRows(r => r.map(x => x._id === id ? { ...x, [field]: val } : x));

  const handleCreate = () => {
    const valid = rows.filter(r => r.name.trim());
    if (!valid.length) { setErr("Add at least one name."); return; }
    const tmp = [...existingUsers];
    const created: CampusUser[] = valid.map(r => ({
      id: `${tenantId}-${Date.now()}-${Math.random()}`,
      institutionId: tenantId, institutionName: tenantName,
      loginId: generateId(r.name, r.role, tmp),
      password: generatePassword(),
      name: r.name.trim(), role: r.role,
      email: r.email.trim() || undefined,
      createdAt: new Date().toISOString(),
    }));
    onSave(created);
    onClose();
  };

  return (
    <ModalShell onClose={onClose} title="Batch Add Users" subtitle={`Add up to 20 users at once — ${rows.length} row${rows.length !== 1 ? "s" : ""} added`} icon={<Layers size={18} color="#AEE2FF" />} wide>
      <div style={{ maxHeight: 340, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 2fr 36px", gap: 8, padding: "0 4px" }}>
          {["Full Name *", "Role", "Email (optional)", ""].map((h, i) => (
            <div key={i} style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
          ))}
        </div>
        {rows.map((row, idx) => (
          <div key={row._id} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 2fr 36px", gap: 8, alignItems: "center" }}>
            <input className="input-field" placeholder={`Name ${idx + 1}`} value={row.name}
              onChange={e => update(row._id, "name", e.target.value)} style={{ fontSize: 13 }} />
            <select className="input-field" value={row.role} onChange={e => update(row._id, "role", e.target.value as AllowedRole)}
              style={{ fontSize: 12.5, cursor: "pointer" }}>
              {ROLES.map(r => <option key={r} value={r}>{ROLE_CONFIG[r].label}</option>)}
            </select>
            <input className="input-field" placeholder="email@school.com" value={row.email}
              onChange={e => update(row._id, "email", e.target.value)} style={{ fontSize: 13 }} />
            <button onClick={() => removeRow(row._id)} disabled={rows.length === 1}
              style={{ width: 32, height: 32, borderRadius: 7, border: "1px solid var(--border)", background: "none", cursor: rows.length === 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", opacity: rows.length === 1 ? 0.3 : 1 }}>
              <X size={13} />
            </button>
          </div>
        ))}
      </div>
      <button onClick={addRow} disabled={rows.length >= 20}
        style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#9FA1FF", background: "none", border: "1.5px dashed rgba(159,161,255,0.4)", borderRadius: 8, padding: "8px 14px", cursor: rows.length >= 20 ? "not-allowed" : "pointer", width: "100%", justifyContent: "center" }}>
        <Plus size={14} /> Add Another Row {rows.length >= 20 ? "(max 20)" : ""}
      </button>
      {err && <ErrBox>{err}</ErrBox>}
      <InfoBox>✅ Login IDs and passwords will be auto-generated for all <strong>{rows.filter(r => r.name.trim()).length} valid</strong> users.</InfoBox>
      <ModalFooter onCancel={onClose} onConfirm={handleCreate} confirmText={`Create ${rows.filter(r => r.name.trim()).length} Users`} disabled={!rows.some(r => r.name.trim())} />
    </ModalShell>
  );
}

/* ═══════════════════════════════════════════
   MODAL 3 — CSV Import
═══════════════════════════════════════════ */
function CsvModal({ onClose, onSave, existingUsers, tenantId, tenantName }: any) {
  const [parsed, setParsed] = useState<BatchRow[]>([]);
  const [err, setErr] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const TEMPLATE = "Name,Role,Email\nArjun Kumar,Parent,arjun@email.com\nPriya Sharma,Teacher,priya@school.com";

  const downloadTemplate = () => {
    const blob = new Blob([TEMPLATE], { type: "text/csv" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = "campusos_users_template.csv"; a.click();
  };

  const parseCSV = (text: string) => {
    setErr("");
    const lines = text.split(/\r?\n/).filter(l => l.trim());
    if (lines.length < 2) { setErr("CSV must have a header row and at least one data row."); return; }
    const header = lines[0].toLowerCase().split(",").map(h => h.trim());
    const nameIdx = header.indexOf("name");
    const roleIdx = header.indexOf("role");
    const emailIdx = header.indexOf("email");
    if (nameIdx === -1) { setErr("CSV must have a 'Name' column."); return; }

    const rows: BatchRow[] = [];
    for (let i = 1; i < Math.min(lines.length, 21); i++) {
      const cols = lines[i].split(",").map(c => c.trim());
      const name = cols[nameIdx] || "";
      if (!name) continue;
      const rawRole = roleIdx !== -1 ? cols[roleIdx] : "";
      const role: AllowedRole = rawRole.toLowerCase().includes("teacher") ? "Teacher"
        : rawRole.toLowerCase().includes("admin") ? "Institution Admin" : "Parent";
      const email = emailIdx !== -1 ? cols[emailIdx] : "";
      rows.push({ name, role, email, _id: i });
    }
    if (!rows.length) { setErr("No valid rows found in CSV."); return; }
    setParsed(rows);
  };

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".csv")) { setErr("Please upload a .csv file."); return; }
    const reader = new FileReader();
    reader.onload = e => parseCSV(e.target?.result as string);
    reader.readAsText(file);
  };

  const handleCreate = () => {
    const tmp = [...existingUsers];
    const created: CampusUser[] = parsed.map(r => ({
      id: `${tenantId}-${Date.now()}-${Math.random()}`,
      institutionId: tenantId, institutionName: tenantName,
      loginId: generateId(r.name, r.role, tmp),
      password: generatePassword(),
      name: r.name.trim(), role: r.role,
      email: r.email.trim() || undefined,
      createdAt: new Date().toISOString(),
    }));
    onSave(created);
    onClose();
  };

  return (
    <ModalShell onClose={onClose} title="Import from CSV" subtitle="Upload a CSV file to create multiple users at once" icon={<Upload size={18} color="#D9F9DF" />} wide>
      {/* Download Template */}
      <button onClick={downloadTemplate}
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", borderRadius: 9, border: "1px solid var(--border)", background: "var(--bg-secondary)", fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", cursor: "pointer", marginBottom: 14, width: "100%", justifyContent: "center" }}>
        <Download size={14} /> Download CSV Template
      </button>

      {/* Drop Zone */}
      {!parsed.length ? (
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragOver ? "#9FA1FF" : "var(--border)"}`,
            borderRadius: 12, padding: "36px 20px", textAlign: "center",
            cursor: "pointer", transition: "all 0.2s",
            background: dragOver ? "rgba(159,161,255,0.05)" : "var(--bg-secondary)",
          }}>
          <Upload size={32} color={dragOver ? "#9FA1FF" : "var(--text-muted)"} style={{ margin: "0 auto 12px", display: "block" }} />
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
            Drop your CSV file here, or <span style={{ color: "#9FA1FF" }}>browse</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Supports .csv files up to 20 users</div>
          <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
        </div>
      ) : (
        /* Preview Table */
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>✅ {parsed.length} users ready to import</div>
            <button onClick={() => setParsed([])} style={{ fontSize: 12, color: "#9FA1FF", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Re-upload</button>
          </div>
          <div style={{ maxHeight: 240, overflowY: "auto", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
              <thead>
                <tr style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
                  {["#", "Name", "Role", "Email"].map(h => (
                    <th key={h} style={{ padding: "9px 12px", textAlign: "left", fontWeight: 700, color: "var(--text-muted)", fontSize: 11 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsed.map((r, i) => {
                  const { color, bg } = ROLE_CONFIG[r.role];
                  return (
                    <tr key={r._id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "8px 12px", color: "var(--text-muted)", fontSize: 11 }}>{i + 1}</td>
                      <td style={{ padding: "8px 12px", fontWeight: 600, color: "var(--text-primary)" }}>{r.name}</td>
                      <td style={{ padding: "8px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, background: bg, color }}>{r.role}</span>
                      </td>
                      <td style={{ padding: "8px 12px", color: "var(--text-muted)" }}>{r.email || "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {err && <ErrBox style={{ marginTop: 12 }}>{err}</ErrBox>}
      <ModalFooter onCancel={onClose} onConfirm={handleCreate} confirmText={parsed.length ? `Import ${parsed.length} Users` : "Import"} disabled={!parsed.length} />
    </ModalShell>
  );
}

/* ── Shared UI primitives ── */
function ModalShell({ onClose, title, subtitle, icon, children, wide }: any) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border)", width: "100%", maxWidth: wide ? 680 : 460, padding: "30px 34px", boxShadow: "var(--shadow-lg)", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(159,161,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>{title}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{subtitle}</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
function ModalFooter({ onCancel, onConfirm, confirmText, disabled }: any) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
      <button className="btn-secondary" style={{ flex: 1 }} onClick={onCancel}>Cancel</button>
      <button className="btn-primary" style={{ flex: 2, gap: 7 }} onClick={onConfirm} disabled={disabled}>
        <CheckCircle2 size={14} /> {confirmText}
      </button>
    </div>
  );
}
function Field({ label, children }: any) {
  return (
    <div>
      <label style={{ fontSize: 12.5, color: "var(--text-secondary)", fontWeight: 600, display: "block", marginBottom: 7 }}>{label}</label>
      {children}
    </div>
  );
}
function ErrBox({ children, style }: any) {
  return <div style={{ padding: "9px 12px", borderRadius: 8, background: "rgba(201,64,64,0.10)", border: "1px solid rgba(201,64,64,0.2)", fontSize: 13, color: "#c94040", ...style }}>{children}</div>;
}
function InfoBox({ children }: any) {
  return <div style={{ padding: "10px 12px", borderRadius: 9, background: "rgba(159,161,255,0.07)", border: "1px solid rgba(159,161,255,0.15)", fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.6 }}>{children}</div>;
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function UsersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<CampusUser[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalMode>(null);
  const [revealMap, setRevealMap] = useState<Record<string, boolean>>({});
  const [actionMenu, setActionMenu] = useState<string | null>(null);
  const [addMenuOpen, setAddMenuOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (user && user.role !== "Institution Admin") router.replace("/dashboard");
  }, [user]);

  useEffect(() => {
    if (user?.tenantId) setUsers(loadUsers(user.tenantId));
  }, [user]);

  const refresh = () => { if (user?.tenantId) setUsers(loadUsers(user.tenantId)); };

  const handleSave = (newUsers: CampusUser[]) => {
    saveUsers(newUsers);
    refresh();
    setSuccessMsg(`✅ ${newUsers.length} user${newUsers.length !== 1 ? "s" : ""} created successfully!`);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Delete this user? They will lose access immediately.")) return;
    deleteUser(id); refresh(); setActionMenu(null);
  };
  const handleResetPass = (id: string) => {
    const newPass = generatePassword(); updateUserPassword(id, newPass); refresh(); setActionMenu(null);
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.loginId.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const counts = {
    Teacher: users.filter(u => u.role === "Teacher").length,
    Parent:  users.filter(u => u.role === "Parent").length,
    "Institution Admin": users.filter(u => u.role === "Institution Admin").length,
  };

  const ADD_OPTIONS = [
    { key: "single", icon: UserPlus, label: "Add Single User",   desc: "Create one user with a form",              color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
    { key: "batch",  icon: Layers,   label: "Batch Add",         desc: "Add multiple users in one table",          color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
    { key: "bulk",   icon: Upload,   label: "Import from CSV",   desc: "Upload a .csv file to bulk-create users",  color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
  ];

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

        {/* Add User dropdown */}
        <div style={{ position: "relative" }}>
          <button className="btn-primary" style={{ gap: 8 }} onClick={() => setAddMenuOpen(o => !o)}>
            <UserPlus size={15} /> Add User <ChevronDown size={13} style={{ transform: addMenuOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
          </button>
          {addMenuOpen && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setAddMenuOpen(false)} />
              <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: 280, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: 8, boxShadow: "var(--shadow-lg)", zIndex: 50 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.07em", padding: "4px 10px 8px" }}>Choose a method</div>
                {ADD_OPTIONS.map(opt => (
                  <button key={opt.key} onClick={() => { setModal(opt.key as ModalMode); setAddMenuOpen(false); }}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 12px", borderRadius: 10, border: "none", background: "none", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                    onMouseOver={e => (e.currentTarget.style.background = opt.bg)}
                    onMouseOut={e => (e.currentTarget.style.background = "none")}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: opt.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <opt.icon size={16} color={opt.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)" }}>{opt.label}</div>
                      <div style={{ fontSize: 11.5, color: "var(--text-muted)" }}>{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Success Toast */}
      {successMsg && (
        <div style={{ padding: "12px 18px", borderRadius: 10, background: "rgba(45,140,69,0.12)", border: "1px solid rgba(45,140,69,0.25)", fontSize: 13.5, fontWeight: 600, color: "#2d8c45", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          {successMsg}
        </div>
      )}

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 28 }}>
        {(["Teacher", "Parent", "Institution Admin"] as AllowedRole[]).map(role => {
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
        <div className="stat-card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: "rgba(159,161,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Users size={17} color="#9FA1FF" />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)" }}>{users.length}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 500 }}>Total Users</div>
          </div>
        </div>
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
                  {search ? "No users match your search." : (
                    <div>
                      <div style={{ marginBottom: 12 }}>No users yet. Choose a method to add your first users.</div>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                        {ADD_OPTIONS.map(opt => (
                          <button key={opt.key} onClick={() => setModal(opt.key as ModalMode)}
                            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 8, border: "1.5px solid var(--border)", background: opt.bg, cursor: "pointer", fontSize: 12.5, fontWeight: 600, color: opt.color }}>
                            <opt.icon size={13} /> {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ) : filtered.map(u => {
              const { color, bg, icon: Icon } = ROLE_CONFIG[u.role as AllowedRole] ?? ROLE_CONFIG["Parent"];
              const showPass = revealMap[u.id];
              const initials = u.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase();
              return (
                <tr key={u.id} style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s" }}
                  onMouseOver={e => (e.currentTarget.style.background = "rgba(159,161,255,0.04)")}
                  onMouseOut={e => (e.currentTarget.style.background = "transparent")}>
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
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <code style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", background: "var(--bg-secondary)", padding: "2px 7px", borderRadius: 5 }}>{u.loginId}</code>
                      <CopyBtn text={u.loginId} />
                    </div>
                  </td>
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
                  <td style={{ padding: "13px 16px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, fontWeight: 700, padding: "3px 10px", borderRadius: 99, background: bg, color }}>
                      <Icon size={11} /> {u.role}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px", fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{formatDate(u.createdAt)}</td>
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

      {/* Modals */}
      {modal === "single" && <SingleModal onClose={() => setModal(null)} onSave={handleSave} existingUsers={users} tenantId={user?.tenantId} tenantName={user?.tenantName} />}
      {modal === "batch"  && <BatchModal  onClose={() => setModal(null)} onSave={handleSave} existingUsers={users} tenantId={user?.tenantId} tenantName={user?.tenantName} />}
      {modal === "bulk"   && <CsvModal    onClose={() => setModal(null)} onSave={handleSave} existingUsers={users} tenantId={user?.tenantId} tenantName={user?.tenantName} />}

      {actionMenu && <div style={{ position: "fixed", inset: 0, zIndex: 40 }} onClick={() => setActionMenu(null)} />}
    </div>
  );
}
