const express =  require('express');

const {getPatient, getPatients, createPatient, deletePatient} = require('../controllers/patients.js');

const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

/* CREATE */
router.post("/create", createPatient);

/* READ */
router.get("/:id", getPatient);
router.get("/", getPatients);

/* UPDATE */

/* DELETE */
router.delete("/delete/:id", deletePatient);

module.exports = router;