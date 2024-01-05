import { Suspense } from "react";
import Loading from "./Loading";
import EnhancedCalendarList from "./CalendarList";
import { useUser } from "../context/AuthContext";
import CalendarListWrapper from "./CalendarListWrapper";

const HabitsList = () => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <CalendarListWrapper />
    </Suspense>
  );
};

export default HabitsList;
