"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap, Eye, EyeOff, ArrowRight,
  Sparkles, Lock, AlertCircle,
} from "lucide-react";
import { useAuth, ROLE_AVATARS } from "../context/AuthContext";

const LS_INSTITUTIONS = "campusos_institutions";
const LS_USERS = "campusos_users"; // users created by institution admins

interface Institution {
  id: string;
  name: string;
  city: string;
  type: string;
  adminId: string;
  adminPass: string;
  adminEmail: string;
  status: "Active" | "Pending" | "Suspended";
  plan: string;
  studentCap: number;
  createdAt: string;
}

interface InstitutionUser {
  id: string;
  institutionId: string;
  institutionName: string;
  loginId: string;
  password: string;
  name: string;
  role: "Super Admin" | "Teacher" | "Student" | "Parent" | "Institution Admin";
  email?: string;
  createdAt: string;
}

function getInstitutions(): Institution[] {
  try { return JSON.parse(localStorage.getItem(LS_INSTITUTIONS) || "[]"); } catch { return []; }
}

function getUsers(): InstitutionUser[] {
  try { return JSON.parse(localStorage.getItem(LS_USERS) || "[]"); } catch { return []; }
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!loginId.trim() || !password.trim()) return;
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    // ── 1. SaaS Owner ──
    if (loginId.trim() === "Myadmin" && password === "Madhavan001@") {
      login({
        name: "Madhavan",
        email: "Myadmin",
        role: "SaaS Owner",
        initials: "MV",
        avatar: ROLE_AVATARS["SaaS Owner"],
        tenantId: "SAAS-ROOT",
        tenantName: "CampusOS Platform",
      });
      router.push("/dashboard/backoffice");
      setLoading(false);
      return;
    }

    // ── 2. Institution Admin (created from Backoffice) ──
    const institutions = getInstitutions();
    const matchedInst = institutions.find(
      (i) => i.adminId === loginId.trim() && i.adminPass === password
    );
    if (matchedInst) {
      if (matchedInst.status === "Suspended") {
        setError("This institution account has been suspended. Contact CampusOS support.");
        setLoading(false);
        return;
      }
      const initials = matchedInst.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase();
      login({
        name: matchedInst.name + " Admin",
        email: matchedInst.adminEmail,
        role: "Institution Admin",
        initials,
        avatar: ROLE_AVATARS["Institution Admin"],
        tenantId: matchedInst.id,
        tenantName: matchedInst.name,
      });
      router.push("/dashboard");
      setLoading(false);
      return;
    }

    // ── 3. Users created by Institution Admin ──
    const users = getUsers();
    const matchedUser = users.find(
      (u) => u.loginId === loginId.trim() && u.password === password
    );
    if (matchedUser) {
      const initials = matchedUser.name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase();
      login({
        name: matchedUser.name,
        email: matchedUser.email || matchedUser.loginId,
        role: matchedUser.role,
        initials,
        avatar: ROLE_AVATARS[matchedUser.role],
        tenantId: matchedUser.institutionId,
        tenantName: matchedUser.institutionName,
      });
      router.push("/dashboard");
      setLoading(false);
      return;
    }

    // ── 4. No match ──
    setError("Invalid login ID or password. Please check your credentials.");
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-primary)",
      display: "flex", position: "relative", overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div className="orb orb-violet" style={{ top: "-100px", right: "20%", opacity: 0.5 }} />
      <div className="orb orb-mint"   style={{ bottom: "10%",  left: "15%" }} />
      <div className="orb orb-sky"    style={{ top: "50%",     right: "-50px" }} />

      {/* Left panel - Branding */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "56px" }}>
          <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg,#9FA1FF,#AEE2FF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GraduationCap size={24} color="#0a0b0f" />
          </div>
          <div>
            <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)" }}>
              Campus<span className="gradient-text">OS</span>
            </div>
            <div style={{ fontSize: "10.5px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
              DIGITAL CAMPUS PLATFORM
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="anim-fade-up" style={{ maxWidth: "480px" }}>
          <div className="badge badge-violet" style={{ marginBottom: "20px" }}>
            <Sparkles size={10} style={{ marginRight: "5px" }} />
            Enterprise Education Platform
          </div>
          <h1 style={{ fontSize: "44px", fontWeight: "800", lineHeight: "1.15", marginBottom: "20px", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
            The{" "}
            <span className="gradient-text">Operating System</span>
            {" "}for your Campus
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "36px" }}>
            Replace paper registers, WhatsApp groups, and manual processes with a unified digital platform built for modern educational institutions.
          </p>
        </div>

        {/* Features */}
        <div className="stagger" style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
          {[
            { icon: "🎓", label: "Complete Student Lifecycle Management" },
            { icon: "💬", label: "Built-in Slack-like Communication" },
            { icon: "📊", label: "Real-time Analytics & Insights" },
            { icon: "🔒", label: "Enterprise-grade Security & RBAC" },
          ].map((f, i) => (
            <div key={i} className="anim-fade-up" style={{ display: "flex", alignItems: "center", gap: "12px", opacity: 0 }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "8px",
                background: "rgba(159,161,255,0.10)", border: "1px solid rgba(159,161,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0,
              }}>{f.icon}</div>
              <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "32px", marginTop: "44px" }}>
          {[{ value: "1M+", label: "Users supported" }, { value: "50+", label: "Modules" }, { value: "99.9%", label: "Uptime SLA" }].map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: "22px", fontWeight: "800" }} className="gradient-text">{s.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel - Login form */}
      <div style={{ width: "500px", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px", position: "relative", zIndex: 1 }}>
        <div style={{
          width: "100%", padding: "36px 40px",
          background: "var(--bg-card)", borderRadius: "20px",
          border: "1px solid var(--border)", boxShadow: "var(--shadow-lg)",
        }}>
          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "6px", color: "var(--text-primary)" }}>Welcome back</h2>
            <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>Sign in to your CampusOS workspace</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            {/* Login ID */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12.5px", color: "var(--text-secondary)", fontWeight: "500", display: "block", marginBottom: "7px" }}>Login ID</label>
              <input
                className="input-field"
                type="text"
                placeholder="Enter your login ID"
                value={loginId}
                onChange={e => { setLoginId(e.target.value); setError(""); }}
                style={{ width: "100%" }}
                required
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12.5px", color: "var(--text-secondary)", fontWeight: "500", display: "block", marginBottom: "7px" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  className="input-field"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  style={{ width: "100%", paddingRight: "44px" }}
                  required
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div style={{ marginBottom: "16px", padding: "10px 14px", borderRadius: "8px", background: "rgba(201,64,64,0.10)", border: "1px solid rgba(201,64,64,0.25)", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <AlertCircle size={15} color="#c94040" style={{ flexShrink: 0, marginTop: "1px" }} />
                <span style={{ fontSize: "13px", color: "#c94040", lineHeight: "1.5" }}>{error}</span>
              </div>
            )}

            {/* Login button */}
            <button type="submit" className="btn-primary" disabled={loading || !loginId || !password} style={{ width: "100%", padding: "12px", fontSize: "14px", marginBottom: "16px" }}>
              {loading ? (
                <div style={{ width: "18px", height: "18px", border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#0a0b0f", borderRadius: "50%", animation: "spin-slow 0.6s linear infinite" }} />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "4px 0 16px" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <button className="btn-secondary" style={{ width: "100%", gap: "8px" }}>
            <Lock size={14} /> Login with OTP
          </button>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
              🔒 Your credentials are issued by your institution admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
