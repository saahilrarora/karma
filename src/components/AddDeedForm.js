"use client";

import { useState } from "react";

export default function AddDeedForm({ variant, onAdd }) {
  const isGood = variant === "good";
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("write"); // "write" or "quick" (bad karma only)
  const [severity, setSeverity] = useState(null); // 1-5 for quick mode

  function handleWriteSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      description: description.trim(),
      score: isGood ? 1 : -1,
      timestamp: new Date().toISOString(),
    });
    setDescription("");
  }

  function handleQuickSubmit() {
    if (severity === null) return;

    onAdd({
      id: crypto.randomUUID(),
      description: "Pending...",
      score: -severity,
      timestamp: new Date().toISOString(),
    });
    setSeverity(null);
  }

  // Shared input styles
  const inputClasses = isGood
    ? "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
    : "border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-500 focus:border-red-500 focus:ring-red-500";

  const buttonClasses = isGood
    ? "bg-green-600 hover:bg-green-700 text-white"
    : "bg-red-600 hover:bg-red-700 text-white";

  return (
    <div className="mt-6 w-full">
      {/* Write mode (both good and bad) */}
      {(isGood || mode === "write") && (
        <form onSubmit={handleWriteSubmit} className="flex gap-2">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={isGood ? "What good did you do?" : "What happened?"}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-1 ${inputClasses}`}
          />
          <button
            type="submit"
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${buttonClasses}`}
          >
            Add
          </button>
        </form>
      )}

      {/* Quick mode (bad karma only) */}
      {!isGood && mode === "quick" && (
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-gray-400">How bad? Pick a severity:</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setSeverity(level)}
                className={`h-10 w-10 rounded-full text-sm font-bold transition-colors ${
                  severity === level
                    ? "bg-red-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleQuickSubmit}
            disabled={severity === null}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              severity !== null
                ? "bg-red-600 text-white hover:bg-red-700"
                : "cursor-not-allowed bg-gray-700 text-gray-500"
            }`}
          >
            Add
          </button>
        </div>
      )}

      {/* Mode toggle — bad karma only, sits below the input area */}
      {!isGood && (
        <div className="mt-3 flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setMode("write")}
            className={`rounded-full px-4 py-1 text-xs font-medium transition-colors ${
              mode === "write"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Confess
          </button>
          <button
            type="button"
            onClick={() => setMode("quick")}
            className={`rounded-full px-4 py-1 text-xs font-medium transition-colors ${
              mode === "quick"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Conceal
          </button>
        </div>
      )}
    </div>
  );
}
