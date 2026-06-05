"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  User, Bell, Shield, Palette, Globe, CreditCard,
  Monitor, Moon, Sun, Smartphone, Save, Camera,
  Key, LogOut, ChevronRight, Check,
  Mail, Phone, AlertTriangle, Eye, EyeOff, Info
} from "lucide-react";

const SECTIONS = ["Profile", "Notifications", "Appearance", "Privacy & Security", "Account"];

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <div
      onClick={onChange}
      style={{
        width: "42px", height: "24px", borderRadius: "99px", cursor: "pointer",
        background: checked ? "var(--violet)" : "var(--bg-secondary)",
        border: `1px solid ${checked ? "var(--violet)" : "var(--border)"}`,
        position: "relative", transition: "all 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        width: "18px", height: "18px", borderRadius: "50%", background: "#fff",
        position: "absolute", top: "2px", left: checked ? "20px" : "2px",
        transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)"
      }} />
    </div>
  );
}

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("Profile");
  const [saved, setSaved] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || "User",
    email: user?.email || "",
    phone: "+91 98765 43210",
    bio: "Passionate about education and technology.",
    language: "English",
    timezone: "Asia/Kolkata (IST +05:30)",
  });

  // Notification state
  const [notifications, setNotifications] = useState({
    emailAnnouncements: true, emailAssignments: true, emailExams: false,
    pushAnnouncements: true, pushAssignments: true, pushAttendance: true,
    pushMessages: true, pushEvents: false, smsAlerts: true,
  });

  // Appearance
  const [appearance, setAppearance] = useState({
    theme: "dark", fontSize: "medium", compactMode: false, animationsEnabled: true,
  });

  // Privacy
  const [privacy, setPrivacy] = useState({
    profileVisible: true, activityStatus: true, twoFactor: false,
    loginAlerts: true, dataSharing: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleNotif = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const SECTION_ICONS: Record<string, React.ReactNode> = {
    "Profile": <User size={15} />,
    "Notifications": <Bell size={15} />,
    "Appearance": <Palette size={15} />,
    "Privacy & Security": <Shield size={15} />,
    "Account": <CreditCard size={15} />,
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Settings</h1>
        <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
          Manage your account, preferences, and security settings
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "20px", alignItems: "flex-start" }}>
        {/* Sidebar Nav */}
        <div className="stat-card" style={{ padding: "8px" }}>
          {SECTIONS.map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              style={{
                width: "100%", padding: "10px 14px", borderRadius: "10px", fontSize: "13.5px", fontWeight: "600",
                cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "10px",
                textAlign: "left", border: "none",
                background: activeSection === section ? "var(--violet)15" : "transparent",
                color: activeSection === section ? "var(--violet)" : "var(--text-secondary)",
              }}
            >
              {SECTION_ICONS[section]}
              {section}
            </button>
          ))}
          <div style={{ margin: "8px 0", height: "1px", background: "var(--border)" }} />
          <button
            onClick={logout}
            style={{
              width: "100%", padding: "10px 14px", borderRadius: "10px", fontSize: "13.5px", fontWeight: "600",
              cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "10px",
              textAlign: "left", border: "none", background: "transparent", color: "#D64040",
            }}
            onMouseOver={e => (e.currentTarget.style.background = "#D6404012")}
            onMouseOut={e => (e.currentTarget.style.background = "transparent")}
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        {/* Content */}
        <div className="stat-card" style={{ padding: "28px" }}>
          {/* Profile Section */}
          {activeSection === "Profile" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "24px" }}>Profile Settings</h2>
              
              {/* Avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: user?.avatar || "var(--violet)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700", color: "#fff" }}>
                    {user?.initials || "U"}
                  </div>
                  <button style={{ position: "absolute", bottom: "-2px", right: "-2px", width: "24px", height: "24px", borderRadius: "50%", background: "var(--violet)", border: "2px solid var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <Camera size={11} color="#fff" />
                  </button>
                </div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "4px" }}>{user?.name}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "10px" }}>{user?.role} · {user?.tenantName}</div>
                  <button className="btn-ghost" style={{ fontSize: "12px", padding: "6px 14px" }}>Change Photo</button>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                {[
                  { label: "Full Name", key: "name", type: "text" },
                  { label: "Email Address", key: "email", type: "email" },
                  { label: "Phone Number", key: "phone", type: "tel" },
                  { label: "Language", key: "language", type: "text" },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>{field.label}</label>
                    <input
                      type={field.type}
                      className="input-field"
                      style={{ width: "100%", fontSize: "13.5px" }}
                      value={profileData[field.key as keyof typeof profileData]}
                      onChange={e => setProfileData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Bio</label>
                <textarea
                  className="input-field"
                  rows={3}
                  style={{ width: "100%", fontSize: "13.5px", resize: "vertical" }}
                  value={profileData.bio}
                  onChange={e => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>
              <div style={{ marginBottom: "28px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Timezone</label>
                <input type="text" className="input-field" value={profileData.timezone} style={{ width: "100%", fontSize: "13.5px" }} readOnly />
              </div>
              <button className="btn-primary" onClick={handleSave} style={{ gap: "8px" }}>
                {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Changes</>}
              </button>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === "Notifications" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "24px" }}>Notification Preferences</h2>
              
              {[
                { group: "Email Notifications", icon: <Mail size={14} />, items: [
                  { key: "emailAnnouncements", label: "Announcements", desc: "School-wide notices and circulars" },
                  { key: "emailAssignments", label: "Assignments", desc: "Due dates and submission reminders" },
                  { key: "emailExams", label: "Exam Schedules", desc: "Timetables, hall tickets, and results" },
                ]},
                { group: "Push Notifications", icon: <Smartphone size={14} />, items: [
                  { key: "pushAnnouncements", label: "Announcements", desc: "Instant push for urgent notices" },
                  { key: "pushAssignments", label: "Assignments", desc: "Reminders before deadlines" },
                  { key: "pushAttendance", label: "Attendance Alerts", desc: "When marked absent or late" },
                  { key: "pushMessages", label: "Messages", desc: "New chat messages from teachers" },
                  { key: "pushEvents", label: "Events", desc: "Upcoming events and activities" },
                ]},
                { group: "SMS Alerts", icon: <Phone size={14} />, items: [
                  { key: "smsAlerts", label: "Critical Alerts Only", desc: "Attendance and emergency notices via SMS" },
                ]},
              ].map(group => (
                <div key={group.group} style={{ marginBottom: "28px" }}>
                  <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                    {group.icon} {group.group}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {group.items.map((item, i) => (
                      <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < group.items.length - 1 ? "1px solid var(--border)" : "none" }}>
                        <div>
                          <div style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "2px" }}>{item.label}</div>
                          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.desc}</div>
                        </div>
                        <Toggle checked={notifications[item.key as keyof typeof notifications]} onChange={() => toggleNotif(item.key as keyof typeof notifications)} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="btn-primary" onClick={handleSave} style={{ gap: "8px" }}>
                {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save Preferences</>}
              </button>
            </div>
          )}

          {/* Appearance Section */}
          {activeSection === "Appearance" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "24px" }}>Appearance</h2>
              
              <div style={{ marginBottom: "28px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Theme</div>
                <div style={{ display: "flex", gap: "12px" }}>
                  {[
                    { value: "dark", label: "Dark", icon: <Moon size={18} /> },
                    { value: "light", label: "Light", icon: <Sun size={18} /> },
                    { value: "system", label: "System", icon: <Monitor size={18} /> },
                  ].map(t => (
                    <button
                      key={t.value}
                      onClick={() => setAppearance(prev => ({ ...prev, theme: t.value }))}
                      style={{
                        flex: 1, padding: "16px", borderRadius: "12px", cursor: "pointer",
                        border: `2px solid ${appearance.theme === t.value ? "var(--violet)" : "var(--border)"}`,
                        background: appearance.theme === t.value ? "var(--violet)15" : "var(--bg-secondary)",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                        color: appearance.theme === t.value ? "var(--violet)" : "var(--text-muted)",
                        transition: "all 0.2s",
                      }}
                    >
                      {t.icon}
                      <span style={{ fontSize: "13px", fontWeight: "600" }}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "28px" }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Font Size</div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {["small", "medium", "large"].map(size => (
                    <button key={size} onClick={() => setAppearance(prev => ({ ...prev, fontSize: size }))}
                      style={{ flex: 1, padding: "10px 16px", borderRadius: "10px", cursor: "pointer", transition: "all 0.2s",
                        border: `1px solid ${appearance.fontSize === size ? "var(--violet)" : "var(--border)"}`,
                        background: appearance.fontSize === size ? "var(--violet)15" : "var(--bg-secondary)",
                        color: appearance.fontSize === size ? "var(--violet)" : "var(--text-muted)",
                        fontSize: size === "small" ? "12px" : size === "large" ? "15px" : "13px", fontWeight: "600",
                        textTransform: "capitalize"
                      }}>{size}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "28px" }}>
                {[
                  { key: "compactMode", label: "Compact Mode", desc: "Reduce spacing and padding across the UI" },
                  { key: "animationsEnabled", label: "Enable Animations", desc: "Smooth transitions and micro-interactions" },
                ].map((opt, i) => (
                  <div key={opt.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i === 0 ? "1px solid var(--border)" : "none" }}>
                    <div>
                      <div style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "2px" }}>{opt.label}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{opt.desc}</div>
                    </div>
                    <Toggle checked={appearance[opt.key as keyof typeof appearance] as boolean} onChange={() => setAppearance(prev => ({ ...prev, [opt.key]: !prev[opt.key as keyof typeof appearance] }))} />
                  </div>
                ))}
              </div>
              <button className="btn-primary" onClick={handleSave} style={{ gap: "8px" }}>
                {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Apply Changes</>}
              </button>
            </div>
          )}

          {/* Privacy & Security Section */}
          {activeSection === "Privacy & Security" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "24px" }}>Privacy & Security</h2>
              
              {/* Password Change */}
              <div style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}><Key size={14} /> Change Password</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { label: "Current Password", show: showCurrentPassword, toggle: () => setShowCurrentPassword(!showCurrentPassword) },
                    { label: "New Password", show: showNewPassword, toggle: () => setShowNewPassword(!showNewPassword) },
                  ].map(field => (
                    <div key={field.label} style={{ position: "relative" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "6px" }}>{field.label}</label>
                      <div style={{ position: "relative" }}>
                        <input type={field.show ? "text" : "password"} className="input-field" placeholder="••••••••" style={{ width: "100%", paddingRight: "40px", fontSize: "13.5px" }} />
                        <button onClick={field.toggle} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                          {field.show ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="btn-secondary" style={{ width: "fit-content", fontSize: "13px" }}>Update Password</button>
                </div>
              </div>

              {/* Privacy Toggles */}
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "13.5px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}><Shield size={14} /> Privacy Settings</div>
                {[
                  { key: "profileVisible", label: "Profile Visibility", desc: "Allow others to view your profile information" },
                  { key: "activityStatus", label: "Activity Status", desc: "Show when you were last active" },
                  { key: "twoFactor", label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account" },
                  { key: "loginAlerts", label: "Login Alerts", desc: "Get notified when a new device logs into your account" },
                  { key: "dataSharing", label: "Analytics Data Sharing", desc: "Help improve CampusOS by sharing usage data" },
                ].map((opt, i) => (
                  <div key={opt.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}>
                    <div>
                      <div style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "2px", display: "flex", alignItems: "center", gap: "6px" }}>
                        {opt.label}
                        {opt.key === "twoFactor" && <span style={{ fontSize: "10px", padding: "1px 6px", borderRadius: "99px", background: "#D9F9DF20", color: "#2d8c45", fontWeight: "700" }}>RECOMMENDED</span>}
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{opt.desc}</div>
                    </div>
                    <Toggle checked={privacy[opt.key as keyof typeof privacy]} onChange={() => togglePrivacy(opt.key as keyof typeof privacy)} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Account Section */}
          {activeSection === "Account" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "24px" }}>Account Management</h2>
              
              <div style={{ padding: "16px 20px", borderRadius: "12px", background: "var(--bg-secondary)", border: "1px solid var(--border)", marginBottom: "20px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-muted)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>Current Plan</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "800", color: "var(--text-primary)" }}>CampusOS Pro</div>
                    <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>Institution-wide license · Renewal: Apr 2026</div>
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: "700", padding: "4px 14px", borderRadius: "99px", background: "#D9F9DF20", color: "#2d8c45" }}>Active</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
                {[
                  { icon: <Globe size={15} />, label: "Data Export", desc: "Download all your personal data", action: "Export" },
                  { icon: <Key size={15} />, label: "API Access", desc: "Manage personal API tokens and integrations", action: "Manage" },
                  { icon: <LogOut size={15} />, label: "Active Sessions", desc: "View and revoke all active sessions", action: "View" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", borderRadius: "12px", background: "var(--bg-secondary)", border: "1px solid var(--border)" }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)", marginBottom: "2px" }}>{item.label}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.desc}</div>
                    </div>
                    <button className="btn-ghost" style={{ fontSize: "12px", padding: "6px 14px" }}>{item.action}</button>
                  </div>
                ))}
              </div>

              {/* Danger Zone */}
              <div style={{ padding: "20px", borderRadius: "12px", border: "1px solid #D6404040", background: "#D6404008" }}>
                <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#D64040", marginBottom: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <AlertTriangle size={14} /> Danger Zone
                </div>
                <div style={{ fontSize: "12.5px", color: "var(--text-muted)", marginBottom: "14px" }}>
                  Permanently delete your account and all associated data. This action cannot be undone.
                </div>
                <button style={{ padding: "8px 18px", borderRadius: "8px", background: "#D640400", border: "1px solid #D64040", color: "#D64040", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseOver={e => { e.currentTarget.style.background = "#D64040"; e.currentTarget.style.color = "#fff"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#D64040"; }}>
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
