/*
ResponseHandler
To handle reponses with defined structure
*/
var ResponseHandler;

ResponseHandler = (function() {
  var responseStructure;

  class ResponseHandler {
    static createdResponse(data) {
      data.success = true;
      return responseStructure(data);
    }

    static getReponse(data) {
      data.success = true;
      return responseStructure(data);
    }

    static errorResponse(error) {
      if (!error) {
        error = {};
      }
      error.success = false;
      return responseStructure(error);
    }

    static unauthorized(res) {
      var data;
      data = {};
      data.success = false;
      data.error = [
        {
          code: 401,
          message: "You are not authorized to use this application."
        }
      ];
      return res.status(401).send(responseStructure(data));
    }

  };

  responseStructure = function(data) {
    var ref, ref1, ref2, ref3, ref4;
    return {
      success: (ref = data.success) != null ? ref : false,
      data: (ref1 = data.data) != null ? ref1 : [],
      count: (ref2 = data.count) != null ? ref2 : 0,
      error: (ref3 = data.error) != null ? ref3 : [],
      total_count: (ref4 = data.total_count) != null ? ref4 : 0,
    };
  };

  return ResponseHandler;

}).call(this);

module.exports = ResponseHandler;
