const express =  require('express');

const {getPlanning, getPlannings, createPlanning, deletePlanning, updatePlanning} = require('../controllers/plannings.js');

const { verifyToken } = require("../middleware/auth.js");

const router = express.Router();

/* CREATE */
router.post("/create", createPlanning);

/* READ */
router.get("/:id", getPlanning);
router.get("/", getPlannings);

/* UPDATE */
router.patch("/update/:id", updatePlanning);

/* DELETE */
router.delete("/delete/:id", deletePlanning);

module.exports = router;