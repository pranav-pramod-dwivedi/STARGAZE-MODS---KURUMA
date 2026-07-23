/* ============================================================
   Kurama — Red/Black Firebase Console
   All JS logic, Firebase auth fix, SVGs, features
   ============================================================ */

// ─── SVG Icons (no emojis) ──────────────────────────────────
const I = {
  lock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  unlock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 019.9-1"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>`,
  keyboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h8"/></svg>`,
  tree: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M8 8l4-4 4 4M8 16l4 4 4-4"/></svg>`,
  braces: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H7a2 2 0 00-2 2v5a2 2 0 01-2 2 2 2 0 012 2v5c0 1.1.9 2 2 2h1"/><path d="M16 3h1a2 2 0 012 2v5a2 2 0 002 2 2 2 0 00-2 2v5a2 2 0 01-2 2h-1"/></svg>`,
  key: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>`,
  package: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  import: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  camera: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`,
  copy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  dice: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="8" cy="8" r="1.5"/><circle cx="16" cy="8" r="1.5"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg>`,
  ban: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  move: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  collapse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="12" x2="15" y2="12"/></svg>`,
  expand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
  save: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>`,
  duplicate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  filter: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  sort: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="16" y2="6"/><line x1="4" y1="12" x2="12" y2="12"/><line x1="4" y1="18" x2="8" y2="18"/><polyline points="18 8 22 12 18 16"/><polyline points="22 8 18 12 22 16"/></svg>`,
  history: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/><path d="M3 12h2m14 0h2"/></svg>`,
  bookmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>`,
  command: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 00-3 3v12a3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3H6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3V6a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3h12a3 3 0 003-3 3 3 0 00-3-3z"/></svg>`,
  terminal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`,
  zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
  hash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  grid: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
  list: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>`,
  database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  tag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>`,
  clip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>`,
  tool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
  checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  xCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  play: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,
  sideCollapse: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>`,
  minus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
};

// ─── SV icon helper ─────────────────────────────────────────
function icon(name) { return I[name] || I.info; }
function icn(name, cls) { return `<span class="${cls||''}">${icon(name)}</span>`; }

// ─── Config ──────────────────────────────────────────────────
const DB_URL = 'https://kurama-mods-pro-default-rtdb.firebaseio.com';
const API_KEY = 'AIzaSyDcPbyCSJGwY3-WrICK2swoqRArbsihMEA';

// ─── State ──────────────────────────────────────────────────
let S = {
  dbData: null,
  dbPath: '',
  selectedNodePath: null,
  treeSearchTerm: '',
  currentView: 'tree',
  autoRefreshTimer: null,
  ctxTargetPath: null,
  keysData: {},
  keysCurrentPage: 0,
  KEYS_PER_PAGE: 50,
  selectedKeys: new Set(),
  snapshots: JSON.parse(localStorage.getItem('krm_snapshots') || '[]'),
  readOnly: localStorage.getItem('krm_readonly') === 'true',
  authToken: null,
  authReady: false,
  theme: localStorage.getItem('krm_theme') || 'dark',
  bookmarks: JSON.parse(localStorage.getItem('krm_bookmarks') || '[]'),
  history: JSON.parse(localStorage.getItem('krm_history') || '[]'),
  keysRenderTimer: null,
  autoSnapshotTimer: null,
  lastFocus: null,
  cmdPaletteOpen: false,
  sidebarCollapsed: localStorage.getItem('krm_sidebar_collapsed') === 'true',
};

// ─── Firebase Auth ─────────────────────────────────────────
async function initAuth() {
  try {
    const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnSecureToken: true })
    });
    const data = await res.json();
    if (data.idToken) {
      S.authToken = data.idToken;
      S.authReady = true;
      setStatus(true);
      return true;
    }
    throw new Error(data.error?.message || 'Auth failed');
  } catch (e) {
    S.authReady = false;
    setStatus(false);
    return false;
  }
}

// ─── API Layer (with auth fix for writes) ──────────────────
async function apiFetch(path, opts = {}) {
  const hasBody = opts.method && opts.method !== 'GET' && opts.body;
  const authParam = S.authToken ? `auth=${S.authToken}` : `key=${API_KEY}`;
  const url = `${DB_URL}${path}.json?${authParam}`;
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    ...opts
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    if (res.status === 401 && S.authToken) {
      S.authToken = null;
      const renewed = await initAuth();
      if (renewed) return apiFetch(path, opts);
    }
    throw new Error(`HTTP ${res.status}${errText ? ': ' + errText : ''}`);
  }
  return res.status === 204 ? null : res.json();
}
function apiGet(path) { return apiFetch(path); }
function apiPut(path, data) { return apiFetch(path, { method: 'PUT', body: JSON.stringify(data) }); }
function apiPatch(path, data) { return apiFetch(path, { method: 'PATCH', body: JSON.stringify(data) }); }
function apiDelete(path) { return apiFetch(path, { method: 'DELETE' }); }

// ─── Toast ─────────────────────────────────────────────────
function toast(msg, type = 'info') {
  const c = document.getElementById('toastContainer');
  const t = document.createElement('div');
  t.className = 'toast ' + (type === 'success' ? 's' : type === 'error' ? 'e' : 'i');
  t.innerHTML = `<span style="display:inline-flex;align-items:center;gap:6px">${icon(type==='success'?'checkCircle':type==='error'?'xCircle':'info')} ${esc(msg)}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity .3s'; setTimeout(() => t.remove(), 300); }, 3000);
}

// ─── Read-Only Mode ────────────────────────────────────────
function toggleReadOnly() {
  S.readOnly = !S.readOnly;
  localStorage.setItem('krm_readonly', S.readOnly);
  applyReadOnly();
  refreshAll();
}

function applyReadOnly() {
  const banner = document.getElementById('roBanner');
  const btn = document.getElementById('roToggle');
  if (S.readOnly) {
    banner.classList.add('active');
    if (btn) btn.innerHTML = icon('lock') + ' Read Only';
    document.querySelectorAll('.ro-hide').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.inp').forEach(el => { if (!el.closest('.modal-overlay')) el.setAttribute('readonly', ''); });
  } else {
    banner.classList.remove('active');
    if (btn) btn.innerHTML = icon('unlock') + ' Editing';
    document.querySelectorAll('.ro-hide').forEach(el => el.style.display = '');
    document.querySelectorAll('.inp[readonly]').forEach(el => el.removeAttribute('readonly'));
  }
}

function checkWrite() {
  if (S.readOnly) { toast('Read-only mode — enable editing to modify', 'info'); return false; }
  return true;
}

// ─── View Switching ────────────────────────────────────────
function switchView(name) {
  S.currentView = name;
  document.querySelectorAll('.sidebar-item').forEach(el => el.classList.toggle('active', el.dataset.view === name));
  document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
  const v = document.getElementById('view-' + name);
  if (v) v.style.display = 'block';
  addHistory('Switch to ' + name);
  if (name === 'tree') loadTree();
  if (name === 'json') loadRawJson();
  if (name === 'keys') loadKeysView();
  if (name === 'project') loadProjectView();
  if (name === 'snapshots') renderSnapshots();
}

// ─── Status ────────────────────────────────────────────────
function setStatus(connected) {
  const el = document.getElementById('dbStatus');
  el.textContent = connected ? 'Connected' : 'Disconnected';
  el.className = 'badge ' + (connected ? 'online' : 'offline');
}

function updateNodeCount() {
  document.getElementById('nodeCount').textContent = (S.dbData ? countNodes(S.dbData) : 0) + ' nodes';
}

// ─── History (navigation history) ──────────────────────────
function addHistory(label) {
  S.history.push({ label, time: Date.now(), view: S.currentView, path: S.dbPath });
  if (S.history.length > 50) S.history = S.history.slice(-50);
  localStorage.setItem('krm_history', JSON.stringify(S.history));
}

// ─── Bookmarks ─────────────────────────────────────────────
function addBookmark(path, label) {
  S.bookmarks.push({ path, label: label || path, time: Date.now() });
  if (S.bookmarks.length > 20) S.bookmarks = S.bookmarks.slice(-20);
  localStorage.setItem('krm_bookmarks', JSON.stringify(S.bookmarks));
  renderBookmarks();
  toast('Bookmarked: ' + (label || path), 'success');
}

function removeBookmark(idx) {
  S.bookmarks.splice(idx, 1);
  localStorage.setItem('krm_bookmarks', JSON.stringify(S.bookmarks));
  renderBookmarks();
}

function renderBookmarks() {
  const el = document.getElementById('bookmarkList');
  if (!el) return;
  if (!S.bookmarks.length) { el.innerHTML = '<div style="font-size:11px;opacity:.4;padding:8px">No bookmarks</div>'; return; }
  el.innerHTML = S.bookmarks.map((b, i) =>
    `<div class="bookmark-item" onclick="navigateTo('${escJs(b.path)}')">
      ${icon('bookmark')}<span>${esc(b.label)}</span>
      <span class="del" onclick="event.stopPropagation();removeBookmark(${i})">${icon('close')}</span>
    </div>`
  ).join('');
}

// ─── Sidebar ───────────────────────────────────────────────
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  S.sidebarCollapsed = !S.sidebarCollapsed;
  sb.classList.toggle('collapsed', S.sidebarCollapsed);
  localStorage.setItem('krm_sidebar_collapsed', S.sidebarCollapsed);
}

// ─── Theme ─────────────────────────────────────────────────
function toggleTheme() {
  const root = document.documentElement;
  S.theme = S.theme === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', S.theme);
  localStorage.setItem('krm_theme', S.theme);
}

