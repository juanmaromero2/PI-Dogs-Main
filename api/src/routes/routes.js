const dogRoutes = require("./Dogs/dogRoutes");
const temperamentRoute = require("./Temperaments/temperamentRoute");


const router = require("express").Router();

router.use('/dogs', dogRoutes);
router.use('/temperament', temperamentRoute);

module.exports = router;
