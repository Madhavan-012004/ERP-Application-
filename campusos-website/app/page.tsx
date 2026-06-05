"use client";
import { useState } from "react";

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const ROLES = [
  {
    key: "admin",
    emoji: "🏫",
    label: "Institution Admin",
    color: "#818cf8",
    bg: "rgba(99,102,241,0.12)",
    desc: "Full operational control over every aspect of your institution.",
    features: [
      { icon: "👥", title: "User Provisioning",     desc: "Create Teacher, Student, and Parent accounts with auto-generated unique login IDs and passwords." },
      { icon: "💰", title: "Fee Management",        desc: "Define fee structures, track collections, generate invoices, and manage defaulters in real time." },
      { icon: "📅", title: "Timetable Builder",     desc: "Visual drag-and-drop scheduler with automatic conflict detection across all classes and teachers." },
      { icon: "📈", title: "Attendance Overview",   desc: "Live dashboards showing class-wise attendance with export and compliance reporting." },
      { icon: "🎓", title: "Academic Structure",    desc: "Define classes, sections, subjects, and map teachers to batches with ease." },
      { icon: "📢", title: "Announcements",         desc: "Broadcast targeted notices to specific roles, classes, or the whole institution instantly." },
    ],
  },
  {
    key: "teacher",
    emoji: "📚",
    label: "Teacher",
    color: "#67e8f9",
    bg: "rgba(6,182,212,0.1)",
    desc: "Powerful tools so educators can focus on teaching, not paperwork.",
    features: [
      { icon: "✅", title: "One-Click Attendance",  desc: "Mark attendance for any class in seconds. Supports bulk mark and late-entry exceptions." },
      { icon: "📝", title: "Assignment Manager",    desc: "Create, assign, and grade homework digitally with instant student notifications." },
      { icon: "📊", title: "Grade Book",            desc: "Manage marks, calculate grades, and generate polished report cards automatically." },
      { icon: "🗓️", title: "My Timetable",          desc: "Personal schedule with room info, upcoming classes, and substitution alerts." },
      { icon: "💬", title: "Parent Messaging",      desc: "Send direct messages to parents or broadcast updates to an entire class." },
      { icon: "📋", title: "Exam Management",       desc: "Schedule exams, set seating, and publish results directly to students." },
    ],
  },
  {
    key: "student",
    emoji: "🎓",
    label: "Student",
    color: "#86efac",
    bg: "rgba(34,197,94,0.1)",
    desc: "A personalised academic companion that keeps students on track.",
    features: [
      { icon: "📅", title: "Class Schedule",        desc: "View daily and weekly timetables at a glance. Never miss a class or exam." },
      { icon: "📚", title: "Assignments",           desc: "Track pending and submitted work, view due dates, and receive teacher feedback." },
      { icon: "📊", title: "Grades & Reports",      desc: "Access mark sheets, report cards, and GPA trends across all subjects." },
      { icon: "📢", title: "School Notices",        desc: "Receive real-time announcements from teachers and the administration." },
      { icon: "💳", title: "Fee Status",            desc: "Check fee history, download receipts, and view any outstanding dues." },
      { icon: "🏆", title: "Achievements",          desc: "Track clubs, competitions, extracurriculars, and co-curricular records." },
    ],
  },
  {
    key: "parent",
    emoji: "👨‍👩‍👧",
    label: "Parent",
    color: "#c4b5fd",
    bg: "rgba(139,92,246,0.1)",
    desc: "Stay connected with every detail of your child's school life.",
    features: [
      { icon: "📊", title: "Academic Progress",    desc: "View grades, attendance percentage, and teacher remarks in real time." },
      { icon: "💰", title: "Online Fee Payment",   desc: "Pay fees online, download receipts, and track the complete payment history." },
      { icon: "📅", title: "Attendance Reports",   desc: "Get notified on absences and view detailed monthly attendance summaries." },
      { icon: "💬", title: "Teacher Messaging",    desc: "Directly message your child's class teacher for updates or concerns." },
      { icon: "📢", title: "School Notices",       desc: "Receive announcements, event invites, and holiday alerts instantly." },
      { icon: "🗓️", title: "Event Calendar",       desc: "Stay updated on exams, parent-teacher meetings, and school activities." },
    ],
  },
  {
    key: "saas",
    emoji: "👑",
    label: "SaaS Owner",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.1)",
    desc: "Complete oversight and control of the entire CampusOS platform.",
    features: [
      { icon: "🏫", title: "Multi-Tenant Control", desc: "Provision and manage unlimited institutions from one unified backoffice." },
      { icon: "📊", title: "Global Analytics",     desc: "Platform-wide usage metrics, revenue tracking, and institution health dashboards." },
      { icon: "🔑", title: "Credential Issuance",  desc: "Generate unique institution Admin IDs and secure passwords with one click." },
      { icon: "⚡", title: "Instant Activation",   desc: "Activate, suspend, or deactivate institution accounts in real time." },
      { icon: "💼", title: "Plan Management",      desc: "Assign Starter, Pro, or Enterprise plans with per-institution capacity controls." },
      { icon: "🛡️", title: "Audit & Security",     desc: "Full audit logs and administrative override capabilities across all tenants." },
    ],
  },
];

