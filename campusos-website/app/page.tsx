"use client";
import { useState } from "react";

/* ══════════════════════════════════════════════
   PALETTE
   --violet   #9B9EF0
   --lavender #B5BAFF
   --sky      #AEE2FF
   --mint     #D9F9DF
══════════════════════════════════════════════ */

const P = {
  violet:   { c: "#9B9EF0", bg: "rgba(155,158,240,0.1)",  border: "rgba(155,158,240,0.22)" },
  lavender: { c: "#B5BAFF", bg: "rgba(181,186,255,0.1)",  border: "rgba(181,186,255,0.22)" },
  sky:      { c: "#AEE2FF", bg: "rgba(174,226,255,0.1)",  border: "rgba(174,226,255,0.22)" },
  mint:     { c: "#D9F9DF", bg: "rgba(217,249,223,0.1)",  border: "rgba(217,249,223,0.22)" },
  rose:     { c: "#FCA5A5", bg: "rgba(252,165,165,0.1)",  border: "rgba(252,165,165,0.22)" },
  gold:     { c: "#FCD34D", bg: "rgba(252,211,77,0.1)",   border: "rgba(252,211,77,0.22)"  },
};

/* ── DATA ── */
const WHY_POINTS = [
  { icon:"📄", text:"Zero Paper Campus"                },
  { icon:"🔒", text:"No Mobile Number Sharing"          },
  { icon:"💬", text:"Secure Internal Communication"     },
  { icon:"🎓", text:"Complete Academic Management"      },
  { icon:"📊", text:"Real-Time Monitoring & Analytics"  },
  { icon:"🤖", text:"AI-Powered Smart Features"         },
  { icon:"📱", text:"Mobile & Web Access"               },
  { icon:"🏫", text:"One Platform for All Operations"   },
];

const CORE_SERVICES = [
  { ...P.violet,  icon:"🎓", title:"Academic Management",       desc:"Manage attendance, timetables, assignments, exams, report cards, certificates, and performance analytics across your institution.",   points:["Attendance","Timetable","Assignments","Exams","Report Cards","Certificates"] },
  { ...P.sky,     icon:"💬", title:"Communication & Engagement", desc:"Seamless and secure communication between students, parents, teachers, and management — without sharing personal phone numbers.", points:["Secure Messaging","Notifications","Announcements","Events","Activity Mgmt","Emergency Alerts"] },
  { ...P.mint,    icon:"🏛️", title:"Campus Operations",          desc:"Digitally manage admissions, fees, transport, hostel, library, medical services, and all administrative workflows in one place.",  points:["Admissions","Fee Management","Transport","Hostel","Library","Inventory"] },
  { ...P.lavender,icon:"🤖", title:"AI & Digital Transformation",desc:"AI-powered insights, smart automation, academic analytics, and intelligent recommendations to future-proof your institution.",       points:["AI Homework","Question Papers","Analytics","Attendance AI","Smart Reports","Insights"] },
];

