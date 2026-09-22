// ══════════════════════════════════════════════════════════════════════
// AUTO-GENERATED — do not hand-edit.
// Produced by scripts/update-review-thumbnails.mjs. Re-run that script
// (or let the scheduled GitHub Action do it) after changing any
// "reviews" URLs in catalog-data.js. Loaded by tablet.html / qr.html
// BEFORE catalog-app.js.
//
// Per review URL:
//   thumb  — a real TikTok preview-frame image URL, or null if unknown
//   dead   — true if TikTok confirmed the video is gone (deleted, made
//            private, or embedding disabled); false if it's fine; null
//            if the last check couldn't reach TikTok at all (kept as
//            whatever it was before, rather than guessing)
//   author — the creator's display name, if TikTok returned one
//   checked — ISO date this URL was last verified
//
// This file starts empty — run `node scripts/update-review-thumbnails.mjs`
// once (or trigger the GitHub Action) to populate it. Until then, review
// tiles just show the icon + handle look, exactly as before.
// ══════════════════════════════════════════════════════════════════════
const REVIEW_THUMBS = {};
