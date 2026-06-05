"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap, Shield, Eye, EyeOff, ArrowRight,
  Sparkles, Users, BookOpen, BarChart3, Lock, ChevronRight,
} from "lucide-react";
import { useAuth, UserRole, ROLE_AVATARS } from "../context/AuthContext";

const DEMO_ROLES: {
  role: UserRole; icon: any; color: string; bg: string; desc: string;
  email: string; name: string; initials: string;
}[] = [
  {
    role: "Super Admin",
    icon: Shield,
    color: "#6062d6",
    bg: "rgba(96,98,214,0.10)",
    desc: "Full platform access",
    email: "superadmin@campusos.io",
    name: "Platform Admin",
    initials: "PA",
  },
  {
    role: "Institution Admin",
    icon: BarChart3,
    color: "#1a7ab5",
    bg: "rgba(26,122,181,0.10)",
    desc: "Institution-wide management",
    email: "admin@dps.school.in",
    name: "Rahul Anand",
    initials: "RA",
  },
  {
    role: "Teacher",
    icon: BookOpen,
    color: "#2d8c45",
    bg: "rgba(45,140,69,0.10)",
    desc: "Class & subject management",
    email: "teacher@dps.school.in",
    name: "Priya Sharma",
    initials: "PS",
  },
  {
    role: "Student",
    icon: GraduationCap,
    color: "#5458c4",
    bg: "rgba(84,88,196,0.10)",
    desc: "My classes, attendance & fees",
    email: "student@dps.school.in",
    name: "Arjun Mehta",
    initials: "AM",
  },
  {
    role: "Parent",
    icon: Users,
    color: "#1a7ab5",
    bg: "rgba(26,122,181,0.10)",
    desc: "Monitor your child's progress",
    email: "parent@dps.school.in",
    name: "Suresh Mehta",
    initials: "SM",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email) return;
    
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    const emailLower = email.toLowerCase();
    let matchedRole = DEMO_ROLES.find(r => r.email === emailLower);
    
    // Fallback logic if exact email isn't in DEMO_ROLES
    if (!matchedRole) {
      if (emailLower.includes("super")) matchedRole = DEMO_ROLES.find(r => r.role === "Super Admin");
      else if (emailLower.includes("admin")) matchedRole = DEMO_ROLES.find(r => r.role === "Institution Admin");
      else if (emailLower.includes("teacher")) matchedRole = DEMO_ROLES.find(r => r.role === "Teacher");
      else if (emailLower.includes("parent")) matchedRole = DEMO_ROLES.find(r => r.role === "Parent");
      else matchedRole = DEMO_ROLES.find(r => r.role === "Student");
    }

    if (!matchedRole) matchedRole = DEMO_ROLES.find(r => r.role === "Student")!;

    login({
      name: matchedRole.name,
      email: email,
      role: matchedRole.role,
      initials: matchedRole.initials,
      avatar: ROLE_AVATARS[matchedRole.role],
      tenantId: "DPS-001",
      tenantName: "Delhi Public School",
    });

    router.push("/dashboard");
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
            {/* Email / ID */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ fontSize: "12.5px", color: "var(--text-secondary)", fontWeight: "500", display: "block", marginBottom: "7px" }}>Email / ID</label>
              <input 
                className="input-field" 
                type="text"
                placeholder="Enter your email or ID"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ width: "100%" }} 
                required
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
                <label style={{ fontSize: "12.5px", color: "var(--text-secondary)", fontWeight: "500", display: "block" }}>Password</label>
                <a href="#" style={{ fontSize: "12px", color: "var(--violet)", textDecoration: "none", fontWeight: "500" }}>Forgot password?</a>
              </div>
              <div style={{ position: "relative" }}>
                <input 
                  className="input-field" 
                  type={showPass ? "text" : "password"} 
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ width: "100%", paddingRight: "44px" }} 
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button type="submit" className="btn-primary" disabled={loading || !email || !password} style={{ width: "100%", padding: "12px", fontSize: "14px" }}>
              {loading ? (
                <div style={{ width: "18px", height: "18px", border: "2px solid rgba(0,0,0,0.2)", borderTopColor: "#0a0b0f", borderRadius: "50%", animation: "spin-slow 0.6s linear infinite" }} />
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>or</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
          </div>

          <button className="btn-secondary" style={{ width: "100%", gap: "8px" }}>
            <Lock size={14} /> Login with OTP
          </button>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
              🔒 Secured by JWT · Multi-Factor Auth · SOC2 Compliant
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
