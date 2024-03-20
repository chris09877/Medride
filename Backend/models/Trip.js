const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema(
  {
    status: {
      type: Number,
    },
    name: {
      type: String,
    },
    appointment: {
      type: Date,
    },
    from: {
      type: String,
    },
    to: {
      type: String,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Trip", tripsSchema);
