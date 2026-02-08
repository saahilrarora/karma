"use client";

import { useState, useEffect } from "react";
import { getTodayKey, loadDay, saveDay } from "../utils/storage";

/**
 * Custom hook that manages karma deeds for a given date and
 * keeps them in sync with localStorage.
 *
 * Returns: { selectedDate, setSelectedDate, goodDeeds, badDeeds, addGoodDeed, addBadDeed }
 */
export default function useKarmaStore() {
  const [selectedDate, setSelectedDate] = useState(getTodayKey());
  const [goodDeeds, setGoodDeeds] = useState([]);
  const [badDeeds, setBadDeeds] = useState([]);

  // ---------- Load from localStorage when selectedDate changes ----------
  useEffect(() => {
    const data = loadDay(selectedDate);
    setGoodDeeds(data.good);
    setBadDeeds(data.bad);
  }, [selectedDate]);

  // ---------- Save to localStorage whenever deeds change ----------
  // We use a flag to skip the very first render (which is the load above).
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // On the initial render the deeds are empty (default state).
    // The load-effect above will fire and fill them in.
    // We don't want to save the empty arrays back and overwrite real data.
    if (!loaded) {
      setLoaded(true);
      return;
    }
    saveDay(selectedDate, { good: goodDeeds, bad: badDeeds });
  }, [goodDeeds, badDeeds]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- Actions ----------
  function addGoodDeed(deed) {
    setGoodDeeds((prev) => [deed, ...prev]);
  }

  function addBadDeed(deed) {
    setBadDeeds((prev) => [deed, ...prev]);
  }

  function removeGoodDeed(id) {
    setGoodDeeds((prev) => prev.filter((d) => d.id !== id));
  }

  function removeBadDeed(id) {
    setBadDeeds((prev) => prev.filter((d) => d.id !== id));
  }

  return {
    selectedDate,
    setSelectedDate,
    goodDeeds,
    badDeeds,
    addGoodDeed,
    addBadDeed,
    removeGoodDeed,
    removeBadDeed,
  };
}
