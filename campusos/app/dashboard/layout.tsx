"use client";

import { useState, ReactNode, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, Calendar,
  ClipboardList, FileText, DollarSign, Home, Bus, Coffee,
  HeartPulse, Library, Package, Megaphone, Trophy, UsersRound,
  ShieldCheck, BarChart3, Settings, Bell, Search, ChevronDown,
  Menu, X, LogOut, Moon, Sun, MessageSquare, Zap,
  Building2, Boxes, User
} from "lucide-react";
import { useAuth, UserRole } from "../../context/AuthContext";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { Crown } from "lucide-react";

/* ─────────────────── Role-based nav config ─────────────────── */
type NavItem = { icon: any; label: string; href: string };
type NavGroup = { label: string; items: NavItem[] };

const ALL_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
      { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    ],
  },
  {
    label: "Academic",
    items: [
      { icon: GraduationCap, label: "Students", href: "/dashboard/students" },
      { icon: Users, label: "Teachers", href: "/dashboard/teachers" },
      { icon: BookOpen, label: "Academics", href: "/dashboard/academics" },
      { icon: Calendar, label: "Timetable", href: "/dashboard/timetable" },
      { icon: ClipboardList, label: "Attendance", href: "/dashboard/attendance" },
      { icon: FileText, label: "Assignments", href: "/dashboard/assignments" },
      { icon: Trophy, label: "Examinations", href: "/dashboard/examinations" },
    ],
  },
  {
    label: "Operations",
    items: [
      { icon: DollarSign, label: "Finance", href: "/dashboard/finance" },
      { icon: Home, label: "Hostel", href: "/dashboard/hostel" },
      { icon: Bus, label: "Transport", href: "/dashboard/transport" },
      { icon: Coffee, label: "Canteen", href: "/dashboard/canteen" },
      { icon: HeartPulse, label: "Medical", href: "/dashboard/medical" },
      { icon: Library, label: "Library", href: "/dashboard/library" },
    ],
  },
  {
    label: "Campus Life",
    items: [
      { icon: Megaphone, label: "Events", href: "/dashboard/events" },
      { icon: UsersRound, label: "Clubs", href: "/dashboard/clubs" },
      { icon: Package, label: "Inventory", href: "/dashboard/inventory" },
      { icon: ShieldCheck, label: "Security", href: "/dashboard/security" },
    ],
  },
  {
    label: "Communication",
    items: [
      { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
      { icon: Bell, label: "Announcements", href: "/dashboard/announcements" },
    ],
  },
  {
    label: "Administration",
    items: [
      { icon: Building2, label: "Institution", href: "/dashboard/institution" },
      { icon: Boxes, label: "Admissions", href: "/dashboard/admissions" },
      { icon: Zap, label: "Certificates", href: "/dashboard/certificates" },
      { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ],
  },
  {
    label: "Platform",
    items: [
      { icon: Crown, label: "Backoffice", href: "/dashboard/backoffice" },
    ],
  },
];

// Items each role can access (hrefs)
const ROLE_ACCESS: Record<UserRole, string[]> = {
  "SaaS Owner": ["/dashboard/backoffice"],
  "Super Admin": ["*"], // all
  "Institution Admin": ["*"], // all
  "Teacher": [
    "/dashboard",
    "/dashboard/timetable",
    "/dashboard/attendance",
    "/dashboard/assignments",
    "/dashboard/examinations",
    "/dashboard/students",
    "/dashboard/library",
    "/dashboard/events",
    "/dashboard/messages",
    "/dashboard/announcements",
    "/dashboard/certificates",
    "/dashboard/medical",
    "/dashboard/transport",
  ],
  "Student": [
    "/dashboard",
    "/dashboard/timetable",
    "/dashboard/attendance",
    "/dashboard/assignments",
    "/dashboard/examinations",
    "/dashboard/hostel",
    "/dashboard/transport",
    "/dashboard/library",
    "/dashboard/events",
    "/dashboard/clubs",
    "/dashboard/messages",
    "/dashboard/announcements",
    "/dashboard/certificates",
    "/dashboard/medical",
    "/dashboard/canteen",
    "/dashboard/settings",
  ],
  "Parent": [
    "/dashboard",
    "/dashboard/attendance",
    "/dashboard/examinations",
    "/dashboard/finance",
    "/dashboard/transport",
    "/dashboard/events",
    "/dashboard/messages",
    "/dashboard/announcements",
    "/dashboard/certificates",
    "/dashboard/settings",
  ],
};

function getFilteredGroups(role: UserRole): NavGroup[] {
  const allowed = ROLE_ACCESS[role];
  if (allowed.includes("*")) return ALL_GROUPS;

  return ALL_GROUPS
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => allowed.includes(item.href)),
    }))
    .filter((group) => group.items.length > 0);
}

