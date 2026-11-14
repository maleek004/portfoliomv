# Responsive Student Portfolio and Academic Management Website

**Student:** Abdulmaleek Mubaraq  
**Institution:** MIVA Open University  
**Program:** B.Sc. Software Engineering  

---

## Project Overview

This multi-page responsive website serves as a personal academic portfolio and interactive student management platform. Built with semantic **HTML5**, modern **CSS3** (Flexbox, CSS Grid, and Container Queries), and vanilla **JavaScript (ES6+)**, it showcases academic qualifications, software and data engineering projects, an interactive academic task planner, and a client-side validated contact form.

---

## Multi-Page Architecture

1. **Homepage (`index.html`)**
   - Student name, profile photograph (`images/avatar.jpg`), welcome message, brief biography, multi-page navigation sidebar, key highlights grid, featured video walkthrough (`images/linkedin-video.mp4`), and technical blog posts.
2. **About Me Page (`about.html`)**
   - Educational background at **MIVA Open University (B.Sc. Software Engineering)**, semantic responsive HTML `<table>` of qualifications and certifications, career aspirations, technical skills (`<ul>` lists and skill tags), hobbies & interests, and verified certificate gallery.
3. **Projects Page (`projects.html`)**
   - 8 engineering and data analytics projects with screenshots, descriptions, live case-study subpages (`data-youtubers.html`, `product-analysis.html`, `wwi-sales.html`, `churn-analysis.html`), embedded HTML5 `<video>` walkthrough for *The Data YouTubers Dashboard*, and dynamic JavaScript category filtering.
4. **Academic Planner Page (`planner.html`)**
   - Interactive JavaScript task management system allowing users to **add tasks**, **mark tasks as completed**, **delete tasks**, and **filter tasks** by status with live progress tracking and `localStorage` persistence, alongside a weekly academic study timetable (`<table>`).
5. **Contact Page (`contact.html`)**
   - Accessible contact form (**Name**, **Email Address**, **Phone Number**, **Message**) with custom JavaScript validation enforcing:
     - No field is empty
     - Valid email address format
     - Phone number contains only digits (`0–9`)
