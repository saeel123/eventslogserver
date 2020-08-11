var fs, models;

fs = require('fs');

models = {};

fs.readdirSync('./server/models/').forEach(function(file) {
  var model_name;
  if (file.indexOf("index.js") < 0) {
    model_name = file.slice(0, file.indexOf("-model.js"));
    return models[model_name] = require("./" + file);
  }
});

module.exports = models;
