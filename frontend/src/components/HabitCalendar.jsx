import { useParams } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { useHabitCalendar } from "../hook/useHabitCalendar";
import useAuthContext from "../hook/useAuthContext";
import { useUpdateHabit } from "../hook/useUpdateHabit";

const HabitCalendar = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const {
    isLoading,
    data: calendaData,
    error,
  } = useHabitCalendar(id, user?.token);

  const { mutate: upateDay } = useUpdateHabit(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  const handleDone = (id, monthIndex, dayIndex, isComplete, token) => {
    upateDay({ id, monthIndex, dayIndex, isComplete, token });
  };

  const breadCrumb = [
    {
      name: "Home",
      path: "/habits",
    },
    {
      name: calendaData[0].habitName,
      path: `/habits/${id}`,
    },
  ];

  return (
    <div className="px-4 md:px-16 lg:px-32 pb-6 bg-gradient-to-b  dark:from-black from-[#e6e6e6] dark:via-[#000000] via-[#ffffff] dark:to-gray-800 to-[#d4e6f1]">
      <BreadCrumb breadCrumb={breadCrumb} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {calendaData[0].getFullYear.map((data) => (
          <table
            key={data._id}
            className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg shadow"
          >
            <thead className="text-xl ">
              <tr className="flex justify-between py-6 px-3 text-blue-600 dark:text-indigo-300">
                <td>{data.year}</td>
                <td>{data.month}</td>
              </tr>
            </thead>
            <tbody className="grid grid-cols-5 place-items-center gap-y-3">
              {data.days.map((day) => (
                <tr
                  key={day.day}
                  className="px-3 text-slate-900 dark:text-white"
                >
                  <td
                    onClick={() => {
                      handleDone(
                        calendaData[0]._id,
                        data._id,
                        day._id,
                        day.isComplete,
                        user?.token
                      );
                    }}
                    className={`${
                      day.isComplete
                        ? " bg-[#1f39a0] rounded-[100%] text-white"
                        : "bg-none"
                    } w-8 text-center`}
                  >
                    {day.day}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default HabitCalendar;
