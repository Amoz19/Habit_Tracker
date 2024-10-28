const calculateWeeklyProgress = (filteredData, startDay, endDay) => {
  console.log(startDay);
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

  // console.log(progressPercent);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = [];

  daysOfWeek.reduce((accumulator, currentDay, index) => {
    // console.log("what", accumulator, currentDay, index);
    if (progressPercent[startDay + index - 1] === undefined) {
      return accumulator;
    }
    accumulator[currentDay] = progressPercent[startDay + index - 1];
    data.push({
      key: currentDay,
      value: progressPercent[startDay + index - 1],
    });
    return accumulator;
  }, {});
  // console.log("Result", result);

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
