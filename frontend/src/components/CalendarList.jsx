import { useEffect } from "react";
import axios from "axios";
import AddNewHabit from "./AddNewHabit";
import {
  useCalendarData,
  useHandleFetchData,
  usehandleAddNewData,
} from "../hook/useCalendar";
import { useNavigate } from "react-router-dom";
import { useHabitData } from "../hook/useHabitData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addHabitData } from "../hook/useHabitData";

const CalendarList = () => {
  const { isError, isLoading, data } = useHabitData();
  const { isLoading: mutatationLoading } = addHabitData();

  const navigator = useNavigate();

  const handleClick = (id) => {
    navigator(`/${id}`);
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Something went Wrong {isError.message}</p>;
  }

  return (
    <>
      {data.length > 0 ? (
        <div className="px-32 flex flex-1 flex-wrap">
          {isLoading && <h1>Loading</h1>}
          {data.map((data) => (
            <div
              key={data.uniqueId}
              className="bg-blue-300 w-32 h-32 flex justify-center items-center mr-6 rounded text-slate-800"
              onClick={() => handleClick(data._id)}
            >
              <h3>{data.habitName}</h3>
            </div>
          ))}
          {mutatationLoading ? <p>Loading....</p> : null}

          {/* <ToastContainer position="top-center" theme="dark" /> */}
          {/* <AddNewHabit handleSetData={handleSetData} /> */}
        </div>
      ) : (
        <h1 className="flex flex-1 justify-center items-center">Add new</h1>
      )}
      <AddNewHabit />
    </>
  );
};

export default CalendarList;
