import { useParams } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import Loading from "./Loading";
import { getDate, getDay, getMonth, isToday, startOfMonth } from "date-fns";

import {
  useGetHabitQuery,
  useUpdateHabitMutation,
} from "../features/habits/habit.api";
import { useState } from "react";
import { cn } from "@/lib/utils";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const HabitCalendar = () => {
  const date = new Date();
  const currentMonth = getMonth(date);
  const currentDay = getDate(date);
  const startDayOfMonth = startOfMonth(date);
  const startingDayIndex = getDay(startDayOfMonth);

  const [currentMonthIndex, setCurrentMonthIndex] = useState(currentMonth);
  const { id } = useParams();

  const { data: habitData, isLoading } = useGetHabitQuery(id, "getHabits");

  const [updateHabit] = useUpdateHabitMutation();

  if (isLoading) {
    return <Loading />;
  }

  // console.log(currentMonth);

  // if (error) {
  //   return <NotFound />;
  // }

  const handleDone = async (id, monthIndex, dayIndex, isComplete) => {
    try {
      await updateHabit({ id, monthIndex, dayIndex, isComplete }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const breadCrumb = [
    {
      name: "Home",
      path: "/habits",
    },
    {
      name: habitData[0].habitName,
      path: `/habits/${id}`,
    },
  ];

  return (
    <div className="px-4 md:px-16 lg:px-32 pb-6 bg-gradient-to-b  dark:from-black from-[#e6e6e6] dark:via-[#000000] via-[#ffffff] dark:to-gray-800 to-[#d4e6f1]">
      <BreadCrumb breadCrumb={breadCrumb} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {/* {habitData[0].getFullYear.map((data) => ( */}
        <table
          key={habitData[0].getFullYear[currentMonthIndex]._id}
          className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg shadow"
        >
          <thead className="text-xl ">
            <tr className="flex justify-between py-6 px-3 text-blue-600 dark:text-indigo-300">
              <td>{habitData[0].getFullYear[currentMonthIndex].year}</td>
              <td>{habitData[0].getFullYear[currentMonthIndex].month}</td>
            </tr>
          </thead>
          <tbody className="grid grid-cols-7 place-items-center gap-y-3">
            {daysOfWeek.map((day) => (
              <tr key={day}>
                <td>{day}</td>
              </tr>
            ))}
            {Array.from({ length: startingDayIndex - 1 }).map((_, index) => (
              <tr key={`Empty${index}`} />
            ))}
            {habitData[0].getFullYear[currentMonthIndex].days.map((day) => (
              <tr key={day.day} className="px-3 text-slate-900 dark:text-white">
                <td
                  onClick={() => {
                    handleDone(
                      habitData[0]._id,
                      habitData[0].getFullYear[currentMonthIndex]._id,
                      day._id,
                      day.isComplete
                    );
                  }}
                  className={cn(
                    "w-8 text-center",

                    day.isComplete
                      ? " bg-[#1f39a0] rounded-[100%] text-white"
                      : "bg-none",
                    currentDay == day.day && "text-yellow-300"
                  )}
                >
                  {day.day}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* ))} */}
      </div>
    </div>
  );
};

export default HabitCalendar;
