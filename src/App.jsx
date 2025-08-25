import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Moon,
  Sun,
  ArrowUpRight,
  Send
} from "lucide-react";
import "./App.css"

/***************************
  Abraham's Portfolio
  - Dark/Light mode toggle (persisted)
  - Framer Motion animations
  - Responsive, modern UI with Tailwind
  - Single-file React component for easy drop-in
***************************/

/******** Theme Hook ********/
function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)");
    const next = stored ?? (prefersDark?.matches ? "dark" : "light");
    setTheme(next);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return { theme, toggle };
}


/******** Motion Variants ********/
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

/******** Data ********/
const PROFILE = {
  name: "Expensive Code",
  title: "Junior Software Developer",
  tagline: "Make your dream come to life",
  email: "abrahamalejolowo@gmail.com",
  phone: "08136122120",
  location: "Ilorin, Kwara State, Nigeria",
  github: "https://github.com/Abrahamalejolowo",
  linkedin: "https://linkedin.com/in/abraham-alejolowo-b7ab97319",
  resumeUrl: "https://flowcv.com/resume/9t5vpdwq8sac", 
};

const SKILLS = [
  {
    group: "Frontend",
    items: ["HTML", "CSS","Tailwind CSS", "JavaScript", "React.js", "TypeScript","React Native"],
  },
  { group: "Backend & Databases", items: ["Node.js", "Python", "Firebase","Mongo db","Express"] },
  { group: "Security", items: ["JWT Authentication", "bcrypt"] },
  { group: "Tools", items: ["Git", "GitHub", "Vercel", "Web3.js", "Figma"] },
  {
    group: "Soft Skills",
    items: [
      "Problem‑solving",
      "Creativity",
      "Communication",
      "Critical Thinking",
      "System Design",
    ],
  },
];


const PROJECTS = [
  {
    name: "Listify — To-Do List App",
    img: "src/assets/listify .png",
    description:
      "A feature-rich task manager with intuitive UX, syncing, reminders, and secure auth.",
    highlights: [
      "Clean, responsive UI",
      "Local + cloud syncing",
      "Task prioritization & reminders",
      "Firebase auth (JWT)",
    ],
    tech: ["React", "Tailwind CSS", "Firebase", "Vercel"],
    live: "https://listify-gilt.vercel.app",
    repo: "https://github.com/Abrahamalejolowo/react-project",
  },
  {
    name: "MASA Web Application (E-commerce)",
    img: "src/assets/Misa.png",
    description:
      "Online store for skincare & perfume — product catalog, search, filters, payments.",
    highlights: ["API integration", "Add-to-cart", "Search & filtering", "Performance"],
    tech: ["React", "TypeScript", "REST APIs"],
    repo: "https://github.com/Abrahamalejolowo/react-project",
  },
  {
    name: "NFT Marketplace (Web3)",
    img: "src/assets/NFT.png",
    description:
      "Secure marketplace for minting and trading NFTs with wallet-based auth.",
    highlights: ["Smart contracts", "ETH & Polygon", "Lazy minting"],
    tech: ["React", "Web3.js", "MetaMask", "Firebase"],
    repo: "https://github.com/Abrahamalejolowo",
  },
  {
    name: "David Sax Website",
    img: "src/assets/David Sax.png",
    description:
      "Personal portfolio website for David Sax, featuring responsive layouts, accessibility, and SEO best practices.",
    highlights: ["Responsive UI", "SEO optimization", "Accessibility", "Cross-browser support"],
    tech: ["React", "Tailwind CSS"],
    repo: "https://github.com/Abrahamalejolowo",
  },
];


const EXPERIENCE = [
  {
    role: "Web Developer Intern",
    org: "Aristiec, India",
    period: "April 2025 – July 2025",
    bullets: [
      "Implemented product catalog (search, filter, add‑to‑cart)",
      "Integrated REST APIs for auth, product & payments",
      "Improved performance and mobile responsiveness",
      "Supported testing, debugging, and stability improvements",
    ],
  },
];



