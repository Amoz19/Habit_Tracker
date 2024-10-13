const calculateProgress = (filteredData, startDay = null, endDay = null) => {
  if (startDay !== null || endDay !== null) {
    filteredData.forEach(
      (data) =>
        (data.getFullYear[0].days = data.getFullYear[0].days.filter(
          (day) => day.day >= startDay && day.day <= endDay
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

  const progressPercent = getProgressRate[0].map((_, colIndex) => {
    const totalComplete = filteredData.reduce((sum, row) => {
      return sum + (row.getFullYear[0].days[colIndex]?.isComplete ? 1 : 0);
    }, 0);

    const totalEntries = getProgressRate.length; // Prevent division by zero
    return ((totalComplete / totalEntries) * 100).toFixed(); // Calculate percentage
  });

  if (startDay == null || endDay == null) {
    return progressPercent;
  }

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = [];

  daysOfWeek.reduce((accumulator, currentDay, index) => {
    accumulator[currentDay] = progressPercent[index]; // Assigning a custom value for each day
    data.push({ key: currentDay, value: progressPercent[index] });
    return accumulator;
  }, {});

  return data;
};

module.exports = calculateProgress;
