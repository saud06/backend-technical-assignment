/*
 * Title: API router
 * Description: Hits here when the client requests for API data
 * Author: Saud M.
 * Date: 2022-11-09
 */

// Dependencies
const express = require('express');
const responseType = require('../middlewares/responseTypeHandler');
const apiController = require('../controllers/api');

// Router initialization
const router = express.Router();

// Get a station by kioskID
router.get(
	'/stations/:kioskId',
	responseType.setResponse, // get response type to check whether the client is browser or anything else
	apiController.getStation,
);

// Get all the stations
router.get(
	'/stations',
	responseType.setResponse, // get response type to check whether the client is browser or anything else
	apiController.getStations,
);

// Export module
module.exports = router;