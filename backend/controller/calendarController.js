const CalendarModel = require("../models/CalendarModel");
const { format, getDate } = require("date-fns");
const generateCalendar = require("../src/data");
const { v4: uuidv4 } = require("uuid");

const addFullYear = async (req, res) => {
  const { userId, habitName } = req.body;
  const getFullYear = generateCalendar();

  const postFullYear = {
    uniqueId: uuidv4(),
    userId,
    habitName,
    getFullYear,
  };

  try {
    const savedCalendar = await CalendarModel.create(postFullYear);
    res.status(201).json(savedCalendar);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getFullYear = async (req, res) => {
  const date = new Date();
  const currentDay = getDate(date);
  const getCurrentMonthName = format(date, "MMMM");
  const { _id } = req.user;
  try {
    const result = await CalendarModel.find({ userId: _id });

    // if (!result) {
    //   return res.status(404).json({ message: "No habit found for the user" });
    // }

    // // Filter the current month and day in JavaScript
    // // const currentMonthData = result.getFullYear.find(
    // //   (month) => month.month === getCurrentMonthName
    // // );

    // const currentMonthData = result.map((data) =>
    //   data.getFullYear.find((month) => month.month === getCurrentMonthName)
    // );

    // if (!currentMonthData) {
    //   return res
    //     .status(404)
    //     .json({ message: "No data found for the current month" });
    // }

    // const currentDayData = currentMonthData.map((data) =>
    //   data.days.find((day) => day.day == currentDay)
    // );

    // if (!currentDayData) {
    //   return res
    //     .status(404)
    //     .json({ message: "No data found for the current day" });
    // }

    // res.status(200).json({
    //   habitName,
    //   uniqueId,
    //   isComplete,
    // });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getFullYearById = async (req, res) => {
  try {
    const fullYear = await CalendarModel.find({ _id: req.params.id });
    res.status(200).json(fullYear);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateComplete = async (req, res) => {
  const { id, monthIndex, dayIndex, currentMonth, currentDay, isComplete } =
    req.body;

  const toggleComplete = !isComplete;

  if (currentMonth || currentDay) {
    if (isComplete) {
      return res.status(400).json({
        message: "You cannot mark the habit as incomplete once it is complete.",
      });
    }
  }

  try {
    const updateData = await CalendarModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          "getFullYear.$[month].days.$[day].isComplete": toggleComplete,
        },
      },
      {
        arrayFilters:
          !currentMonth || !currentDay
            ? [
                {
                  "month._id": monthIndex,
                },
                {
                  "day._id": dayIndex,
                },
              ]
            : [
                {
                  "month.month": currentMonth,
                },
                {
                  "day.day": currentDay,
                },
              ],
      }
    );
    res
      .status(200)
      .json({ message: "Successfully updated", _id: updateData._id });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const deleteHabit = async (req, res) => {
  const { id } = req.params;
  try {
    await CalendarModel.findOneAndDelete({ uniqueId: id });
    res.json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  addFullYear,
  getFullYear,
  getFullYearById,
  updateComplete,
  deleteHabit,
};
