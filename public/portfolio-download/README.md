# Akaforonye Michael — Portfolio Website
### Complete Edit & Hosting Guide

---

## 📁 Folder Structure

```
portfolio-website/
│
├── index.html          ← The entire website (one file — open this in a browser)
│
├── images/             ← Put ALL your photos and project screenshots here
│   ├── your-photo.jpg          ← Your profile photo (About Me section)
│   ├── project1.jpg            ← Screenshot for Project Card 1
│   ├── project2.jpg            ← Screenshot for Project Card 2
│   └── (add more as needed)
│
└── README.md           ← This guide
```

> **No build tools, no Node.js, no terminal needed.**
> Just open `index.html` in any browser — it works immediately.

---

## 🖼️ Step 1 — Add Your Profile Photo

1. Save your photo as `your-photo.jpg` inside the `images/` folder.
2. Open `index.html` in a text editor (Notepad, VS Code, etc.).
3. Find this line (search with **Ctrl+F** → `your-photo.jpg`):

```html
<img
  src="images/your-photo.jpg"
  alt="Akaforonye Michael — profile photo"
  class="about-photo"
/>
```

4. The filename in `src` must **exactly match** your saved file name.
   - `your-photo.jpg` ✅
   - `Your Photo.JPG` ❌ (wrong case / spaces)

**Want a different size?** Find the `.about-photo` CSS rule and adjust:
```css
.about-photo {
  width: 180px;   /* ← change this */
  height: 180px;  /* ← change this */
  border-radius: 50%;  /* remove this line for square/rounded-square */
}
```

---

## 🗂️ Step 2 — Edit Your Personal Information

All editable content is marked with `<!-- EDIT: -->` comments in `index.html`.

### Name & Title (appears in sidebar, hero, and footer)
Search for your name and replace it:
```
Find:    Akaforonye
Replace: Your First Name

Find:    Michael
Replace: Your Last Name
```

### Hero Tagline
```html
<!-- Around line 190 -->
<p class="hero-subtitle">Data Analyst &nbsp;|&nbsp; Petroleum Engineer</p>
```

### Hero Description
```html
<p class="hero-desc">
  Transforming complex data into clear, actionable insights.
  Skilled in Excel, SQL, Python &amp; Power BI.
</p>
```

### Bio Paragraphs (About Me section)
Find the three `<p>` tags under `<!-- EDIT: Your bio paragraphs -->` and rewrite them.

### Skill Tags (the pill badges under your bio)
```html
<div class="tags">
  <span class="tag">Excel</span>   <!-- Edit or delete any tag -->
  <span class="tag">SQL</span>
  <!-- Add more: <span class="tag">Tableau</span> -->
</div>
```

### Contact Details
Search for these and replace with your real information:
| Placeholder | What to change |
|---|---|
| `New-site, Community Rd, Satellite Town, Lagos` | Your address |
| `ucheson2003@gmail.com` | Your email (update both `href` and visible text) |
| `+234 8164032654` | Your phone (update `href="tel:..."` too) |
| Social `href` URLs | Your LinkedIn / GitHub / Twitter links |

---

## 💼 Step 3 — Add / Edit Project Cards

Each project card follows this exact template. Find `<!-- PASTE additional project-card blocks here -->` in `index.html` and insert a copy:

```html
<div class="project-card">

  <!-- 1. Image links to your project URL in a new tab -->
  <a href="https://your-project-url.com" target="_blank" rel="noopener noreferrer" class="project-img-link">
    <img
      src="images/project3.jpg"
      alt="My Project Name — screenshot"
      class="project-img"
    />
  </a>

  <div class="project-body">

    <!-- 2. Project title -->
    <h3 class="project-title">My Project Name</h3>

    <!-- 3. Short description (2–3 sentences is ideal) -->
    <p class="project-desc">
      Describe what the project does, what problem it solves,
      and what tools/technologies you used to build it.
    </p>

    <div class="project-footer">

      <!-- 4. Technology tags (add/remove as needed) -->
      <div class="project-tags-row">
        <span class="project-tag">Python</span>
        <span class="project-tag">SQL</span>
        <span class="project-tag">Power BI</span>
      </div>

      <!-- 5. "View Project" button -->
      <a href="https://your-project-url.com" target="_blank" rel="noopener noreferrer" class="project-link">
        View Project <i class="fas fa-arrow-up-right-from-square"></i>
      </a>

    </div>
  </div>
</div>
```

