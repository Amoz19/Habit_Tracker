const CalendarModel = require("../models/CalendarModel");

const addFullYear = async (req, res) => {
  const { userId, habitName, getFullYear, uniqueId } = req.body;

  const postFullYear = {
    uniqueId,
    userId,
    habitName,
    getFullYear,
  };

  try {
    const savedCalendar = await CalendarModel.create(postFullYear);
    console.log(savedCalendar.userId);
    res.status(201).json(savedCalendar);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getFullYear = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  try {
    const fullYear = await CalendarModel.find({ userId: _id }).select(
      "habitName uniqueId"
    );
    res.status(200).json(fullYear);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const updateComplete = async (req, res) => {
  const { id, monthIndex, dayIndex, isComplete } = req.body;

  const toggleComplete = !isComplete;

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
  updateComplete,
  deleteHabit,
};
