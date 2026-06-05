"use client";
import { BookOpen, Plus, Search, Download, Clock, CheckCircle2, AlertTriangle, Library } from "lucide-react";
const BOOKS = [
  { title: "Physics Vol. 1", author: "H.C. Verma", isbn: "978-8177091359", copies: 12, available: 4, borrowed: 8, category: "Science" },
  { title: "Introduction to Algorithms", author: "Thomas Cormen", isbn: "978-0262033848", copies: 5, available: 2, borrowed: 3, category: "Computer Science" },
  { title: "Wings of Fire", author: "A.P.J. Abdul Kalam", isbn: "978-8173711466", copies: 8, available: 6, borrowed: 2, category: "Biography" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0743273565", copies: 6, available: 3, borrowed: 3, category: "Literature" },
  { title: "Mathematics for Class XII", author: "R.D. Sharma", isbn: "978-8180301148", copies: 20, available: 7, borrowed: 13, category: "Mathematics" },
];
const BORROWS = [
  { student: "Anjali Singh", book: "Physics Vol. 1", due: "2026-06-10", status: "on-time", days: 5 },
  { student: "Rahul Gupta", book: "Introduction to Algorithms", due: "2026-06-03", status: "overdue", days: -2 },
  { student: "Meera Nair", book: "Wings of Fire", due: "2026-06-15", status: "on-time", days: 10 },
  { student: "Vikram Shah", book: "The Great Gatsby", due: "2026-06-01", status: "overdue", days: -4 },
];
export default function LibraryPage() {
  return (
    <div className="page-content">
      <div style={{ marginBottom: "24px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Library Management</h1>
          <p style={{ fontSize: "13.5px", color: "var(--text-muted)", marginTop: "4px" }}>Book catalog, borrowing, returns & fine management</p>
        </div>
        <button className="btn-primary" style={{ gap: "6px", fontSize: "13px" }}><Plus size={14} /> Add Book</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
        {[
          { label: "Total Books", value: "2,481", icon: BookOpen, color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
          { label: "Available", value: "1,847", icon: CheckCircle2, color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
          { label: "Borrowed", value: "634", icon: Clock, color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
          { label: "Overdue", value: "24", icon: AlertTriangle, color: "#ffd060", bg: "rgba(255,208,96,0.1)" },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 20px" }}>
            <div className="module-icon" style={{ background: s.bg }}><s.icon size={18} color={s.color} /></div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: "800", color: "var(--text-primary)" }}>{s.value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "20px" }}>
        <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", gap: "12px" }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={14} style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input className="input-field" placeholder="Search books..." style={{ paddingLeft: "34px", fontSize: "13px" }} />
            </div>
          </div>
          <table className="data-table">
            <thead><tr><th>Title</th><th>Author</th><th>Category</th><th>Copies</th><th>Available</th></tr></thead>
            <tbody>
              {BOOKS.map((b, i) => (
                <tr key={i}>
                  <td><span style={{ fontWeight: "600", color: "var(--text-primary)" }}>{b.title}</span></td>
                  <td>{b.author}</td>
                  <td><span className="badge badge-violet">{b.category}</span></td>
                  <td>{b.copies}</td>
                  <td><span className={`badge ${b.available > 0 ? "badge-mint" : "badge-red"}`}>{b.available}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="section-title" style={{ marginBottom: "12px" }}>Active Borrows</div>
          <div className="stat-card" style={{ padding: 0, overflow: "hidden" }}>
            {BORROWS.map((b, i) => (
              <div key={i} style={{ padding: "14px 16px", borderBottom: i < BORROWS.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>{b.student}</span>
                  <span className={`badge ${b.status === "on-time" ? "badge-mint" : "badge-red"}`}>
                    {b.status === "overdue" ? `${Math.abs(b.days)}d overdue` : `Due in ${b.days}d`}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>📚 {b.book}</div>
                <div style={{ fontSize: "11.5px", color: "var(--text-muted)", marginTop: "3px" }}>Due: {b.due}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