**Tips:**
- Save screenshots as **JPG or PNG**, ideally **800×400 px** (landscape) for best results.
- Keep descriptions concise — 2 to 3 sentences works best in the card layout.
- Use GitHub links, live demo URLs, or Google Drive PDF links for `href`.

---

## 🧑‍💼 Step 4 — Add / Edit Experience Entries

Each experience entry is a `.timeline-item` block. To add a new one, copy this template and paste it inside `<div class="timeline">`:

```html
<div class="timeline-item">
  <div class="exp-card">
    <div class="exp-header">
      <!-- Icon gradient options: g-blue2  g-teal  g-purple  g-orange  g-green  g-cyan -->
      <!-- Icon options: search "Font Awesome 6" for icon names -->
      <div class="exp-icon-wrap g-purple"><i class="fas fa-briefcase"></i></div>
      <div>
        <p class="exp-role">Your Job Title</p>
        <p class="exp-company">Company Name</p>
      </div>
    </div>
    <div class="exp-meta">
      <span><i class="fas fa-calendar"></i> Jan 2023 – Dec 2023</span>
      <span><i class="fas fa-map-marker-alt"></i> City, Country</span>
    </div>
    <ul class="exp-points">
      <li>
        <span class="chevron"><i class="fas fa-chevron-right"></i></span>
        First bullet point describing your achievement or responsibility.
      </li>
      <li>
        <span class="chevron"><i class="fas fa-chevron-right"></i></span>
        Second bullet point.
      </li>
      <li>
        <span class="chevron"><i class="fas fa-chevron-right"></i></span>
        Third bullet point.
      </li>
    </ul>
  </div>
  <div class="timeline-dot"><div class="timeline-dot-inner"></div></div>
  <div class="timeline-spacer"></div>
</div>
```

> **Timeline alternating:** Entries automatically alternate left/right thanks to `timeline-item:nth-child(even)`.

---

## 🎓 Step 5 — Add / Edit Education Entries

Find the education cards in the About section. Copy this block to add a new one:

```html
<div class="edu-card">
  <div class="edu-card-inner">
    <!-- Icon options: fa-graduation-cap  fa-laptop-code  fa-certificate  fa-school -->
    <div class="edu-icon"><i class="fas fa-certificate"></i></div>
    <div>
      <p class="edu-degree">Your Degree or Certificate Name</p>
      <p class="edu-inst">Institution Name</p>
      <p class="edu-period"><i class="fas fa-calendar-alt"></i> Jan 2022 – Dec 2022</p>
    </div>
  </div>
</div>
```

---

## 🎨 Step 6 — Customise Colours

All colours use CSS variables defined near the top of the `<style>` block. The primary accent colour is **cyan (`#22d3ee`)** with blue (`#2563eb`) and purple (`#a855f7`) accents.

To change the accent colour, do a **Find & Replace** across the whole file:

| Find | Replace with | Effect |
|---|---|---|
| `#22d3ee` | `#f59e0b` | Changes cyan → amber |
| `#06b6d4` | `#f59e0b` | Secondary cyan → amber |
| `#2563eb` | `#d97706` | Blue accent → dark amber |

---

## 🌐 Step 7 — Host Your Website (Free Options)

