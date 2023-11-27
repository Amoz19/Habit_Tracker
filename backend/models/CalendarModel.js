const mongoose = require("mongoose");

const CalendarModel = new mongoose.Schema({
  habitName: {
    type: String,
    required: true,
  },
  getFullYear: [
    {
      month: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      days: [
        {
          objId: {
            type: String,
            required: true,
          },
          day: {
            type: Number,
            required: true,
          },
          isComplete: {
            type: Boolean,
            required: true,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("calendarData", CalendarModel);
