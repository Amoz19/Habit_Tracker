import AddNewHabit from "./AddNewHabit";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCustomQuery from "../hook/useCustomQuery";
import withApiFunctions from "../hoc/withApiFunctions";
import Loading from "./Loading";
import { useUser } from "../context/AuthContext";

const CalendarList = ({ apiFunctions }) => {
  const { user } = useUser();
  const { isError, isLoading, data, refetch } = useCustomQuery(
    apiFunctions.getAll.key,
    () => apiFunctions.getAll.func(user.id)
  );

  if (!user) {
    return <Navigate to="/auth" />;
  }

  const navigator = useNavigate();

  const handleClick = (id) => {
    navigator(`/habits/${id}`);
  };

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
          {/* grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-5 */}
          <div className=" w-full">
            <h2 className="text-[#0D20EE] text-2xl font-black mt-2">
              Your habits
            </h2>
            <div className="grid lg:grid-cols-2">
              {data.map((data) => (
                <div
                  key={data._id}
                  className="w-full max-w-xs px-6 py-2 bg-white text-slate-800 flex justify-between  mt-6 rounded shadow text-sm"
                >
                  <h3 onClick={() => handleClick(data._id)}>
                    {data.habitName}
                  </h3>
                  <button className="bg-[#e74c3c] text-white px-3 rounded-sm">
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="flex flex-1 justify-center items-center">Add new</h1>
      )}
      <AddNewHabit />
    </>
  );
};

const EnhancedCalendarList = withApiFunctions(CalendarList);

export default EnhancedCalendarList;
