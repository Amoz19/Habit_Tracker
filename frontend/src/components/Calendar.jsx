import { useParams } from "react-router-dom";
import { useUpdateHabit } from "../hook/useHabitDataById";
import BreadCrumb from "./BreadCrumb";
import useCustomQuery from "../hook/useCustomQuery";
import withApiFunctions from "../hoc/withApiFunctions";
import Loading from "./Loading";
import NotFound from "./NotFound";

const Calendar = ({ apiFunctions }) => {
  const { id } = useParams();
  const {
    isLoading,
    data: calendaData,
    error,
  } = useCustomQuery(apiFunctions.get.key(id), () => apiFunctions.get.func(id));
  const { mutate: upateDay } = useUpdateHabit(id);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  const handleDone = (id, monthIndex, dayIndex) => {
    upateDay({ id, monthIndex, dayIndex });
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
    <div className="px-4 md:px-16 lg:px-32 pb-6">
      <BreadCrumb breadCrumb={breadCrumb} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {calendaData[0].getFullYear.map((data) => (
          <table key={data._id} className="bg-blue-100 p-6 rounded">
            <thead className="text-xl ">
              <tr className="flex justify-between py-6 px-3 text-slate-700">
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

const EnhancedCalendar = withApiFunctions(Calendar);

export default EnhancedCalendar;
