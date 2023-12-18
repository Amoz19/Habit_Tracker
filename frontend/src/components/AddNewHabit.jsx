import { useState, useEffect } from "react";
import generateCalendar from "../services/data";
import { addHabitData } from "../hook/useHabitData";
import { useUser } from "../context/AuthContext";
import { useForm } from "react-hook-form";

const AddNewHabit = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [habitName, setHabitName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate: addNewHabit } = addHabitData();
  const { user } = useUser();

  const getFullYear = generateCalendar();

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onHandleSubmit(data, e) {
    e.preventDefault();
    setIsOpen(false);
    setHabitName("");

    addNewHabit({
      userId: user.id,
      data,
      getFullYear,
    });
  }

  return (
    <form className="fixed bottom-12 right-6">
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
            ? "fixed inset-0 bg-gray-900 flex justify-center items-center"
            : "hidden"
        }`}
      >
        <div
          className=" bg-[#2D2D2D] p-6 rounded-lg shadow-xl max-w-sm w-full"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <h3 className="text-white font-bold">Add new Habits</h3>
          <div className="my-4 text-sm ">
            <label className=" text-white" htmlFor="newhabit">
              Habit Name
            </label>
            <input
              type="text"
              {...register("habitName", { required: true })}
              placeholder="Enter habit"
              className="w-full border border-gray-300 focus:outline-none focus:border-gray-300 px-3 py-0.5 rounded mt-2"
              // value={habitName}
              id="newhabit"
              required
            />
          </div>

          <div className="flex justify-end text-sm">
            <input
              type="submit"
              className="border border-gray-300 bg-indigo-500 text-white  px-3 py-1 rounded mx-3"
              value="Add"
            />

            <button
              onClick={handleClose}
              className="border border-gray-300 bg-red-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddNewHabit;
