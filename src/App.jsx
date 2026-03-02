import { useState, useEffect, useRef } from "react";

function useTyping(words, speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx((c) => c + 1);
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx((w) => (w + 1) % words.length); setCharIdx(0); }
        else setCharIdx((c) => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return text;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const SKILLS = [
  { name: "Python", pct: 85, icon: "🐍", cat: "Language", color: "#3b82f6" },
  { name: "JavaScript", pct: 80, icon: "⚡", cat: "Language", color: "#facc15" },
  { name: "Flutter / Dart", pct: 75, icon: "📱", cat: "Mobile", color: "#06b6d4" },
  { name: "Java", pct: 70, icon: "☕", cat: "Language", color: "#f97316" },
  { name: "React", pct: 72, icon: "⚛️", cat: "Web", color: "#38bdf8" },
  { name: "MySQL / PHP", pct: 78, icon: "🗄️", cat: "Backend", color: "#a855f7" },
  { name: "C / C++", pct: 68, icon: "🔧", cat: "Language", color: "#6366f1" },
  { name: "AI / ML", pct: 65, icon: "🤖", cat: "AI", color: "#ec4899" },
];

const PROJECTS = [
  { title: "eBloodBank", desc: "Full-stack blood bank platform connecting donors with recipients, featuring real-time availability and hospital integration.", tags: ["PHP", "MySQL", "HTML", "CSS"], cat: "Web", emoji: "🩸", color: "#ef4444", accent: "rgba(239,68,68,0.15)" },
  { title: "SwiftStyle", desc: "AI-powered fashion recommendation app that suggests outfits based on user preferences, body type, and trending styles.", tags: ["Flutter", "Python", "AI"], cat: "Mobile", emoji: "👗", color: "#a855f7", accent: "rgba(168,85,247,0.15)" },
  { title: "WasteGuard", desc: "Intelligent waste classification system using image recognition to promote sustainable disposal practices.", tags: ["Python", "TensorFlow", "Flutter"], cat: "AI", emoji: "♻️", color: "#22c55e", accent: "rgba(34,197,94,0.15)" },
  { title: "Campus Connect", desc: "Social platform for university students to collaborate on projects, share resources, and connect across departments.", tags: ["React", "Node.js", "MongoDB"], cat: "Web", emoji: "🎓", color: "#3b82f6", accent: "rgba(59,130,246,0.15)" },
  { title: "NepalMaps AI", desc: "AI-powered geospatial analysis tool for mapping and predicting natural disaster risks in mountainous regions.", tags: ["Python", "ML", "GIS"], cat: "AI", emoji: "🗺️", color: "#f59e0b", accent: "rgba(245,158,11,0.15)" },
  { title: "FitTrack Mobile", desc: "Comprehensive fitness tracking app with workout planning, progress analytics, and social challenges.", tags: ["Flutter", "Firebase", "Dart"], cat: "Mobile", emoji: "💪", color: "#06b6d4", accent: "rgba(6,182,212,0.15)" },
];

const TIMELINE = [
  { year: "2024 – Now", title: "M.S. Computer Science", place: "East Texas A&M University, TX", desc: "Pursuing graduate studies with focus on AI/ML and software systems. Currently based in Lewisville, TX.", icon: "🎓", type: "edu" },
  { year: "2019 – 2024", title: "B.E. Software Engineering", place: "NCIT, Lalitpur, Nepal", desc: "Built three major projects in full-stack dev, mobile apps, and AI. Graduated with strong academic record.", icon: "💻", type: "edu" },
  { year: "2023", title: "Final Year Project Lead", place: "NCIT, Lalitpur", desc: "Led a team of 4 to build WasteGuard — an AI-powered waste classification system using image recognition.", icon: "🚀", type: "exp" },
  { year: "2017 – 2019", title: "Higher Secondary (Science)", place: "Prasadi Academy, Lalitpur", desc: "Completed +2 Science with distinction from the National Examination Board.", icon: "📚", type: "edu" },
];

const NAV = ["About", "Skills", "Projects", "Timeline", "Contact"];

const SOCIALS = [
  { label: "GitHub", icon: "⬡", href: "https://github.com/Manushi010" },
  { label: "LinkedIn", icon: "◈", href: "https://linkedin.com/in/manushi-paudel-20a080260" },
  { label: "Email", icon: "◉", href: "mailto:manushipaudel00@gmail.com" },
];

function ParticleCanvas({ darkMode }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.5 + 0.1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = darkMode ? `rgba(129,140,248,${p.opacity})` : `rgba(99,102,241,${p.opacity * 0.6})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = darkMode ? `rgba(129,140,248,${(1 - dist / 100) * 0.15})` : `rgba(99,102,241,${(1 - dist / 100) * 0.075})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [darkMode]);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none" }} />;
}

