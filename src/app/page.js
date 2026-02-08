"use client";

import useKarmaStore from "../hooks/useKarmaStore";
import KarmaScore from "../components/KarmaScore";
import DeedList from "../components/DeedList";
import AddDeedForm from "../components/AddDeedForm";
import DateNavigator from "../components/DateNavigator";
import KarmaBar from "../components/KarmaBar";
import { getTodayKey } from "../utils/storage";

export default function Home() {
  const {
    selectedDate,
    setSelectedDate,
    goodDeeds,
    badDeeds,
    addGoodDeed,
    addBadDeed,
    removeGoodDeed,
    removeBadDeed,
  } = useKarmaStore();

  const totalScore =
    goodDeeds.reduce((sum, d) => sum + d.score, 0) +
    badDeeds.reduce((sum, d) => sum + d.score, 0);

  const isToday = selectedDate === getTodayKey();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* -------- Good Karma (left / top) -------- */}
      <section className="flex flex-1 flex-col items-center bg-white px-8 py-12 text-gray-900">
        <h1 className="mb-6 text-5xl">😇</h1>
        {isToday && <AddDeedForm variant="good" onAdd={addGoodDeed} />}
        <div className="mt-8 w-full">
          <DeedList deeds={goodDeeds} variant="good" onRemove={removeGoodDeed} />
        </div>
      </section>

      {/* -------- Karma Score + Date Navigator (center divider) -------- */}
      <div className="flex items-center justify-center gap-4 bg-gray-200 px-6 py-4 md:flex-col md:py-0">
        <DateNavigator
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
        <KarmaScore score={totalScore} />
        <KarmaBar score={totalScore} />
      </div>

      {/* -------- Bad Karma (right / bottom) -------- */}
      <section className="flex flex-1 flex-col items-center bg-black px-8 py-12 text-gray-100">
        <h1 className="mb-6 text-5xl">😈</h1>
        {isToday && <AddDeedForm variant="bad" onAdd={addBadDeed} />}
        <div className="mt-8 w-full">
          <DeedList deeds={badDeeds} variant="bad" onRemove={removeBadDeed} />
        </div>
      </section>
    </div>
  );
}
