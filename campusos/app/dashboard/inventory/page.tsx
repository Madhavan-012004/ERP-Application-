"use client";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Package, Box, Plus, Search, Filter, AlertTriangle, CheckCircle2,
  TrendingDown, TrendingUp, Monitor, Beaker, CircleDot, Printer
} from "lucide-react";

// Mock Data
const INVENTORY_ITEMS = [
  { id: "INV-1001", name: "Dell OptiPlex 3090", category: "Electronics", location: "Computer Lab 1", stock: 45, minStock: 5, status: "In Stock", icon: Monitor, color: "#9FA1FF" },
  { id: "INV-1002", name: "Microscopes (Compound)", category: "Lab Equipment", location: "Biology Lab", stock: 12, minStock: 15, status: "Low Stock", icon: Beaker, color: "#ff8080" },
  { id: "INV-1003", name: "Basketballs (Spalding)", category: "Sports", location: "Gymnasium", stock: 24, minStock: 10, status: "In Stock", icon: CircleDot, color: "#ffd060" },
  { id: "INV-1004", name: "A4 Paper Reams", category: "Stationery", location: "Main Store", stock: 2, minStock: 20, status: "Out of Stock", icon: Printer, color: "#c94040" },
  { id: "INV-1005", name: "Arduino Uno Kits", category: "Electronics", location: "Robotics Lab", stock: 30, minStock: 10, status: "In Stock", icon: Monitor, color: "#AEE2FF" },
];

export default function InventoryDashboard() {
  const { user } = useAuth();
  const isStaff = user?.role === "Teacher" || user?.role === "Institution Admin" || user?.role === "Super Admin";

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Inventory Management
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>
            {isStaff ? "Track campus assets, manage supplies, and monitor stock levels" : "Request equipment and view checked-out assets"}
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} style={{ position: "absolute", left: "10px", color: "var(--text-muted)" }} />
            <input type="text" className="input-field" placeholder="Search inventory..." style={{ paddingLeft: "32px", width: "200px", fontSize: "13px" }} />
          </div>
          {isStaff ? (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><Plus size={14} /> Add Item</button>
          ) : (
            <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><Package size={14} /> Request Item</button>
          )}
        </div>
      </div>

      {isStaff && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {[
            { label: "Total Assets", value: "1,245", icon: Box, color: "#B5BAFF", bg: "rgba(181,186,255,0.1)" },
            { label: "Low Stock Items", value: "12", icon: TrendingDown, color: "#ffd060", bg: "rgba(255,208,96,0.1)" },
            { label: "Out of Stock", value: "3", icon: AlertTriangle, color: "#ff8080", bg: "rgba(255,128,128,0.1)" },
            { label: "Recent Restocks", value: "28", icon: TrendingUp, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
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
      )}

      <div className="stat-card" style={{ padding: "0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg-secondary)" }}>
          <div className="section-title" style={{ fontSize: "14px" }}>Asset Directory</div>
          <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: "12px", background: "var(--bg-card)", border: "1px solid var(--border)" }}><Filter size={14} style={{ marginRight: 6 }} /> Categories</button>
        </div>
        
        <table className="data-table">
          <thead>
            <tr>
              <th>Item ID</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Stock Level</th>
              <th>Status</th>
              {isStaff && <th style={{ textAlign: "right" }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {INVENTORY_ITEMS.map((item, i) => (
              <tr key={i}>
                <td style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600" }}>{item.id}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: `${item.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <item.icon size={16} color={item.color} />
                    </div>
                    <span style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--text-primary)" }}>{item.name}</span>
                  </div>
                </td>
                <td>{item.category}</td>
                <td>{item.location}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-primary)" }}>{item.stock}</span>
                    <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>/ min {item.minStock}</span>
                  </div>
                </td>
                <td>
                  {item.status === "In Stock" && <span className="badge badge-mint"><CheckCircle2 size={10} style={{ marginRight: "4px" }}/> {item.status}</span>}
                  {item.status === "Low Stock" && <span className="badge badge-yellow"><AlertTriangle size={10} style={{ marginRight: "4px" }}/> {item.status}</span>}
                  {item.status === "Out of Stock" && <span className="badge badge-red"><AlertTriangle size={10} style={{ marginRight: "4px" }}/> {item.status}</span>}
                </td>
                {isStaff && (
                  <td style={{ textAlign: "right" }}>
                    <button className="btn-secondary" style={{ padding: "4px 10px", fontSize: "11px" }}>Update</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
