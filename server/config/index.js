var Config, database, file_config, pagination_config, server_config;

database          = require('./database');

file_config       = require('./files');

pagination_config = require('./pagination');

server_config     = require('./server');

Config = (function() {
  var environment;

  class Config {
    constructor() {}

  };

  // set environment as default if not set
  environment = process.env.NODE_ENV === void 0 ? 'default' : process.env.NODE_ENV;

  // server configuration
  Config.server = {
    port: server_config[environment].port
  };  
  
  // database configuration
  Config.database = {
    host              : database[environment].host,
    port              : database[environment].port,
    database          : database[environment].database,
    dialect           : database[environment].dialect,
    username          : database[environment].username,
    password          : database[environment].password,
    logging           : database[environment].logging
  };

 
  // files serve configurations
  Config.files = {
    using_port        : file_config[environment].using_port,
    web_path          : file_config[environment].web_path + (file_config[environment].using_port === true ? ':' + server_config[environment].port : ''),
    upload_web_path   : file_config[environment].upload_web_path + (file_config[environment].using_port === true ? ':' + server_config[environment].port + '/' : '/'),
    shopify_base_url  : file_config[environment].shopify_base_url,
    shopify_headers   : file_config[environment].shopify_headers
  };

 

  // pagination configurations
  Config.pagination = {
    limit             : pagination_config[environment].limit,
    offset            : pagination_config[environment].offset
  };

  return Config;

}).call(this);

module.exports = Config;
