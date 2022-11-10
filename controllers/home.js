/*
 * Title: Home controller
 * Description: Required home controllers for home route
 * Author: Saud M.
 * Date: 2022-11-07
 */

// App initialization
const homeController = {};

// Get home
homeController.getHome = (req, res, next) => {
  res.render('index', {
    title: 'Home',
  });
};

// Export module
module.exports = homeController;
