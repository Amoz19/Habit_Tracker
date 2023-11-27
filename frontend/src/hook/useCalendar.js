import { useContext } from "react";
import { CalendarDataContext } from "../context/CalendarData";

const useData = () => {
  const context = useContext(CalendarDataContext);
  if (!context) {
    throw new Error("Empty Context");
  }
  return context;
};

export const useCalendarData = () => {
  const { calendarData } = useData();
  return { calendarData };
};

export const usehandleAddNewData = () => {
  const { handleAddNewData } = useData();
  return { handleAddNewData };
};

export const useHandleFetchData = () => {
  const { handleFetchData } = useData();
  return { handleFetchData };
};

export const useHandleDone = () => {
  const { handleDone } = useData();
  return { handleDone };
};