const VALUES = [
  { title: "What I Value", items: ["Integrity", "Continuous Learning", "Helping Others"] },
  {
    title: "Passions",
    items: ["Cybersecurity", "Web Development", "Product Design & Management"],
  },
  {
    title: "Human Side",
    items: ["I enjoy music", "I like quiet focus time", "I founded a small fashion e‑commerce app"],
  },
];

/******** UI Helpers ********/
function Section({ id, title, children, subtitle }) {
  return (
    <section id={id} className="scroll-mt-24 py-10 md:py-10">
      <motion.div
        className="mx-auto max-w-6xl px-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={fadeUp} className="mt-2 text-gray-600 dark:text-gray-300 max-w-3xl">
            {subtitle}
          </motion.p>
        )}
        <motion.div variants={fadeUp} className="mt-8">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1 text-sm text-gray-700 dark:text-gray-200">
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div
      variants={scaleIn}
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur p-5 shadow-sm hover:shadow-md transition-shadow ${className}`}
      whileHover={{ translateY: -2 }}
    >
      {children}
    </motion.div>
  );
}

function LinkPill({ href, children, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {children}
      <span className="sr-only">{label}</span>
    </a>
  );
  
}
// ****Content****
 const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    try {
      const res = await fetch("https://formspree.io/f/mkgvwbbl", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        alert(
          ` Thanks, ${payload.name || "there"}! I’ll get back to you at ${
            payload.email || "your email"
          } or ${payload.phone}.`
        );
        form.reset();
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      alert("Network error. Please try again later.");
      console.error(err);
    }
  };

export default function Portfolio() {
  const { theme, toggle } = useTheme();
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen font-[hacker] animated-bg text-gray-900 dark:text-gray-100">
      {/* NAVBAR */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-gray-950/60 border-b border-gray-200/60 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">Expensive Code</a>
          <nav className="hidden md:flex items-center gap-1 text-sm">
            {[
              ["About", "#about"],
              ["Skills", "#skills"],
              ["Projects", "#projects"],
              ["Experience", "#experience"],
              ["Values", "#values"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={PROFILE.resumeUrl}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              download
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </a>
            <button
              aria-label="Toggle theme"
              onClick={toggle}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="pt-16 md:pt-24">
        <motion.div
          className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-center"
          initial="hidden"
          animate="show"
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-800 px-3 py-1 text-xs md:text-sm mb-4">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Open to jr software dev  role Full stack Dev role</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight">
              {PROFILE.name}
            </h1>
            <p className="mt-3 text-lg md:text-xl text-gray-600 dark:text-gray-300">
              {PROFILE.title} — {PROFILE.tagline}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <LinkPill href={PROFILE.github} label="GitHub">
                <Github className="w-4 h-4" /> <span>GitHub</span>
              </LinkPill>
              <LinkPill href={PROFILE.linkedin} label="LinkedIn">
                <Linkedin className="w-4 h-4" /> <span>LinkedIn</span>
              </LinkPill>
              <LinkPill href={`mailto:${PROFILE.email}`} label="Email">
                <Mail className="w-4 h-4" /> <span>Email</span>
              </LinkPill>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="inline-flex items-center gap-2">
                <Phone className="w-4 h-4" /> {PROFILE.phone}
              </div>
              <div className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {PROFILE.location}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-5 py-2.5 text-sm font-medium hover:opacity-90"
              >
                View Projects <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={PROFILE.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-700 px-5 py-2.5 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </motion.div>

          <motion.div variants={scaleIn} className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              {SKILLS.slice(0, 4).map((group) => (
                <div key={group.group}>
                  <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{group.group}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.slice(0, 6).map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
              Security‑minded: JWT • bcrypt • Perf & accessibility focused
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <Section
        id="about"
        title="About Me"
        subtitle="I’m Abraham Samuel Alejolowo, an outcome-focused developer with 2 years of experience designing, developing, and deploying high-quality web applications. I care deeply about clean UX, performance, and security."
      >
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <p className="leading-relaxed text-gray-700 dark:text-gray-200">
              I build digital experiences that are fast, accessible and secure. I enjoy translating ideas into scalable software, collaborating with designers, and iterating quickly. Currently exploring deeper into cybersecurity and product thinking.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Integrity", "Continuous Learning", "Helping Others"].map((v) => (
                <Chip key={v}>{v}</Chip>
              ))}
            </div>
          </Card>
          <Card>
            <ul className="space-y-2 text-gray-700 dark:text-gray-200 list-disc pl-5">
              <li>Strong critical thinking and system design mindset</li>
              <li>Comfortable across the stack (React/TypeScript → Node/Firebase)</li>
              <li>Founder mindset — built a small fashion e‑commerce app</li>
              <li>Enjoys music and deep‑work sessions</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {SKILLS.map((group) => (
            <Card key={group.group}>
              <h3 className="font-semibold mb-2">{group.group}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </Card>
          ))}
        </motion.div>
      </Section>

      {/* PROJECTS */}
     <Section id="projects" title="Projects" subtitle="A few things I’ve worked on recently.">
  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    className="grid md:grid-cols-2 gap-5"
  >
    {PROJECTS.map((p) => (
      <Card key={p.name}>
        {/* Project Image */}
        {p.img && (
          <img
            src={p.img}
            alt={p.name}
            className="rounded-xl w-full h-40 object-cover mb-3 border border-gray-200 dark:border-gray-700"
          />
        )}

        {/* Title + Description */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
          </div>
        </div>

        {/* Highlights */}
        {p.highlights && (
          <ul className="mt-3 space-y-1 text-sm list-disc pl-5 text-gray-700 dark:text-gray-200">
            {p.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        {/* Tech stack */}
        {p.tech && (
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        )}

        {/* Links */}
        {(p.live || p.repo) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {p.live && (
              <a
                href={p.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ExternalLink className="w-4 h-4" /> Live
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 dark:border-gray-700 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Github className="w-4 h-4" /> Code
              </a>
            )}
          </div>
        )}
      </Card>
    ))}
  </motion.div>

  {/* Link to see more projects */}
  <LinkPill href={PROFILE.github} label="GitHub">
    <Github className="w-4 h-4" /> <span>See more</span>
  </LinkPill>
</Section>


      {/* EXPERIENCE */}
      <Section id="experience" title="Experience">
        <div className="grid md:grid-cols-2 gap-5">
          {EXPERIENCE.map((e) => (
            <Card key={e.role}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{e.role} — {e.org}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{e.period}</span>
              </div>
              <ul className="mt-2 space-y-1 list-disc pl-5 text-gray-700 dark:text-gray-200">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Card>
          ))}
        
        </div>
      </Section>

 
      {/* VALUES */}
      <Section id="values" title="Beyond Code" subtitle="What drives me and how I work with others.">
        <div className="grid md:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <Card key={v.title}>
              <h3 className="font-semibold mb-2">{v.title}</h3>
              <div className="flex flex-wrap gap-2">
                {v.items.map((i) => (
                  <Chip key={i}>{i}</Chip>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
       <Section id="contact" title="Contact" subtitle="Let’s build something impactful together.">
      <Card className="max-w-3xl mx-auto">
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                name="name"
                required
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 
                           bg-white dark:bg-gray-900 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Phone</label>
              <input
                name="phone"
                type="tel"
                required
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 
                           bg-white dark:bg-gray-900 px-3 py-2"
              />
            </div>
          </div>
          <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 
                           bg-white dark:bg-gray-900 px-3 py-2"
              />
            </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-900 px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white 
                       dark:bg-white dark:text-gray-900 px-5 py-2.5 text-sm font-medium 
                       hover:opacity-90"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </form>
      </Card>
    </Section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600 dark:text-gray-400">
          <span>© {year} {PROFILE.name}. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <a href={PROFILE.github} className="hover:underline">GitHub</a>
            <a href={PROFILE.linkedin} className="hover:underline">LinkedIn</a>
            <a href={`mailto:${PROFILE.email}`} className="hover:underline">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
