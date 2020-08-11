
var _, async, validator

_         = require('underscore');
async     = require('async');
validator = require('validator');

formatError = function(error, msg, code) {
    if (!code) {
      code = 0;
    }
    if (!msg) {
      msg = "Error occured.";
    }
    if (error) {
        code = error.code ? error.code : code;
      if (error.errmsg) {
        msg = error.errmsg;
      } else if (error.message) {
        msg = error.message;
      }
    }

    switch (code) {
      case 11000:
        msg = "Duplicate Entry.";
      }

    return {
      error: [
        {
          code: code,
          message: msg
        }
      ]
    };
};

module.exports = {
  _           : _,
  async       : async,
  formatError : formatError,
  validator   : validator
};
