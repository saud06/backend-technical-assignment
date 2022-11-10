const config = {
  mysql:{
    host: 'localhost',
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME
  },
  bicycleTransit:'https://kiosks.bicycletransit.workers.dev/phl',
  openWeather:`https://api.openweathermap.org/data/2.5/weather?q=Philadelphia,PA,US&appid=${process.env.APP_ID}`
};

module.exports = config;