import { useUpdateHabitMutation } from "@/features/habits/habit.api";

import { useState, useEffect, useCallback } from "react";
import SelectHabitForm from "./SelectHabitForm";
import { useAppSelector } from "@/app/hook";

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK = 5 * 60; // 5 minutes in seconds
const LONG_BREAK = 15 * 60; // 15 minutes in seconds

const Timer = () => {
  const { selectedHabitId, isComplete } = useAppSelector(
    (state) => state.habits
  );

  const [updateHabit] = useUpdateHabitMutation();
  const [time, setTime] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus");
  const [cycles, setCycles] = useState(0);

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  }, []);

  const switchMode = useCallback(() => {
    if (mode === "focus") {
      setCycles((prevCycles) => prevCycles + 1);
      if (cycles === 3) {
        setMode("longBreak");
        setTime(LONG_BREAK);
      } else {
        setMode("shortBreak");
        setTime(SHORT_BREAK);
      }
    } else {
      setMode("focus");
      setTime(FOCUS_TIME);
    }
  }, [mode, cycles]);

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        if (FOCUS_TIME - 5 === time && selectedHabitId !== null) {
          updateHabit({
            id: selectedHabitId,
            isComplete,
          })
            .unwrap()
            .then((res) => console.log(res.message))
            .catch((error) => console.log(error));
        }
      }, 1000);
    } else if (time === 0) {
      switchMode();
    }
    return () => clearInterval(interval);
  }, [isActive, time, switchMode]);

  const toggleTimer = () => setIsActive((prevActive) => !prevActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setMode("focus");
    setTime(FOCUS_TIME);
    setCycles(0);
  }, []);

  return (
    <div className="text-center font-sans">
      <h1 className="text-3xl font-bold mb-4">Pomodoro Timer</h1>
      <h2 className="text-4xl font-semibold mb-2">{formatTime(time)}</h2>
      <h3 className="text-xl mb-4 capitalize">Mode: {mode}</h3>
      {/* <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={toggleTimer}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Reset
        </button>
      </div> */}

      <SelectHabitForm
        toggleTimer={toggleTimer}
        isActive={isActive}
        resetTimer={resetTimer}
      />
      <p className="text-lg mt-3">Completed cycles: {cycles}</p>
    </div>
  );
};

export default Timer;