// ==================== TREE VIEW ============================
function loadTree(path) {
  if (path !== undefined) S.dbPath = path;
  const container = document.getElementById('treeContainer');
  container.innerHTML = `<div class="loading"><div class="sp"></div>Loading...</div>`;
  updatePathBar();
  apiGet('/' + S.dbPath).then(data => {
    S.dbData = data;
    container.innerHTML = '<div class="tree" id="treeRoot"></div>';
    if (S.treeSearchTerm) {
      renderTree(document.getElementById('treeRoot'), filterData(data, S.treeSearchTerm), S.dbPath);
    } else {
      renderTree(document.getElementById('treeRoot'), data, S.dbPath);
    }
    setStatus(true);
    updateNodeCount();
    document.getElementById('copyPathBtn').style.display = 'none';
    renderBookmarks();
  }).catch(e => {
    container.innerHTML = `<div style="color:var(--lg-danger);text-align:center;padding:40px;font-size:13px">${icon('error')} ${esc(e.message)}</div>`;
    setStatus(false);
  });
}

function updatePathBar() {
  const bar = document.getElementById('pathBar');
  if (!S.dbPath) { bar.innerHTML = `<span class="root" onclick="navigateTo('')">/</span>`; return; }
  const parts = S.dbPath.split('/');
  bar.innerHTML = `<span class="root" onclick="navigateTo('')">/</span>`;
  let cur = '';
  parts.forEach((p, i) => {
    cur += (i ? '/' : '') + p;
    bar.innerHTML += `<span class="sep">/</span><span class="seg" onclick="navigateTo('${escJs(cur)}')">${esc(p)}</span>`;
  });
}

function navigateTo(path) {
  closeDetail();
  addHistory('Navigate to /' + path);
  loadTree(path);
}

function renderTree(el, data, path) {
  if (data === null || data === undefined) {
    el.innerHTML = `<div class="tree-row"><span class="vl nl">null</span></div>`;
    return;
  }
  const type = typeof data;
  if (type !== 'object') {
    const cls = type === 'string' ? 'st' : type === 'number' ? 'num' : 'boo';
    const disp = type === 'string' ? `"${esc(String(data))}"` : String(data);
    el.innerHTML = `<div class="tree-row" onclick="selectNode('${escJs(path)}')" data-fp="${esc(path)}" oncontextmenu="showCtx(event,'${escJs(path)}')">
      <span class="vl ${cls}">${disp}</span><span class="acts">${S.readOnly?'':`
      <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();editNode('${escJs(path)}')">${icon('edit')}</button>
      <button class="btn btn-danger btn-xs ro-hide" onclick="event.stopPropagation();deleteNode('${escJs(path)}')">${icon('trash')}</button>`}
    </span></div>`;
    return;
  }
  const keys = Object.keys(data);
  const isEmpty = keys.length === 0;
  const isArr = Array.isArray(data);
  const keySafe = path.replace(/[^a-zA-Z0-9]/g,'_');
  const div = document.createElement('div');
  div.className = 'tree-node';
  const row = document.createElement('div');
  row.className = 'tree-row';
  row.innerHTML = `<span class="toggle" id="tog-${keySafe}" onclick="event.stopPropagation();toggleTree(this)">${isEmpty ? ' ' : '▾'}</span>
    <span class="tb">${isArr ? '[' + data.length + ']' : '{' + keys.length + '}'}</span>
    <span class="acts">${S.readOnly?'':`
    <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();showAddNodeModal('${escJs(path)}')">${icon('plus')}</button>
    <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();editNode('${escJs(path)}')">${icon('edit')}</button>
    <button class="btn btn-danger btn-xs ro-hide" onclick="event.stopPropagation();deleteNode('${escJs(path)}')">${icon('trash')}</button>`}
  </span>`;
  row.oncontextmenu = function(e) { showCtx(e, path); };
  div.appendChild(row);
  const children = document.createElement('div');
  children.className = 'tree-children' + (isEmpty ? ' c' : '');
  children.id = 'ch-' + keySafe;
  keys.forEach(k => {
    const v = data[k];
    const cp = path ? path + '/' + k : k;
    const childRow = document.createElement('div');
    childRow.className = 'tree-row';
    childRow.dataset.fp = cp;
    childRow.onclick = function() { selectNode(cp); };
    childRow.oncontextmenu = function(e) { showCtx(e, cp); };
    const label = `<span class="nk${isArr ? ' arr' : ''}">${esc(String(k))}</span><span class="sp">:</span>`;
    if (v && typeof v === 'object') {
      const subDiv = document.createElement('div');
      subDiv.className = 'tree-node';
      const subRow = document.createElement('div');
      subRow.className = 'tree-row';
      const sk = cp.replace(/[^a-zA-Z0-9]/g,'_');
      const objKeys = Object.keys(v);
      const emp = objKeys.length === 0;
      const arr = Array.isArray(v);
      subRow.innerHTML = `<span class="toggle" id="tog-${sk}" onclick="event.stopPropagation();toggleTree(this)">${emp ? ' ' : '▾'}</span>${label}
        <span class="tb">${arr ? '[' + v.length + ']' : '{' + objKeys.length + '}'}</span>
        <span class="acts">${S.readOnly?'':`
        <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();showAddNodeModal('${escJs(cp)}')">${icon('plus')}</button>
        <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();editNode('${escJs(cp)}')">${icon('edit')}</button>
        <button class="btn btn-danger btn-xs ro-hide" onclick="event.stopPropagation();deleteNode('${escJs(cp)}')">${icon('trash')}</button>`}
      </span>`;
      subRow.oncontextmenu = function(e) { showCtx(e, cp); };
      subDiv.appendChild(subRow);
      const subChildren = document.createElement('div');
      subChildren.className = 'tree-children' + (emp ? ' c' : '');
      subChildren.id = 'ch-' + sk;
      renderTreeRecursive(subChildren, v, cp);
      subDiv.appendChild(subChildren);
      childRow.innerHTML = '';
      childRow.appendChild(subDiv);
    } else {
      const cls = v === null ? 'nl' : typeof v === 'string' ? 'st' : typeof v === 'number' ? 'num' : 'boo';
      const disp = v === null ? '<span class="vl nl">null</span>' : typeof v === 'string' ? `<span class="vl st">"${esc(String(v))}"</span>` : `<span class="vl ${cls}">${esc(String(v))}</span>`;
      childRow.innerHTML = `<span class="toggle" style="visibility:hidden">▸</span>${label}${disp}
        <span class="acts">${S.readOnly?'':`
        <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();editNode('${escJs(cp)}')">${icon('edit')}</button>
        <button class="btn btn-danger btn-xs ro-hide" onclick="event.stopPropagation();deleteNode('${escJs(cp)}')">${icon('trash')}</button>`}
      </span>`;
    }
    children.appendChild(childRow);
  });
  div.appendChild(children);
  el.innerHTML = '';
  el.appendChild(div);
}

function renderTreeRecursive(el, data, path) {
  if (data === null || typeof data !== 'object') {
    const cls = data === null ? 'nl' : typeof data === 'string' ? 'st' : typeof data === 'number' ? 'num' : 'boo';
    const disp = data === null ? '<span class="vl nl">null</span>' : typeof data === 'string' ? `<span class="vl st">"${esc(String(data))}"</span>` : `<span class="vl ${cls}">${esc(String(data))}</span>`;
    const r = document.createElement('div');
    r.className = 'tree-row';
    r.dataset.fp = path;
    r.onclick = function() { selectNode(path); };
    r.oncontextmenu = function(e) { showCtx(e, path); };
    r.innerHTML = `${disp}<span class="acts">${S.readOnly?'':`
      <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();editNode('${escJs(path)}')">${icon('edit')}</button>
      <button class="btn btn-danger btn-xs ro-hide" onclick="event.stopPropagation();deleteNode('${escJs(path)}')">${icon('trash')}</button>`}
    </span>`;
    el.appendChild(r);
    return;
  }
  const entries = Array.isArray(data) ? data.map((v,i) => [i, v]) : Object.entries(data);
  entries.forEach(([k, v]) => {
    const cp = path + '/' + k;
    const row = document.createElement('div');
    row.className = 'tree-row';
    const isArr = Array.isArray(data);
    const label = `<span class="nk${isArr ? ' arr' : ''}">${esc(String(k))}</span><span class="sp">:</span>`;
    if (v && typeof v === 'object') {
      const subDiv = document.createElement('div');
      subDiv.className = 'tree-node';
      const subRow = document.createElement('div');
      subRow.className = 'tree-row';
      const sk = cp.replace(/[^a-zA-Z0-9]/g,'_');
      const objKeys = Object.keys(v);
      const emp = objKeys.length === 0;
      const arr = Array.isArray(v);
      subRow.innerHTML = `<span class="toggle" id="tog-${sk}" onclick="event.stopPropagation();toggleTree(this)">${emp ? ' ' : '▾'}</span>${label}
        <span class="tb">${arr ? '[' + v.length + ']' : '{' + objKeys.length + '}'}</span>
        <span class="acts">${S.readOnly?'':`
        <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();showAddNodeModal('${escJs(cp)}')">${icon('plus')}</button>
        <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();editNode('${escJs(cp)}')">${icon('edit')}</button>
        <button class="btn btn-danger btn-xs ro-hide" onclick="event.stopPropagation();deleteNode('${escJs(cp)}')">${icon('trash')}</button>`}
      </span>`;
      subRow.oncontextmenu = function(e) { showCtx(e, cp); };
      subDiv.appendChild(subRow);
      const subChildren = document.createElement('div');
      subChildren.className = 'tree-children' + (emp ? ' c' : '');
      subChildren.id = 'ch-' + sk;
      renderTreeRecursive(subChildren, v, cp);
      subDiv.appendChild(subChildren);
      row.innerHTML = '';
      row.appendChild(subDiv);
    } else {
      const cls = v === null ? 'nl' : typeof v === 'string' ? 'st' : typeof v === 'number' ? 'num' : 'boo';
      const disp = v === null ? '<span class="vl nl">null</span>' : typeof v === 'string' ? `<span class="vl st">"${esc(String(v))}"</span>` : `<span class="vl ${cls}">${esc(String(v))}</span>`;
      row.innerHTML = `<span class="toggle" style="visibility:hidden">▸</span>${label}${disp}
        <span class="acts">${S.readOnly?'':`
        <button class="btn btn-outline btn-xs ro-hide" onclick="event.stopPropagation();editNode('${escJs(cp)}')">${icon('edit')}</button>
        <button class="btn btn-danger btn-xs ro-hide" onclick="event.stopPropagation();deleteNode('${escJs(cp)}')">${icon('trash')}</button>`}
      </span>`;
      row.onclick = function() { selectNode(cp); };
      row.oncontextmenu = function(e) { showCtx(e, cp); };
      row.dataset.fp = cp;
    }
    el.appendChild(row);
  });
}