### Option A — GitHub Pages (Recommended, free forever)
1. Create a free account at [github.com](https://github.com)
2. Click **New repository** → name it `your-username.github.io`
3. Upload `index.html` and the `images/` folder
4. Go to **Settings → Pages → Source → main branch**
5. Your site is live at `https://your-username.github.io` within 2 minutes ✅

### Option B — Netlify (Drag & Drop, free)
1. Go to [netlify.com](https://netlify.com) → Sign up free
2. Drag and drop your entire `portfolio-website/` folder onto the Netlify dashboard
3. Live URL is generated instantly (e.g. `https://random-name.netlify.app`) ✅
4. You can set a custom domain later

### Option C — Vercel (free)
1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New Project → Upload**
3. Upload your folder → Deploy ✅

### Option D — Shared Hosting (cPanel)
1. Log into your hosting control panel → **File Manager**
2. Navigate to `public_html/`
3. Upload `index.html` and the `images/` folder
4. Your site is live at your domain ✅

---

## 📧 Step 8 — Make the Contact Form Actually Send Emails

The contact form currently shows a success message but **does not send a real email** (no back-end). To make it functional:

### Free option — Formspree
1. Go to [formspree.io](https://formspree.io) → Sign up free
2. Create a new form → copy your form endpoint URL
3. In `index.html`, find the `<form>` tag and update it:

```html
<!-- Before -->
<form id="contact-form" onsubmit="handleSubmit(event)">

<!-- After (replace YOUR_FORM_ID with your Formspree ID) -->
<form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

4. Remove the `onsubmit="handleSubmit(event)"` attribute — Formspree handles the redirect.

---

## 🔍 Quick Reference — Common Edits

| What to change | Search for this text |
|---|---|
| Page tab title | `<title>` |
| Your name (sidebar) | `sidebar-name` |
| Your role (sidebar) | `sidebar-role` |
| Hero name | `hero-name` |
| Hero subtitle | `hero-subtitle` |
| Hero description | `hero-desc` |
| Profile photo | `your-photo.jpg` |
| Bio paragraphs | `about-text` |
| Skill tags | `class="tags"` |
| Education entries | `edu-card` |
| Experience entries | `timeline-item` |
| Projects | `project-card` |
| Email address | `ucheson2003@gmail.com` |
| Phone number | `+234 8164032654` |
| LinkedIn URL | `linkedin.com/in/` |
| GitHub URL | `Rolandakason` |
| Footer name | `footer-copy` |

---

## 🛠️ Recommended Free Tools

| Tool | Purpose | Link |
|---|---|---|
| **VS Code** | Best free code editor | [code.visualstudio.com](https://code.visualstudio.com) |
| **Font Awesome** | Find icon names | [fontawesome.com/icons](https://fontawesome.com/icons) |
| **Squoosh** | Compress images before uploading | [squoosh.app](https://squoosh.app) |
| **Unsplash** | Free stock photos for projects | [unsplash.com](https://unsplash.com) |
| **Formspree** | Free contact form backend | [formspree.io](https://formspree.io) |
| **Netlify** | Free drag-and-drop hosting | [netlify.com](https://netlify.com) |

---

## ❓ Troubleshooting

**Q: My photo isn't showing.**
A: Check that the filename in `src="images/..."` exactly matches the file in the `images/` folder (including lowercase/uppercase). Also make sure the image is actually inside the `images/` folder, not somewhere else.

**Q: Icons aren't showing (I see empty boxes).**
A: You need an internet connection for Font Awesome to load from the CDN. If you need to work offline, download Font Awesome locally from [fontawesome.com](https://fontawesome.com/download).

**Q: The sidebar doesn't slide in on mobile.**
A: Make sure JavaScript is enabled in your browser and there are no errors in the browser console (press F12 to check).

**Q: I want to add a Google Analytics tracking code.**
A: Paste your `<script async src="https://www.googletagmanager.com/gtag/js?..."></script>` snippet just before the closing `</head>` tag.

---

*Built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no dependencies.*
*Font Awesome 6.5 · Google Fonts (Inter) · © Akaforonye Michael*
