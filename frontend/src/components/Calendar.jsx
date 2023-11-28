import { useParams } from "react-router-dom";
import { useCalendarData, useHandleDone } from "../hook/useCalendar";
import axios from "axios";
const Calendar = () => {
  const { id } = useParams();
  const { calendarData } = useCalendarData();
  const { handleDone } = useHandleDone();

  // console.log(calendarData);

  const handleUpdate = (year, month, day) => {
    axios.patch(import.meta.env.VITE_API_URL, { year, month, day });
    // console.log(year, month, day);
  };

  // console.log(JSON.stringify(calendarData));

  // const handleDayClick = (inputDateYear, inputDateMonth, inputDateDay) => {

  // };

  const matchedData = calendarData.filter((data) => data._id === id);
  const [getFullYear] = matchedData;

  return (
    // <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 place-items-center">
    //   {calendarData.map((data) => (
    //     <table key={data.month} className="bg-slate-100 w-fit p-6">
    //       <thead className="text-xl ">
    //         <tr className="flex justify-between py-6 px-3">
    //           <td>{data.year}</td>
    //           <td>{data.month}</td>
    //         </tr>
    //       </thead>
    //       <tbody className="grid grid-cols-5 place-items-center gap-y-3">
    //         {data.days.map((day) => (
    //           <tr key={day.day} className="px-3">
    //             <td
    //               // onClick={() =>
    //               //   handleDayClick(data.year, data.month, day.day)
    //               // }
    //               className={`${
    //                 day.isComplete ? "bg-green-400  rounded-[100%]" : "bg-none"
    //               } w-8 text-center`}
    //             >
    //               {day.day}
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   ))}
    // </div>
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 place-items-center">
        {getFullYear.getFullYear.map((data) => (
          <table key={data._id} className="bg-slate-100 w-fit p-6">
            <thead className="text-xl ">
              <tr className="flex justify-between py-6 px-3">
                <td>{data.year}</td>
                <td>{data.month}</td>
              </tr>
            </thead>
            {/* {console.log(data.month, data.year)} */}
            <tbody className="grid grid-cols-5 place-items-center gap-y-3">
              {data.days.map((day) => (
                <tr key={day.day} className="px-3">
                  <td
                    // onClick={() =>
                    //   handleDayClick(data.year, data.month, day.day)
                    // }
                    onClick={() => {
                      // console.log("clicked");
                      handleDone(
                        getFullYear._id,
                        data.year,
                        data.month,
                        day.day
                      );
                      handleUpdate(getFullYear._id, data._id, day._id);
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
    </>
  );
};

export default Calendar;