function toggleTree(el) {
  const parent = el.closest('.tree-node');
  if (!parent) return;
  const ch = parent.querySelector(':scope > .tree-children');
  if (ch) { ch.classList.toggle('c'); el.textContent = ch.classList.contains('c') ? '▸' : '▾'; }
}

function collapseAll() {
  document.querySelectorAll('.tree-children').forEach(el => { el.classList.add('c'); });
  document.querySelectorAll('.tree-row > .toggle').forEach(el => { if (el.textContent === '▾') el.textContent = '▸'; });
}

function expandAll() {
  document.querySelectorAll('.tree-children').forEach(el => { el.classList.remove('c'); });
  document.querySelectorAll('.tree-row > .toggle').forEach(el => { if (el.textContent === '▸') el.textContent = '▾'; });
}

function filterData(data, term) {
  if (data === null || typeof data !== 'object') return data;
  const lterm = term.toLowerCase();
  const parts = term.split(':');
  const keyTerm = parts[0].toLowerCase();
  const valTerm = parts[1] ? parts[1].toLowerCase() : '';
  const result = Array.isArray(data) ? [] : {};
  for (const [k, v] of Object.entries(data)) {
    const km = String(k).toLowerCase().includes(keyTerm);
    let vm = false;
    if (v && typeof v === 'object') {
      const filtered = filterData(v, term);
      if (km || (typeof filtered === 'object' && Object.keys(filtered).length > 0)) { result[k] = filtered; }
    } else {
      vm = valTerm ? String(v).toLowerCase().includes(valTerm) : String(v).toLowerCase().includes(lterm);
      if (km || vm) { result[k] = v; }
    }
  }
  return result;
}

function filterTree() {
  S.treeSearchTerm = document.getElementById('treeSearch').value;
  if (!S.dbData) return;
  const container = document.getElementById('treeContainer');
  container.innerHTML = '<div class="tree" id="treeRoot"></div>';
  const data = S.treeSearchTerm ? filterData(S.dbData, S.treeSearchTerm) : S.dbData;
  renderTree(document.getElementById('treeRoot'), data, S.dbPath);
  if (S.treeSearchTerm && Object.keys(data).length > 0) expandAll();
}

// ─── Quick Jump (Ctrl+P) ──────────────────────────────────
function openCmdPalette() {
  const overlay = document.getElementById('cmdPaletteOverlay');
  const palette = document.getElementById('cmdPalette');
  overlay.classList.add('open');
  palette.classList.add('open');
  S.cmdPaletteOpen = true;
  const input = palette.querySelector('input');
  input.value = '';
  input.focus();
  showCmdResults('');
}

function closeCmdPalette() {
  document.getElementById('cmdPaletteOverlay').classList.remove('open');
  document.getElementById('cmdPalette').classList.remove('open');
  S.cmdPaletteOpen = false;
}

function showCmdResults(q) {
  const results = document.getElementById('cmdResults');
  const cmds = getCommands(q.toLowerCase());
  if (!cmds.length) { results.innerHTML = '<div style="padding:14px;opacity:.4;text-align:center">No commands match</div>'; return; }
  results.innerHTML = cmds.map((c, i) =>
    `<div class="cmd-item" data-idx="${i}" onclick="executeCmd('${c.id}')">
      ${icon(c.icon||'command')}
      <div><div>${c.label}</div><div class="desc">${c.desc||''}</div></div>
    </div>`
  ).join('');
  results.querySelector('.cmd-item')?.classList.add('selected');
}

function getCommands(q) {
  const all = [
    { id:'switch-tree', label:'Database Tree', desc:'View tree view', icon:'tree', action:()=>switchView('tree') },
    { id:'switch-json', label:'JSON View', desc:'Edit raw JSON', icon:'braces', action:()=>switchView('json') },
    { id:'switch-keys', label:'License Keys', desc:'Manage keys', icon:'key', action:()=>switchView('keys') },
    { id:'switch-project', label:'Project Settings', desc:'Configure project', icon:'settings', action:()=>switchView('project') },
    { id:'switch-import', label:'Import Data', desc:'Import JSON data', icon:'import', action:()=>switchView('import') },
    { id:'switch-snapshots', label:'Snapshots', desc:'Manage snapshots', icon:'camera', action:()=>switchView('snapshots') },
    { id:'refresh', label:'Refresh', desc:'Reload current view', icon:'refresh', action:refreshAll },
    { id:'readonly', label:'Toggle Read-Only', desc:S.readOnly?'Enable editing':'Disable editing', icon:S.readOnly?'lock':'unlock', action:toggleReadOnly },
    { id:'collapse', label:'Collapse All', desc:'Collapse tree nodes', icon:'collapse', action:collapseAll },
    { id:'expand', label:'Expand All', desc:'Expand tree nodes', icon:'expand', action:expandAll },
    { id:'export', label:'Export Database', desc:'Download full DB JSON', icon:'download', action:exportDb },
    { id:'theme', label:'Toggle Theme', desc:'Switch dark/light', icon:S.theme==='dark'?'sun':'moon', action:toggleTheme },
    { id:'snapshot', label:'Take Snapshot', desc:'Save current DB state', icon:'camera', action:takeSnapshot },
    { id:'add-node', label:'Add Node', desc:'Add child node', icon:'plus', action:()=>showAddNodeModal(S.dbPath) },
    { id:'generate-keys', label:'Generate Keys', desc:'Create license keys', icon:'dice', action:generateKeys },
  ];
  if (!q) return all;
  return all.filter(c => c.label.toLowerCase().includes(q) || (c.desc||'').toLowerCase().includes(q));
}

function executeCmd(id) {
  closeCmdPalette();
  const cmd = getCommands('').find(c => c.id === id);
  if (cmd) cmd.action();
}

document.getElementById('cmdPaletteOverlay')?.addEventListener('click', closeCmdPalette);
document.getElementById('cmdPalette')?.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeCmdPalette();
});

// ─── Node Selection / Detail ───────────────────────────────
function selectNode(path) {
  S.selectedNodePath = path;
  const panel = document.getElementById('detailPanel');
  panel.classList.add('open');
  document.getElementById('copyPathBtn').style.display = 'inline-flex';
  document.querySelectorAll('.tree-row.selected').forEach(el => el.classList.remove('selected'));
  const rows = document.querySelectorAll(`[data-fp="${path.replace(/"/g, '\\"')}"]`);
  rows.forEach(el => el.classList.add('selected'));
  const parts = path.split('/');
  const key = parts[parts.length - 1];
  let value = S.dbData;
  let cur = '';
  for (const p of parts) { if (!p) continue; if (value && typeof value === 'object') value = value[p]; else { value = undefined; break; } }
  document.getElementById('detailTitle').textContent = String(key || '(root)');
  document.getElementById('detailPath').textContent = '/' + (S.dbPath ? S.dbPath + '/' : '') + path;
  document.getElementById('detailKey').value = key || '(root)';
  document.getElementById('detailType').value = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
  document.getElementById('detailSize').value = formatSize(value);
  document.getElementById('detailValue').value = JSON.stringify(value, null, 2);
  document.getElementById('detailStatus').textContent = '';
  document.getElementById('detailMovePath').value = '';
  // read-only
  if (S.readOnly) {
    document.getElementById('detailValue').setAttribute('readonly', '');
  } else {
    document.getElementById('detailValue').removeAttribute('readonly');
  }
}

function closeDetail() {
  document.getElementById('detailPanel').classList.remove('open');
  document.getElementById('copyPathBtn').style.display = 'none';
  S.selectedNodePath = null;
}

function formatSize(data) {
  if (data === null || data === undefined) return '0 B';
  const s = new Blob([JSON.stringify(data)]).size;
  if (s < 1024) return s + ' B';
  if (s < 1048576) return (s/1024).toFixed(1) + ' KB';
  return (s/1048576).toFixed(1) + ' MB';
}

function copyPath() {
  if (!S.selectedNodePath) return;
  const full = '/' + (S.dbPath ? S.dbPath + '/' : '') + S.selectedNodePath;
  navigator.clipboard.writeText(full).then(() => toast('Copied: ' + full, 'success')).catch(() => {});
}

async function saveDetail() {
  if (!checkWrite() || !S.selectedNodePath) return;
  const el = document.getElementById('detailStatus');
  el.textContent = 'Saving...'; el.style.color = 'var(--lg-accent)';
  try {
    const val = JSON.parse(document.getElementById('detailValue').value);
    const fullPath = '/' + (S.dbPath ? S.dbPath + '/' : '') + S.selectedNodePath;
    await apiPut(fullPath, val);
    toast('Saved', 'success'); el.textContent = 'Saved';
    takeAutoSnapshot('Before edit: ' + S.selectedNodePath);
    loadTree();
  } catch (e) { el.textContent = 'Invalid JSON: ' + e.message; el.style.color = 'var(--lg-danger)'; }
}

async function deleteDetail() {
  if (!checkWrite() || !S.selectedNodePath) return;
  if (!confirm('Delete /' + (S.dbPath ? S.dbPath + '/' : '') + S.selectedNodePath + '?')) return;
  try {
    const fullPath = '/' + (S.dbPath ? S.dbPath + '/' : '') + S.selectedNodePath;
    await apiDelete(fullPath);
    toast('Deleted', 'error'); closeDetail(); takeAutoSnapshot('Before delete: ' + S.selectedNodePath);
    loadTree();
  } catch (e) { toast(e.message, 'error'); }
}

