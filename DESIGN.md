---
name: vicvinc's notes (Leonids)
description: Personal blog design system — Leonids-inspired editorial theme on VitePress.
colors:
  primary: "#42b983"          # Vue green — links, post titles, reading time
  primary-light: "#5dd09b"    # hover state for links/titles
  secondary: "#8d7edc"        # purple — dates, author social links
  pink: "#fc636b"             # signature accent — dashed dividers, footer heart
  pink-name: "#f36170"        # author display name
  warning: "#f5a623"          # orange — tags
  warning-tint: "rgba(245, 166, 35, 0.12)"   # tag pill background
  warning-tint-strong: "rgba(245, 166, 35, 0.22)" # tag pill hover
  bg: "#f5f5f5"               # page background
  surface: "#ffffff"          # post listing / cards
  text: "rgba(0, 0, 0, 0.87)" # primary text
  text-soft: "rgba(0, 0, 0, 0.68)" # excerpts, meta, captions
  footer-bg: "#1b1b1d"
  on-footer: "#fafafa"
typography:
  body:
    fontFamily: Source Sans Pro
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: 1.5
  prose:
    fontFamily: Source Sans Pro
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: 1.7
  headline:
    fontFamily: Source Sans Pro
    fontSize: 2rem
    fontWeight: "600"
    lineHeight: 1.7
  post-title:
    fontFamily: Newsreader
    fontSize: 1.35rem
    fontWeight: "600"
    lineHeight: 1.3
    letterSpacing: -0.01em
  meta:
    fontFamily: Source Sans Pro
    fontSize: 0.82rem
    fontWeight: "600"
    lineHeight: 1.4
  tag:
    fontFamily: Source Sans Pro
    fontSize: 0.72rem
    fontWeight: "600"
    letterSpacing: 0.02em
  author-name:
    fontFamily: Newsreader
    fontSize: 1.4rem
    fontWeight: "600"
  hero-title:
    fontFamily: Newsreader
    fontSize: 2.6rem
    fontWeight: "600"
    lineHeight: 1.15
    letterSpacing: -0.01em
  mono:
    fontFamily: Roboto Mono
    fontSize: 1rem
rounded:
  sm: 4px
  md: 6px        # cover images
  full: 9999px   # tag pills
spacing:
  xs: 0.25rem    #  4px — tight gaps (meta separators)
  sm: 0.5rem     #  8px — title→meta
  md: 0.85rem    # ~14px — meta→excerpt
  lg: 1.25rem    # 20px — post-body side padding, cover→title
  xl: 1.75rem    # 28px — card vertical padding
  gutter: 2.5rem # 40px — two-column gap
  content-max: 1000px
components:
  link:
    textColor: "{colors.primary}"
  link-hover:
    textColor: "{colors.primary-light}"
  post-title:
    textColor: "{colors.primary}"
    typography: "{typography.post-title}"
  post-title-hover:
    textColor: "{colors.primary-light}"
  post-cover:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    height: 240px
  post-meta-date:
    textColor: "{colors.text-soft}"
    typography: "{typography.meta}"
  post-meta-readtime:
    textColor: "{colors.primary}"
    typography: "{typography.meta}"
  post-excerpt:
    textColor: "{colors.text-soft}"
    typography: "{typography.prose}"
  post-tag:
    textColor: "{colors.warning}"
    backgroundColor: "{colors.warning-tint}"
    rounded: "{rounded.full}"
    typography: "{typography.tag}"
  post-tag-hover:
    backgroundColor: "{colors.warning-tint-strong}"
  author-name:
    textColor: "{colors.pink-name}"
    typography: "{typography.author-name}"
  author-social-link:
    textColor: "{colors.secondary}"
  site-nav:
    backgroundColor: "{colors.surface}"
    height: 3.6rem
  hero:
    height: 46vh
  hero-title:
    textColor: "#ffffff"
    typography: "{typography.hero-title}"
  footer:
    backgroundColor: "{colors.footer-bg}"
    textColor: "{colors.on-footer}"
  footer-heart:
    textColor: "{colors.pink}"
  page:
    backgroundColor: "{colors.bg}"
  body-text:
    textColor: "{colors.text}"
    typography: "{typography.body}"
---

## Overview

A Leonids-inspired personal blog: editorial, calm, slightly nostalgic. Full-bleed
cover images carry a subtle scroll parallax; beneath each, the text block is inset
and breathing. Pink dashed dividers thread the post list together; a small dark
footer signs each page. The identity was carried over from a 2018 VuePress theme
into VitePress — the look is preserved, the stack is modernized.

