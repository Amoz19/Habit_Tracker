const CalendarModel = require("../models/CalendarModel");

const addFullYear = async (req, res) => {
  const { userId, habitName, getFullYear } = req.body;
  const postFullYear = {
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
  const { userId } = req.body;
  try {
    const fullYear = await CalendarModel.find({ userId });
    res.status(200).json(fullYear);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getFullYearById = async (req, res) => {
  try {
    const fullYear = await CalendarModel.find({ _id: req.params.groupId });
    res.status(200).json(fullYear);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateComplete = async (req, res) => {
  const { id, monthIndex, dayIndex } = req.body;

  try {
    const updateData = await CalendarModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          "getFullYear.$[month].days.$[day].isComplete": true,
        },
      },
      {
        arrayFilters: [
          {
            "month._id": monthIndex,
          },
          {
            "day._id": dayIndex,
          },
        ],
      }
    );
    res.status(200).json({ _id: updateData._id });
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { addFullYear, getFullYear, getFullYearById, updateComplete };
