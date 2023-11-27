import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddNewHabit from "./AddNewHabit";
import {
  useCalendarData,
  useHandleFetchData,
  usehandleAddNewData,
} from "../hook/useCalendar";

const CalendarList = () => {
  const { calendarData } = useCalendarData();
  const { handleAddNewData } = usehandleAddNewData();
  const { handleFetchData } = useHandleFetchData();

  console.log(calendarData);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL)
      .then(({ data }) => {
        handleFetchData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSetData = (habitName, getFullYear) => {
    handleAddNewData(habitName, getFullYear);
  };

  return (
    <div className="px-32 flex flex-1 flex-wrap">
      <>
        {calendarData.map((data) => (
          <div
            key={data.habitName}
            className="bg-blue-300 w-32 h-32 flex justify-center items-center mx-6 rounded text-slate-800"
          >
            <h3>{data.habitName}</h3>
          </div>
        ))}
        <AddNewHabit handleSetData={handleSetData} />
      </>
    </div>
  );
};

export default CalendarList;
