const { Car, Planning } = require("../models/Models.js");

/* READ */

//READ a single car
const getCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//READ all cars
const getCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE */
const createCar = async (req, res) => {
  try {
    const { plate, model } = req.body;
    const newCar = new Car({
      plate: plate,
      model: model,
    });
    await newCar.save();

    const newPlanning = new Planning({
      car: newCar._id,
    });

    await newPlanning.save();

    res.status(201).json(newCar);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* DELETE */
const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    await Planning.findOneAndDelete({ car: id });

    res
      .status(200)
      .json({
        message: `Car: ${id} and associated planning successfully deleted`,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCar, getCars, createCar, deleteCar };