const WHY = [
  { icon: "⚡", title: "Instant Setup",           desc: "Your entire institution can be live in under 30 minutes. No complex configuration or IT team required.", color: "#818cf8", bg: "rgba(99,102,241,0.1)" },
  { icon: "🔒", title: "Secure & Isolated",       desc: "Every institution's data is fully isolated. Role-based access ensures privacy at every level of the platform.", color: "#67e8f9", bg: "rgba(6,182,212,0.08)" },
  { icon: "📱", title: "Mobile Application",      desc: "Full-featured mobile app for iOS and Android so students, parents, and teachers stay connected on the go.", color: "#86efac", bg: "rgba(34,197,94,0.08)" },
  { icon: "🇮🇳", title: "Built for India",         desc: "INR billing, Indian academic calendar, CBSE / State board grading systems, and regional language support.", color: "#fbbf24", bg: "rgba(251,191,36,0.08)" },
  { icon: "📶", title: "Low-Bandwidth Ready",     desc: "Optimised for slow and intermittent connections. Works reliably even in rural school networks.", color: "#c4b5fd", bg: "rgba(139,92,246,0.08)" },
  { icon: "🎯", title: "Role-Tailored UX",        desc: "Every user type sees only what they need — a distraction-free experience built around their workflow.", color: "#f9a8d4", bg: "rgba(236,72,153,0.08)" },
];

const PLANS = [
  {
    name: "Starter",
    icon: "🌱",
    iconBg: "rgba(34,197,94,0.1)",
    monthly: { price: "₹20",  sub: "per student / month" },
    yearly:  { price: "₹150", sub: "per student / year" },
    tagline: "Ideal for small schools and coaching institutes beginning their digital journey.",
    features: ["Up to 500 students", "5 role-based dashboards", "Attendance & timetable", "Basic fee management", "Parent communication", "Email support"],
    cta: "Get Started",
    ctaStyle: "plan-cta-ghost",
    featured: false,
  },
  {
    name: "Pro",
    icon: "⚡",
    iconBg: "rgba(99,102,241,0.15)",
    monthly: { price: "₹15 – ₹20", sub: "per student / month" },
    yearly:  { price: "₹100 – ₹150", sub: "per student / year" },
    tagline: "Complete platform access for growing schools with flexible billing options.",
    features: ["Up to 1,000 students", "Everything in Starter", "Advanced analytics", "Exam & grade management", "Library & inventory", "Priority support"],
    cta: "Start Free Trial",
    ctaStyle: "plan-cta-primary",
    featured: true,
  },
  {
    name: "Enterprise",
    icon: "🏛️",
    iconBg: "rgba(251,191,36,0.1)",
    monthly: null,
    yearly:  null,
    tagline: "Custom pricing for large institutions, multi-campus groups, and school chains.",
    features: ["Unlimited students", "Multi-campus support", "Custom integrations", "Dedicated account manager", "SLA guarantee", "On-premise option"],
    cta: "Contact Sales",
    ctaStyle: "plan-cta-ghost",
    featured: false,
  },
];

