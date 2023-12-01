import { useParams } from "react-router-dom";
import { useHabitDataById, useUpdateHabit } from "../hook/useHabitDataById";
import BreadCrumb from "./BreadCrumb";

const Calendar = () => {
  const { id } = useParams();
  const { isLoading, data: calendaData } = useHabitDataById(id);
  // console.log(calendaData);
  const { mutate: upateDay } = useUpdateHabit();
  if (isLoading) {
    return <p>loading......</p>;
  }

  const handleDone = (id, monthIndex, dayIndex) => {
    upateDay({ id, monthIndex, dayIndex });
  };

  const breadCrumb = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: calendaData[0].habitName,
      path: `/${id}`,
    },
  ];

  return (
    <div className="px-32">
      <BreadCrumb breadCrumb={breadCrumb} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {calendaData[0].getFullYear.map((data) => (
          <table key={data._id} className="bg-blue-100 w-fit p-6">
            <thead className="text-xl ">
              <tr className="flex justify-between py-6 px-3">
                <td>{data.year}</td>
                <td>{data.month}</td>
              </tr>
            </thead>
            <tbody className="grid grid-cols-5 place-items-center gap-y-3">
              {data.days.map((day) => (
                <tr key={day.day} className="px-3 text-slate-900">
                  <td
                    onClick={() => {
                      handleDone(calendaData[0]._id, data._id, day._id);
                    }}
                    className={`${
                      day.isComplete
                        ? "bg-green-400  rounded-[100%]"
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

export default Calendar;
