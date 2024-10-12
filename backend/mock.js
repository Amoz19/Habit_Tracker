const {
  startOfWeek,
  endOfWeek,
  format,
  getYear,
  getMonth,
  getDate,
} = require("date-fns");

const currentDate = new Date();

const monthName = format(currentDate, "MMMM");

// Get the start and end of the week
const start = getDate(startOfWeek(currentDate, { weekStartsOn: 1 })); // Monday as the first day of the week
const end = getDate(endOfWeek(currentDate, { weekStartsOn: 1 }));

const mock = [
  {
    _id: "6706dfd2e225f629dcdd8fe4",
    getFullYear: [
      {
        month: "October",
        year: 2024,
        days: [
          {
            day: 7,
            isComplete: true,
            _id: "6706dfd2e225f629dcdd9107",
          },
          {
            day: 8,
            isComplete: true,
            _id: "6706dfd2e225f629dcdd9108",
          },
          {
            day: 9,
            isComplete: false,
            _id: "6706dfd2e225f629dcdd9109",
          },
          {
            day: 10,
            isComplete: false,
            _id: "6706dfd2e225f629dcdd910a",
          },
          {
            day: 11,
            isComplete: false,
            _id: "6706dfd2e225f629dcdd910b",
          },
          {
            day: 12,
            isComplete: false,
            _id: "6706dfd2e225f629dcdd910c",
          },
          {
            day: 13,
            isComplete: false,
            _id: "6706dfd2e225f629dcdd910d",
          },
        ],
        _id: "6706dfd2e225f629dcdd9100",
      },
    ],
  },
  {
    _id: "6706e4e6a0ce137124793639",
    getFullYear: [
      {
        month: "October",
        year: 2024,
        days: [
          {
            day: 7,
            isComplete: false,
            _id: "6706e4e6a0ce13712479375c",
          },
          {
            day: 8,
            isComplete: false,
            _id: "6706e4e6a0ce13712479375d",
          },
          {
            day: 9,
            isComplete: false,
            _id: "6706e4e6a0ce13712479375e",
          },
          {
            day: 10,
            isComplete: false,
            _id: "6706e4e6a0ce13712479375f",
          },
          {
            day: 11,
            isComplete: false,
            _id: "6706e4e6a0ce137124793760",
          },
          {
            day: 12,
            isComplete: false,
            _id: "6706e4e6a0ce137124793761",
          },
          {
            day: 13,
            isComplete: false,
            _id: "6706e4e6a0ce137124793762",
          },
        ],
        _id: "6706e4e6a0ce137124793755",
      },
    ],
  },
];

// let arrayValues = mock.map((data) =>
//   data.getFullYear[0].days.reduce((accumulator, currentValue) => {
//     if (currentValue.isComplete === true) {
//       return accumulator + 1;
//     } else {
//       return accumulator;
//     }
//   }, 0)
// );

// let arrayValues = mock.map((_, index) => mock.map((row) => row[2]));

let arrayValues = mock.map((data) =>
  data.getFullYear[0].days.map((day) => {
    if (day.isComplete === true) {
      return 1;
    } else {
      return 0;
    }
  })
);

const summedArray = arrayValues[0].map((_, colIndex) =>
  arrayValues.reduce(
    (sum, row) => sum + (row[colIndex] / arrayValues.length) * 100,
    0
  )
);

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const result = [];
const daysObject = daysOfWeek.reduce((accumulator, currentDay, index) => {
  accumulator[currentDay] = summedArray[index]; // Assigning a custom value for each day
  result.push({ [currentDay]: summedArray[index] });
  return accumulator;
}, {});

console.log(result);
