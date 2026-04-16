# CLAUDE.md — my-mart project context

## Stack

| Layer | Technology |
|---|---|
| Theme engine | Shopify Liquid (Online Store 2.0) |
| Base theme | Dawn v15.4.1 |
| CLI | Shopify CLI v3+ |
| Sections | JSON templates + Liquid sections |

---

## Key directories

```
assets/              CSS, JS, images, fonts (served via CDN)
config/
  settings_schema.json   Theme setting definitions (editor UI)
  settings_data.json     Active setting values (committed; gitignore later if needed)
layout/
  theme.liquid           Root layout — <head>, header, footer wrappers
locales/               en.default.json + translations
sections/              Draggable OS2 sections
snippets/              Reusable Liquid partials (included via {% render %})
templates/             JSON templates (index.json, product.json, etc.)
```

---

## Dev workflow

```bash
# Start local dev server (hot-reload)
shopify theme dev --store=YOUR_STORE.myshopify.com

# Lint Liquid
shopify theme check

# Push to store
shopify theme push

# Pull from store
shopify theme pull
```

---

## Conventions

- **No hardcoded store URLs** — use `{{ shop.url }}` or Liquid objects.
- **India locale** — INR currency, GST tax, and shipping zones are set in Shopify admin, not in theme code.
- **Liquid over JavaScript** — prefer server-rendered Liquid; add JS only when unavoidable.
- **Section schema first** — expose customisable values via `{% schema %}` settings instead of hardcoding in markup.
- **`{% render %}` not `{% include %}`** — Dawn uses `render` for snippets; follow suit.

---

## Branch conventions

- `main` — production-ready; PRs required
- `feature/<desc>` — new features / customisations
- `fix/<desc>` — bug fixes
- Squash-merge PRs into `main`

---

## Common gotchas

- `config/settings_data.json` is committed so the theme previews with sane defaults. Gitignore it only after live customisation diverges from defaults.
- `.theme-check.yml` configures the linter; keep it in sync if new ignore rules are needed.
- `.prettierrc.json` is Dawn's formatter config — applies to Liquid/JS/JSON.
