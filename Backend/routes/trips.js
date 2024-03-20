const express =  require('express');

const {getTrip, getTrips, createTrip, updateTrip ,deleteTrip} = require('../controllers/trips.js');



const router = express.Router();

/* CREATE */
router.post("/create" ,createTrip);

/* READ */
router.get("/:id" ,getTrip);
router.get("/" ,getTrips);

/* UPDATE */

router.patch("/update/:id" , updateTrip);

/* DELETE */
router.delete("/delete/:id" ,deleteTrip);

module.exports = router;