# riseandbalance.net

The website for **Rise and Balance LLC**, a national business systems consultancy.
Sandra fronts, Chris back-ends. Colorado entity ID 20268238811.

## What this repo is

The **serving copy**. It is not the source of truth for content.

**Source of truth for copy lives in `stayfound-vault`:**

- `programs/rise-and-balance/business-homepage-draft-v1.md` (homepage copy, signed off 2026-10-05)
- `programs/rise-and-balance/what-we-do-and-do-not-do.md` (boundary page, signed off 2026-10-05)
- `programs/rise-and-balance/services-section-draft-2026-10-06.md` (services, **DRAFT, not signed off**)
- `programs/rise-and-balance/scope-answers-2026-10-05.md` (the 38 rulings every line traces to)

Edit in the vault, then push here. Do not let the two drift.

## Status: PREVIEW. Not live.

- Hosted on GitHub Pages at `focusingpulse.github.io/rise-and-balance-site/`
- **No custom domain attached.** The `CNAME` file is deliberately absent and the Pages
  custom domain is deliberately unset, because setting a custom domain before DNS
  resolves makes the `github.io` URL redirect to a dead host and the preview breaks.
- `robots.txt` is set to `Disallow: /` and every page carries `noindex, nofollow`.
- The booking button is a placeholder. Contact details, photographs, and the booking
  mechanism do not exist yet.

## Go-live checklist

Do these in order. Nothing here is done.

1. **DNS.** At IONOS, on `riseandbalance.net`, add:
   - `A  @  185.199.108.153`
   - `A  @  185.199.109.153`
   - `A  @  185.199.110.153`
   - `A  @  185.199.111.153`
   - `CNAME  www  focusingpulse.github.io`
2. **Add the `CNAME` file** to this repo containing exactly `riseandbalance.net`.
3. **Set the custom domain** in Settings, Pages, and enforce HTTPS. Wait for the
   Let's Encrypt certificate to provision.
4. **Remove the preview blocks.** Delete `Disallow: /` from `robots.txt`, uncomment the
   `Allow` and `Sitemap` lines, and remove `<meta name="robots" content="noindex, nofollow">`
   from every page.
5. **Replace the booking placeholder** with the real Cal.com or Calendly link.
6. **Add contact details** once they exist (email, phone).
7. **Decide on the founder node.** No `Person` node exists in the schema because the
   pages do not name a founder. Adding one means naming her on the page first, because
   schema has to match what the page actually says.

## Palette

Purple and gold, ruled 2026-10-05. The exact ramp was deferred by Chris, so the current
values are provisional:

| Token | Value |
|---|---|
| `--accent` (purple) | `#4a2e6b` |
| `--panel` (deep purple) | `#2a1b3d` |
| `--gold` | `#c9a227` |
| `--bg` (warm neutral) | `#fbf9f6` |
