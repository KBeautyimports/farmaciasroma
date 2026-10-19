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
// ══════════════════════════════════════════════════════════════════════
const REVIEW_THUMBS = {
  "https://www.tiktok.com/@.courtpaige/video/7482859685813521710": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@_lilyis/video/7314987688426261806": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@alicelinnea__/video/7496917263610613014": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@annietamaki/video/7351091069909486891": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@aprilbasi/video/7047662884159098158": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@bahafreshhh/video/7602036051909119246": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@beautywithangee/video/7523158819472428319": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@beautywithangee/video/7523482051639512350": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@bellaayar/video/7593329402641911058": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@brutechoi/video/7380720379683179819": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@cande.copello/video/7532253881405803790": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@chareesbeauty/video/7216011778944224518": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@chrishanxoxo/video/7550655001895439646": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@chxrry.glowy/video/7451980683062349073": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@drjennyliu/video/7520612757511720205": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@evasbeautyreviews/video/7589212337152806166": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@guilty_as_skin/video/7441291802897943826": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@honestphoebe/video/7410795768316955936": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@james_s_welsh/video/7377066058227682592": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@jennileeashlee/video/7312658993942613294": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@kozinx/video/7563722697771928854": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@kripapateljoshi/video/7456084772662578462": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@kristingl/video/7313011814034427179": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@kristingl/video/7368987702856912171": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@kristingl/video/7388989748691356970": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@kristingl/video/7450161393522756907": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@kristingl/video/7532592925578906935": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@lifewithkyleen/video/7348885926300486917": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@livia.nguyen/video/7454009598131932422": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@maggieanne.n/video/7367823781978492192": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@melainaleah/video/7242582176317836546": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@missmaroonz/video/7313105668230139143": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@nphiynhi/video/7440179615907253550": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@reinalum/video/7221835023291370758": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@saga.maria/video/7579707003958889750": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@sirilak_marque/video/7378115402418687264": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@skincare.aep/video/7339893828280765703": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@skincareuprising/video/7318343048818167058": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@songofskin/video/7346574552731897118": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@songofskin/video/7394431002623495466": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@tatheerfatemah/video/7514750561430818070": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@therealbeatrixramosaj/video/7468284286689348906": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@theskinpriest_/video/7603119329088982294": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@thewrightglow/video/7016359768960945413": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@yepposoonsoo/video/7436423789354814752": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"},
  "https://www.tiktok.com/@yesstyle/video/7559973192664763656": {"thumb":null,"dead":false,"author":null,"checked":"2026-10-19"}
};
