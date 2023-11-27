const CalendarModel = require("../models/CalendarModel");
const generateCalendar = require("../src/data");
// const { v4: uuidv4 } = require("uuid");

const addFullYear = async (req, res) => {
  const { habitName } = req.body;
  // const groupId = uuidv4();
  const getFullYear = generateCalendar();
  const postFullYear = {
    // groupId: groupId,
    habitName: habitName,
    getFullYear: getFullYear,
  };

  const savedCalendar = await CalendarModel.create(postFullYear);
  res.status(201).json(savedCalendar);
};

const getFullYear = async (req, res) => {
  const fullYear = await CalendarModel.find();
  res.status(200).json(fullYear);
};

const getFullYearById = async (req, res) => {
  const fullYear = await CalendarModel.find({ groupId: req.params.groupId });
  res.status(200).json(fullYear);
};

const updateComplete = async (req, res) => {
  const { year, month, day } = req.body;
  console.log(year, month, day);
  const updatedData = await CalendarModel.updateOne(
    {
      _id: "65643c670b0bfd17c27d3496",
    },
    {
      $set: {
        "getFullYear.$[o].days.$[i].isComplete": true,
      },
    },
    {
      arrayFilters: [
        {
          "o._id": "65643c670b0bfd17c27d3497",
        },
        {
          "i._id": "65643c670b0bfd17c27d3498",
        },
      ],
    }
  );
  res.status(200).json("Updateed");
};

module.exports = { addFullYear, getFullYear, getFullYearById, updateComplete };
