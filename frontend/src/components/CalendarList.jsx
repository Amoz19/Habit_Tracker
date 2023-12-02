import AddNewHabit from "./AddNewHabit";
import { useNavigate } from "react-router-dom";

import { useCustomQuery } from "../hook/useCustomQuery";
import withApiFunctions from "../hoc/withApiFunctions";
import { habitApiFunctions } from "../services/apis/habits";

const CalendarList = ({ habitApiFunctions }) => {
  const { isError, isLoading, data } = useCustomQuery(
    () => habitApiFunctions.getAll.func(),
    habitApiFunctions.getAll.key
  );

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
