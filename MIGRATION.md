# B-Post EMS — Vite Migration

## What changed
- Removed in-browser Babel transpilation (was causing 500KB+ file size limit issues)
- Replaced CDN React/ReactDOM with npm packages (proper tree-shaking + minification)
- Replaced CDN Tailwind with PostCSS build (purges unused classes — huge CSS reduction)
- Leaflet and Html5QrcodeScanner remain as CDN globals (loaded in index.html)
- Build output: `dist/` (replaces single `app.html`)

## Setup

```bash
npm install
npm run dev        # local dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

## Deployment (Netlify)
Push to GitHub — Netlify auto-builds using `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist`

**Important**: In Netlify dashboard → Site settings → Build & deploy:
- Set Node version to 18+
- No env vars needed (API URL is hardcoded in src/App.jsx)

## URL change
Old: `bpost-employees.netlify.app/app.html`  
New: `bpost-employees.netlify.app/` (root)

The `[[redirects]]` rule in `netlify.toml` handles client-side routing.
If you need `/app.html` to keep working, add:
```toml
[[redirects]]
  from = "/app.html"
  to = "/"
  status = 301
```

## File structure
```
bpost-ems/
├── index.html          # Vite entry (PWA meta, CDN globals)
├── src/
│   ├── main.jsx        # React 18 createRoot mount
│   ├── App.jsx         # Main app (extracted from app.html)
│   └── index.css       # Tailwind + custom styles
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
└── .gitignore
```
