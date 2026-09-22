// ── STATE ──
let activeFilters = { types: [], skin: null, concern: null, ingredients: [] };
let quizAnswers = { skinType: null, concerns: [], routine: null };
let ingVisible = false;

// Maps friendly concern keys → matching criteria
const CONCERN_FILTER_MAP = {
  acne:       { skinTypes: ['Piel con Acné'], ingredients: ['Niacinamida','AHA/BHA','Ácido Azelaico','Zinc (Óxido)','Centella Asiática'] },
  manchas:    { skinTypes: [], ingredients: ['Niacinamida','Vitamina C','Ácido Tranexámico','Alfa-Arbutina','Glutatión'] },
  arrugas:    { skinTypes: ['Piel Madura'], ingredients: ['Retinol/Bakuchiol','Péptidos','Adenosina','Resveratrol','PDRN / ADN Sódico'] },
  hidratacion:{ skinTypes: [], ingredients: ['Ácido Hialurónico','Ceramidas','Pantenol (B5)','Escualano','Ácido Poliglutámico'] },
  poros:      { skinTypes: ['Piel Grasa','Piel Mixta'], ingredients: ['AHA/BHA','Niacinamida','Zinc (Óxido)'] },
  rojeces:    { skinTypes: ['Piel Sensible'], ingredients: ['Centella Asiática','Ácido Azelaico','Pantenol (B5)'] },
  sensible:   { skinTypes: ['Piel Sensible'], ingredients: ['Centella Asiática','Ceramidas','Pantenol (B5)'] },
  brillo:     { skinTypes: [], ingredients: ['Vitamina C','Niacinamida','Ácido Tranexámico','Glutatión','Alfa-Arbutina'] },
  barrera:    { skinTypes: [], ingredients: ['Ceramidas','Pantenol (B5)','Probióticos/Fermentos','Escualano'] },
  ojeras:     { types: ['Contorno de Ojos'], skinTypes: [], ingredients: ['Péptidos','Retinol/Bakuchiol','Adenosina'] },
  sol:        { types: ['Protector Solar'], skinTypes: [], ingredients: [] },
};

function productMatchesConcern(p, key) {
  const rule = CONCERN_FILTER_MAP[key];
  if (!rule) return false;
  if (rule.types && rule.types.length && rule.types.some(t => p.types.includes(t))) return true;
  if (rule.skinTypes.length && rule.skinTypes.some(s => p.skinTypes.includes(s))) return true;
  if (rule.ingredients.length && rule.ingredients.some(i => p.activeIngredients.includes(i))) return true;
  return false;
}

// ── TYPE BADGE PRIORITY ──
// For products with multiple types, always show the most specific/informative label
const TYPE_PRIORITY = [
  'Protector Solar',   // SPF products always lead with SPF
  'Contorno de Ojos',  // eye-specific products lead with eye
  'Aceite Limpiador',  // oil cleansers are more specific than generic Limpiador
  'Mascarilla',
  'Tónico/Esencia',
  'Sérum/Ampolla',
  'Crema',
  'Bruma',             // demoted below Crema — cream-mist hybrids show as CREMA
  'Limpiador',
];

function primaryType(types) {
  if (!types || !types.length) return 'Tratamiento';
  for (const t of TYPE_PRIORITY) {
    if (types.includes(t)) return t;
  }
  return types[0];
}

// ── RENDER CATALOG ──
function renderCatalog(products) {
  const grid = document.getElementById('product-grid');
  const empty = document.getElementById('empty-state');
  const countEl = document.getElementById('count-text');
  grid.innerHTML = '';
  if (!products.length) {
    grid.style.display = 'none';
    empty.style.display = 'block';
    countEl.textContent = '0 productos';
    return;
  }
  grid.style.display = 'grid';
  empty.style.display = 'none';
  countEl.textContent = `${products.length} producto${products.length !== 1 ? 's' : ''}`;
  products.forEach((p, idx) => {
    const typeLabel = primaryType(p.types);
    const hasSkin = p.skinTypes.length > 0;
    const imgSrc = p.image && p.image !== 'nan' ? p.image : '';
    const div = document.createElement('div');
    div.className = 'product-card';
    div.onclick = () => openModal(PRODUCTS.indexOf(p));
    const reviewCount = (p.reviews || []).length;
    div.innerHTML = `
      <div class="card-img-wrap">
        ${imgSrc ? `<img src="${imgSrc}" alt="${p.name}" onerror="this.parentElement.style.background='var(--rose-light)';this.remove()">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;">${BRAND_INFO[p.brand]?.emoji || '🌸'}</div>`}
        <div class="card-type-badge">${typeLabel}</div>
        ${reviewCount ? `<div class="card-social-badge">▶ Visto en TikTok${reviewCount > 1 ? ` · ${reviewCount}` : ''}</div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-tags">
          ${(!p.skinTypes.length || p.skinTypes.includes('Todo Tipo')) ? `<span class="card-tag">Todo Tipo</span>` : p.skinTypes.slice(0,2).map(s => `<span class="card-tag">${s}</span>`).join('')}
          ${sortedActives(p).slice(0,3).map(i => `<span class="card-tag pink${activeFilters.ingredients.includes(i)?' ing-active':''}" onclick="event.stopPropagation();toggleIngredient('${i}')">${i}</span>`).join('')}
        </div>
      </div>
    `;
    grid.appendChild(div);
  });
}

// ── FILTERS ──
function toggleFilter(type, value) {
  if (activeFilters[type] === value) {
    activeFilters[type] = null;
  } else {
    activeFilters[type] = value;
  }
  updateChipStyles();
  applyFilters();
}

function updateChipStyles() {
  document.querySelectorAll('#skin-chips .chip').forEach(c => {
    const label = c.getAttribute('onclick').match(/'([^']+)'\)/)[1];
    c.className = 'chip' + (activeFilters.skin === label ? ' active-skin' : '');
  });
  document.querySelectorAll('#concern-chips .chip').forEach(c => {
    const label = c.getAttribute('onclick').match(/'([^']+)'\)/)[1];
    c.className = 'chip' + (activeFilters.concern === label ? ' active-concern' : '');
  });
}

function applyFilters() {
  let filtered = PRODUCTS.filter(p => {
    if (activeFilters.types.length && !activeFilters.types.some(t => p.types.includes(t))) return false;
    if (activeFilters.skin && !p.skinTypes.includes(activeFilters.skin) && !p.skinTypes.includes('Todo Tipo')) return false;
    if (activeFilters.concern && !productMatchesConcern(p, activeFilters.concern)) return false;
    if (activeFilters.ingredients.length && !activeFilters.ingredients.every(ing => p.activeIngredients.includes(ing))) return false;
    return true;
  });
  renderCatalog(filtered);
  updateFiltersToggleBadge();
}

function resetFilters() {
  activeFilters = { types: [], skin: null, concern: null, ingredients: [] };
  updateChipStyles();
  updateTypeDDStyles();
  updateIngDDStyles();
  renderCatalog(PRODUCTS);
  updateFiltersToggleBadge();
}

// The filter panel starts collapsed (see .filters-body in CSS) so the
// catalog isn't front-loaded with 15+ visible options before someone's
// engaged with it (fewer visible choices at once = faster decisions).
function toggleFiltersPanel() {
  document.getElementById('filters-wrap').classList.toggle('expanded');
}

