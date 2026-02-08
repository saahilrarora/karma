"use client";

import { useState } from "react";
import KarmaScore from "../components/KarmaScore";
import DeedList from "../components/DeedList";
import AddDeedForm from "../components/AddDeedForm";

export default function Home() {
  const [goodDeeds, setGoodDeeds] = useState([]);
  const [badDeeds, setBadDeeds] = useState([]);

  // Sum up all scores to get net karma
  const totalScore =
    goodDeeds.reduce((sum, d) => sum + d.score, 0) +
    badDeeds.reduce((sum, d) => sum + d.score, 0);

  function addGoodDeed(deed) {
    setGoodDeeds((prev) => [deed, ...prev]);
  }

  function addBadDeed(deed) {
    setBadDeeds((prev) => [deed, ...prev]);
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* -------- Good Karma (left / top) -------- */}
      <section className="flex flex-1 flex-col items-center bg-white px-8 py-12 text-gray-900">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Good</h1>
        <AddDeedForm variant="good" onAdd={addGoodDeed} />
        <div className="mt-8 w-full">
          <DeedList deeds={goodDeeds} variant="good" />
        </div>
      </section>

      {/* -------- Karma Score (center divider) -------- */}
      <div className="flex items-center justify-center bg-gray-200 px-6 py-4 md:flex-col md:py-0">
        <KarmaScore score={totalScore} />
      </div>

      {/* -------- Bad Karma (right / bottom) -------- */}
      <section className="flex flex-1 flex-col items-center bg-black px-8 py-12 text-gray-100">
        <h1 className="mb-6 text-4xl font-bold tracking-tight">Bad</h1>
        <AddDeedForm variant="bad" onAdd={addBadDeed} />
        <div className="mt-8 w-full">
          <DeedList deeds={badDeeds} variant="bad" />
        </div>
      </section>
    </div>
  );
}
