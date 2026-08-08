# Ezy Ibrahima Cherif — Portfolio Website

A personal portfolio website built for my university assignment, showcasing
who I am, what I study, the group projects I've worked on, and my journey so
far as a Computer Science & Engineering student at the Islamic University of
Technology (IUT), Bangladesh.

Live site: _add your GitHub Pages link here once deployed_
`https://ezy200546.github.io/<repo-name>/`

## What's in here

- **Who I am** — background, current studies, and personal growth story
- **Skills** — an honest list of what I currently know (C, C++, learning Java,
  DBMS fundamentals) with no invented proficiency percentages
- **Projects** — four group academic projects, each linking to its GitHub repo
- **Education timeline**, **leadership/community involvement**, and a small
  **"Beyond Code"** section for interests like football and cybersecurity
- **Dark/light theme toggle** (dark by default), saved in the browser

## Tech stack

Plain **HTML, CSS, and vanilla JavaScript** — no frameworks, no build step, no
backend. This keeps it simple to understand, easy to edit, and trivially
deployable on GitHub Pages.

The only external resources are Google Fonts (Space Grotesk, Inter,
JetBrains Mono), loaded via `<link>` tags in `index.html`. Everything else —
icons, the profile placeholder, and the favicon — is inline SVG, so nothing
else needs to load from a CDN.

## Project structure

```
.
├── index.html              # All page content and structure
├── style.css                # All styling, theming, and responsive rules
├── script.js                 # Theme toggle, nav, project data, animations
├── README.md
└── assets/
    ├── images/
    │   ├── profile.jpg                # Your profile photo
    │   ├── profile-placeholder.svg    # Fallback placeholder graphic
    │   └── README.txt
    └── icons/
        └── favicon.svg
```

## Running it locally

No installation needed. Either:

1. Double-click `index.html` to open it directly in a browser, or
2. Serve it locally for a closer match to how GitHub Pages will behave:
   ```bash
   # from inside the project folder
   python3 -m http.server 8000
   # then open http://localhost:8000
   ```

## Deploying with GitHub Pages

1. Create a new **public** GitHub repository (for example, `portfolio`).
2. Push this project's files to the repository's `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/Ezy200546/<your-repo-name>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Set the branch to `main` and the folder to `/ (root)`, then save.
6. GitHub will publish the site at:
   `https://ezy200546.github.io/<your-repo-name>/`
   (this can take a minute or two the first time).

Full guide: https://docs.github.com/en/pages/quickstart

## Adding your profile photo

1. Add your photo to `assets/images/` as `profile.jpg`.
2. In `index.html`, find the hero section and change:
   ```html
   <img id="profile-photo" src="assets/images/profile-placeholder.svg" ... />
   ```
   to:
   ```html
   <img id="profile-photo" src="assets/images/profile.jpg" ... />
   ```

## Adding a new project

All project content lives in one place: the `PROJECTS` array near the top of
`script.js`. To add a project, copy one of the existing objects and edit its
fields:

```js
{
  title: 'Your Project Name',
  categories: ['software'], // any of: 'software', 'hardware', 'academic'
  course: 'Course or context',
  description: 'A short, honest description of what it does and who built it.',
  tech: ['Language or tool'],
  group: true, // or false, if it was solo work
  status: 'Completed', // or 'In progress', etc.
  repo: 'https://github.com/Ezy200546/your-repo',
},
```

The page re-renders the project grid and filter buttons from this array
automatically — no HTML editing required.

## Adding future sections (certifications, research, internships, etc.)

The site is intentionally sectioned (`About`, `Skills`, `Projects`,
`Education`, `Journey`, `Leadership`, `Interests`, `Contact`) so new content
fits naturally:

- **New skills** → add a `<li class="tag">` inside the relevant `.tag-list`
  in the Skills section of `index.html`.
- **New education/certifications** → add a new `<li class="timeline-item">`
  inside the `<ol class="timeline">` in the Education section.
- **New leadership roles** → duplicate the `.leadership-card` block in the
  Leadership section.
- **Future research/publications** → these don't exist yet, so no section is
  faked for them. When they do, a new section can follow the same pattern as
  the others (`section-eyebrow`, `section-title`, then content).

## Notes on AI tool usage

This site was built with the help of Claude (Anthropic) as a coding
assistant, based on my own information, project list, and design
preferences. If your assignment requires it, list the tool name and a
summary/history of the prompts used separately, per your course's
submission instructions.

## Content honesty

Everything on this site reflects real information: real group projects,
real (in-progress) skills, and a real personal story. No awards,
certifications, internships, or experience have been invented. Sections
left thin (like research or certifications) are intentionally left that way
until there's something real to add.
