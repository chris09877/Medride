const express =  require('express');

const {getDriver, getDrivers, updateDriver, deleteDriver, getDriverByPlateNumber, getDriverTrips, deleteDriverTrips, deleteDriverTrip} = require('../controllers/drivers.js');

const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

/* READ */

// Get driver by id
router.get("/:id", getDriver);
// Get all drivers
router.get("/", getDrivers);
// Get driver by plate number
router.get("/plate/:plateNumber", getDriverByPlateNumber);
// Get trips from driver by id
router.get("/:id/trips", getDriverTrips);

/* UPDATE */

// Update driver (location, car, trips)
router.patch("/update/:id", updateDriver);

/* DELETE */

// Delete driver by id
router.delete("/delete/:id", deleteDriver);
// Delete all trips for driver by id
router.delete("/:id/trips/delete", deleteDriverTrips);
// Delete a trip for driver by id
router.delete("/:driverId/trips/delete/:tripId", deleteDriverTrip);

module.exports = router;