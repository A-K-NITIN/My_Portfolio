# NITIN A K — Glitch Art Portfolio

> *Controlled chaos producing beautiful results.*

---

## What Is This Theme?

The **Glitch Art** theme is built on a single philosophy:
**breaking things deliberately, beautifully, and on your own terms.**

In digital art, a glitch is what happens when a system corrupts — pixels displace, colors split, signals tear. But controlled glitch art takes that raw error and turns it into an aesthetic. It says: *I understand how this system breaks, because I built it.*

For a developer portfolio — especially one sitting at the intersection of **Machine Learning, Game Development, and Systems Programming** — this is the perfect metaphor. You break problems down. You find edge cases. You make C++ games with collision detection and Snake mechanics that handle boundary wraps. You are someone who understands how things fail, and uses that understanding to build things that don't.

**The portfolio doesn't look like a template. It looks like you.**

---

## Color Palette

Three colors. Three roles. One ratio.

| Role | Color Name | Hex Code | Ratio | Where It Lives |
|------|-----------|----------|-------|----------------|
| **Base** | Corrupt Black | `#080808` | 60% | All backgrounds, cards, panels |
| **Secondary** | Glitch Magenta | `#FF00FF` | 30% | Headings, borders, glitch layers, skill bars |
| **Accent** | Error Cyan | `#00FFFF` | 10% | Hover states, tags, terminal output, highlights |

### Why These Colors?

- **#080808 (Corrupt Black)** — Not pure black (`#000000`). The slight grey warmth makes it feel like a monitor that's been on for 12 hours. It breathes. Pure black feels dead; this feels *alive and dark.*

- **#FF00FF (Glitch Magenta)** — In RGB color models, magenta is the color you get when red and blue channels fire simultaneously with no green. It is literally a glitch color — it doesn't exist in a natural spectrum. It only exists in screens and errors. Perfect.

- **#00FFFF (Error Cyan)** — The complementary counterpart to magenta. In CRT monitors, cyan appears in data corruption artifacts. Together, magenta and cyan are the two signature colors of RGB channel separation — the core visual technique in glitch art.

---

## Design Philosophy — Section by Section

### Hero Section
The hero does not whisper. It screams.

Your name renders in **Bebas Neue** at up to 180px — massive, aggressive, architectural. Behind the solid text, two ghost layers (`glitch-layer-m` in magenta, `glitch-layer-c` in cyan) sit absolutely positioned. Every few seconds, they flash into view with `clip-path` slices that expose only horizontal bands of the name — like a corrupted video signal tearing through a frame. This is **RGB channel separation**, the foundational technique of glitch art.

The pre-text reads:
```
> SYSTEM ONLINE // PORTFOLIO_v1.0
```
This frames the entire experience: you are not a person presenting a CV. You are a **system initializing.**

---

### Static Noise + Scanlines
Two persistent layers run over the entire page at all times:

1. **Static Noise** — A subtle SVG noise texture (using `feTurbulence`) tiles across the background with a tiny CSS animation that shifts its position every frame. At 35% opacity, it creates the feeling of an old CRT or a digital signal that isn't quite stable. It is barely visible — but remove it, and the page suddenly feels like every other dark portfolio on the internet.

2. **Scanlines** — A `repeating-linear-gradient` creates horizontal lines 4px apart across the entire viewport. They sit at 8% opacity — again, barely there. But together with the noise, they create the unmistakable texture of **digital corruption rendered beautiful.**

---

### Navigation
The nav logo (`NAK`) carries a persistent micro-glitch. The `::after` pseudo-element holds a copy of the text in magenta, and a CSS animation fires every 4 seconds to briefly expose horizontal clip-path slices — making the logo flicker like a bad signal. Subtle. Memorable.

Nav links have a `> ` prefix in magenta that fades in on hover — like you're pointing at a terminal option with a cursor.

---

### About Section
Two columns: text on the left, stat cards on the right.

The stat cards use a **left-border accent** in magenta (3px wide) and translate right on hover — like a card sliding out of a corrupted frame. The numbers (7.82 CGPA, 100+ LeetCode, etc.) render in Bebas Neue at 36px — they are your stats as a character in a game.

---

### Education — Timeline
A vertical line runs down the left side of the section, built with a `linear-gradient` from magenta to cyan to transparent. Each education item has a glowing magenta dot on the line — like a data point on a chart. Cards slide right on hover. The vertical line makes the section feel like a **signal trace** — your learning represented as a continuous transmission.

---

### Experience — Mission Log
The internship card has a `MISSION COMPLETE` badge in the top-right corner — a nod to the gaming theme that runs under the surface of the glitch aesthetic. A top border gradient bleeds from cyan to transparent, like the card is receiving a transmission.

---

### Projects — Operations Executed
Each project card has a hover state that triggers a `titleGlitch` keyframe animation on the project title — the text jumps 3px in different directions and briefly flickers between cyan and magenta before settling. It feels like the project is *reacting* to you touching it.

The project year is shown as `[2024]` — bracketed, like a timestamp in a log file.

The tech stack tags shift from cyan-bordered to magenta-bordered on card hover — a subtle color-system inversion that reinforces the glitch concept.

