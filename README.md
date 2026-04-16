# my-mart

A Shopify online store built on [Dawn v15.4.1](https://github.com/Shopify/dawn/releases/tag/v15.4.1) — Shopify's reference theme built with Online Store 2.0 features.

---

## Prerequisites

- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) v3+
- A Shopify Partner account or development store

---

## Local development

```bash
shopify theme dev --store=YOUR_STORE.myshopify.com
```

This command syncs the local theme to your development store and opens a hot-reloading preview in your browser. Liquid, CSS, and JS changes are reflected immediately.

### Useful commands

| Command | Description |
|---|---|
| `shopify theme dev` | Start local dev server |
| `shopify theme check` | Lint Liquid templates |
| `shopify theme push` | Push local theme to store |
| `shopify theme pull` | Pull remote theme to local |

---

## Project structure

```
assets/        # CSS, JS, images, fonts
config/        # settings_schema.json + settings_data.json
layout/        # theme.liquid (main layout)
locales/       # Translation files
sections/      # Shopify sections (draggable page blocks)
snippets/      # Reusable Liquid partials
templates/     # Page templates (JSON + Liquid)
```

---

## Branch conventions

- `main` — production-ready code; direct pushes blocked
- `feature/<description>` — new features or theme customisations
- `fix/<description>` — bug fixes
- Open a pull request into `main`; squash-merge preferred

---

## India-specific settings

Currency (INR), GST tax rates, and shipping zones are configured in **Shopify admin**, not in theme files. No code changes are required for locale/currency behaviour.

---

## License

Dawn is released under the [MIT License](LICENSE.md).
