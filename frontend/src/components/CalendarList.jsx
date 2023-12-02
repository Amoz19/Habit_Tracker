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
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
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
        <div className="px-8 md:px-32 bg-zinc-900 flex flex-1">
          {isLoading && <h1>Loading</h1>}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-start h-auto">
              {data.map((data) => (
                <div
                  key={data.uniqueId}
                  className="bg-slate-900 w-32 flex justify-center items-center h-32 mr-6 my-3 rounded text-white/80"
                  onClick={() => handleClick(data._id)}
                >
                  <h3>{data.habitName}</h3>
                </div>
              ))}
            </div>
          </div>

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
