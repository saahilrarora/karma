"use client";

import { useState, useEffect, useRef } from "react";

const MAX_SCORE = 20; // scores beyond ±20 pin to the edges

/**
 * Map a karma score to a percentage position (0–100).
 * 0 karma = 50% (center). -20 = 0% (far left). +20 = 100% (far right).
 */
function scoreToPercent(score) {
  const raw = 50 + (score / MAX_SCORE) * 50;
  return Math.min(100, Math.max(0, raw));
}

export default function KarmaBar({ score }) {
  const prevScoreRef = useRef(score);
  const isFirstRender = useRef(true);
  const [floaters, setFloaters] = useState([]);

  useEffect(() => {
    // Skip the very first render — no delta to show yet
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevScoreRef.current = score;
      return;
    }

    const delta = score - prevScoreRef.current;
    prevScoreRef.current = score;

    // No change (e.g. date navigation loaded same total) — skip
    if (delta === 0) return;

    const id = Date.now() + Math.random(); // unique key
    setFloaters((prev) => [...prev, { id, delta }]);

    // Remove after animation completes (1s)
    const timer = setTimeout(() => {
      setFloaters((prev) => prev.filter((f) => f.id !== id));
    }, 1000);

    return () => clearTimeout(timer);
  }, [score]);

  const percent = scoreToPercent(score);

  return (
    <div className="relative h-3 w-40 overflow-hidden rounded-full bg-gray-300">
      {/* Gradient track */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "linear-gradient(to right, #ef4444, #fbbf24 50%, #22c55e)",
        }}
      />

      {/* Center tick mark */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/40" />

      {/* Sliding indicator */}
      <div
        className="absolute top-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-gray-900 shadow-lg"
        style={{
          left: `${percent}%`,
          transition: "left 0.5s ease",
        }}
      />

      {/* Floating score deltas */}
      {floaters.map((f) => (
        <span
          key={f.id}
          className={`pointer-events-none absolute z-20 text-sm font-bold ${
            f.delta > 0 ? "text-green-700" : "text-red-600"
          }`}
          style={{
            left: `${percent}%`,
            transform: "translateX(-50%)",
            animation: "karmaFloat 1s ease-out forwards",
          }}
        >
          {f.delta > 0 ? `+${f.delta}` : f.delta}
        </span>
      ))}

      {/* Keyframes injected via style tag (self-contained) */}
      <style>{`
        @keyframes karmaFloat {
          0% {
            opacity: 1;
            top: -4px;
          }
          100% {
            opacity: 0;
            top: -32px;
          }
        }
      `}</style>
    </div>
  );
}
