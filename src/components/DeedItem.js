export default function DeedItem({ deed, variant }) {
  const isGood = variant === "good";

  return (
    <div
      className={`flex items-center justify-between rounded-lg px-4 py-3 ${
        isGood ? "bg-gray-100 text-gray-900" : "bg-gray-800 text-gray-100"
      }`}
    >
      <span className="mr-4 text-sm">{deed.description}</span>
      <span
        className={`shrink-0 text-sm font-bold ${
          isGood ? "text-green-600" : "text-red-400"
        }`}
      >
        {deed.score > 0 ? `+${deed.score}` : deed.score}
      </span>
    </div>
  );
}