// Shows a small count badge next to "Toca aquí para filtrar" whenever a
// filter is active, so it's obvious something's applied even while the
// panel is collapsed.
function updateFiltersToggleBadge() {
  const count = activeFilters.types.length + (activeFilters.skin ? 1 : 0) +
    (activeFilters.concern ? 1 : 0) + activeFilters.ingredients.length;
  const badge = document.getElementById('filters-toggle-badge');
  if (count > 0) {
    badge.textContent = count;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

// ── MODAL ──
function openModal(idx) {
  const p = PRODUCTS[idx];
  document.getElementById('modal-img').src = p.image && p.image !== 'nan' ? p.image : '';
  if (!p.image || p.image === 'nan') {
    document.querySelector('.modal-img-wrap').style.background = 'var(--rose-light)';
    document.querySelector('.modal-img-wrap').innerHTML = `<button class="modal-close" onclick="closeModalBtn()" aria-label="Cerrar">✕</button><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:4rem;">${BRAND_INFO[p.brand]?.emoji || '🌸'}</div>`;
  }
  document.getElementById('modal-brand').textContent = p.brand;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.description;
  document.getElementById('modal-ing-full').textContent = p.ingredients;
  document.getElementById('modal-ing-wrap').style.display = 'none';
  document.getElementById('modal-ing-btn').textContent = 'Ver ingredientes completos ▼';
  ingVisible = false;
  
  const typesEl = document.getElementById('modal-types');
  typesEl.innerHTML = p.types.length ? p.types.map(t => `<span class="modal-chip type">${t}</span>`).join('') : '<span style="color:var(--mid);font-size:0.8rem;">—</span>';
  
  const skinsEl = document.getElementById('modal-skins');
  skinsEl.innerHTML = p.skinTypes.length ? p.skinTypes.map(s => `<span class="modal-chip skin">${s}</span>`).join('') : '<span style="color:var(--mid);font-size:0.8rem;">Todo tipo de piel</span>';
  
  const ingEl = document.getElementById('modal-ingredients');
  ingEl.innerHTML = p.activeIngredients.length ? p.activeIngredients.map(i => `<span class="modal-chip ingredient">${i}</span>`).join('') : '<span style="color:var(--mid);font-size:0.8rem;">—</span>';
  
  renderReviews(p.reviews || []);
  
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ── REVIEWS (TikTok / Instagram) ──────────────────────────────────
// The review strip is social proof: real customers/creators using the
// product, shown as a row of thumbnail tiles right under the product
// name — before the description, so it's seen before anyone scrolls.
//
// KIOSK_MODE true (tablet): a tap opens a FULL-SCREEN overlay that
//   plays the embed right there, so the shopper never leaves the
//   shared kiosk. TikTok/Instagram's own embed UI is full of links
//   (profile, sound, "Watch on TikTok") that would otherwise carry
//   someone off the catalog and strand the tablet on tiktok.com.
// KIOSK_MODE false (qr.html): tiles are real <a href> links straight
//   to the TikTok/Instagram URL. On someone's own phone, tapping a
//   real link lets iOS/Android's built-in Universal Links open the
//   post directly in the native app (falling back to the mobile site
//   if it isn't installed) — nothing extra to configure, it just
//   needs to be a plain link and not a JS navigation.
function reviewHandle(url) {
  const m = url.match(/@([^/]+)/);
  return m ? '@' + m[1] : '';
}

function renderReviews(reviews) {
  const wrap = document.getElementById('modal-reviews-wrap');
  const strip = document.getElementById('modal-reviews-strip');

  if (!reviews.length) {
    wrap.style.display = 'none';
    strip.innerHTML = '';
    return;
  }

  wrap.style.display = 'block';
  strip.innerHTML = reviews.map((r, i) => {
    const icon = r.platform === 'tiktok' ? '🎵' : '📷';
    const handle = reviewHandle(r.url);
    const inner = `
      <div class="review-tile-play">${icon}</div>
      <div class="review-tile-handle">${handle}</div>`;
    if (KIOSK_MODE) {
      return `<div class="review-tile" onclick="showReview('${r.platform}', '${r.url}')">${inner}</div>`;
    }
    return `<a class="review-tile" href="${r.url}" target="_blank" rel="noopener">${inner}</a>`;
  }).join('');
}

// Builds the embed markup shared by both the (now-unused on QR) inline
// embed and the tablet's full-screen player.
function buildEmbedHtml(platform, url) {
  if (platform === 'tiktok') {
    return `<blockquote class="tiktok-embed" cite="${url}" style="max-width:325px;min-width:280px;"><section></section></blockquote>`;
  }
  return `<blockquote class="instagram-media" data-instgrm-permalink="${url}" style="width:100%;max-width:400px;margin:0;"></blockquote>`;
}

// KIOSK_MODE only — opens the full-screen player and pauses the idle
// timers so a shopper watching a video isn't kicked back to the
// screensaver mid-way through. A safety cap still applies in case
// someone opens a video and walks away.
function showReview(platform, url) {
  const overlay = document.getElementById('review-player-overlay');
  const embed = document.getElementById('review-player-embed');
  if (!overlay) return; // qr.html has no player overlay — shouldn't be reachable there
  embed.innerHTML = buildEmbedHtml(platform, url);
  overlay.classList.add('open');
  loadEmbedScript(platform);
  if (typeof pauseIdleForVideo === 'function') pauseIdleForVideo();
}

function closeReviewPlayer() {
  const overlay = document.getElementById('review-player-overlay');
  const embed = document.getElementById('review-player-embed');
  overlay.classList.remove('open');
  embed.innerHTML = '';
  if (typeof resumeIdleAfterVideo === 'function') resumeIdleAfterVideo();
}

// Both TikTok's and Instagram's embed scripts only scan the page for
// un-rendered blockquotes when the script itself runs. Adding a fresh
// <script> tag (even to an already-loaded src) forces that re-scan so
// a blockquote inserted after page load still gets turned into a
// player, instead of only working on the very first embed of a visit.
function loadEmbedScript(platform) {
  const src = platform === 'tiktok' ? 'https://www.tiktok.com/embed.js' : 'https://www.instagram.com/embed.js';
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.body.appendChild(s);
}

function closeModal(e) {
  if (e.target === document.getElementById('modal-overlay')) {
    closeModalBtn();
  }
}
function closeModalBtn() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
function toggleIngredients() {
  ingVisible = !ingVisible;
  document.getElementById('modal-ing-wrap').style.display = ingVisible ? 'block' : 'none';
  document.getElementById('modal-ing-btn').textContent = ingVisible ? 'Ocultar ingredientes ▲' : 'Ver ingredientes completos ▼';
}

// ── VIEW SWITCHING ──
function switchView(view) {
  document.getElementById('catalog-section').style.display = view === 'catalog' ? 'block' : 'none';
  document.getElementById('quiz-section').style.display = view === 'quiz' ? 'block' : 'none';
  document.getElementById('quiz-results').style.display = view === 'results' ? 'block' : 'none';
  document.getElementById('brands-section').style.display = view === 'brands' ? 'block' : 'none';
  document.getElementById('hero-section').style.display = (view === 'catalog') ? 'block' : 'none';
  
  document.getElementById('nav-catalog').className = 'nav-item' + (view === 'catalog' ? ' active' : '');
  document.getElementById('nav-quiz').className = 'nav-item' + (view === 'quiz' || view === 'results' ? ' active' : '');
  document.getElementById('nav-brands').className = 'nav-item' + (view === 'brands' ? ' active' : '');
  window.scrollTo(0, 0);
}

// ── QUIZ ──
let currentStep = 0;

// All possible concerns with metadata
const ALL_CONCERNS = [
  { key: 'acne',       icon: '🎯', label: 'Acné e Imperfecciones',   desc: 'Brotes activos, puntos negros, poros obstruidos, marcas post-acné.' },
  { key: 'manchas',    icon: '☀️', label: 'Manchas y Tono Desigual', desc: 'Hiperpigmentación, tono apagado, cicatrices de acné.' },
  { key: 'arrugas',    icon: '⏳', label: 'Arrugas y Firmeza',        desc: 'Líneas de expresión, pérdida de elasticidad y firmeza. Piel madura.' },
  { key: 'hidratacion',icon: '💧', label: 'Hidratación y Barrera',    desc: 'Piel deshidratada, tirante o con la barrera debilitada.' },
  { key: 'poros',      icon: '🔍', label: 'Poros y Exceso de Sebo',   desc: 'Poros dilatados, brillos, piel grasa.' },
  { key: 'rojeces',    icon: '🌿', label: 'Rojeces e Irritación',     desc: 'Enrojecimiento persistente, piel reactiva o irritada.' },
  { key: 'brillo',     icon: '✨', label: 'Falta de Luminosidad',     desc: 'Piel opaca, sin brillo, tez cansada o apagada.' },
  { key: 'barrera',    icon: '🛡️', label: 'Reparar la Barrera',       desc: 'Piel sensibilizada, dañada o reactiva ante productos.' },
  { key: 'ojeras',     icon: '👁️', label: 'Contorno de Ojos',         desc: 'Ojeras, bolsas, arrugas o líneas alrededor de los ojos.' },
  { key: 'sol',        icon: '🌞', label: 'Protección Solar',         desc: 'Proteger del daño UV y fotoenvejecimiento.' },
];

// Which concerns to show first for each skin type
const SKIN_CONCERN_PRIORITY = {
  'Piel Seca':   ['hidratacion','barrera','arrugas','rojeces','manchas','brillo','ojeras','poros','acne','sol'],
  'Piel Grasa':  ['poros','acne','manchas','brillo','hidratacion','rojeces','barrera','arrugas','sol','ojeras'],
  'Piel Mixta':  ['poros','acne','hidratacion','manchas','brillo','barrera','rojeces','arrugas','sol','ojeras'],
  'Piel Normal': ['manchas','brillo','hidratacion','arrugas','ojeras','barrera','poros','rojeces','acne','sol'],
};

function showQuiz() {
  quizAnswers = { skinType: null, isSensitive: false, concerns: [], routine: null };
  currentStep = 0;
  clearTimeout(autoAdvanceTimer);
  setStep1NextEnabled(false);
  // Reset sensitive toggle
  const toggle = document.getElementById('sensitive-toggle');
  if (toggle) { toggle.className = 'sensitive-toggle'; document.getElementById('sensitive-check-icon').textContent = ''; }
  // Reset all quiz-opt selected states across all steps
  document.querySelectorAll('.quiz-opt').forEach(o => {
    o.className = o.classList.contains('concern-suggested') ? 'quiz-opt concern-suggested' : 'quiz-opt';
  });
  updateDots(0);
  for (let i = 0; i < 3; i++) {
    const s = document.getElementById(`step-${i}`);
    if (s) s.className = 'quiz-step' + (i === 0 ? ' active' : '');
  }
  switchView('quiz');

  // Track quiz start in GA4 (to measure completion rate later)
  if (typeof gtag === 'function') {
    gtag('event', 'quiz_started');
  }
}

// STEP 0 (skin type) and STEP 2 (routine) are single-select, so picking
// an option auto-advances after a brief pause (long enough to see the
// selection highlight, short enough to feel instant). The sensitive-skin
// toggle lives outside the step cards entirely — see the HTML — so it's
// never at risk of being skipped by this auto-advance.
let autoAdvanceTimer = null;

// Step 1 (concerns) has a "Siguiente" button at both the top and the
// bottom of the options list, so it's reachable without scrolling either
// way. Both must always show the same enabled/disabled state.
function setStep1NextEnabled(enabled) {
  document.getElementById('next-1').disabled = !enabled;
  document.getElementById('next-1-top').disabled = !enabled;
}

function toggleSensitive() {
  quizAnswers.isSensitive = !quizAnswers.isSensitive;
  const toggle = document.getElementById('sensitive-toggle');
  const icon = document.getElementById('sensitive-check-icon');
  toggle.className = 'sensitive-toggle' + (quizAnswers.isSensitive ? ' checked' : '');
  icon.textContent = quizAnswers.isSensitive ? '✓' : '';
}

function selectSkinType(value, el) {
  document.querySelectorAll('#step-0 .quiz-opt').forEach(o => o.className = 'quiz-opt');
  el.className = 'quiz-opt selected';
  quizAnswers.skinType = value;
  quizAnswers.concerns = []; // reset if they go back and change
  clearTimeout(autoAdvanceTimer);
  autoAdvanceTimer = setTimeout(() => goStep(1), 400);
}

function buildConcernOptions(skinType) {
  const priority = SKIN_CONCERN_PRIORITY[skinType] || ALL_CONCERNS.map(c => c.key);
  const ordered = priority.map(k => ALL_CONCERNS.find(c => c.key === k))
                          .filter(c => c && AVAILABLE_CONCERNS.has(c.key));
  const container = document.getElementById('concerns-options');
  container.innerHTML = '';
  ordered.forEach((c, i) => {
    const highlighted = i < 3; // top 3 for this skin type get a subtle highlight
    const div = document.createElement('div');
    div.className = 'quiz-opt' + (highlighted ? ' concern-suggested' : '');
    div.setAttribute('data-key', c.key);
    div.onclick = function() { toggleConcern(c.key, this); };
    div.innerHTML = `
      <span class="opt-icon">${c.icon}</span>
      <span class="opt-text">
        <span class="opt-label">${c.label}${highlighted ? ' <span class="suggested-tag">Recomendado</span>' : ''}</span>
        <span class="opt-desc">${c.desc}</span>
      </span>
    `;
    container.appendChild(div);
  });
}

function toggleConcern(value, el) {
  const idx = quizAnswers.concerns.indexOf(value);
  if (idx >= 0) {
    quizAnswers.concerns.splice(idx, 1);
    el.className = el.classList.contains('concern-suggested') ? 'quiz-opt concern-suggested' : 'quiz-opt';
  } else {
    if (quizAnswers.concerns.length >= 3) {
      // Remove oldest selection visually
      const oldest = quizAnswers.concerns.shift();
      const oldEl = document.querySelector(`[data-key="${oldest}"]`);
      if (oldEl) oldEl.className = oldEl.classList.contains('concern-suggested') ? 'quiz-opt concern-suggested' : 'quiz-opt';
    }
    quizAnswers.concerns.push(value);
    el.className = (el.classList.contains('concern-suggested') ? 'quiz-opt concern-suggested' : 'quiz-opt') + ' selected';
  }
  setStep1NextEnabled(quizAnswers.concerns.length > 0);
}

function selectRoutine(value, el) {
  document.querySelectorAll('#step-2 .quiz-opt').forEach(o => o.className = 'quiz-opt');
  el.className = 'quiz-opt selected';
  quizAnswers.routine = value;
  clearTimeout(autoAdvanceTimer);
  autoAdvanceTimer = setTimeout(() => showResults(), 400);
}

function goStep(step) {
  clearTimeout(autoAdvanceTimer);
  // When entering step 1, build the adaptive concern options
  if (step === 1 && quizAnswers.skinType) {
    buildConcernOptions(quizAnswers.skinType);
    // Re-mark already-selected concerns
    quizAnswers.concerns.forEach(k => {
      const el = document.querySelector(`[data-key="${k}"]`);
      if (el) el.className = (el.classList.contains('concern-suggested') ? 'quiz-opt concern-suggested' : 'quiz-opt') + ' selected';
    });
    setStep1NextEnabled(quizAnswers.concerns.length > 0);
  }
  document.getElementById(`step-${currentStep}`).className = 'quiz-step';
  currentStep = step;
  document.getElementById(`step-${step}`).className = 'quiz-step active';
  updateDots(step);
  document.getElementById('step-label').textContent = `Paso ${step + 1} de 3`;
  document.querySelector('.quiz-card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateDots(active) {
  for (let i = 0; i < 3; i++) {
    const d = document.getElementById(`dot-${i}`);
    d.className = 'step-dot' + (i < active ? ' done' : i === active ? ' active' : '');
  }
}

// ── QUIZ RESULTS ──

// Ingredient mapping per concern key
const QUIZ_CONCERN_INGREDIENTS = {
  acne:        { ingredients: ['Niacinamida','AHA/BHA','Ácido Azelaico','Zinc (Óxido)','Centella Asiática'], skinTypes: ['Piel con Acné'] },
  manchas:     { ingredients: ['Niacinamida','Vitamina C','Ácido Tranexámico','Alfa-Arbutina','Glutatión'], skinTypes: [] },
  arrugas:     { ingredients: ['Retinol/Bakuchiol','Péptidos','Adenosina','Resveratrol','PDRN / ADN Sódico'], skinTypes: ['Piel Madura'] },
  hidratacion: { ingredients: ['Ácido Hialurónico','Ceramidas','Pantenol (B5)','Escualano','Ácido Poliglutámico','Probióticos/Fermentos'], skinTypes: ['Piel Seca'] },
  sensible:    { ingredients: ['Centella Asiática','Ceramidas','Pantenol (B5)','Ácido Hialurónico'], skinTypes: ['Piel Sensible'] },
  poros:       { ingredients: ['Niacinamida','AHA/BHA','Zinc (Óxido)'], skinTypes: ['Piel Grasa','Piel Mixta'] },
  rojeces:     { ingredients: ['Centella Asiática','Ácido Azelaico','Pantenol (B5)','Ceramidas'], skinTypes: ['Piel Sensible'] },
  brillo:      { ingredients: ['Vitamina C','Niacinamida','Ácido Tranexámico','Glutatión','Alfa-Arbutina','Adenosina'], skinTypes: [] },
  barrera:     { ingredients: ['Ceramidas','Pantenol (B5)','Probióticos/Fermentos','Escualano','Ácido Hialurónico'], skinTypes: [] },
  ojeras:      { ingredients: ['Péptidos','Retinol/Bakuchiol','Adenosina','Niacinamida'], skinTypes: [], types: ['Contorno de Ojos'] },
  sol:         { ingredients: [], skinTypes: [], types: ['Protector Solar'] },
};

/* ── 1. Ingredient benefits (the 20 canonical actives in the catalog) ──
   Phrased verb-first so they read naturally after "aporta X, que …".
   Verb number matches how the ingredient is usually named (plural actives
   like Ceramidas/Péptidos take plural verbs). */
const INGREDIENT_BENEFITS = {
  'Centella Asiática':      'calma la piel y ayuda a reforzar la barrera',
  'Ácido Hialurónico':      'retiene agua en la piel para una hidratación profunda y efecto relleno',
  'Niacinamida':            'ayuda a regular el sebo, difuminar manchas y reforzar la barrera',
  'Pantenol (B5)':          'hidrata y ayuda a calmar la piel sensibilizada',
  'Ceramidas':              'reponen los lípidos de la barrera para retener la humedad',
  'Adenosina':              'ayuda a suavizar la apariencia de líneas de expresión',
  'Probióticos/Fermentos':  'nutren el microbioma y ayudan a equilibrar la piel',
  'AHA/BHA':                'exfolian suavemente para renovar la textura y desobstruir poros',
  'Escualano':              'suaviza y sella la hidratación como emoliente ligero',
  'Péptidos':               'apoyan la firmeza y la elasticidad de la piel',
  'PDRN / ADN Sódico':      'ayuda a la recuperación y vitalidad de la piel estresada',
  'Vitamina C':             'ilumina y ayuda a unificar el tono con acción antioxidante',
  'Ácido Tranexámico':      'atenúa la apariencia de manchas y ayuda a unificar el tono',
  'Glutatión':              'aporta luminosidad y un tono más uniforme como antioxidante',
  'Ácido Poliglutámico':    'retiene humedad en la superficie para una piel tersa',
  'Retinol/Bakuchiol':      'favorece la renovación para suavizar líneas finas y textura',
  'Resveratrol':            'ayuda a proteger frente al estrés ambiental como antioxidante',
  'Alfa-Arbutina':          'ayuda a aclarar manchas de forma gradual y uniforme',
  'Zinc (Óxido)':           'protege del sol y ayuda a calmar la piel grasa como filtro mineral',
  'Ácido Azelaico':         'ayuda a calmar rojeces y a difuminar marcas',
};

/* ── 2. Eye sub-functions (only applied to "Contorno de Ojos" products) ──
   Reuses the same actives as the main concern maps, scoped to the eye area.
   'bolsas' (puffiness) is intentionally omitted: no de-puffing active
   (e.g. caffeine) exists in the catalog yet. Uncomment + add 'Cafeína' to
   INGREDIENT_BENEFITS the day a caffeine eye product is stocked. */
const EYE_FUNCTIONS = {
  arrugas_ojos:   { label: 'líneas finas y flacidez',
                    ingredients: ['Retinol/Bakuchiol','Péptidos','Adenosina','Ácido Hialurónico'] },
  ojeras_oscuras: { label: 'ojeras oscuras e hiperpigmentación',
                    ingredients: ['Niacinamida','Vitamina C','Ácido Tranexámico','Alfa-Arbutina'] },
  // bolsas:      { label: 'bolsas e hinchazón',
  //               ingredients: ['Cafeína','Péptidos','Adenosina'] },
};

/* ── 3. SPF resolution for sunscreens ──
   Prefer a structured p.spf field. Regex from description is a fallback and
   fails on products whose copy omits the rating (e.g. Hyalu-Cica Water-Fit UV),
   so those are pinned by name substring. */
const SPF_OVERRIDES = [
  { match: 'Water-Fit UV', spf: 'SPF50+ PA++++' },
];

function getSPF(p) {
  if (p.spf) return p.spf;
  for (const o of SPF_OVERRIDES) {
    if (p.name && p.name.includes(o.match)) return o.spf;
  }
  const desc = p.description || '';
  const spf = desc.match(/(?:FPS|SPF)\s*\d{2}\+?/i);
  const pa  = desc.match(/PA\+{1,4}/i);
  if (!spf) return null;
  return pa ? `${spf[0].toUpperCase()} ${pa[0].toUpperCase()}` : spf[0].toUpperCase();
}

function isMineralSunscreen(p) {
  return p.activeIngredients.includes('Zinc (Óxido)');
}

/* ── 4. Core: build the structured explanation ─────────────────────────── */
function explainMatch(p, skin, isSensitive, concerns) {
  const isEye = p.types.includes('Contorno de Ojos');

  const skinFit = p.skinTypes.includes(skin)        ? 'exact'
                : p.skinTypes.includes('Todo Tipo') ? 'universal'
                : p.skinTypes.length === 0          ? 'unknown'
                : 'mismatch';

  const perConcern = [];
  for (const key of concerns) {
    const rule    = QUIZ_CONCERN_INGREDIENTS[key] || { ingredients: [], types: [] };
    const concern = ALL_CONCERNS.find(c => c.key === key);
    if (!concern) continue;

    // sunscreen concern → describe by SPF, not ingredients
    if (key === 'sol' && p.types.includes('Protector Solar')) {
      perConcern.push({ key, label: concern.label, kind: 'spf',
                        spf: getSPF(p), mineral: isMineralSunscreen(p), matched: [] });
      continue;
    }

    // eye concern on an actual eye product → describe by eye sub-function
    if (key === 'ojeras' && isEye) {
      const funcs = Object.entries(EYE_FUNCTIONS).map(([fk, f]) => ({
        key: fk, label: f.label,
        matched: f.ingredients.filter(i => p.activeIngredients.includes(i)),
      })).filter(f => f.matched.length);
      perConcern.push({ key, label: concern.label, kind: 'eye', functions: funcs, matched: [] });
      continue;
    }

    // default: ingredient-driven match
    const matched = (rule.ingredients || []).filter(i => p.activeIngredients.includes(i));
    const byType  = (rule.types || []).some(t => p.types.includes(t));
    if (matched.length || byType) {
      perConcern.push({ key, label: concern.label, kind: 'ingredient', matched, byType });
    }
  }

  // Every distinct active doing work — including eye-function actives — so the
  // count and the spotlight line work even on eye-only selections.
  const allMatched = [...new Set(
    perConcern.flatMap(c =>
      c.kind === 'eye' ? c.functions.flatMap(f => f.matched) : c.matched
    )
  )];

  return {
    skin, isSensitive,
    skinFit,
    sensitiveFit: isSensitive && p.skinTypes.includes('Piel Sensible'),
    perConcern,
    allMatched,
  };
}

/* ── 5. Surface text: structured object → Spanish sentence(s) ───────────── */
function renderWhy(x) {
  const mentioned = new Set();
  const special = [];

  // Special clauses first (SPF, eye) so their actives aren't repeated below
  for (const c of x.perConcern) {
    if (c.kind === 'spf' && c.spf) {
      special.push(`ofrece protección solar ${c.spf} de amplio espectro` +
        (c.mineral ? ' con filtro mineral, apto para piel sensible' : ''));
    } else if (c.kind === 'eye' && c.functions.length) {
      const fs = c.functions.map(f => {
        f.matched.forEach(i => mentioned.add(i));
        return `${f.label} (${listEs(rankActives(f.matched).slice(0, 3).map(i => i.toLowerCase()))})`;
      });
      special.push(`en el contorno de ojos trabaja sobre ${listEs(fs)}`);
    }
  }

  // Ingredient-driven concern clauses (dedupe actives already named)
  const ingData = [];
  for (const c of x.perConcern) {
    if (c.kind !== 'ingredient') continue;
    const fresh = c.matched.filter(i => !mentioned.has(i));
    if (fresh.length) { fresh.forEach(i => mentioned.add(i)); ingData.push({ label: c.label.toLowerCase(), items: fresh }); }
    else if (c.byType) ingData.push({ label: c.label.toLowerCase(), items: [] });
  }

  const withItems = ingData.filter(c => c.items.length);
  const ingActives = [...new Set(withItems.flatMap(c => c.items))];
  const allMatched = [...mentioned];

  const ingClauses = [];
  if (ingActives.length > 3) {
    // Too many to list — state the total and name the 3 most notable.
    const ranked = rankActives(ingActives);
    const including = ranked.slice(1, 4).map(i => i.toLowerCase()); // the hero (ranked[0]) is saved for the spotlight
    const ctx = withItems.length === 1 ? `para ${withItems[0].label}` : 'para tus objetivos';
    ingClauses.push(`${ctx}, reúne ${ingActives.length} activos, incluyendo ${listEs(including)}`);
  } else {
    withItems.forEach(c => {
      const names = c.items.map(i => i.toLowerCase());
      let clause = `para ${c.label}, ${names.length > 1 ? 'combina' : 'aporta'} ${listEs(names)}`;
      // When it's the only active overall, fold its benefit right here — no repeated spotlight
      if (ingActives.length === 1) { const b = INGREDIENT_BENEFITS[c.items[0]]; if (b) clause += `, que ${b}`; }
      ingClauses.push(clause);
    });
  }
  // byType-only concerns (rare)
  ingData.filter(c => !c.items.length).forEach(c => ingClauses.push(`está formulado para ${c.label}`));

  const sentences = [];

  // Skin-fit lead — only when it's a real signal (exact type, or sensitive)
  const sensibleShown = special.join(' ').includes('sensible');
  if (x.skinFit === 'exact') {
    sentences.push(`Ideal para tu ${x.skin.toLowerCase()}${x.sensitiveFit && !sensibleShown ? ', también apta para piel sensible' : ''}.`);
  } else if (x.sensitiveFit && !sensibleShown) {
    sentences.push('Apto para piel sensible.');
  }

  // Coverage sentence
  const body = [...special, ...ingClauses];
  if (body.length) {
    const s = joinSentences(body);
    sentences.push(s.charAt(0).toUpperCase() + s.slice(1) + '.');
  } else if (!sentences.length && x.skinFit === 'universal') {
    sentences.push('Apto para todo tipo de piel, incluida la tuya.');
  }

  // Spotlight — only with 2+ actives, so it elaborates one of several (never echoes a lone active)
  if (allMatched.length >= 2) {
    const hero = pickHero(allMatched);
    const b = INGREDIENT_BENEFITS[hero];
    if (b) { const pos = /s$/i.test(hero) ? 'sus' : 'su'; sentences.push(`Destaca por ${pos} ${hero.toLowerCase()}, que ${b}.`); }
  }

  return sentences.join(' ');
}

/* ── helpers ───────────────────────────────────────────────────────────── */

// Spanish list join: "a", "a y b", "a, b y c"
function listEs(items) {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  return items.slice(0, -1).join(', ') + ' y ' + items[items.length - 1];
}
// Join clauses with "; " but the last with ", y "
function joinSentences(s) {
  if (s.length === 1) return s[0];
  return s.slice(0, -1).join('; ') + ', y ' + s[s.length - 1];
}
// Rank actives by how "hero"/notable they are, most notable first.
const ACTIVE_PRIORITY = [
  'Retinol/Bakuchiol','Ácido Tranexámico','Alfa-Arbutina','Vitamina C',
  'PDRN / ADN Sódico','Péptidos','Ácido Azelaico','Niacinamida',
  'Glutatión','Adenosina','Centella Asiática','Ceramidas',
  'Ácido Hialurónico','Escualano','Pantenol (B5)',
];
function rankActives(list) {
  return [...list].sort((a, b) => {
    const ia = ACTIVE_PRIORITY.indexOf(a), ib = ACTIVE_PRIORITY.indexOf(b);
    return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
  });
}
function pickHero(matched) { return rankActives(matched)[0] || matched[0]; }


// ── Catalog availability (auto-hide concerns with no matching stock) ──
function concernHasMatch(key) {
  const rule = QUIZ_CONCERN_INGREDIENTS[key];
  if (!rule) return false;
  const typeDefined = (rule.types || []).length > 0;
  return PRODUCTS.some(p => {
    if (!p.description || p.description === 'nan') return false;
    return typeDefined
      ? rule.types.some(t => p.types.includes(t))
      : (rule.ingredients || []).some(i => p.activeIngredients.includes(i));
  });
}
const AVAILABLE_CONCERNS = new Set(ALL_CONCERNS.map(c => c.key).filter(concernHasMatch));


// Product type slots per routine level
const ROUTINE_SLOTS = {
  basica:     ['Limpiador','Crema'],
  intermedia: ['Limpiador','Sérum/Ampolla','Crema','Protector Solar'],
  completa:   ['Limpiador','Tónico/Esencia','Sérum/Ampolla','Crema','Contorno de Ojos','Protector Solar','Aceite Limpiador'],
};

// Friendly labels for result section headers
const SLOT_LABELS = {
  'Limpiador':       { icon: '🧼', label: 'Limpieza' },
  'Aceite Limpiador':{ icon: '🫧', label: 'Limpieza en Aceite' },
  'Tónico/Esencia':  { icon: '💦', label: 'Tónico / Esencia' },
  'Sérum/Ampolla':   { icon: '💉', label: 'Sérum / Ampolla' },
  'Crema':           { icon: '🫙', label: 'Hidratante / Crema' },
  'Contorno de Ojos':{ icon: '👁️', label: 'Contorno de Ojos' },
  'Protector Solar': { icon: '🌞', label: 'Protector Solar' },
  'Mascarilla':      { icon: '🎭', label: 'Mascarilla' },
  'Bruma':           { icon: '🌬️', label: 'Bruma' },
};

function scoreProduct(p, skin, isSensitive, concerns) {
  // Skip products with no meaningful data
  if (!p.description || p.description === 'nan' || !p.name) return -99;

  let score = 0;

  // ── Skin type match ──
  if (p.skinTypes.includes(skin)) score += 10;           // exact base type match
  else if (p.skinTypes.includes('Todo Tipo')) score += 6; // universal fit
  else if (p.skinTypes.length === 0) score += 1;          // no data — barely counts
  else score -= 2;                                         // wrong skin type — penalize

  // ── Sensitive modifier ──
  // Products explicitly formulated for sensitive skin get a bonus when isSensitive is true.
  // Products NOT marked for sensitive also don't get penalised — they just don't get the bonus.
  if (isSensitive && p.skinTypes.includes('Piel Sensible')) score += 8;
  // Boost calming ingredients regardless of product skin type tag
  if (isSensitive) {
    const calmingIngredients = ['Centella Asiática','Ceramidas','Pantenol (B5)'];
    calmingIngredients.forEach(ing => {
      if (p.activeIngredients.includes(ing)) score += 2;
    });
  }

  // ── Concern match ──
  const desiredIngredients = new Set();
  const desiredTypes = new Set();
  const desiredSkinTypes = new Set();

  concerns.forEach(key => {
    const rule = QUIZ_CONCERN_INGREDIENTS[key];
    if (!rule) return;
    rule.ingredients.forEach(i => desiredIngredients.add(i));
    (rule.types || []).forEach(t => desiredTypes.add(t));
    rule.skinTypes.forEach(s => desiredSkinTypes.add(s));
  });

  // Count how many distinct concerns this product addresses
  const concernsCovered = concerns.filter(key => {
    const rule = QUIZ_CONCERN_INGREDIENTS[key];
    if (!rule) return false;
    const hasIngredient = rule.ingredients.some(i => p.activeIngredients.includes(i));
    const hasType = (rule.types || []).some(t => p.types.includes(t));
    const hasSkin = rule.skinTypes.some(s => p.skinTypes.includes(s) || p.skinTypes.includes('Todo Tipo'));
    return hasIngredient || hasType || hasSkin;
  }).length;

  // Reward breadth of concern coverage, not just ingredient count
  score += concernsCovered * 8;

  // Extra points per matching ingredient (secondary signal)
  p.activeIngredients.forEach(ing => {
    if (desiredIngredients.has(ing)) score += 2;
  });

  // Type match bonus (e.g. sun concern → sunscreen)
  p.types.forEach(t => {
    if (desiredTypes.has(t)) score += 6;
  });

  // Skin type concern match (e.g. acne concern helps rank 'Piel con Acné' products higher)
  p.skinTypes.forEach(s => {
    if (desiredSkinTypes.has(s)) score += 3;
  });

  // ── Brand priority boost ──
  // Small tiebreaker boost for priority brands. Not enough to override
  // a clearly better product, but breaks ties in favour of AXIS-Y and Herbloom.
  if (p.brand === 'AXIS-Y' || p.brand === 'Herbloom') score += 3;

  // ── Brand de-prioritisation ──
  // Tony Moly products are lifestyle/impulse items — deprioritise in routine builder.
  if (p.brand === 'Tony Moly') score -= 3;

  return score;
}

function buildReasonTag(p, skin, isSensitive, concerns) {
  const reasons = [];

  // Skin type match
  if (p.skinTypes.includes(skin)) reasons.push(`ideal para ${skin.toLowerCase()}`);
  else if (p.skinTypes.includes('Todo Tipo')) reasons.push('apto para todo tipo de piel');

  // Condition matches
  if (isSensitive && p.skinTypes.includes('Piel Sensible')) reasons.push('apto para piel sensible');
  if (concerns.includes('acne') && p.skinTypes.includes('Piel con Acné')) reasons.push('formulado para piel con acné');
  if (concerns.includes('arrugas') && p.skinTypes.includes('Piel Madura')) reasons.push('formulado para piel madura');

  // Ingredient/type matches
  concerns.forEach(key => {
    const rule = QUIZ_CONCERN_INGREDIENTS[key];
    if (!rule) return;
    const matchedIng = rule.ingredients.filter(i => p.activeIngredients.includes(i));
    const hasType = (rule.types || []).some(t => p.types.includes(t));
    const concern = ALL_CONCERNS.find(c => c.key === key);
    if (hasType && concern) reasons.push(concern.label.toLowerCase());
    else if (matchedIng.length > 0 && concern) reasons.push(`${matchedIng[0].toLowerCase()} para ${concern.label.toLowerCase()}`);
  });

  if (!reasons.length) return '';
  // Dedupe and show up to 2
  return [...new Set(reasons)].slice(0, 2).map(r => `<span class="reason-tag">✓ ${r}</span>`).join('');
}

function showResults() {
  const skin = quizAnswers.skinType;
  const isSensitive = quizAnswers.isSensitive;
  const concerns = quizAnswers.concerns;
  const routine = quizAnswers.routine;

  // ── Routine slots ──
  const slots = [...(ROUTINE_SLOTS[routine] || ROUTINE_SLOTS['intermedia'])];
  if (concerns.includes('sol') && !slots.includes('Protector Solar')) slots.push('Protector Solar');
  if (concerns.includes('ojeras') && !slots.includes('Contorno de Ojos')) slots.push('Contorno de Ojos');

  // ── Score all products ──
  const scored = PRODUCTS.map(p => ({
    ...p,
    score: scoreProduct(p, skin, isSensitive, concerns),
    origIdx: PRODUCTS.indexOf(p),
  })).sort((a, b) => b.score - a.score);

  // ── TAB 1: Routine — up to 2 products per slot, no repeats across slots ──
  // Rules:
  //   • Primary must have score >= MIN_VIABLE_SCORE (otherwise it's a poor match — skip the slot).
  //   • Second option only shown if it exists AND its score is >= 60% of the primary's score
  //     AND its absolute score is >= MIN_VIABLE_SCORE. Handles thin slots gracefully.
  const usedIdx = new Set();
  const slotResults = [];
  const SECOND_OPTION_THRESHOLD = 0.6; // 60% of top score
  const MIN_VIABLE_SCORE = 1; // products scoring 0 or below are poor matches

  slots.forEach(slot => {
    const matchesSlot = (p) => {
      // Limpiador slot = foam/gel/balm cleansers only. Oil cleansers go in their own slot.
      if (slot === 'Limpiador') return p.types.includes('Limpiador') && !p.types.includes('Aceite Limpiador');
      if (slot === 'Aceite Limpiador') return p.types.includes('Aceite Limpiador');
      if (slot === 'Crema') return p.types.includes('Crema') && !p.types.includes('Contorno de Ojos');
      if (slot === 'Contorno de Ojos') return p.types.includes('Contorno de Ojos');
      return p.types.includes(slot);
    };

    // Candidates for this slot, in score order, not used in a prior slot
    const candidates = scored.filter(p => !usedIdx.has(p.origIdx) && matchesSlot(p));
    if (!candidates.length) return;

    const primary = candidates[0];
    if (primary.score < MIN_VIABLE_SCORE) return; // skip slot entirely if best option is poor fit
    usedIdx.add(primary.origIdx);
    const products = [primary];

    // Try to add a second option
    const secondary = candidates[1];
    if (secondary
        && secondary.score >= MIN_VIABLE_SCORE
        && secondary.score >= primary.score * SECOND_OPTION_THRESHOLD) {
      usedIdx.add(secondary.origIdx);
      products.push(secondary);
    }

    slotResults.push({ slot, products });
  });

  // ── TAB 2: All compatible products (skin + sensitive + concern match) ──
  // Curation: products are score-ranked, then we keep only those that score at least
  // 40% of the top product's score, capped at 12 total. This avoids surfacing weak matches
  // that happen to share one common ingredient (e.g., hialurónico) with the user's concerns.
  // After capping, we top up with the best available product from each missing core type
  // (provided it still passes the relative threshold), so users see at least one option per category.
  const RECOMMENDED_REL_THRESHOLD = 0.4; // ≥40% of top score
  const RECOMMENDED_MAX_COUNT = 12;       // hard cap before top-up
  const CORE_TYPES = ['Limpiador','Tónico/Esencia','Sérum/Ampolla','Crema','Contorno de Ojos','Protector Solar','Aceite Limpiador','Mascarilla'];

  const candidates = scored.filter(p => {
    if (!p.description || p.description === 'nan') return false;
    return p.skinTypes.includes(skin) || p.skinTypes.includes('Todo Tipo'); // must match skin type
  });

  let allMatches = [];
  if (candidates.length) {
    const topScore = candidates[0].score;
    if (topScore > 0) {
      const minScore = topScore * RECOMMENDED_REL_THRESHOLD;
      const passing = candidates.filter(p => p.score >= minScore);
      allMatches = passing.slice(0, RECOMMENDED_MAX_COUNT);

      // Top-up: ensure each core product type has at least one representative.
      // For each missing type, find the best-scoring candidate of that type from the
      // full passing list (not just the top 12), and append if not already included.
      const includedIdx = new Set(allMatches.map(p => p.origIdx));
      const typesPresent = new Set();
      allMatches.forEach(p => p.types.forEach(t => typesPresent.add(t)));

      CORE_TYPES.forEach(t => {
        if (typesPresent.has(t)) return;
        const filler = passing.find(p => !includedIdx.has(p.origIdx) && p.types.includes(t));
        if (filler) {
          allMatches.push(filler);
          includedIdx.add(filler.origIdx);
          filler.types.forEach(tt => typesPresent.add(tt));
        }
      });
    }
  }

  // ── Profile tags ──
  const concernLabels = concerns.map(k => ALL_CONCERNS.find(c => c.key === k)).filter(Boolean);
  document.getElementById('results-profile').innerHTML =
    `<span class="profile-tag">✨ ${skin}</span>` +
    (isSensitive ? `<span class="profile-tag">🌸 Piel Sensible</span>` : '') +
    concernLabels.map(c => `<span class="profile-tag">${c.icon} ${c.label}</span>`).join('') +
    `<span class="profile-tag">${routine === 'basica' ? '🌱 Rutina básica' : routine === 'intermedia' ? '🌿 Rutina intermedia' : '🌳 Rutina completa'}</span>`;

  // Total products across all slots (counting alternatives too)
  const totalRoutineProducts = slotResults.reduce((sum, s) => sum + s.products.length, 0);

  document.getElementById('results-subtitle').textContent =
    `${slotResults.length} pasos · ${totalRoutineProducts} productos · ${allMatches.length} compatibles`;

  // ── Tab counts ──
  document.getElementById('routine-count').textContent = totalRoutineProducts;
  document.getElementById('matches-count').textContent = allMatches.length;

  // ── Render routine slots (with up to 2 products per slot) ──
  const sectionsEl = document.getElementById('results-sections');
  sectionsEl.innerHTML = '';

  const renderSlotCard = (p, isAlt) => {
    const imgSrc = p.image && p.image !== 'nan' ? p.image : '';
    const reasonHTML = buildReasonTag(p, skin, isSensitive, concerns);
    const whyHTML = renderWhy(explainMatch(p, skin, isSensitive, concerns));
    return `
      <div class="slot-card${isAlt ? ' alt' : ''}" onclick="openModal(${p.origIdx})">
        <div class="slot-card-img">
          ${imgSrc
            ? `<img src="${imgSrc}" alt="${p.name}" onerror="this.parentElement.style.background='var(--rose-light)';this.remove()">`
            : `<div style="width:100%;min-height:96px;height:100%;display:flex;align-items:center;justify-content:center;font-size:2rem;">${BRAND_INFO[p.brand]?.emoji || '🌸'}</div>`}
        </div>
        <div class="slot-card-body">
          <div class="card-brand">${p.brand}</div>
          <div class="card-name" style="font-size:0.88rem;margin-bottom:7px;">${p.name}</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;">${reasonHTML}</div>
          ${whyHTML ? `<p class="why-text">${whyHTML}</p>` : ''}
        </div>
      </div>
    `;
  };

  slotResults.forEach(({ slot, products }) => {
    const meta = SLOT_LABELS[slot] || { icon: '🧴', label: slot };
    const section = document.createElement('div');
    section.className = 'slot-section';
    section.innerHTML = `
      <div class="slot-label">${meta.icon} ${meta.label}${products.length > 1 ? ' · 2 opciones' : ''}</div>
      <div class="slot-cards-stack">
        ${products.map((p, i) => renderSlotCard(p, i > 0)).join('')}
      </div>
    `;
    sectionsEl.appendChild(section);
  });

  // ── Render all-matches grid ──
  const matchGrid = document.getElementById('results-match-grid');
  matchGrid.innerHTML = '';
  document.getElementById('matches-desc').textContent =
    `Los ${allMatches.length} productos más compatibles con tu perfil, ordenados por afinidad. Los incluidos en tu rutina están marcados.`;

  allMatches.forEach(p => {
    const typeLabel = primaryType(p.types);
    const imgSrc = p.image && p.image !== 'nan' ? p.image : '';
    const inRoutine = usedIdx.has(p.origIdx);
    const div = document.createElement('div');
    div.className = 'product-card';
    div.setAttribute('data-types', p.types.join(','));
    div.onclick = () => openModal(p.origIdx);
    div.innerHTML = `
      <div class="card-img-wrap">
        ${imgSrc ? `<img src="${imgSrc}" alt="${p.name}" onerror="this.parentElement.style.background='var(--rose-light)';this.remove()">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;">${BRAND_INFO[p.brand]?.emoji || '🌸'}</div>`}
        <div class="card-type-badge">${typeLabel}</div>
        ${inRoutine ? `<div style="position:absolute;bottom:8px;left:8px;right:8px;text-align:center;background:var(--sage);color:white;border-radius:8px;padding:2px 6px;font-size:0.58rem;font-weight:700;letter-spacing:0.05em;">✓ En tu rutina</div>` : ''}
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.name}</div>
        <div class="card-tags">
          ${(!p.skinTypes.length || p.skinTypes.includes('Todo Tipo')) ? `<span class="card-tag">Todo Tipo</span>` : p.skinTypes.slice(0,2).map(s => `<span class="card-tag">${s}</span>`).join('')}
          ${sortedActives(p).slice(0,3).map(i => `<span class="card-tag pink${activeFilters.ingredients.includes(i)?' ing-active':''}" onclick="event.stopPropagation();toggleIngredient('${i}')">${i}</span>`).join('')}
        </div>
      </div>
    `;
    matchGrid.appendChild(div);
  });

  switchResultTab('routine');
  // Reset the type filter to "Todos"
  document.querySelectorAll('.match-filter-chip').forEach(c => {
    c.className = 'match-filter-chip' + (c.getAttribute('data-type') === 'all' ? ' active' : '');
  });
  document.getElementById('match-empty').style.display = 'none';
  document.getElementById('results-match-grid').style.display = 'grid';
  // Add attention animation to the Todos Recomendados tab — drops off once user clicks it
  document.getElementById('tab-matches').classList.add('attention');
  switchView('results');

  // Track quiz completion in GA4
  if (typeof gtag === 'function') {
    // Build per-concern booleans so each concern is independently reportable in GA4.
    // (The raw `concerns` comma-string is also kept, useful for spotting popular combinations.)
    const ALL_CONCERN_KEYS = ['acne','manchas','arrugas','hidratacion','poros','rojeces','brillo','barrera','ojeras','sol'];
    const concernFlags = {};
    ALL_CONCERN_KEYS.forEach(k => {
      concernFlags['concern_' + k] = concerns.includes(k) ? 'sí' : 'no';
    });

    const ROUTINE_LABELS = { basica: 'Básica', intermedia: 'Intermedia', completa: 'Completa' };

    gtag('event', 'quiz_completed', {
      skin_type: skin,
      is_sensitive: isSensitive ? 'sí' : 'no',
      concerns: concerns.slice().sort().join(','), // sorted so "acne,manchas" == "manchas,acne"
      // Numeric values sent twice — once for dimension (group/filter), once for metric (avg/sum)
      concern_count: concerns.length,
      concern_count_m: concerns.length,
      routine_level: ROUTINE_LABELS[routine] || routine,
      routine_products: totalRoutineProducts,
      routine_products_m: totalRoutineProducts,
      recommendations: allMatches.length,
      recommendations_m: allMatches.length,
      ...concernFlags,
    });
  }
}

function switchResultTab(tab) {
  document.getElementById('tab-routine').className  = 'result-tab'  + (tab === 'routine'  ? ' active' : '');
  document.getElementById('tab-matches').className  = 'result-tab'  + (tab === 'matches'  ? ' active' : '');
  document.getElementById('panel-routine').className = 'result-tab-panel' + (tab === 'routine'  ? ' active' : '');
  document.getElementById('panel-matches').className = 'result-tab-panel' + (tab === 'matches'  ? ' active' : '');
  // Once the user has visited the matches tab, stop the attention animation permanently
  if (tab === 'matches') {
    document.getElementById('tab-matches').classList.remove('attention');
  }
}

function filterMatchGrid(type) {
  // Update chip active state
  document.querySelectorAll('.match-filter-chip').forEach(c => {
    c.className = 'match-filter-chip' + (c.getAttribute('data-type') === type ? ' active' : '');
  });

  // Show/hide cards
  const cards = document.querySelectorAll('#results-match-grid .product-card');
  let visible = 0;
  cards.forEach(card => {
    const cardTypes = (card.getAttribute('data-types') || '').split(',');
    const show = type === 'all' ||
      cardTypes.includes(type) ||
      (type === 'Limpiador' && cardTypes.includes('Aceite Limpiador'));
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  document.getElementById('match-empty').style.display = visible === 0 ? 'block' : 'none';
  document.getElementById('results-match-grid').style.display = visible === 0 ? 'none' : 'grid';
}

function retakeQuiz() {
  showQuiz();
}

// ── BRANDS VIEW ──
function renderBrands() {
  const grid = document.getElementById('brands-grid');
  grid.innerHTML = '';
  Object.entries(BRAND_INFO).forEach(([brand, info]) => {
    const count = PRODUCTS.filter(p => p.brand === brand).length;
    const sampleImgs = PRODUCTS.filter(p => p.brand === brand && p.image && p.image !== 'nan').slice(0,3);
    const div = document.createElement('div');
    div.style.cssText = 'background:var(--white);border-radius:16px;padding:20px;box-shadow:var(--shadow);cursor:pointer;';
    div.onclick = () => { switchView('catalog'); resetFilters(); /* filter by brand */ filterByBrand(brand); };
    div.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;">
        <div style="font-size:2.2rem;">${info.emoji}</div>
        <div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;">${brand}</div>
          <div style="font-size:0.75rem;color:var(--mid);">${count} productos</div>
        </div>
      </div>
      <p style="font-size:0.8rem;color:var(--mid);line-height:1.5;margin-bottom:14px;">${info.desc}</p>
      <div style="display:flex;gap:6px;">
        ${sampleImgs.map(p => `<div style="width:52px;height:52px;border-radius:10px;overflow:hidden;background:var(--cream);flex-shrink:0;"><img src="${p.image}" style="width:100%;height:100%;object-fit:cover;" onerror="this.parentElement.style.background='var(--rose-light)';this.remove()"></div>`).join('')}
      </div>
      <div style="margin-top:14px;background:var(--rose);color:white;border-radius:20px;padding:8px 16px;font-size:0.78rem;font-weight:500;text-align:center;">Ver productos →</div>
    `;
    grid.appendChild(div);
  });
}

function filterByBrand(brand) {
  // We'll add a temporary "brand" chip message
  const countEl = document.getElementById('count-text');
  const filtered = PRODUCTS.filter(p => p.brand === brand);
  renderCatalog(filtered);
  countEl.textContent = `${filtered.length} productos · ${brand}`;
}

// ── INGREDIENT FILTER ──
// Frequency map for sorting actives rarest-first (most distinctive first on cards)
const ING_FREQ = {};
PRODUCTS.forEach(p => p.activeIngredients.forEach(i => { ING_FREQ[i] = (ING_FREQ[i]||0)+1; }));

function sortedActives(p) {
  return [...p.activeIngredients].sort((a,b) => (ING_FREQ[a]||0) - (ING_FREQ[b]||0));
}

const ALL_ACTIVES = [...new Set(PRODUCTS.flatMap(p => p.activeIngredients))]
  .sort((a,b) => (ING_FREQ[a]||0) - (ING_FREQ[b]||0));

// ── DROPDOWNS ──
let openDropdown = null; // 'type' | 'ing' | null

function buildIngChips() {
  const panel = document.getElementById('dd-ing-panel');
  panel.innerHTML = ALL_ACTIVES.map(ing => {
    const count = PRODUCTS.filter(p => p.activeIngredients.includes(ing)).length;
    return `<div class="dd-option" data-ing="${ing}" onclick="toggleIngredient('${ing}')">${ing} <span style="margin-left:auto;opacity:0.45;font-size:0.7rem;">${count}</span></div>`;
  }).join('');
}

function toggleDropdown(which) {
  const panel = document.getElementById(`dd-${which}-panel`);
  const btn   = document.getElementById(`dd-${which}-btn`);
  const isOpen = panel.classList.contains('open');
  // close any open dropdown first
  closeAllDropdowns();
  if (!isOpen) {
    panel.classList.add('open');
    btn.classList.add('open');
    openDropdown = which;
  }
}

function closeAllDropdowns() {
  ['type','ing'].forEach(w => {
    document.getElementById(`dd-${w}-panel`)?.classList.remove('open');
    document.getElementById(`dd-${w}-btn`)?.classList.remove('open');
  });
  openDropdown = null;
}

// Close dropdowns when clicking outside
document.addEventListener('click', e => {
  if (openDropdown && !e.target.closest('.dd-wrap')) closeAllDropdowns();
});

function toggleTypeFilter(val) {
  const idx = activeFilters.types.indexOf(val);
  if (idx > -1) activeFilters.types.splice(idx, 1);
  else activeFilters.types.push(val);
  updateTypeDDStyles();
  applyFilters();
}

function updateTypeDDStyles() {
  const n = activeFilters.types.length;
  const badge = document.getElementById('dd-type-badge');
  const btn   = document.getElementById('dd-type-btn');
  const label = document.getElementById('dd-type-label');
  badge.textContent = n || '';
  badge.classList.toggle('visible', n > 0);
  btn.classList.toggle('active', n > 0);
  label.textContent = n === 0 ? 'Tipo de producto'
    : n === 1 ? activeFilters.types[0]
    : `${n} tipos`;
  document.querySelectorAll('#dd-type-panel .dd-option').forEach(el => {
    el.classList.toggle('selected', activeFilters.types.includes(el.dataset.val));
  });
}

function toggleIngredient(ing) {
  const idx = activeFilters.ingredients.indexOf(ing);
  if (idx > -1) activeFilters.ingredients.splice(idx, 1);
  else activeFilters.ingredients.push(ing);
  updateIngDDStyles();
  applyFilters();
}


function updateIngDDStyles() {
  const n = activeFilters.ingredients.length;
  const badge = document.getElementById('dd-ing-badge');
  const btn   = document.getElementById('dd-ing-btn');
  const label = document.getElementById('dd-ing-label');
  badge.textContent = n || '';
  badge.classList.toggle('visible', n > 0);
  btn.classList.toggle('active', n > 0);
  label.textContent = n === 0 ? 'Ingrediente activo'
    : n === 1 ? activeFilters.ingredients[0]
    : `${n} ingredientes`;
  document.querySelectorAll('#dd-ing-panel .dd-option').forEach(el => {
    el.classList.toggle('selected', activeFilters.ingredients.includes(el.dataset.ing));
  });
}

// Legacy stubs (called from resetFilters)
function updateIngChipStyles() { updateIngDDStyles(); }
function updateIngCount() { updateIngDDStyles(); updateTypeDDStyles(); }

// ── IDLE SCREEN (kiosk mode) ──────────────────────────────────────
// Any click anywhere resets the countdown. No clicks for
// IDLE_WARNING_MS → "¿Sigues ahí?" popup. Still no clicks for another
// IDLE_RESET_MS → reset to the home screen and show the attract loop.
// ══════════════════════════════════════════════════════════════════════
// KIOSK / IDLE SCREEN CONFIG
// ══════════════════════════════════════════════════════════════════════
//  • KIOSK_MODE is set in tablet.html (true) and qr.html (false) — this
//    same catalog-app.js file is shared by both, this is the only
//    switch between them.
//  • When KIOSK_MODE is true: if nobody taps anything for
//    IDLE_WARNING_MS, a "¿Sigues ahí?" popup appears. If there's still
//    no tap for another IDLE_RESET_MS, the app resets to the home
//    screen and shows a full-screen attract loop (IDLE_VIDEO_URL, if
//    set) until the next tap. Set IDLE_VIDEO_URL to a self-hosted .mp4
//    (same idea as IMAGE_BASE_URL — host it wherever the images live).
//    Leave it blank to just show the logo/tagline instead of a video.
//  • When KIOSK_MODE is false (qr.html): none of this runs. A shopper
//    on their own phone is never interrupted or reset to home.
// ══════════════════════════════════════════════════════════════════════
const IDLE_WARNING_MS = 60000;      // show "¿Sigues ahí?" after this many ms of no clicks (default 60s)
const IDLE_RESET_MS = 10000;        // then reset to home after this many more ms (default 10s)
const IDLE_VIDEO_URL = "";          // e.g. "https://kbeautyimports.com/videos/attract-loop.mp4" — leave blank for logo fallback

let idleWarnTimer = null;
let idleResetTimer = null;

function scheduleIdleWarning() {
  clearTimeout(idleWarnTimer);
  clearTimeout(idleResetTimer);
  idleWarnTimer = setTimeout(showIdleWarning, IDLE_WARNING_MS);
}

function showIdleWarning() {
  document.getElementById('idle-warning-overlay').classList.add('open');
  idleResetTimer = setTimeout(triggerIdleReset, IDLE_RESET_MS);
}

function dismissIdleWarning() {
  document.getElementById('idle-warning-overlay').classList.remove('open');
}

function triggerIdleReset() {
  dismissIdleWarning();
  // Send the app back to a clean home screen for the next shopper
  closeModalBtn();
  resetFilters();
  switchView('catalog');
  showIdleScreensaver();
}

function showIdleScreensaver() {
  const overlay = document.getElementById('idle-screensaver');
  const video = document.getElementById('idle-video');
  const fallback = document.getElementById('idle-screensaver-fallback');
  if (IDLE_VIDEO_URL) {
    video.src = IDLE_VIDEO_URL;
    video.style.display = 'block';
    fallback.style.display = 'none';
    video.currentTime = 0;
    video.play().catch(() => {});
  } else {
    video.style.display = 'none';
    fallback.style.display = 'block';
  }
  overlay.classList.add('open');
}

function hideIdleScreensaver() {
  const overlay = document.getElementById('idle-screensaver');
  const video = document.getElementById('idle-video');
  overlay.classList.remove('open');
  video.pause();
}

function resetIdleTimers() {
  if (videoPauseActive) return; // a review video is open — see pauseIdleForVideo()
  dismissIdleWarning();
  hideIdleScreensaver();
  scheduleIdleWarning();
}

document.addEventListener('click', resetIdleTimers);

// ── IDLE PAUSE WHILE A REVIEW VIDEO IS PLAYING (kiosk only) ────────
// Taps inside the embedded TikTok/Instagram player happen in a
// cross-origin iframe, so they never bubble up as a document click —
// the idle timer would count someone watching a 60s video as 60s of
// silence. Pausing the timers while the player is open avoids kicking
// them out mid-video. VIDEO_SAFETY_CAP_MS is a backstop in case
// someone opens a video and walks away without closing it.
const VIDEO_SAFETY_CAP_MS = 180000; // 3 min
let videoPauseActive = false;
let videoSafetyTimer = null;

function pauseIdleForVideo() {
  clearTimeout(idleWarnTimer);
  clearTimeout(idleResetTimer);
  dismissIdleWarning();
  videoPauseActive = true;
  clearTimeout(videoSafetyTimer);
  videoSafetyTimer = setTimeout(closeReviewPlayer, VIDEO_SAFETY_CAP_MS);
}

function resumeIdleAfterVideo() {
  videoPauseActive = false;
  clearTimeout(videoSafetyTimer);
  scheduleIdleWarning();
}

// ── INIT ──
buildIngChips();
renderCatalog(PRODUCTS);
renderBrands();
if (KIOSK_MODE) scheduleIdleWarning();
