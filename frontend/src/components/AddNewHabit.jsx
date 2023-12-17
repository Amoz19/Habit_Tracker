import { useState, useEffect } from "react";
import generateCalendar from "../services/data";
import { addHabitData } from "../hook/useHabitData";
import { useUser } from "../context/AuthContext";

const AddNewHabit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const { mutate: addNewHabit } = addHabitData();
  const { user } = useUser();

  const getFullYear = generateCalendar();

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleChange(e) {
    setHabitName(e.target.value);
  }

  function handleClick() {
    setIsOpen(false);
    setHabitName("");

    addNewHabit({
      userId: user.id,
      habitName,
      getFullYear,
    });
  }

  return (
    <div className="fixed bottom-12 right-6">
      <p
        onClick={handleOpen}
        className={`${
          isOpen ? "hidden" : "flex"
        } bg-white px-6 py-2 rounded-full shadow`}
      >
        +
      </p>
      <div
        className={`${
          isOpen
            ? "fixed inset-0 bg-gray-100/40 flex justify-center items-center"
            : "hidden"
        }`}
      >
        <input
          type="text"
          placeholder="Enter habit"
          className="w-fit border border-gray-300 focus:outline-none focus:border-gray-300 px-3 py-0.5 rounded"
          value={habitName}
          onChange={handleChange}
        />
        <div className="flex">
          <button
            onClick={handleClick}
            className="border border-gray-300 bg-indigo-500 text-white px-3 py-1 rounded mx-3"
          >
            add
          </button>
          <button
            onClick={handleClose}
            className="border border-gray-300 text-red-500 px-3 py-1 rounded"
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewHabit;
