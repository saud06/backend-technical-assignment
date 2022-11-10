/*
 * Title: Index
 * Description: Server lands here before start
 * Author: Saud M.
 * Date: 2022-11-07
 */

// Dependencies
const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const homeRouter = require('./router/home');
const apiRouter = require('./router/api');
const cronRouter = require('./router/cron');
const errorHandler = require('./middlewares/errorHandler');

// App initialization
const app = express();

// Request parser
app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');

// App routes
app.use('/', homeRouter);
app.use('/api/v1', apiRouter);
app.use('/api/v1/cron', cronRouter);

// Not found handler
app.use(errorHandler.notFound);

// Default error handler
app.use(errorHandler.defaultError);

// Export module
module.exports = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});