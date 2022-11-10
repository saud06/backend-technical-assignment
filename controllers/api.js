/*
 * Title: API controller
 * Description: Required API controllers for API route
 * Author: Saud M.
 * Date: 2022-11-09
 */

// Dependencies
const moment = require('moment');
const db = require('../database');
const _ = require('lodash');

// Controller initialization
const apiController = {};

// Get station data by kioskID
apiController.getStation = async (req, res, next) => {
  try {
    const at = req.query.at;

    if(isNaN(at) && !isNaN(Date.parse(at))){
      const kioskId = req.params.kioskId;
      const datetime = moment(at).format('YYYY-MM-DD HH:mm:ss');
      const [rows, fields] = await db.promise().query('SELECT * FROM cron_responses where created_at >= ?', [datetime]);

      if(rows.length > 0){
        const indego = JSON.parse(rows[0].indego_response);
        const filter = {
          features: _.filter(indego.features, item => item.properties.kioskId === +kioskId), // filter feature by kioskID
          type: indego.type
        };

        const data = {
          at: moment(rows[0].created_at).format('YYYY-MM-DD:THH:mm:ss'),
          station: filter,
          weather: JSON.parse(rows[0].weather_response)
        }
    
        if(data.station.features.length > 0){
          res.render('station', {
            title: 'Station',
            subtitle: 'SINGLE STATION DATA (BY KIOSK ID)',
            data,
          });
        } else{
          res.status(400).render('error', {
            title: 'Error',
            data: {
              status: 400,
              msg: 'Bad input',
            },
          });
        }
      } else{
        res.status(404).render('error', {
          title: 'Error',
          data: {
            status: 404,
            msg: 'Not found',
          },
        });
      }
    } else{
      res.status(400).render('error', {
        title: 'Error',
        data: {
          status: 400,
          msg: 'Bad input',
        },
      });
    }
  } catch (err) {
    res.status(500).render('error', {
      title: 'Error',
      data: {
        status: 500,
        msg: 'Internal server error',
      },
    });
  }
};

// Get all stations
apiController.getStations = async (req, res, next) => {
  try {
    const at = req.query.at;

    if(isNaN(at) && !isNaN(Date.parse(at))){
      const datetime = moment(at).format('YYYY-MM-DD HH:mm:ss');
      const [rows, fields] = await db.promise().query('SELECT * FROM cron_responses where created_at >= ?', [datetime]);

      if(rows.length > 0){
        const data = {
          at: moment(rows[0].created_at).format('YYYY-MM-DD:THH:mm:ss'),
          stations: JSON.parse(rows[0].indego_response),
          weather: JSON.parse(rows[0].weather_response)
        };

        res.render('station', {
          title: 'Stations',
          subtitle: 'ALL STATIONS DATA',
          data,
        });
      } else{
        res.status(404).render('error', {
          title: 'Error',
          data: {
            status: 404,
            msg: 'Not found',
          },
        });
      }
    } else{
      res.status(400).render('error', {
        title: 'Error',
        data: {
          status: 400,
          msg: 'Bad input',
        },
      });
    }
  } catch (err) {
    res.status(500).render('error', {
      title: 'Error',
      data: {
        status: 500,
        msg: 'Internal server error',
      },
    });
  }
};

// Export module
module.exports = apiController;