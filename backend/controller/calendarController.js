const CalendarModel = require("../models/CalendarModel");
const {
  startOfWeek,
  endOfWeek,
  format,
  getYear,
  getMonth,
  getDate,
} = require("date-fns");
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
    res.status(201).json(savedCalendar);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getFullYear = async (req, res) => {
  const { _id } = req.user;
  try {
    const fullYear = await CalendarModel.find({ userId: _id });
    res.status(200).json(fullYear);
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

const weeklyProgress = async (req, res) => {
  const { _id } = req.user;
  // const userData = await getFullYear(_id);
  const currentDate = new Date();

  const monthName = format(currentDate, "MMMM");

  // Get the start and end of the week
  const start = getDate(startOfWeek(currentDate, { weekStartsOn: 1 })); // Monday as the first day of the week
  const end = getDate(endOfWeek(currentDate, { weekStartsOn: 1 }));

  console.log(start, end, monthName);

  try {
    // Query for documents matching the current month and week
    const result = await CalendarModel.find(
      {
        userId: _id,
        "getFullYear.month": monthName,
      },
      { "getFullYear.$": 1 }
    );

    const filteredData = [...result];

    if (result) {
      filteredData.forEach(
        (data) =>
          (data.getFullYear[0].days = data.getFullYear[0].days.filter(
            (day) => day.day >= start && day.day <= end
          ))
      );
    }

    const getProgressRate = filteredData.map((data) =>
      data.getFullYear[0].days.map((day) => (day.isComplete ? 1 : 0))
    );

    if (getProgressRate.length === 0) {
      console.error("No progress data found");
      return res.status(400).json({ error: "No progress data found" });
    }
    // console.log(getProgressRate);

    const progressPercent = getProgressRate[0].map((_, colIndex) => {
      const totalComplete = filteredData.reduce((sum, row) => {
        return sum + (row.getFullYear[0].days[colIndex]?.isComplete ? 1 : 0);
      }, 0);

      const totalEntries = getProgressRate.length; // Prevent division by zero
      return ((totalComplete / totalEntries) * 100).toFixed(); // Calculate percentage
    });

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = [];

    const reduceValue = daysOfWeek.reduce((accumulator, currentDay, index) => {
      accumulator[currentDay] = progressPercent[index]; // Assigning a custom value for each day
      data.push({ key: currentDay, value: progressPercent[index] });
      return accumulator;
    }, {});

    // console.log(reduceValue);
    res.json(data); // Send the result back in the response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addFullYear,
  getFullYear,
  getFullYearById,
  updateComplete,
  deleteHabit,
  weeklyProgress,
};