const PORTALS = [
  {
    key:"parent", emoji:"👨‍👩‍👧", label:"Parent Portal",   ...P.lavender,
    desc:"Complete real-time visibility into your child's school life — attendance, results, fees, and more.",
    features:[
      { icon:"👶", title:"Multi-Child Support",    desc:"Manage multiple children from a single parent account." },
      { icon:"📅", title:"Attendance Tracking",    desc:"Real-time alerts when your child is absent or late." },
      { icon:"📝", title:"Homework & Assignments", desc:"View all homework and assignment submissions." },
      { icon:"📊", title:"Results & Report Cards", desc:"Access marks and report cards instantly." },
      { icon:"💳", title:"Online Fee Payments",    desc:"Pay fees online and download digital receipts." },
      { icon:"🚌", title:"Bus GPS Tracking",        desc:"Live GPS tracking of the school bus route." },
      { icon:"🏥", title:"Medical Notifications",  desc:"Instant alerts for any medical incidents." },
      { icon:"🎫", title:"Event Registrations",    desc:"Register children for school events and competitions." },
    ],
  },
  {
    key:"student", emoji:"🎓", label:"Student Portal",   ...P.mint,
    desc:"A personalised academic companion that keeps students organised, engaged, and always on track.",
    features:[
      { icon:"🖥️", title:"Personal Dashboard",    desc:"All academic info in one clean, organised view." },
      { icon:"📅", title:"Timetable Access",       desc:"View daily and weekly class schedules." },
      { icon:"📤", title:"Homework Submission",    desc:"Submit assignments digitally with deadline reminders." },
      { icon:"📝", title:"Mock Tests & Exams",     desc:"Attempt online tests and view results with insights." },
      { icon:"📜", title:"Digital Certificates",  desc:"Download achievement and participation certificates." },
      { icon:"📚", title:"Library Access",         desc:"Browse catalogue and manage issued books." },
      { icon:"🏠", title:"Hostel Management",      desc:"Room details, outpass requests, and hostel updates." },
      { icon:"💬", title:"Internal Messaging",     desc:"Communicate securely without sharing phone numbers." },
    ],
  },
  {
    key:"teacher", emoji:"📚", label:"Teacher Portal",   ...P.sky,
    desc:"Powerful tools so educators can focus on teaching, not administrative paperwork.",
    features:[
      { icon:"✅", title:"Attendance Management", desc:"Mark attendance for any class in seconds." },
      { icon:"📝", title:"Homework Creation",      desc:"Create and assign homework digitally." },
      { icon:"📊", title:"Marks Entry & Results", desc:"Enter marks and publish results to students." },
      { icon:"📋", title:"Report Card Generator",  desc:"Auto-generate formatted report cards." },
      { icon:"🤖", title:"AI Teaching Assistance", desc:"Generate question papers and homework with AI." },
      { icon:"🗓️", title:"Timetable Management",  desc:"Personal schedule, substitution alerts, room info." },
      { icon:"🏆", title:"Club Management",        desc:"Manage student clubs and extracurriculars." },
      { icon:"💬", title:"Parent Communication",  desc:"Send updates to parents directly and securely." },
    ],
  },
  {
    key:"admin", emoji:"🏫", label:"Admin Portal", ...P.violet,
    desc:"Complete operational control over every department, process, and person in your institution.",
    features:[
      { icon:"📋", title:"Admissions & Enrollment", desc:"Digital forms, document collection, and enrollment." },
      { icon:"👥", title:"Staff Management",         desc:"Manage all staff records, roles, leave, and payroll." },
      { icon:"💰", title:"Fee Collection & Finance", desc:"Track collections, invoices, and defaulters." },
      { icon:"📊", title:"Reports & Analytics",      desc:"Institution-wide academic, attendance, and financial reports." },
      { icon:"🏛️", title:"Multi-Campus Control",    desc:"Manage multiple campuses from a single admin console." },
      { icon:"🔐", title:"Role-Based Access",        desc:"Define granular permissions for every staff role." },
      { icon:"📜", title:"Certificate Management",   desc:"Issue bonafide and transfer certificates digitally." },
      { icon:"🔍", title:"Full Audit Logs",           desc:"Complete activity trails for compliance and governance." },
    ],
  },
];

const SMART_MODULES = [
  { icon:"🚌", ...P.violet,   title:"Transport",  pts:["Live GPS Tracking","Route Management","Student Assignment","Driver Management","Arrival Notifications"] },
  { icon:"🏠", ...P.sky,      title:"Hostel",     pts:["Room Allocation","Hostel Attendance","Outpass Requests","Visitor Management","Occupancy Monitoring"] },
  { icon:"🏥", ...P.rose,     title:"Medical",    pts:["Health Records","Vaccination Tracking","Emergency Alerts","Incident Reports"] },
  { icon:"📚", ...P.mint,     title:"Library",    pts:["Book Inventory","Issue & Return","Fine Management","Digital Records"] },
  { icon:"🍽️", ...P.gold,    title:"Canteen",    pts:["Menu Management","Meal Booking","Food Ordering","Wallet Management"] },
];

