"use client";
import { useState } from "react";

/* ─── palette lookup ─── */
const C = {
  violet:   { c:"#6B6EC8", bg:"#EEEEFF", border:"rgba(107,110,200,.22)" },
  lavender: { c:"#8B8EE8", bg:"#F2F2FF", border:"rgba(139,142,232,.22)" },
  sky:      { c:"#5AB4DC", bg:"#EAF7FF", border:"rgba(90,180,220,.22)"  },
  mint:     { c:"#4DC48A", bg:"#EDFAF2", border:"rgba(77,196,138,.22)"  },
  rose:     { c:"#D96B6B", bg:"#FFF0F0", border:"rgba(217,107,107,.22)" },
  gold:     { c:"#C49A28", bg:"#FFFBEA", border:"rgba(196,154,40,.22)"  },
};

/* ─── data ─── */
const WHY = [
  {icon:"📄",t:"Zero Paper Campus"},        {icon:"🔒",t:"No Mobile Number Sharing"},
  {icon:"💬",t:"Secure Internal Comms"},     {icon:"🎓",t:"Complete Academic Mgmt"},
  {icon:"📊",t:"Real-Time Analytics"},       {icon:"🤖",t:"AI-Powered Features"},
  {icon:"📱",t:"Mobile & Web Access"},       {icon:"🏫",t:"One Platform, All Ops"},
];

const SERVICES = [
  { p:C.violet,  icon:"🎓", title:"Academic Management",        desc:"Complete academic lifecycle — attendance, timetables, assignments, exams, report cards, certificates, and performance analytics.", pts:["Attendance","Timetable","Assignments","Exams","Report Cards","Certificates"] },
  { p:C.sky,     icon:"💬", title:"Communication & Engagement",  desc:"Secure, internal communication between students, parents, teachers, and management — no WhatsApp, no number sharing.", pts:["Secure Messaging","Notifications","Announcements","Events","Activity Mgmt","Emergency Alerts"] },
  { p:C.mint,    icon:"🏛️", title:"Campus Operations",           desc:"Admissions, fees, transport, hostel, library, medical — every campus service digitised and centralised.", pts:["Admissions","Fee Management","Transport","Hostel","Library","Inventory"] },
  { p:C.lavender,icon:"🤖", title:"AI & Digital Transformation", desc:"AI-powered insights, automation, academic analytics, and intelligent recommendations to future-proof your institution.", pts:["AI Homework","Question Papers","Analytics","Attendance AI","Smart Reports","Insights"] },
];

const PORTALS = [
  { key:"student_parent", emoji:"👨‍👩‍👧‍👦", label:"Student & Parent", p:C.mint, desc:"A unified dashboard for academics and real-time child progress tracking.",
    feats:[
      {i:"🖥️",t:"Personal Dashboard",d:"All academic info in one clean view."},
      {i:"📅",t:"Timetable & Attendance",d:"Daily schedules and absent alerts."},
      {i:"📤",t:"Homework & Assignments",d:"View and submit assignments digitally."},
      {i:"📊",t:"Results & Report Cards",d:"Access marks and report cards instantly."},
      {i:"💳",t:"Online Fee Payments",d:"Pay fees securely and download receipts."},
      {i:"🚌",t:"Bus GPS Tracking",d:"Live tracking of the school bus."},
      {i:"📚",t:"Library Access",d:"Browse catalogue and issued books."},
      {i:"💬",t:"Internal Messaging",d:"Chat securely without sharing numbers."}
    ] },
  { key:"teacher", emoji:"📚", label:"Teacher",  p:C.sky,      desc:"Powerful tools so educators can focus on teaching, not paperwork.",
    feats:[{i:"✅",t:"Attendance Management",d:"Mark attendance in seconds."},{i:"📝",t:"Homework Creation",d:"Create and assign homework digitally."},{i:"📊",t:"Marks Entry & Results",d:"Enter marks and publish results."},{i:"📋",t:"Report Card Generator",d:"Auto-generate report cards."},{i:"🤖",t:"AI Teaching Assistance",d:"AI question papers and homework."},{i:"🗓️",t:"Timetable Management",d:"Personal schedule and room info."},{i:"🏆",t:"Club Management",d:"Manage clubs and extracurriculars."},{i:"💬",t:"Parent Communication",d:"Send updates directly to parents."}] },
  { key:"admin",   emoji:"🏫", label:"Admin",    p:C.violet,   desc:"Complete operational control over every department and process.",
    feats:[{i:"📋",t:"Admissions & Enrollment",d:"Digital forms and document collection."},{i:"👥",t:"Staff Management",d:"Manage staff records, roles, and leave."},{i:"💰",t:"Fee Collection & Finance",d:"Track collections and manage invoices."},{i:"📊",t:"Reports & Analytics",d:"Institution-wide reports and dashboards."},{i:"🏛️",t:"Multi-Campus Control",d:"Manage multiple campuses from one console."},{i:"🔐",t:"Role-Based Access",d:"Granular permissions for every role."},{i:"📜",t:"Certificate Management",d:"Issue certificates digitally."},{i:"🔍",t:"Full Audit Logs",d:"Complete activity trails for governance."}] },
];

