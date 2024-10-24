import { useUpdateHabitMutation } from "@/features/habits/habit.api";
import { CircleCheckBig } from "lucide-react";
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
    <div className="flex flex-col items-center md:w-1/2 md:m-auto md:py-12 m-4 py-4 text-center font-sans border border-1 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold mb-4">Pomodoro Timer</h1>
      <h2 className="text-4xl font-semibold mb-2">{formatTime(time)}</h2>
      <h3 className="text-l mb-4 capitalize text-muted-foreground">
        Mode: {mode}
      </h3>
      <SelectHabitForm
        toggleTimer={toggleTimer}
        isActive={isActive}
        resetTimer={resetTimer}
      />
      <div className="flex items-center space-x-1 mt-2">
        <CircleCheckBig className="h-4 w-4 text-xs text-slate-700" />
        <p className="text-slate-700">Completed cycles: {cycles}</p>
      </div>
    </div>
  );
};

export default Timer;
