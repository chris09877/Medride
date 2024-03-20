const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        title: {
            type: String
        },
        dateOfBirth: {
            type: Date
        },
        phoneNumber: {
            type: String
        },
        disabled: {
            type: Boolean
        }
    }
);

module.exports = mongoose.model('Patient', patientSchema);