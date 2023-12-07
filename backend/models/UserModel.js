const Mongoose = require("mongoose");

const Usermodel = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = Mongoose.model("users", Usermodel);
