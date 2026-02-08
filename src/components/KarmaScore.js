export default function KarmaScore({ score }) {
  const color =
    score > 0
      ? "text-green-600"
      : score < 0
        ? "text-red-500"
        : "text-gray-800";

  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
        Karma
      </p>
      <p className={`text-5xl font-extrabold ${color}`}>
        {score > 0 ? `+${score}` : score}
      </p>
    </div>
  );
}
