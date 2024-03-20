const express =  require('express');

const {getCar, getCars, createCar, deleteCar} = require('../controllers/cars.js');

const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

/* CREATE */
router.post("/create", createCar);

/* READ */
router.get("/:id", getCar);
router.get("/", getCars);

/* UPDATE */

/* DELETE */
router.delete("/delete/:id", deleteCar);

module.exports = router;