async function duplicateDetail() {
  if (!checkWrite() || !S.selectedNodePath) return;
  const parts = S.selectedNodePath.split('/');
  const key = parts[parts.length-1];
  const parent = parts.slice(0,-1).join('/');
  const newKey = key + '_copy';
  const newPath = parent ? parent + '/' + newKey : newKey;
  const el = document.getElementById('detailStatus');
  el.textContent = 'Duplicating...';
  try {
    const val = JSON.parse(document.getElementById('detailValue').value);
    const fullNewPath = '/' + (S.dbPath ? S.dbPath + '/' : '') + newPath;
    await apiPut(fullNewPath, val);
    toast('Duplicated to /' + newPath, 'success'); el.textContent = 'Copied to /' + newPath;
    loadTree();
  } catch (e) { el.textContent = 'Error: ' + e.message; }
}

async function moveDetail() {
  if (!checkWrite() || !S.selectedNodePath) return;
  const newPath = document.getElementById('detailMovePath').value.trim();
  if (!newPath) return;
  const el = document.getElementById('detailStatus');
  el.textContent = 'Moving...';
  try {
    const val = JSON.parse(document.getElementById('detailValue').value);
    const fullOld = '/' + (S.dbPath ? S.dbPath + '/' : '') + S.selectedNodePath;
    const fullNew = '/' + (S.dbPath ? S.dbPath + '/' : '') + newPath;
    await apiPut(fullNew, val);
    await apiDelete(fullOld);
    toast('Moved to /' + newPath, 'success'); el.textContent = 'Moved';
    takeAutoSnapshot('Before move: ' + S.selectedNodePath);
    loadTree();
  } catch (e) { el.textContent = 'Error: ' + e.message; }
}

