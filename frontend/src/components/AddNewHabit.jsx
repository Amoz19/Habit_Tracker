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
        } bg-white px-6 py-2 rounded-full`}
      >
        +
      </p>
      <div className={`${isOpen ? "flex" : "hidden"}`}>
        <input
          type="text"
          placeholder="Enter habit"
          className="border border-blue-300 focus:outline-none focus:border-blue-500 px-3 py-0.5 rounded"
          value={habitName}
          onChange={handleChange}
        />
        <div className="flex">
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-3 py-1 rounded mx-3"
          >
            add
          </button>
          <button
            onClick={handleClose}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewHabit;
