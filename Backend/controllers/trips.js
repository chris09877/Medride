const { Trip, Driver } = require("../models/Models.js");

/* READ */
const getTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE */
const createTrip = async (req, res) => {
  try {
    const { name, from, to, appointment, patient, driverId } = req.body;
    const newTrip = new Trip({
      name: name,
      appointment: appointment,
      from: from,
      to: to,
      status: 0,
      patient: patient,
    });

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ msg: "Driver does not exist." });
    }

    await newTrip.save();
    driver.trips.push(newTrip._id);
    await driver.save();
    res.status(201).json(newTrip);
  } catch (err) {
    console.log(req.body);
    res.status(409).json({ message: err.message });
  }
};

/* UPDATE */
const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    if (status) trip.status = status;

    const updatedTrip = await trip.save();
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrip = await Trip.findByIdAndDelete(id);

    if (!deletedTrip) {
      res.status(404).json({ message: "Trip not found" });
      return;
    }

    const driver = await Driver.findOneAndUpdate(
      { trips: id },
      { $pull: { trips: id } }
    );

    res.status(200).json({ message: `Trip: ${id} successfully deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTrip, getTrips, createTrip, deleteTrip, updateTrip };
