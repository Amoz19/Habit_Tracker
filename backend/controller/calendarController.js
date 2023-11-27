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

module.exports = { addFullYear, getFullYear, getFullYearById };
