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

const CalendarList = () => {
  const { isError, isLoading, data } = useHabitData();
  // console.log(isLoading, data);
  const navigator = useNavigate();
<<<<<<< HEAD
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
=======
  // const { calendarData } = useCalendarData();
  // const { handleAddNewData } = usehandleAddNewData();
  // const { handleFetchData } = useHandleFetchData();

  // useEffect(() => {
  //   axios
  //     .get(import.meta.env.VITE_API_URL)
  //     .then(({ data }) => {
  //       handleFetchData(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // const handleSetData = (habitName, getFullYear) => {
  //   handleAddNewData(habitName, getFullYear);
  // };
>>>>>>> implementFetchingWithReactQuery

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
<<<<<<< HEAD
    <div className="px-32 flex flex-1 flex-wrap">
      <>
        {calendarData.map((data) => (
          <div
            key={data._id}
            className="bg-blue-300 w-32 h-32 flex justify-center items-center mx-6 rounded text-slate-800"
            onClick={() => handleClick(data._id)}
          >
            <h3>{data.habitName}</h3>
          </div>
        ))}
        <AddNewHabit handleSetData={handleSetData} />
      </>
    </div>
=======
    <>
      {data.length > 0 ? (
        <div className="px-32 flex flex-1 flex-wrap">
          {isLoading && <h1>Loading</h1>}
          {data.map((data) => (
            <div
              key={data.uniqueId}
              className="bg-blue-300 w-32 h-32 flex justify-center items-center mx-6 rounded text-slate-800"
              onClick={() => handleClick(data._id)}
            >
              <h3>{data.habitName}</h3>
            </div>
          ))}

          {/* <ToastContainer position="top-center" theme="dark" /> */}
          {/* <AddNewHabit handleSetData={handleSetData} /> */}
        </div>
      ) : (
        <h1 className="flex flex-1 justify-center items-center">Add new</h1>
      )}
      <AddNewHabit />
    </>
>>>>>>> implementFetchingWithReactQuery
  );
};

export default CalendarList;
