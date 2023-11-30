const CalendarModel = require("../models/CalendarModel");

const { ObjectId } = require("mongodb");

const addFullYear = async (req, res) => {
  const { uniqueId, habitName, getFullYear } = req.body;

  const postFullYear = {
    uniqueId,
    habitName,
    getFullYear,
  };

  const savedCalendar = await CalendarModel.create(postFullYear);
  res.status(201).json(savedCalendar);
};

const getFullYear = async (req, res) => {
  const fullYear = await CalendarModel.find();
  res.status(200).json(fullYear);
};

const getFullYearById = async (req, res) => {
  const fullYear = await CalendarModel.find({ _id: req.params.groupId });
  res.status(200).json(fullYear);
};

const updateComplete = async (req, res) => {
  const { id, monthIndex, dayIndex } = req.body;
  console.log(id, monthIndex, dayIndex);

  // Convert month to ObjectId

  await CalendarModel.updateOne(
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
  res.status(200).json({ message: "updated" });
};

module.exports = { addFullYear, getFullYear, getFullYearById, updateComplete };
