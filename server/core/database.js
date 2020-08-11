var ListProcessor, config, connection_string, list_processor, mongoose;

config            = require('../config/');

list_processor    = require('./list_processor');

mongoose          = require('mongoose');

connection_string = 'mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.database;

// conn    = mongoose.createConnection connection_string, { 
mongoose.connect(connection_string, {
  auth: {
    user: config.database.username,
    password: config.database.password
  },
  useNewUrlParser: true
}).then(function(res) {
  return console.log("Database connected ... ");
}).catch(function(error) {
  console.error(error);
  return process.exit();
});

ListProcessor = new list_processor();

module.exports = {
  Database: mongoose,
  ListProcessor: ListProcessor
};
