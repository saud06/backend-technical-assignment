/*
 * Title: Cron data controller
 * Description: Required Cron data controllers for Cron route
 * Author: Saud M.
 * Date: 2022-11-08
 */

// Dependencies
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const _ = require('lodash');
const moment = require('moment');
const config = require('../config');
const db  = require('../database');

// Controller initialization
const cronDataController = {};

cronDataController.getCronData = async(req, res) => {
  try {
    const indegoRequest = await fetch(config.bicycleTransit);
    const indegoResponse = await indegoRequest.json();
    const weatherRequest = await fetch(config.openWeather);
    const weatherResponse = await weatherRequest.json();

    if(_.has(indegoResponse, 'features') && _.has(weatherResponse, 'coord.lon')){
      const datetime = moment().format('YYYY-MM-DD HH:mm:ss');
      const query = `INSERT INTO cron_responses(created_at, indego_response, weather_response) VALUES (?, ?, ?)`;

      await db.promise().query({sql: query}, [datetime, JSON.stringify(indegoResponse), JSON.stringify(weatherResponse)]);

      res.redirect('/');
    }
  } catch (err) {
    res.render('error', {
      title: 'Error',
      data: {
        status: 500,
        msg: 'Internal server error',
      },
    });
  }
}

// Export module
module.exports = cronDataController;