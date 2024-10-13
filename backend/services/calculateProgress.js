const calculateWeeklyProgress = (filteredData, startDay, endDay) => {
  filteredData.forEach(
    (data) =>
      (data.getFullYear[0].days = data.getFullYear[0].days.filter(
        (day) => day.day >= startDay && day.day <= endDay
      ))
  );

  const getProgressRate = filteredData.map((data) =>
    data.getFullYear[0].days.map((day) => (day.isComplete ? 1 : 0))
  );

  if (getProgressRate.length === 0) {
    console.error("No progress data found");
    return res.status(400).json({ error: "No progress data found" });
  }

  const progressPercent = getProgressRate[0].map((_, colIndex) => {
    const totalComplete = filteredData.reduce((sum, row) => {
      return sum + (row.getFullYear[0].days[colIndex]?.isComplete ? 1 : 0);
    }, 0);

    const totalEntries = getProgressRate.length; // Prevent division by zero
    return ((totalComplete / totalEntries) * 100).toFixed(); // Calculate percentage
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = [];

  daysOfWeek.reduce((accumulator, currentDay, index) => {
    accumulator[currentDay] = progressPercent[index]; // Assigning a custom value for each day
    data.push({ key: currentDay, value: progressPercent[index] });
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
      totalPercent: result.toFixed(),
    };
  });
  return getProgressRate;
};

module.exports = { calculateWeeklyProgress, calculateMonthlyProgress };
