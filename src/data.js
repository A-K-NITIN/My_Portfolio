// =====================================================
// PORTFOLIO CONFIG — EDIT ANYTHING BELOW THIS LINE
// Everything else in the codebase reads from here.
// =====================================================
export const D = {
  // ── BASIC INFO ──────────────────────────────────
  name:      "NITIN A K",
  nameShort: "NAK",
  tagline:   "AI/ML ENGINEER  ·  MERN DEV  ·  PROBLEM SOLVER",
  heroPre:   "SYSTEM ONLINE  //  PORTFOLIO_v2.0",
  bio:       "B.E CSE (AIML) student at Sri Eshwar College. I build intelligent systems, full-stack applications, and console games — always at the intersection of Machine Learning and real engineering.",

  // ── CONTACT ─────────────────────────────────────
  email:     "nitin.ak2024aiml@sece.ac.in",
  phone:     "6369719627",
  github:    "https://github.com/",
  linkedin:  "https://linkedin.com/in/",
  // TODO: Replace with your actual Google Drive resume link
  resumeUrl: "https://drive.google.com/your-resume-link-here",

  // ── HERO STATS (right side of hero) ────────────
  heroStats: [
    { val: "7.82",  lbl: "CGPA"               },
    { val: "100+",  lbl: "LeetCode Solved"    },
    { val: "1300+", lbl: "SkillRack Problems" },
  ],

  // ── ABOUT SECTION STAT CARDS ───────────────────
  aboutStats: [
    { val: "7.82",  lbl: "CGPA"           },
    { val: "100+",  lbl: "LeetCode"       },
    { val: "1300+", lbl: "SkillRack"      },
    { val: "10+",   lbl: "Certifications" },
  ],

  // ── EDUCATION ───────────────────────────────────
  // Add more objects to this array to add new entries
  education: [
    { deg: "B.E CSE (AIML)", school: "Sri Eshwar College of Engineering", score: "7.82 CGPA", yr: "2024–2028" },
    { deg: "HSC",            school: "Sri Chaitanya Techno School",        score: "83.2%",     yr: "2022–2024" },
    { deg: "SSLC",           school: "Sri Chaitanya Techno School",        score: "84.8%",     yr: "2021–2022" },
  ],

  // ── EXPERIENCE ──────────────────────────────────
  // Currently supports one primary experience. Add more to an array if needed.
  experience: {
    title:   "MERN Stack Developer Intern",
    company: "Better Tomorrow",
    period:  "Dec 2025 – Jan 2026",
    badge:   "MISSION COMPLETE",
    points: [
      "Built and deployed full-stack web applications using MongoDB, Express.js, React.js, Node.js (MERN Stack).",
      "Implemented authentication, CRUD operations, and RESTful APIs.",
      "Deployed the application on AWS (EC2 / Amplify) with basic server configuration.",
      "Used Git & GitHub for version control and collaboration.",
    ],
  },

  // ── PROJECTS ────────────────────────────────────
  // Add a new object block here to add a new project card
  projects: [
    {
      yr:   "2024",
      name: "Library Management",
      desc: "A Library Management System in C using file handling and data structures. Book operations: add, search, borrow, return, delete — with unique ID validation.",
      tags: ["C", "File Handling", "Data Structures", "CLI"],
      link: "#",
    },
    {
      yr:   "2025",
      name: "Snake Evolved",
      desc: "A C++ multi-mode Snake game using OOP and inheritance. Features real-time controls, collision detection, wrap-around Pac-Man mode, and position-swapping fruit.",
      tags: ["C++", "OOP", "Inheritance", "Console Game"],
      link: "#",
    },
    // ── TEMPLATE: Copy this block for a new project ──
    // {
    //   yr:   "2025",
    //   name: "YOUR PROJECT NAME",
    //   desc: "Short description of what it does and how.",
    //   tags: ["Tag1", "Tag2", "Tag3"],
    //   link: "#", // or a GitHub URL
    // },
  ],

  // ── SKILLS ──────────────────────────────────────
  // pct = bar fill percentage (0–100)
  // Add a new object to `skills` array, or add a new `group` block
  skillGroups: [
    { group: "Programming", skills: [
      { name: "C",          pct: 90 },
      { name: "C++",        pct: 85 },
      { name: "Python",     pct: 80 },
      { name: "Java",       pct: 50 },
      { name: "JavaScript", pct: 70 },
    ]},
    { group: "Web Technologies", skills: [
      { name: "HTML / CSS",  pct: 80 },
      { name: "React.js",    pct: 72 },
      { name: "Node.js",     pct: 70 },
      { name: "Express.js",  pct: 68 },
      { name: "MongoDB",     pct: 68 },
    ]},
    { group: "Core Concepts", skills: [
      { name: "DSA",         pct: 82 },
      { name: "OOP",         pct: 88 },
      { name: "RESTful APIs",pct: 72 },
      { name: "Git / GitHub",pct: 78 },
    ]},
    { group: "Data Science", skills: [
      { name: "Pandas",     pct: 65 },
      { name: "NumPy",      pct: 65 },
      { name: "Matplotlib", pct: 62 },
      { name: "AWS Basics", pct: 50 },
    ]},
  ],

  // ── CERTIFICATIONS ──────────────────────────────
  // Add a new line here to add a certification card
  certs: [
    { name: "C Programming Course (Hands-On)",  plat: "Skill Rack", yr: "2025" },
    { name: "C 50 Very Easy Challenges",         plat: "Skill Rack", yr: "2025" },
    { name: "C++ 50 Very Easy Challenges",       plat: "Skill Rack", yr: "2025" },
    { name: "Python3.x 50 Very Easy Challenges", plat: "Skill Rack", yr: "2025" },
    { name: "C Intro",                           plat: "Skill Rack", yr: "2025" },
    { name: "Introduction to Python",            plat: "Solo Learn", yr: "2025" },
    { name: "Introduction to Java",              plat: "Solo Learn", yr: "2025" },
  ],

  // ── CODING PROFILES ─────────────────────────────
  // Replace `url` with your real profile links
  codingProfiles: [
    { plat: "LeetCode",   stat: "Solved 100+ problems",                                 url: "https://leetcode.com/"    },
    { plat: "HackerRank", stat: "4★ C  |  3★ C++  |  2★ Java  |  2★ Python",           url: "https://hackerrank.com/"  },
    { plat: "SkillRack",  stat: "1300+ problems  |  10+ certs  |  290+ Bronzes",        url: "https://skillrack.com/"   },
  ],
};
