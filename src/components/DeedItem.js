export default function DeedItem({ deed, variant, onRemove }) {
  const isGood = variant === "good";

  return (
    <div
      className={`group flex items-center justify-between rounded-lg px-4 py-3 ${
        isGood ? "bg-gray-100 text-gray-900" : "bg-gray-800 text-gray-100"
      }`}
    >
      <span className="mr-4 text-sm">{deed.description}</span>
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`text-sm font-bold ${
            isGood ? "text-green-600" : "text-red-400"
          }`}
        >
          {deed.score > 0 ? `+${deed.score}` : deed.score}
        </span>
        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(deed.id)}
            className={`rounded p-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 ${
              isGood
                ? "text-gray-400 hover:text-red-500"
                : "text-gray-500 hover:text-red-400"
            }`}
            aria-label="Remove deed"
          >
            &#x2715;
          </button>
        )}
      </div>
    </div>
  );
}
