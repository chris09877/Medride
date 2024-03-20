const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema(
    {
        plate: {
            type: String
        },
        model: {
            type: String
        }
    }
);

module.exports = mongoose.model("Car", carsSchema);