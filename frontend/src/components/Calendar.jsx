import { useParams } from "react-router-dom";
const Calendar = () => {
  const { id } = useParams();
  // const generateFullYear = JSON.stringify(generateCalendar());

  // console.log(generateFullYear);
  //   const handleDayClick = (inputDateYear, inputDateMonth, inputDateDay) => {
  //     setCalendarData((prev) => {
  //       // when click find year and month  eg: year:2023  , month:jan
  //       const matchingYearAndMonthIndex = prev.findIndex(
  //         (date) => date.year === inputDateYear && date.month === inputDateMonth
  //       );

  //       if (matchingYearAndMonthIndex === -1) {
  //         return prev;
  //       }

  //       // when click find all days  eg: 1,2,3....,30
  //       const matchingDayIndex = prev[matchingYearAndMonthIndex].days.findIndex(
  //         (date) => date.day === inputDateDay
  //       );

  //       if (matchingDayIndex === -1) {
  //         return prev;
  //       }

  //       //copy original array, we don't directly update them
  //       const prevCopy = [...prev];

  //       //copy matched selected year and month - this is all days included
  //       const yearAndMonthCopy = { ...prev[matchingYearAndMonthIndex] };

  //       //copy days
  //       const daysCopy = [...yearAndMonthCopy.days];

  //       //modify from copied day
  //       daysCopy[matchingDayIndex].isComplete = true;

  //       //re assign  day value to copied year and month
  //       yearAndMonthCopy.days = daysCopy;

  //       // re assign to modified value to copied from original array
  //       prevCopy[matchingYearAndMonthIndex] = yearAndMonthCopy;

  //       return prevCopy;
  //     });
  //   };

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
    <h1>{id}</h1>
  );
};

export default Calendar;
