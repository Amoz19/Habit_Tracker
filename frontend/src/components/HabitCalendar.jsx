import { Suspense } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import EnhancedCalendar from "./Calendar";

const HabitCalendar = () => {
  const { id } = useParams();

  return (
    <Suspense fallback={<Loading />}>
      <EnhancedCalendar id={id} />
    </Suspense>
  );
};

export default HabitCalendar;