---

### Skills — Capability Bars
Skills are loaded as groups (Programming, Web, Core Concepts, Data Science). Each skill has:
- A name and percentage
- A 3px-tall bar with a magenta-to-cyan gradient fill
- A `box-shadow` glow on the fill in magenta

The bars start at **0% width** and animate to their target percentage only when the section scrolls into view (via IntersectionObserver). This creates a **loading sequence** — your skills powering on as the visitor reaches them.

---

### Certifications — Achievements
Clean grid of cards. A `✓` checkmark appears in the top-right corner of each card on hover — the universal signal of *unlocked.* Simple, clean, satisfying.

---

### Coding Profile — Leaderboard
Cards that link directly to your profiles. They lift upward (-4px translateY) on hover with a magenta glow. The platform names are in Bebas Neue for weight. A `VISIT →` arrow sits bottom-right on each card.

---

### Contact — Open Channel
The right column features a **terminal box** styled as a shell session:
```bash
$ whoami
→ NITIN A K

$ cat status.txt
→ Open to internships & collaborations

$ ls skills/
→ C  C++  Python  MERN  DSA  ML

$ █
```
The blinking cursor (`█`) is live. It makes the page feel like a real system waiting for input.

Contact links slide right on hover with a cyan glow — like selecting a menu item in a terminal UI.

---

### Cursor Glow
A radial gradient follows your cursor across the page — a 200×200px soft magenta glow at 4% opacity. Barely there, but it makes the page feel *alive and aware of you.* It tracks with a 0.1s ease transition so it trails slightly, like a ghost.

---

### 3D Interactions & Deep Environment
The environment is not flat. It has depth.
- **Glitch Art Logo**: The navigation features a custom AI-generated abstract geometric glitch art logo with RGB channel separation hover effects.
- **3D Tilt Cards**: Project, Experience, and Stat cards react to your mouse position, rotating dynamically on the X and Y axes to face you.
- **Magnetic Elements**: Action buttons pull slightly toward your cursor when hovered.
- **Perspective Grid Background**: The canvas background renders an animated 3D perspective grid underneath the particle system.
- **Interactive Terminal**: The contact terminal responds to clicks, simulating an active command shell that initializes a connection.

---

## Typography

| Font | Role | Why |
|------|------|-----|
| **Bebas Neue** | Display / Hero / Titles | Tall, aggressive, architectural. The font of posters and warnings. |
| **Share Tech Mono** | Section tags, metadata, labels | Military-grade monospace. Feels like system output. |
| **Space Mono** | Body text, descriptions | Slightly retro monospace with personality. Readable but clearly technical. |

No Inter. No Roboto. No generic sans-serifs. Every font choice says: *this person works with systems.*

---

## How to Edit — The CONFIG Object

**Everything** about your portfolio content lives in one JavaScript object at the bottom of the HTML file, clearly marked:

```
// ===== PORTFOLIO CONFIG — EDIT HERE =====
```

### Adding a New Project
Find the `projects` array in CONFIG. Copy this block and fill it in:
```javascript
{
  year: "2025",
  title: "YOUR PROJECT NAME",
  description: "What it does, how you built it, what makes it interesting.",
  tags: ["Tech1", "Tech2", "Tech3"],
},
```

### Adding a New Certification
Find the `certifications` array:
```javascript
{ name: "Certification Name", platform: "Platform Name", year: "2025" },
```

### Adding a New Skill Group
Find the `skillGroups` array:
```javascript
{
  group: "Group Name",
  skills: [
    { name: "Skill Name", pct: 75 },   // pct = bar fill %, 0 to 100
  ],
},
```

### Updating Your Coding Profiles
Find `codingProfiles` and replace the `url` fields with your actual profile links.

### Updating Contact Links
Replace `github` and `linkedin` URLs in the CONFIG with your real URLs.

---

## File Structure

```
portfolio/
└── index.html          ← Everything lives here. One file. Zero dependencies.
```

No frameworks. No build tools. No `npm install`. Open `index.html` in any browser and it works. Host it on GitHub Pages, Netlify, or Vercel in under 2 minutes.

---

## Hosting (Free Options)

### GitHub Pages (Recommended)
1. Create a repo named `yourusername.github.io`
2. Upload `index.html`
3. Go to Settings → Pages → Deploy from main branch
4. Live at `https://yourusername.github.io`

### Netlify
1. Go to netlify.com → "Add new site" → "Deploy manually"
2. Drag and drop the `index.html` file
3. Live in 30 seconds with a free URL

---

## Performance Notes
- All fonts load from Google Fonts (CDN — fast)
- No JavaScript libraries — pure vanilla JS
- Animations use CSS `transform` and `opacity` — GPU accelerated
- IntersectionObserver used for scroll reveals — no scroll event listeners
- Single HTML file — one HTTP request to load the page

---

## Credits

Built for **NITIN A K** — B.E CSE (AIML), Sri Eshwar College of Engineering.

Theme: **Glitch Art** — *Controlled chaos producing beautiful results.*

> *"The glitch is not a failure of the system. It is the system showing you how it really works."*