/* ─────────────────── Sub-components ─────────────────── */
function SidebarItem({ icon: Icon, label, href, active }: { icon: any; label: string; href: string; active: boolean }) {
  return (
    <Link href={href} className={`sidebar-item ${active ? "active" : ""}`}>
      <Icon size={15} />
      <span>{label}</span>
    </Link>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="btn-ghost"
      style={{ padding: "8px", borderRadius: "8px", border: "1px solid var(--border)" }}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}

/* ─────────────────── Inner layout (has theme access) ─────────────────── */
function DashboardInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<'sidebar' | 'header' | null>(null);

  // Redirect to login if no user
  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router]);

  if (!user) return null;

  const role = user.role;
  const filteredGroups = getFilteredGroups(role);

  const roleColor: Record<UserRole, string> = {
    "SaaS Owner": "#ff8c00",
    "Super Admin": "#6062d6",
    "Institution Admin": "#1a7ab5",
    "Teacher": "#2d8c45",
    "Student": "#5458c4",
    "Parent": "#1a7ab5",
  };
  const roleBadgeClass: Record<UserRole, string> = {
    "SaaS Owner": "badge-yellow",
    "Super Admin": "badge-violet",
    "Institution Admin": "badge-sky",
    "Teacher": "badge-mint",
    "Student": "badge-lavender",
    "Parent": "badge-sky",
  };

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 49, backdropFilter: "blur(3px)" }} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Logo */}
        <div style={{ padding: "18px 16px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: "linear-gradient(135deg,#9FA1FF,#AEE2FF)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <GraduationCap size={18} color="#0a0b0f" />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "var(--text-primary)" }}>Campus<span className="gradient-text">OS</span></div>
              <div style={{ fontSize: "9.5px", color: "var(--text-muted)", letterSpacing: "0.06em" }}>ENTERPRISE EDITION</div>
            </div>
          </div>
          <button className="btn-ghost" style={{ padding: "4px" }} onClick={() => setSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>

        {/* Institution badge */}
        <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 10px", borderRadius: "8px", background: "rgba(159,161,255,0.06)", border: "1px solid rgba(159,161,255,0.12)", cursor: "pointer" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "6px", background: "linear-gradient(135deg,#D9F9DF,#AEE2FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Building2 size={13} color="#0a0b0f" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "12.5px", fontWeight: "600", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.tenantName}</div>
              <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>{user.tenantId}</div>
            </div>
            <ChevronDown size={13} color="var(--text-muted)" />
          </div>
        </div>

        {/* Role banner */}
        <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", background: "rgba(159,161,255,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Logged in as:</span>
            <span className={`badge ${roleBadgeClass[role]}`} style={{ fontSize: "10.5px" }}>{role}</span>
          </div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, overflowY: "auto", padding: "10px" }}>
          {filteredGroups.map((group) => (
            <div key={group.label} style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "10px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 12px", marginBottom: "4px" }}>
                {group.label}
              </div>
              {group.items.map((item) => (
                <SidebarItem key={item.href} icon={item.icon} label={item.label} href={item.href} active={pathname === item.href} />
              ))}
            </div>
          ))}
        </div>

        {/* User section */}
        <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border)", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "8px 10px", borderRadius: "8px", cursor: "pointer", transition: "background 0.2s" }}
            onMouseOver={(e) => (e.currentTarget.style.background = "rgba(159,161,255,0.06)")}
            onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            onClick={() => setProfileMenuOpen(prev => prev === 'sidebar' ? null : 'sidebar')}
          >
            <div className="avatar" style={{ background: user.avatar, color: "#0a0b0f", fontSize: "12px" }}>{user.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{user.name}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{user.email}</div>
            </div>
            <div style={{ color: "var(--text-muted)", background: "none", border: "none", display: "flex" }}>
              <ChevronDown size={14} style={{ transform: profileMenuOpen === 'sidebar' ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </div>
          </div>

          {/* Profile Dropdown */}
          {profileMenuOpen === 'sidebar' && (
            <div style={{ position: "absolute", bottom: "calc(100% - 10px)", left: "14px", right: "14px", marginBottom: "8px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "8px", boxShadow: "var(--shadow-lg)", zIndex: 60 }}>
              <Link href="/dashboard/settings" onClick={() => setProfileMenuOpen(null)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", color: "var(--text-primary)", fontSize: "13px", fontWeight: "500", textDecoration: "none", transition: "background 0.2s" }} className="hover-bg">
                <Settings size={14} /> Profile Settings
              </Link>
              <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", color: "var(--text-primary)", fontSize: "13px", fontWeight: "500", background: "none", border: "none", cursor: "pointer", transition: "background 0.2s" }} className="hover-bg">
                <UsersRound size={14} /> Switch Account
              </button>
              <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />
              <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", color: "#c94040", fontSize: "13px", fontWeight: "500", background: "none", border: "none", cursor: "pointer", transition: "background 0.2s" }} className="hover-bg-red">
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className="btn-ghost" style={{ padding: "8px" }} onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={18} />
            </button>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search size={14} style={{ position: "absolute", left: "10px", color: "var(--text-muted)", pointerEvents: "none" }} />
              <input className="input-field" placeholder="Search…" style={{ width: "280px", paddingLeft: "32px", paddingTop: "8px", paddingBottom: "8px", fontSize: "13px" }} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* AI only for Admin/Super Admin */}
            {(role === "Super Admin" || role === "Institution Admin") && (
              <button className="btn-secondary" style={{ gap: "6px", fontSize: "12.5px", padding: "7px 14px" }}>
                <Zap size={13} color="#9FA1FF" /> AI Assistant
              </button>
            )}

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Notifications */}
            <button className="btn-ghost" style={{ padding: "8px", position: "relative" }}>
              <Bell size={18} />
              <span style={{ position: "absolute", top: "6px", right: "6px", width: "7px", height: "7px", borderRadius: "50%", background: "#9FA1FF", border: "2px solid var(--bg-card)" }} />
            </button>

            {/* User avatar */}
            <div style={{ position: "relative" }}>
              <div className="avatar" onClick={() => setProfileMenuOpen(prev => prev === 'header' ? null : 'header')} style={{ background: user.avatar, color: "#0a0b0f", cursor: "pointer", fontSize: "12px" }} title="Profile">
                {user.initials}
              </div>
              
              {/* Header Profile Dropdown */}
              {profileMenuOpen === 'header' && (
                <div style={{ position: "absolute", top: "100%", right: "0", marginTop: "12px", width: "200px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "12px", padding: "8px", boxShadow: "var(--shadow-lg)", zIndex: 60 }}>
                  <Link href="/dashboard/settings" onClick={() => setProfileMenuOpen(null)} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", color: "var(--text-primary)", fontSize: "13px", fontWeight: "500", textDecoration: "none", transition: "background 0.2s" }} className="hover-bg">
                    <Settings size={14} /> Profile Settings
                  </Link>
                  <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", color: "var(--text-primary)", fontSize: "13px", fontWeight: "500", background: "none", border: "none", cursor: "pointer", transition: "background 0.2s" }} className="hover-bg">
                    <UsersRound size={14} /> Switch Account
                  </button>
                  <div style={{ height: "1px", background: "var(--border)", margin: "4px 0" }} />
                  <button onClick={handleLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", color: "#c94040", fontSize: "13px", fontWeight: "500", background: "none", border: "none", cursor: "pointer", transition: "background 0.2s" }} className="hover-bg-red">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page */}
        <main style={{ minHeight: "calc(100vh - 64px)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

/* ─────────────────── Exported layout wraps with ThemeProvider ─────────────────── */
export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return (
    <ThemeProvider userEmail={user?.email}>
      <DashboardInner>{children}</DashboardInner>
    </ThemeProvider>
  );
}
