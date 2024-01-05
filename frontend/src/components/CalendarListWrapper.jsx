import { Suspense } from "react";
import AddNewHabit from "./AddNewHabit";
import CalendarListLoadingSkeleton from "./CalendarListLoadingSkeleton";
import EnhancedCalendarList from "./CalendarList";

const CalendarListWrapper = () => {
  return (
    <>
      <Suspense fallback={<CalendarListLoadingSkeleton />}>
        <EnhancedCalendarList />
      </Suspense>

      <AddNewHabit />
    </>
  );
};

export default CalendarListWrapper;
