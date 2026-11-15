# Student Portfolio & Academic Management Website

A responsive, multi-page personal academic portfolio and student management platform built with semantic **HTML5**, modern **CSS3**, and vanilla **JavaScript (ES6+)**.

- **Student:** Abdulmaleek Mubaraq  
- **Institution:** MIVA Open University — *B.Sc. Software Engineering*  
- **Live Website:** https://maleek004.github.io/portfoliomv/  
- **Repository:** https://github.com/maleek004/portfoliomv  

---

## Tech Stack

- **HTML5:** Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), accessible forms, responsive tables, and native `<video>` multimedia.
- **CSS3:** External stylesheet (`assets/css/main.css`) using CSS Custom Properties, Flexbox, CSS Grid, Container Queries (`@container`), transitions, and mobile media queries.
- **JavaScript (ES6+):** Modular client-side logic (`assets/js/portfolio.js`) using arrays, higher-order functions (`.filter()`, `.map()`), DOM manipulation, `localStorage`, `WeakSet`, regex, and the Constraint Validation API.

---

## Site Architecture

| Page | File | Purpose & Key Features |
| :--- | :--- | :--- |
| **Homepage** | `index.html` | Student profile, welcome hero, biography grid, academic highlights, technical articles, and embedded HTML5 `<video>` walkthrough. |
| **About Me** | `about.html` | Educational background, career aspirations, responsive education/certifications `<table>`, categorized skills, hobbies, and Lightbox2 certificate gallery. |
| **Projects** | `projects.html` | 8 engineering & analytics projects with interactive JS category filtering (*All, Fabric, Power BI, Python*), embedded video walkthrough, and case-study pages. |
| **Academic Planner** | `planner.html` | Interactive JS task manager (add, complete/undo, delete, filter tasks, live progress bar, `localStorage` persistence) and weekly study timetable `<table>`. |
| **Contact** | `contact.html` | Accessible 4-field form with custom JS validation (non-empty checks, valid email format, digits-only phone number) and direct contact links. |

---

## JavaScript Highlights (`assets/js/portfolio.js`)

- **Active Navigation (`initNavigation`):** Detects the current route and applies `.active` and `aria-current="page"` dynamically.
- **Project Filtering (`initProjectsFilter`):** Filters `.project-card` elements by `data-category` and updates the visible project count.
- **Academic Planner (`initAcademicPlanner`):** Manages a `tasks` array of objects with XSS-safe DOM rendering (`document.createElement` + `textContent`) and `localStorage` persistence.
- **Form Validation (`initContactForm`):** Uses a `WeakSet` to defer field errors until interaction (`blur`), clears errors on `input`, validates email & digits-only phone (`/^\d+$/`), and syncs `aria-invalid` / `aria-describedby`.

---

## Project Structure

```text
├── index.html                 # Homepage
├── about.html                 # About Me & Education
├── projects.html              # Projects Showcase & Filter
├── planner.html               # Interactive Academic Planner
├── contact.html               # Validated Contact Form
├── data-youtubers.html        # Case Study: Data YouTubers Dashboard
├── product-analysis.html      # Case Study: Vendbridge Product Analytics
├── wwi-sales.html             # Case Study: WWI Retail ETL & Reporting
├── churn-analysis.html        # Case Study: PhoneNow Customer Churn
├── assets/
│   ├── css/main.css           # Primary external stylesheet
│   └── js/portfolio.js        # Custom interactive & validation logic
├── images/                    # Screenshots, avatar, certificates & linkedin-video.mp4
└── .nojekyll                  # GitHub Pages static serving configuration
```
