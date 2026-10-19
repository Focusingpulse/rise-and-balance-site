# Go-live — the exact sequence

**Status:** the site is built and correct. It is held in PREVIEW mode on purpose.
Three switches are still off. They are off *deliberately*, not by oversight — read why below.

---

## Why the site is still in preview

`index.html` carries `<meta name="robots" content="noindex, nofollow">` and `robots.txt`
carries `Disallow: /`. That is the safety catch, and it is correct until DNS resolves.

Two things break if the switches are flipped early:

1. **A `CNAME` file added before DNS is configured makes GitHub redirect
   `focusingpulse.github.io/rise-and-balance-site/` to `riseandbalance.net`.**
   Until that domain resolves, the preview stops loading entirely.
2. **Removing `noindex` before DNS resolves lets Google index the temporary
   `github.io` URL**, which then has to be cleaned up later.

Neither is catastrophic. Both are avoidable by doing it in the right order.

---

## Step 1 — DNS at IONOS (this is yours, not the agent's)

For the **apex** domain `riseandbalance.net`, four A records:

| Type | Host | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

For **www**:

| Type | Host | Value |
|---|---|---|
| CNAME | www | focusingpulse.github.io |

Optional IPv6 (four more AAAA records on `@`):
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`

Also worth doing while you are in there: **set the name servers to IONOS defaults** if
they are currently pointing anywhere stale. The domain has been returning SERVFAIL,
which is an authority problem, not a record problem — check this first.

**Verify before moving on:** `dig +short riseandbalance.net A` should return the four
GitHub addresses. If it returns nothing, stop here. Nothing downstream will work.

---

## Step 2 — flip the three switches (one action)

Once DNS resolves:

1. add a file named `CNAME` at the repo root containing exactly `riseandbalance.net`
   and nothing else
2. in `index.html`, delete the line:
   `<meta name="robots" content="noindex, nofollow">`
3. replace the three lines in `robots.txt` with:
   ```
   User-agent: *
   Allow: /
   Disallow: /card/
   Sitemap: https://riseandbalance.net/sitemap.xml
   ```
   ⚠ **`Disallow: /card/` is not optional.** That path holds the business-card proof
   page (a client review surface, `noindex` on the page as well). Without the rule it
   becomes publicly crawlable the moment `Allow: /` goes in. Two belts, not one.
4. bump `<lastmod>` in `sitemap.xml` to the go-live date

Ask the agent to do this — it is one commit.

---

## Step 3 — GitHub Pages settings (this is yours)

Repo → Settings → Pages:
- Source: **Deploy from a branch**, branch `main`, folder `/ (root)`
- Custom domain: `riseandbalance.net` → Save
- Wait for the DNS check to pass, then tick **Enforce HTTPS**

---

## Step 4 — verify the Jotform notifications

The homepage embeds the Rise and Balance Jotform app. The old FormSubmit form
and its one-time confirmation requirement have been removed. Configure email
and SMS notifications in Jotform itself; embedding the form does not enable
either notification. Submit one test response from the live site and confirm
both alerts reach the intended recipients before relying on the form.

---

## What is already done

- Phone number `(720) 208-5454` in all six places: `telephone`, `contactPoint.telephone`,
  `servicePhone`, and both visible footers. Verified, no old number remains.
- Booking form embedded from Jotform (notification delivery requires a test submission).
- Schema validates: one JSON-LD block, parses, no dangling `@id` references.
- Mobile at 390px: no horizontal overflow on either page.
- `robots.txt`, `sitemap.xml`, `.nojekyll`, favicons, `og-image`, `apple-touch-icon` present.

## Open item, not a blocker

The hero's gold rays visibly cross the headline. Design call, not a defect.
