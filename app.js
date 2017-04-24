exports = module.exports = function(app, mongoose, express) {
  //console.log(app, mongoose, express);
  console.log('INIT APP');
  var models   = require('./models/user')(app, mongoose);
  var UserCtrl = require('./controllers/users');
  // API routes
  var users = express.Router();
  users.route('/users')
    .get(UserCtrl.findAllUsers)
    .post(UserCtrl.addUser);

  users.route('/users/:id')
    .get(UserCtrl.findById)
    .put(UserCtrl.updateUser)
    .delete(UserCtrl.deleteUser);

  app.use('/api', users);
  console.log('END APP');
};
