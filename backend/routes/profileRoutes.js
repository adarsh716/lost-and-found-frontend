const express = require('express');
const { updateProfile, getProfileDetails } = require('../controllers/profileController');
const router = express.Router();

router.put('/', updateProfile);
router.get('/', getProfileDetails);

module.exports = router;
