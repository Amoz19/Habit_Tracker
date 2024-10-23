import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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
    // console.log(selectedHabit);
    dispatch(
      addSelectHabitId({
        habitId: selectedHabit._id,
        isComplete: selectedHabit.isComplete,
      })
    );
  };

  return (
    <div className="w-2/3 space-y-6 m-auto">
      <div className="flex justify-center space-x-4 mb-4">
        <Button
          onClick={toggleTimer}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isActive ? "Pause" : "Start"}
        </Button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Reset
        </button>
      </div>
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
    </div>
  );
};

export default SelectHabitForm;
