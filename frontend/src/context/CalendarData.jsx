import { createContext, useContext, useEffect, useState } from "react";

export const CalendarDataContext = createContext({
  calendarData: [],
  setCalendarData: () => {},
  handleFetchData: () => {},
  handleDone: () => {},
});

export default function CalendarDataContextProvider({ children }) {
  const [calendarData, setCalendarData] = useState([]);

  const handleFetchData = (data) => {
    setCalendarData(data);
  };

  const handleAddNewData = (habitName, getFullYear) => {
    setCalendarData((prev) => {
      return [...prev, { habitName: habitName, getFullYear: getFullYear }];
    });
  };

  const handleDone = (id, inputDateYear, inputDateMonth, inputDateDay) => {
    setCalendarData((prev) => {
      const matchingIndex = prev.findIndex((date) => date._id === id);

      if (matchingIndex === -1) {
        return prev;
      }

      // when click find year and month  eg: year:2023  , month:jan
      const matchingYearAndMonthIndex = prev[
        matchingIndex
      ].getFullYear.findIndex((date) => {
        return date.year === inputDateYear && date.month === inputDateMonth;
      });

      if (matchingYearAndMonthIndex === -1) {
        return prev;
      }

      // // when click find all days  eg: 1,2,3....,30
      const matchingDayIndex = prev[matchingIndex].getFullYear[
        matchingYearAndMonthIndex
      ].days.findIndex((date) => date.day === inputDateDay);

      if (matchingDayIndex === -1) {
        return prev;
      }

      //copy original array, we don't directly update them
      const prevCopy = [...prev];

      // //copy matched selected year and month - this is all days included
      const yearAndMonthCopy = {
        ...prev[matchingIndex].getFullYear[matchingYearAndMonthIndex],
      };

      // //copy days
      const daysCopy = [...yearAndMonthCopy.days];

      // //modify from copied day
      daysCopy[matchingDayIndex].isComplete = true;
      // //re assign  day value to copied year and month
      yearAndMonthCopy.days = daysCopy;
      // // re assign to modified value to copied from original array
      prevCopy[matchingIndex].getFullYear[matchingYearAndMonthIndex] =
        yearAndMonthCopy;
      return prevCopy;
    });
  };

  const value = { calendarData, handleAddNewData, handleFetchData, handleDone };

  return (
    <CalendarDataContext.Provider value={value}>
      {children}
    </CalendarDataContext.Provider>
  );
}
