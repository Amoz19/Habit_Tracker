const { default: mongoose } = require("mongoose");
const CalendarModel = require("../models/CalendarModel");
const generateCalendar = require("../src/data");
// const { v4: uuidv4 } = require("uuid");
// const mongoose = require("mongoose");

const addFullYear = async (req, res) => {
  const { uniqueId, habitName, getFullYear } = req.body;
  // const groupId = uuidv4();
  // const getFullYear = generateCalendar();
  const postFullYear = {
    // groupId: groupId,
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
  // const mongoose = new mongoose();
  const { id, month, day } = req.body;
  // console.log(typeof(month)));

  // const monthId = mongoose.Types.ObjectId(month); // Convert month to ObjectId

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
          "month._id": month,
        },
        {
          "day._id": day,
        },
      ],
    }
  );
  res.status(200).json({ message: "updated" });
};

module.exports = { addFullYear, getFullYear, getFullYearById, updateComplete };
