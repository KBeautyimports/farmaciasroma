#!/usr/bin/env node
// ══════════════════════════════════════════════════════════════════════
// UPDATE REVIEW THUMBNAILS
// ══════════════════════════════════════════════════════════════════════
// Why this exists: TikTok's oEmbed API is the only way to get a real
// preview frame (a face, not just an icon) for a review tile, and it's
// also the only reliable way to tell whether a video has been deleted,
// made private, or had embedding turned off. But that API doesn't allow
// being called directly from a browser (no CORS headers) — every kiosk
// or phone that opened the catalog would just get a silent network
// error. So instead, this script calls it from Node (server-side, no
// CORS involved) and bakes the results into review-thumbs.js as plain
// data. The tablet and QR pages just read that file — no live network
// call, no dependency on the kiosk's wifi being able to reach TikTok.
//
// RUN THIS:
//   • whenever you add/change a "reviews" URL in catalog-data.js
//   • periodically (weekly is plenty) to catch videos that went private
//     or were deleted since the last run
//   • automatically, if you're using the paired GitHub Action
//     (.github/workflows/update-review-thumbnails.yml) — it does this
//     on a schedule and commits the result, so you don't have to
//     remember to run it by hand at all.
//
// USAGE:
//   node scripts/update-review-thumbnails.mjs
// Requires Node 18+ (for built-in fetch). Reads ./catalog-data.js,
// writes ./review-thumbs.js. Run it from the repo root.
// ══════════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync, existsSync } from 'fs';

const DATA_FILE = './catalog-data.js';
const OUT_FILE = './review-thumbs.js';
const REQUEST_DELAY_MS = 350; // be polite to TikTok's API — no need to hammer it
const TIMEOUT_MS = 10000;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function extractTikTokUrls(source) {
  // Strip full-line "//" comments first (the instructional example at the
  // top of catalog-data.js has a fake "@user/video/123..." URL in one).
  const codeOnly = source
    .split('\n')
    .filter(line => !line.trim().startsWith('//'))
    .join('\n');
  // Matches: { platform: "tiktok", url: "https://...tiktok.com/..." }
  const re = /platform:\s*"tiktok",\s*url:\s*"([^"]+)"/g;
  const urls = new Set();
  let m;
  while ((m = re.exec(codeOnly))) urls.add(m[1]);
  return [...urls];
}

async function fetchOembed(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; KutieBeautyCatalogBot/1.0)' },
    });
    if (!res.ok) {
      // TikTok reached, and it said no (404/etc.) — genuinely gone.
      return { dead: true, thumb: null, authorName: null };
    }
    const data = await res.json();
    return { dead: false, thumb: data.thumbnail_url || null, authorName: data.author_name || null };
  } catch (e) {
    // Network hiccup, timeout, or DNS issue — NOT the same as "confirmed
    // dead". Leave the previous known state alone rather than guessing.
    return { dead: null, thumb: null, authorName: null, error: e.message };
  } finally {
    clearTimeout(timer);
  }
}

function loadPreviousResults() {
  if (!existsSync(OUT_FILE)) return {};
  try {
    const src = readFileSync(OUT_FILE, 'utf8');
    const m = src.match(/const REVIEW_THUMBS = (\{[\s\S]*?\});/);
    if (!m) return {};
    // The file only ever contains JSON-safe data (no functions), so this is safe.
    return JSON.parse(m[1]);
  } catch (e) {
    return {};
  }
}

function serialize(results) {
  const lines = Object.keys(results).sort().map(url => {
    const r = results[url];
    return `  ${JSON.stringify(url)}: ${JSON.stringify({ thumb: r.thumb, dead: r.dead, author: r.author || null, checked: r.checked })}`;
  });
  return `// ══════════════════════════════════════════════════════════════════════
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
// ══════════════════════════════════════════════════════════════════════
const REVIEW_THUMBS = {
${lines.join(',\n')}
};
`;
}

async function main() {
  if (!existsSync(DATA_FILE)) {
    console.error(`Could not find ${DATA_FILE} — run this from the repo root (same folder as catalog-data.js).`);
    process.exit(1);
  }
  const source = readFileSync(DATA_FILE, 'utf8');
  const urls = extractTikTokUrls(source);
  console.log(`Found ${urls.length} TikTok review URL(s) in ${DATA_FILE}.`);

  const previous = loadPreviousResults();
  const results = {};
  let alive = 0, dead = 0, unknown = 0;

  for (const [i, url] of urls.entries()) {
    process.stdout.write(`[${i + 1}/${urls.length}] ${url} ... `);
    const r = await fetchOembed(url);
    const today = new Date().toISOString().slice(0, 10);

    if (r.dead === null) {
      // Couldn't reach TikTok this run — keep whatever we knew before,
      // so one bad network moment doesn't wipe out good data.
      const prev = previous[url];
      results[url] = prev || { thumb: null, dead: false, author: null, checked: today };
      console.log(`? could not check (${r.error}) — kept previous state`);
      unknown++;
    } else {
      results[url] = { thumb: r.thumb, dead: r.dead, author: r.authorName, checked: today };
      if (r.dead) { console.log('DEAD — remove or replace this URL in catalog-data.js'); dead++; }
      else { console.log('ok'); alive++; }
    }
    await sleep(REQUEST_DELAY_MS);
  }

  writeFileSync(OUT_FILE, serialize(results));
  console.log(`\nWrote ${OUT_FILE} — ${alive} alive, ${dead} dead, ${unknown} unchecked.`);
  if (dead > 0) {
    console.log('\nDead review URLs (swap these out in catalog-data.js when you get a chance):');
    for (const url of urls) if (results[url]?.dead) console.log(`  - ${url}`);
  }
}

main();
