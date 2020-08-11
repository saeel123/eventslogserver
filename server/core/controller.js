var Controller, Interface;

Interface = require('./controller-interface');

Controller = class Controller extends Interface {
  constructor() {
    super();
  }

  responseError(error) {
    return this.errorResponse(error);
  }

  responseCreate(data) {
    return this.createdResponse(data);
  }

  responseGet(data) {
    return this.getReponse(data);
  }

};

module.exports = Controller;
