import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import styles from "../style/CalendarList.module.css";
import {
  useDeleteHabitMutation,
  useGetHabitsQuery,
} from "../features/habits/habit.api";
import { useEffect, useState } from "react";
import Progress from "./habits/WeeklyProgress";
import WeeklyProgress from "./habits/WeeklyProgress";

const HabitList = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetHabitsQuery();
  // console.log(data);
  // const { ids, entities } = data && data;
  // console.log(data.entities);

  const [deleteHabit] = useDeleteHabitMutation();

  const handleDelete = async (id) => {
    try {
      await deleteHabit(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const handleClick = (id) => {
    navigate(`/habits/${id}`);
  };

  // if (!user) {
  //   return <NotFound message="UnAnthorized" />;
  // }

  return (
    <>
      {data.length > 0 ? (
        <div className="px-8 md:px-32 bg-gradient-to-b  dark:from-black from-[#e6e6e6] dark:via-[#000000] via-[#ffffff] dark:to-gray-800 to-[#d4e6f1] flex flex-1 ">
          <div className=" w-full">
            <h2 className={`${styles.title} dark:text-indigo-300`}>
              Your habits
            </h2>
            <div className="grid lg:grid-cols-2">
              {data.map((data) => (
                <div
                  key={data.uniqueId}
                  className="w-full max-w-xs px-6 py-2 bg-white text-blue-800 dark:text-slate-900  flex justify-between items-center mt-6 rounded shadow text-l"
                >
                  <h3
                    onClick={() => handleClick(data._id)}
                    className="cursor-pointer"
                  >
                    {data.habitName}
                  </h3>
                  <p
                    onClick={() => handleDelete(data.uniqueId)}
                    className="text-xl text-red-700 cursor-pointer"
                  >
                    x
                  </p>
                </div>
              ))}
            </div>
          </div>
          <WeeklyProgress />
        </div>
      ) : (
        <div className="flex flex-col flex-1 justify-center items-center bg-gradient-to-b  dark:from-black from-[#e6e6e6] dark:via-[#000000] via-[#ffffff] dark:to-gray-800 to-[#d4e6f1]">
          <RocketIcon className="text-indigo-800 dark:text-white font-extrabold w-12 h-12 mb-3" />
          <h1 className="  text-indigo-700 dark:text-gray-400 text-xl text-center">
            No habits? Build your habits.
          </h1>
        </div>
      )}
    </>
  );
};

function RocketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

// const EnhancedCalendarList = withApiFunctions(CalendarList);
export default HabitList;
