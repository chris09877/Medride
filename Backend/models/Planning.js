const mongoose = require("mongoose");

const planningSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
    },
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Planning", planningSchema);