const MODULES = [
  { icon:"🚌", p:C.violet,   title:"Transport",  pts:["Live GPS Tracking","Route Management","Student Assignment","Driver Management","Arrival Notifications"] },
  { icon:"🏠", p:C.sky,      title:"Hostel",     pts:["Room Allocation","Hostel Attendance","Outpass Requests","Visitor Management","Occupancy Monitoring"] },
  { icon:"🏥", p:C.rose,     title:"Medical",    pts:["Health Records","Vaccination Tracking","Emergency Alerts","Incident Reports"] },
  { icon:"📚", p:C.mint,     title:"Library",    pts:["Book Inventory","Issue & Return","Fine Management","Digital Records"] },
  { icon:"🍽️", p:C.gold,    title:"Canteen",    pts:["Menu Management","Meal Booking","Food Ordering","Wallet Management"] },
];

const AI_FEATS = [
  {icon:"📝",p:C.violet,   t:"AI Homework Generator",       d:"Auto-generate subject-specific homework tailored to each class level."},
  {icon:"📋",p:C.sky,      t:"AI Question Paper Generator", d:"Create balanced, curriculum-aligned question papers in seconds."},
  {icon:"📊",p:C.mint,     t:"Performance Analytics",       d:"Identify struggling students, top performers, and class trends."},
  {icon:"📈",p:C.lavender, t:"Student Progress Insights",   d:"Track growth and provide personalised recommendations."},
  {icon:"⚠️",p:C.rose,    t:"Attendance Risk Prediction",  d:"AI flags irregular patterns before they become critical."},
  {icon:"📑",p:C.gold,    t:"Smart Reports & Dashboards",  d:"Automated reporting that surfaces the most important metrics."},
];

const BENEFITS = [
  {t:"Improved Operational Efficiency",p:C.violet},  {t:"Reduced Administrative Work",p:C.sky},
  {t:"Better Parent Engagement",p:C.mint},           {t:"Real-Time Information Access",p:C.lavender},
  {t:"Enhanced Student Experience",p:C.sky},         {t:"Secure Data Management",p:C.violet},
  {t:"Complete Digital Transformation",p:C.mint},    {t:"Scalable for All Institutions",p:C.lavender},
];

