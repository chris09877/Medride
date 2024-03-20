const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  location: {
    type: [Number],
    default: [],
  },
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
  ],
});

module.exports = mongoose.model("Driver", driverSchema);