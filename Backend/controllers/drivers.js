const { Planning, Car, Driver, Patient, Trip } = require("../models/Models.js");

/* READ */
const getDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE */
const updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, trips } = req.body;

    // Find the driver by ID
    const driver = await Driver.findById(id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Update the specified fields
    if (location) driver.location = location;

    // Remove any duplicate trips
    if (trips) {
      const uniqueTrips = [...new Set(trips)]; // Remove duplicates using a Set
      driver.trips.push(...uniqueTrips); // Add the unique trips to the existing trips array
    }

    // Save the updated driver
    const updatedDriver = await driver.save();

    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE */
const deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      res.status(404).json({ message: "Driver not found" });
      return;
    }

    res.status(200).json({ message: `Driver ${id} successfully deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* PLATE NUMBER */
const getDriverByPlateNumber = async (req, res) => {
  try {
    const { plateNumber } = req.params;
    const car = await Car.findOne({ plate: plateNumber });
    if (!car) {
      return res.status(404).json({ msg: "Car not found." });
    }

    const planning = await Planning.findOne({ car: car._id });
    if (!planning) {
      return res.status(404).json({ msg: "Planning not found." });
    }

    const driver = await Driver.findById(planning.driver);
    if (!driver) {
      return res.status(404).json({ msg: "Driver not found."});
    }

    res.status(200).json({ driver });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDriverTrips = async (req, res) => {
  try {
    const driverId = req.params.id;

    const driver = await Driver.findById(driverId);
    if (!driver) {
      return res.status(404).json({ msg: "Driver not found." });
    }

    const trips = await Trip.find({ _id: { $in: driver.trips } });

    res.status(200).json({ trips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDriverTrips = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the driver by ID
    const driver = await Driver.findById(id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Clear the trips array
    driver.trips = [];

    // Save the updated driver
    const updatedDriver = await driver.save();

    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDriverTrip = async (req, res) => {
  try {
    const { driverId, tripId } = req.params;
  
    const driver = await Driver.findById(driverId);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const tripIndex = driver.trips.findIndex(trip => trip._id.toString() === tripId);

    if (tripIndex === -1) {
      return res.status(404).json({ message: "Trip not found" });
    }

    driver.trips.splice(tripIndex, 1);

    const updatedDriver = await driver.save();

    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getDriver,
  getDrivers,
  updateDriver,
  deleteDriver,
  getDriverByPlateNumber,
  getDriverTrips,
  deleteDriverTrips,
  deleteDriverTrip,
};