function CustomCursor({ darkMode }) {
  const cursorRef = useRef(null), trailRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 }), trailPos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let animId;
    const animate = () => {
      trailPos.current.x += (pos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (pos.current.y - trailPos.current.y) * 0.12;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      if (trailRef.current) trailRef.current.style.transform = `translate(${trailPos.current.x - 16}px, ${trailPos.current.y - 16}px)`;
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(animId); };
  }, []);
  const color = darkMode ? "#818cf8" : "#6366f1";
  return (
    <>
      <div ref={cursorRef} style={{ position: "fixed", top: 0, left: 0, width: 12, height: 12, background: color, borderRadius: "50%", pointerEvents: "none", zIndex: 9999, mixBlendMode: "screen" }} />
      <div ref={trailRef} style={{ position: "fixed", top: 0, left: 0, width: 32, height: 32, border: `1px solid ${color}`, borderRadius: "50%", pointerEvents: "none", zIndex: 9998, opacity: 0.5 }} />
    </>
  );
}

function SkillCard({ skill, visible, index, darkMode }) {
  const [hovered, setHovered] = useState(false);
  const delay = index * 0.08;
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.8)", transition: `all 0.5s ease ${delay}s`, background: hovered ? `linear-gradient(135deg, ${skill.color}22, ${skill.color}44)` : darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)", border: `1px solid ${hovered ? skill.color : darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}`, borderRadius: "1rem", padding: "1.5rem", cursor: "default", position: "relative", overflow: "hidden", boxShadow: hovered ? `0 0 30px ${skill.color}44` : "none" }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: `radial-gradient(circle at top right, ${skill.color}22, transparent)` }} />
      <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{skill.icon}</div>
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1rem", color: darkMode ? "#f1f5f9" : "#1e293b", marginBottom: "0.5rem" }}>{skill.name}</div>
      <div style={{ fontSize: "0.7rem", color: skill.color, marginBottom: "0.75rem", fontFamily: "monospace", letterSpacing: "0.1em" }}>{skill.cat.toUpperCase()}</div>
      <div style={{ background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)", borderRadius: "999px", height: "4px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: visible ? `${skill.pct}%` : "0%", background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`, borderRadius: "999px", transition: `width 1.2s ease ${delay + 0.3}s`, boxShadow: `0 0 10px ${skill.color}` }} />
      </div>
      <div style={{ textAlign: "right", marginTop: "0.4rem", fontFamily: "monospace", fontSize: "0.75rem", color: skill.color }}>{skill.pct}%</div>
    </div>
  );
}

function ProjectCard({ project, darkMode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? project.accent : darkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)", border: `1px solid ${hovered ? project.color + "88" : darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`, borderRadius: "1.25rem", padding: "1.75rem", cursor: "pointer", transition: "all 0.35s ease", transform: hovered ? "translateY(-6px)" : "none", boxShadow: hovered ? `0 20px 60px ${project.color}33` : "none", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: hovered ? `linear-gradient(90deg, transparent, ${project.color}, transparent)` : "transparent", transition: "all 0.35s" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        <span style={{ fontSize: "2.5rem", filter: hovered ? `drop-shadow(0 0 12px ${project.color})` : "none", transition: "filter 0.35s" }}>{project.emoji}</span>
        <span style={{ background: `${project.color}22`, border: `1px solid ${project.color}44`, color: project.color, padding: "0.2rem 0.75rem", borderRadius: "999px", fontSize: "0.7rem", fontFamily: "monospace", letterSpacing: "0.08em" }}>{project.cat}</span>
      </div>
      <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: darkMode ? "#f1f5f9" : "#1e293b", marginBottom: "0.75rem" }}>{project.title}</h3>
      <p style={{ color: darkMode ? "#64748b" : "#6b7280", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {project.tags.map((t) => <span key={t} style={{ background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`, color: darkMode ? "#94a3b8" : "#6b7280", padding: "0.2rem 0.6rem", borderRadius: "0.4rem", fontSize: "0.7rem", fontFamily: "monospace" }}>{t}</span>)}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const typedText = useTyping(["Software Engineer", "AI Enthusiast", "Mobile Developer", "Full-Stack Builder", "CS Graduate Student"], 90, 2000);
  const [aboutRef, aboutVisible] = useInView();
  const [skillsRef, skillsVisible] = useInView();
  const [projectsRef, projectsVisible] = useInView();
  const [timelineRef, timelineVisible] = useInView();
  const [contactRef, contactVisible] = useInView();
  useEffect(() => { setTimeout(() => setHeroLoaded(true), 300); }, []);
  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  const filtered = activeFilter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === activeFilter);
  const bg = darkMode ? { background: "#050814" } : { background: "#f0f4ff" };
  const textPrimary = darkMode ? "#f1f5f9" : "#1e293b";
  const textSecondary = darkMode ? "#64748b" : "#6b7280";
  const borderColor = darkMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const cardBg = darkMode ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.8)";
  const gx = (mousePos.x - 0.5) * 40, gy = (mousePos.y - 0.5) * 40;

  return (
    <div style={{ ...bg, width: "100vw", minHeight: "100vh", overflowX: "hidden", color: textPrimary, fontFamily: "'DM Sans', sans-serif", cursor: "none", transition: "background 0.4s ease, color 0.4s ease" }}>
      <ParticleCanvas darkMode={darkMode} />
      <CustomCursor darkMode={darkMode} />
      <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0, pointerEvents: "none", background: darkMode ? `radial-gradient(ellipse at ${50 + gx}% ${50 + gy}%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse at ${80 - gx}% ${20 + gy}%, rgba(168,85,247,0.08) 0%, transparent 50%)` : `radial-gradient(ellipse at ${50 + gx}% ${50 + gy}%, rgba(99,102,241,0.07) 0%, transparent 60%)`, transition: "background 0.1s ease" }} />

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: darkMode ? "rgba(5,8,20,0.8)" : "rgba(240,244,255,0.85)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${borderColor}`, padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1.4rem", letterSpacing: "0.05em" }}>
          <span style={{ color: "#818cf8" }}>M</span><span style={{ color: textPrimary }}>ANUSHI</span><span style={{ color: "#c084fc", marginLeft: "0.3rem" }}>_</span>
        </div>
        <ul style={{ display: "flex", gap: "0.25rem", listStyle: "none", alignItems: "center" }}>
          {NAV.map((n) => (
            <li key={n}><a href={`#${n.toLowerCase()}`} style={{ color: textSecondary, textDecoration: "none", padding: "0.5rem 1rem", fontSize: "0.85rem", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: "0.08em", borderRadius: "0.5rem", transition: "all 0.2s", display: "block" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#818cf8"; e.currentTarget.style.background = "rgba(129,140,248,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textSecondary; e.currentTarget.style.background = "transparent"; }}
            >{n}</a></li>
          ))}
          <li>
            <button onClick={() => setDarkMode(!darkMode)} style={{ background: "rgba(129,140,248,0.1)", border: "1px solid rgba(129,140,248,0.2)", color: "#818cf8", padding: "0.4rem 0.9rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.85rem", marginLeft: "0.75rem", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(129,140,248,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(129,140,248,0.1)"; }}
            >{darkMode ? "☀ LIGHT" : "◑ DARK"}</button>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, paddingTop: "64px" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: darkMode ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(129,140,248,0.015) 2px, rgba(129,140,248,0.015) 4px)" : "none", pointerEvents: "none" }} />
        <div style={{ textAlign: "center", padding: "2rem", maxWidth: "900px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", padding: "0.35rem 1rem", borderRadius: "999px", marginBottom: "2rem", opacity: heroLoaded ? 1 : 0, transition: "opacity 1s ease 0.2s" }}>
            <span style={{ width: 6, height: 6, background: "#22c55e", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ color: "#22c55e", fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.1em" }}>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "1rem", opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "none" : "translateY(30px)", transition: "all 0.9s ease 0.4s" }}>
            <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "clamp(3rem, 10vw, 7rem)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
              <span style={{ display: "block", background: "linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>MANUSHI</span>
              <span style={{ display: "block", color: textPrimary }}>PAUDEL</span>
            </h1>
          </div>
          <div style={{ height: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", opacity: heroLoaded ? 1 : 0, transition: "opacity 1s ease 0.7s" }}>
            <span style={{ fontFamily: "monospace", fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)", color: "#818cf8", letterSpacing: "0.05em" }}>&gt; {typedText}<span style={{ animation: "blink 1s infinite" }}>_</span></span>
          </div>
          <p style={{ color: textSecondary, fontSize: "clamp(0.9rem, 2vw, 1.1rem)", maxWidth: "550px", margin: "0 auto 3rem", lineHeight: 1.8, opacity: heroLoaded ? 1 : 0, transition: "opacity 1s ease 0.9s" }}>
            Crafting digital experiences at the intersection of elegant code and bold ideas.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", opacity: heroLoaded ? 1 : 0, transition: "opacity 1s ease 1.1s" }}>
            {[{ label: "VIEW WORK", href: "#projects", primary: true }, { label: "CONTACT ME", href: "#contact", primary: false }].map((btn) => (
              <a key={btn.label} href={btn.href} style={{ display: "inline-block", padding: "0.85rem 2rem", borderRadius: "0.75rem", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.1em", textDecoration: "none", transition: "all 0.3s ease", ...(btn.primary ? { background: "linear-gradient(135deg, #6366f1, #a855f7)", color: "white", boxShadow: "0 0 30px rgba(99,102,241,0.4)" } : { background: "transparent", color: darkMode ? "#818cf8" : "#6366f1", border: "1px solid rgba(129,140,248,0.4)" }) }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = btn.primary ? "0 0 50px rgba(99,102,241,0.6)" : "0 0 20px rgba(129,140,248,0.3)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = btn.primary ? "0 0 30px rgba(99,102,241,0.4)" : ""; }}
              >{btn.label}</a>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: heroLoaded ? 0.5 : 0, transition: "opacity 1s ease 1.5s" }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: textSecondary, letterSpacing: "0.15em" }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #818cf8, transparent)", animation: "slideDown 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ position: "relative", zIndex: 1 }}>
        <div ref={aboutRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "8rem 2rem", opacity: aboutVisible ? 1 : 0, transform: aboutVisible ? "none" : "translateY(50px)", transition: "all 0.9s ease" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "5rem", alignItems: "center" }}>
            <div>
              <div style={{ width: "100%", aspectRatio: "1", borderRadius: "2rem", background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))", border: "1px solid rgba(129,140,248,0.2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: darkMode ? "linear-gradient(rgba(129,140,248,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.05) 1px, transparent 1px)" : "linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div style={{ fontSize: "8rem", filter: "drop-shadow(0 0 40px rgba(129,140,248,0.6))", animation: "float 4s ease-in-out infinite" }}>👩‍💻</div>
                {["top-left","top-right","bottom-left","bottom-right"].map((pos) => (
                  <div key={pos} style={{ position: "absolute", [pos.includes("top")?"top":"bottom"]: "-1px", [pos.includes("left")?"left":"right"]: "-1px", width: 20, height: 20, borderTop: pos.includes("top")?"2px solid #818cf8":"none", borderBottom: pos.includes("bottom")?"2px solid #818cf8":"none", borderLeft: pos.includes("left")?"2px solid #818cf8":"none", borderRight: pos.includes("right")?"2px solid #818cf8":"none" }} />
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1.5rem" }}>
                {[["6+","Projects"],["5+","Languages"],["2019","Started"],["TX 🇺🇸","Based"]].map(([val, label]) => (
                  <div key={label} style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "1rem", padding: "1rem", textAlign: "center", backdropFilter: "blur(10px)" }}>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.5rem", fontWeight: 800, background: "linear-gradient(135deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{val}</div>
                    <div style={{ color: textSecondary, fontSize: "0.75rem", marginTop: "0.2rem" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#818cf8", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>// ABOUT.ME</p>
              <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, color: textPrimary, marginBottom: "1.5rem" }}>
                Building the<br /><span style={{ background: "linear-gradient(135deg, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>future, one</span><br />commit at a time
              </h2>
              <p style={{ color: textSecondary, lineHeight: 1.9, marginBottom: "1.25rem", fontSize: "0.95rem" }}>I'm a software engineer and CS graduate student passionate about building meaningful technology. Currently pursuing my M.S. at East Texas A&M, I bridge the gap between complex problems and elegant solutions.</p>
              <p style={{ color: textSecondary, lineHeight: 1.9, marginBottom: "2rem", fontSize: "0.95rem" }}>From AI-powered systems to mobile apps, I love exploring where code meets real-world impact — especially in sustainability and social good.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: cardBg, border: `1px solid ${borderColor}`, padding: "0.5rem 1rem", borderRadius: "0.6rem", fontSize: "0.8rem", color: textSecondary, backdropFilter: "blur(10px)" }}>
                  <span>🌏</span><span>Kathmandu → Lewisville, TX</span>
                </div>
                {[
                  { icon: "📧", label: "manushipaudel00@gmail.com", href: "mailto:manushipaudel00@gmail.com" },
                  { icon: "⬡", label: "github.com/Manushi010", href: "https://github.com/Manushi010" },
                  { icon: "◈", label: "LinkedIn", href: "https://linkedin.com/in/manushi-paudel-20a080260" },
                ].map(({ icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: cardBg, border: `1px solid ${borderColor}`, padding: "0.5rem 1rem", borderRadius: "0.6rem", fontSize: "0.8rem", color: textSecondary, backdropFilter: "blur(10px)", textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#818cf8"; e.currentTarget.style.borderColor = "rgba(129,140,248,0.35)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = textSecondary; e.currentTarget.style.borderColor = borderColor; }}
                  ><span>{icon}</span><span>{label}</span></a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${borderColor}`, borderBottom: `1px solid ${borderColor}`, background: darkMode ? "rgba(129,140,248,0.02)" : "rgba(99,102,241,0.02)" }}>
        <div ref={skillsRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "8rem 2rem", opacity: skillsVisible ? 1 : 0, transform: skillsVisible ? "none" : "translateY(40px)", transition: "all 0.9s ease" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#818cf8", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>// SKILL.SET</p>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: textPrimary, marginBottom: "3rem" }}>Tech Arsenal</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "3rem" }}>
            {SKILLS.map((s, i) => <SkillCard key={s.name} skill={s} visible={skillsVisible} index={i} darkMode={darkMode} />)}
          </div>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: textSecondary, marginBottom: "1rem", letterSpacing: "0.1em" }}>// SOFT.SKILLS + LANGUAGES</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {["Communication","Team Leadership","Adaptability","Time Management","Collaboration","English","Nepali","Hindi"].map((s, i) => (
                <span key={s} style={{ background: i < 5 ? "rgba(129,140,248,0.08)" : "rgba(192,132,252,0.08)", border: `1px solid ${i < 5 ? "rgba(129,140,248,0.25)" : "rgba(192,132,252,0.25)"}`, color: i < 5 ? "#818cf8" : "#c084fc", padding: "0.35rem 1rem", borderRadius: "999px", fontSize: "0.8rem", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ position: "relative", zIndex: 1 }}>
        <div ref={projectsRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "8rem 2rem", opacity: projectsVisible ? 1 : 0, transform: projectsVisible ? "none" : "translateY(40px)", transition: "all 0.9s ease" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#818cf8", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>// MY.BUILDS</p>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: textPrimary, marginBottom: "2.5rem" }}>Featured Projects</h2>
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
            {["All","Web","Mobile","AI"].map((f) => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ background: f === activeFilter ? "linear-gradient(135deg, #6366f1, #a855f7)" : "transparent", border: f === activeFilter ? "none" : `1px solid ${borderColor}`, color: f === activeFilter ? "white" : textSecondary, padding: "0.4rem 1.25rem", borderRadius: "999px", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.05em", transition: "all 0.2s", boxShadow: f === activeFilter ? "0 0 20px rgba(99,102,241,0.4)" : "none" }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {filtered.map((p) => <ProjectCard key={p.title} project={p} darkMode={darkMode} />)}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${borderColor}`, background: darkMode ? "rgba(129,140,248,0.02)" : "rgba(99,102,241,0.02)" }}>
        <div ref={timelineRef} style={{ maxWidth: 800, margin: "0 auto", padding: "8rem 2rem", opacity: timelineVisible ? 1 : 0, transform: timelineVisible ? "none" : "translateY(40px)", transition: "all 0.9s ease" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#818cf8", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>// MY.JOURNEY</p>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: textPrimary, marginBottom: "4rem" }}>Experience & Education</h2>
          <div style={{ position: "relative", paddingLeft: "3rem" }}>
            <div style={{ position: "absolute", left: "0.9rem", top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom, #818cf8, #c084fc, transparent)" }} />
            {TIMELINE.map((item, i) => (
              <div key={i} style={{ position: "relative", marginBottom: "2.5rem", opacity: timelineVisible ? 1 : 0, transform: timelineVisible ? "none" : "translateX(-30px)", transition: `all 0.6s ease ${i * 0.15}s` }}>
                <div style={{ position: "absolute", left: "-2.1rem", top: "1.2rem", width: "1.4rem", height: "1.4rem", borderRadius: "50%", background: item.type === "edu" ? "#818cf8" : "#c084fc", boxShadow: `0 0 20px ${item.type === "edu" ? "#818cf8" : "#c084fc"}88`, border: "2px solid", borderColor: darkMode ? "#050814" : "#f0f4ff" }} />
                <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: "1.25rem", padding: "1.75rem", backdropFilter: "blur(10px)", transition: "all 0.3s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = item.type === "edu" ? "rgba(129,140,248,0.4)" : "rgba(192,132,252,0.4)"; e.currentTarget.style.background = item.type === "edu" ? "rgba(129,140,248,0.05)" : "rgba(192,132,252,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = borderColor; e.currentTarget.style.background = cardBg; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, color: textPrimary, fontSize: "1.05rem" }}>{item.icon} {item.title}</h3>
                    <span style={{ background: item.type === "edu" ? "rgba(129,140,248,0.12)" : "rgba(192,132,252,0.12)", color: item.type === "edu" ? "#818cf8" : "#c084fc", padding: "0.2rem 0.8rem", borderRadius: "999px", fontSize: "0.7rem", fontFamily: "monospace", whiteSpace: "nowrap" }}>{item.year}</span>
                  </div>
                  <div style={{ color: item.type === "edu" ? "#818cf8" : "#c084fc", fontSize: "0.82rem", marginBottom: "0.6rem", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>{item.place}</div>
                  <p style={{ color: textSecondary, fontSize: "0.875rem", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ position: "relative", zIndex: 1, borderTop: `1px solid ${borderColor}` }}>
        <div ref={contactRef} style={{ maxWidth: 720, margin: "0 auto", padding: "8rem 2rem", opacity: contactVisible ? 1 : 0, transform: contactVisible ? "none" : "translateY(40px)", transition: "all 0.9s ease" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#818cf8", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>// LET'S.CONNECT</p>
          <h2 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 900, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: textPrimary, marginBottom: "1rem" }}>Get In Touch</h2>
          <p style={{ color: textSecondary, marginBottom: "3rem", lineHeight: 1.8 }}>Have a project idea, job opportunity, or just want to connect? I'd love to hear from you.</p>
          {sent ? (
            <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "1.5rem", padding: "3rem", textAlign: "center" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", animation: "float 3s ease-in-out infinite" }}>✅</div>
              <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1.3rem", color: "#22c55e" }}>Message received!</div>
              <div style={{ color: textSecondary, marginTop: "0.5rem", fontSize: "0.9rem" }}>I'll get back to you soon.</div>
            </div>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                {[{ key: "name", placeholder: "Your Name", type: "text" }, { key: "email", placeholder: "Email Address", type: "email" }].map((f) => (
                  <input key={f.key} type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    style={{ width: "100%", background: cardBg, border: `1px solid ${borderColor}`, color: textPrimary, padding: "0.85rem 1rem", borderRadius: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box", backdropFilter: "blur(10px)" }}
                    onFocus={(e) => { e.target.style.borderColor = "#818cf8"; e.target.style.boxShadow = "0 0 20px rgba(129,140,248,0.2)"; }}
                    onBlur={(e) => { e.target.style.borderColor = borderColor; e.target.style.boxShadow = "none"; }}
                  />
                ))}
              </div>
              <textarea placeholder="Your message..." rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ width: "100%", background: cardBg, border: `1px solid ${borderColor}`, color: textPrimary, padding: "0.85rem 1rem", borderRadius: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", outline: "none", resize: "vertical", marginBottom: "1.5rem", transition: "border-color 0.2s, box-shadow 0.2s", boxSizing: "border-box", backdropFilter: "blur(10px)" }}
                onFocus={(e) => { e.target.style.borderColor = "#818cf8"; e.target.style.boxShadow = "0 0 20px rgba(129,140,248,0.2)"; }}
                onBlur={(e) => { e.target.style.borderColor = borderColor; e.target.style.boxShadow = "none"; }}
              />
              <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
                style={{ width: "100%", background: "linear-gradient(135deg, #6366f1, #a855f7)", border: "none", color: "white", padding: "1rem 2.5rem", borderRadius: "0.75rem", cursor: "pointer", fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.08em", boxShadow: "0 0 30px rgba(99,102,241,0.4)", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(99,102,241,0.6)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 30px rgba(99,102,241,0.4)"; }}
              >SEND MESSAGE →</button>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${borderColor}`, padding: "3rem 2rem", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {SOCIALS.map(({ label, icon, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ color: textSecondary, textDecoration: "none", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.4rem", transition: "all 0.2s", fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, letterSpacing: "0.05em" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#818cf8"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = textSecondary; e.currentTarget.style.transform = ""; }}
            >{icon} {label}</a>
          ))}
        </div>
        <p style={{ color: darkMode ? "#1e293b" : "#94a3b8", fontSize: "0.78rem", fontFamily: "monospace", letterSpacing: "0.1em" }}>
          © 2025 MANUSHI PAUDEL · LEWISVILLE, TX
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        html, body, #root { width: 100%; min-height: 100%; margin: 0; background: #050814; overflow-x: hidden; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { cursor: none !important; }
        a, button { cursor: none !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #818cf8; border-radius: 999px; }
        textarea, input { color-scheme: dark; }
        input::placeholder, textarea::placeholder { color: #475569; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.4); } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes slideDown { 0% { opacity: 0; transform: scaleY(0); transform-origin: top; } 50% { opacity: 1; } 100% { opacity: 0; transform: scaleY(1); transform-origin: top; } }
        @media (max-width: 768px) {
          nav ul { display: none; }
          div[style*="grid-template-columns: 1fr 1.5fr"] { grid-template-columns: 1fr !important; gap: 2rem !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}