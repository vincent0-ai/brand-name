# EchoWithin — static landing page

This repository contains a minimal, production-ready, static landing page for EchoWithin — a personal digital lab for experiments, tools, and notes.

## What’s included

- `index.html` — main landing page with hero, projects, about, lab notes, socials, and footer
- `css/styles.css` — theme-first styles (dark-first), variables, and micro-interactions
- `js/main.js` — small data-driven script that renders projects, notes, theme toggle, and micro-interactions

## Visual decisions

- Color palette: deep indigo and charcoal backgrounds with off-white accents.
- Typography: Inter for a clean, readable UI with a monospaced accent for code snippets.
- Layout: Bootstrap grid for responsive, fast layout implementation.
- Interaction: Minimal, purposeful animations (hover lift, reveal, blinking cursor) implemented in vanilla JS and CSS.

## Copy highlights

Hero: “A personal space for experiments, ideas, and digital tools.”

About: Brief, reflective, and non-resume focused — emphasizes curiosity and experimentation.

## How to add or update projects

1. Open `js/main.js`.
2. Edit the `projects` array — each entry has: `name`, `desc`, `href`, `status`, and `note`.

Example:

```
{
  name: 'New Project',
  desc: 'Short, one-line description.',
  href: 'https://new.echowithin.xyz',
  status: 'experimental',
  note: 'Short note that appears on "note" click.'
}
```

The page is data-driven: updating the array will automatically re-render the project cards.

## SEO & performance

- Meta tags and Open Graph tags are included in `index.html`.
- Use a small set of fonts; defer additional third-party scripts to keep Lighthouse scores high.
- Deploy via any static host (GitHub Pages, Netlify, Vercel, etc.).

## Extensibility ideas

- Add more structured meta for project cards (JSON-LD) for indexing.
- Add Netlify forms or simple contact endpoints if needed.
- Use a tiny build step to minify assets for even faster loads.

## License

This is example code; adapt and re-use as you like.
