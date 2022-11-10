/*
 * Title: Response type handler
 * Description: Handles response types
 * Author: Saud
 * Date: 2022-11-08
 */

// Middleware initialization
const responseType = {};

// Not found handler
responseType.setResponse = (req, res, next) => {
  res.locals.response = 'html';
  res.locals.data = '';
  res.locals.errors = {};

  next();
};

// Export
module.exports = responseType;
