const { Patient } = require("../models/Models.js");

/* READ */
const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE */
const createPatient = async (req, res) => {
  try {
    const { title, dateOfBirth, name, phoneNumber, disabled } = req.body;
    const newPatient = new Patient({
      title: title,
      name: name,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      disabled: disabled,
    });
    await newPatient.save();

    res.status(201).json(newPatient);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* DELETE */
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPatient = await Patient.findByIdAndDelete(id);

    if (!deletedPatient) {
      res.status(404).json({ message: "Patient not found" });
      return;
    }

    res.status(200).json({ message: `Patient: ${id} successfully deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPatient, getPatients, createPatient, deletePatient };