/* ══════════════════════════════════════════════
   COMPONENTS
══════════════════════════════════════════════ */

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">🎓</div>
          <span>Campus<span style={{ color: "var(--primary-light)" }}>OS</span></span>
        </a>

        <ul className="nav-links">
          {[["#features","Features"],["#pricing","Pricing"],["#why","Why CampusOS"],["#contact","Contact"]].map(([href, label]) => (
            <li key={href}><a href={href}>{label}</a></li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="#contact" className="btn btn-outline">Book a Demo</a>
          <a href="#pricing" className="btn btn-primary">Get Started →</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      {/* Background */}
      <div className="hero-mesh">
        <div className="hero-grid" />
        <div className="hero-glow glow-a" />
        <div className="hero-glow glow-b" />
        <div className="hero-glow glow-c" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot">🇮🇳</span>
          Built for Indian educational institutions
        </div>

        <h1 className="headline-1 hero-title">
          The Complete<br />
          <span className="gradient-text">School Management</span><br />
          Platform
        </h1>

        <p className="hero-sub">
          One platform for every role — admin, teacher, student, and parent.
          Manage your institution end-to-end with clarity and confidence.
        </p>

        <div className="hero-actions">
          <a href="#pricing" className="btn btn-primary btn-lg">Start Free Trial →</a>
          <a href="#features" className="btn btn-outline btn-lg">Explore Features</a>
        </div>

        {/* Metrics bar */}
        <div className="hero-metrics">
          {[
            { num: "₹15",   label: "Starting per student" },
            { num: "5",     label: "Role dashboards" },
            { num: "30 min",label: "Setup time" },
            { num: "100%",  label: "Data isolation" },
          ].map((m, i) => (
            <div className="metric-item" key={i}>
              <div className="metric-num gradient-text">{m.num}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogosStrip() {
  const items = [
    { emoji: "🏫", label: "Primary Schools" },
    { emoji: "🎓", label: "Secondary Schools" },
    { emoji: "🏛️", label: "Junior Colleges" },
    { emoji: "📚", label: "Coaching Centres" },
    { emoji: "🌐", label: "Multi-Campus Groups" },
  ];
  return (
    <div className="logos-strip">
      <p>Designed for every type of institution</p>
      <div className="logos-row">
        {items.map((it, i) => (
          <div className="logo-pill" key={i}>
            <span>{it.emoji}</span> {it.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturesSection() {
  const [active, setActive] = useState("admin");
  const role = ROLES.find(r => r.key === active)!;

  return (
    <section className="section" id="features">
      <div className="container">
        <div className="features-header">
          <div className="label">✦ Role-Based Features</div>
          <h2 className="headline-2">
            Built for every person<br />
            <span className="gradient-text">in your institution</span>
          </h2>
          <p className="subtext" style={{ marginTop: 14 }}>
            Every role gets a purpose-built dashboard — the right tools, 
            no clutter, no confusion.
          </p>
        </div>

        {/* Tabs */}
        <div className="role-tabs">
          {ROLES.map(r => (
            <button
              key={r.key}
              id={`role-tab-${r.key}`}
              className={`role-tab ${active === r.key ? "active" : ""}`}
              onClick={() => setActive(r.key)}
            >
              <span>{r.emoji}</span> {r.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="role-panel">
          <div className="role-panel-header">
            <div className="role-avatar" style={{ background: role.bg }}>
              {role.emoji}
            </div>
            <div>
              <div className="role-panel-title" style={{ color: role.color }}>{role.label}</div>
              <div className="role-panel-desc">{role.desc}</div>
            </div>
          </div>

          <div className="features-grid">
            {role.features.map((f, i) => (
              <div className="feat-card" key={i}>
                <div className="feat-icon" style={{ background: role.bg }}>
                  {f.icon}
                </div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 0 }}>
          <div className="label" style={{ margin: "0 auto 20px" }}>✦ Pricing</div>
          <h2 className="headline-2">
            Simple, transparent<br />
            <span className="gradient-text">pricing for every school</span>
          </h2>
          <p className="subtext" style={{ margin: "16px auto 36px", textAlign: "center" }}>
            Start from as low as ₹15 per student per month.
            No hidden fees. No lock-in. Scale at your own pace.
          </p>

          {/* Toggle */}
          <div className="billing-toggle">
            <button
              id="toggle-monthly"
              className={`toggle-btn ${billing === "monthly" ? "on" : ""}`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              id="toggle-yearly"
              className={`toggle-btn ${billing === "yearly" ? "on" : ""}`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
              {billing === "yearly" && <span className="save-chip">Save up to 37%</span>}
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="pricing-grid" style={{ marginTop: 48 }}>
          {PLANS.map((plan, i) => {
            const info = billing === "monthly" ? plan.monthly : plan.yearly;
            return (
              <div className={`price-card ${plan.featured ? "featured" : ""}`} key={i}>
                {plan.featured && <div className="featured-badge">Most Popular</div>}

                <div className="plan-icon" style={{ background: plan.iconBg }}>{plan.icon}</div>
                <div className="plan-name">{plan.name}</div>

                {info ? (
                  <>
                    <div className="plan-price">{info.price}</div>
                    <div className="plan-period">{info.sub}</div>
                  </>
                ) : (
                  <>
                    <div className="plan-price-custom">Custom</div>
                    <div className="plan-period">tailored to your institution</div>
                  </>
                )}

                <div className="plan-tagline">{plan.tagline}</div>

                <ul className="plan-features">
                  {plan.features.map((f, fi) => (
                    <li className="plan-feature" key={fi}>
                      <span className="check-icon">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`plan-cta ${plan.ctaStyle}`}
                  id={`plan-${plan.name.toLowerCase()}-btn`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-3)", marginTop: 28 }}>
          All plans include a 14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="section" id="why">
      <div className="container">
        <div style={{ marginBottom: 52 }}>
          <div className="label">✦ Why CampusOS</div>
          <h2 className="headline-2">
            Everything you need,<br />
            <span className="gradient-text">nothing you don't</span>
          </h2>
          <p className="subtext" style={{ marginTop: 14 }}>
            Designed from the ground up for Indian schools — simple, reliable,
            and genuinely useful for every person in your institution.
          </p>
        </div>

        <div className="why-grid">
          {WHY.map((w, i) => (
            <div className="why-card" key={i}>
              <div className="why-icon" style={{ background: w.bg, fontSize: 24 }}>{w.icon}</div>
              <div className="why-title">{w.title}</div>
              <div className="why-desc">{w.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="cta-wrap">
          <div className="cta-content">
            <div className="label" style={{ margin: "0 auto 20px" }}>✦ Get Started Today</div>
            <h2 className="cta-title">
              Ready to transform<br />
              <span className="gradient-text">your institution?</span>
            </h2>
            <p className="cta-sub">
              Join schools across India already using CampusOS.
              Get up and running in under 30 minutes — free, no card needed.
            </p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg" id="cta-trial-btn">
                🚀 Start Free Trial
              </button>
              <button className="btn btn-outline btn-lg" id="cta-demo-btn">
                📞 Talk to Sales
              </button>
            </div>

            <div className="contact-row">
              {[
                { key: "Email",    val: "hello@campusos.io" },
                { key: "Phone",    val: "+91 98765 43210" },
                { key: "Support",  val: "Mon – Sat, 9 AM – 6 PM IST" },
              ].map((c, i) => (
                <div className="contact-item" key={i}>
                  <div className="contact-key">{c.key}</div>
                  <div className="contact-val">{c.val}</div>
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
            <div className="nav-logo">
              <div className="nav-logo-mark">🎓</div>
              <span>Campus<span style={{ color: "var(--primary-light)" }}>OS</span></span>
            </div>
            <p className="footer-desc">
              The complete school management platform built for Indian 
              educational institutions. Role-based, secure, and ready from day one.
            </p>
          </div>

          {[
            { title: "Product",  links: [["#features","Features"],["#pricing","Pricing"],["#","Changelog"],["#","Roadmap"]] },
            { title: "Roles",    links: [["#features","Institution Admin"],["#features","Teachers"],["#features","Students"],["#features","Parents"]] },
            { title: "Company",  links: [["#","About"],["#contact","Contact"],["#","Privacy Policy"],["#","Terms of Service"]] },
          ].map((col) => (
            <div key={col.title}>
              <div className="footer-heading">{col.title}</div>
              <ul className="footer-list">
                {col.links.map(([href, label]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="hr" />

        <div className="footer-bottom" style={{ marginTop: 28 }}>
          <span>© {new Date().getFullYear()} CampusOS · Made in India 🇮🇳</span>
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

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogosStrip />
        <FeaturesSection />
        <hr className="hr" />
        <PricingSection />
        <hr className="hr" />
        <WhySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
