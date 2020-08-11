var checkEnvironment, environment;

environment = process.env.NODE_ENV === void 0 ? 'default' : process.env.NODE_ENV;

checkEnvironment = function(environment) {
  if (environment === 'default') {
    return {
      database        : 'eventslogs',
      db_host         : 'ds259377.mlab.com',
      environment     :  environment,
      host            : 'localhost',
      host_url        : 'https://shopifyeventlogs.web.app/',
      password        : 'saeel123',
      port            :  59377,
      project         : 'event_logger',
      protocol        : 'http',
      upload_web_path : 'http://localhost',
      username        : 'saeel',
      web_path        : 'http://localhost'

    };
  }
  if (environment === 'local') {
    return {
      database        : 'eventslogs',
      db_host         : 'ds259377.mlab.com',
      environment     :  environment,
      host            : 'localhost',
      host_url        : 'https://shopifyeventlogs.web.app/',
      password        : 'saeel123',
      port            :  59377,
      project         : 'event_logger',
      protocol        : 'http',
      upload_web_path : 'http://localhost',
      username        : 'saeel',
      web_path        : 'http://localhost'
    };
  }
  if (environment === 'production') {
    return {
      database        : 'eventslogs',
      db_host         : 'ds259377.mlab.com',
      environment     :  environment,
      host            : 'localhost',
      host_url        : 'https://shopifyeventlogs.web.app/',
      password        : 'saeel123',
      port            :  59377,
      project         : 'event_logger',
      protocol        : 'http',
      upload_web_path : 'http://localhost',
      username        : 'saeel',
      web_path        : 'http://localhost'
    };
  }
};

module.exports = checkEnvironment(environment);
