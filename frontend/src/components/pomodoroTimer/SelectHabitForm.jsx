import { RotateCcw, Play, Pause } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../ui/select";
import {
  useGetHabitsQuery,
  useUpdateHabitMutation,
} from "@/features/habits/habit.api";
import { Button } from "../ui/button";
import LoadingSpinner from "../LoadingSpinner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { addSelectHabitId } from "@/features/habits/habitSlice";

const SelectHabitForm = ({ toggleTimer, resetTimer, isActive }) => {
  const { data, isLoading, isError } = useGetHabitsQuery();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <LoadingSpinner />;
  } else if (isError) {
    return "Something went wrong";
  }

  const handleValueChange = (value) => {
    const selectedHabit = data?.find((habitData) => habitData._id === value);

    dispatch(
      addSelectHabitId({
        habitId: selectedHabit._id,
        isComplete: selectedHabit.isComplete,
      })
    );
  };

  return (
    <div className="w-2/3 space-y-6 m-auto">
      <div className="flex justify-center space-x-2">
        <Button onClick={toggleTimer} className="w-24">
          {isActive ? (
            <Pause className="mr-2 h-4 w-4" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={resetTimer} variant="outline" className="w-24">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
      <div>
        <Select onValueChange={handleValueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select your habit to study" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((habit) => (
              <SelectItem value={habit._id} key={habit.habitName}>
                {habit.habitName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-muted-foreground text-xs mt-2">
          After 5 minutes will mark as completed
        </p>
      </div>
    </div>
  );
};

export default SelectHabitForm;