const PLANS = [
  { name:"Starter",    icon:"🌱", ibg:C.mint.bg,     monthly:"₹20",       yearly:"₹150",        pm:"per student / month", py:"per student / year",           tag:"For small schools beginning their digital journey.",           feats:["Up to 500 students","3 role dashboards","Attendance & timetable","Basic fee management","Parent communication","Email support"],            cta:"Get Started",     cs:"pc-cta-g", hot:false },
  { name:"Pro",        icon:"⚡", ibg:C.violet.bg,   monthly:"₹15 – ₹20", yearly:"₹100 – ₹150", pm:"per student / month", py:"per student / year",           tag:"Complete access for growing schools with flexible billing.",   feats:["Up to 1,000 students","Everything in Starter","All Smart Campus Modules","AI-Powered Features","Transport & Hostel","Priority Support"], cta:"Start Free Trial", cs:"pc-cta-p", hot:true  },
  { name:"Enterprise", icon:"🏛️",ibg:C.gold.bg,     monthly:null,        yearly:null,           pm:"",                   py:"tailored to your institution",  tag:"Custom plans for large institutions and multi-campus groups.", feats:["Unlimited students","Multi-campus support","Custom integrations","Dedicated account manager","SLA guarantee","On-premise option"],     cta:"Contact Sales",   cs:"pc-cta-g", hot:false },
];

