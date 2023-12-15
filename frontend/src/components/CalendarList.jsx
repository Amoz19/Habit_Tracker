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
        <div className="px-8 md:px-32 bg-zinc-900 flex flex-1">
          {isLoading && <h1>Adding</h1>}
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 justify-start h-auto">
              {data.map((data) => (
                <div
                  key={data._id}
                  className="bg-slate-900 w-32 flex justify-center items-center h-32 mr-6 my-3 rounded text-white/80"
                  onClick={() => handleClick(data._id)}
                >
                  <h3>{data.habitName}</h3>
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
