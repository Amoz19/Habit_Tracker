import { format, getDate, getDay, getMonth, startOfMonth } from "date-fns";

const useDate = () => {
  const date = new Date();
  const currentMonthIndex = getMonth(date);
  const currentDay = getDate(date);
  const startDayOfMonth = startOfMonth(date);
  const startingDayIndex = getDay(startDayOfMonth);
  const getCurrentMonthName = format(date, "MMMM");

  return {
    currentMonthIndex,
    currentDay,
    startingDayIndex,
    getCurrentMonthName,
  };
};

export default useDate;
