var constant, environment, host, host_url, ip, port, project, protocol, setFilesEnvironment, upload_web_path, web_path;

constant        = require('./constants');

environment     = constant.environment;

host            = constant.host;

host_url        = constant.host_url;

ip              = constant.ip;

port            = constant.port;

project         = constant.project;

protocol        = constant.protocol;

upload_web_path = constant.upload_web_path;

web_path        = constant.web_path;

setFilesEnvironment = function(environment, host, ip, port, project, protocol, upload_web_path, web_path, host_url) {
  var file_obj;
  file_obj              = {};
  file_obj[environment] = {
    shopify_base_url    :'https://full-stack-dev-test.myshopify.com/admin/api/2020-01',
    shopify_headers     : { 'X-Shopify-Access-Token': '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', 'Content-Type': 'application/json' },
    upload_web_path     : upload_web_path,
    using_port          : true,
    web_path            : web_path
  };
  return file_obj;
};

module.exports = setFilesEnvironment(environment, host, ip, port, project, protocol, upload_web_path, web_path, host_url);