function downloadDetail() {
  if (!S.selectedNodePath) return;
  try {
    const val = JSON.parse(document.getElementById('detailValue').value);
    const blob = new Blob([JSON.stringify(val, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    const parts = S.selectedNodePath.split('/');
    a.download = parts[parts.length-1] + '.json';
    a.click();
    toast('Downloaded', 'success');
  } catch(e) { toast('Invalid JSON', 'error'); }
}

function editNode(path) { selectNode(path); }

async function deleteNode(path) {
  if (!checkWrite()) return;
  if (!confirm('Delete /' + path + '?')) return;
  try {
    const fullPath = '/' + (S.dbPath ? S.dbPath + '/' : '') + path;
    await apiDelete(fullPath);
    toast('Deleted', 'error'); takeAutoSnapshot('Before delete: ' + path);
    loadTree();
  } catch (e) { toast(e.message, 'error'); }
}

// ─── Context Menu ─────────────────────────────────────────
function showCtx(e, path) {
  e.preventDefault();
  S.ctxTargetPath = path;
  const menu = document.getElementById('ctxMenu');
  menu.style.left = Math.min(e.clientX, window.innerWidth - 200) + 'px';
  menu.style.top = Math.min(e.clientY, window.innerHeight - 240) + 'px';
  menu.classList.add('open');
  // Hide write ctx items in read-only
  menu.querySelectorAll('.ro-hide').forEach(el => el.style.display = S.readOnly ? 'none' : '');
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.ctx-menu')) document.getElementById('ctxMenu').classList.remove('open');
});

function ctxEdit() { document.getElementById('ctxMenu').classList.remove('open'); if (S.ctxTargetPath) selectNode(S.ctxTargetPath); }
function ctxAddChild() { document.getElementById('ctxMenu').classList.remove('open'); if (S.ctxTargetPath) showAddNodeModal(S.ctxTargetPath); }
function ctxCopyPath() { document.getElementById('ctxMenu').classList.remove('open'); if (S.ctxTargetPath) { navigator.clipboard.writeText('/' + (S.dbPath ? S.dbPath + '/' : '') + S.ctxTargetPath).then(() => toast('Copied', 'success')); }}
function ctxDuplicate() {
  document.getElementById('ctxMenu').classList.remove('open');
  if (!checkWrite() || !S.ctxTargetPath) return;
  let value = S.dbData;
  for (const p of S.ctxTargetPath.split('/')) { if (p && value) value = value[p]; }
  if (value === undefined) return;
  const parts = S.ctxTargetPath.split('/'); const key = parts[parts.length-1];
  const parent = parts.slice(0,-1).join('/'); const newKey = key + '_copy';
  const newPath = parent ? parent + '/' + newKey : newKey;
  const fullPath = '/' + (S.dbPath ? S.dbPath + '/' : '') + newPath;
  apiPut(fullPath, value).then(() => { toast('Duplicated', 'success'); loadTree(); }).catch(e => toast(e.message, 'error'));
}
function ctxMove() {
  document.getElementById('ctxMenu').classList.remove('open');
  if (!checkWrite() || !S.ctxTargetPath) return;
  document.getElementById('moveCurrentPath').value = S.ctxTargetPath;
  document.getElementById('moveNewPath').value = '';
  document.getElementById('moveNodeStatus').textContent = '';
  document.getElementById('moveNodeModal').classList.add('open');
}
function ctxDownload() {
  document.getElementById('ctxMenu').classList.remove('open');
  if (!S.ctxTargetPath) return;
  let value = S.dbData;
  for (const p of S.ctxTargetPath.split('/')) { if (p && value) value = value[p]; }
  if (value === undefined) return;
  const blob = new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = S.ctxTargetPath.split('/').pop() + '.json'; a.click();
}
function ctxDelete() {
  document.getElementById('ctxMenu').classList.remove('open');
  if (S.ctxTargetPath) deleteNode(S.ctxTargetPath);
}
function ctxBookmark() {
  document.getElementById('ctxMenu').classList.remove('open');
  if (S.ctxTargetPath) addBookmark(S.ctxTargetPath, S.ctxTargetPath.split('/').pop());
}
function ctxCopyValue() {
  document.getElementById('ctxMenu').classList.remove('open');
  if (!S.ctxTargetPath) return;
  let value = S.dbData;
  for (const p of S.ctxTargetPath.split('/')) { if (p && value) value = value[p]; }
  if (value === undefined) return;
  navigator.clipboard.writeText(JSON.stringify(value)).then(() => toast('Value copied', 'success')).catch(() => {});
}

async function confirmMoveNode() {
  if (!checkWrite()) return;
  const oldPath = document.getElementById('moveCurrentPath').value.trim();
  const newPath = document.getElementById('moveNewPath').value.trim();
  const el = document.getElementById('moveNodeStatus');
  if (!oldPath || !newPath) { el.textContent = 'Both paths required'; return; }
  el.textContent = 'Moving...';
  try {
    let value = S.dbData;
    for (const p of oldPath.split('/')) { if (p && value) value = value[p]; }
    if (value === undefined) throw new Error('Source not found');
    const fullOld = '/' + (S.dbPath ? S.dbPath + '/' : '') + oldPath;
    const fullNew = '/' + (S.dbPath ? S.dbPath + '/' : '') + newPath;
    await apiPut(fullNew, value);
    await apiDelete(fullOld);
    toast('Moved to /' + newPath, 'success');
    closeModal('moveNodeModal');
    takeAutoSnapshot('Before move: ' + oldPath);
    loadTree();
  } catch (e) { el.textContent = 'Error: ' + e.message; }
}

// ─── Add Node Modal ────────────────────────────────────────
function showAddNodeModal(parentPath) {
  if (!checkWrite()) return;
  document.getElementById('addNodeModal').classList.add('open');
  document.getElementById('addNodePath').value = '/' + (S.dbPath ? S.dbPath + '/' : '') + (parentPath || '');
  document.getElementById('addNodeKey').value = '';
  document.getElementById('addNodeValue').value = '';
  document.getElementById('addNodeStatus').textContent = '';
  toggleAddNodeValue();
}

function toggleAddNodeValue() {
  const type = document.getElementById('addNodeType').value;
  const grp = document.getElementById('addNodeValueGroup');
  const ta = document.getElementById('addNodeValue');
  if (type === 'object') { grp.style.display = 'block'; ta.placeholder = 'Pre-fill fields as JSON'; ta.value = '{}'; }
  else if (type === 'array') { grp.style.display = 'block'; ta.placeholder = 'Pre-fill as JSON array'; ta.value = '[]'; }
  else if (type === 'null') { grp.style.display = 'none'; }
  else { grp.style.display = 'block'; ta.placeholder = 'Value'; ta.value = ''; }
}

async function confirmAddNode() {
  if (!checkWrite()) return;
  const parentPath = document.getElementById('addNodePath').value.replace(/\/+$/, '');
  const key = document.getElementById('addNodeKey').value.trim();
  const type = document.getElementById('addNodeType').value;
  const valStr = document.getElementById('addNodeValue').value.trim();
  const el = document.getElementById('addNodeStatus');
  if (!key) { el.textContent = 'Key is required'; return; }
  el.textContent = 'Creating...';
  try {
    let val;
    if (type === 'null') val = null;
    else if (type === 'string') val = valStr || '';
    else if (type === 'number') val = valStr ? Number(valStr) : 0;
    else if (type === 'boolean') val = valStr === 'true' || valStr === '1';
    else val = valStr ? JSON.parse(valStr) : (type === 'object' ? {} : []);
    const fullPath = parentPath + '/' + key;
    await apiPut(fullPath, val);
    toast('Created /' + key, 'success');
    closeModal('addNodeModal');
    takeAutoSnapshot('Before add: ' + key);
    loadTree();
  } catch (e) { el.textContent = 'Error: ' + e.message; }
}

// ─── JSON View ─────────────────────────────────────────────
async function loadRawJson() {
  try {
    const data = await apiGet('');
    document.getElementById('rawJsonEditor').value = JSON.stringify(data, null, 2);
    document.getElementById('rawJsonStatus').textContent = 'Loaded';
    setStatus(true);
  } catch (e) {
    document.getElementById('rawJsonEditor').value = 'Error: ' + e.message;
    setStatus(false);
  }
}

function formatRawJson() {
  try {
    const parsed = JSON.parse(document.getElementById('rawJsonEditor').value);
    document.getElementById('rawJsonEditor').value = JSON.stringify(parsed, null, 2);
    document.getElementById('rawJsonStatus').textContent = 'Formatted';
  } catch (e) { document.getElementById('rawJsonStatus').textContent = 'Invalid JSON: ' + e.message; }
}

function minifyRawJson() {
  try {
    const parsed = JSON.parse(document.getElementById('rawJsonEditor').value);
    document.getElementById('rawJsonEditor').value = JSON.stringify(parsed);
    document.getElementById('rawJsonStatus').textContent = 'Minified';
  } catch (e) { document.getElementById('rawJsonStatus').textContent = 'Invalid JSON: ' + e.message; }
}

async function saveRawJson() {
  if (!checkWrite()) return;
  const el = document.getElementById('rawJsonStatus');
  el.textContent = 'Saving...';
  try {
    const parsed = JSON.parse(document.getElementById('rawJsonEditor').value);
    await apiPut('', parsed);
    el.textContent = 'Saved entire DB';
    toast('Database saved', 'success');
    takeAutoSnapshot('Before bulk edit');
  } catch (e) { el.textContent = 'Error: ' + e.message; }
}

// ─── Keys View ─────────────────────────────────────────────
async function loadKeysView() {
  const container = document.getElementById('keysContainer');
  container.innerHTML = `<div class="loading"><div class="sp"></div>Loading...</div>`;
  try {
    S.keysData = await apiGet('/license_keys') || {};
    renderKeysDelayed();
    updateKeysStats();
  } catch (e) { container.innerHTML = `<div style="color:var(--lg-danger);padding:30px;text-align:center">${icon('error')} ${esc(e.message)}</div>`; }
}

function renderKeysDelayed() {
  clearTimeout(S.keysRenderTimer);
  S.keysRenderTimer = setTimeout(renderKeysView, 150);
}

function renderKeysView() {
  const container = document.getElementById('keysContainer');
  const term = (document.getElementById('keysSearch')?.value || '').toLowerCase();
  const filter = document.getElementById('keysFilterStatus')?.value || 'all';
  const sort = document.getElementById('keysSort')?.value || 'key';

  let entries = Object.entries(S.keysData);
  if (term) entries = entries.filter(([k, v]) => k.toLowerCase().includes(term) || JSON.stringify(v).toLowerCase().includes(term));
  if (filter === 'valid') entries = entries.filter(([k,v]) => !v.blocked && v.expiresAt > Date.now());
  else if (filter === 'expired') entries = entries.filter(([k,v]) => !v.blocked && v.expiresAt > 0 && v.expiresAt < Date.now());
  else if (filter === 'blocked') entries = entries.filter(([k,v]) => v.blocked);
  else if (filter === 'noexpiry') entries = entries.filter(([k,v]) => !v.expiresAt);

  if (sort === 'expires') entries.sort((a,b) => (a[1].expiresAt||0) - (b[1].expiresAt||0));
  else if (sort === 'status') entries.sort((a,b) => { const sa = a[1].blocked ? 2 : (a[1].expiresAt < Date.now() ? 1 : 0); const sb = b[1].blocked ? 2 : (b[1].expiresAt < Date.now() ? 1 : 0); return sa - sb; });
  else entries.sort((a,b) => a[0].localeCompare(b[0]));

  const totalPages = Math.ceil(entries.length / S.KEYS_PER_PAGE);
  if (S.keysCurrentPage >= totalPages) S.keysCurrentPage = 0;
  const page = S.keysCurrentPage;
  const pageEntries = entries.slice(page * S.KEYS_PER_PAGE, (page + 1) * S.KEYS_PER_PAGE);

  updateKeysBulkButtons();

  if (!pageEntries.length) {
    container.innerHTML = '<div style="text-align:center;padding:30px;opacity:.5">No keys found</div>';
    document.getElementById('keysPagination').innerHTML = '';
    return;
  }

  let html = `<table><thead><tr>
    <th style="width:30px"><input type="checkbox" id="keysSelectAll" onchange="toggleSelectAllKeys(this)"></th>
    <th class="sort" onclick="document.getElementById('keysSort').value='key';renderKeysView()">Key</th>
    <th class="sort" onclick="document.getElementById('keysSort').value='status';renderKeysView()">Status</th>
    <th class="sort" onclick="document.getElementById('keysSort').value='expires';renderKeysView()">Expires</th>
    <th>Days Left</th>
    <th>Extra Data</th>
    <th></th>
  </tr></thead><tbody>`;
  pageEntries.forEach(([key, data]) => {
    const s = data.blocked ? { label: 'Blocked', dot: '#ef4444' } : (data.expiresAt && data.expiresAt > 0 && data.expiresAt < Date.now()) ? { label: 'Expired', dot: '#f59e0b' } : (data.expiresAt && data.expiresAt > 0) ? { label: 'Valid', dot: '#4ade80' } : { label: 'Unknown', dot: '#888' };
    const dt = data.expiresAt ? new Date(data.expiresAt).toLocaleString() : '—';
    const dl = data.expiresAt > 0 ? (data.expiresAt < Date.now() ? 'EXPIRED' : Math.ceil((data.expiresAt-Date.now())/86400000)+'d') : '—';
    const extra = Object.fromEntries(Object.entries(data).filter(([k]) => k !== 'expiresAt' && k !== 'blocked'));
    const extraStr = Object.keys(extra).length ? JSON.stringify(extra) : '—';
    const checked = S.selectedKeys.has(key) ? 'checked' : '';
    const ro = S.readOnly ? 'disabled' : '';
    html += `<tr>
      <td><input type="checkbox" class="key-cb" value="${esc(key)}" ${checked} onchange="toggleSelectKey('${escJs(key)}',this)" ${ro}></td>
      <td class="mono copyable" onclick="navigateTo('license_keys/${encodeURIComponent(key)}')" title="Browse in tree">${esc(key)}</td>
      <td><span class="status"><span class="status-dot" style="background:${s.dot}"></span>${s.label}</span></td>
      <td style="font-size:11px">${dt}</td>
      <td style="font-weight:${dl==='EXPIRED'?'600':'400'}">${dl}</td>
      <td style="font-size:10px;opacity:.6;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(extraStr)}</td>
      <td><button class="btn btn-outline btn-xs" onclick="event.stopPropagation();copyKeyToClipboard('${escJs(key)}')">${icon('copy')}</button></td>
    </tr>`;
  });
  html += '</tbody></table>';
  container.innerHTML = html;

  if (totalPages <= 1) { document.getElementById('keysPagination').innerHTML = ''; return; }
  let phtml = '';
  for (let i = 0; i < totalPages; i++) {
    phtml += `<button class="btn btn-outline btn-xs ${i === page ? 'selected' : ''}" onclick="S.keysCurrentPage=${i};renderKeysView()">${i+1}</button>`;
  }
  document.getElementById('keysPagination').innerHTML = phtml;
}

function updateKeysStats() {
  const vals = Object.values(S.keysData);
  let total = vals.length, valid = 0, expired = 0, blocked = 0;
  for (const k of vals) {
    if (k.blocked) blocked++;
    else if (k.expiresAt && k.expiresAt > 0 && k.expiresAt < Date.now()) expired++;
    else if (k.expiresAt && k.expiresAt > 0) valid++;
  }
  document.getElementById('keysStats').innerHTML = `
    <div class="stat-card glass"><div class="sl">Total</div><div class="sv">${total}</div></div>
    <div class="stat-card glass"><div class="sl">Valid</div><div class="sv gn">${valid}</div></div>
    <div class="stat-card glass"><div class="sl">Expired</div><div class="sv yw">${expired}</div></div>
    <div class="stat-card glass"><div class="sl">Blocked</div><div class="sv rd">${blocked}</div></div>`;
}

function toggleSelectAllKeys(cb) {
  const entries = Object.entries(S.keysData);
  const term = (document.getElementById('keysSearch').value || '').toLowerCase();
  const filtered = term ? entries.filter(([k]) => k.toLowerCase().includes(term)) : entries;
  filtered.forEach(([k]) => { if (cb.checked) S.selectedKeys.add(k); else S.selectedKeys.delete(k); });
  document.querySelectorAll('.key-cb').forEach(el => el.checked = cb.checked);
  updateKeysBulkButtons();
}

function toggleSelectKey(key, cb) {
  if (cb.checked) S.selectedKeys.add(key); else S.selectedKeys.delete(key);
  updateKeysBulkButtons();
  const all = document.querySelectorAll('.key-cb');
  const allChecked = document.querySelectorAll('.key-cb:checked');
  const selAll = document.getElementById('keysSelectAll');
  if (selAll) selAll.checked = all.length > 0 && all.length === allChecked.length;
}

function updateKeysBulkButtons() {
  const count = S.selectedKeys.size;
  document.getElementById('selCount').textContent = count ? count + ' selected' : '';
  document.getElementById('bulkDeleteBtn').style.display = (count && !S.readOnly) ? 'inline-flex' : 'none';
  document.getElementById('bulkBlockBtn').style.display = (count && !S.readOnly) ? 'inline-flex' : 'none';
  document.getElementById('bulkUnblockBtn').style.display = (count && !S.readOnly) ? 'inline-flex' : 'none';
  document.getElementById('bulkExpireBtn').style.display = (count && !S.readOnly) ? 'inline-flex' : 'none';
}

async function bulkAction(action) {
  if (!checkWrite() || !S.selectedKeys.size) return;
  const keys = Array.from(S.selectedKeys);
  if (action === 'delete' && !confirm('Delete ' + keys.length + ' keys?')) return;
  if (action === 'expire' && !confirm('Expire ' + keys.length + ' keys now?')) return;
  const el = document.getElementById('selCount');
  el.textContent = 'Working...';
  let ok = 0, fail = 0;
  for (const key of keys) {
    try {
      if (action === 'delete') await apiDelete('/license_keys/' + key);
      else if (action === 'block') await apiPatch('/license_keys/' + key, { blocked: true });
      else if (action === 'unblock') await apiPatch('/license_keys/' + key, { blocked: false });
      else if (action === 'expire') await apiPatch('/license_keys/' + key, { expiresAt: 1 });
      ok++;
    } catch (e) { fail++; }
  }
  toast(action + ': ' + ok + ' OK, ' + fail + ' failed', fail ? 'error' : 'success');
  S.selectedKeys.clear();
  takeAutoSnapshot('Before bulk ' + action);
  loadKeysView();
}

function copyKeyToClipboard(key) {
  navigator.clipboard.writeText(key).then(() => toast('Copied: ' + key, 'success')).catch(() => {});
}

async function extendKeyExpiry(days) {
  if (!checkWrite() || !S.selectedKeys.size) { toast('Select keys first', 'info'); return; }
  const keys = Array.from(S.selectedKeys);
  let ok = 0, fail = 0;
  for (const key of keys) {
    try {
      const existing = S.keysData[key] || {};
      const currentExpiry = existing.expiresAt || Date.now();
      const newExpiry = currentExpiry + days * 86400000;
      await apiPatch('/license_keys/' + key, { expiresAt: newExpiry });
      ok++;
    } catch (e) { fail++; }
  }
  toast('Extended ' + ok + ' keys, ' + fail + ' failed', fail ? 'error' : 'success');
  loadKeysView();
}

async function addSingleKey() {
  if (!checkWrite()) return;
  const key = prompt('Enter new license key:');
  if (!key || !key.trim()) return;
  try {
    await apiPut('/license_keys/' + key.trim(), {});
    toast('Key added: ' + key.trim(), 'success');
    loadKeysView();
  } catch (e) { toast('Error: ' + e.message, 'error'); }
}

function exportKeys() {
  const blob = new Blob([JSON.stringify(S.keysData, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'license_keys.json'; a.click();
  toast('Exported', 'success');
}

function exportKeysCSV() {
  const entries = Object.entries(S.keysData);
  let csv = 'Key,Status,Expires,Blocked\n';
  entries.forEach(([k, v]) => {
    const status = v.blocked ? 'Blocked' : (v.expiresAt && v.expiresAt < Date.now()) ? 'Expired' : 'Valid';
    csv += `"${k}","${status}","${v.expiresAt ? new Date(v.expiresAt).toISOString() : ''}","${v.blocked ? 'Yes' : 'No'}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = 'license_keys.csv'; a.click();
  toast('Exported CSV', 'success');
}

// ─── Generate Keys ─────────────────────────────────────────
function generateKeys() {
  if (!checkWrite()) return;
  document.getElementById('genPrefix').value = 'KRM-';
  document.getElementById('genCount').value = '5';
  document.getElementById('genExpiry').value = '0';
  document.getElementById('genCustomExpiryGroup').style.display = 'none';
  document.getElementById('genBlocked').checked = false;
  document.getElementById('genKeysStatus').textContent = '';
  document.getElementById('genKeysPreview').innerHTML = '<pre style="font-size:11px;opacity:.6">Preview will appear here</pre>';
  document.getElementById('genKeysModal').classList.add('open');
}

function previewGenerateKeys() {
  const prefix = document.getElementById('genPrefix').value.trim();
  const count = parseInt(document.getElementById('genCount').value) || 1;
  const format = document.getElementById('genFormat').value;
  const expiryOpt = document.getElementById('genExpiry').value;
  const chars = format === 'hex' ? '0123456789ABCDEF' : format === 'uuid' ? 'abcdef0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const len = 8;
  let preview = `Preview (${count} keys):\n`;
  for (let i = 0; i < count; i++) {
    let s = '';
    for (let j = 0; j < len; j++) s += chars[Math.floor(Math.random() * chars.length)];
    const key = prefix + s;
    let expiry = 0;
    if (expiryOpt === 'custom') {
      const custom = document.getElementById('genCustomExpiry').value;
      if (custom) expiry = new Date(custom).getTime();
    } else if (expiryOpt !== '0') { expiry = Date.now() + parseInt(expiryOpt); }
    preview += '\n' + key + (expiry ? ' → ' + new Date(expiry).toLocaleString() : ' (no expiry)');
  }
  document.getElementById('genKeysPreview').innerHTML = `<pre style="font-size:11px">${esc(preview)}</pre>`;
}

function confirmGenerateKeys() {
  if (!checkWrite()) return;
  const prefix = document.getElementById('genPrefix').value.trim();
  const count = parseInt(document.getElementById('genCount').value) || 1;
  const format = document.getElementById('genFormat').value;
  const expiryOpt = document.getElementById('genExpiry').value;
  const blocked = document.getElementById('genBlocked').checked;
  const el = document.getElementById('genKeysStatus');
  el.textContent = 'Generating...';

  let expiry = 0;
  if (expiryOpt === 'custom') {
    const custom = document.getElementById('genCustomExpiry').value;
    if (custom) expiry = new Date(custom).getTime();
  } else if (expiryOpt !== '0') { expiry = Date.now() + parseInt(expiryOpt); }

  const chars = format === 'hex' ? '0123456789ABCDEF' : format === 'uuid' ? 'abcdef0123456789' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const len = 8;
  const keys = [];
  for (let i = 0; i < count; i++) {
    let s = '';
    for (let j = 0; j < len; j++) s += chars[Math.floor(Math.random() * chars.length)];
    keys.push(prefix + s);
  }

  let preview = 'Generated (' + keys.length + ' keys):\n';
  keys.forEach(k => { preview += '\n' + k + (expiry ? ' → ' + new Date(expiry).toLocaleString() : ''); });
  document.getElementById('genKeysPreview').innerHTML = `<pre style="font-size:11px">${esc(preview)}</pre>`;

  let ok = 0, fail = 0;
  Promise.all(keys.map(key => {
    const body = {};
    if (expiry) body.expiresAt = expiry;
    if (blocked) body.blocked = true;
    const p = Object.keys(body).length ? apiPut('/license_keys/' + key, body) : apiPut('/license_keys/' + key, {});
    return p.then(() => ok++).catch(() => fail++);
  })).then(() => {
    el.textContent = ok + ' created, ' + fail + ' failed';
    el.style.color = fail ? 'var(--lg-warning)' : 'var(--lg-success)';
    if (ok) { takeAutoSnapshot('Before generate keys'); loadKeysView(); }
  });
}

document.getElementById('genExpiry')?.addEventListener('change', function() {
  document.getElementById('genCustomExpiryGroup').style.display = this.value === 'custom' ? 'block' : 'none';
});

// ─── Batch Add Keys ────────────────────────────────────────
async function batchAddKeys() {
  if (!checkWrite()) return;
  const input = document.getElementById('batchKeysArea').value.trim();
  const el = document.querySelector('#view-import .importStatus');
  if (!input) { el.textContent = 'No keys'; return; }
  el.textContent = 'Working...';
  const lines = input.split('\n').map(s => s.trim()).filter(Boolean);
  let ok = 0, fail = 0;
  for (const line of lines) {
    try {
      const parts = line.split(':').map(s => s.trim());
      const k = parts[0];
      let body = {};
      if (parts[1]) {
        const v = parts[1];
        if (v.endsWith('d')) { body.expiresAt = Date.now() + parseInt(v) * 86400000; }
        else { body.expiresAt = parseInt(v); }
      }
      await apiPut('/license_keys/' + k, body);
      ok++;
    } catch (e) { fail++; }
  }
  el.textContent = ok + ' added, ' + fail + ' failed';
  toast('Batch add: ' + ok + ' OK, ' + fail + ' failed', fail ? 'info' : 'success');
  document.getElementById('batchKeysArea').value = '';
  if (S.currentView === 'keys') loadKeysView();
}

// ─── Project View ──────────────────────────────────────────
async function loadProjectView() {
  const container = document.getElementById('projectContainer');
  try {
    const data = await apiGet('/project_status/Injector1') || {};
    container.innerHTML = `<div class="card glass" style="max-width:560px">
      <h3>${icon('settings')} /project_status/Injector1</h3>
      <div class="fg"><label>Enabled</label><div class="fr">
        <label class="toggle"><input type="checkbox" id="projEnabled" ${data.enabled !== false ? 'checked' : ''} ${S.readOnly?'disabled':''}><span class="sl"></span></label>
        <span style="font-size:12px;opacity:.6">${data.enabled !== false ? 'Active' : 'Disabled'}</span>
      </div></div>
      <div class="fg"><label>Expiry</label><input class="inp" id="projExpiry" value="${data.expiresAt ? new Date(data.expiresAt).toISOString().slice(0,16) : ''}" type="datetime-local" style="width:auto" ${S.readOnly?'disabled':''}></div>
      <div class="fg"><label>Message to users</label><input class="inp" id="projMessage" value="${esc(data.message || '')}" ${S.readOnly?'disabled':''}></div>
      <div class="fg"><label>Update Link</label><input class="inp" id="projLink" value="${esc(data.updateLink || '')}" ${S.readOnly?'disabled':''}></div>
      ${S.readOnly ? '' : '<button class="btn btn-primary ro-hide" onclick="saveProject()">'+icon('save')+' Save</button>'}
      <span id="projStatus" style="margin-left:8px;font-size:12px;opacity:.6"></span>
      <div style="margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,20,20,.06)">
        <label style="font-size:9px;text-transform:uppercase;letter-spacing:1.5px;opacity:.4">Raw Data</label>
        <pre style="margin-top:4px;font-size:11px;opacity:.5;border-radius:4px;padding:8px;overflow:auto">${esc(JSON.stringify(data, null, 2))}</pre>
      </div>
    </div>`;
  } catch (e) { container.innerHTML = `<div style="color:var(--lg-danger);">${icon('error')} ${esc(e.message)}</div>`; }
}

async function saveProject() {
  if (!checkWrite()) return;
  const el = document.getElementById('projStatus');
  el.textContent = 'Saving...';
  try {
    const expiryVal = document.getElementById('projExpiry').value;
    const body = {
      enabled: document.getElementById('projEnabled').checked,
      expiresAt: expiryVal ? new Date(expiryVal).getTime() : 0,
      message: document.getElementById('projMessage').value,
      updateLink: document.getElementById('projLink').value
    };
    await apiPut('/project_status/Injector1', body);
    el.textContent = 'Saved';
    toast('Project saved', 'success');
  } catch (e) { el.textContent = 'Error: ' + e.message; }
}

// ─── Import ────────────────────────────────────────────────
async function importNode() {
  if (!checkWrite()) return;
  const path = document.getElementById('importPath').value.trim();
  const val = document.getElementById('importValue').value.trim();
  const el = document.querySelector('#view-import .importStatus');
  if (!path) { el.textContent = 'Path required'; return; }
  el.textContent = 'Importing...';
  try {
    const parsed = val ? JSON.parse(val) : {};
    await apiPut('/' + path, parsed);
    el.textContent = 'Imported to /' + path;
    toast('Imported', 'success');
  } catch (e) { el.textContent = 'Error: ' + e.message; }
}

async function bulkImport() {
  if (!checkWrite()) return;
  const rootPath = document.getElementById('bulkImportPath').value.trim();
  const json = document.getElementById('bulkImportJson').value.trim();
  const el = document.querySelectorAll('#view-import .importStatus')[1];
  if (!json) { el.textContent = 'JSON required'; return; }
  el.textContent = 'Importing...';
  try {
    const parsed = JSON.parse(json);
    await apiPut(rootPath ? '/' + rootPath : '', parsed);
    el.textContent = 'Imported successfully';
    toast('Bulk import done', 'success');
    takeAutoSnapshot('Before bulk import');
  } catch (e) { el.textContent = 'Error: ' + e.message; }
}

// ─── Export DB ─────────────────────────────────────────────
async function exportDb() {
  try {
    const data = await apiGet('');
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'kurama-db-full.json'; a.click();
    toast('Exported full DB', 'success');
  } catch (e) { toast(e.message, 'error'); }
}

// ─── Snapshots ─────────────────────────────────────────────
function renderSnapshots() {
  const container = document.getElementById('snapshotsContainer');
  if (!S.snapshots.length) {
    container.innerHTML = '<div style="text-align:center;padding:30px;opacity:.5;font-size:13px">No snapshots yet. Take one to save the current database state.</div>';
    return;
  }
  let html = '';
  S.snapshots.forEach((s, i) => {
    const size = new Blob([JSON.stringify(s.data)]).size;
    const sizeStr = size < 1024 ? size + ' B' : (size/1024).toFixed(1) + ' KB';
    html += `<div class="card glass" style="padding:14px 18px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
        <div><strong style="font-size:13px">${esc(s.name || 'Snapshot ' + (i+1))}</strong>
        <div style="font-size:11px;opacity:.5;margin-top:2px">${new Date(s.time).toLocaleString()} · ${sizeStr} · ${countNodes(s.data)} nodes</div></div>
        <div class="fr">
          <button class="btn btn-outline btn-xs" onclick="restoreSnapshot(${i})">${icon('refresh')} Restore</button>
          <button class="btn btn-outline btn-xs" onclick="downloadSnapshot(${i})">${icon('download')}</button>
          <button class="btn btn-outline btn-xs" onclick="diffSnapshot(${i})">${icon('activity')} Diff</button>
          ${S.readOnly?'':`<button class="btn btn-danger btn-xs ro-hide" onclick="deleteSnapshot(${i})">${icon('trash')}</button>`}
        </div>
      </div>
    </div>`;
  });
  container.innerHTML = html;
}

async function takeSnapshot() {
  try {
    const data = await apiGet('');
    const name = prompt('Snapshot name:', 'Snapshot ' + (S.snapshots.length + 1));
    if (!name) return;
    S.snapshots.push({ name, time: Date.now(), data });
    localStorage.setItem('krm_snapshots', JSON.stringify(S.snapshots));
    toast('Snapshot saved: ' + name, 'success');
    renderSnapshots();
  } catch (e) { toast(e.message, 'error'); }
}

function takeAutoSnapshot(label) {
  clearTimeout(S.autoSnapshotTimer);
  S.autoSnapshotTimer = setTimeout(() => {
    apiGet('').then(data => {
      S.snapshots.push({ name: label || 'Auto ' + new Date().toLocaleTimeString(), time: Date.now(), data });
      if (S.snapshots.length > 30) S.snapshots = S.snapshots.slice(-30);
      localStorage.setItem('krm_snapshots', JSON.stringify(S.snapshots));
    }).catch(() => {});
  }, 2000);
}

function restoreSnapshot(idx) {
  if (!checkWrite()) return;
  if (!confirm('Restore snapshot "' + S.snapshots[idx].name + '"? Current data will be overwritten.')) return;
  const data = S.snapshots[idx].data;
  apiPut('', data).then(() => {
    toast('Restored snapshot: ' + S.snapshots[idx].name, 'success');
    if (S.currentView === 'tree') loadTree();
    else if (S.currentView === 'json') loadRawJson();
  }).catch(e => toast(e.message, 'error'));
}

function diffSnapshot(idx) {
  const snap = S.snapshots[idx];
  if (!snap) return;
  const current = S.dbData;
  const snapData = snap.data;
  const diffHtml = computeDiff(current, snapData);
  const modal = document.getElementById('diffModal');
  document.getElementById('diffContent').innerHTML = diffHtml;
  document.getElementById('diffTitle').textContent = 'Diff: ' + (snap.name || 'Snapshot ' + (idx+1));
  modal.classList.add('open');
}

function computeDiff(current, snapshot) {
  if (!current && !snapshot) return '<div style="opacity:.5">Both empty</div>';
  if (!current) return '<div style="color:var(--lg-danger)">Current: EMPTY</div>';
  if (!snapshot) return '<div style="color:var(--lg-success)">Snapshot: EMPTY</div>';
  const curStr = JSON.stringify(current, null, 2);
  const snapStr = JSON.stringify(snapshot, null, 2);
  if (curStr === snapStr) return '<div style="color:var(--lg-success)">No differences</div>';
  const curLines = curStr.split('\n');
  const snapLines = snapStr.split('\n');
  let html = '<pre style="font-size:11px;max-height:400px;overflow:auto;line-height:1.5">';
  const maxLen = Math.max(curLines.length, snapLines.length);
  for (let i = 0; i < maxLen; i++) {
    if (curLines[i] !== snapLines[i]) {
      if (snapLines[i] !== undefined) html += `<span style="color:var(--lg-danger)">- ${esc(snapLines[i])}\n</span>`;
      if (curLines[i] !== undefined) html += `<span style="color:var(--lg-success)">+ ${esc(curLines[i])}\n</span>`;
    } else {
      html += `  ${esc(curLines[i])}\n`;
    }
  }
  html += '</pre>';
  return html;
}

function downloadSnapshot(idx) {
  const blob = new Blob([JSON.stringify(S.snapshots[idx].data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
  a.download = (S.snapshots[idx].name || 'snapshot') + '.json'; a.click();
}

function deleteSnapshot(idx) {
  S.snapshots.splice(idx, 1);
  localStorage.setItem('krm_snapshots', JSON.stringify(S.snapshots));
  renderSnapshots();
  toast('Snapshot deleted', 'info');
}

// ─── Auto Refresh ─────────────────────────────────────────
function toggleAutoRefresh() {
  if (document.getElementById('autoRefresh').checked) {
    S.autoRefreshTimer = setInterval(refreshAll, 10000);
    toast('Auto-refresh ON (10s)', 'info');
  } else {
    clearInterval(S.autoRefreshTimer);
    S.autoRefreshTimer = null;
    toast('Auto-refresh OFF', 'info');
  }
}

// ─── Modals ────────────────────────────────────────────────
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

function showShortcuts() {
  document.getElementById('shortcutsModal').classList.add('open');
}

// ─── Keyboard Shortcuts ───────────────────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (S.cmdPaletteOpen) { closeCmdPalette(); return; }
    document.querySelectorAll('.modal-overlay.open').forEach(el => el.classList.remove('open'));
    document.getElementById('ctxMenu').classList.remove('open');
    if (document.getElementById('detailPanel').classList.contains('open')) closeDetail();
    return;
  }
  if (e.ctrlKey && e.shiftKey && e.key === 'P') { e.preventDefault(); openCmdPalette(); return; }
  if (e.ctrlKey && e.shiftKey && e.key === 'R') { e.preventDefault(); toggleReadOnly(); return; }
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
  if (e.key === '/' || (e.ctrlKey && e.key === 'f')) {
    e.preventDefault();
    const search = document.querySelector('.tbar .search-wrap input');
    if (search) search.focus();
    return;
  }
  if (e.key === 'r' && !e.ctrlKey) { refreshAll(); return; }
  if (e.key === '1') switchView('tree');
  if (e.key === '2') switchView('json');
  if (e.key === '3') switchView('keys');
  if (e.key === '4') switchView('project');
  if (e.key === '5') switchView('import');
  if (e.key === '6') switchView('snapshots');
  if (e.key === 'a' && S.currentView === 'tree' && !S.readOnly) { showAddNodeModal(S.dbPath); return; }
  if (e.key === 'e' && S.selectedNodePath && !S.readOnly) { editNode(S.selectedNodePath); return; }
  if (e.key === 'Delete' && S.selectedNodePath && !S.readOnly) { deleteNode(S.selectedNodePath); return; }
  if (e.ctrlKey && e.shiftKey && e.key === 'E') { e.preventDefault(); exportDb(); }
});

// ─── Sidebar Resize ───────────────────────────────────────
(function() {
  const resizer = document.getElementById('sidebarResize');
  if (!resizer) return;
  let startX, startWidth;
  resizer.addEventListener('mousedown', function(e) {
    startX = e.clientX;
    startWidth = document.getElementById('sidebar').offsetWidth;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
  function onMove(e) {
    if (!e.buttons) { onUp(); return; }
    const w = Math.max(120, Math.min(400, startWidth + (e.clientX - startX)));
    document.getElementById('sidebar').style.width = w + 'px';
    document.getElementById('sidebar').style.minWidth = w + 'px';
  }
  function onUp() { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); }
})();

// ─── Refresh ───────────────────────────────────────────────
function refreshAll() {
  if (S.currentView === 'tree') loadTree();
  else if (S.currentView === 'json') loadRawJson();
  else if (S.currentView === 'keys') loadKeysView();
  else if (S.currentView === 'project') loadProjectView();
  else if (S.currentView === 'snapshots') renderSnapshots();
  toast('Refreshed', 'info');
}

// ─── Utils ─────────────────────────────────────────────────
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escJs(p) { return p.replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }
function countNodes(data) {
  if (!data || typeof data !== 'object') return 1;
  let c = 1;
  for (const v of Object.values(data)) c += countNodes(v);
  return c;
}

// ─── Hover Preview Card ────────────────────────────────────
function showHoverCard(e, path, key, value) {
  const existing = document.getElementById('hoverCard');
  if (existing) existing.remove();
  const card = document.createElement('div');
  card.id = 'hoverCard';
  card.className = 'hover-card';
  const displayVal = value === undefined ? 'undefined' :
    value === null ? 'null' :
    typeof value === 'string' ? `"${esc(value)}"` :
    typeof value === 'object' ? esc(JSON.stringify(value, null, 1)).slice(0, 500) :
    esc(String(value));
  card.innerHTML = `<div class="hkl">${esc(key || path.split('/').pop())}</div><div class="hvl">${displayVal}</div>`;
  document.body.appendChild(card);
  requestAnimationFrame(() => {
    const rect = card.getBoundingClientRect();
    const x = Math.min(e.clientX + 12, window.innerWidth - rect.width - 8);
    const y = Math.min(e.clientY + 12, window.innerHeight - rect.height - 8);
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    card.classList.add('visible');
  });
}

function hideHoverCard() {
  const card = document.getElementById('hoverCard');
  if (card) { card.classList.remove('visible'); setTimeout(() => card.remove(), 200); }
}

let hoverCardTimer = null;
function hoverCardDebounce(e, path, key, value) {
  clearTimeout(hoverCardTimer);
  if (value !== null && value !== undefined && typeof value !== 'object') {
    hoverCardTimer = setTimeout(() => showHoverCard(e, path, key, value), 400);
  } else if (value && typeof value === 'object' && Object.keys(value).length <= 5) {
    hoverCardTimer = setTimeout(() => showHoverCard(e, path, key, value), 500);
  }
}

// ─── Quick Action Popup ─────────────────────────────────────
function showQuickActions(e, path) {
  hideQuickActions();
  const el = document.createElement('div');
  el.className = 'quick-actions';
  el.id = 'quickActions';
  el.innerHTML = `
    ${S.readOnly ? '' : `<button class="btn btn-outline btn-xs" onclick="event.stopPropagation();editNode('${escJs(path)}');hideQuickActions()">${icon('edit')} Edit</button>`}
    <button class="btn btn-outline btn-xs" onclick="event.stopPropagation();navigateTo('${escJs(path)}');hideQuickActions()">${icon('search')} Open</button>
    ${S.readOnly ? '' : `<button class="btn btn-outline btn-xs" onclick="event.stopPropagation();showForkModal('${escJs(path)}');hideQuickActions()">${icon('duplicate')} Fork</button>`}
    <button class="btn btn-outline btn-xs" onclick="event.stopPropagation();navigator.clipboard.writeText('/${escJs(path)}').then(()=>toast('Path copied','success'));hideQuickActions()">${icon('copy')} Path</button>
    ${S.readOnly ? '' : `<button class="btn btn-danger btn-xs" onclick="event.stopPropagation();confirmModal('Delete /${esc(path)}?',()=>deleteNode('${escJs(path)}'));hideQuickActions()">${icon('trash')}</button>`}
  `;
  el.style.left = Math.min(e.clientX - 60, window.innerWidth - 260) + 'px';
  el.style.top = (e.clientY - 36) + 'px';
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('visible'));
  el.addEventListener('mouseleave', () => { setTimeout(hideQuickActions, 300); });
}

function hideQuickActions() {
  const el = document.getElementById('quickActions');
  if (el) { el.classList.remove('visible'); setTimeout(() => el.remove(), 200); }
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.quick-actions') && !e.target.closest('.ctx-menu')) {
    hideQuickActions();
  }
});

// ─── Fork Modal ─────────────────────────────────────────────
function showForkModal(path) {
  if (!checkWrite()) return;
  const parts = path.split('/');
  const key = parts[parts.length-1];
  const parent = parts.slice(0,-1).join('/');
  const val = getNodeValue(path);
  const forkKey = key + '_fork';
  document.getElementById('forkCurrentPath').value = '/' + (S.dbPath ? S.dbPath + '/' : '') + path;
  document.getElementById('forkNewPath').value = parent ? parent + '/' + forkKey : forkKey;
  document.getElementById('forkValue').value = JSON.stringify(val, null, 2);
  document.getElementById('forkStatus').textContent = '';
  document.getElementById('forkModal').classList.add('open');
}

function getNodeValue(path) {
  let val = S.dbData;
  for (const p of path.split('/')) { if (p && val && typeof val === 'object') val = val[p]; else return undefined; }
  return val;
}

async function confirmFork() {
  if (!checkWrite()) return;
  const newPath = document.getElementById('forkNewPath').value.trim();
  const valStr = document.getElementById('forkValue').value.trim();
  const el = document.getElementById('forkStatus');
  if (!newPath) { el.textContent = 'Path required'; return; }
  el.textContent = 'Forking...';
  try {
    const val = JSON.parse(valStr);
    const fullPath = '/' + (S.dbPath ? S.dbPath + '/' : '') + newPath;
    await apiPut(fullPath, val);
    toast('Forked to /' + newPath, 'success');
    closeModal('forkModal');
    takeAutoSnapshot('Before fork: ' + newPath);
    loadTree();
  } catch (e) { el.textContent = 'Error: ' + e.message; }
}

// ─── Confirmation Modal ─────────────────────────────────────
function confirmModal(msg, onConfirm) {
  const overlay = document.getElementById('confirmOverlay');
  const modal = document.getElementById('confirmModal');
  document.getElementById('confirmMsg').textContent = msg;
  const cb = document.getElementById('confirmBtn');
  const nb = document.getElementById('cancelBtn');
  const nc = () => { overlay.classList.remove('open'); modal.classList.remove('open'); };
  cb.onclick = () => { nc(); if (onConfirm) onConfirm(); };
  nb.onclick = nc;
  overlay.classList.add('open');
  modal.classList.add('open');
}

// override browser confirm for key operations (kept for compatibility)
function customConfirm(msg) {
  return new Promise(resolve => {
    confirmModal(msg, () => resolve(true));
    document.getElementById('cancelBtn').onclick = () => { closeModal('confirmModal'); document.getElementById('confirmOverlay').classList.remove('open'); resolve(false); };
  });
}

// ─── Hover card trigger on tree rows ──────────────────────
document.addEventListener('mouseover', function(e) {
  const row = e.target.closest('[data-fp]');
  if (!row || S.hoverCardPaused) return;
  const path = row.dataset.fp;
  let val = S.dbData;
  for (const p of path.split('/')) { if (p && val && typeof val === 'object') val = val[p]; else { val = undefined; break; } }
  if (val !== undefined) hoverCardDebounce(e, path, path.split('/').pop(), val);
});
document.addEventListener('mouseout', function(e) {
  if (e.target.closest('[data-fp]') && !e.relatedTarget?.closest('.hover-card')) {
    clearTimeout(hoverCardTimer);
    hideHoverCard();
  }
});

// ─── Quick action on double-click tree row ────────────────
document.addEventListener('dblclick', function(e) {
  const row = e.target.closest('[data-fp]');
  if (!row || S.readOnly) return;
  e.preventDefault();
  showQuickActions(e, row.dataset.fp);
});

// ─── Tooltip position fixer ────────────────────────────────
document.addEventListener('mouseover', function(e) {
  const el = e.target.closest('[data-tip]');
  if (!el) return;
  const tooltip = el.querySelector('.tt-fixed') || (() => {
    const t = document.createElement('div');
    t.className = 'tt-fixed';
    t.style.cssText = 'position:fixed;padding:4px 10px;border-radius:7px;font-size:10px;white-space:nowrap;z-index:9999;background:rgba(10,10,10,.92);color:#c8c8c8;border:1px solid rgba(60,20,20,.1);pointer-events:none;display:none;';
    el.appendChild(t);
    return t;
  })();
  tooltip.textContent = el.getAttribute('data-tip');
  const rect = el.getBoundingClientRect();
  tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = (rect.top - tooltip.offsetHeight - 6) + 'px';
  tooltip.style.display = 'block';
  el.addEventListener('mouseleave', function h() { tooltip.style.display = 'none'; el.removeEventListener('mouseleave', h); }, { once: true });
});

// ─── Add ripple to buttons ─────────────────────────────────
document.addEventListener('mousedown', function(e) {
  const btn = e.target.closest('.btn');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `position:absolute;border-radius:50%;background:rgba(120,40,40,.12);width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px;transform:scale(0);animation:rippleAnim .4s ease-out;pointer-events:none;`;
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 500);
});

// inject ripple keyframes once
(function() {
  const style = document.createElement('style');
  style.textContent = '@keyframes rippleAnim{0%{transform:scale(0);opacity:.4}100%{transform:scale(4);opacity:0}}';
  document.head.appendChild(style);
})();

// ─── Init ──────────────────────────────────────────────────
async function init() {
  // Set initial theme
  const root = document.documentElement;
  root.setAttribute('data-theme', S.theme);

  // Apply sidebar state
  if (S.sidebarCollapsed) document.getElementById('sidebar')?.classList.add('collapsed');

  // Firebase auth
  await initAuth();

  // Apply read-only
  applyReadOnly();

  // Render bookmarks
  renderBookmarks();

  // Load tree
  loadTree();
}

init();
