var Interface, ResponseHandler;

ResponseHandler = require('../lib/response-handler');

Interface = class Interface {
  constructor() {}

  createdResponse(data) {
    return ResponseHandler.createdResponse(data);
  }

  getReponse(data) {
    return ResponseHandler.getReponse(data);
  }

  errorResponse(error) {
    return ResponseHandler.errorResponse(error);
  }

};

module.exports = Interface;