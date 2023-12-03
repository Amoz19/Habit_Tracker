import { useState } from "react";
import generateCalendar from "../services/data";
import { addHabitData } from "../hook/useHabitData";
import { v4 as uuidv4 } from "uuid";

const AddNewHabit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const { isLoading, mutate: addNewHabit } = addHabitData();

  const getFullYear = generateCalendar();

  function handleOpen() {
    setIsOpen(true);
  }

  function handleChange(e) {
    setHabitName(e.target.value);
  }

  async function handleClick() {
    setIsOpen(false);
    setHabitName("");

    addNewHabit({
      uniqueId: uuidv4(),
      habitName,
      getFullYear,
    });
  }

  return (
    <div className="fixed top-4 right-6">
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
        <button
          onClick={handleClick}
          className="bg-blue-500 text-white px-3 py-1 rounded mx-3"
        >
          add
        </button>
      </div>
      <p>{isLoading && <span>Please Wait</span>}</p>
    </div>
  );
};

export default AddNewHabit;
