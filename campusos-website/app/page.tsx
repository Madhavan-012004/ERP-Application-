"use client";
import { useState } from "react";

/* ─── DATA ─── */
const ROLES = [
  {
    key: "saas",
    label: "SaaS Owner",
    emoji: "👑",
    color: "#FFD060",
    bg: "rgba(255,208,96,0.1)",
    description: "Full platform control across all institutions",
    features: [
      { icon: "🏫", title: "Multi-Tenant Management", desc: "Provision and manage unlimited institutions from one control panel. Full isolation between tenants." },
      { icon: "📊", title: "Global Analytics", desc: "Platform-wide usage metrics, revenue tracking, and institution health dashboards." },
      { icon: "🔑", title: "Credential Management", desc: "Generate unique institution Admin IDs and secure passwords with one click." },
      { icon: "⚡", title: "Instant Activation", desc: "Activate, suspend, or deactivate institution accounts in real time." },
      { icon: "💼", title: "Plan Management", desc: "Assign Starter, Pro, or Enterprise plans to each institution with capacity controls." },
      { icon: "🛡️", title: "Security Override", desc: "Full audit logs and administrative override capabilities across all tenants." },
    ]
  },
  {
    key: "admin",
    label: "Institution Admin",
    emoji: "🏫",
    color: "#9FA1FF",
    bg: "rgba(159,161,255,0.1)",
    description: "Complete control over your school's operations",
    features: [
      { icon: "👥", title: "User Provisioning", desc: "Create accounts for teachers, students, and parents with auto-generated, unique login IDs." },
      { icon: "💰", title: "Fee Management", desc: "Set up fee structures, track payments, generate invoices, and manage defaulters." },
      { icon: "📅", title: "Timetable Builder", desc: "Drag-and-drop timetable creation with conflict detection across all classes." },
      { icon: "📈", title: "Attendance Overview", desc: "Real-time attendance dashboards across all classes with export capabilities." },
      { icon: "🎓", title: "Academic Structure", desc: "Define classes, divisions, subjects, and assign teachers to batches." },
      { icon: "📢", title: "Announcements", desc: "Broadcast notices to specific roles, classes, or the entire institution instantly." },
    ]
  },
  {
    key: "teacher",
    label: "Teacher",
    emoji: "📚",
    color: "#AEE2FF",
    bg: "rgba(174,226,255,0.1)",
    description: "Streamlined tools for modern educators",
    features: [
      { icon: "✅", title: "One-Click Attendance", desc: "Mark attendance for any class in seconds. Bulk mark and exception handling supported." },
      { icon: "📝", title: "Assignment Manager", desc: "Create, assign, and grade homework digitally. Students get instant notifications." },
      { icon: "📊", title: "Grade Book", desc: "Manage marks, calculate grades, and generate report cards automatically." },
      { icon: "🗓️", title: "My Timetable", desc: "Personal schedule with room assignments, upcoming classes, and substitution alerts." },
      { icon: "💬", title: "Parent Communication", desc: "Message parents directly or broadcast updates to the entire class." },
      { icon: "📋", title: "Exam Management", desc: "Schedule exams, set seating arrangements, and publish results to students." },
    ]
  },
  {
    key: "student",
    label: "Student",
    emoji: "🎓",
    color: "#D9F9DF",
    bg: "rgba(217,249,223,0.1)",
    description: "A personalized academic companion",
    features: [
      { icon: "📅", title: "Personal Timetable", desc: "View daily and weekly class schedules. Never miss a class or exam again." },
      { icon: "📚", title: "Assignment Tracker", desc: "See all pending and submitted assignments with due dates and teacher feedback." },
      { icon: "📊", title: "Grades & Reports", desc: "Access mark sheets, report cards, and GPA tracking across all subjects." },
      { icon: "📢", title: "School Notices", desc: "Receive real-time announcements from teachers and administration." },
      { icon: "💳", title: "Fee Status", desc: "Check fee payment history, download receipts, and view outstanding dues." },
      { icon: "🏆", title: "Achievements", desc: "Track extracurricular activities, club memberships, and co-curricular achievements." },
    ]
  },
  {
    key: "parent",
    label: "Parent",
    emoji: "👨‍👩‍👧",
    color: "#B5BAFF",
    bg: "rgba(181,186,255,0.1)",
    description: "Stay connected with your child's school life",
    features: [
      { icon: "📊", title: "Academic Progress", desc: "View your child's grades, attendance percentage, and teacher remarks in real time." },
      { icon: "💰", title: "Online Fee Payment", desc: "Pay school fees online, download receipts, and track payment history anytime." },
      { icon: "📅", title: "Attendance Reports", desc: "Get notified when your child is absent and view monthly attendance summaries." },
      { icon: "💬", title: "Teacher Messaging", desc: "Directly message your child's class teacher for updates and concerns." },
      { icon: "📢", title: "School Notices", desc: "Receive school announcements, event invites, and holiday notifications instantly." },
      { icon: "🗓️", title: "Event Calendar", desc: "Stay updated on exams, PTMs, school events, and extracurricular activities." },
    ]
  },
];

