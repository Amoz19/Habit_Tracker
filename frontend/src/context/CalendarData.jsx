import { createContext, useContext, useState } from "react";

export const CalendarDataContext = createContext({
  calendarData: [],
  setCalendarData: () => {},
  handleFetchData: () => {},
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

  const value = { calendarData, handleAddNewData, handleFetchData };

  return (
    <CalendarDataContext.Provider value={value}>
      {children}
    </CalendarDataContext.Provider>
  );
}
