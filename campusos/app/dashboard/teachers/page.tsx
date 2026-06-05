'use client';

import { GraduationCap, Users, Star, BookOpen, Clock } from 'lucide-react';

const teachers = [
  { name: 'Dr. Priya Sharma', subject: 'Mathematics', classes: 'Grade 9–12', status: 'Active', rating: '4.9' },
  { name: 'Mr. Arjun Mehta', subject: 'Physics', classes: 'Grade 10–12', status: 'Active', rating: '4.7' },
  { name: 'Ms. Kavitha Rao', subject: 'English Literature', classes: 'Grade 6–10', status: 'Active', rating: '4.8' },
  { name: 'Mr. Rajan Pillai', subject: 'History', classes: 'Grade 7–9', status: 'On Leave', rating: '4.5' },
  { name: 'Dr. Neha Gupta', subject: 'Chemistry', classes: 'Grade 11–12', status: 'Active', rating: '4.6' },
];

export default function TeachersPage() {
  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div className="module-icon" style={{ background: 'linear-gradient(135deg, #B5BAFF, #9FA1FF)' }}>
            <GraduationCap size={24} color="#fff" />
          </div>
          <div>
            <h1 className="section-title gradient-text" style={{ margin: 0 }}>Teachers</h1>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
              Manage faculty profiles, assignments, and performance
            </p>
          </div>
          <span className="badge badge-violet" style={{ marginLeft: 'auto' }}>Coming Soon</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Users size={20} color="#B5BAFF" />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Teachers</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#B5BAFF' }}>148</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>+3 this semester</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Star size={20} color="#AEE2FF" />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Avg. Rating</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#AEE2FF' }}>4.7</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Out of 5.0</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <BookOpen size={20} color="#D9F9DF" />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Subjects Covered</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#D9F9DF' }}>34</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Across all grades</div>
        </div>
        <div className="stat-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Clock size={20} color="#9FA1FF" />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>On Leave</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#9FA1FF' }}>6</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Currently absent</div>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="stat-card" style={{ marginBottom: '2rem', textAlign: 'center', padding: '2rem', background: 'linear-gradient(135deg, rgba(181,186,255,0.08), rgba(159,161,255,0.04))' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(90deg, #B5BAFF, #9FA1FF)', borderRadius: '999px', padding: '0.4rem 1.2rem', marginBottom: '1rem' }}>
          <span style={{ color: '#0a0b0f', fontWeight: 700, fontSize: '0.85rem' }}>🚀 Full module coming soon</span>
        </div>
        <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
          Teacher profiles, payroll integration, leave management, and performance analytics will be available in the next release.
        </p>
      </div>

      {/* Sample Table */}
      <div className="stat-card">
        <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>Faculty Overview</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Name', 'Subject', 'Classes', 'Rating', 'Status'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{t.name}</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{t.subject}</td>
                  <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>{t.classes}</td>
                  <td style={{ padding: '0.85rem 1rem' }}><span style={{ color: '#AEE2FF', fontWeight: 600 }}>⭐ {t.rating}</span></td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ background: t.status === 'Active' ? 'rgba(217,249,223,0.15)' : 'rgba(255,180,100,0.15)', color: t.status === 'Active' ? '#D9F9DF' : '#FFB464', borderRadius: '999px', padding: '0.2rem 0.75rem', fontSize: '0.8rem', fontWeight: 600 }}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
