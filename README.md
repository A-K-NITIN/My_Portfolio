# NITIN A K — Portfolio v2.0

> A cyberpunk-aesthetic developer portfolio built with React + Vite.  
> Monochrome neon design with glitch effects, oscilloscope signals, and fluid animations.

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Vanilla CSS (custom design system) |
| Animation | Framer Motion |
| Fonts | Google Fonts — Rajdhani, Share Tech Mono, Inter |

---

## ✦ Features

- **Full single-page portfolio** — Hero, About, Education, Experience, Projects, Skills, Certifications, Coding Profiles, Contact
- **Cyberpunk / dark-neon aesthetic** — magenta & cyan palette, glitch text animations, scanline overlays
- **Oscilloscope signal visualizer** — animated canvas in the Contact section
- **Glitch click bursts** — every click triggers a neon word explosion
- **Smooth scroll spy** — active nav link tracks current section
- **Resume download button** — links directly to Google Drive PDF
- **Fully data-driven** — all content lives in `src/data.js`, zero code changes needed for updates

---

## ✦ Project Structure

```
Portfolio/
├── public/               # Static assets
├── src/
│   ├── components/
│   │   ├── sections/     # One component per portfolio section
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── CodingProfiles.jsx
│   │   │   └── Contact.jsx
│   │   └── utils.jsx     # Shared utilities (FadeUp, SectionHead)
│   ├── data.js           # ← ALL CONTENT LIVES HERE
│   ├── index.css         # Full design system + component styles
│   ├── App.jsx           # Root layout + nav + scroll spy
│   └── main.jsx          # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## ✦ Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## ✦ Customizing Content

**All portfolio data is centralized in [`src/data.js`](./src/data.js).**  
Edit that single file to update:

- Personal info, bio, tagline
- Contact links (email, phone, GitHub, LinkedIn)
- Resume Google Drive link (`resumeUrl`)
- Hero stats & about stats
- Education, Experience, Projects
- Skills, Certifications, Coding Profiles

---

## ✦ Adding Your Resume Link

In `src/data.js`, update this line:

```js
resumeUrl: "https://drive.google.com/your-resume-link-here",
```

Make sure the Drive file is set to **"Anyone with the link can view"**.

---

## ✦ Deployment

This project builds to a static bundle — deploy anywhere:

- **Vercel** — `npm run build` → connect repo
- **Netlify** — drag & drop the `dist/` folder
- **GitHub Pages** — use `vite-plugin-gh-pages` or manual deploy

---

## ✦ License

MIT — feel free to fork and customize.
