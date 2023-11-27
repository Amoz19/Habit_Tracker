const { v4: uuidv4 } = require("uuid");

function generateCalendar() {
  const currentYear = new Date().getFullYear();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calendar = [];

  for (let i = 0; i < months.length; i++) {
    const monthObj = {
      month: months[i],
      year: currentYear,
      days: generateMonthDays(currentYear, i + 1), // Generating days for the month
    };

    calendar.push(monthObj);
  }

  return calendar;
}

// Function to generate an array of days for a given year and month
function generateMonthDays(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dayObj = {
      objId: uuidv4(),
      day: day,
      isComplete: false,
      // Adding the isComplete property
    };
    daysArray.push(dayObj);
  }

  return daysArray;
}

module.exports = generateCalendar;
// Example usage:
// Generate a unique groupId
// const generatedCalendar = generateCalendar(groupId);
