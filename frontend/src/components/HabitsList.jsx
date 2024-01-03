import { Suspense } from "react";
import Loading from "./Loading";
import EnhancedCalendarList from "./CalendarList";
import { useUser } from "../context/AuthContext";

const HabitsList = () => {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <EnhancedCalendarList user={user} />
    </Suspense>
  );
};

export default HabitsList;
