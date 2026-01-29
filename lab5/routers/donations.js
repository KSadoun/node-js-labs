const express = require('express');
const router = express.Router();
const schemas = require('../schemas');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate')

const donationsController = require('../controllers/donations');


router.post("/", authenticate, validate(schemas.donationSchema), donationsController.createDonation);

// router.post("/webhook", donationsController.createDonation);

module.exports = router;