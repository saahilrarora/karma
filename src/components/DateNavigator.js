import { getTodayKey } from "../utils/storage";

/**
 * Shift a "YYYY-MM-DD" string by `days` (negative = past, positive = future).
 */
function shiftDate(dateKey, days) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

/**
 * Turn "2026-02-08" into a friendly label like "Today", "Yesterday",
 * or "Sat, Feb 8".
 */
function formatLabel(dateKey) {
  const today = getTodayKey();
  if (dateKey === today) return "Today";
  if (dateKey === shiftDate(today, -1)) return "Yesterday";

  const [year, month, day] = dateKey.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function DateNavigator({ selectedDate, onDateChange }) {
  const isToday = selectedDate === getTodayKey();

  return (
    <div className="flex items-center gap-4">
      {/* Back arrow */}
      <button
        type="button"
        onClick={() => onDateChange(shiftDate(selectedDate, -1))}
        className="rounded-full p-1 text-gray-500 transition-colors hover:text-gray-800"
        aria-label="Previous day"
      >
        &larr;
      </button>

      {/* Date label */}
      <span className="min-w-[8rem] text-center text-sm font-medium text-gray-700">
        {formatLabel(selectedDate)}
      </span>

      {/* Forward arrow — disabled if already on today */}
      <button
        type="button"
        onClick={() => onDateChange(shiftDate(selectedDate, 1))}
        disabled={isToday}
        className={`rounded-full p-1 transition-colors ${
          isToday
            ? "cursor-not-allowed text-gray-300"
            : "text-gray-500 hover:text-gray-800"
        }`}
        aria-label="Next day"
      >
        &rarr;
      </button>
    </div>
  );
}