const AI_FEATURES = [
  { icon:"📝", ...P.violet,   title:"AI Homework Generator",      desc:"Auto-generate subject-specific homework tailored to each class level." },
  { icon:"📋", ...P.sky,      title:"AI Question Paper Generator", desc:"Create balanced, curriculum-aligned question papers in seconds." },
  { icon:"📊", ...P.mint,     title:"Performance Analytics",       desc:"Identify struggling students, top performers, and class trends." },
  { icon:"📈", ...P.lavender, title:"Student Progress Insights",   desc:"Track growth trajectories and provide personalised recommendations." },
  { icon:"⚠️", ...P.rose,    title:"Attendance Risk Prediction",  desc:"AI flags irregular attendance patterns before they become critical." },
  { icon:"📑", ...P.gold,    title:"Smart Reports & Dashboards",  desc:"Automated reporting that surfaces the most important metrics." },
];

const BENEFITS = [
  "Improved Operational Efficiency", "Reduced Administrative Work",
  "Better Parent Engagement",         "Real-Time Information Access",
  "Enhanced Student Experience",      "Secure Data Management",
  "Complete Digital Transformation",  "Scalable for All Institution Types",
];

const PLANS = [
  { name:"Starter",    icon:"🌱", iconBg:P.mint.bg,     monthly:"₹20",       yearly:"₹150",        periodM:"per student / month", periodY:"per student / year",           tagline:"For small schools beginning their digital journey.",            features:["Up to 500 students","5 role-based dashboards","Attendance & timetable","Basic fee management","Parent communication","Email support"],             cta:"Get Started",    ctaStyle:"plan-cta-ghost",   featured:false },
  { name:"Pro",        icon:"⚡", iconBg:P.violet.bg,   monthly:"₹15 – ₹20", yearly:"₹100 – ₹150", periodM:"per student / month", periodY:"per student / year",           tagline:"Complete access for growing schools with flexible billing.",      features:["Up to 1,000 students","Everything in Starter","All Smart Campus Modules","AI-Powered Features","Transport & Hostel","Priority Support"],  cta:"Start Free Trial",ctaStyle:"plan-cta-primary", featured:true  },
  { name:"Enterprise", icon:"🏛️",iconBg:P.gold.bg,     monthly:null,        yearly:null,           periodM:"",                   periodY:"tailored to your institution", tagline:"For large institutions, multi-campus groups, and school chains.", features:["Unlimited students","Multi-campus support","Custom integrations","Dedicated account manager","SLA guarantee","On-premise option"],          cta:"Contact Sales",  ctaStyle:"plan-cta-ghost",   featured:false },
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
          <span>Campus<span style={{ color:"var(--lavender)" }}>OS</span></span>
        </a>
        <ul className="nav-links">
          {[["#features","Features"],["#modules","Modules"],["#ai","AI"],["#pricing","Pricing"],["#contact","Contact"]].map(([h,l])=>(
            <li key={h}><a href={h}>{l}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <a href="#contact" className="btn btn-outline">Book Demo</a>
          <a href="#pricing"  className="btn btn-primary">Get Started →</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-mesh">
        <div className="hero-grid" />
        <div className="hero-glow glow-a" />
        <div className="hero-glow glow-b" />
        <div className="hero-glow glow-c" />
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot">🇮🇳</span>
          Built for Indian Educational Institutions
        </div>
        <h1 className="headline-1 hero-title">
          The Complete Digital<br />
          <span className="gradient-text">Operating System</span><br />
          for Education
        </h1>
        <p className="hero-sub">
          From Admission to Alumni — everything in one platform.
          Academics, Administration, Communication, Finance,
          Transport, Hostel, AI and more, all unified.
        </p>
        <div className="hero-actions">
          <a href="#pricing"  className="btn btn-primary btn-lg">Start Free Trial →</a>
          <a href="#features" className="btn btn-outline btn-lg">Explore Features</a>
        </div>
        <div className="hero-metrics">
          {[
            { num:"₹15",    label:"Starting per student" },
            { num:"20+",    label:"Campus modules" },
            { num:"5",      label:"Role dashboards" },
            { num:"30 min", label:"Setup time" },
          ].map((m,i)=>(
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


function InstitutionStrip() {
  return (
    <div className="logos-strip">
      <p>Designed for every type of educational institution</p>
      <div className="logos-row">
        {[{e:"🏫",l:"Schools"},{e:"🏛️",l:"Colleges"},{e:"🎓",l:"Universities"},{e:"📚",l:"Coaching Centres"},{e:"🌐",l:"Multi-Campus Groups"}].map((t,i)=>(
          <div className="logo-pill" key={i}><span>{t.e}</span>{t.l}</div>
        ))}
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <section className="section" style={{ background:"var(--bg-1)" }} id="about">
      <div className="container">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <div className="label">✦ About CampusOS</div>
            <h2 className="headline-2" style={{ marginBottom:20 }}>
              Transforming campuses into<br />
              <span className="gradient-text">smart digital ecosystems</span>
            </h2>
            <p style={{ fontSize:15.5, color:"var(--t2)", lineHeight:1.8, marginBottom:20 }}>
              CampusOS is committed to transforming educational institutions into smart, connected, and paperless campuses. Our platform helps management, teachers, students, and parents collaborate efficiently through a secure and centralised digital ecosystem.
            </p>
            <p style={{ fontSize:14.5, color:"var(--t2)", lineHeight:1.8 }}>
              Whether you run a single-branch school or a multi-campus university group, CampusOS scales to fit your needs — bringing every department onto one unified, intelligent platform.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {WHY_POINTS.map((p,i)=>(
              <div key={i} className="card" style={{ padding:"13px 15px", display:"flex", alignItems:"center", gap:10, fontSize:13, fontWeight:600, color:"var(--t2)" }}>
                <span style={{ fontSize:16 }}>{p.icon}</span>
                <span>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreServicesSection() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div style={{ marginBottom:52 }}>
          <div className="label">✦ Our 4 Core Services</div>
          <h2 className="headline-2">Every dimension of campus life,<br /><span className="gradient-text">fully covered</span></h2>
          <p className="subtext" style={{ marginTop:14 }}>Four powerful pillars that together cover 100% of your institution's operational and academic needs.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:18 }}>
          {CORE_SERVICES.map((s,i)=>(
            <div key={i} className="card" style={{ padding:30 }}>
              <div style={{ width:50, height:50, borderRadius:14, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:18 }}>{s.icon}</div>
              <h3 style={{ fontSize:18, fontWeight:800, color:s.c, marginBottom:10, letterSpacing:"-.02em" }}>{s.title}</h3>
              <p style={{ fontSize:13.5, color:"var(--t2)", lineHeight:1.65, marginBottom:18 }}>{s.desc}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                {s.points.map((pt,pi)=>(
                  <span key={pi} style={{ fontSize:11.5, fontWeight:600, padding:"4px 11px", borderRadius:99, background:s.bg, color:s.c, border:`1px solid ${s.border}` }}>{pt}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortalsSection() {
  const [active, setActive] = useState("parent");
  const portal = PORTALS.find(p => p.key === active)!;
  return (
    <section className="section" style={{ background:"var(--bg-1)" }} id="features">
      <div className="container">
        <div style={{ marginBottom:48 }}>
          <div className="label">✦ Role-Based Portals</div>
          <h2 className="headline-2">The right tools for<br /><span className="gradient-text">every person on campus</span></h2>
          <p className="subtext" style={{ marginTop:14 }}>Purpose-built dashboards for each role — no clutter, no confusion, just the exact tools each person needs.</p>
        </div>
        <div className="role-tabs">
          {PORTALS.map(p=>(
            <button key={p.key} id={`portal-${p.key}`} className={`role-tab ${active===p.key?"active":""}`} onClick={()=>setActive(p.key)}>
              <span>{p.emoji}</span> {p.label}
            </button>
          ))}
        </div>
        <div className="role-panel">
          <div className="role-panel-header">
            <div className="role-avatar" style={{ background:portal.bg }}>{portal.emoji}</div>
            <div>
              <div className="role-panel-title" style={{ color:portal.c }}>{portal.label}</div>
              <div className="role-panel-desc">{portal.desc}</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {portal.features.map((f,i)=>(
              <div key={i} className="feat-card">
                <div className="feat-icon" style={{ background:portal.bg }}>{f.icon}</div>
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

function SmartModulesSection() {
  return (
    <section className="section" id="modules">
      <div className="container">
        <div style={{ marginBottom:52 }}>
          <div className="label">✦ Smart Campus Modules</div>
          <h2 className="headline-2">Every campus service,<br /><span className="gradient-text">digitised and centralised</span></h2>
          <p className="subtext" style={{ marginTop:14 }}>Beyond academics — CampusOS covers every physical and operational service from the bus gate to the hostel room.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:14 }}>
          {SMART_MODULES.map((m,i)=>(
            <div key={i} className="card" style={{ padding:24, textAlign:"center" }}>
              <div style={{ width:54, height:54, borderRadius:16, background:m.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, margin:"0 auto 14px" }}>{m.icon}</div>
              <h3 style={{ fontSize:14, fontWeight:700, color:m.c, marginBottom:14 }}>{m.title}</h3>
              <ul style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {m.pts.map((pt,pi)=>(
                  <li key={pi} style={{ fontSize:12, color:"var(--t2)", display:"flex", alignItems:"center", gap:7 }}>
                    <span style={{ width:16, height:16, borderRadius:"50%", background:m.bg, color:m.c, fontSize:9, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsSection() {
  const events = [{e:"🎉",l:"Annual Day"},{e:"🔬",l:"Science Fair"},{e:"🎭",l:"Cultural Fest"},{e:"📖",l:"Workshops"},{e:"🎤",l:"Seminars"},{e:"🏢",l:"Conferences"}];
  const sports = ["Registration Management","Team Creation","Fixture Scheduling","Results & Rankings","Certificates & Achievements"];
  return (
    <section className="section" style={{ background:"var(--bg-1)" }} id="events">
      <div className="container">
        <div style={{ marginBottom:52 }}>
          <div className="label">✦ Events & Tournaments</div>
          <h2 className="headline-2">Manage every event<br /><span className="gradient-text">from registration to results</span></h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div className="card" style={{ padding:30 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:P.violet.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🎉</div>
              <div>
                <h3 style={{ fontSize:16, fontWeight:700, color:"var(--t1)" }}>Event Management</h3>
                <p style={{ fontSize:12, color:"var(--t3)" }}>End-to-end management for all campus events</p>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9 }}>
              {events.map((ev,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 13px", borderRadius:10, border:"1px solid var(--border)", background:"var(--bg-card)", fontSize:13, fontWeight:600, color:"var(--t2)" }}>
                  <span>{ev.e}</span>{ev.l}
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding:30 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:P.mint.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🏆</div>
              <div>
                <h3 style={{ fontSize:16, fontWeight:700, color:"var(--t1)" }}>Sports & Tournament Management</h3>
                <p style={{ fontSize:12, color:"var(--t3)" }}>Full tournament lifecycle in one place</p>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {sports.map((s,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, border:"1px solid var(--border)", background:"var(--bg-card)" }}>
                  <span style={{ width:18, height:18, borderRadius:"50%", background:P.mint.bg, color:P.mint.c, fontSize:9, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>✓</span>
                  <span style={{ fontSize:13, fontWeight:600, color:"var(--t2)" }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunicationSection() {
  const features = ["Direct Messaging","Group Discussions","Class Channels","Department Channels","Announcements","Push Notifications","Emergency Alerts"];
  const cards = [
    { icon:"🔒", ...P.violet,   title:"No Phone Number Sharing",  desc:"Students, parents, and teachers communicate entirely within the platform. Zero personal data exposure." },
    { icon:"📢", ...P.sky,      title:"Role-Targeted Broadcasts",  desc:"Send announcements to specific classes, roles, or departments — with read receipts and delivery tracking." },
    { icon:"🚨", ...P.rose,     title:"Emergency Alerts",          desc:"Instant campus-wide emergency notifications that reach every device in seconds." },
  ];
  return (
    <section className="section" id="communication">
      <div className="container">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <div className="label">✦ Communication System</div>
            <h2 className="headline-2" style={{ marginBottom:18 }}>Ditch WhatsApp groups.<br /><span className="gradient-text">Go fully secure.</span></h2>
            <p style={{ fontSize:14.5, color:"var(--t2)", lineHeight:1.78, marginBottom:28 }}>
              CampusOS eliminates the need for WhatsApp groups and personal phone number sharing. Every conversation happens inside a secure, role-controlled environment.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
              {features.map((f,i)=>(
                <div key={i} className="card" style={{ padding:"11px 15px", display:"flex", alignItems:"center", gap:11, fontSize:13, fontWeight:600, color:"var(--t2)" }}>
                  <span style={{ width:18, height:18, borderRadius:"50%", background:P.violet.bg, color:P.violet.c, fontSize:9, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {cards.map((c,i)=>(
              <div key={i} className="card" style={{ padding:24, display:"flex", gap:16 }}>
                <div style={{ width:46, height:46, borderRadius:12, background:c.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{c.icon}</div>
                <div>
                  <h3 style={{ fontSize:14, fontWeight:700, color:c.c, marginBottom:6 }}>{c.title}</h3>
                  <p style={{ fontSize:12.5, color:"var(--t2)", lineHeight:1.6 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section className="section" style={{ background:"var(--bg-1)" }} id="ai">
      <div className="container">
        <div style={{ marginBottom:52 }}>
          <div className="label">✦ AI-Powered Campus</div>
          <h2 className="headline-2">Smart automation that works<br /><span className="gradient-text">for every educator</span></h2>
          <p className="subtext" style={{ marginTop:14 }}>Leverage AI to reduce manual work, surface insights, and help teachers and administrators do more with less effort.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
          {AI_FEATURES.map((f,i)=>(
            <div key={i} className="card" style={{ padding:26 }}>
              <div style={{ width:46, height:46, borderRadius:12, background:f.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:16 }}>{f.icon}</div>
              <h3 style={{ fontSize:14, fontWeight:700, color:f.c, marginBottom:8 }}>{f.title}</h3>
              <p style={{ fontSize:12.5, color:"var(--t2)", lineHeight:1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const palette = [P.violet,P.sky,P.mint,P.lavender,P.sky,P.mint,P.violet,P.lavender];
  return (
    <section className="section" id="benefits">
      <div className="container">
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div className="label" style={{ margin:"0 auto 18px" }}>✦ Benefits</div>
          <h2 className="headline-2">Why institutions choose<br /><span className="gradient-text">CampusOS</span></h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {BENEFITS.map((b,i)=>(
            <div key={i} className="card" style={{ padding:"16px 18px", display:"flex", alignItems:"center", gap:11 }}>
              <span style={{ width:20, height:20, borderRadius:"50%", background:palette[i].bg, color:palette[i].c, fontSize:10, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>✓</span>
              <span style={{ fontSize:13, fontWeight:600, color:"var(--t2)" }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [billing, setBilling] = useState<"monthly"|"yearly">("yearly");
  return (
    <section className="section pricing-section" id="pricing">
      <div className="container">
        <div style={{ textAlign:"center" }}>
          <div className="label" style={{ margin:"0 auto 20px" }}>✦ Pricing</div>
          <h2 className="headline-2">Simple, transparent<br /><span className="gradient-text">pricing for every school</span></h2>
          <p className="subtext" style={{ margin:"14px auto 32px", textAlign:"center" }}>Starting from ₹15 per student per month. No hidden charges. No lock-in. Scale at your pace.</p>
          <div className="billing-toggle">
            <button id="billing-monthly" className={`toggle-btn ${billing==="monthly"?"on":""}`} onClick={()=>setBilling("monthly")}>Monthly</button>
            <button id="billing-yearly"  className={`toggle-btn ${billing==="yearly" ?"on":""}`} onClick={()=>setBilling("yearly")}>
              Yearly {billing==="yearly"&&<span className="save-chip">Save 37%</span>}
            </button>
          </div>
        </div>
        <div className="pricing-grid" style={{ marginTop:44 }}>
          {PLANS.map((plan,i)=>(
            <div key={i} className={`price-card ${plan.featured?"featured":""}`}>
              {plan.featured&&<div className="featured-badge">Most Popular</div>}
              <div className="plan-icon" style={{ background:plan.iconBg }}>{plan.icon}</div>
              <div className="plan-name">{plan.name}</div>
              {plan.monthly ? (
                <>
                  <div className="plan-price">{billing==="monthly"?plan.monthly:plan.yearly}</div>
                  <div className="plan-period">{billing==="monthly"?plan.periodM:plan.periodY}</div>
                </>
              ) : (
                <>
                  <div className="plan-price-custom">Custom</div>
                  <div className="plan-period">{plan.periodY}</div>
                </>
              )}
              <div className="plan-tagline">{plan.tagline}</div>
              <ul className="plan-features">
                {plan.features.map((f,fi)=>(
                  <li className="plan-feature" key={fi}><span className="check-icon">✓</span>{f}</li>
                ))}
              </ul>
              <button className={`plan-cta ${plan.ctaStyle}`} id={`plan-${plan.name.toLowerCase()}`}>{plan.cta}</button>
            </div>
          ))}
        </div>
        <p style={{ textAlign:"center", fontSize:13, color:"var(--t3)", marginTop:24 }}>
          14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="section" style={{ background:"var(--bg-1)" }}>
      <div className="container">
        <div className="cta-wrap" style={{ padding:"60px 48px" }}>
          <div className="cta-content">
            <div className="label" style={{ margin:"0 auto 24px" }}>✦ Our Mission</div>
            <blockquote style={{ fontSize:"clamp(17px,2.2vw,24px)", fontWeight:700, color:"var(--t1)", lineHeight:1.6, maxWidth:680, margin:"0 auto 28px", letterSpacing:"-.02em" }}>
              "To empower educational institutions with innovative technology solutions that simplify management, enhance communication, improve learning experiences, and create truly digital campuses."
            </blockquote>
            <div style={{ width:48, height:3, background:"linear-gradient(90deg,var(--violet),var(--sky),var(--mint))", borderRadius:99, margin:"0 auto 28px" }} />
            <p style={{ fontSize:20, fontWeight:900, letterSpacing:"-.03em" }}>
              <span className="gradient-text">One Platform. One Ecosystem. One Digital Campus.</span>
            </p>
          </div>
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
            <div className="label" style={{ margin:"0 auto 20px" }}>✦ Get Started Today</div>
            <h2 className="cta-title">Ready to transform<br /><span className="gradient-text">your institution?</span></h2>
            <p className="cta-sub">Join schools across India already on CampusOS. Set up in under 30 minutes — free, no card needed.</p>
            <div className="cta-actions">
              <button id="cta-trial" className="btn btn-primary btn-lg">🚀 Start Free Trial</button>
              <button id="cta-demo"  className="btn btn-outline btn-lg">📞 Talk to Sales</button>
            </div>
            <div className="contact-row">
              {[{key:"Email",val:"hello@campusos.io"},{key:"Phone",val:"+91 98765 43210"},{key:"Support",val:"Mon – Sat, 9 AM – 6 PM IST"}].map((c,i)=>(
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
            <div className="nav-logo" style={{ marginBottom:14 }}>
              <div className="nav-logo-mark">🎓</div>
              <span>Campus<span style={{ color:"var(--lavender)" }}>OS</span></span>
            </div>
            <p className="footer-desc">The complete Digital Campus Operating System for educational institutions across India. From admission to alumni — everything in one platform.</p>
          </div>
          {[
            { title:"Platform",  links:[["#services","Core Services"],["#features","Role Portals"],["#modules","Smart Modules"],["#ai","AI Features"],["#pricing","Pricing"]] },
            { title:"Portals",   links:[["#features","Parent Portal"],["#features","Student Portal"],["#features","Teacher Portal"],["#features","Admin Portal"]] },
            { title:"Company",   links:[["#about","About Us"],["#contact","Contact"],["#","Privacy Policy"],["#","Terms of Service"]] },
          ].map(col=>(
            <div key={col.title}>
              <div className="footer-heading">{col.title}</div>
              <ul className="footer-list">
                {col.links.map(([h,l])=><li key={l}><a href={h}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <hr className="hr" />
        <div className="footer-bottom" style={{ marginTop:28 }}>
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
        <InstitutionStrip />
        <AboutSection />
        <CoreServicesSection />
        <PortalsSection />
        <SmartModulesSection />
        <EventsSection />
        <CommunicationSection />
        <AISection />
        <BenefitsSection />
        <PricingSection />
        <MissionSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
