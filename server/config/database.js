var constant, database, db_host, environment, password, setDbEnvironment, username;

constant      = require('./constants');

database      = constant.database;

db_host       = constant.db_host;

environment   = constant.environment;

password      = constant.password;

port          = constant.port

username      = constant.username;



setDbEnvironment = function(db_host, database, username, environment, port, password) {
  var db_obj;
  db_obj              = {};
  db_obj[environment] = {
    database          : database,
    host              : db_host,
    logging           : false,
    password          : password,
    port              : port,
    username          : username,
  };
  return db_obj;
};

module.exports = setDbEnvironment(db_host, database, username, environment, port, password);
