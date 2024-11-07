const { getDate } = require("date-fns");

function getCurrentWeekIndex(date) {
  const dayOfMonth = getDate(date); // Get day of the month, e.g., 7 for the 7th
  return Math.floor((dayOfMonth - 1) / 7); // Calculate week index (0-based)
}

const calculateWeeklyProgress = (filteredData, startDay, endDay) => {
  filteredData[0].getFullYear[0].days.find(
    (day) => day.day >= startDay && day.day <= endDay
  );

  // console.log(filteredData, startDay, endDay);

  const getProgressRate = filteredData.map((data) =>
    data.getFullYear[0].days.map((day) => (day.isComplete ? 1 : 0))
  );

  if (getProgressRate.length === 0) {
    console.log("No progress data found");
  }

  const progressPercent = getProgressRate[0]?.map((_, colIndex) => {
    const totalComplete = filteredData.reduce((sum, row) => {
      return sum + (row.getFullYear[0].days[colIndex]?.isComplete ? 1 : 0);
    }, 0);

    const totalEntries = getProgressRate.length; // Prevent division by zero
    return ((totalComplete / totalEntries) * 100).toFixed(); // Calculate percentage
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = [];
  const startweek = getCurrentWeekIndex(new Date());

  daysOfWeek.reduce((accumulator, currentDay, index) => {
    if (progressPercent[startDay + index - 1] === undefined) {
      return accumulator;
    }
    accumulator[currentDay] = progressPercent[startweek + index];
    data.push({
      key: currentDay,
      value: progressPercent[startweek + index],
    });
    return accumulator;
  }, {});

  return data;
};

const calculateMonthlyProgress = (data) => {
  const getProgressRate = data.map((eachData) => {
    const result = eachData.getFullYear[0].days
      .map((day) => (day.isComplete ? 1 : 0))
      .reduce(
        (acc, cur, _, array) => acc + (cur / Number(array.length)) * 100,
        0
      );
    return {
      habitName: eachData.habitName,
      totalPercent: Number(result.toFixed()),
    };
  });
  return getProgressRate;
};

module.exports = { calculateWeeklyProgress, calculateMonthlyProgress };
