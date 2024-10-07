import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
// import useAuthContext from "../hook/useAuthContext";
import { useAddNewHabit } from "../hook/useAddNewHabit";
import generateCalendar from "../services/createCalendar";
import { useAddNewHabitMutation } from "../features/habits/habit.api";
import { useAppSelector } from "../app/hook";

const AddNewHabit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  console.log("Id", token.userId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [addNewHabit] = useAddNewHabitMutation();
  // const { mutate: addNewHabit } = useAddNewHabit();
  // const { user } = useAuthContext();

  const getFullYear = generateCalendar();

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  function onHandleSubmit(data, e) {
    e.preventDefault();

    addNewHabit({
      uniqueId: uuidv4(),
      userId: token.userId,
      habitName: data.habitName,
      getFullYear,
    });

    reset({
      habitName: "",
    });
    setIsOpen(false);
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
            ? "fixed inset-0 bg-gradient-to-b  dark:from-black from-[#e6e6e6] dark:via-[#000000] via-[#ffffff] dark:to-gray-800 to-[#d4e6f1] flex justify-center items-center"
            : "hidden"
        }`}
      >
        <form
          className="  p-6 rounded-lg shadow-xl max-w-sm w-full bg-slate-100"
          onSubmit={handleSubmit(onHandleSubmit)}
        >
          <h3 className="text-indigo-900  font-bold text-xl">Add new Habits</h3>
          <div className="my-4 text-sm ">
            <label className=" text-indigo-900" htmlFor="newhabit">
              Habit Name
            </label>
            <input
              type="text"
              {...register("habitName", { required: true })}
              placeholder="Enter habit"
              className="w-full border border-gray-300 focus:outline-none focus:border-gray-300 px-3 py-0.5  my-2"
              id="newhabit"
            />
            {errors.habitName && (
              <p className="text-red-500">Enter Something</p>
            )}
          </div>

          <div className="flex justify-end text-sm">
            <input
              type="submit"
              className="  bg-indigo-500 text-white  px-3 py-1 rounded-md mx-3"
              value="Add"
            />

            <input
              type="reset"
              onClick={handleClose}
              className=" bg-red-500 text-white px-3 py-1 rounded-md"
              value="Cancel"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewHabit;