The vibe is "personal broadsheet," not "product app." Restraint over decoration.

## Colors

A muted, slightly vintage palette with **green as the interaction color** (a nod to
Vue's brand, since this is a Vue-based blog) and **pink as the signature accent**.

- **primary (#42b983)** — links, post titles, reading-time. The main "this is
  clickable / alive" signal. `primary-light` is its hover state.
- **secondary (#8d7edc)** — dates and the author card's social links. Cool counterweight to green.
- **pink (#fc636b)** — the **only** decorative accent. Used sparingly: dashed
  dividers between post cards, the footer heart. `pink-name` (#f36170) is reserved
  for the author display name. Do not propagate pink elsewhere.
- **warning (#f5a623)** — topic tags. Paired with `warning-tint` for pill
  backgrounds so tags read as discrete chips.
- **bg (#f5f5f5) / surface (#ffffff)** — the page is soft grey; post listings sit
  on pure white cards. Never use pure white as the page background.
- **text / text-soft** — primary text is near-black at 0.87 alpha; excerpts, meta
  and captions drop to 0.68. Both are alpha-based so they adapt over any surface.

## Typography

A two-family system with a serif/sans editorial split: **Newsreader** (a literary
serif) carries titles and the hero/author display; **Source Sans Pro** (humanist,
highly legible) carries body and UI. **Roboto Mono** is reserved for code. CJK
titles fall back to a system serif stack (Songti SC / Noto Serif SC) to avoid
shipping a multi-MB CJK webfont. Base font-size is **15px** (set on `:root`), so
`1rem = 15px`.

- **post-title** — Newsreader, 1.35rem, 600 weight, tightened tracking (-0.01em).
  The dominant element on a card; must scan first.
- **meta** — 0.82rem, 600. Compact utility row (date · reading time).
- **tag** — 0.72rem, 600, **uppercase**, slight positive tracking. Rendered as a
  pill, so the type stays tiny but legible.
- **prose** — 1rem, line-height 1.7. Article body and excerpts. Capped at ~65ch
  for reading comfort.

Headings inside article bodies inherit Source Sans Pro at 600 weight with 1.7
line-height (provided by the platform's `.vp-doc` styling).

## Layout

Two-zone editorial grid.

- **Home**: a **42vh hero** (random background image, full-bleed) sits above the
  post list. Each post is a **full-bleed cover + inset text block** (`padding:
  0 1.25rem`), cards separated by pink dashed dividers.
- **Two-column (≥992px)**: content column ~64%, author card ~30%, 2.5rem gutter.
  The author card is sticky. Below 992px the author card hides and content is
  single-column.
- **Content max-width 1000px**, centered, with 1.25rem page padding.
- **Sticky top nav** (3.6rem) with site title + 首页/标签/相册.

## Shapes

Deliberately sharp and editorial — rounding is an exception, not the default.

- **6px** on cover images (softens the rectangle just enough).
- **999px (full)** on tag pills — the only fully-round element.
- Dividers, the hero, and the footer are flush rectangles. No card shadows.

## Components

- **post-title** — green, hover lightens + a 1px underline grows from the left.
- **post-cover** — 240px tall (180px on mobile), `background-attachment: fixed`
  for parallax on desktop; degrades to `scroll` on mobile (iOS compatibility).
- **post-tag** — warning text on a 12%-alpha warning tint, full-pill, uppercase.
  Hover deepens the tint to 22%. Clicking jumps to `/tags#<tag>`.
- **author-name** — lowercase, pink-name color, the visual anchor of the sidebar.
- **footer** — dark slab (#1b1b1d), centered, with a pink heart.

## Do's and Don'ts

- **Do** keep pink exclusive to dividers, the author name, and the footer heart.
  It earns its impact by being rare.
- **Do** let cover images go full-bleed while text stays inset — that asymmetry is
  the editorial signature.
- **Do** cap prose/excerpt width near 65ch.
- **Don't** introduce a second accent color. Green drives interaction, pink
  decorates, everything else is neutral.
- **Don't** use pure white (#fff) as a page background — use `bg` (#f5f5f5). White
  is for surfaces only.
- **Don't** add shadows/elevation. This system is flat; separation comes from
  the dashed dividers and the bg/surface contrast.
- **Don't** route essential information through tag pills. Their warm-on-warm
  color-on-tint is intentionally decorative and sits below WCAG AA; tags are
  wayfinding links, not body content.
