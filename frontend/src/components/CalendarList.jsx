import AddNewHabit from "./AddNewHabit";
import { Navigate, useNavigate } from "react-router-dom";
import useCustomQuery from "../hook/useCustomQuery";
import withApiFunctions from "../hoc/withApiFunctions";
import Loading from "./Loading";
import { useUser } from "../context/AuthContext";
import { useDeleteHabit } from "../hook/useHabitDataById";
import { memo } from "react";

const CalendarList = memo(({ apiFunctions }) => {
  const { user } = useUser();

  const { isError, isLoading, data, isRefetching } = useCustomQuery(
    apiFunctions.getAll.key,
    () => apiFunctions.getAll.func(user.id)
  );

  const { mutate } = useDeleteHabit();

  const handleDelete = (id) => {
    mutate(id);
  };

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const navigator = useNavigate();

  const handleClick = (id) => {
    navigator(`/habits/${id}`);
  };

  // if (isRefetching) {
  //   return <Loading />;
  // }
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p>Something went Wrong {isError.message}</p>;
  }

  return (
    <>
      {data.length > 0 ? (
        <div className="px-8 md:px-32 bg-[#2c3e50] flex flex-1 ">
          <div className=" w-full">
            <h2 className="text-indigo-500 text-2xl font-black mt-2">
              Your habits
            </h2>
            <div className="grid lg:grid-cols-2">
              {data.map((data) => (
                <div
                  key={data.uniqueId}
                  className={`${
                    isLoading && opacity - 60
                  } w-full max-w-xs px-6 py-2 bg-white text-slate-800 flex justify-between items-center mt-6 rounded shadow text-sm`}
                >
                  <h3
                    onClick={() => handleClick(data.uniqueId)}
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
        </div>
      ) : (
        <div className="flex flex-col flex-1 justify-center items-center bg-[#2c3e50]">
          <RocketIcon className="text-indigo-500 font-extrabold w-12 h-12 mb-3" />
          <h1 className="  text-indigo-300 text-xl text-center">
            No habits? Build your habits.
          </h1>
        </div>
      )}
      <AddNewHabit />
    </>
  );
});

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

const EnhancedCalendarList = withApiFunctions(CalendarList);

export default EnhancedCalendarList;
