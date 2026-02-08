import DeedItem from "./DeedItem";

export default function DeedList({ deeds, variant }) {
  if (deeds.length === 0) {
    return (
      <p
        className={`text-center text-sm italic ${
          variant === "good" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        No deeds yet — go do something!
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2">
      {deeds.map((deed) => (
        <DeedItem key={deed.id} deed={deed} variant={variant} />
      ))}
    </div>
  );
}
