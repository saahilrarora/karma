// storage.js — localStorage helpers for the Karma app
//
// Data shape in localStorage under the key "karma-deeds":
// {
//   "2026-02-08": {
//     "good": [ { id, description, score, timestamp }, ... ],
//     "bad":  [ { id, description, score, timestamp }, ... ]
//   },
//   "2026-02-07": { ... }
// }

const STORAGE_KEY = "karma-deeds";

/**
 * Get today's date as a "YYYY-MM-DD" string in the user's local timezone.
 */
export function getTodayKey() {
  const now = new Date();
  // toISOString() gives UTC — instead we build from local parts
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Read the entire karma data object from localStorage.
 * Returns {} if nothing is stored yet.
 */
export function loadAll() {
  if (typeof window === "undefined") return {}; // SSR safety
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/**
 * Load deeds for a specific date.
 * Returns { good: [...], bad: [...] }.
 */
export function loadDay(dateKey) {
  const all = loadAll();
  return all[dateKey] || { good: [], bad: [] };
}

/**
 * Save deeds for a specific date.
 * `deeds` should be { good: [...], bad: [...] }.
 */
export function saveDay(dateKey, deeds) {
  const all = loadAll();
  all[dateKey] = deeds;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}
