/*
 * Title: Cron router
 * Description: Hits here when the client requests for Cron job manually
 * Author: Saud M.
 * Date: 2022-11-08
 */

// Dependencies
const express = require('express');
const responseType = require('../middlewares/responseTypeHandler');
const cronDataController = require('../controllers/cronData');

// Router initialization
const router = express.Router();

// Get API data from Indego and Weather platfrom
router.get(
	'/',
	responseType.setResponse, // get response type to check whether the client is browser or anything else
	cronDataController.getCronData,
);

// Export module
module.exports = router;