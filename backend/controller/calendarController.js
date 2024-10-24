const CalendarModel = require("../models/CalendarModel");
const { format, getDate } = require("date-fns");
const generateCalendar = require("../src/data");
const { v4: uuidv4 } = require("uuid");

const date = new Date();
const currentDay = getDate(date);
const getCurrentMonthName = format(date, "MMMM");

const addFullYear = async (req, res) => {
  const { userId, habitName, uniqueId } = req.body;
  const getFullYear = generateCalendar();

  const postFullYear = {
    uniqueId,
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
  const { _id } = req.user;
  try {
    const result = await CalendarModel.find({ userId: _id });

    if (!result) {
      return res.status(404).json({ message: "No habit found for the user" });
    }

    const habitStatuses = result.map((data) => {
      const currentMonthData = data.getFullYear.find(
        (month) => month.month === getCurrentMonthName
      );
      const currentDayData = currentMonthData.days.find(
        (day) => day.day == currentDay
      );
      return {
        uniqueId: data.uniqueId,
        habitName: data.habitName,
        uniqueId: data.uniqueId,
        isComplete: currentDayData.isComplete, // Found the isComplete status
      };
    });

    // console.log(habitStatuses);

    // const currentMonthData = result.map((data) => {
    //   return {
    //     _id: data._id,
    //     uniqueId: data.uniqueId,
    //     habitName: data.habitName,
    //     month: data.getFullYear.find(
    //       (month) => month.month === getCurrentMonthName
    //     ),
    //   };
    // });

    // if (!currentMonthData) {
    //   return res
    //     .status(404)
    //     .json({ message: "No data found for the current month" });
    // }

    // console.log(currentMonthData);

    // const currentDayData = currentMonthData.map((data) =>
    //   data.month.days.filter((day) => day.day == currentDay)
    // );

    // if (!currentDayData) {
    //   return res
    //     .status(404)
    //     .json({ message: "No data found for the current day" });
    // }
    // console.log(currentDayData);

    // res.status(200).json({
    //   habitName,
    //   uniqueId,
    //   isComplete,
    // });
    res.status(200).json(habitStatuses);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getFullYearById = async (req, res) => {
  try {
    const fullYear = await CalendarModel.findOne({
      uniqueId: req.params.id,
    });
    res.status(200).json(fullYear);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateComplete = async (req, res) => {
  const { id, monthIndex, dayIndex, isComplete } = req.body;

  const toggleComplete = !isComplete;

  if (!monthIndex || !dayIndex) {
    if (isComplete) {
      return res.status(400).json({
        message: "You cannot mark the habit as incomplete once it is complete.",
      });
    }
  }

  try {
    const updateData = await CalendarModel.updateOne(
      {
        uniqueId: id,
      },
      {
        $set: {
          "getFullYear.$[month].days.$[day].isComplete": toggleComplete,
        },
      },
      {
        arrayFilters:
          monthIndex || dayIndex
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
                  "month.month": getCurrentMonthName,
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
