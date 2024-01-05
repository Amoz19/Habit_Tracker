import { Suspense } from "react";
import AddNewHabit from "./AddNewHabit";
import CalendarListLoadingSkeleton from "./CalendarListLoadingSkeleton";
import EnhancedCalendarList from "./CalendarList";

const CalendarListWrapper = () => {
  return (
    <>
      <EnhancedCalendarList />
      <AddNewHabit />
    </>
  );
};

export default CalendarListWrapper;
