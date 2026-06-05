"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  HeartPulse, Activity, AlertCircle, FileText, PhoneCall,
  User, Calendar, Clock, Download, Plus, Search, Thermometer
} from "lucide-react";

// Mock Data
const HEALTH_PROFILE = {
  bloodGroup: "O+",
  height: "172 cm",
  weight: "65 kg",
  bmi: "22.0 (Normal)",
  lastCheckup: "Oct 15, 2026"
};

const ALLERGIES = [
  { name: "Peanuts", severity: "High", reaction: "Anaphylaxis" },
  { name: "Dust", severity: "Low", reaction: "Sneezing, Runny Nose" }
];

const CLINIC_VISITS = [
  { id: 1, date: "Sep 12, 2026", time: "11:30 AM", reason: "Fever & Headache", doctor: "Dr. Ananya Sharma", prescription: "Paracetamol 500mg, Rest for 1 day", temp: "101.2°F", bp: "110/70" },
  { id: 2, date: "Jul 05, 2026", time: "09:15 AM", reason: "Minor Sports Injury (Ankle)", doctor: "Dr. Ananya Sharma", prescription: "Ice pack application, Pain relief spray", temp: "98.6°F", bp: "115/75" },
  { id: 3, date: "Mar 20, 2026", time: "02:40 PM", reason: "Routine Health Checkup", doctor: "Dr. Rajesh Kumar", prescription: "Vitamin Supplements", temp: "98.4°F", bp: "120/80" },
];

export default function MedicalDashboard() {
  const { user } = useAuth();
  const isStaff = user?.role === "Teacher" || user?.role === "Institution Admin" || user?.role === "Super Admin";

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Medical & Health
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            {isStaff ? "Manage student health records, emergencies, and clinic visits" : "View your health profile, clinic visits, and medical records"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {isStaff ? (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px", background: "linear-gradient(135deg, #ff8080 0%, #ff5050 100%)", color: "#fff" }}>
              <AlertCircle size={14} /> Report Emergency
            </button>
          ) : (
            <button className="btn-secondary" style={{ gap: "6px", fontSize: "13px" }}><Download size={14} /> Download Records</button>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
        
        {/* Left Column: Health Profile & Allergies */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Health Profile Card */}
          <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
            <div style={{ padding: "20px", background: "var(--grad-primary)", position: "relative" }}>
              <div style={{ position: "absolute", right: "20px", top: "20px", opacity: 0.2 }}>
                <HeartPulse size={80} color="#0a0b0f" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", position: "relative", zIndex: 1 }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "12px", background: "rgba(10,11,15,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <User size={24} color="#0a0b0f" />
                </div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: "800", color: "#0a0b0f" }}>{user?.name}</div>
                  <div style={{ fontSize: "12px", color: "rgba(10,11,15,0.7)", fontWeight: "500" }}>Student Health ID: SHD-88219</div>
                </div>
              </div>
            </div>
            
            <div style={{ padding: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Blood Group</div>
                  <div style={{ fontSize: "16px", fontWeight: "700", color: "#c94040", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Activity size={14} /> {HEALTH_PROFILE.bloodGroup}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Last Checkup</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{HEALTH_PROFILE.lastCheckup}</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Height</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{HEALTH_PROFILE.height}</div>
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px" }}>Weight</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>{HEALTH_PROFILE.weight}</div>
                </div>
              </div>
              
              <div style={{ padding: "12px", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Calculated BMI</span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#2d8c45" }}>{HEALTH_PROFILE.bmi}</span>
              </div>
            </div>
          </div>

          {/* Allergies & Alerts */}
          <div className="stat-card" style={{ padding: "20px" }}>
            <div className="section-header">
              <div className="section-title">Allergies & Medical Alerts</div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {ALLERGIES.map((allergy, i) => (
                <div key={i} style={{ padding: "12px", borderRadius: "8px", border: `1px solid ${allergy.severity === "High" ? "rgba(255,128,128,0.3)" : "var(--border)"}`, background: allergy.severity === "High" ? "rgba(255,128,128,0.05)" : "var(--bg-secondary)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <div style={{ fontSize: "13.5px", fontWeight: "600", color: allergy.severity === "High" ? "#c94040" : "var(--text-primary)" }}>
                      {allergy.name}
                    </div>
                    <span className={`badge ${allergy.severity === "High" ? "badge-red" : "badge-yellow"}`}>{allergy.severity} Risk</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    <span style={{ fontWeight: "500" }}>Reaction:</span> {allergy.reaction}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="stat-card" style={{ padding: "20px" }}>
            <div className="section-title" style={{ marginBottom: "12px" }}>Emergency Contact</div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "rgba(159,161,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <PhoneCall size={18} color="var(--violet)" />
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>Rajesh Singh (Father)</div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>+91 98765 43210</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Clinic Visits */}
        <div className="stat-card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)" }}>
            <div>
              <div className="section-title">Clinic Visit History</div>
              <div className="section-subtitle">Record of all campus medical center visits</div>
            </div>
            {isStaff && <button className="btn-secondary" style={{ padding: "6px 12px", fontSize: "12px" }}><Plus size={14} style={{ marginRight: "4px" }}/> New Entry</button>}
          </div>

          <div style={{ padding: "0" }}>
            {CLINIC_VISITS.map((visit, idx) => (
              <div key={visit.id} style={{ padding: "20px", borderBottom: idx !== CLINIC_VISITS.length - 1 ? "1px solid var(--border)" : "none", display: "flex", gap: "20px" }}>
                
                {/* Date Left Col */}
                <div style={{ width: "80px", flexShrink: 0, textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>{visit.date.split(",")[0]}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>{visit.date.split(",")[1]}</div>
                  <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}><Clock size={10} /> {visit.time}</div>
                </div>

                <div style={{ width: "1px", background: "var(--border)" }}></div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "6px" }}>
                    {visit.reason}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
                    <User size={12} /> {visit.doctor}
                  </div>
                  
                  <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)", background: "var(--bg-secondary)", padding: "4px 8px", borderRadius: "6px", border: "1px solid var(--border)" }}>
                      <Thermometer size={12} color="#ff8080" /> Temp: {visit.temp}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)", background: "var(--bg-secondary)", padding: "4px 8px", borderRadius: "6px", border: "1px solid var(--border)" }}>
                      <Activity size={12} color="#AEE2FF" /> BP: {visit.bp}
                    </div>
                  </div>

                  <div style={{ padding: "12px", background: "rgba(159,161,255,0.05)", borderRadius: "8px", border: "1px solid rgba(159,161,255,0.1)" }}>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "var(--violet)", marginBottom: "4px" }}>PRESCRIPTION / NOTES</div>
                    <div style={{ fontSize: "13px", color: "var(--text-primary)", lineHeight: "1.5" }}>
                      {visit.prescription}
                    </div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
