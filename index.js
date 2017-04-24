var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose')

    ;

let connectionString = 'mongodb://localhost/users'
// Connection to DB
if(process.env.NODE_ENV == 'test'){
  connectionString+='_test';
}
mongoose.connect(connectionString, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var UserApp = require('./app')(app, mongoose, express);

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// Start server
app.listen(3000, function() {
  console.log("Node server running on *:3000");
});
module.exports = app; // for testing
