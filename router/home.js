/*
 * Title: Home router
 * Description: Hits here when the client requests for home
 * Author: Saud M.
 * Date: 2022-11-08
 */

// Dependencies
const express = require('express');
const responseType = require('../middlewares/responseTypeHandler');
const homeController = require('../controllers/home');

// Router initialization
const router = express.Router();

// Get home
router.get(
  '/',
  responseType.setResponse, // get response type to check whether the client is browser or anything else
  homeController.getHome
);

// Export module
module.exports = router;
