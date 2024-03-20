const { Planning, Driver } = require("../models/Models.js");

/* READ */
const getPlanning = async (req, res) => {
  try {
    const { id } = req.params;
    const planning = await Planning.findById(id);
    if (!planning) {
      return res.status(404).json({ message: "Planning not found" });
    }
    res.status(200).json(planning);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getPlannings = async (req, res) => {
  try {
    const plannings = await Planning.find({});
    res.status(200).json(plannings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE */
const createPlanning = async (req, res) => {
  try {
    const { car, driver } = req.body;
    const newPlanning = new Planning({
      car: car,
      driver: driver,
    });
    await newPlanning.save();

    res.status(201).json(newPlanning);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* UPDATE */
const updatePlanning = async (req, res) => {
  try {
    const { id } = req.params;
    const { driverId } = req.body;

    const oldPlanning = await Planning.findOne({ driver: driverId});
    if (oldPlanning) {
      oldPlanning.driver = null;
      await oldPlanning.save();
    }
    const planning = await Planning.findOne({ car: id });

    if (!planning) {
      return res.status(404).json({ message: "Planning not found"});
    }

    planning.driver = driverId;

    const updatedPlanning = await planning.save();

    res.status(200).json(updatedPlanning);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
const deletePlanning = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlanning = await Planning.findByIdAndDelete(id);

    if (!deletedPlanning) {
      res.status(404).json({ message: "Planning not found" });
      return;
    }

    res.status(200).json({ message: `Planning: ${id} successfully deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPlanning, getPlannings, createPlanning, updatePlanning, deletePlanning };