const BENEFITS = [
  { icon: "🚀", title: "Quick Setup", desc: "Get your entire institution live in under 30 minutes. No complex configuration required.", color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
  { icon: "🔒", title: "Secure & Isolated", desc: "Each institution's data is fully isolated. Role-based access ensures privacy at every level.", color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
  { icon: "📱", title: "Mobile Ready", desc: "Full-featured mobile app for iOS and Android. Students, parents, and teachers stay connected on the go.", color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
  { icon: "🇮🇳", title: "Built for India", desc: "INR billing, Indian academic calendar support, CBSE/State board aligned grading systems.", color: "#FFD060", bg: "rgba(255,208,96,0.1)" },
  { icon: "⚡", title: "Lightning Fast", desc: "Optimized for low-bandwidth environments. Works seamlessly even in rural school networks.", color: "#B5BAFF", bg: "rgba(181,186,255,0.1)" },
  { icon: "🎯", title: "Role-Based UX", desc: "Every role gets a tailored experience — no clutter, no confusion. Just the tools they need.", color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
];

/* ─── COMPONENTS ─── */
function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="nav-logo">
          <div className="nav-logo-icon">🎓</div>
          <span>Campus<span style={{ color: "var(--violet)" }}>OS</span></span>
        </div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#benefits">Why CampusOS</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="nav-cta">
          <a href="https://github.com/Madhavan-012004/ERP-Application-" target="_blank" rel="noopener" className="btn-ghost" style={{ padding: "9px 18px", fontSize: "14px" }}>
            View Demo
          </a>
          <button className="btn-nav">Get Started →</button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="hero-content">
          <div className="hero-announce">
            <span className="hero-announce-dot" />
            Now available across India · SDK 54
          </div>

          <h1 className="hero-headline">
            The Complete<br />
            <span className="gradient-text">School Management</span><br />
            Platform
          </h1>

          <p className="hero-sub">
            CampusOS brings every part of your institution under one intelligent platform — 
            from student admissions to parent communication, all role-based and 
            ready to use from day one.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" style={{ fontSize: "16px", padding: "15px 32px" }}>
              🚀 Start Free Trial
            </button>
            <a href="#pricing" className="btn-ghost" style={{ fontSize: "16px", padding: "15px 32px" }}>
              View Pricing ↓
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num gradient-text">500+</div>
              <div className="hero-stat-label">Institutions Ready</div>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <div className="hero-stat-num gradient-text">5</div>
              <div className="hero-stat-label">Role-Based Dashboards</div>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <div className="hero-stat-num gradient-text">₹15</div>
              <div className="hero-stat-label">Starting Per Student</div>
            </div>
          </div>
        </div>

        {/* Floating mini cards */}
        <div className="hero-cards-strip">
          {[
            { icon: "🎓", title: "Student Portal", sub: "Grades & Timetable", color: "#9FA1FF", bg: "rgba(159,161,255,0.1)" },
            { icon: "👩‍🏫", title: "Teacher Dashboard", sub: "Attendance & Grades", color: "#AEE2FF", bg: "rgba(174,226,255,0.1)" },
            { icon: "🏫", title: "Admin Console", sub: "Full Institution Control", color: "#D9F9DF", bg: "rgba(217,249,223,0.1)" },
            { icon: "👨‍👩‍👧", title: "Parent View", sub: "Real-time Progress", color: "#B5BAFF", bg: "rgba(181,186,255,0.1)" },
            { icon: "💰", title: "Fee Manager", sub: "Collect & Track Payments", color: "#FFD060", bg: "rgba(255,208,96,0.1)" },
          ].map((c, i) => (
            <div className="mini-card" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="mini-card-icon" style={{ background: c.bg }}>
                <span style={{ fontSize: "20px" }}>{c.icon}</span>
              </div>
              <div className="mini-card-text">
                <div className="mini-card-title">{c.title}</div>
                <div className="mini-card-sub">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("admin");
  const role = ROLES.find(r => r.key === activeTab)!;

  return (
    <section className="section features-section" id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-label">✦ Role-Based Features</div>
          <h2 className="section-title">
            Built for everyone<br />
            <span className="gradient-text">in your institution</span>
          </h2>
          <p className="section-sub">
            Every role gets a purpose-built experience — no feature bloat, 
            no confusion. Just the right tools for the right people.
          </p>
        </div>

        <div style={{ overflowX: "auto", marginBottom: "0" }}>
          <div className="features-tabs" style={{ marginBottom: "0" }}>
            {ROLES.map(r => (
              <button
                key={r.key}
                className={`tab-btn ${activeTab === r.key ? "active" : ""}`}
                onClick={() => setActiveTab(r.key)}
                id={`tab-${r.key}`}
              >
                <span>{r.emoji}</span> {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Role description bar */}
        <div style={{
          margin: "16px 0 28px",
          padding: "14px 20px",
          borderRadius: "12px",
          background: role.bg,
          border: `1px solid ${role.color}30`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "14px",
          color: "var(--text-secondary)",
          fontWeight: 500,
        }}>
          <span style={{ fontSize: "22px" }}>{role.emoji}</span>
          <strong style={{ color: role.color }}>{role.label}:</strong>
          {role.description}
        </div>

        <div className="features-grid">
          {role.features.map((f, i) => (
            <div className="feature-card" key={i} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="feature-card-icon" style={{ background: role.bg }}>
                {f.icon}
              </div>
              <div className="feature-card-title">{f.title}</div>
              <div className="feature-card-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  const plans = [
    {
      name: "Starter",
      icon: "🌱",
      badge: { text: "Flexible", color: "var(--mint)", bg: "rgba(217,249,223,0.12)", border: "rgba(217,249,223,0.2)" },
      monthly: { low: 20, high: 20 },
      yearly: { low: 150, high: 150 },
      period: billing === "monthly" ? "per student / month" : "per student / year",
      tagline: "Perfect for small schools and coaching institutes getting started with digital management.",
      features: [
        "Up to 500 students",
        "5 role-based dashboards",
        "Attendance & timetable",
        "Basic fee management",
        "Parent communication",
        "Email support",
      ],
      cta: "Start Free Trial",
      ctaClass: "pricing-cta-secondary",
      featured: false,
    },
    {
      name: "Pro",
      icon: "⚡",
      badge: { text: "Most Popular", color: "var(--violet)", bg: "rgba(159,161,255,0.15)", border: "rgba(159,161,255,0.3)" },
      monthly: { low: 15, high: 20 },
      yearly: { low: 100, high: 150 },
      period: billing === "monthly" ? "per student / month" : "per student / year",
      tagline: "Ideal for growing schools needing complete feature access with flexible monthly or annual billing.",
      features: [
        "Up to 1,000 students",
        "All Starter features",
        "Advanced analytics",
        "Exam & grade management",
        "Library & inventory",
        "Priority support",
      ],
      cta: "Get Started",
      ctaClass: "pricing-cta-primary",
      featured: true,
    },
    {
      name: "Enterprise",
      icon: "🏛️",
      badge: { text: "Custom", color: "var(--gold)", bg: "rgba(255,208,96,0.12)", border: "rgba(255,208,96,0.25)" },
      monthly: null,
      yearly: null,
      period: "custom pricing",
      tagline: "Tailored for large institutions, multi-campus groups, and school chains needing dedicated infrastructure.",
      features: [
        "Unlimited students",
        "Multi-campus support",
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
        "On-premise option",
      ],
      cta: "Contact Sales",
      ctaClass: "pricing-cta-secondary",
      featured: false,
    }
  ];

  function formatRange(low: number, high: number) {
    if (low === high) return `₹${low}`;
    return `₹${low} – ₹${high}`;
  }

  return (
    <section className="section" id="pricing" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: "center" }}>
          <div className="section-label" style={{ margin: "0 auto 18px" }}>✦ Pricing</div>
          <h2 className="section-title">
            Simple, transparent<br />
            <span className="gradient-text">pricing for every school</span>
          </h2>
          <p className="section-sub" style={{ margin: "0 auto 36px" }}>
            Start with as low as ₹15 per student per month. No hidden fees, 
            no lock-in. Scale up as your institution grows.
          </p>

          {/* Billing toggle */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", padding: "5px", marginBottom: "0" }}>
            <button
              id="billing-monthly"
              onClick={() => setBilling("monthly")}
              style={{
                padding: "8px 22px",
                borderRadius: "var(--radius-pill)",
                fontSize: "14px",
                fontWeight: 600,
                background: billing === "monthly" ? "rgba(159,161,255,0.2)" : "transparent",
                color: billing === "monthly" ? "var(--violet)" : "var(--text-muted)",
                border: billing === "monthly" ? "1px solid rgba(159,161,255,0.3)" : "1px solid transparent",
                transition: "all 0.2s",
              }}
            >
              Monthly
            </button>
            <button
              id="billing-yearly"
              onClick={() => setBilling("yearly")}
              style={{
                padding: "8px 22px",
                borderRadius: "var(--radius-pill)",
                fontSize: "14px",
                fontWeight: 600,
                background: billing === "yearly" ? "rgba(159,161,255,0.2)" : "transparent",
                color: billing === "yearly" ? "var(--violet)" : "var(--text-muted)",
                border: billing === "yearly" ? "1px solid rgba(159,161,255,0.3)" : "1px solid transparent",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "7px",
              }}
            >
              Yearly
              <span style={{ fontSize: "10px", fontWeight: 800, background: "rgba(217,249,223,0.2)", color: "var(--mint)", border: "1px solid rgba(217,249,223,0.3)", padding: "2px 7px", borderRadius: "99px" }}>SAVE</span>
            </button>
          </div>
        </div>

        <div className="pricing-grid" style={{ marginTop: "48px" }}>
          {plans.map((plan, i) => (
            <div className={`pricing-card ${plan.featured ? "featured" : ""}`} key={i}>
              <div className="pricing-icon">{plan.icon}</div>

              <div className="pricing-badge" style={{ background: plan.badge.bg, color: plan.badge.color, border: `1px solid ${plan.badge.border}` }}>
                {plan.badge.text}
              </div>

              <div className="pricing-name">{plan.name}</div>

              {plan.monthly && plan.yearly ? (
                <div className="pricing-range">
                  {billing === "monthly"
                    ? formatRange(plan.monthly.low, plan.monthly.high)
                    : formatRange(plan.yearly.low, plan.yearly.high)
                  }
                </div>
              ) : (
                <div className="pricing-range" style={{ fontSize: "32px" }}>Custom</div>
              )}

              <div className="pricing-period">{plan.period}</div>
              <div className="pricing-tagline">{plan.tagline}</div>

              <ul className="pricing-features">
                {plan.features.map((f, fi) => (
                  <li key={fi}>{f}</li>
                ))}
              </ul>

              <button className={`pricing-cta ${plan.ctaClass}`} id={`plan-${plan.name.toLowerCase()}-cta`}>
                {plan.cta} {plan.ctaClass.includes("primary") ? "→" : ""}
              </button>
            </div>
          ))}
        </div>

        {/* Note */}
        <p style={{ textAlign: "center", fontSize: "13.5px", color: "var(--text-muted)", marginTop: "32px" }}>
          💡 Prices are per-student and scale with your enrolment. No setup fee. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="section" id="benefits">
      <div className="container">
        <div className="section-header">
          <div className="section-label">✦ Why CampusOS</div>
          <h2 className="section-title">
            Everything you need,<br />
            <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="section-sub">
            Designed from the ground up for Indian educational institutions,
            CampusOS gets out of the way and lets you focus on what matters — education.
          </p>
        </div>

        <div className="benefits-grid">
          {BENEFITS.map((b, i) => (
            <div className="benefit-card" key={i}>
              <div className="benefit-icon" style={{ background: b.bg, fontSize: "26px" }}>
                {b.icon}
              </div>
              <div>
                <div className="benefit-title">{b.title}</div>
                <div className="benefit-desc">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-sm" id="contact">
      <div className="container">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <div className="section-label" style={{ margin: "0 auto 20px" }}>✦ Get Started Today</div>
            <h2>
              Ready to transform your<br />
              <span className="gradient-text">institution?</span>
            </h2>
            <p>
              Join hundreds of schools already using CampusOS. 
              Set up your institution in under 30 minutes — no credit card required.
            </p>
            <div className="cta-banner-actions">
              <button className="btn-primary" style={{ fontSize: "16px", padding: "15px 36px" }} id="hero-start-trial">
                🚀 Start Free Trial
              </button>
              <button className="btn-ghost" style={{ fontSize: "16px", padding: "15px 36px" }} id="hero-contact-sales">
                📞 Contact Sales
              </button>
            </div>

            {/* Contact info */}
            <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
              {[
                { label: "📧 Email", value: "hello@campusos.io" },
                { label: "📞 Phone", value: "+91 98765 43210" },
                { label: "🕐 Support Hours", value: "Mon–Sat, 9AM–6PM IST" },
              ].map((c, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>{c.label}</div>
                  <div style={{ fontSize: "14.5px", color: "var(--text-secondary)", fontWeight: 600 }}>{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="nav-logo" style={{ marginBottom: "14px" }}>
              <div className="nav-logo-icon">🎓</div>
              <span>Campus<span style={{ color: "var(--violet)" }}>OS</span></span>
            </div>
            <p className="footer-brand-desc">
              The complete school management platform built for Indian educational institutions. 
              Role-based, secure, and ready from day one.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {["𝕏", "in", "📘"].map((s, i) => (
                <button key={i} style={{ width: 36, height: 36, borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", cursor: "pointer" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Product</div>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Roles</div>
            <ul className="footer-links">
              <li><a href="#features">Institution Admin</a></li>
              <li><a href="#features">Teachers</a></li>
              <li><a href="#features">Students</a></li>
              <li><a href="#features">Parents</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="divider" />

        <div className="footer-bottom" style={{ marginTop: "28px" }}>
          <span>© {new Date().getFullYear()} CampusOS. All rights reserved. Made in India 🇮🇳</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ─── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="divider" style={{ maxWidth: "900px" }} />
        <FeaturesSection />
        <div className="divider" style={{ maxWidth: "900px" }} />
        <PricingSection />
        <div className="divider" style={{ maxWidth: "900px" }} />
        <BenefitsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
