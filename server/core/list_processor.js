// _       = require 'underscore'
var ListProcessor, config;

config = require('../config/');

ListProcessor = (function () {
  var available_orders;

  class ListProcessor {
    // -1 => descending order sort
    constructor() {}

    /*
    Function to process req for sequilize model condition options
    @params req node.js request
    @return options formed option object
    */
    process(req) {
      var options, sorts;
      options = {};
      options.pagination = {};

      // query limit
      if (req.query.limit) {
        options.pagination.limit = parseInt(req.query.limit);
      } else {
        options.pagination.limit = config.pagination.limit;
      }
      // query offset
      if (req.query.page) {
        options.pagination.skip = parseInt(req.query.page);
      } else {
        options.pagination.skip = config.pagination.offset;
      }
      // default sort order
      options.sort = {
        'updated_at': -1
      };
      // query sort
      if (req.query.sortBy) {
        options.sort = {};
        sorts = req.query.sortBy.toString().trim().split(',');
        sorts.forEach(function (val) {
          var sort;
          val = val.trim();
          sort = val.split('-');
          switch (sort[1].toString().toLowerCase()) {
            case "desc":
              return options.sort[sort[0].toString()] = -1;
            default:
              return options.sort[sort[0].toString()] = 1;
          }
        });
      }
      return options;
    }

    /*
    Function to clear basic options like paginations, includes, etc. It will restrain where conditions. 
    @params options Object options params
    @return options Object clear object
    */
    clearBasic(options) {
      delete options.limit;
      delete options.skip;
      delete options.sort;
      delete options.raw;
      delete options.attributes;
      delete options.include;
      return options;
    }

  };

  available_orders = [
    1,
    -1 //  1 => ascending order sort
  ];

  return ListProcessor;

}).call(this);

module.exports = ListProcessor;