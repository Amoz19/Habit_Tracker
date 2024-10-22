const {
  startOfWeek,
  endOfWeek,
  format,
  getYear,
  getMonth,
  getDate,
} = require("date-fns");
const CalendarModel = require("../models/CalendarModel");
const {
  calculateWeeklyProgress,
  calculateMonthlyProgress,
} = require("../services/calculateProgress");

const currentDate = new Date();
const monthName = format(currentDate, "MMMM");

// const getCurrentMonth = async (req, res, id) => {
//   const { _id } = req.user;
//   console.log(_id);
//   try {
//     const result = await CalendarModel.find(
//       {
//         userId: id,
//         "getFullYear.month": monthName,
//       },
//       { "getFullYear.$": 1 }
//     );
//     console.log(result);
//     return result;
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const weeklyProgress = async (req, res) => {
  const { _id } = req.user;
  const start = getDate(startOfWeek(currentDate, { weekStartsOn: 1 })); // Monday as the first day of the week
  const end = getDate(endOfWeek(currentDate, { weekStartsOn: 1 }));

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
    const progress = calculateWeeklyProgress(filteredData, start, end);

    // console.log(reduceValue);
    res.json(progress); // Send the result back in the response
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const monthlyProgress = async (req, res) => {
  const { _id } = req.user;
  try {
    const result = await CalendarModel.find(
      {
        userId: _id,
        "getFullYear.month": monthName,
      },
      {
        habitName: 1,
        "getFullYear.$": 1,
      }
    );

    const filteredData = [...result];
    const monthlyProgress = calculateMonthlyProgress(filteredData);
    res.json(monthlyProgress);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { weeklyProgress, monthlyProgress };
