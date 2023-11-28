import { useState, useEffect } from "react";
import axios from "axios";
import generateCalendar from "../services/data";

const AddNewHabit = ({ handleSetData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [habitName, setHabitName] = useState("");

  const getCalendar = generateCalendar();

  function handleOpen() {
    setIsOpen(true);
  }

  function handleChange(e) {
    setHabitName(e.target.value);
  }

  async function handleClick() {
    setIsOpen(false);
    setHabitName("");

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL, {
        habitName: habitName,
      });
      handleSetData(response._id, habitName, getCalendar);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className="fixed top-4 right-6">
      <p
        onClick={handleOpen}
        className={`${
          isOpen ? "hidden" : "flex"
        } bg-green-400 px-6 py-2 rounded-full`}
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
    </div>
  );
};

export default AddNewHabit;