/* ─── Components ─── */
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-in">
        <a href="#" className="nav-brand">
          <div className="nav-mark">🎓</div>
          Campus<span style={{color:"var(--c-violet)"}}>OS</span>
        </a>
        <ul className="nav-links">
          {[["#features","Features"],["#modules","Modules"],["#ai","AI"],["#pricing","Pricing"],["#contact","Contact"]].map(([h,l])=>
            <li key={h}><a href={h}>{l}</a></li>
          )}
        </ul>
        <div className="nav-right">
          <a href="#contact" className="btn btn-ghost btn-sm">Book Demo</a>
          <a href="#pricing"  className="btn btn-primary btn-sm">Get Started →</a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const cards = [
    {icon:"👨‍👩‍👧‍👦",p:C.mint,     t:"Student & Parent Portal", s:"Grades, Timetable & Progress"},
    {icon:"📚",p:C.sky,      t:"Teacher Console",         s:"Attendance, Marks & Reports"},
    {icon:"🏫",p:C.violet,   t:"Admin Control",           s:"Full institution management"},
    {icon:"🤖",p:C.gold,     t:"AI Assistant",            s:"Smart automation & insights"},
  ];
  return (
    <section className="hero">
      <div className="hero-blob blob1"/><div className="hero-blob blob2"/><div className="hero-blob blob3"/>
      <div className="w">
        <div className="hero-grid">
          {/* left */}
          <div>
            <div className="tag hero-tag">🇮🇳 &nbsp;Built for Indian Educational Institutions</div>
            <h1 className="h1 hero-h1">
              The Complete Digital<br/>
              <span className="gt">Operating System</span><br/>
              for Education
            </h1>
            <p className="lead hero-lead">
              From Admission to Alumni — everything in one platform.
              Academics, Administration, Communication, Finance,
              Transport, Hostel, AI and more, all unified.
            </p>
            <div className="hero-btns">
              <a href="#pricing"  className="btn btn-primary btn-xl">Start Free Trial →</a>
              <a href="#features" className="btn btn-white btn-xl">Explore Features</a>
            </div>
            <div className="hero-stats">
              {[{n:"₹15",l:"Starting / student"},{n:"20+",l:"Campus modules"},{n:"3",l:"Role dashboards"},{n:"30 min",l:"Setup time"}].map((s,i)=>(
                <div className="stat-cell" key={i}>
                  <div className="stat-n gt">{s.n}</div>
                  <div className="stat-l">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* right */}
          <div className="hero-cards">
            {cards.map((c,i)=>(
              <div className="hcard" key={i}>
                <div className="hcard-icon" style={{background:c.p.bg}}>{c.icon}</div>
                <div>
                  <div className="hcard-t">{c.t}</div>
                  <div className="hcard-s">{c.s}</div>
                </div>
                <div className="hcard-dot" style={{background:c.p.c}}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Strip() {
  return (
    <div className="strip">
      <div className="strip-label">Designed for every type of educational institution</div>
      <div className="strip-row">
        {[{e:"🏫",l:"Schools"},{e:"🏛️",l:"Colleges"},{e:"🎓",l:"Universities"},{e:"📚",l:"Coaching Centres"},{e:"🌐",l:"Multi-Campus Groups"}].map((t,i)=>(
          <div className="strip-pill" key={i}><span>{t.e}</span>{t.l}</div>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="sec" style={{background:"var(--white)"}} id="about">
      <div className="w">
        <div className="about-grid">
          <div>
            <div className="tag" style={{marginBottom:20}}>✦ About CampusOS</div>
            <h2 className="h2" style={{marginBottom:18}}>
              Transforming campuses into<br/><span className="gt">smart digital ecosystems</span>
            </h2>
            <p style={{fontSize:15.5,color:"var(--ink-2)",lineHeight:1.8,marginBottom:20}}>
              CampusOS is committed to transforming educational institutions into smart, connected, and paperless campuses. Our platform helps management, teachers, students, and parents collaborate efficiently through a secure and centralised digital ecosystem.
            </p>
            <p style={{fontSize:14.5,color:"var(--ink-2)",lineHeight:1.8}}>
              Whether you run a single-branch school or a multi-campus university group, CampusOS scales to fit your needs — bringing every department onto one unified, intelligent platform.
            </p>
          </div>
          <div className="why-grid">
            {WHY.map((w,i)=>(
              <div className="why-item" key={i}>
                <span style={{fontSize:16}}>{w.icon}</span>
                <span>{w.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreServices() {
  return (
    <section className="sec" style={{background:"var(--bg-alt)"}} id="services">
      <div className="w">
        <div style={{marginBottom:48}}>
          <div className="tag">✦ Our 4 Core Services</div>
          <h2 className="h2" style={{marginTop:14,marginBottom:12}}>Every dimension of campus life,<br/><span className="gt">fully covered</span></h2>
          <p className="lead">Four powerful pillars covering 100% of your institution's operational and academic needs.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s,i)=>(
            <div className="scard" key={i} style={{borderTopColor:s.p.c,borderTopWidth:3}}>
              <div className="scard-icon" style={{background:s.p.bg}}>{s.icon}</div>
              <div className="scard-title" style={{color:s.p.c}}>{s.title}</div>
              <div className="scard-desc">{s.desc}</div>
              <div className="tags">
                {s.pts.map((pt,pi)=>(
                  <span key={pi} className="tag-sm" style={{background:s.p.bg,color:s.p.c,border:`1px solid ${s.p.border}`}}>{pt}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portals() {
  const [active,setActive] = useState("student_parent");
  const p = PORTALS.find(x=>x.key===active)!;
  return (
    <section className="sec" style={{background:"var(--white)"}} id="features">
      <div className="w">
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="tag" style={{marginBottom:18}}>✦ Role-Based Portals</div>
          <h2 className="h2" style={{marginBottom:12}}>The right tools for<br/><span className="gt">every person on campus</span></h2>
          <p className="lead" style={{margin:"0 auto"}}>Purpose-built dashboards for each role — no clutter, no confusion.</p>
        </div>

        <div className="portal-container">
          {/* Sidebar */}
          <div className="portal-sidebar">
            {PORTALS.map(x=>(
              <button 
                key={x.key} 
                className={`portal-tab ${active===x.key?"active":""}`} 
                onClick={()=>setActive(x.key)}
              >
                <div className="ptab-icon" style={{
                  background: active===x.key ? x.p.bg : 'var(--bg-alt)', 
                  color: active===x.key ? x.p.c : 'var(--ink-3)'
                }}>
                  {x.emoji}
                </div>
                <div className="ptab-text">
                  <div className="ptab-title">{x.label}</div>
                  <div className="ptab-sub">Portal</div>
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="portal-content">
            <div className="portal-header">
               <div className="ph-avatar" style={{background:p.p.bg}}>{p.emoji}</div>
               <div>
                 <h3 className="ph-title" style={{color:p.p.c}}>{p.label} Dashboard</h3>
                 <p className="ph-desc">{p.desc}</p>
               </div>
            </div>
            
            <div className="portal-grid">
              {p.feats.map((f,i)=>(
                <div className="pf-card" key={i}>
                   <div className="pf-icon" style={{background:p.p.bg, color:p.p.c}}>{f.i}</div>
                   <div className="pf-body">
                     <div className="pf-title">{f.t}</div>
                     <div className="pf-desc">{f.d}</div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Modules() {
  return (
    <section className="sec" style={{background:"var(--bg-alt)"}} id="modules">
      <div className="w">
        <div style={{marginBottom:48}}>
          <div className="tag">✦ Smart Campus Modules</div>
          <h2 className="h2" style={{marginTop:14,marginBottom:12}}>Every campus service,<br/><span className="gt">digitised and centralised</span></h2>
          <p className="lead">Beyond academics — from the bus gate to the hostel room, CampusOS covers it all.</p>
        </div>
        <div className="mods-grid">
          {MODULES.map((m,i)=>(
            <div className="mod" key={i}>
              <div className="mod-icon" style={{background:m.p.bg}}>{m.icon}</div>
              <div className="mod-title" style={{color:m.p.c}}>{m.title}</div>
              <ul className="mod-pts">
                {m.pts.map((pt,pi)=>(
                  <li className="mod-pt" key={pi}>
                    <span className="mod-check" style={{background:m.p.bg,color:m.p.c}}>✓</span>
                    {pt}
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

function Events() {
  const evs = [{e:"🎉",l:"Annual Day"},{e:"🔬",l:"Science Fair"},{e:"🎭",l:"Cultural Fest"},{e:"📖",l:"Workshops"},{e:"🎤",l:"Seminars"},{e:"🏢",l:"Conferences"}];
  const sports = ["Registration Management","Team Creation","Fixture Scheduling","Results & Rankings","Certificates & Achievements"];
  return (
    <section className="sec" style={{background:"var(--white)"}} id="events">
      <div className="w">
        <div style={{marginBottom:48}}>
          <div className="tag">✦ Events & Tournaments</div>
          <h2 className="h2" style={{marginTop:14,marginBottom:12}}>Manage every event<br/><span className="gt">from registration to results</span></h2>
        </div>
        <div className="ev-grid">
          <div className="ev-card">
            <div className="ev-hd">
              <div className="ev-hd-icon" style={{background:C.violet.bg}}>🎉</div>
              <div><div className="ev-hd-t">Event Management</div><div className="ev-hd-s">End-to-end management for all campus events</div></div>
            </div>
            <div className="ev-pills">
              {evs.map((ev,i)=><div className="ev-pill" key={i}><span>{ev.e}</span>{ev.l}</div>)}
            </div>
          </div>
          <div className="ev-card">
            <div className="ev-hd">
              <div className="ev-hd-icon" style={{background:C.mint.bg}}>🏆</div>
              <div><div className="ev-hd-t">Sports & Tournament Management</div><div className="ev-hd-s">Full tournament lifecycle in one place</div></div>
            </div>
            <div className="ev-rows">
              {sports.map((s,i)=>(
                <div className="ev-row" key={i}>
                  <span style={{width:16,height:16,borderRadius:"50%",background:C.mint.bg,color:C.mint.c,fontSize:9,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✓</span>
                  <span className="ev-row-t">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Communication() {
  const feats = ["Direct Messaging","Group Discussions","Class Channels","Department Channels","Announcements","Push Notifications","Emergency Alerts"];
  const cards = [
    {icon:"🔒",p:C.violet,t:"No Phone Number Sharing",d:"Students, parents, and teachers communicate entirely within the platform. Zero personal data exposure."},
    {icon:"📢",p:C.sky,   t:"Role-Targeted Broadcasts",d:"Send announcements to specific classes, roles, or departments — with read receipts."},
    {icon:"🚨",p:C.rose,  t:"Emergency Alerts",        d:"Instant campus-wide emergency notifications that reach every device in seconds."},
  ];
  return (
    <section className="sec" style={{background:"var(--bg-alt)"}} id="communication">
      <div className="w">
        <div className="comm-grid">
          <div>
            <div className="tag" style={{marginBottom:20}}>✦ Communication System</div>
            <h2 className="h2" style={{marginBottom:16}}>Ditch WhatsApp groups.<br/><span className="gt">Go fully secure.</span></h2>
            <p style={{fontSize:14.5,color:"var(--ink-2)",lineHeight:1.8,marginBottom:28}}>
              CampusOS eliminates the need for WhatsApp groups and personal phone number sharing. Every conversation happens inside a secure, role-controlled environment.
            </p>
            <div className="comm-feats">
              {feats.map((f,i)=>(
                <div className="comm-feat" key={i}>
                  <span className="comm-check" style={{background:C.violet.bg,color:C.violet.c}}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
          <div className="comm-cards">
            {cards.map((c,i)=>(
              <div className="comm-card" key={i}>
                <div className="comm-cicon" style={{background:c.p.bg}}>{c.icon}</div>
                <div>
                  <div className="comm-ct" style={{color:c.p.c}}>{c.t}</div>
                  <div className="comm-cd">{c.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AI() {
  return (
    <section className="sec" style={{background:"var(--white)"}} id="ai">
      <div className="w">
        <div style={{marginBottom:48}}>
          <div className="tag">✦ AI-Powered Campus</div>
          <h2 className="h2" style={{marginTop:14,marginBottom:12}}>Smart automation that works<br/><span className="gt">for every educator</span></h2>
          <p className="lead">Reduce manual work, surface insights, and help teachers do more with less effort.</p>
        </div>
        <div className="ai-grid">
          {AI_FEATS.map((f,i)=>(
            <div className="ai-card" key={i}>
              <div className="ai-icon" style={{background:f.p.bg}}>{f.icon}</div>
              <div className="ai-t" style={{color:f.p.c}}>{f.t}</div>
              <div className="ai-d">{f.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="sec" style={{background:"var(--bg-alt)"}} id="benefits">
      <div className="w">
        <div style={{textAlign:"center",marginBottom:44}}>
          <div className="tag" style={{margin:"0 auto 18px"}}>✦ Benefits</div>
          <h2 className="h2">Why institutions choose <span className="gt">CampusOS</span></h2>
        </div>
        <div className="ben-grid">
          {BENEFITS.map((b,i)=>(
            <div className="ben-item" key={i}>
              <span className="ben-chk" style={{background:b.p.bg,color:b.p.c}}>✓</span>
              <span className="ben-t">{b.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [bill,setBill] = useState<"m"|"y">("y");
  return (
    <section className="sec" style={{background:"var(--white)"}} id="pricing">
      <div className="w">
        <div style={{textAlign:"center",marginBottom:8}}>
          <div className="tag" style={{margin:"0 auto 18px"}}>✦ Pricing</div>
          <h2 className="h2" style={{marginBottom:12}}>Simple, transparent<br/><span className="gt">pricing for every school</span></h2>
          <p className="lead" style={{margin:"0 auto 32px",textAlign:"center"}}>Starting from ₹15 per student per month. No hidden charges. No lock-in.</p>
        </div>
        <div className="billing-row">
          <div className="billing-tog">
            <button id="bill-m" className={`tog-btn ${bill==="m"?"on":""}`} onClick={()=>setBill("m")}>Monthly</button>
            <button id="bill-y" className={`tog-btn ${bill==="y"?"on":""}`} onClick={()=>setBill("y")}>
              Yearly {bill==="y"&&<span className="save-badge">Save 37%</span>}
            </button>
          </div>
        </div>
        <div className="pc-grid">
          {PLANS.map((plan,i)=>(
            <div key={i} className={`pc ${plan.hot?"hot":""}`}>
              {plan.hot&&<div className="pc-badge">Most Popular</div>}
              <div className="pc-icon" style={{background:plan.ibg}}>{plan.icon}</div>
              <div className="pc-name">{plan.name}</div>
              {plan.monthly?(
                <><div className="pc-price">{bill==="m"?plan.monthly:plan.yearly}</div>
                <div className="pc-per">{bill==="m"?plan.pm:plan.py}</div></>
              ):(
                <><div className="pc-custom">Custom</div>
                <div className="pc-per">{plan.py}</div></>
              )}
              <div className="pc-tag">{plan.tag}</div>
              <ul className="pc-feats">
                {plan.feats.map((f,fi)=>(
                  <li className="pc-feat" key={fi}><span className="pc-chk">✓</span>{f}</li>
                ))}
              </ul>
              <button className={`pc-cta ${plan.cs}`} id={`plan-${plan.name.toLowerCase()}`}>{plan.cta}</button>
            </div>
          ))}
        </div>
        <p style={{textAlign:"center",fontSize:13,color:"var(--ink-3)",marginTop:24}}>
          14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="sec" style={{background:"var(--bg-alt)"}}>
      <div className="w">
        <div className="mission">
          <div className="tag" style={{margin:"0 auto 24px",display:"inline-flex"}}>✦ Our Mission</div>
          <p className="mission-q">
            "To empower educational institutions with innovative technology solutions that simplify management, enhance communication, improve learning experiences, and create truly digital campuses."
          </p>
          <div className="mission-line"/>
          <p className="mission-slug"><span className="gt">One Platform. One Ecosystem. One Digital Campus.</span></p>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="sec cta-sec" id="contact">
      <div className="w">
        <div className="cta-box">
          <div className="tag" style={{margin:"0 auto 24px",display:"inline-flex"}}>✦ Get Started Today</div>
          <h2 className="cta-h">Ready to transform<br/><span className="gt">your institution?</span></h2>
          <p className="cta-p">Join schools across India already on CampusOS. Set up in under 30 minutes — free, no card needed.</p>
          <div className="cta-btns">
            <button id="cta-trial" className="btn btn-primary btn-xl">🚀 Start Free Trial</button>
            <button id="cta-demo"  className="btn btn-white btn-xl">📞 Talk to Sales</button>
          </div>
          <div className="cta-contact">
            {[{k:"Email",v:"hello@campusos.io"},{k:"Phone",v:"+91 98765 43210"},{k:"Support",v:"Mon – Sat, 9 AM – 6 PM IST"}].map((c,i)=>(
              <div className="cc-item" key={i}>
                <div className="cc-k">{c.k}</div>
                <div className="cc-v">{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="w">
        <div className="footer-grid">
          <div>
            <div className="nav-brand">
              <div className="nav-mark">🎓</div>
              Campus<span style={{color:"var(--c-violet)"}}>OS</span>
            </div>
            <p className="footer-brand">
              The complete Digital Campus Operating System for educational institutions across India.
              From admission to alumni — everything in one platform.
            </p>
          </div>
          {[
            {h:"Platform", ls:[["#services","Core Services"],["#features","Role Portals"],["#modules","Smart Modules"],["#ai","AI Features"],["#pricing","Pricing"]]},
            {h:"Portals",  ls:[["#features","Student & Parent Portal"],["#features","Teacher Portal"],["#features","Admin Portal"]]},
            {h:"Company",  ls:[["#about","About Us"],["#contact","Contact"],["#","Privacy Policy"],["#","Terms of Service"]]},
          ].map(col=>(
            <div key={col.h}>
              <div className="footer-h">{col.h}</div>
              <ul className="footer-links">
                {col.ls.map(([h,l])=><li key={l}><a href={h}>{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-btm">
          <span>© {new Date().getFullYear()} CampusOS · Made in India 🇮🇳</span>
          <div className="footer-btm-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Strip />
        <About />
        <CoreServices />
        <Portals />
        <Modules />
        <Events />
        <Communication />
        <AI />
        <Benefits />
        <Pricing />
        <Mission />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
