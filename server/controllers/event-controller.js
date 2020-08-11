
var Controller, Model, config, util;

Controller  = require('../core/controller');

Model       = require('../models');

config      = require('../config');

util        = require('../lib/utilities');


Event = (function() {
  var Super;

  class Event extends Controller {
    constructor() {
      super();
      Super = this;
    }

    getEvents(req, res) {
      return Model.events.getEvents(req, function(err, result) {
        if (err) {
          res.status(400).send(Super.responseError(err));
          return null;
        }
        return res.status(200).send(Super.responseGet(result));
      });
    }

    syncEvents(req, res) {
      return Model.events.syncEvents(req, function(err, result) {
        if (err) {
          res.status(400).send(Super.responseError(err));
          return null;
        }
        return res.status(200).send(Super.responseGet(result));
      });
    }
  };

  Super = {};

  return Event;

}).call(this);

module.exports = Event;
