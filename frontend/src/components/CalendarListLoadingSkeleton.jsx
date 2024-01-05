import styles from "../style/CalendarList.module.css";
function CalendarListLoadingSkeleton() {
  return (
    <div
      className="flex flex-1  px-8
      md:px-32 flex-col"
    >
      <h2 className={`${styles.title} dark:text-indigo-300`}>Your habits</h2>
      <div
        className=" w-full
      max-w-xs
      h-11
     px-6
      py-2
      bg-white
      text-blue-800
      dark:text-slate-900
      flex
      justify-between
      items-center
      mt-6
      rounded
      shadow
      text-l
      relative
       
      "
      >
        <div className="absolute w-64 h-6 bg-gray-100 rounded animate-pulse space-x-4"></div>
      </div>
    </div>
  );
}

export default CalendarListLoadingSkeleton;
